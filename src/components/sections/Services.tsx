"use client";

import { useState } from "react";
import type { MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ShineSweep, usePressFeedback } from "@/components/ui/PressFeedback";
import {
  IconArrowUpRight,
  IconBubble,
  IconCheck,
  IconClock,
  serviceIcons,
} from "@/components/ui/Icons";
import { services, type Service } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/i18n";

/**
 * One service card.
 *
 * Split out so each card owns its own press feedback — the hook measures the
 * pointer against `currentTarget`, so a single shared instance at section level
 * would render the sheen in the wrong card.
 */
function ServiceCard({
  service,
  isActive,
  onActivate,
}: {
  service: Service;
  isActive: boolean;
  onActivate: () => void;
}) {
  const { t } = useLang();
  const Icon = serviceIcons[service.icon];

  // Cards are large light surfaces, so they carry a fuller sparkle scatter
  // than a button does.
  const { press, layer } = usePressFeedback("lilac", { sparkleCount: 7 });
  // Counts activations so the shine sweep remounts and replays each time.
  const [sweep, setSweep] = useState(0);

  const activate = (e: MouseEvent<HTMLElement>) => {
    press(e);
    if (!isActive) setSweep((n) => n + 1);
    onActivate();
  };

  return (
    <motion.article
      id={service.slug}
      onClick={activate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate(e as unknown as MouseEvent<HTMLElement>);
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.975 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className={cn(
        "group relative isolate flex cursor-pointer flex-col overflow-hidden rounded-[1.75rem] bg-white p-6 text-left",
        "shadow-[var(--shadow-soft)] ring-1 transition-shadow duration-300",
        isActive
          ? "shadow-[var(--shadow-lift)] ring-2 ring-lilac-400"
          : "ring-lilac-100 hover:shadow-[var(--shadow-lift)]",
      )}
    >
      {/* Point-of-contact sheen and sparkle scatter — fires on open and close. */}
      {layer}
      {/* Squeegee pass across the card, replayed on each activation. */}
      {isActive ? <ShineSweep key={sweep} /> : null}

      {/* Tinted wash that blooms in on hover / activation. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -top-16 -right-16 -z-10 size-44 rounded-full blur-2xl transition-opacity duration-500",
          isActive ? "opacity-60" : "opacity-0 group-hover:opacity-40",
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
        {t(service.title)}
      </h3>
      <p className="relative mt-2.5 text-sm leading-relaxed text-ink-muted">
        {t(service.short)}
      </p>

      <div className="relative mt-5 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-lilac-50 px-3 py-1 text-xs font-bold text-lilac-700 ring-1 ring-lilac-100">
          {t(service.price)}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-mint-100 px-3 py-1 text-xs font-semibold text-mint-600">
          <IconClock className="size-3.5" />
          {t(service.duration)}
        </span>
      </div>

      <AnimatePresence initial={false}>
        {isActive ? (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden"
          >
            <div className="mt-5 border-t border-lilac-100 pt-5">
              <p className="text-sm leading-relaxed text-ink-soft">
                {t(service.description)}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {service.includes.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-ink-soft"
                  >
                    <span className="mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full bg-mint-400/20 text-mint-600">
                      <IconCheck className="size-3" />
                    </span>
                    {t(item)}
                  </li>
                ))}
              </ul>
              <Button
                href="/contact#booking"
                size="sm"
                className="mt-5"
                // Still needed: the card itself is the toggle, so without this
                // the CTA would also collapse it.
                onClick={(e) => e.stopPropagation()}
              >
                {t({ fr: "Demander une soumission", en: "Request a quote" })}
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
}

export function Services({
  heading,
  eyebrow,
  description,
  compact = false,
}: {
  heading?: { fr: string; en: string };
  eyebrow?: { fr: string; en: string };
  description?: { fr: string; en: string };
  compact?: boolean;
}) {
  const [active, setActive] = useState<string | null>(null);
  const { t } = useLang();

  return (
    <section
      id="services"
      className={cn("relative mesh-soft", compact ? "py-16" : "py-20 lg:py-28")}
    >
      <div className="container-page">
        <SectionHeading
          eyebrow={t(eyebrow ?? { fr: "Nos services", en: "Our services" })}
          title={t(
            heading ?? {
              fr: "Des services pensés pour Dieppe",
              en: "Services built for Dieppe",
            },
          )}
          description={t(
            description ?? {
              fr: "Six services, un seul standard. Prix fixe convenu avant que quiconque entre chez vous — jamais de tarif horaire pour le résidentiel. Facturation minimale de 150 $ par visite, avant TVH.",
              en: "Six services, one standard. A flat price agreed before anyone sets foot in your space — never hourly for residential work. $150 minimum per visit, before HST.",
            },
          )}
          action={
            <Button
              href="/services"
              variant="secondary"
              icon={<IconArrowUpRight className="size-3.5" />}
            >
              {t({ fr: "Tous nos services", en: "All services" })}
            </Button>
          }
        />

        <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-lilac-700 ring-1 ring-lilac-200">
          <IconBubble className="size-4" />
          {t({
            fr: "Touchez une carte pour le détail et le prix",
            en: "Tap a card for details and pricing",
          })}
        </p>

        <RevealGroup
          as="ul"
          // `items-start` is the fix for the expand bug: grid rows default to
          // `stretch`, so an expanded card dragged every sibling in its row to
          // the same height and left them padded with blank space.
          className="mt-10 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <RevealItem as="li" key={service.slug}>
              <ServiceCard
                service={service}
                isActive={active === service.slug}
                onActivate={() =>
                  setActive((current) =>
                    current === service.slug ? null : service.slug,
                  )
                }
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
