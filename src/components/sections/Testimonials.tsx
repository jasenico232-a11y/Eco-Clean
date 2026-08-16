"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconQuote, IconStar } from "@/components/ui/Icons";
import { testimonials } from "@/lib/site";
import { cn } from "@/lib/utils";

const ROTATE_MS = 7000;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const go = useCallback((next: number) => {
    setIndex(((next % testimonials.length) + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      ROTATE_MS,
    );
    return () => window.clearInterval(id);
  }, [paused, reduce]);

  const active = testimonials[index];

  return (
    <section
      className="relative overflow-hidden bg-ink-gradient py-20 lg:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 size-[30rem] rounded-full bg-lilac-500/25 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -bottom-24 size-[24rem] rounded-full bg-mint-500/18 blur-[110px]"
      />

      <div className="relative container-page">
        <SectionHeading
          align="center"
          tone="dark"
          eyebrow="Client stories"
          title="Trusted in 640+ homes and 90 workplaces"
          description="Every quote below comes from a client who has been with us at least a year."
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          <IconQuote
            className="mx-auto mb-6 size-10 text-lilac-400/60"
            aria-hidden="true"
          />

          <div
            className="relative min-h-[15rem] sm:min-h-[13rem]"
            aria-live="polite"
          >
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <div className="mb-5 flex justify-center gap-1 text-mint-300">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStar key={i} className="size-4" />
                  ))}
                </div>

                <blockquote className="font-display text-xl leading-relaxed font-semibold text-white text-balance sm:text-2xl">
                  “{active.quote}”
                </blockquote>

                <figcaption className="mt-7 flex items-center justify-center gap-3.5">
                  <span className="grid size-12 place-items-center rounded-full bg-brand-gradient text-sm font-bold text-white ring-2 ring-white/25">
                    {active.initials}
                  </span>
                  <span className="text-left leading-tight">
                    <span className="block font-bold text-white">
                      {active.name}
                    </span>
                    <span className="block text-sm text-lilac-100/65">
                      {active.role}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2.5">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show testimonial from ${t.name}`}
                aria-current={i === index}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-400 ease-[var(--ease-bubble)]",
                  i === index
                    ? "w-9 bg-mint-400"
                    : "w-2.5 bg-white/25 hover:bg-white/45",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
