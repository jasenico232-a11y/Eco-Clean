"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import {
  IconCheck,
  IconLeaf,
  IconRecycle,
  IconShield,
} from "@/components/ui/Icons";
import { standards } from "@/lib/site";
import { useLang } from "@/lib/i18n";

const icons = {
  recycle: IconRecycle,
  shield: IconShield,
  leaf: IconLeaf,
  check: IconCheck,
} as const;

/**
 * Replaces the testimonial carousel. A business that has not yet served
 * clients cannot publish client quotes — so this section shows the operating
 * standards a daycare director or clinic manager actually asks about on a
 * walkthrough. Every claim here is verifiable on site.
 *
 * Deliberately light-toned: the only dark band on the page is the footer, so
 * nothing mid-page reads as the end of the site.
 */
export function Standards() {
  const { t } = useLang();
  return (
    <section className="relative bg-lilac-50/60 py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 -left-32 size-80 rounded-full bg-mint-300/20 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 size-72 rounded-full bg-orchid-200/30 blur-[110px]"
      />

      <div className="relative container-page">
        <SectionHeading
          align="center"
          eyebrow={t({ fr: "Nos standards", en: "Our standards" })}
          title={t({ fr: "Ce qu'un directeur de garderie demande à voir", en: "What a daycare director asks to see" })}
          description={t({ fr: "Pas de témoignages inventés : voici les protocoles que vous pouvez vérifier vous-même, sur place, dès la première visite.", en: "No invented testimonials — these are protocols you can verify yourself, on site, from the first visit." })}
        />

        <RevealGroup
          as="ul"
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {standards.map((item) => {
            const Icon = icons[item.icon];
            return (
              <RevealItem as="li" key={item.title.fr}>
                <div className="group h-full rounded-[1.75rem] bg-white p-6 shadow-[var(--shadow-soft)] ring-1 ring-lilac-100 transition-all duration-500 ease-[var(--ease-bubble)] hover:-translate-y-2 hover:shadow-[var(--shadow-lift)]">
                  <span className="grid size-12 place-items-center rounded-2xl bg-brand-gradient text-white shadow-[var(--shadow-glow)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="font-display mt-5 text-lg font-bold text-ink">
                    {t(item.title)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {t(item.body)}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
