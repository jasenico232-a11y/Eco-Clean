/**
 * Tiny className joiner — avoids pulling clsx/tailwind-merge into the bundle.
 * Accepts `unknown` so `someNode && "class"` guards type-check without casts;
 * anything that is not a non-empty string is dropped.
 */
export function cn(...parts: unknown[]): string {
  return parts.filter((p): p is string => typeof p === "string" && p !== "").join(" ");
}

/** Deterministic pseudo-random in [0,1) — keeps SSR and client markup identical. */
export function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}
