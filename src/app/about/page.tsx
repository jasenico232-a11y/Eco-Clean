import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Standards } from "@/components/sections/Standards";
import { CtaBand } from "@/components/sections/CtaBand";
import { TrustBar } from "@/components/sections/TrustBar";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Scene } from "@/components/ui/Scene";
import {
  IconBubble,
  IconLeaf,
  IconRecycle,
  IconShield,
  IconUsers,
} from "@/components/ui/Icons";
import { commitments } from "@/lib/site";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Eco-Clean est une entreprise de nettoyage de Dieppe qui sert d'abord en français, avec des produits certifiés UL ECOLOGO et Green Seal, et des certificats vérifiables sur demande.",
};

const values = [
  {
    icon: IconUsers,
    titleFr: "Le français d'abord",
    titleEn: "French first",
    body: "Dieppe est la plus grande ville à majorité francophone hors Québec. Nos devis, factures, boîte vocale et suivis mènent en français, avec l'anglais à côté. Vous choisissez votre langue au premier contact et nous nous y tenons.",
  },
  {
    icon: IconLeaf,
    titleFr: "Certifié, pas seulement « vert »",
    titleEn: "Certified, not just “green”",
    body: "Chaque produit porte la certification UL ECOLOGO, Green Seal ou l'équivalent reconnu. Aucune exception, même pour les travaux difficiles. Le certificat et la fiche signalétique sont au dossier et disponibles sur demande.",
  },
  {
    icon: IconShield,
    titleFr: "Le prix annoncé est le prix payé",
    titleEn: "The quote is the price",
    body: "Tarif forfaitaire écrit, valable 14 jours, avec ce qui est inclus et ce qui ne l'est pas. Si la tâche prend plus de temps que notre estimation, nous l'absorbons. Facturation minimale de 150 $ par visite.",
  },
  {
    icon: IconRecycle,
    titleFr: "Concentrés, pas de prêt-à-l'emploi",
    titleEn: "Concentrates, not ready-to-use",
    body: "Nous achetons des concentrés et diluons à l'atelier. Cela réduit le coût par contrat et la quantité d'emballage — une réduction que nous pouvons chiffrer, et donc affirmer.",
  },
];

