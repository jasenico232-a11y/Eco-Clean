"use client";

import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * FR / EN switch.
 *
 * A two-option segmented control rather than a single toggle button: with one
 * button the label is ambiguous (does "EN" mean "you are in English" or
 * "switch to English"?). Showing both states with one marked current removes
 * the guess, and `aria-pressed` makes that explicit to assistive tech.
 */
export function LanguageToggle({
  className,
  size = "sm",
}: {
  className?: string;
  size?: "sm" | "lg";
}) {
  const { lang, setLang } = useLang();

  const options: { value: "fr" | "en"; label: string; full: string }[] = [
    { value: "fr", label: "FR", full: "Français" },
    { value: "en", label: "EN", full: "English" },
  ];

  return (
    <div
      className={cn(
        "inline-flex shrink-0 items-center rounded-full bg-lilac-100 p-0.5 ring-1 ring-lilac-200",
        className,
      )}
      role="group"
      aria-label="Langue / Language"
    >
      {options.map((opt) => {
        const isActive = lang === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setLang(opt.value)}
            aria-pressed={isActive}
            title={opt.full}
            className={cn(
              "rounded-full font-bold transition-all duration-300 ease-[var(--ease-bubble)]",
              size === "sm" ? "px-2.5 py-1 text-[0.7rem]" : "px-4 py-2 text-sm",
              isActive
                ? "bg-brand-gradient text-white shadow-sm"
                : "text-lilac-700 hover:text-lilac-900",
            )}
          >
            {opt.label}
            <span className="sr-only"> — {opt.full}</span>
          </button>
        );
      })}
    </div>
  );
}
