import { cn } from "@/lib/utils";

/**
 * Fluffy scalloped edge used where a coloured band meets a light section —
 * the "foam line" motif that ties the whole page together.
 */
export function CloudDivider({
  className,
  fill = "var(--color-cloud)",
  flip = false,
}: {
  className?: string;
  fill?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn(
        "pointer-events-none block h-[52px] w-full sm:h-[80px] lg:h-[110px]",
        flip && "rotate-180",
        className,
      )}
    >
      <path
        fill={fill}
        d="M0,120 L0,100 Q40,40 90,96 Q130,58 175,92 Q225,20 290,90 Q340,50 385,95 Q440,30 505,92 Q560,58 610,96 Q660,22 730,90 Q790,52 840,95 Q895,28 960,90 Q1010,56 1060,96 Q1115,26 1185,90 Q1240,54 1290,95 Q1345,34 1400,94 Q1425,98 1440,100 L1440,120 Z"
      />
    </svg>
  );
}

/** Smooth wave, for softer transitions between light sections. */
export function WaveDivider({
  className,
  fill = "var(--color-cloud)",
  flip = false,
}: {
  className?: string;
  fill?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 1440 110"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn(
        "pointer-events-none block h-[48px] w-full sm:h-[72px] lg:h-[100px]",
        flip && "rotate-180",
        className,
      )}
    >
      <path
        fill={fill}
        d="M0,110 L0,52 C160,10 300,86 480,62 C660,38 780,-8 960,20 C1120,45 1290,88 1440,54 L1440,110 Z"
      />
    </svg>
  );
}
