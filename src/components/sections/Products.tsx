"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import {
  IconArrowUpRight,
  IconCheck,
  IconRecycle,
  IconShield,
  serviceIcons,
} from "@/components/ui/Icons";
import { products } from "@/lib/site";
import { useLang } from "@/lib/i18n";

/**
 * "Our products" — the cleaning agents that actually touch your surfaces,
 * grouped by purpose. Distinct from Standards (the operating protocol): this
 * answers "what are you putting in my home?".
 *
 * Compliance: every claim here is a certification fact or a substantiated
 * process point. No unqualified "non-toxic" / "eco-friendly" — see the header
 * of `src/lib/site.ts`.
 */
export function Products() {
  const { t } = useLang();

  return (
    <section id="products" className="relative bg-white py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow={t({ fr: "Nos produits", en: "Our products" })}
          title={t({
            fr: "Ce que nous mettons réellement chez vous",
            en: "What we actually put in your space",
          })}
          description={t({
            fr: "Chaque produit ci-dessous porte la certification UL ECOLOGO, Green Seal ou l'équivalent reconnu. Nous achetons des concentrés et les diluons à l'atelier — moins d'emballage, un dosage constant.",
            en: "Every product below carries UL ECOLOGO, Green Seal or a recognised equivalent. We buy concentrates and dilute them at the shop — less packaging, consistent dosing.",
          })}
          action={
            <Button
              href="/contact#booking"
              variant="secondary"
              icon={<IconArrowUpRight className="size-3.5" />}
            >
              {t({ fr: "Voir un certificat", en: "See a certificate" })}
            </Button>
          }
        />

        <RevealGroup
          as="ul"
          className="mt-12 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {products.map((product) => {
            const Icon = serviceIcons[product.icon];
            return (
              <RevealItem as="li" key={product.name.fr}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white p-6 shadow-[var(--shadow-soft)] ring-1 ring-lilac-100 transition-all duration-500 ease-[var(--ease-bubble)] hover:-translate-y-2 hover:shadow-[var(--shadow-lift)]">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-16 -right-16 -z-10 size-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
                    style={{
                      background: `radial-gradient(circle, ${product.tint[0]}, transparent 70%)`,
                    }}
                  />

                  <div className="flex items-start justify-between gap-4">
                    <span
                      className="grid size-13 shrink-0 place-items-center rounded-2xl text-white shadow-lg transition-transform duration-500 ease-[var(--ease-bubble)] group-hover:scale-110 group-hover:-rotate-6"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${product.tint[0]}, ${product.tint[1]})`,
                      }}
                    >
                      <Icon className="size-6" />
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-mint-100 px-3 py-1 text-[0.68rem] font-bold text-mint-600">
                      <IconCheck className="size-3" />
                      {t({ fr: "Certifié", en: "Certified" })}
                    </span>
                  </div>

                  <h3 className="font-display mt-5 text-lg font-bold text-ink">
                    {t(product.name)}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                    {t(product.use)}
                  </p>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Reassurance strip — the two facts a cautious client wants confirmed. */}
        <div className="mt-8 flex flex-col gap-3 rounded-2xl bg-lilac-50/70 p-5 ring-1 ring-lilac-100 sm:flex-row sm:items-center sm:gap-6 sm:px-7">
          <p className="inline-flex items-center gap-2.5 text-sm font-semibold text-ink-soft">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-lilac-600 ring-1 ring-lilac-100">
              <IconShield className="size-4" />
            </span>
            {t({
              fr: "Certificat et fiche signalétique de chaque produit, sur demande.",
              en: "Certificate and safety data sheet for every product, on request.",
            })}
          </p>
          <span aria-hidden="true" className="hidden h-8 w-px bg-lilac-200 sm:block" />
          <p className="inline-flex items-center gap-2.5 text-sm font-semibold text-ink-soft">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-mint-600 ring-1 ring-lilac-100">
              <IconRecycle className="size-4" />
            </span>
            {t({
              fr: "Bouteilles décantées et réutilisées — pas de prêt-à-l'emploi jetable.",
              en: "Decanted, reused bottles — no single-use ready-to-use plastic.",
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
