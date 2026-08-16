import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Contact & booking",
  description:
    "Book an eco-friendly clean or ask us anything. Fixed quotes within two working hours, seven days a week.",
};

const details = [
  {
    icon: IconPin,
    label: "Our location",
    lines: [site.address],
  },
  {
    icon: IconPhone,
    label: "Phone number",
    lines: [site.phone, "Mon–Sat, 7am–7pm"],
    href: site.phoneHref,
  },
  {
    icon: IconMail,
    label: "Email address",
    lines: [site.email, "Replies within 2 hours"],
    href: site.emailHref,
  },
  {
    icon: IconClock,
    label: "Opening hours",
    lines: [site.hours, "Sunday: emergencies only"],
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        breadcrumb="Contact"
        title="Let's get your space sparkling"
        description="Whether it is your home or your office, we make booking easy and make sure every cleaning need is met with professionalism and care."
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
                            {item.label}
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
                      <li key={item.label}>
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
                    Stay connected
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
                  label="Illustration of the Eco-Clean service area"
                  className="aspect-[4/3] shadow-[var(--shadow-soft)]"
                >
                  <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/92 px-4 py-3 backdrop-blur">
                    <p className="text-sm font-bold text-ink">
                      Serving Reno &amp; Northern Nevada
                    </p>
                    <p className="mt-0.5 text-xs text-ink-muted">
                      Within 30 miles of the city centre — ask about further out.
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
