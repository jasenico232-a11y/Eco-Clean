"use client";

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
import { useLang } from "@/lib/i18n";

const values = [
  {
    icon: IconUsers,
    title: { fr: "Le français d'abord", en: "French first" },
    body: {
      fr: "Dieppe est la plus grande ville à majorité francophone hors Québec. Nos devis, factures, boîte vocale et suivis mènent en français, avec l'anglais à côté. Vous choisissez votre langue au premier contact et nous nous y tenons.",
      en: "Dieppe is the largest majority-francophone city outside Quebec. Our quotes, invoices, voicemail and follow-ups lead in French with English alongside. You pick your language at first contact and we hold to it.",
    },
  },
  {
    icon: IconLeaf,
    title: {
      fr: "Certifié, pas seulement « vert »",
      en: "Certified, not merely “green”",
    },
    body: {
      fr: "Chaque produit porte la certification UL ECOLOGO, Green Seal ou l'équivalent reconnu. Aucune exception, même pour les travaux difficiles. Le certificat et la fiche signalétique sont au dossier et disponibles sur demande.",
      en: "Every product carries UL ECOLOGO, Green Seal or a recognised equivalent. No exceptions, not even for tough jobs. The certificate and safety data sheet are on file and available on request.",
    },
  },
  {
    icon: IconShield,
    title: {
      fr: "Le prix annoncé est le prix payé",
      en: "The quote is the price",
    },
    body: {
      fr: "Tarif forfaitaire écrit, valable 14 jours, avec ce qui est inclus et ce qui ne l'est pas. Si la tâche prend plus de temps que notre estimation, nous l'absorbons. Facturation minimale de 150 $ par visite.",
      en: "A written flat rate, valid 14 days, stating what is and is not included. If the job takes longer than we estimated, we absorb it. Minimum charge $150 per visit.",
    },
  },
  {
    icon: IconRecycle,
    title: {
      fr: "Concentrés, pas de prêt-à-l'emploi",
      en: "Concentrates, not ready-to-use",
    },
    body: {
      fr: "Nous achetons des concentrés et diluons à l'atelier. Cela réduit le coût par contrat et la quantité d'emballage — une réduction que nous pouvons chiffrer, et donc affirmer.",
      en: "We buy concentrates and dilute at the shop. That cuts cost per job and packaging volume — a reduction we can actually quantify, and therefore claim.",
    },
  },
];

const commitmentDetail = [
  {
    title: {
      fr: "Réponse en 2 heures ouvrables",
      en: "A reply within 2 working hours",
    },
    body: {
      fr: "Toute demande reçoit une réponse dans les deux heures ouvrables, et une soumission écrite le jour même.",
      en: "Every enquiry gets an answer within two working hours, and a written quote the same day.",
    },
  },
  {
    title: {
      fr: "Premier grand ménage obligatoire",
      en: "A mandatory first deep clean",
    },
    body: {
      fr: "Tout contrat récurrent commence par un grand ménage payant. C'est la seule façon honnête de partir d'une base propre.",
      en: "Every recurring contract starts with a paid deep clean. It is the only honest way to start from a clean baseline.",
    },
  },
  {
    title: {
      fr: "Reprise gratuite sous 48 heures",
      en: "A free redo within 48 hours",
    },
    body: {
      fr: "Si quelque chose ne va pas, dites-le dans les 48 heures et nous revenons sans frais. Le propriétaire se déplace lui-même la première année.",
      en: "If something is not right, tell us within 48 hours and we return free. The owner attends personally through the first year.",
    },
  },
  {
    title: {
      fr: "Devis sur place pour les gros travaux",
      en: "On-site quotes for big jobs",
    },
    body: {
      fr: "L'après-construction et le commercial ne sont jamais estimés par téléphone. Nous visitons le site avant de donner un prix.",
      en: "Post-construction and commercial work is never quoted over the phone. We walk the site before naming a price.",
    },
  },
];

