"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll-reveal helpers.
 *
 * These deliberately do NOT branch on `useReducedMotion()` — doing so would
 * change the markup between server and client for users who prefer reduced
 * motion and break hydration. `MotionProvider` applies `reducedMotion="user"`
 * globally, which strips the transform half of these animations while letting
 * opacity resolve, so content always ends up visible.
 */

type Direction = "up" | "down" | "left" | "right" | "scale" | "none";

const offsets: Record<Direction, { x: number; y: number; scale: number }> = {
  up: { x: 0, y: 28, scale: 1 },
  down: { x: 0, y: -28, scale: 1 },
  left: { x: 36, y: 0, scale: 1 },
  right: { x: -36, y: 0, scale: 1 },
  scale: { x: 0, y: 14, scale: 0.94 },
  none: { x: 0, y: 0, scale: 1 },
};

const VIEWPORT = { once: true, margin: "-80px 0px -60px 0px" } as const;
const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  className,
  as = "div",
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  as?: "div" | "li" | "section" | "span";
}) {
  const from = offsets[direction];
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, x: from.x, y: from.y, scale: from.scale }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

/** Staggers direct children on scroll-in. Pair with <RevealItem>. */
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "ol" | "section";
}) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-70px 0px -50px 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: 26, scale: 0.97 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.6, ease: EASE },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}
