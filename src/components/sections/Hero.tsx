"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Scene } from "@/components/ui/Scene";
import { CloudDivider } from "@/components/ui/Dividers";
import {
  IconArrowRight,
  IconBubble,
  IconLeaf,
  IconPin,
  IconRecycle,
  IconShield,
  IconSparkle,
} from "@/components/ui/Icons";
import { useLang } from "@/lib/i18n";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { t } = useLang();

  // Pointer parallax for the decorative layer.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });

  const slowX = useTransform(sx, (v) => v * 14);
  const slowY = useTransform(sy, (v) => v * 12);
  const fastX = useTransform(sx, (v) => v * -28);
  const fastY = useTransform(sy, (v) => v * -22);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    // Skip on touch — there is no hover, and the listener would never fire.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      mx.set((e.clientX - rect.left) / rect.width - 0.5);
      my.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    return () => el.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-brand-gradient"
    >
      {/* Depth wash over the brand gradient. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_40rem_at_15%_-10%,rgba(255,255,255,0.32),transparent_60%),radial-gradient(48rem_36rem_at_95%_20%,rgba(127,240,214,0.3),transparent_62%)]"
      />

      {/* Decorative parallax bubbles — the canvas field handles the poppable
          ones. Always rendered: MotionConfig suppresses the parallax transform
          for reduced-motion users, and gating on it here would desync markup
          between server and client. */}
      <>
          <motion.div
            aria-hidden="true"
            style={{ x: slowX, y: slowY }}
            // Hidden on phones, where it would sit directly behind the H1.
            className="pointer-events-none absolute top-24 left-[6%] hidden size-28 rounded-full bg-white/12 ring-1 ring-white/25 backdrop-blur-[2px] lg:block lg:size-40"
          />
          <motion.div
            aria-hidden="true"
            style={{ x: fastX, y: fastY }}
            className="animate-float pointer-events-none absolute top-1/3 right-[8%] size-16 rounded-full bg-mint-300/25 ring-1 ring-white/30 lg:size-24"
          />
          <motion.div
            aria-hidden="true"
            style={{ x: slowX, y: fastY }}
            className="pointer-events-none absolute bottom-40 left-[38%] hidden size-12 rounded-full bg-white/16 ring-1 ring-white/30 lg:block"
          />
      </>

      <div className="relative container-page pt-14 pb-28 sm:pt-20 lg:pt-24 lg:pb-44">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ------------------------------------------------------ copy */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-full bg-white/14 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-white uppercase ring-1 ring-white/25 backdrop-blur-sm"
            >
              <IconSparkle className="size-3.5 text-mint-300" />
              {t({ fr: "Certifié ECOLOGO & Green Seal", en: "ECOLOGO & Green Seal certified" })}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.75,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 text-[2.6rem] leading-[1.05] font-extrabold text-white sm:text-6xl lg:text-[4.1rem]"
            >
              {t({
                fr: "Nettoyage certifié écologique à ",
                en: "Certified green cleaning in ",
              })}
              <span className="relative inline-block">
                <span className="relative z-10">Dieppe</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 200 16"
                  className="absolute -bottom-1 left-0 w-full"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 11C48 4 152 3 197 8"
                    stroke="#7ff0d6"
                    strokeWidth="5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-4 text-lg font-semibold text-mint-200 sm:text-xl"
            >
              {t({
                fr: "Au service des familles, garderies et cliniques de Dieppe",
                en: "For Dieppe families, daycares and clinics",
              })}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-lilac-50/85 sm:text-lg"
            >
              {t({
                fr: "Tous nos produits portent la certification UL ECOLOGO ou Green Seal — certificats et fiches signalétiques sur demande. Filtration HEPA, formulations à faible COV, gamme sans parfum offerte. Prix fixe écrit le jour même, reprise gratuite sous 48 heures.",
                en: "Every product we use carries UL ECOLOGO or Green Seal certification — certificates and safety data sheets on request. HEPA filtration, low-VOC formulations, fragrance-free line available. Written flat price the same day, free redo within 48 hours.",
              })}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button
                href="/contact#booking"
                size="lg"
                variant="mint"
                icon={<IconArrowRight className="size-3.5" />}
              >
                {t({ fr: "Demander une soumission", en: "Request a quote" })}
              </Button>
              <Button href="/services" size="lg" variant="ghost">
                {t({ fr: "Voir nos services", en: "See our services" })}
              </Button>
            </motion.div>

            {/* Proof points, not social proof. A pre-launch business has no
                clients to quote and no rating to display, so everything here
                is a verifiable fact about how we operate. */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.38,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-semibold text-lilac-50/85"
            >
              <span className="inline-flex items-center gap-1.5">
                <IconLeaf className="size-4 text-mint-300" />
                {t({ fr: "Produits certifiés ECOLOGO & Green Seal", en: "ECOLOGO & Green Seal certified products" })}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <IconShield className="size-4 text-mint-300" />
                {t({ fr: "Assurance responsabilité 2 M$", en: "$2M liability cover" })}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <IconRecycle className="size-4 text-mint-300" />
                {t({ fr: "Filtration HEPA · faible COV", en: "HEPA filtration · low-VOC" })}
              </span>
            </motion.div>
          </div>

          {/* --------------------------------------------------- artwork */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <Scene
              tone="deep"
              seed={3}
              label={t({ fr: "Illustration d'une équipe Eco-Clean au travail", en: "Illustration of an Eco-Clean crew at work" })}
              icon={<IconBubble />}
              className="aspect-[4/3.4] w-full shadow-[var(--shadow-lift)] ring-1 ring-white/25 sm:aspect-[4/3]"
            />

            {/* Floating credential cards */}
            <motion.div
              style={{ x: fastX, y: fastY }}
              className="absolute -bottom-6 -left-2 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-[var(--shadow-lift)] backdrop-blur sm:-left-6"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-mint-100 text-mint-600">
                <IconLeaf className="size-5" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-bold text-ink">
                  {t({ fr: "Certifié", en: "Certified" })}
                </span>
                <span className="block text-[0.7rem] text-ink-muted">
                  ECOLOGO & Green Seal
                </span>
              </span>
            </motion.div>

            <motion.div
              style={{ x: slowX, y: slowY }}
              className="absolute -top-4 -right-1 rounded-2xl bg-white/95 px-4 py-3 text-center shadow-[var(--shadow-lift)] backdrop-blur sm:-right-5"
            >
              <span className="text-gradient block text-xl font-extrabold">
                {t({ fr: "48 h", en: "48 hrs" })}
              </span>
              <span className="block text-[0.68rem] font-semibold text-ink-muted">
                {t({ fr: "Reprise gratuite", en: "Free redo" })}
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Service-area note. Replaces the old "tap a bubble" hint: bubbles are
            no longer ambient, so there is nothing drifting past to invite. */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.9 }}
          className="mt-14 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-lilac-50/80 ring-1 ring-white/20 backdrop-blur-sm"
        >
          <IconPin className="size-4 text-mint-300" />
          {t({ fr: "Dieppe · Moncton · Riverview — service en français, en anglais au besoin", en: "Dieppe · Moncton · Riverview — served in French, English on request" })}
        </motion.p>
      </div>

      <CloudDivider className="absolute inset-x-0 bottom-0" />
    </section>
  );
}
