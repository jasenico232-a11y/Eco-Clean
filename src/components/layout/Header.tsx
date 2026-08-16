"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import {
  IconArrowRight,
  IconClose,
  IconMail,
  IconMenu,
  IconPhone,
  IconPin,
  socialIcons,
} from "@/components/ui/Icons";
import { nav, site } from "@/lib/site";
import { useLang } from "@/lib/i18n";
import { LanguageToggle } from "./LanguageToggle";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <a
        href="#main"
        className="sr-only-focusable fixed top-3 left-3 z-[80] rounded-full bg-lilac-700 px-4 py-2 text-sm font-semibold text-white"
      >
        {t({ fr: "Aller au contenu", en: "Skip to content" })}
      </a>

      {/* Utility bar — hidden on small screens where the space is precious. */}
      <div className="hidden bg-ink-gradient text-lilac-100/90 lg:block">
        <div className="container-page flex h-10 items-center justify-between text-[0.78rem]">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2">
              <IconPin className="size-3.5 text-mint-300" />
              {site.serviceArea}
            </span>
            <a
              href={site.emailHref}
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
            >
              <IconMail className="size-3.5 text-mint-300" />
              {site.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-lilac-200/70">{t({ fr: "Suivez-nous", en: "Follow us" })}</span>
            {site.socials.map((s) => {
              const Icon = socialIcons[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-6 place-items-center rounded-full bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-mint-400 hover:text-lilac-950"
                >
                  <Icon className="size-3" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-500 ease-[var(--ease-soft)]",
          // Solid rather than glass: page content and the bubble canvas both
          // scroll underneath, and any translucency made the nav unreadable.
          // Dropping backdrop-filter also removes a per-frame cost on mobile.
          "bg-white",
          scrolled
            ? "border-b border-lilac-200/70 shadow-[0_8px_30px_-16px_rgb(78_49_147/0.35)]"
            : "border-b border-transparent",
        )}
      >
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-[0.94rem] font-semibold transition-colors duration-300",
                      isActive(item.href)
                        ? "text-lilac-700"
                        : "text-ink-soft hover:text-lilac-700",
                    )}
                  >
                    {t(item.label)}
                    {isActive(item.href) ? (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-lilac-100"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.phoneHref}
              className="group hidden items-center gap-3 rounded-full bg-lilac-50 py-1.5 pr-5 pl-1.5 ring-1 ring-lilac-200 transition-all duration-300 hover:-translate-y-0.5 hover:ring-lilac-400 md:inline-flex"
            >
              <span className="relative grid size-9 place-items-center rounded-full bg-brand-gradient text-white">
                <IconPhone className="size-4" />
                <span className="absolute inset-0 animate-ping-ring rounded-full ring-2 ring-lilac-400" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-[0.65rem] font-semibold tracking-wider text-ink-muted uppercase">
                  {t({ fr: "Appelez-nous", en: "Call now" })}
                </span>
                <span className="text-[0.9rem] font-bold text-ink">
                  {site.phone}
                </span>
              </span>
            </a>

            <LanguageToggle className="hidden sm:inline-flex" />

            {/* Wrapped rather than given `hidden` directly: the button's own
                `inline-flex` and a `hidden` utility are the same CSS property,
                so the winner would depend on stylesheet order, not intent. */}
            <span className="hidden xl:contents">
              <Button
                href="/contact"
                size="sm"
                icon={<IconArrowRight className="size-3.5" />}
              >
                {t({ fr: "Soumission", en: "Get a quote" })}
              </Button>
            </span>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? t({ fr: "Fermer le menu", en: "Close menu" }) : t({ fr: "Ouvrir le menu", en: "Open menu" })}
              className="grid size-11 place-items-center rounded-full bg-lilac-100 text-lilac-800 ring-1 ring-lilac-200 transition-transform duration-300 active:scale-90 lg:hidden"
            >
              {open ? (
                <IconClose className="size-5" />
              ) : (
                <IconMenu className="size-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="drawer"
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              type="button"
              aria-label="Fermer le menu"
              className="absolute inset-0 bg-lilac-950/45 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <motion.nav
              id="mobile-nav"
              aria-label="Mobile"
              className="absolute inset-x-3 top-3 overflow-hidden rounded-[1.75rem] bg-white p-5 shadow-[var(--shadow-lift)]"
              initial={{ y: -24, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={t({ fr: "Fermer le menu", en: "Close menu" })}
                  className="grid size-10 place-items-center rounded-full bg-lilac-100 text-lilac-800 active:scale-90"
                >
                  <IconClose className="size-5" />
                </button>
              </div>

              <ul className="mt-6 flex flex-col gap-1.5">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.35 }}
                  >
                    <Link
                      href={item.href}
                      // Dismiss on tap rather than in an effect watching
                      // `pathname` — same result, no cascading render.
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-semibold transition-colors",
                        isActive(item.href)
                          ? "bg-brand-soft text-lilac-800"
                          : "text-ink-soft active:bg-lilac-50",
                      )}
                    >
                      {t(item.label)}
                      <IconArrowRight className="size-4 opacity-50" />
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-5 flex flex-col gap-2.5 border-t border-lilac-100 pt-5">
                <Button
                  href="/contact"
                  fullWidth
                  size="lg"
                  onClick={() => setOpen(false)}
                >
                  {t({ fr: "Demander une soumission", en: "Request a quote" })}
                </Button>
                <a
                  href={site.phoneHref}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-lilac-50 py-3 text-sm font-bold text-lilac-800 ring-1 ring-lilac-200"
                >
                  <IconPhone className="size-4" />
                  {site.phone}
                </a>
              </div>

              <div className="mt-5 flex justify-center">
                <LanguageToggle size="lg" />
              </div>

              <div className="mt-5 flex items-center justify-center gap-3">
                {site.socials.map((s) => {
                  const Icon = socialIcons[s.icon];
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid size-10 place-items-center rounded-full bg-lilac-100 text-lilac-700 active:scale-90"
                    >
                      <Icon className="size-4" />
                    </a>
                  );
                })}
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
