/**
 * Eco-Clean bubble engine.
 *
 * A dependency-free canvas simulation that renders a slow upward flow of soap
 * bubbles across the viewport. Bubbles can be popped by pointer, and the page
 * can trigger bursts (`pop`) or temporary floods (`surge`) — the latter is what
 * fires when a visitor activates a service card.
 *
 * Performance notes:
 *  - Bubble bodies are pre-rendered once per tint into offscreen sprites, then
 *    blitted with `drawImage`. No per-frame gradient allocation.
 *  - Device pixel ratio is capped at 2; population scales with viewport area
 *    and is halved on coarse-pointer (mobile) devices.
 *  - The loop parks itself when the tab is hidden and when reduced motion is on.
 */

export type RGB = { r: number; g: number; b: number };

export type EngineOptions = {
  /** Multiplier on the auto-computed ambient bubble population. */
  density?: number;
  /** Skip ambient motion entirely; pops still render as a single quick ring. */
  reducedMotion?: boolean;
};

export type PopOptions = {
  colors?: string[];
  /** Droplet count. */
  count?: number;
  /** Outward velocity multiplier. */
  power?: number;
  /** Radius of the expanding shock ring in CSS pixels. */
  radius?: number;
};

export type SurgeOptions = {
  colors?: string[];
  /** Extra bubbles to flood in, before density scaling. */
  amount?: number;
  /** Seconds the surge takes to decay. */
  duration?: number;
  /** Origin in CSS pixels; bubbles fan out from here instead of the bottom edge. */
  origin?: { x: number; y: number };
};

type Bubble = {
  x: number;
  y: number;
  r: number;
  /** Upward speed, px/sec (positive = rising). */
  speed: number;
  driftPhase: number;
  driftFreq: number;
  driftAmp: number;
  alpha: number;
  color: string;
  /** Squash-and-stretch wobble phase. */
  wobble: number;
  /** Transient bubbles are culled first when a surge decays. */
  transient: boolean;
  /** Extra velocity from a surge origin, decays to zero. */
  vx: number;
  vy: number;
};

type Droplet = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  life: number;
  age: number;
  color: string;
};

type Pop = {
  x: number;
  y: number;
  r: number;
  age: number;
  life: number;
  color: string;
};

const DEFAULT_COLORS = ["#a98bfb", "#c6aeff", "#8e6bf2", "#7ff0d6", "#f9b4e6"];
const MAX_DPR = 2;
const MAX_BUBBLES = 90;
const MAX_DROPLETS = 260;

