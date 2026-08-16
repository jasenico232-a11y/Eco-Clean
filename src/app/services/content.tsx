"use client";

import { PageHero } from "@/components/sections/PageHero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Scene } from "@/components/ui/Scene";
import { addOns } from "@/lib/site";
import { useLang } from "@/lib/i18n";
import {
  IconCheck,
  IconClock,
  IconLeaf,
  IconRecycle,
  IconShield,
  IconSparkle,
} from "@/components/ui/Icons";

const guarantees = [
  {
    icon: IconShield,
    title: { fr: "Assurés et inscrits", en: "Insured and registered" },
    body: {
      fr: "Responsabilité civile de 2 M$, cautionnement d'entretien ménager, assurance automobile commerciale et inscription à Travail sécuritaire NB.",
      en: "$2M general liability, a janitorial bond, commercial auto cover and WorkSafeNB registration.",
    },
  },
  {
    icon: IconClock,
    title: { fr: "Prix fixe, jamais horaire", en: "Flat price, never hourly" },
    body: {
      fr: "Vous êtes facturé par visite, pas à l'heure. Si la tâche dépasse notre estimation, c'est notre problème : la facture ne bouge pas.",
      en: "You are billed per visit, not per hour. If the job runs past our estimate, that is our problem — the invoice does not move.",
    },
  },
  {
    icon: IconLeaf,
    title: { fr: "Certifications vérifiables", en: "Verifiable certifications" },
    body: {
      fr: "Chaque produit porte la certification UL ECOLOGO, Green Seal ou l'équivalent reconnu. Certificat et fiche signalétique remis sur demande.",
      en: "Every product carries UL ECOLOGO, Green Seal or a recognised equivalent. Certificate and safety data sheet handed over on request.",
    },
  },
  {
    icon: IconRecycle,
    title: { fr: "Reprise sous 48 heures", en: "48-hour redo" },
    body: {
      fr: "Un résultat qui ne convient pas ? Dites-le dans les 48 heures et nous revenons sans frais. Aucun formulaire, aucune négociation.",
      en: "Not happy with the result? Tell us within 48 hours and we return free. No forms, no negotiation.",
    },
  },
];

export function ServicesContent() {
  const { t } = useLang();

  return (
    <>
      <PageHero
        eyebrow={t({ fr: "Nos services", en: "Our services" })}
        breadcrumb={t({ fr: "Services", en: "Services" })}
        title={t({ fr: "Des prix fixes, affichés, en dollars canadiens", en: "Flat prices, published, in Canadian dollars" })}
        description={t({ fr: "Tous les prix ci-dessous sont des forfaits par visite, avant TVH de 15 %. Facturation minimale de 150 $. Les tarifs sont révisés chaque mois d'avril, annoncés 30 jours à l'avance.", en: "Every price below is a flat rate per visit, before 15% HST. $150 minimum charge. Rates are reviewed each April and announced 30 days ahead." })}
      />

      <Services
        eyebrow={{ fr: "Le catalogue", en: "The catalogue" }}
        heading={{ fr: "Choisissez votre service", en: "Choose your service" }}
        description={{
          fr: "Touchez une carte pour le détail complet, le prix de départ et la durée typique d'une visite.",
          en: "Tap a card for the full inclusion list, the starting price and how long a typical visit takes.",
        }}
      />

      {/* --------------------------------------------------------- promises */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow={t({ fr: "Nos garanties", en: "Our guarantees" })}
            title={t({ fr: "Quatre choses qui ne changent pas, quel que soit le service", en: "Four things that never change, whichever service you book" })}
          />

          <RevealGroup
            as="ul"
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {guarantees.map((item) => {
              const Icon = item.icon;
              return (
                <RevealItem as="li" key={item.title.fr}>
                  <div className="group h-full rounded-[1.75rem] bg-lilac-50/70 p-6 ring-1 ring-lilac-100 transition-all duration-500 ease-[var(--ease-bubble)] hover:-translate-y-2 hover:bg-white hover:shadow-[var(--shadow-lift)]">
                    <span className="grid size-12 place-items-center rounded-2xl bg-brand-gradient text-white shadow-[var(--shadow-glow)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                      <Icon className="size-6" />
                    </span>
                    <h3 className="font-display mt-5 text-lg font-bold text-ink">
                      {t(item.title)}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                      {t(item.body)}
                    </p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ----------------------------------------------------------- add-ons */}
      <section className="mesh-soft py-20 lg:py-28">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal direction="right">
              <Scene
                tone="lilac"
                seed={21}
                icon={<IconSparkle />}
                label={t({ fr: "Illustration de produits de nettoyage certifiés", en: "Illustration of certified cleaning products" })}
                className="aspect-[5/4] shadow-[var(--shadow-lift)]"
              />
            </Reveal>

            <div>
              <Reveal direction="left">
                <SectionHeading
                  eyebrow={t({ fr: "Suppléments", en: "Add-ons" })}
                  title={t({ fr: "À ajouter à n'importe quel forfait", en: "Add to any package" })}
                  description={t({ fr: "Ces suppléments se greffent à tout service ci-dessus. Ils sont chiffrés d'avance, comme le reste — aucune surprise à la facturation.", en: "These bolt on to any service above. Priced up front like everything else — no surprises on the invoice." })}
                />
              </Reveal>

              <Reveal direction="left" delay={0.1}>
                <ul className="mt-8 overflow-hidden rounded-2xl bg-white ring-1 ring-lilac-100">
                  <li className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-lilac-100 bg-lilac-50/60 px-5 py-3 text-[0.7rem] font-bold tracking-wider text-ink-muted uppercase">
                    <span>{t({ fr: "Supplément", en: "Add-on" })}</span>
                    <span className="text-lilac-700">{t({ fr: "Prix", en: "Price" })}</span>
                  </li>
                  {addOns.map((row) => (
                    <li
                      key={row.label.fr}
                      className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-lilac-50 px-5 py-3.5 text-sm text-ink-soft last:border-b-0"
                    >
                      <span>
                        <span className="flex items-center gap-2.5">
                          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-mint-400/20 text-mint-600">
                            <IconCheck className="size-3.5" />
                          </span>
                          {t(row.label)}
                        </span>
                      </span>
                      <span className="font-bold whitespace-nowrap text-ink">
                        {t(row.price)}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <Process />
      <Faq />
      <CtaBand />
    </>
  );
}
