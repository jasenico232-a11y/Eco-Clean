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
  return (
    <section className="relative bg-white py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Notre spécialité"
          title="Là où la certification change vraiment quelque chose"
          description="Nous ne prétendons pas tout faire. Nous servons trois milieux où la preuve de certification compte au moment de choisir un fournisseur."
          action={
            <Button
              href="/contact#booking"
              variant="secondary"
              icon={<IconArrowUpRight className="size-3.5" />}
            >
              Demander une soumission
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
              <RevealItem as="li" key={item.titleFr}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[var(--shadow-soft)] ring-1 ring-lilac-100 transition-all duration-500 ease-[var(--ease-bubble)] hover:-translate-y-2 hover:shadow-[var(--shadow-lift)]">
                  <Scene
                    tone={item.tone}
                    seed={i * 9 + 4}
                    icon={<Icon />}
                    className="aspect-[16/10] rounded-none"
                  />

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-bold text-ink transition-colors duration-300 group-hover:text-lilac-700">
                      {item.titleFr}
                    </h3>
                    <p
                      lang="en"
                      className="mt-1 text-[0.78rem] font-semibold text-lilac-600"
                    >
                      {item.titleEn}
                    </p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                      {item.body}
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
