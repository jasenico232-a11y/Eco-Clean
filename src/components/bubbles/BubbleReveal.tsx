"use client";

import { useEffect, useRef } from "react";
import { useBubbles } from "./BubbleProvider";

/**
 * Releases a bubble moment when the visitor scrolls this element into view.
 *
 * Fires **once per page view**. That constraint is the whole point: an effect
 * that re-triggers every time the element re-enters the viewport turns into
 * ambient noise the moment someone scrolls up and back down — which is exactly
 * what we removed. One reward for reaching the end, then it stays quiet.
 *
 * Bubbles rise from the element's own top edge, so the effect reads as coming
 * from the content rather than from a detached overlay.
 */
export function BubbleReveal({
  colors,
  count = 16,
  /** How much of the element must be visible before firing. */
  threshold = 0.45,
}: {
  colors?: string[];
  count?: number;
  threshold?: number;
}) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const { burst } = useBubbles();

  useEffect(() => {
    const el = anchorRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let fired = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (fired || !entries[0].isIntersecting) return;
        fired = true;
        observer.disconnect();

        const rect = el.getBoundingClientRect();
        // Launch along the width of the band, from just below its top edge.
        burst(rect.left + rect.width / 2, rect.top + rect.height * 0.72, {
          colors,
          count,
          spread: Math.min(rect.width * 0.42, 340),
        });
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [burst, colors, count, threshold]);

  return (
    <div
      ref={anchorRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    />
  );
}
