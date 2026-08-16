"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { formatStat } from "@/lib/utils";

/**
 * Counts from 0 to `value` the first time it scrolls into view.
 * Uses rAF rather than a timer so it stays in step with the compositor.
 */
export function CountUp({
  value,
  suffix = "",
  duration = 1600,
  compact = true,
  className,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  compact?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let started = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started) return;
        started = true;
        observer.disconnect();

        // Reduced motion still gets the number — it just arrives at once
        // rather than ticking up. Setting it here (in the observer callback
        // rather than the effect body) also keeps the initial client render
        // identical to the server's, so hydration stays clean.
        if (reduce) {
          setDisplay(value);
          return;
        }

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          // easeOutExpo — fast off the line, gentle landing.
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          setDisplay(Math.round(value * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration, reduce]);

  const text = compact ? formatStat(display) : display.toLocaleString();

  return (
    <span ref={ref} className={className}>
      <span className="tabular-nums">{text}</span>
      {suffix}
    </span>
  );
}
