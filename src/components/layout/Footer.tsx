"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { CloudDivider } from "@/components/ui/Dividers";
import {
  IconClock,
  IconMail,
  IconPhone,
  IconPin,
  IconRecycle,
  socialIcons,
} from "@/components/ui/Icons";
import { nav, services, site } from "@/lib/site";
import { useLang } from "@/lib/i18n";

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="relative">
      <CloudDivider fill="#24164a" className="-mb-px" />

      <div className="relative overflow-hidden bg-ink-gradient">
        {/* Ambient glow blobs — pure CSS, no images to download. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-24 size-[28rem] rounded-full bg-lilac-500/25 blur-[110px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 bottom-0 size-[24rem] rounded-full bg-mint-500/20 blur-[110px]"
        />

        <div className="relative container-page py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.5fr] lg:gap-10">
            <div>
              <Logo tone="dark" id="ftr" />
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-lilac-100/70">
                {t(site.positioning)}
              </p>
              <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-mint-400/12 px-3.5 py-2 text-xs font-semibold text-mint-200 ring-1 ring-mint-400/25">
                <IconRecycle className="size-4" />
                {t({ fr: "Produits certifiés UL ECOLOGO & Green Seal", en: "UL ECOLOGO & Green Seal certified products" })}
              </p>

              <div className="mt-6 flex items-center gap-2.5">
                {site.socials.map((s) => {
                  const Icon = socialIcons[s.icon];
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid size-10 place-items-center rounded-full bg-white/8 text-lilac-100 ring-1 ring-white/12 transition-all duration-300 hover:-translate-y-1 hover:bg-mint-400 hover:text-lilac-950"
                    >
                      <Icon className="size-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            <nav aria-label={t({ fr: "Liens rapides", en: "Quick links" })}>
              <h3 className="font-display text-base font-bold text-white">
                {t({ fr: "Liens rapides", en: "Quick links" })}
              </h3>
              <ul className="mt-5 flex flex-col gap-3 text-sm">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-lilac-100/70 transition-colors hover:text-mint-300"
                    >
                      {t(item.label)}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/contact#booking"
                    className="text-lilac-100/70 transition-colors hover:text-mint-300"
                  >
                    {t({ fr: "Demander une soumission", en: "Request a quote" })}
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label="Services">
              <h3 className="font-display text-base font-bold text-white">
                Services
              </h3>
              <ul className="mt-5 flex flex-col gap-3 text-sm">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services#${s.slug}`}
                      className="text-lilac-100/70 transition-colors hover:text-mint-300"
                    >
                      {t(s.title)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h3 className="font-display text-base font-bold text-white">
                {t({ fr: "Nous joindre", en: "Get in touch" })}
              </h3>
              <ul className="mt-5 flex flex-col gap-4 text-sm">
                <li>
                  <a
                    href={site.phoneHref}
                    className="flex items-start gap-3 text-lilac-100/70 transition-colors hover:text-mint-300"
                  >
                    <IconPhone className="mt-0.5 size-4 shrink-0 text-mint-300" />
                    {site.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={site.emailHref}
                    className="flex items-start gap-3 text-lilac-100/70 transition-colors hover:text-mint-300"
                  >
                    <IconMail className="mt-0.5 size-4 shrink-0 text-mint-300" />
                    {site.email}
                  </a>
                </li>
                <li className="flex items-start gap-3 text-lilac-100/70">
                  <IconPin className="mt-0.5 size-4 shrink-0 text-mint-300" />
                  {site.serviceArea}
                </li>
                <li className="flex items-start gap-3 text-lilac-100/70">
                  <IconClock className="mt-0.5 size-4 shrink-0 text-mint-300" />
                  {t(site.hours)}
                </li>
              </ul>

              <h3 className="font-display mt-8 text-base font-bold text-white">
                Newsletter
              </h3>
              <p className="mt-2 mb-3 text-sm text-lilac-100/60">
                {t({ fr: "Un conseil d’entretien utile par mois. Rien d’autre.", en: "One genuinely useful cleaning tip a month. Nothing else." })}
              </p>
              <NewsletterForm />
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-xs text-lilac-100/55 sm:flex-row">
            <p>
              © {year} {site.name}. {t({ fr: "Tous droits réservés.", en: "All rights reserved." })}
            </p>
            <div className="flex items-center gap-6">
              <Link href="/contact" className="transition-colors hover:text-mint-300">
                {t({ fr: "Confidentialité", en: "Privacy" })}
              </Link>
              <Link href="/contact" className="transition-colors hover:text-mint-300">
                {t({ fr: "Conditions", en: "Terms" })}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
