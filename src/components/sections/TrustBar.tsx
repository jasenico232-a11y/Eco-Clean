"use client";

import { useLang } from "@/lib/i18n";
import {
  IconLeaf,
  IconRecycle,
  IconShield,
  IconSparkle,
  IconStar,
  IconUsers,
} from "@/components/ui/Icons";

/**
 * Every badge is a fact we can evidence on request. No ratings, no volume
 * claims — see the compliance note at the top of `src/lib/site.ts`.
 */
const badges = [
  { icon: IconLeaf, label: { fr: "Produits certifiés UL ECOLOGO & Green Seal", en: "UL ECOLOGO & Green Seal certified products" } },
  { icon: IconShield, label: { fr: "Assurance responsabilité civile 2 M$", en: "$2M general liability cover" } },
  { icon: IconRecycle, label: { fr: "Aspirateurs à filtration HEPA", en: "HEPA-filtered vacuums" } },
  { icon: IconSparkle, label: { fr: "Gamme sans parfum offerte", en: "Fragrance-free line available" } },
  { icon: IconUsers, label: { fr: "Service en français, en anglais au besoin", en: "Served in French, English on request" } },
  { icon: IconStar, label: { fr: "Prix fixe — jamais à l'heure", en: "Flat rates — never hourly" } },
];

/**
 * Infinite marquee. The list is duplicated once and translated by -50%, so the
 * loop is seamless with a single CSS animation and no JS.
 */
export function TrustBar() {
  const { t } = useLang();
  return (
    <section
      aria-label={t({ fr: "Nos accréditations", en: "Our credentials" })}
      className="relative overflow-hidden border-y border-lilac-100 bg-white py-5"
    >
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_9%,#000_91%,transparent)]">
        <ul className="animate-marquee flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14">
          {[...badges, ...badges].map((badge, i) => {
            const Icon = badge.icon;
            return (
              <li
                key={`${badge.label.fr}-${i}`}
                aria-hidden={i >= badges.length}
                className="flex shrink-0 items-center gap-2.5 text-sm font-semibold whitespace-nowrap text-ink-soft"
              >
                <span className="grid size-8 place-items-center rounded-full bg-lilac-50 text-lilac-600">
                  <Icon className="size-4" />
                </span>
                {t(badge.label)}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
