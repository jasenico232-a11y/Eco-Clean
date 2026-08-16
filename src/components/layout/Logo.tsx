import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Wordmark: a soap bubble cradling a leaf — the two halves of the brand.
 * Gradient ids are namespaced so header and footer copies never collide.
 */
export function Logo({
  className,
  tone = "light",
  id = "hdr",
}: {
  className?: string;
  tone?: "light" | "dark";
  id?: string;
}) {
  const gradId = `eco-logo-${id}`;

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex shrink-0 items-center gap-2.5 rounded-full",
        className,
      )}
      aria-label="Eco-Clean — home"
    >
      <span className="relative grid size-10 place-items-center">
        <svg
          viewBox="0 0 44 44"
          className="size-10 transition-transform duration-500 ease-[var(--ease-bubble)] group-hover:scale-110 group-hover:-rotate-6"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7a52e0" />
              <stop offset="55%" stopColor="#a98bfb" />
              <stop offset="100%" stopColor="#4fe3c4" />
            </linearGradient>
          </defs>
          <circle cx="22" cy="22" r="20" fill={`url(#${gradId})`} />
          <circle cx="14.5" cy="13.5" r="4.4" fill="rgba(255,255,255,0.52)" />
          <circle cx="33" cy="32" r="2.2" fill="rgba(255,255,255,0.34)" />
          <path
            d="M10 31.5c0-8.2 6.1-13.7 22.8-14.4C33.7 27.4 26.7 32.5 17.2 32.5c-3.1 0-7.2-.4-7.2-1z"
            fill="#fff"
            fillOpacity="0.95"
          />
          <path
            d="M15.6 29.2c2.5-4 6.3-6.9 11-8.8"
            stroke="#4e3193"
            strokeWidth="1.7"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.35rem] font-extrabold tracking-tight",
            tone === "light" ? "text-ink" : "text-white",
          )}
        >
          Eco<span className="text-gradient">-Clean</span>
        </span>
        <span
          className={cn(
            "mt-0.5 text-[0.62rem] font-semibold tracking-[0.22em] uppercase",
            tone === "light" ? "text-ink-muted" : "text-lilac-200/80",
          )}
        >
          Greener Cleaning
        </span>
      </span>
    </Link>
  );
}
