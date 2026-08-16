import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { processSteps } from "@/lib/site";

export function Process() {
  return (
    <section className="relative overflow-hidden bg-lilac-50/60 py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -left-32 size-80 -translate-y-1/2 rounded-full bg-mint-300/25 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 size-72 rounded-full bg-orchid-200/40 blur-[100px]"
      />

      <div className="relative container-page">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title="Four steps from first call to fresh start"
          description="No surveys, no sales visit, no three-week wait. Most clients go from enquiry to booked crew inside a single working day."
        />

        <RevealGroup
          as="ul"
          className="relative mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* Connective thread on wide screens. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-9 right-[12.5%] left-[12.5%] hidden h-0.5 bg-[linear-gradient(90deg,var(--color-lilac-300),var(--color-mint-300))] lg:block"
          />

          {processSteps.map((step) => (
            <RevealItem as="li" key={step.step}>
              <div className="group relative h-full rounded-[1.75rem] bg-white p-6 text-center shadow-[var(--shadow-soft)] ring-1 ring-lilac-100 transition-all duration-500 ease-[var(--ease-bubble)] hover:-translate-y-2 hover:shadow-[var(--shadow-lift)]">
                <span className="relative mx-auto grid size-16 place-items-center rounded-full bg-brand-gradient text-lg font-extrabold text-white shadow-[var(--shadow-glow)] transition-transform duration-500 ease-[var(--ease-bubble)] group-hover:scale-110">
                  {step.step}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full ring-4 ring-lilac-200/60 transition-all duration-500 group-hover:ring-8 group-hover:ring-lilac-200/40"
                  />
                </span>
                <h3 className="font-display mt-6 text-lg font-bold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">
                  {step.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
