"use client";

import { Button } from "@/components/ui/Button";
import { Scene } from "@/components/ui/Scene";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  IconArrowRight,
  IconCheck,
  IconDeep,
  IconLeaf,
  IconUsers,
} from "@/components/ui/Icons";
import { commitments } from "@/lib/site";
import { useLang } from "@/lib/i18n";

const pillars = [
  {
    fr: "Le français d'abord — devis, factures, boîte vocale et suivi, avec l'anglais à côté",
    en: "French first — quotes, invoices, voicemail and follow-up, with English alongside",
  },
  {
    fr: "Produits certifiés UL ECOLOGO ou Green Seal, certificat et fiche signalétique au dossier",
    en: "UL ECOLOGO or Green Seal certified products, certificate and safety data sheet on file",
  },
  {
    fr: "Prix fixe convenu à l'avance, jamais à l'heure, avec reprise gratuite sous 48 heures",
    en: "A flat price agreed up front, never hourly, with a free redo within 48 hours",
  },
];

export function About() {
  const { t } = useLang();
  return (
    <section id="about" className="relative bg-white py-20 lg:py-28">
      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* ------------------------------------------------------ artwork */}
          <Reveal direction="right" className="order-2 lg:order-1">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4 sm:gap-5">
                <Scene
                  tone="lilac"
                  seed={11}
                  icon={<IconUsers />}
                  label={t({ fr: "Illustration d'une équipe Eco-Clean au travail", en: "Illustration of an Eco-Clean crew at work" })}
                  className="aspect-[3/4] translate-y-6 shadow-[var(--shadow-soft)]"
                />
                <Scene
                  tone="mint"
                  seed={5}
                  icon={<IconDeep />}
                  label={t({ fr: "Illustration du matériel de nettoyage certifié", en: "Illustration of certified cleaning equipment" })}
                  className="aspect-[3/4] shadow-[var(--shadow-soft)]"
                />
              </div>

              <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-2xl bg-white px-5 py-3.5 shadow-[var(--shadow-lift)] ring-1 ring-lilac-100">
                <span className="grid size-11 place-items-center rounded-xl bg-brand-gradient text-white">
                  <IconLeaf className="size-5" />
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-extrabold text-ink">
                    ECOLOGO &amp; Green Seal
                  </span>
                  <span className="block text-[0.7rem] text-ink-muted">
                    {t({ fr: "Certificats au dossier", en: "Certificates on file" })}
                  </span>
                </span>
              </div>

              <div
                aria-hidden="true"
                className="animate-drift pointer-events-none absolute -top-8 -left-8 -z-10 size-40 rounded-full bg-lilac-200/50 blur-3xl"
              />
            </div>
          </Reveal>

          {/* --------------------------------------------------------- copy */}
          <div className="order-1 lg:order-2">
            <Reveal direction="left">
              <SectionHeading
                eyebrow={t({ fr: "Qui nous sommes", en: "Who we are" })}
                title={
                  <>
                    {t({
                      fr: "Une entreprise de nettoyage bâtie pour ",
                      en: "A cleaning company built for ",
                    })}
                    <span className="text-gradient">Dieppe</span>
                    {t({ fr: ", en français", en: ", in French" })}
                  </>
                }
                description={t({ fr: "Dieppe est la plus grande ville à majorité francophone à l'extérieur du Québec — près des deux tiers de la population y parle surtout français. La plupart de nos concurrents servent d'abord en anglais. Nous faisons l'inverse.", en: "Dieppe is the largest majority-francophone city outside Quebec — close to two-thirds of the population mainly speaks French. Most of our competitors default to English. We do the opposite." })}
              />
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <ul className="mt-8 flex flex-col gap-4">
                {pillars.map((item) => (
                  <li key={item.fr} className="flex items-start gap-3.5">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-mint-400/18 text-mint-600 ring-1 ring-mint-400/30">
                      <IconCheck className="size-3.5" />
                    </span>
                    <span className="text-[0.97rem] leading-relaxed text-ink-soft">
                      {t(item)}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal direction="left" delay={0.18}>
              <div className="mt-9">
                <Button
                  href="/about"
                  size="lg"
                  icon={<IconArrowRight className="size-3.5" />}
                >
                  {t({ fr: "En savoir plus", en: "Learn more about us" })}
                </Button>
              </div>
            </Reveal>

            {/* Commitments, not history: each figure is a policy we control. */}
            <Reveal direction="left" delay={0.24}>
              <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-lilac-100 pt-9 sm:grid-cols-4 lg:grid-cols-2">
                {commitments.map((item) => (
                  <div key={item.label.fr}>
                    <dt className="sr-only">{t(item.label)}</dt>
                    <dd>
                      <span className="font-display block text-3xl font-extrabold text-ink lg:text-4xl">
                        {item.value}
                        {t(item.suffix)}
                      </span>
                      <span className="mt-1.5 block text-sm text-ink-muted">
                        {t(item.label)}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
