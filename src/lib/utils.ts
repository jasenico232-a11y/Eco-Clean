/**
 * Tiny className joiner — avoids pulling clsx/tailwind-merge into the bundle.
 * Accepts `unknown` so `someNode && "class"` guards type-check without casts;
 * anything that is not a non-empty string is dropped.
 */
export function cn(...parts: unknown[]): string {
  return parts.filter((p): p is string => typeof p === "string" && p !== "").join(" ");
}

/** Clamp a number into a range. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Deterministic pseudo-random in [0,1) — keeps SSR and client markup identical. */
export function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/** Format large stat numbers (10400 -> "10.4K"). */
export function formatStat(value: number): string {
  if (value >= 1000) {
    const thousands = value / 1000;
    return `${Number.isInteger(thousands) ? thousands : thousands.toFixed(1)}K`;
  }
  return String(value);
}
