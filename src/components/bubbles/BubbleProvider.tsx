"use client";

import { createContext, useCallback, useContext, useMemo, useRef } from "react";
import type { ReactNode } from "react";
import type { BubbleEngine, BurstOptions } from "./engine";

type BurstArgs = Omit<BurstOptions, "x" | "y">;

type BubbleApi = {
  /**
   * Release a short-lived cloud of bubbles at a point. Reserved for moments
   * that genuinely earn it — a service selected, a booking sent. Everything
   * clears itself within a few seconds.
   */
  burst: (x: number, y: number, options?: BurstArgs) => void;
  /** Same, centred on an element (or the pointer that activated it). */
  burstFrom: (
    target: Element | null | undefined,
    options?: BurstArgs & { event?: { clientX: number; clientY: number } },
  ) => void;
  /** Called by BubbleField to hand the live engine to the tree. */
  register: (engine: BubbleEngine | null) => void;
};

const noop = () => {};

const BubbleContext = createContext<BubbleApi>({
  burst: noop,
  burstFrom: noop,
  register: noop,
});

export function BubbleProvider({ children }: { children: ReactNode }) {
  const engineRef = useRef<BubbleEngine | null>(null);

  const register = useCallback((engine: BubbleEngine | null) => {
    engineRef.current = engine;
  }, []);

  const burst = useCallback((x: number, y: number, options?: BurstArgs) => {
    engineRef.current?.burst({ ...options, x, y });
  }, []);

  const burstFrom = useCallback<BubbleApi["burstFrom"]>((target, options) => {
    const engine = engineRef.current;
    if (!engine) return;

    // Prefer the actual pointer location — bubbles rising from under the
    // finger feel direct. Keyboard activation has no coordinates, so fall
    // back to the element's centre.
    let x = options?.event?.clientX;
    let y = options?.event?.clientY;

    if (x == null || y == null || (x === 0 && y === 0)) {
      if (!target) return;
      const rect = target.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }

    engine.burst({ ...options, x, y });
  }, []);

  const value = useMemo<BubbleApi>(
    () => ({ burst, burstFrom, register }),
    [burst, burstFrom, register],
  );

  return (
    <BubbleContext.Provider value={value}>{children}</BubbleContext.Provider>
  );
}

/**
 * Access the bubble engine from any client component.
 * Safe to call when the field is not mounted — every method no-ops.
 */
export function useBubbles(): BubbleApi {
  return useContext(BubbleContext);
}
