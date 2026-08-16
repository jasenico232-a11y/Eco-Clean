"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { IconArrowRight, IconChevronDown } from "@/components/ui/Icons";
import { faqs } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative mesh-soft py-20 lg:py-28">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Good to know"
              title="Questions we get asked every week"
              description="If yours is not here, call us — a real person picks up between 7am and 7pm."
            />
            <div className="mt-8">
              <Button
                href="/contact"
                variant="secondary"
                icon={<IconArrowRight className="size-3.5" />}
              >
                Ask us anything
              </Button>
            </div>
          </div>

          <ul className="flex flex-col gap-3">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <li key={faq.q}>
                  <div
                    className={cn(
                      "overflow-hidden rounded-2xl bg-white transition-all duration-300",
                      isOpen
                        ? "shadow-[var(--shadow-soft)] ring-2 ring-lilac-300"
                        : "ring-1 ring-lilac-100 hover:ring-lilac-200",
                    )}
                  >
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                      >
                        <span
                          className={cn(
                            "font-display text-[1.02rem] font-bold transition-colors sm:text-lg",
                            isOpen ? "text-lilac-700" : "text-ink",
                          )}
                        >
                          {faq.q}
                        </span>
                        <span
                          className={cn(
                            "grid size-8 shrink-0 place-items-center rounded-full transition-all duration-400 ease-[var(--ease-bubble)]",
                            isOpen
                              ? "rotate-180 bg-brand-gradient text-white"
                              : "bg-lilac-50 text-lilac-600",
                          )}
                        >
                          <IconChevronDown className="size-4" />
                        </span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          id={`faq-panel-${i}`}
                          key="panel"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.38,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-6 text-[0.95rem] leading-relaxed text-ink-muted sm:px-6">
                            {faq.a}
                          </p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
