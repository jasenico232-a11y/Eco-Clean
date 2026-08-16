"use client";

import { useEffect, useRef } from "react";
import { BubbleEngine } from "./engine";
import { useBubbles } from "./BubbleProvider";

/**
 * Full-viewport bubble canvas.
 *
 * Idle almost all of the time: the engine parks its render loop whenever the
 * screen is clean, and only wakes when a burst is triggered. Pointer work is
 * likewise skipped while nothing is on screen.
 *
 * The canvas is `pointer-events: none` so it never steals a click from the UI
 * underneath; popping is done by hit-testing window-level pointer events
 * instead, which keeps buttons underneath fully clickable.
 */
export function BubbleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { register } = useBubbles();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let engine: BubbleEngine;
    try {
      engine = new BubbleEngine(canvas, {
        reducedMotion: motionQuery.matches,
      });
    } catch {
      // No 2D context (very old or locked-down browser) — the site is fully
      // usable without the field, so fail silently.
      return;
    }

    register(engine);

    let resizeFrame = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => engine.resize());
    };

    const onPointerMove = (e: PointerEvent) => {
      // Nothing on screen means nothing to repel — skip the work entirely.
      if (!engine.isActive()) return;
      engine.setPointer(e.clientX, e.clientY, true);
    };

    const onPointerLeave = () => {
      engine.setPointer(-9999, -9999, false);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (!engine.isActive()) return;
      // Touch has no hover, so seed the pointer before testing.
      engine.setPointer(e.clientX, e.clientY, e.pointerType !== "touch");
      engine.hitTest(e.clientX, e.clientY);
    };

    const onVisibility = () => engine.setPaused(document.hidden);

    const onMotionChange = (e: MediaQueryListEvent) => {
      engine.setReducedMotion(e.matches);
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      cancelAnimationFrame(resizeFrame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery.removeEventListener("change", onMotionChange);
      engine.destroy();
      register(null);
    };
  }, [register]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 h-full w-full"
      style={{ contain: "strict" }}
    />
  );
}
