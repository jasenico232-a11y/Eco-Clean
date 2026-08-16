"use client";

import { useEffect, useRef } from "react";
import { BubbleEngine } from "./engine";
import { useBubbles } from "./BubbleProvider";

/**
 * Full-viewport bubble canvas.
 *
 * The canvas is `pointer-events: none` so it never steals a click from the UI
 * underneath; pops are detected by hit-testing window-level pointer events
 * instead. That way a bubble drifting over a button is poppable *and* the
 * button still works.
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
    engine.start();

    let resizeFrame = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => engine.resize());
    };

    const onPointerMove = (e: PointerEvent) => {
      engine.setPointer(e.clientX, e.clientY, true);
    };

    const onPointerLeave = () => {
      engine.setPointer(-9999, -9999, false);
    };

    const onPointerDown = (e: PointerEvent) => {
      // Touch has no hover, so seed the pointer before testing.
      engine.setPointer(e.clientX, e.clientY, e.pointerType !== "touch");
      engine.hitTest(e.clientX, e.clientY);
    };

    const onVisibility = () => {
      if (document.hidden) engine.stop();
      else engine.start();
    };

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
