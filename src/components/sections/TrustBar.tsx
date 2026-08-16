import {
  IconLeaf,
  IconRecycle,
  IconShield,
  IconSparkle,
  IconStar,
  IconUsers,
} from "@/components/ui/Icons";

const badges = [
  { icon: IconLeaf, label: "100% plant-based products" },
  { icon: IconShield, label: "$2m insured & background checked" },
  { icon: IconRecycle, label: "Refillable, zero-plastic system" },
  { icon: IconStar, label: "5.0 average from 640+ reviews" },
  { icon: IconUsers, label: "Directly employed crews" },
  { icon: IconSparkle, label: "48-hour put-it-right guarantee" },
];

/**
 * Infinite marquee. The list is duplicated once and translated by -50%, so the
 * loop is seamless with a single CSS animation and no JS.
 */
export function TrustBar() {
  return (
    <section
      aria-label="Our credentials"
      className="relative overflow-hidden border-y border-lilac-100 bg-white py-5"
    >
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_9%,#000_91%,transparent)]">
        <ul className="animate-marquee flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14">
          {[...badges, ...badges].map((badge, i) => {
            const Icon = badge.icon;
            return (
              <li
                key={`${badge.label}-${i}`}
                aria-hidden={i >= badges.length}
                className="flex shrink-0 items-center gap-2.5 text-sm font-semibold whitespace-nowrap text-ink-soft"
              >
                <span className="grid size-8 place-items-center rounded-full bg-lilac-50 text-lilac-600">
                  <Icon className="size-4" />
                </span>
                {badge.label}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
