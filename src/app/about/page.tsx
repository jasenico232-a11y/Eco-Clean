import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBand } from "@/components/sections/CtaBand";
import { TrustBar } from "@/components/sections/TrustBar";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Scene } from "@/components/ui/Scene";
import { CountUp } from "@/components/ui/CountUp";
import {
  IconBubble,
  IconLeaf,
  IconRecycle,
  IconShield,
  IconUsers,
} from "@/components/ui/Icons";
import { stats } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Eco-Clean started in 2014 with two people and one van. Twelve years on, we still clean every space as if it were our own — with plant-based products, directly employed crews and fixed pricing.",
};

const values = [
  {
    icon: IconLeaf,
    title: "Green is the baseline, not the upsell",
    body: "Every product on every van is plant-derived and biodegradable. There is no 'eco option' to pay extra for, because there is nothing else on the shelf.",
  },
  {
    icon: IconUsers,
    title: "We employ, we do not subcontract",
    body: "Our cleaners are on payroll, paid above the living wage, with paid travel time. That is why the same faces come back year after year.",
  },
  {
    icon: IconShield,
    title: "Say the price, keep the price",
    body: "Fixed quotes, itemised by room. If the job takes two hours longer than we estimated, we absorb it — that is what an estimate means.",
  },
  {
    icon: IconRecycle,
    title: "Leave less behind than we found",
    body: "Refillable concentrates, microfibre over disposables, and carbon-neutral routing that clusters jobs by postcode instead of by convenience.",
  },
];

const timeline = [
  {
    year: "2014",
    title: "Two people, one van",
    body: "Started cleaning flats around Reno after a family asthma diagnosis made conventional products a non-starter at home.",
  },
  {
    year: "2017",
    title: "First commercial contract",
    body: "A dental practice took a chance on us. They are still a client, and they still get the same crew lead.",
  },
  {
    year: "2019",
    title: "Carbon-neutral routing",
    body: "Rebuilt scheduling around postcode clusters and offset the remainder. Fleet mileage fell 31% in the first year.",
  },
  {
    year: "2026",
    title: "Twelve years, one standard",
    body: "Forty-one employed cleaners, 640+ households, 90 workplaces — and still no chlorine bleach on any van.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        breadcrumb="About"
        title="A cleaning company built around one stubborn idea"
        description="That a home should not have to smell of chemicals to feel clean — and that the people doing the cleaning deserve to be treated as well as the people paying for it."
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
                  label="Illustration of the Eco-Clean founding team"
                  className="aspect-[4/3] shadow-[var(--shadow-lift)]"
                />
                <div className="absolute -right-3 -bottom-6 rounded-2xl bg-white px-5 py-4 text-center shadow-[var(--shadow-lift)] ring-1 ring-lilac-100 sm:-right-6">
                  <span className="text-gradient font-display block text-3xl font-extrabold">
                    <CountUp value={41} suffix="" compact={false} />
                  </span>
                  <span className="mt-1 block text-[0.7rem] font-semibold text-ink-muted">
                    Employed cleaners
                  </span>
                </div>
              </div>
            </Reveal>

            <div>
              <Reveal direction="left">
                <SectionHeading
                  eyebrow="Why we exist"
                  title={
                    <>
                      It began with an asthma diagnosis and a{" "}
                      <span className="text-gradient">cupboard full of bleach</span>
                    </>
                  }
                  description="In 2014 our founder's daughter was diagnosed with asthma. The specialist's advice included a line nobody expected: look at what you clean with. The cupboard went in the bin that weekend."
                />
              </Reveal>

              <Reveal direction="left" delay={0.1}>
                <div className="mt-6 flex flex-col gap-4 text-[0.98rem] leading-relaxed text-ink-soft">
                  <p>
                    What followed was two years of testing plant-based
                    alternatives that mostly did not work. The ones that did
                    became the shortlist we still buy from today — and the
                    reason friends started asking whether we would clean their
                    homes too.
                  </p>
                  <p>
                    We never set out to build a company. We set out to prove
                    that a genuinely non-toxic clean could beat a conventional
                    one on results, not just on conscience. Twelve years and
                    ten thousand cleans later, we are fairly confident it does.
                  </p>
                </div>
              </Reveal>

              <Reveal direction="left" delay={0.18}>
                <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-lilac-100 pt-9">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <dt className="sr-only">{stat.label}</dt>
                      <dd>
                        <span className="font-display block text-3xl font-extrabold text-ink">
                          <CountUp value={stat.value} suffix={stat.suffix} />
                        </span>
                        <span className="mt-1.5 block text-sm text-ink-muted">
                          {stat.label}
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
            eyebrow="What we stand for"
            title="Four commitments we will not trade away for growth"
          />

          <RevealGroup as="ul" className="mt-12 grid gap-5 sm:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <RevealItem as="li" key={value.title}>
                  <div className="group flex h-full gap-5 rounded-[1.75rem] bg-white p-6 shadow-[var(--shadow-soft)] ring-1 ring-lilac-100 transition-all duration-500 ease-[var(--ease-bubble)] hover:-translate-y-2 hover:shadow-[var(--shadow-lift)] sm:p-7">
                    <span className="grid size-13 shrink-0 place-items-center self-start rounded-2xl bg-brand-gradient text-white shadow-[var(--shadow-glow)] transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                      <Icon className="size-6" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg leading-snug font-bold text-ink">
                        {value.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
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

      {/* --------------------------------------------------------- timeline */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="The road here"
            title="Twelve years, four turning points"
          />

          <RevealGroup as="ol" className="relative mx-auto mt-14 max-w-3xl">
            <span
              aria-hidden="true"
              className="absolute top-2 bottom-2 left-[1.35rem] w-0.5 bg-[linear-gradient(180deg,var(--color-lilac-300),var(--color-mint-300))] sm:left-[1.6rem]"
            />
            {timeline.map((item) => (
              <RevealItem as="li" key={item.year}>
                <div className="relative flex gap-6 pb-10 last:pb-0">
                  <span className="font-display relative z-10 grid size-11 shrink-0 place-items-center rounded-full bg-brand-gradient text-[0.68rem] font-extrabold text-white shadow-[var(--shadow-glow)] ring-4 ring-white sm:size-14 sm:text-xs">
                    {item.year}
                  </span>
                  <div className="flex-1 rounded-2xl bg-lilac-50/70 p-5 ring-1 ring-lilac-100 sm:p-6">
                    <h3 className="font-display text-lg font-bold text-ink">
                      {item.title}
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

      <Testimonials />
      <CtaBand />
    </>
  );
}
