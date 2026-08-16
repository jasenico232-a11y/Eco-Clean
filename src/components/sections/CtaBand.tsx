"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { IconArrowRight, IconPhone, IconSparkle } from "@/components/ui/Icons";
import { site } from "@/lib/site";
import { BubbleReveal } from "@/components/bubbles/BubbleReveal";

export function CtaBand() {
  return (
    <section className="relative bg-white py-16 lg:py-24">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          // The band is a container, not a control — clicking dead space used
          // to fire an effect, which made the whole section feel falsely
          // interactive. The CTAs inside carry the affordance now.
          className="relative isolate overflow-hidden rounded-[2rem] bg-brand-gradient px-6 py-14 shadow-[var(--shadow-lift)] sm:rounded-[2.5rem] sm:px-12 lg:px-16 lg:py-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_24rem_at_10%_0%,rgba(255,255,255,0.3),transparent_60%)]"
          />

          {/* The one ambient bubble moment on the page: it rises as the final
              call to action scrolls into view, once per visit, then clears. */}
          <BubbleReveal
            colors={["#ffffff", "#7ff0d6", "#c6aeff", "#f9b4e6"]}
            count={18}
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
                Prêts quand vous l’êtes
              </span>
              <h2 className="mt-5 text-3xl leading-tight font-extrabold text-white sm:text-4xl lg:text-[2.9rem]">
                Demandez votre soumission dès aujourd’hui
              </h2>
              <p className="mt-4 text-[1.02rem] leading-relaxed text-lilac-50/85">
                Dites-nous en quoi consiste l’espace et recevez un prix fixe écrit le jour même. Réponse en moins de deux heures ouvrables, en français ou en anglais.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col lg:items-stretch">
              <Button
                href="/contact#booking"
                size="lg"
                variant="mint"
                icon={<IconArrowRight className="size-3.5" />}
              >
                Demander une soumission
              </Button>
              <Button
                href={site.phoneHref}
                external
                size="lg"
                variant="ghost"
                icon={<IconPhone className="size-3.5" />}
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