export function AboutContent() {
  const { t } = useLang();

  return (
    <>
      <PageHero
        eyebrow={t({ fr: "Qui nous sommes", en: "Who we are" })}
        breadcrumb={t({ fr: "À propos", en: "About" })}
        title={t({
          fr: "Une entreprise de nettoyage bâtie pour Dieppe",
          en: "A cleaning company built for Dieppe",
        })}
        description={t({
          fr: "Nous sommes une jeune entreprise, et nous préférons le dire clairement plutôt que d'inventer un historique. Ce que nous pouvons prouver dès aujourd'hui : nos certifications, nos protocoles et nos prix.",
          en: "We are a young business, and we would rather say so plainly than invent a history. What we can prove today: our certifications, our protocols and our prices.",
        })}
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
                  label={t({
                    fr: "Illustration de l'équipe Eco-Clean à Dieppe",
                    en: "Illustration of the Eco-Clean crew in Dieppe",
                  })}
                  className="aspect-[4/3] shadow-[var(--shadow-lift)]"
                />
                <div className="absolute -right-3 -bottom-6 rounded-2xl bg-white px-5 py-4 text-center shadow-[var(--shadow-lift)] ring-1 ring-lilac-100 sm:-right-6">
                  <span className="text-gradient font-display block text-3xl font-extrabold">
                    2/3
                  </span>
                  <span className="mt-1 block text-[0.7rem] font-semibold text-ink-muted">
                    {t({
                      fr: "de Dieppe parle surtout français",
                      en: "of Dieppe mainly speaks French",
                    })}
                  </span>
                </div>
              </div>
            </Reveal>

            <div>
              <Reveal direction="left">
                <SectionHeading
                  eyebrow={t({
                    fr: "Pourquoi nous existons",
                    en: "Why we exist",
                  })}
                  title={
                    <>
                      {t({
                        fr: "Un marché bien servi en anglais, ",
                        en: "A market well served in English, ",
                      })}
                      <span className="text-gradient">
                        {t({
                          fr: "beaucoup moins en français",
                          en: "far less so in French",
                        })}
                      </span>
                    </>
                  }
                  description={t({
                    fr: "Dieppe compte environ 35 000 personnes et a crû de plus de 20 % en trois ans, à l'intérieur d'une des régions métropolitaines qui croissent le plus vite au Canada.",
                    en: "Dieppe is home to roughly 35,000 people and has grown more than 20% in three years, inside one of Canada's fastest-growing metropolitan areas.",
                  })}
                />
              </Reveal>

              <Reveal direction="left" delay={0.1}>
                <div className="mt-6 flex flex-col gap-4 text-[0.98rem] leading-relaxed text-ink-soft">
                  <p>
                    {t({
                      fr: "Près des deux tiers de la population parle surtout français, et le revenu médian des ménages avoisine 87 000 $. Pourtant, la plupart des entreprises de nettoyage de la région servent d’abord en anglais et parlent de produits « verts » sans jamais montrer un certificat.",
                      en: "Close to two-thirds of the population mainly speaks French, and median household income sits near $87,000. Yet most cleaning companies in the region serve in English first and talk about “green” products without ever showing a certificate.",
                    })}
                  </p>
                  <p>
                    {t({
                      fr: "Nous faisons les deux choses à l’envers de cette habitude : le français d’abord, et la preuve avant la promesse. Pour une garderie ou une clinique, c’est exactement ce qui fait la différence au moment de choisir.",
                      en: "We invert both habits: French first, and evidence before promises. For a daycare or a clinic, that is precisely what decides the choice.",
                    })}
                  </p>
                </div>
              </Reveal>

              <Reveal direction="left" delay={0.18}>
                <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-lilac-100 pt-9">
                  {commitments.map((item) => (
                    <div key={item.label.fr}>
                      <dt className="sr-only">{t(item.label)}</dt>
                      <dd>
                        <span className="font-display block text-3xl font-extrabold text-ink">
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

      {/* ----------------------------------------------------------- values */}
      <section className="mesh-soft py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow={t({ fr: "Ce qui ne changera pas", en: "What will not change" })}
            title={t({
              fr: "Quatre engagements que la croissance ne fera pas plier",
              en: "Four commitments growth will not bend",
            })}
          />

          <RevealGroup as="ul" className="mt-12 grid gap-5 sm:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <RevealItem as="li" key={value.title.fr}>
                  <div className="group flex h-full gap-5 rounded-[1.75rem] bg-white p-6 shadow-[var(--shadow-soft)] ring-1 ring-lilac-100 transition-all duration-500 ease-[var(--ease-bubble)] hover:-translate-y-2 hover:shadow-[var(--shadow-lift)] sm:p-7">
                    <span className="grid size-13 shrink-0 place-items-center self-start rounded-2xl bg-brand-gradient text-white shadow-[var(--shadow-glow)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                      <Icon className="size-6" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg leading-snug font-bold text-ink">
                        {t(value.title)}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                        {t(value.body)}
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
            eyebrow={t({ fr: "Nos règles de service", en: "Our service rules" })}
            title={t({
              fr: "Ce que vous pouvez exiger de nous",
              en: "What you can hold us to",
            })}
          />

          <RevealGroup as="ol" className="relative mx-auto mt-14 max-w-3xl">
            <span
              aria-hidden="true"
              className="absolute top-2 bottom-2 left-[1.35rem] w-0.5 bg-[linear-gradient(180deg,var(--color-lilac-300),var(--color-mint-300))] sm:left-[1.6rem]"
            />
            {commitmentDetail.map((item, i) => (
              <RevealItem as="li" key={item.title.fr}>
                <div className="relative flex gap-6 pb-10 last:pb-0">
                  <span className="font-display relative z-10 grid size-11 shrink-0 place-items-center rounded-full bg-brand-gradient text-sm font-extrabold text-white shadow-[var(--shadow-glow)] ring-4 ring-white sm:size-14">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 rounded-2xl bg-lilac-50/70 p-5 ring-1 ring-lilac-100 sm:p-6">
                    <h3 className="font-display text-lg font-bold text-ink">
                      {t(item.title)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {t(item.body)}
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
