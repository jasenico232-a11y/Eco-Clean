"use client";

import { useCallback, useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";

/**
 * Point-of-contact press feedback, shared by every pressable surface.
 *
 * Two layers fire together from the exact spot the pointer landed:
 *   1. a soap-film **sheen** that wipes outward, clipped by the element's own
 *      border radius, and
 *   2. a scatter of **sparkle** glints — the "just-cleaned" twinkle.
 *
 * Both are bounded by the element, so the press reads as the surface reacting
 * rather than as particles thrown over the top of the UI. Keyboard activation
 * reports (0,0), so those originate from the centre instead.
 *
 * The host element needs `relative`, `isolate` and `overflow-hidden`.
 */

export type PressTone = "light" | "dark" | "mint" | "lilac";

const sheenColor: Record<PressTone, string> = {
  light: "rgba(255,255,255,0.85)",
  dark: "rgba(169,139,251,0.75)",
  mint: "rgba(255,255,255,0.9)",
  lilac: "rgba(142,107,242,0.5)",
};

const sparkleColor: Record<PressTone, string> = {
  light: "#ffffff",
  dark: "#c6aeff",
  mint: "#ffffff",
  lilac: "#8e6bf2",
};

type Sparkle = { dx: number; dy: number; size: number; delay: number };

type Press = {
  id: number;
  x: number;
  y: number;
  size: number;
  sparkles: Sparkle[];
};

/** Four-point star — reads as a glint at small sizes far better than a circle. */
function SparkleMark({ color, size }: { color: string; size: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path
        d="M12 0c.6 6.6 4.8 11.4 12 12-7.2.6-11.4 5.4-12 12-.6-6.6-4.8-11.4-12-12C7.2 11.4 11.4 6.6 12 0z"
        fill={color}
      />
    </svg>
  );
}

export function usePressFeedback(
  tone: PressTone = "lilac",
  options: { sparkles?: boolean; sparkleCount?: number } = {},
) {
  const { sparkles = true, sparkleCount = 5 } = options;
  const [presses, setPresses] = useState<Press[]>([]);
  const nextId = useRef(0);

  const press = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const fromKeyboard = e.clientX === 0 && e.clientY === 0;

      const x = fromKeyboard ? rect.width / 2 : e.clientX - rect.left;
      const y = fromKeyboard ? rect.height / 2 : e.clientY - rect.top;

      // Diameter reaching the farthest corner, so the wipe always completes.
      const size =
        2 *
        Math.max(
          Math.hypot(x, y),
          Math.hypot(rect.width - x, y),
          Math.hypot(x, rect.height - y),
          Math.hypot(rect.width - x, rect.height - y),
        );

      const scatter: Sparkle[] = sparkles
        ? Array.from({ length: sparkleCount }, (_, i) => {
            const angle = (Math.PI * 2 * i) / sparkleCount + Math.random() * 0.9;
            const dist = 18 + Math.random() * 46;
            return {
              dx: Math.cos(angle) * dist,
              dy: Math.sin(angle) * dist * 0.8,
              size: 9 + Math.random() * 11,
              delay: Math.random() * 130,
            };
          })
        : [];

      setPresses((p) => [
        ...p,
        { id: nextId.current++, x, y, size, sparkles: scatter },
      ]);
    },
    [sparkles, sparkleCount],
  );

  const remove = useCallback((id: number) => {
    setPresses((p) => p.filter((r) => r.id !== id));
  }, []);

  const layer: ReactNode = presses.map((p) => (
    <span key={p.id} aria-hidden="true">
      <span
        // The sheen owns the lifecycle: when it ends, the whole press is gone.
        onAnimationEnd={() => remove(p.id)}
        className="pointer-events-none absolute -z-10 rounded-full motion-reduce:hidden"
        style={{
          left: p.x,
          top: p.y,
          width: p.size,
          height: p.size,
          background: `radial-gradient(circle, ${sheenColor[tone]} 0%, ${sheenColor[tone]} 35%, transparent 70%)`,
          animation: "eco-sheen 620ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
        }}
      />
      {p.sparkles.map((s, i) => (
        <span
          key={i}
          className="pointer-events-none absolute motion-reduce:hidden"
          style={{
            left: p.x + s.dx,
            top: p.y + s.dy,
            animation: `eco-sparkle 700ms cubic-bezier(0.22, 1, 0.36, 1) ${s.delay}ms forwards`,
            opacity: 0,
          }}
        >
          <SparkleMark color={sparkleColor[tone]} size={s.size} />
        </span>
      ))}
    </span>
  ));

  return { press, layer };
}

/**
 * One-shot specular band travelling across a surface — the squeegee pass over
 * clean glass. Remount it (via `key`) to replay.
 */
export function ShineSweep({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden motion-reduce:hidden"
    >
      <span
        className="absolute inset-y-0 -left-1/3 w-1/3"
        style={{
          background:
            tone === "light"
              ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent)"
              : "linear-gradient(90deg, transparent, rgba(198,174,255,0.55), transparent)",
          animation: "eco-sweep 950ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
        }}
      />
    </span>
  );
}
