"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { IconArrowRight, IconPhone, IconSparkle } from "@/components/ui/Icons";
import { site } from "@/lib/site";
import { useBubbles } from "@/components/bubbles/BubbleProvider";

export function CtaBand() {
  const { surge, pop } = useBubbles();

  return (
    <section className="relative bg-white py-16 lg:py-24">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => {
            // Anywhere on the band releases a celebratory wave.
            surge({
              colors: ["#ffffff", "#7ff0d6", "#c6aeff", "#f9b4e6"],
              amount: 20,
              duration: 6,
              origin: { x: e.clientX, y: e.clientY },
            });
            pop(e.clientX, e.clientY, {
              colors: ["#ffffff", "#7ff0d6"],
              count: 14,
              radius: 28,
            });
          }}
          className="relative isolate cursor-pointer overflow-hidden rounded-[2rem] bg-brand-gradient px-6 py-14 shadow-[var(--shadow-lift)] sm:rounded-[2.5rem] sm:px-12 lg:px-16 lg:py-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_24rem_at_10%_0%,rgba(255,255,255,0.3),transparent_60%)]"
          />
          <span
            aria-hidden="true"
            className="animate-float pointer-events-none absolute -top-10 right-16 size-32 rounded-full bg-white/12 ring-1 ring-white/25"
          />
          <span
            aria-hidden="true"
            className="animate-float-slow pointer-events-none absolute -bottom-12 left-10 size-40 rounded-full bg-mint-300/18 ring-1 ring-white/20"
          />

          <div className="relative flex flex-col items-center gap-9 text-center lg:flex-row lg:justify-between lg:text-left">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/16 px-3.5 py-1.5 text-xs font-semibold tracking-[0.14em] text-white uppercase ring-1 ring-white/25">
                <IconSparkle className="size-3.5 text-mint-300" />
                Ready when you are
              </span>
              <h2 className="mt-5 text-3xl leading-tight font-extrabold text-white sm:text-4xl lg:text-[2.9rem]">
                Join thousands of happy clients and book today
              </h2>
              <p className="mt-4 text-[1.02rem] leading-relaxed text-lilac-50/85">
                Booking takes ninety seconds. Pick your date, tell us about the
                space, and your fixed quote lands within two hours.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col lg:items-stretch">
              <Button
                href="/contact#booking"
                size="lg"
                variant="mint"
                icon={<IconArrowRight className="size-3.5" />}
                onClick={(e) => e.stopPropagation()}
              >
                Book a cleaning now
              </Button>
              <Button
                href={site.phoneHref}
                external
                size="lg"
                variant="ghost"
                icon={<IconPhone className="size-3.5" />}
                onClick={(e) => e.stopPropagation()}
              >
                {site.phone}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
