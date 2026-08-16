/**
 * Eco-Clean bubble engine.
 *
 * Bubbles are a *moment*, not a background. There is no ambient population:
 * the canvas is empty and the render loop is parked until something calls
 * `burst()`, and every bubble carries its own lifetime so the screen returns
 * to clean within ~5 seconds. Bubbles either pop (ring + droplets) or drift
 * out as they expire.
 *
 * Because the loop only runs while particles are alive, an idle page costs
 * nothing — no rAF, no canvas clears.
 *
 * Performance notes:
 *  - Bubble bodies are pre-rendered once per tint into offscreen sprites, then
 *    blitted with `drawImage`. No per-frame gradient allocation.
 *  - Device pixel ratio is capped at 2; burst sizes halve on coarse-pointer
 *    devices.
 */

export type RGB = { r: number; g: number; b: number };

export type EngineOptions = {
  /** Skip bubbles entirely; bursts collapse to a single quick ring. */
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

export type BurstOptions = {
  /** Origin in CSS pixels. */
  x: number;
  y: number;
  colors?: string[];
  /** Bubbles to release, before device scaling. */
  count?: number;
  /** Horizontal scatter of the launch point, in CSS pixels. */
  spread?: number;
  /** Also emit an immediate droplet splash at the origin. */
  splash?: boolean;
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
  color: string;
  /** Squash-and-stretch wobble phase. */
  wobble: number;
  /** Seconds this bubble may live for. */
  life: number;
  age: number;
  /** Ends with a pop rather than drifting out. */
  popOnExpire: boolean;
  /** Launch impulse, decays to zero. */
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
const MAX_BUBBLES = 64;
const MAX_DROPLETS = 220;

/** Hard ceiling on how long any bubble may stay on screen. */
const LIFE_MIN = 2.4;
const LIFE_MAX = 4.6;
const FADE_IN = 0.3;
const FADE_OUT = 0.7;

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
  private paused = false;
  private destroyed = false;

  private pointer = { x: -9999, y: -9999, active: false };
  private reducedMotion: boolean;

  constructor(canvas: HTMLCanvasElement, options: EngineOptions = {}) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) throw new Error("Canvas 2D context unavailable");
    this.ctx = ctx;
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
  }

  setReducedMotion(value: boolean): void {
    this.reducedMotion = value;
    if (value) this.clear();
  }

  /** Suspend rendering (tab hidden). Particles resume where they left off. */
  setPaused(value: boolean): void {
    this.paused = value;
    if (value) this.stopLoop();
    else if (this.hasWork()) this.startLoop();
  }

  clear(): void {
    this.bubbles = [];
    this.droplets = [];
    this.pops = [];
    this.stopLoop();
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  destroy(): void {
    this.stopLoop();
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

  /** True while anything is on screen — used to skip idle pointer work. */
  isActive(): boolean {
    return this.hasWork();
  }

  /**
   * Pop the topmost bubble under the given point, if any.
   * Returns true when a bubble was hit.
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
          count: Math.round(5 + b.r / 6),
          radius: b.r * 1.5,
          power: 0.9,
        });
        return true;
      }
    }
    return false;
  }

  /** Emit droplets and an expanding shock ring at a point. */
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
      life: this.reducedMotion ? 0.3 : 0.55,
      color: colors[0],
    });

    if (this.droplets.length < MAX_DROPLETS) {
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

    this.wake();
  }

  /**
   * Release a short-lived cloud of bubbles from a point. Every bubble expires
   * within a few seconds, so the screen always returns to clean on its own.
   */
  burst(options: BurstOptions): void {
    if (this.destroyed || this.reducedMotion) return;

    const coarse = window.matchMedia?.("(pointer: coarse)").matches ?? false;
    const count = Math.min(
      Math.round((options.count ?? 14) * (coarse ? 0.6 : 1)),
      MAX_BUBBLES - this.bubbles.length,
    );
    const colors = options.colors?.length ? options.colors : DEFAULT_COLORS;
    const spread = options.spread ?? 46;

    if (options.splash) {
      this.pop(options.x, options.y, {
        colors,
        count: 14,
        power: 1.1,
        radius: 30,
      });
    }

    for (let i = 0; i < count; i++) {
      // Fan upward and outward from the trigger point.
      const angle = rand(-Math.PI * 0.88, -Math.PI * 0.12);
      const impulse = rand(50, 170);

      this.bubbles.push({
        x: options.x + rand(-spread, spread),
        y: options.y + rand(-14, 14),
        r: rand(7, 26),
        speed: rand(26, 62),
        driftPhase: rand(0, Math.PI * 2),
        driftFreq: rand(0.3, 0.9),
        driftAmp: rand(10, 32),
        color: pick(colors),
        wobble: rand(0, Math.PI * 2),
        life: rand(LIFE_MIN, LIFE_MAX),
        age: 0,
        // Most pop at the end; the rest drift out. Mixing the two stops the
        // finish from looking like a synchronised switch-off.
        popOnExpire: Math.random() < 0.6,
        vx: Math.cos(angle) * impulse,
        vy: Math.sin(angle) * impulse,
      });
    }

    this.wake();
  }

  // ------------------------------------------------------------------ internal

  private hasWork(): boolean {
    return (
      this.bubbles.length > 0 ||
      this.droplets.length > 0 ||
      this.pops.length > 0
    );
  }

  /** Start the loop on demand — it does not run while the screen is clean. */
  private wake(): void {
    if (this.destroyed || this.paused || this.running) return;
    this.startLoop();
  }

  private startLoop(): void {
    if (this.running || this.destroyed) return;
    this.running = true;
    this.lastTime = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  private stopLoop(): void {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  private sprite(color: string): HTMLCanvasElement {
    let s = this.sprites.get(color);
    if (!s) {
      s = createSprite(color, 128);
      this.sprites.set(color, s);
    }
    return s;
  }

  /** Fade envelope: in at birth, out before expiry. */
  private alphaFor(b: Bubble): number {
    const inA = Math.min(b.age / FADE_IN, 1);
    const remaining = b.life - b.age;
    const outA = Math.min(remaining / FADE_OUT, 1);
    return Math.max(0, Math.min(inA, outA)) * 0.82;
  }

  private frame = (now: number): void => {
    if (!this.running) return;
    // Clamp dt so a backgrounded tab does not teleport everything on return.
    const dt = Math.min((now - this.lastTime) / 1000, 0.05);
    this.lastTime = now;

    this.update(dt);
    this.draw();

    if (!this.hasWork()) {
      // Screen is clean again — park the loop until the next burst.
      this.stopLoop();
      this.ctx.clearRect(0, 0, this.width, this.height);
      return;
    }

    this.raf = requestAnimationFrame(this.frame);
  };

  private update(dt: number): void {
    const time = this.lastTime / 1000;

    for (let i = this.bubbles.length - 1; i >= 0; i--) {
      const b = this.bubbles[i];
      b.age += dt;

      if (b.age >= b.life) {
        this.bubbles.splice(i, 1);
        if (b.popOnExpire) {
          this.pop(b.x, b.y, {
            colors: [b.color],
            count: Math.round(4 + b.r / 7),
            radius: b.r * 1.3,
            power: 0.7,
          });
        }
        continue;
      }

      b.y -= b.speed * dt;
      b.x += Math.sin(time * b.driftFreq + b.driftPhase) * b.driftAmp * dt;
      b.wobble += dt * 2.4;

      // Launch impulse bleeds off into the ambient rise.
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
      if (offTop || offSide) this.bubbles.splice(i, 1);
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
      if (b.x + b.r < 0 || b.x - b.r > this.width) continue;

      const sprite = this.sprite(b.color);
      // Subtle squash-and-stretch — real bubbles are never perfectly round.
      const sx = b.r * 2 * (1 + Math.sin(b.wobble) * 0.045);
      const sy = b.r * 2 * (1 - Math.sin(b.wobble) * 0.045);

      ctx.globalAlpha = this.alphaFor(b);
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
