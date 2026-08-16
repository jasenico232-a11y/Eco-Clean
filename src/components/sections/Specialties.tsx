"use client";

import { Button } from "@/components/ui/Button";
import { Scene } from "@/components/ui/Scene";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import {
  IconArrowUpRight,
  IconHome,
  IconShield,
  IconUsers,
} from "@/components/ui/Icons";
import { specialties } from "@/lib/site";
import { useLang } from "@/lib/i18n";

const icons = {
  users: IconUsers,
  shield: IconShield,
  home: IconHome,
} as const;

/**
 * Replaces the placeholder blog. Three segments, straight from §A1 — a
 * specialist beats a generalist in a crowded market, and these are the ones
 * where certified products actually change the buying decision.
 */
export function Specialties() {
  const { t } = useLang();
  return (
    <section className="relative bg-white py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow={t({ fr: "Notre spécialité", en: "Our specialism" })}
          title={t({ fr: "Là où la certification change vraiment quelque chose", en: "Where certification actually changes the decision" })}
          description={t({ fr: "Nous ne prétendons pas tout faire. Nous servons trois milieux où la preuve de certification compte au moment de choisir un fournisseur.", en: "We do not claim to do everything. We serve three settings where proof of certification decides who gets the contract." })}
          action={
            <Button
              href="/contact#booking"
              variant="secondary"
              icon={<IconArrowUpRight className="size-3.5" />}
            >
              {t({ fr: "Demander une soumission", en: "Request a quote" })}
            </Button>
          }
        />

        <RevealGroup
          as="ul"
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {specialties.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <RevealItem as="li" key={item.title.fr}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[var(--shadow-soft)] ring-1 ring-lilac-100 transition-all duration-500 ease-[var(--ease-bubble)] hover:-translate-y-2 hover:shadow-[var(--shadow-lift)]">
                  <Scene
                    tone={item.tone}
                    seed={i * 9 + 4}
                    icon={<Icon />}
                    className="aspect-[16/10] rounded-none"
                  />

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-bold text-ink transition-colors duration-300 group-hover:text-lilac-700">
                      {t(item.title)}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                      {t(item.body)}
                    </p>
                  </div>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
