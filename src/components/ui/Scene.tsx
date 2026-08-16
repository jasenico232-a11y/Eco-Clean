import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { seededRandom } from "@/lib/utils";

type Tone = "lilac" | "deep" | "mint" | "orchid";

const tones: Record<Tone, { from: string; via: string; to: string }> = {
  lilac: { from: "#b79bff", via: "#8e6bf2", to: "#c6aeff" },
  deep: { from: "#4e3193", via: "#6540bc", to: "#8e6bf2" },
  mint: { from: "#7ff0d6", via: "#4fe3c4", to: "#a98bfb" },
  orchid: { from: "#f9b4e6", via: "#c6aeff", to: "#8e6bf2" },
};

/**
 * Brand artwork panel used wherever the reference layout uses photography.
 * Everything is drawn in SVG/CSS, so there are no image requests, no layout
 * shift and no broken placeholders — swap in <Image> when real photos land.
 */
export function Scene({
  tone = "lilac",
  icon,
  className,
  seed = 1,
  children,
  label,
}: {
  tone?: Tone;
  icon?: ReactNode;
  className?: string;
  seed?: number;
  children?: ReactNode;
  /** Describes the artwork for assistive tech; omit for purely decorative use. */
  label?: string;
}) {
  const t = tones[tone];
  const gid = `scene-${tone}-${seed}`;

  // Deterministic so server and client markup match exactly.
  const motes = Array.from({ length: 7 }, (_, i) => ({
    cx: 8 + seededRandom(seed * 31 + i * 7) * 84,
    cy: 10 + seededRandom(seed * 17 + i * 13) * 80,
    r: 1.6 + seededRandom(seed * 53 + i * 3) * 4.4,
    o: 0.16 + seededRandom(seed * 11 + i * 5) * 0.42,
  }));

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-[1.75rem] sm:rounded-[2.25rem]",
        className,
      )}
      role={label ? "img" : "presentation"}
      aria-label={label}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${gid}-bg`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={t.from} />
            <stop offset="52%" stopColor={t.via} />
            <stop offset="100%" stopColor={t.to} />
          </linearGradient>
          <radialGradient id={`${gid}-glow`} cx="0.25" cy="0.2" r="0.8">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="100" height="100" fill={`url(#${gid}-bg)`} />
        <rect width="100" height="100" fill={`url(#${gid}-glow)`} />

        {/* Suggestion of an interior: a window, the light it throws across the
            floor, and a plant. Enough structure to read as a room without
            pretending to be a photograph. */}
        <g opacity="0.5">
          <rect
            x="8"
            y="12"
            width="26"
            height="32"
            rx="3"
            fill="#ffffff"
            fillOpacity="0.14"
            stroke="#ffffff"
            strokeOpacity="0.3"
            strokeWidth="0.6"
          />
          <path
            d="M21 12v32M8 28h26"
            stroke="#ffffff"
            strokeOpacity="0.28"
            strokeWidth="0.6"
          />
          {/* Light shaft falling from the window onto the floor. */}
          <path
            d="M8 44 L34 44 L52 78 L14 78 Z"
            fill="#ffffff"
            fillOpacity="0.09"
          />
        </g>

        {/* Floor line */}
        <path
          d="M-10 70 H110"
          stroke="#ffffff"
          strokeOpacity="0.2"
          strokeWidth="0.6"
        />

        {/* Potted plant, right of frame */}
        <g opacity="0.42">
          <path
            d="M70 70 V58"
            stroke="#ffffff"
            strokeOpacity="0.6"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
          <path
            d="M70 60c-5-1-7-5-6.5-9 4 0 7 3.5 6.5 9zM70 62c5-1.4 7.4-5.6 6.8-10.2-4.4.4-7.6 4.4-6.8 10.2z"
            fill="#ffffff"
            fillOpacity="0.55"
          />
          <path
            d="M65.5 70h9l-1.2 6.5h-6.6z"
            fill="#ffffff"
            fillOpacity="0.4"
          />
        </g>

        {/* Soft organic bands — the "steam" behind the subject. */}
        <path
          d="M-10,72 C15,58 32,84 55,70 C74,58 88,78 112,64 L112,110 L-10,110 Z"
          fill="#ffffff"
          fillOpacity="0.13"
        />
        <path
          d="M-10,86 C18,74 36,96 62,84 C82,74 96,90 112,82 L112,110 L-10,110 Z"
          fill="#ffffff"
          fillOpacity="0.16"
        />

        <circle cx="82" cy="20" r="16" fill="#ffffff" fillOpacity="0.1" />
        <circle cx="82" cy="20" r="16" fill="none" stroke="#ffffff" strokeOpacity="0.22" strokeWidth="0.5" />
        <circle cx="76" cy="14" r="4" fill="#ffffff" fillOpacity="0.32" />

        {motes.map((m, i) => (
          <circle
            key={i}
            cx={m.cx}
            cy={m.cy}
            r={m.r}
            fill="#ffffff"
            fillOpacity={m.o}
          />
        ))}
      </svg>

      {icon ? (
        <div
          aria-hidden="true"
          className="animate-float-slow pointer-events-none absolute inset-0 grid place-items-center text-white/35"
        >
          <div className="[&>svg]:size-24 sm:[&>svg]:size-32 lg:[&>svg]:size-40">
            {icon}
          </div>
        </div>
      ) : null}

      {children}
    </div>
  );
}
