"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import type { ReactNode } from "react";

/**
 * Lightweight FR/EN switching.
 *
 * Dieppe is roughly two-thirds mainly French-speaking, so French is the
 * default and the served language; English is a toggle, not a separate site.
 * Copy lives as `{ fr, en }` pairs in `src/lib/site.ts` and is resolved with
 * `t()` at render time.
 *
 * Why an external store rather than `useState`:
 *   The server has no access to the visitor's stored preference, so it always
 *   renders French. If the first *client* render read localStorage directly it
 *   would produce different markup and fail hydration. `useSyncExternalStore`
 *   gives a server snapshot ("fr") that matches, and the stored preference is
 *   applied immediately after mount. English speakers therefore see one frame
 *   of French on a cold load — the trade for keeping this a fully static site.
 *
 * For a true multilingual site (per-locale URLs, translated metadata,
 * hreflang, indexable English pages) this should graduate to `next-intl` with
 * locale routing. Search engines only ever see the French copy today.
 */

export type Lang = "fr" | "en";

/** A translatable string. Plain strings pass through untouched. */
export type L = { fr: string; en: string };

const STORAGE_KEY = "eco-clean-lang";

/* -------------------------------------------------------------- tiny store */

let current: Lang = "fr";
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): Lang {
  return current;
}

/** The server never knows the preference, so it always starts in French. */
function getServerSnapshot(): Lang {
  return "fr";
}

function write(next: Lang) {
  if (current === next) return;
  current = next;
  listeners.forEach((l) => l());
}

/* ----------------------------------------------------------------- context */

type LangApi = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  /** Resolve a translatable value for the active language. */
  t: (value: L | string) => string;
};

const LangContext = createContext<LangApi>({
  lang: "fr",
  setLang: () => {},
  toggle: () => {},
  t: (v) => (typeof v === "string" ? v : v.fr),
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Apply the stored preference once the client has mounted. This is a
  // genuine external-system sync, which is what effects are for.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "fr") write(stored);
    } catch {
      // Private mode or storage disabled — French default is fine.
    }
  }, []);

  // Keep the document language in step so screen readers and browser
  // translation prompts behave correctly.
  useEffect(() => {
    document.documentElement.lang = lang === "fr" ? "fr-CA" : "en-CA";
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    write(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Preference simply will not persist.
    }
  }, []);

  const value = useMemo<LangApi>(
    () => ({
      lang,
      setLang,
      toggle: () => setLang(lang === "fr" ? "en" : "fr"),
      t: (v) => (typeof v === "string" ? v : v[lang]),
    }),
    [lang, setLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangApi {
  return useContext(LangContext);
}
