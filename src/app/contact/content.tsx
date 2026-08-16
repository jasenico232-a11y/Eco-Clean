"use client";

import { PageHero } from "@/components/sections/PageHero";
import { BookingForm } from "@/components/forms/BookingForm";
import { Faq } from "@/components/sections/Faq";
import { Reveal } from "@/components/ui/Reveal";
import { Scene } from "@/components/ui/Scene";
import {
  IconClock,
  IconLeaf,
  IconMail,
  IconPhone,
  IconPin,
  socialIcons,
} from "@/components/ui/Icons";
import { site } from "@/lib/site";
import { useLang } from "@/lib/i18n";

export function ContactContent() {
  const { t } = useLang();

  const details = [
    {
      icon: IconPin,
      label: { fr: "Zone desservie", en: "Area served" },
      lines: [site.serviceArea, t(site.region)],
    },
    {
      icon: IconPhone,
      label: { fr: "Téléphone", en: "Phone" },
      lines: [site.phone, t(site.hours)],
      href: site.phoneHref,
    },
    {
      icon: IconMail,
      label: { fr: "Courriel", en: "Email" },
      lines: [
        site.email,
        t({ fr: "Réponse en moins de 2 h ouvrables", en: "Reply within 2 working hours" }),
      ],
      href: site.emailHref,
    },
    {
      icon: IconClock,
      label: { fr: "Heures", en: "Hours" },
      lines: [
        t(site.hours),
        t({ fr: "Dimanche : urgences seulement", en: "Sunday: emergencies only" }),
      ],
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={t({ fr: "Nous joindre", en: "Get in touch" })}
        breadcrumb={t({ fr: "Contact", en: "Contact" })}
        title={t({ fr: "Parlons de votre espace", en: "Let\u2019s talk about your space" })}
        description={t({ fr: "Résidence, garderie, clinique ou bureau — décrivez-nous l'espace et recevez un prix fixe écrit le jour même.", en: "Home, daycare, clinic or office — describe the space and get a written flat price the same day." })}
      />

      <section className="mesh-soft py-16 lg:py-24">
        <div className="container-page">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-14">
            {/* ------------------------------------------------ contact info */}
            <div className="flex flex-col gap-5">
              <Reveal direction="right">
                <ul className="flex flex-col gap-4">
                  {details.map((item) => {
                    const Icon = item.icon;
                    const body = (
                      <>
                        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-white shadow-[var(--shadow-glow)] transition-transform duration-500 ease-[var(--ease-bubble)] group-hover:scale-110 group-hover:-rotate-6">
                          <Icon className="size-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[0.72rem] font-bold tracking-wider text-ink-muted uppercase">
                            {t(item.label)}
                          </span>
                          {item.lines.map((line, i) => (
                            <span
                              key={line}
                              className={
                                i === 0
                                  ? "mt-1 block font-bold break-words text-ink"
                                  : "mt-0.5 block text-sm text-ink-muted"
                              }
                            >
                              {line}
                            </span>
                          ))}
                        </span>
                      </>
                    );

                    return (
                      <li key={item.label.fr}>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="group flex items-start gap-4 rounded-2xl bg-white p-5 shadow-[var(--shadow-soft)] ring-1 ring-lilac-100 transition-all duration-400 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                          >
                            {body}
                          </a>
                        ) : (
                          <div className="group flex items-start gap-4 rounded-2xl bg-white p-5 shadow-[var(--shadow-soft)] ring-1 ring-lilac-100">
                            {body}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </Reveal>

              <Reveal direction="right" delay={0.12}>
                <div className="rounded-2xl bg-white p-5 shadow-[var(--shadow-soft)] ring-1 ring-lilac-100">
                  <span className="block text-[0.72rem] font-bold tracking-wider text-ink-muted uppercase">
                    {t({ fr: "Suivez-nous", en: "Follow us" })}
                  </span>
                  <div className="mt-3.5 flex items-center gap-2.5">
                    {site.socials.map((s) => {
                      const Icon = socialIcons[s.icon];
                      return (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          className="grid size-11 place-items-center rounded-full bg-lilac-50 text-lilac-700 ring-1 ring-lilac-100 transition-all duration-300 hover:-translate-y-1 hover:bg-brand-gradient hover:text-white"
                        >
                          <Icon className="size-4" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </Reveal>

              <Reveal direction="right" delay={0.2}>
                <Scene
                  tone="mint"
                  seed={41}
                  icon={<IconLeaf />}
                  label={t({ fr: "Illustration de la zone desservie par Eco-Clean", en: "Illustration of the Eco-Clean service area" })}
                  className="aspect-[4/3] shadow-[var(--shadow-soft)]"
                >
                  <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/92 px-4 py-3 backdrop-blur">
                    <p className="text-sm font-bold text-ink">
                      {t({ fr: "Dieppe, Moncton et Riverview", en: "Dieppe, Moncton and Riverview" })}
                    </p>
                    <p className="mt-0.5 text-xs text-ink-muted">
                      {t({ fr: "Ailleurs dans le Grand Moncton ? Demandez-nous.", en: "Elsewhere in Greater Moncton? Just ask." })}
                    </p>
                  </div>
                </Scene>
              </Reveal>
            </div>

            {/* --------------------------------------------------- the form */}
            <Reveal direction="left">
              <BookingForm />
            </Reveal>
          </div>
        </div>
      </section>

      <Faq />
    </>
  );
}
