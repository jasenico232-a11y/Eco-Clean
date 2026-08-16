import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Scene } from "@/components/ui/Scene";
import {
  IconCheck,
  IconClock,
  IconLeaf,
  IconRecycle,
  IconShield,
  IconSparkle,
} from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Residential, commercial, deep, move-out, eco sanitising and window cleaning — all delivered with plant-based products and a 48-hour guarantee.",
};

const guarantees = [
  {
    icon: IconShield,
    title: "Fully insured crews",
    body: "$2m public liability plus accidental damage cover on every visit, and every cleaner is employed directly by us.",
  },
  {
    icon: IconClock,
    title: "Fixed price, fixed slot",
    body: "You are quoted per visit, not per hour. If the job runs long, that is our problem — the invoice does not move.",
  },
  {
    icon: IconLeaf,
    title: "Plant-based, always",
    body: "No chlorine bleach, no ammonia, no phthalates. Safe for kids, pets, asthma and septic systems alike.",
  },
  {
    icon: IconRecycle,
    title: "48-hour guarantee",
    body: "Not right? Tell us within 48 hours and we return free of charge. No forms, no negotiation, no small print.",
  },
];

const comparison = [
  { label: "Non-toxic, plant-based products", eco: true, other: false },
  { label: "Same crew every visit", eco: true, other: false },
  { label: "Fixed per-visit pricing", eco: true, other: false },
  { label: "Photo sign-off after each clean", eco: true, other: false },
  { label: "Free return within 48 hours", eco: true, other: false },
  { label: "Refillable, zero-plastic supplies", eco: true, other: false },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        breadcrumb="Services"
        title="Cleaning that fits your space, your schedule and your standards"
        description="Six services, one obsessive standard. Pick the one that matches your space — or call us and we will tell you honestly which you actually need."
      />

      <Services
        eyebrow="Our services"
        heading="Choose your clean"
        description="Tap any card for the full inclusion list, the starting price and how long a typical visit takes."
      />

      {/* --------------------------------------------------------- promises */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Our promise"
            title="Four things that never change, whichever service you book"
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

      {/* ------------------------------------------------------- comparison */}
      <section className="mesh-soft py-20 lg:py-28">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal direction="right">
              <Scene
                tone="lilac"
                seed={21}
                icon={<IconSparkle />}
                label="Illustration of eco-friendly cleaning supplies"
                className="aspect-[5/4] shadow-[var(--shadow-lift)]"
              />
            </Reveal>

            <div>
              <Reveal direction="left">
                <SectionHeading
                  eyebrow="The difference"
                  title="What you get with us that you rarely get elsewhere"
                  description="We are not the cheapest quote you will receive. Here is precisely what the difference buys you."
                />
              </Reveal>

              <Reveal direction="left" delay={0.1}>
                <ul className="mt-8 overflow-hidden rounded-2xl bg-white ring-1 ring-lilac-100">
                  <li className="grid grid-cols-[1fr_5rem_5rem] items-center gap-3 border-b border-lilac-100 bg-lilac-50/60 px-5 py-3 text-[0.7rem] font-bold tracking-wider text-ink-muted uppercase">
                    <span>Included as standard</span>
                    <span className="text-center text-lilac-700">Eco-Clean</span>
                    <span className="text-center">Typical</span>
                  </li>
                  {comparison.map((row) => (
                    <li
                      key={row.label}
                      className="grid grid-cols-[1fr_5rem_5rem] items-center gap-3 border-b border-lilac-50 px-5 py-3.5 text-sm text-ink-soft last:border-b-0"
                    >
                      <span>{row.label}</span>
                      <span className="flex justify-center">
                        <span className="grid size-6 place-items-center rounded-full bg-mint-400/20 text-mint-600">
                          <IconCheck className="size-3.5" />
                        </span>
                      </span>
                      <span className="flex justify-center text-ink-muted/50">
                        —
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
