"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import {
  IconArrowUpRight,
  IconBubble,
  IconCheck,
  IconClock,
  serviceIcons,
} from "@/components/ui/Icons";
import { services, type Service } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Services({
  heading = "Des services pensés pour Dieppe",
  eyebrow = "Nos services",
  description = "Six services, un seul standard. Prix fixe convenu avant que quiconque entre chez vous — jamais de tarif horaire pour le résidentiel. Facturation minimale de 150 $ par visite, avant TVH.",
  compact = false,
}: {
  heading?: string;
  eyebrow?: string;
  description?: string;
  compact?: boolean;
}) {
  const [active, setActive] = useState<string | null>(null);

  // No bubble burst here any more. Expanding a card is a browsing action, not
  // an achievement — the tinted wash, the ring and the expand animation are
  // the feedback. Bubbles are reserved for reaching the final CTA and for a
  // completed booking.
  const activate = (service: Service) => {
    setActive((current) => (current === service.slug ? null : service.slug));
  };

  return (
    <section
      id="services"
      className={cn("relative mesh-soft", compact ? "py-16" : "py-20 lg:py-28")}
    >
      <div className="container-page">
        <SectionHeading
          eyebrow={eyebrow}
          title={heading}
          description={description}
          action={
            <Button
              href="/services"
              variant="secondary"
              icon={<IconArrowUpRight className="size-3.5" />}
            >
              Tous nos services
            </Button>
          }
        />

        <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-lilac-700 ring-1 ring-lilac-200">
          <IconBubble className="size-4" />
          Touchez une carte pour le détail et le prix
        </p>

        <RevealGroup
          as="ul"
          // `items-start` is the fix for the expand bug: grid rows default to
          // `stretch`, so an expanded card dragged every sibling in its row to
          // the same height and left them padded with blank space.
          className="mt-10 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = serviceIcons[service.icon];
            const isActive = active === service.slug;

            return (
              <RevealItem as="li" key={service.slug}>
                <motion.article
                  id={service.slug}
                  onClick={() => activate(service)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      activate(service);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isActive}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  className={cn(
                    "group relative flex cursor-pointer flex-col overflow-hidden rounded-[1.75rem] bg-white p-6 text-left",
                    "shadow-[var(--shadow-soft)] ring-1 transition-shadow duration-300",
                    isActive
                      ? "ring-2 ring-lilac-400 shadow-[var(--shadow-lift)]"
                      : "ring-lilac-100 hover:shadow-[var(--shadow-lift)]",
                  )}
                >
                  {/* Tinted wash that blooms in on hover / activation. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute -top-16 -right-16 size-44 rounded-full blur-2xl transition-opacity duration-500",
                      isActive
                        ? "opacity-60"
                        : "opacity-0 group-hover:opacity-40",
                    )}
                    style={{
                      background: `radial-gradient(circle, ${service.tint[0]}, transparent 70%)`,
                    }}
                  />

                  <div className="relative flex items-start justify-between gap-4">
                    <span
                      className="grid size-14 shrink-0 place-items-center rounded-2xl text-white shadow-lg transition-transform duration-500 ease-[var(--ease-bubble)] group-hover:scale-110 group-hover:-rotate-6"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${service.tint[0]}, ${service.tint[1]})`,
                      }}
                    >
                      <Icon className="size-7" />
                    </span>
                    <span
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-full transition-all duration-300",
                        isActive
                          ? "rotate-45 bg-lilac-600 text-white"
                          : "bg-lilac-50 text-lilac-600 group-hover:bg-lilac-100",
                      )}
                    >
                      <IconArrowUpRight className="size-4" />
                    </span>
                  </div>

                  <h3 className="font-display relative mt-5 text-xl font-bold text-ink">
                    {service.titleFr}
                  </h3>
                  <p
                    lang="en"
                    className="relative mt-1 text-[0.78rem] font-semibold text-lilac-600"
                  >
                    {service.titleEn}
                  </p>
                  <p className="relative mt-2.5 text-sm leading-relaxed text-ink-muted">
                    {service.short}
                  </p>

                  <div className="relative mt-5 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-lilac-50 px-3 py-1 text-xs font-bold text-lilac-700 ring-1 ring-lilac-100">
                      {service.price}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-mint-100 px-3 py-1 text-xs font-semibold text-mint-600">
                      <IconClock className="size-3.5" />
                      {service.duration}
                    </span>
                  </div>

                  <AnimatePresence initial={false}>
                    {isActive ? (
                      <motion.div
                        key="detail"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.42,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="relative overflow-hidden"
                      >
                        <div className="mt-5 border-t border-lilac-100 pt-5">
                          <p className="text-sm leading-relaxed text-ink-soft">
                            {service.description}
                          </p>
                          <ul className="mt-4 flex flex-col gap-2.5">
                            {service.includes.map((item) => (
                              <li
                                key={item}
                                className="flex items-start gap-2.5 text-sm text-ink-soft"
                              >
                                <span className="mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full bg-mint-400/20 text-mint-600">
                                  <IconCheck className="size-3" />
                                </span>
                                {item}
                              </li>
                            ))}
                          </ul>
                          <Button
                            href="/contact#booking"
                            size="sm"
                            className="mt-5"
                            // Still needed: the card itself is the toggle, so
                            // without this the CTA would also collapse it.
                            onClick={(e) => e.stopPropagation()}
                          >
                            Demander une soumission
                          </Button>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.article>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
