"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Central reduced-motion policy.
 *
 * Components must NOT branch their rendered output on `useReducedMotion()`:
 * that hook reads the media query during render, so the server (which always
 * sees "no preference") and a client that prefers reduced motion produce
 * different markup, and React fails hydration.
 *
 * `reducedMotion="user"` solves it inside Framer Motion instead — transform and
 * layout animations are suppressed for those users while opacity and colour
 * still resolve, so revealed content always ends up visible. Markup is
 * identical either way. CSS keyframe animations are handled separately by the
 * `prefers-reduced-motion` block in globals.css.
 *
 * `useReducedMotion()` is still fine for effect-only logic (autoplay timers,
 * pointer listeners, count-ups) that never changes what is rendered.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