function hexToRgb(hex: string): RGB {
  let h = hex.replace("#", "");
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const n = Number.parseInt(h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function rgba({ r, g, b }: RGB, a: number): string {
  return `rgba(${r},${g},${b},${a})`;
}

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function pick<T>(arr: T[]): T {
  return arr[(Math.random() * arr.length) | 0];
}

/**
 * Pre-render a single bubble at high resolution so the render loop only ever
 * blits. Sprites are cached per tint for the lifetime of the engine.
 */
function createSprite(color: string, size: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d");
  if (!ctx) return c;

  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - size * 0.04;
  const rgb = hexToRgb(color);

  // Body: light enters from the upper-left, so the gradient origin sits there.
  const body = ctx.createRadialGradient(
    cx - r * 0.3,
    cy - r * 0.34,
    r * 0.04,
    cx,
    cy,
    r,
  );
  body.addColorStop(0, "rgba(255,255,255,0.78)");
  body.addColorStop(0.32, rgba(rgb, 0.3));
  body.addColorStop(0.72, rgba(rgb, 0.14));
  body.addColorStop(0.92, rgba(rgb, 0.3));
  body.addColorStop(1, "rgba(255,255,255,0.42)");

  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = body;
  ctx.fill();

  // Outer rim — the surface-tension line that reads as "soap film".
  ctx.beginPath();
  ctx.arc(cx, cy, r - size * 0.012, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255,255,255,0.72)";
  ctx.lineWidth = size * 0.022;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, r - size * 0.045, 0, Math.PI * 2);
  ctx.strokeStyle = rgba(rgb, 0.4);
  ctx.lineWidth = size * 0.012;
  ctx.stroke();

  // Primary specular highlight.
  ctx.save();
  ctx.translate(cx - r * 0.38, cy - r * 0.4);
  ctx.rotate(-0.6);
  const spec = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 0.28);
  spec.addColorStop(0, "rgba(255,255,255,0.95)");
  spec.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = spec;
  ctx.beginPath();
  ctx.ellipse(0, 0, r * 0.26, r * 0.17, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Secondary bounce light, lower right.
  ctx.beginPath();
  ctx.arc(cx + r * 0.42, cy + r * 0.36, r * 0.09, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.4)";
  ctx.fill();

  return c;
}

export class BubbleEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private sprites = new Map<string, HTMLCanvasElement>();

  private bubbles: Bubble[] = [];
  private droplets: Droplet[] = [];
  private pops: Pop[] = [];

  private width = 0;
  private height = 0;
  private dpr = 1;

  private raf = 0;
  private lastTime = 0;
  private running = false;
  private destroyed = false;

  private baseCount = 0;
  private surgeExtra = 0;
  private surgeDecay = 0;
  private surgeColors: string[] | null = null;
  private surgeOrigin: { x: number; y: number } | null = null;

  private pointer = { x: -9999, y: -9999, active: false };

  private density: number;
  private reducedMotion: boolean;

  constructor(canvas: HTMLCanvasElement, options: EngineOptions = {}) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) throw new Error("Canvas 2D context unavailable");
    this.ctx = ctx;
    this.density = options.density ?? 1;
    this.reducedMotion = options.reducedMotion ?? false;
    this.resize();
  }

  // ---------------------------------------------------------------- lifecycle

  resize(): void {
    if (this.destroyed) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    this.width = w;
    this.height = h;
    this.canvas.width = Math.floor(w * this.dpr);
    this.canvas.height = Math.floor(h * this.dpr);
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    // Population scales with area, then halves on touch-first devices where
    // both the GPU budget and the screen are smaller.
    const coarse = window.matchMedia?.("(pointer: coarse)").matches ?? false;
    const areaUnits = (w * h) / (1440 * 900);
    const target = Math.round(20 * areaUnits * this.density * (coarse ? 0.5 : 1));
    this.baseCount = this.reducedMotion ? 0 : Math.max(6, Math.min(target, 34));

    // Trim any bubbles now outside the viewport after a shrink.
    this.bubbles = this.bubbles.filter((b) => b.x > -b.r && b.x < w + b.r);
  }

  setReducedMotion(value: boolean): void {
    this.reducedMotion = value;
    if (value) {
      this.bubbles = [];
      this.surgeExtra = 0;
    }
    this.resize();
  }

  start(): void {
    if (this.running || this.destroyed) return;
    this.running = true;
    this.lastTime = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  stop(): void {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  destroy(): void {
    this.stop();
    this.destroyed = true;
    this.bubbles = [];
    this.droplets = [];
    this.pops = [];
    this.sprites.clear();
  }

  // ------------------------------------------------------------------- public

  setPointer(x: number, y: number, active = true): void {
    this.pointer.x = x;
    this.pointer.y = y;
    this.pointer.active = active;
  }

  /**
   * Pop the topmost bubble under the given point, if any.
   * Returns true when a bubble was hit, so callers can skip their own effect.
   */
  hitTest(x: number, y: number): boolean {
    for (let i = this.bubbles.length - 1; i >= 0; i--) {
      const b = this.bubbles[i];
      const dx = b.x - x;
      const dy = b.y - y;
      // 8px of forgiveness so fingertips can catch small bubbles.
      const reach = b.r + 8;
      if (dx * dx + dy * dy <= reach * reach) {
        this.bubbles.splice(i, 1);
        this.pop(b.x, b.y, {
          colors: [b.color],
          count: Math.round(6 + b.r / 5),
          radius: b.r * 1.5,
          power: 1,
        });
        return true;
      }
    }
    return false;
  }

  /** Emit a burst of droplets and an expanding shock ring at a point. */
  pop(x: number, y: number, options: PopOptions = {}): void {
    if (this.destroyed) return;
    const colors = options.colors?.length ? options.colors : DEFAULT_COLORS;
    const power = options.power ?? 1;
    const count = this.reducedMotion ? 0 : (options.count ?? 12);

    this.pops.push({
      x,
      y,
      r: options.radius ?? 26,
      age: 0,
      life: this.reducedMotion ? 0.32 : 0.55,
      color: colors[0],
    });

    if (this.droplets.length > MAX_DROPLETS) return;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + rand(-0.25, 0.25);
      const speed = rand(70, 190) * power;
      this.droplets.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - rand(10, 50),
        r: rand(1.8, 5.4),
        life: rand(0.45, 0.85),
        age: 0,
        color: pick(colors),
      });
    }
  }

  /**
   * Flood the screen with extra bubbles in the given palette. Used when a
   * service card is activated so the whole page reacts to the choice.
   */
  surge(options: SurgeOptions = {}): void {
    if (this.destroyed || this.reducedMotion) return;
    const coarse = window.matchMedia?.("(pointer: coarse)").matches ?? false;
    const amount = Math.round((options.amount ?? 22) * (coarse ? 0.55 : 1));
    this.surgeColors = options.colors?.length ? options.colors : null;
    this.surgeOrigin = options.origin ?? null;
    this.surgeExtra = Math.min(this.surgeExtra + amount, MAX_BUBBLES - this.baseCount);
    this.surgeDecay = this.surgeExtra / (options.duration ?? 7);

    // Seed a few immediately so the reaction feels instant rather than ramped.
    const instant = Math.min(6, amount);
    for (let i = 0; i < instant; i++) {
      this.bubbles.push(this.spawn(true));
    }
  }

  // ------------------------------------------------------------------ internal

  private sprite(color: string): HTMLCanvasElement {
    let s = this.sprites.get(color);
    if (!s) {
      s = createSprite(color, 128);
      this.sprites.set(color, s);
    }
    return s;
  }

  private palette(): string[] {
    return this.surgeColors ?? DEFAULT_COLORS;
  }

  private spawn(transient: boolean): Bubble {
    const colors = this.palette();
    const r = rand(7, 30);
    const origin = transient ? this.surgeOrigin : null;

    let x: number;
    let y: number;
    let vx = 0;
    let vy = 0;

    if (origin) {
      // Fan out from the element that triggered the surge.
      const angle = rand(-Math.PI * 0.9, -Math.PI * 0.1);
      const burst = rand(60, 200);
      x = origin.x + rand(-40, 40);
      y = origin.y + rand(-16, 16);
      vx = Math.cos(angle) * burst;
      vy = Math.sin(angle) * burst;
    } else {
      x = rand(-40, this.width + 40);
      y = this.height + r + rand(0, this.height * 0.5);
    }

    return {
      x,
      y,
      r,
      speed: rand(16, 52) * (transient ? 1.35 : 1),
      driftPhase: rand(0, Math.PI * 2),
      driftFreq: rand(0.25, 0.75),
      driftAmp: rand(8, 30),
      alpha: 0,
      color: pick(colors),
      wobble: rand(0, Math.PI * 2),
      transient,
      vx,
      vy,
    };
  }

  private frame = (now: number): void => {
    if (!this.running) return;
    // Clamp dt so a backgrounded tab does not teleport everything on return.
    const dt = Math.min((now - this.lastTime) / 1000, 0.05);
    this.lastTime = now;

    this.update(dt);
    this.draw();

    this.raf = requestAnimationFrame(this.frame);
  };

  private update(dt: number): void {
    // Decay any active surge back toward the ambient population.
    if (this.surgeExtra > 0) {
      this.surgeExtra = Math.max(0, this.surgeExtra - this.surgeDecay * dt);
      if (this.surgeExtra === 0) {
        this.surgeColors = null;
        this.surgeOrigin = null;
      }
    }

    const target = Math.min(
      Math.round(this.baseCount + this.surgeExtra),
      MAX_BUBBLES,
    );
    if (this.bubbles.length < target) {
      // Feed in gradually — a wall of bubbles appearing at once looks synthetic.
      const deficit = target - this.bubbles.length;
      const toSpawn = Math.min(deficit, Math.random() < 0.35 ? 2 : 1);
      for (let i = 0; i < toSpawn; i++) {
        this.bubbles.push(this.spawn(this.bubbles.length >= this.baseCount));
      }
    }

    const time = this.lastTime / 1000;

    for (let i = this.bubbles.length - 1; i >= 0; i--) {
      const b = this.bubbles[i];

      // Fade in on entry so bubbles never blink into existence.
      b.alpha = Math.min(b.alpha + dt * 1.4, b.transient ? 0.85 : 0.7);

      b.y -= b.speed * dt;
      b.x += Math.sin(time * b.driftFreq + b.driftPhase) * b.driftAmp * dt;
      b.wobble += dt * 2.4;

      // Surge impulse bleeds off into the ambient rise.
      if (b.vx !== 0 || b.vy !== 0) {
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        const damp = Math.exp(-dt * 2.6);
        b.vx *= damp;
        b.vy *= damp;
        if (Math.abs(b.vx) < 1) b.vx = 0;
        if (Math.abs(b.vy) < 1) b.vy = 0;
      }

      // Gentle repulsion so bubbles feel aware of the cursor.
      if (this.pointer.active) {
        const dx = b.x - this.pointer.x;
        const dy = b.y - this.pointer.y;
        const distSq = dx * dx + dy * dy;
        const reach = 110 + b.r;
        if (distSq < reach * reach && distSq > 1) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / reach) * 90;
          b.x += (dx / dist) * force * dt;
          b.y += (dy / dist) * force * dt;
        }
      }

      const offTop = b.y + b.r < -10;
      const offSide = b.x < -b.r - 80 || b.x > this.width + b.r + 80;
      if (offTop || offSide) {
        this.bubbles.splice(i, 1);
      }
    }

    // Cull surplus transients once a surge has decayed away.
    if (this.bubbles.length > target + 4) {
      for (let i = this.bubbles.length - 1; i >= 0 && this.bubbles.length > target; i--) {
        if (this.bubbles[i].transient && this.bubbles[i].y < this.height * 0.4) {
          this.bubbles.splice(i, 1);
        }
      }
    }

    for (let i = this.droplets.length - 1; i >= 0; i--) {
      const d = this.droplets[i];
      d.age += dt;
      if (d.age >= d.life) {
        this.droplets.splice(i, 1);
        continue;
      }
      d.x += d.vx * dt;
      d.y += d.vy * dt;
      d.vy += 210 * dt; // gravity
      d.vx *= 0.985;
    }

    for (let i = this.pops.length - 1; i >= 0; i--) {
      const p = this.pops[i];
      p.age += dt;
      if (p.age >= p.life) this.pops.splice(i, 1);
    }
  }

  private draw(): void {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    for (const b of this.bubbles) {
      // Skip anything fully outside the viewport horizontally.
      if (b.x + b.r < 0 || b.x - b.r > this.width) continue;

      const sprite = this.sprite(b.color);
      // Subtle squash-and-stretch — real bubbles are never perfectly round.
      const sx = b.r * 2 * (1 + Math.sin(b.wobble) * 0.045);
      const sy = b.r * 2 * (1 - Math.sin(b.wobble) * 0.045);

      ctx.globalAlpha = b.alpha;
      ctx.drawImage(sprite, b.x - sx / 2, b.y - sy / 2, sx, sy);
    }

    for (const p of this.pops) {
      const t = p.age / p.life;
      const eased = 1 - Math.pow(1 - t, 3);
      const radius = p.r * (0.4 + eased * 1.7);
      ctx.globalAlpha = (1 - t) * 0.7;
      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.strokeStyle = p.color;
      ctx.lineWidth = Math.max(1, 3 * (1 - t));
      ctx.stroke();
    }

    for (const d of this.droplets) {
      const t = d.age / d.life;
      ctx.globalAlpha = (1 - t) * 0.85;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r * (1 - t * 0.45), 0, Math.PI * 2);
      ctx.fillStyle = d.color;
      ctx.fill();
    }

    ctx.globalAlpha = 1;
  }
}
