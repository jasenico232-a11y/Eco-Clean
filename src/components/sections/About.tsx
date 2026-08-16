import { Button } from "@/components/ui/Button";
import { Scene } from "@/components/ui/Scene";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  IconArrowRight,
  IconCheck,
  IconDeep,
  IconLeaf,
  IconUsers,
} from "@/components/ui/Icons";
import { stats } from "@/lib/site";

const pillars = [
  "Plant-based, zero-residue products on every single visit",
  "Directly employed crews — never subcontracted, always the same faces",
  "Fixed pricing agreed up front, with a 48-hour put-it-right guarantee",
];

export function About() {
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
                  label="Illustration of an Eco-Clean team member at work"
                  className="aspect-[3/4] translate-y-6 shadow-[var(--shadow-soft)]"
                />
                <Scene
                  tone="mint"
                  seed={5}
                  icon={<IconDeep />}
                  label="Illustration of cleaning equipment"
                  className="aspect-[3/4] shadow-[var(--shadow-soft)]"
                />
              </div>

              {/* Floating eco badge */}
              <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-2xl bg-white px-5 py-3.5 shadow-[var(--shadow-lift)] ring-1 ring-lilac-100">
                <span className="grid size-11 place-items-center rounded-xl bg-brand-gradient text-white">
                  <IconLeaf className="size-5" />
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-extrabold text-ink">
                    Carbon-neutral
                  </span>
                  <span className="block text-[0.7rem] text-ink-muted">
                    Since 2019
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
                eyebrow="About us"
                title={
                  <>
                    At Eco-Clean we believe a clean space creates a{" "}
                    <span className="text-gradient">happier, healthier</span>{" "}
                    life.
                  </>
                }
                description="We started in 2014 with two people, one van and a stubborn belief that a home should not smell of chlorine to feel clean. Twelve years later the vans have multiplied, the belief has not moved an inch."
              />
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <ul className="mt-8 flex flex-col gap-4">
                {pillars.map((item) => (
                  <li key={item} className="flex items-start gap-3.5">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-mint-400/18 text-mint-600 ring-1 ring-mint-400/30">
                      <IconCheck className="size-3.5" />
                    </span>
                    <span className="text-[0.97rem] leading-relaxed text-ink-soft">
                      {item}
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
                  Learn more about us
                </Button>
              </div>
            </Reveal>

            {/* --------------------------------------------------- stats */}
            <Reveal direction="left" delay={0.24}>
              <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-lilac-100 pt-9 sm:grid-cols-4 lg:grid-cols-2">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="font-display block text-3xl font-extrabold text-ink lg:text-4xl">
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
  );
}