const commitmentDetail = [
  {
    titleFr: "Réponse en 2 heures ouvrables",
    body: "Toute demande reçoit une réponse dans les deux heures ouvrables, et une soumission écrite le jour même.",
  },
  {
    titleFr: "Premier grand ménage obligatoire",
    body: "Tout contrat récurrent commence par un grand ménage payant. C'est la seule façon honnête de partir d'une base propre.",
  },
  {
    titleFr: "Reprise gratuite sous 48 heures",
    body: "Si quelque chose ne va pas, dites-le dans les 48 heures et nous revenons sans frais. Le propriétaire se déplace lui-même la première année.",
  },
  {
    titleFr: "Devis sur place pour les gros travaux",
    body: "L'après-construction et le commercial ne sont jamais estimés par téléphone. Nous visitons le site avant de donner un prix.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Qui nous sommes"
        breadcrumb="À propos"
        title="Une entreprise de nettoyage bâtie pour Dieppe"
        description="Nous sommes une jeune entreprise, et nous préférons le dire clairement plutôt que d'inventer un historique. Ce que nous pouvons prouver dès aujourd'hui : nos certifications, nos protocoles et nos prix."
      />

      <TrustBar />

      {/* ------------------------------------------------------------ story */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container-page">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal direction="right">
              <div className="relative">
                <Scene
                  tone="deep"
                  seed={31}
                  icon={<IconBubble />}
                  label="Illustration de l'équipe Eco-Clean à Dieppe"
                  className="aspect-[4/3] shadow-[var(--shadow-lift)]"
                />
                <div className="absolute -right-3 -bottom-6 rounded-2xl bg-white px-5 py-4 text-center shadow-[var(--shadow-lift)] ring-1 ring-lilac-100 sm:-right-6">
                  <span className="text-gradient font-display block text-3xl font-extrabold">
                    2/3
                  </span>
                  <span className="mt-1 block text-[0.7rem] font-semibold text-ink-muted">
                    de Dieppe parle
                    <br />
                    surtout français
                  </span>
                </div>
              </div>
            </Reveal>

            <div>
              <Reveal direction="left">
                <SectionHeading
                  eyebrow="Pourquoi nous existons"
                  title={
                    <>
                      Un marché bien servi en anglais,{" "}
                      <span className="text-gradient">beaucoup moins en français</span>
                    </>
                  }
                  description="Dieppe compte environ 35 000 personnes et a crû de plus de 20 % en trois ans, à l'intérieur d'une des régions métropolitaines qui croissent le plus vite au Canada."
                />
              </Reveal>

              <Reveal direction="left" delay={0.1}>
                <div className="mt-6 flex flex-col gap-4 text-[0.98rem] leading-relaxed text-ink-soft">
                  <p>
                    Près des deux tiers de la population parle surtout français,
                    et le revenu médian des ménages avoisine 87 000 $. Pourtant,
                    la plupart des entreprises de nettoyage de la région servent
                    d&apos;abord en anglais et parlent de produits «&nbsp;verts&nbsp;»
                    sans jamais montrer un certificat.
                  </p>
                  <p>
                    Nous faisons les deux choses à l&apos;envers de cette
                    habitude : le français d&apos;abord, et la preuve avant la
                    promesse. Pour une garderie ou une clinique, c&apos;est
                    exactement ce qui fait la différence au moment de choisir.
                  </p>
                </div>
              </Reveal>

              <Reveal direction="left" delay={0.18}>
                <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-lilac-100 pt-9">
                  {commitments.map((item) => (
                    <div key={item.label}>
                      <dt className="sr-only">{item.label}</dt>
                      <dd>
                        <span className="font-display block text-3xl font-extrabold text-ink">
                          {item.value}
                          {item.suffix}
                        </span>
                        <span className="mt-1.5 block text-sm text-ink-muted">
                          {item.label}
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

      {/* ----------------------------------------------------------- values */}
      <section className="mesh-soft py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Ce qui ne changera pas"
            title="Quatre engagements que la croissance ne fera pas plier"
          />

          <RevealGroup as="ul" className="mt-12 grid gap-5 sm:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <RevealItem as="li" key={value.titleFr}>
                  <div className="group flex h-full gap-5 rounded-[1.75rem] bg-white p-6 shadow-[var(--shadow-soft)] ring-1 ring-lilac-100 transition-all duration-500 ease-[var(--ease-bubble)] hover:-translate-y-2 hover:shadow-[var(--shadow-lift)] sm:p-7">
                    <span className="grid size-13 shrink-0 place-items-center self-start rounded-2xl bg-brand-gradient text-white shadow-[var(--shadow-glow)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                      <Icon className="size-6" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg leading-snug font-bold text-ink">
                        {value.titleFr}
                      </h3>
                      <p
                        lang="en"
                        className="mt-1 text-[0.78rem] font-semibold text-lilac-600"
                      >
                        {value.titleEn}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                        {value.body}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ------------------------------------------------------ commitments */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Nos règles de service"
            title="Ce que vous pouvez exiger de nous"
          />

          <RevealGroup as="ol" className="mx-auto mt-14 max-w-3xl">
            <span
              aria-hidden="true"
              className="absolute top-2 bottom-2 left-[1.35rem] w-0.5 bg-[linear-gradient(180deg,var(--color-lilac-300),var(--color-mint-300))] sm:left-[1.6rem]"
            />
            {commitmentDetail.map((item, i) => (
              <RevealItem as="li" key={item.titleFr}>
                <div className="relative flex gap-6 pb-10 last:pb-0">
                  <span className="font-display relative z-10 grid size-11 shrink-0 place-items-center rounded-full bg-brand-gradient text-sm font-extrabold text-white shadow-[var(--shadow-glow)] ring-4 ring-white sm:size-14">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 rounded-2xl bg-lilac-50/70 p-5 ring-1 ring-lilac-100 sm:p-6">
                    <h3 className="font-display text-lg font-bold text-ink">
                      {item.titleFr}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {item.body}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <Standards />
      <CtaBand />
    </>
  );
}
