import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Scene } from "@/components/ui/Scene";
import { addOns } from "@/lib/site";
import {
  IconCheck,
  IconClock,
  IconLeaf,
  IconRecycle,
  IconShield,
  IconSparkle,
} from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Services et tarifs",
  description:
    "Ménage récurrent, grand ménage, déménagement, location court terme, après-construction et entretien commercial. Prix fixes en dollars canadiens, produits certifiés ECOLOGO et Green Seal.",
};

const guarantees = [
  {
    icon: IconShield,
    title: "Assurés et inscrits",
    body: "Responsabilité civile de 2 M$, cautionnement d'entretien ménager, assurance automobile commerciale et inscription à Travail sécuritaire NB.",
  },
  {
    icon: IconClock,
    title: "Prix fixe, jamais horaire",
    body: "Vous êtes facturé par visite, pas à l'heure. Si la tâche dépasse notre estimation, c'est notre problème : la facture ne bouge pas.",
  },
  {
    icon: IconLeaf,
    title: "Certifications vérifiables",
    body: "Chaque produit porte la certification UL ECOLOGO, Green Seal ou l'équivalent reconnu. Certificat et fiche signalétique remis sur demande.",
  },
  {
    icon: IconRecycle,
    title: "Reprise sous 48 heures",
    body: "Un résultat qui ne convient pas ? Dites-le dans les 48 heures et nous revenons sans frais. Aucun formulaire, aucune négociation.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos services"
        breadcrumb="Services"
        title="Des prix fixes, affichés, en dollars canadiens"
        description="Tous les prix ci-dessous sont des forfaits par visite, avant TVH de 15 %. Facturation minimale de 150 $. Les tarifs sont révisés chaque mois d'avril, annoncés 30 jours à l'avance."
      />

      <Services
        eyebrow="Le catalogue"
        heading="Choisissez votre service"
        description="Touchez une carte pour le détail complet, le prix de départ et la durée typique d'une visite."
      />

      {/* --------------------------------------------------------- promises */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Nos garanties"
            title="Quatre choses qui ne changent pas, quel que soit le service"
          />

          <RevealGroup
            as="ul"
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {guarantees.map((item) => {
              const Icon = item.icon;
              return (
                <RevealItem as="li" key={item.title}>
                  <div className="group h-full rounded-[1.75rem] bg-lilac-50/70 p-6 ring-1 ring-lilac-100 transition-all duration-500 ease-[var(--ease-bubble)] hover:-translate-y-2 hover:bg-white hover:shadow-[var(--shadow-lift)]">
                    <span className="grid size-12 place-items-center rounded-2xl bg-brand-gradient text-white shadow-[var(--shadow-glow)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                      <Icon className="size-6" />
                    </span>
                    <h3 className="font-display mt-5 text-lg font-bold text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                      {item.body}
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
                label="Illustration de produits de nettoyage certifiés"
                className="aspect-[5/4] shadow-[var(--shadow-lift)]"
              />
            </Reveal>

            <div>
              <Reveal direction="left">
                <SectionHeading
                  eyebrow="Suppléments"
                  title="À ajouter à n'importe quel forfait"
                  description="Ces suppléments se greffent à tout service ci-dessus. Ils sont chiffrés d'avance, comme le reste — aucune surprise à la facturation."
                />
              </Reveal>

              <Reveal direction="left" delay={0.1}>
                <ul className="mt-8 overflow-hidden rounded-2xl bg-white ring-1 ring-lilac-100">
                  <li className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-lilac-100 bg-lilac-50/60 px-5 py-3 text-[0.7rem] font-bold tracking-wider text-ink-muted uppercase">
                    <span>Supplément</span>
                    <span className="text-lilac-700">Prix</span>
                  </li>
                  {addOns.map((row) => (
                    <li
                      key={row.label}
                      className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-lilac-50 px-5 py-3.5 text-sm text-ink-soft last:border-b-0"
                    >
                      <span>
                        <span className="flex items-center gap-2.5">
                          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-mint-400/20 text-mint-600">
                            <IconCheck className="size-3.5" />
                          </span>
                          {row.label}
                        </span>
                        <span
                          lang="en"
                          className="mt-0.5 block pl-[2.1rem] text-xs text-ink-muted"
                        >
                          {row.labelEn}
                        </span>
                      </span>
                      <span className="font-bold whitespace-nowrap text-ink">
                        {row.price}
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
