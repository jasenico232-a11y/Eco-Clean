"use client";

import { createContext, useCallback, useContext, useMemo, useRef } from "react";
import type { ReactNode } from "react";
import type { BubbleEngine, PopOptions, SurgeOptions } from "./engine";

type BubbleApi = {
  /** Burst at viewport coordinates. */
  pop: (x: number, y: number, options?: PopOptions) => void;
  /** Burst from the centre of an element (or the point of a pointer event). */
  popFrom: (
    target: Element | null | undefined,
    options?: PopOptions & { event?: { clientX: number; clientY: number } },
  ) => void;
  /** Flood the screen with tinted bubbles. */
  surge: (options?: SurgeOptions) => void;
  /** Called by BubbleField to hand the live engine to the tree. */
  register: (engine: BubbleEngine | null) => void;
};

const noop = () => {};

const BubbleContext = createContext<BubbleApi>({
  pop: noop,
  popFrom: noop,
  surge: noop,
  register: noop,
});

export function BubbleProvider({ children }: { children: ReactNode }) {
  const engineRef = useRef<BubbleEngine | null>(null);

  const register = useCallback((engine: BubbleEngine | null) => {
    engineRef.current = engine;
  }, []);

  const pop = useCallback((x: number, y: number, options?: PopOptions) => {
    engineRef.current?.pop(x, y, options);
  }, []);

  const popFrom = useCallback<BubbleApi["popFrom"]>((target, options) => {
    const engine = engineRef.current;
    if (!engine) return;

    // Prefer the actual pointer location — popping under the finger feels
    // direct. Keyboard activation has no coordinates, so fall back to centre.
    let x = options?.event?.clientX;
    let y = options?.event?.clientY;

    if (x == null || y == null || (x === 0 && y === 0)) {
      if (!target) return;
      const rect = target.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }

    engine.pop(x, y, options);
  }, []);

  const surge = useCallback((options?: SurgeOptions) => {
    engineRef.current?.surge(options);
  }, []);

  const value = useMemo<BubbleApi>(
    () => ({ pop, popFrom, surge, register }),
    [pop, popFrom, surge, register],
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
