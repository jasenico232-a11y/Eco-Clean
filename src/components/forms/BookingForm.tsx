"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { IconArrowRight, IconCheck, IconSparkle } from "@/components/ui/Icons";
import { services } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useBubbles } from "@/components/bubbles/BubbleProvider";

type Fields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  propertySize: string;
  preferredDate: string;
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  service: "",
  propertySize: "",
  preferredDate: "",
  message: "",
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Digits, spaces and the usual separators; 7-15 digits once stripped.
const PHONE = /^[\d\s()+.-]{7,20}$/;

const sizes = [
  "Studio / 1 chambre",
  "2–3 chambres",
  "4 chambres ou plus",
  "Bureau de moins de 5 000 pi²",
  "Bureau de 5 000 pi² et plus",
];

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (!values.firstName.trim()) errors.firstName = "Veuillez indiquer votre prénom.";
  if (!values.lastName.trim()) errors.lastName = "Veuillez indiquer votre nom.";
  if (!EMAIL.test(values.email.trim()))
    errors.email = "Entrez un courriel valide pour recevoir votre soumission.";
  if (!PHONE.test(values.phone.trim()) || values.phone.replace(/\D/g, "").length < 7)
    errors.phone = "Entrez un numéro où nous pouvons vous joindre.";
  if (!values.service) errors.service = "Choisissez le service souhaité.";
  return errors;
}

/* ------------------------------------------------------------------ fields */

function Field({
  label,
  htmlFor,
  error,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={htmlFor}
        className="text-[0.78rem] font-bold tracking-wide text-ink-soft"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="text-xs font-medium text-orchid-400"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

const control =
  "w-full rounded-xl border border-lilac-200 bg-white px-4 py-3 text-[0.94rem] text-ink " +
  "placeholder:text-ink-muted/55 transition-all duration-300 " +
  "hover:border-lilac-300 focus:border-lilac-500 focus:ring-4 focus:ring-lilac-200/60 focus:outline-none";

const controlError = "border-orchid-400 focus:border-orchid-400 focus:ring-orchid-200/60";

/* -------------------------------------------------------------------- form */

export function BookingForm() {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { burst } = useBubbles();

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      // Move focus to the first problem so keyboard and screen-reader users
      // are not left hunting for it.
      const firstKey = Object.keys(found)[0];
      document.getElementById(firstKey)?.focus();
      return;
    }

    setSubmitting(true);

    // No backend yet — point this at your booking endpoint when it exists.
    await new Promise((resolve) => setTimeout(resolve, 700));

    // A completed booking is the one moment on the site that genuinely earns a
    // celebration, tinted to the service the visitor picked. It clears itself
    // within a few seconds like every other burst.
    const chosen = services.find((s) => s.slug === values.service);
    const colors = chosen ? [...chosen.tint, "#ffffff"] : ["#c6aeff", "#7ff0d6", "#ffffff"];

    burst(window.innerWidth / 2, window.innerHeight * 0.55, {
      colors,
      count: 26,
      spread: 150,
      splash: true,
    });

    setSubmitting(false);
    setSent(true);
    setValues(empty);
  };

  return (
    <div
      id="booking"
      className="scroll-mt-28 rounded-[1.75rem] bg-white p-6 shadow-[var(--shadow-lift)] ring-1 ring-lilac-100 sm:rounded-[2rem] sm:p-8 lg:p-10"
    >
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="py-8 text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.1,
                type: "spring",
                stiffness: 260,
                damping: 16,
              }}
              className="mx-auto grid size-20 place-items-center rounded-full bg-brand-gradient text-white shadow-[var(--shadow-glow)]"
            >
              <IconCheck className="size-9" strokeWidth={2.2} />
            </motion.span>

            <h3 className="font-display mt-7 text-2xl font-extrabold text-ink">
              Demande reçue. Merci !
            </h3>
            <p className="mx-auto mt-3 max-w-md text-[0.98rem] leading-relaxed text-ink-muted">
              Un responsable vous appelle en moins de deux heures ouvrables avec un prix fixe. Pas de centre d’appels, pas de musique d’attente.
            </p>

            <button
              type="button"
              onClick={() => setSent(false)}
              className="mt-7 text-sm font-bold text-lilac-700 underline underline-offset-4 transition-colors hover:text-lilac-900"
            >
              Envoyer une autre demande
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            initial={false}
            exit={{ opacity: 0, scale: 0.98 }}
            className="flex flex-col gap-5"
          >
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-lilac-100 px-3.5 py-1.5 text-xs font-bold tracking-wider text-lilac-700 uppercase">
                <IconSparkle className="size-3.5" />
                Nous joindre
              </span>
              <h2 className="font-display mt-4 text-2xl font-extrabold text-ink sm:text-3xl">
                Demandez votre soumission
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Décrivez-nous l’espace et nous revenons avec un prix fixe en moins de deux heures ouvrables.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Prénom" htmlFor="firstName" error={errors.firstName}>
                <input
                  id="firstName"
                  name="firstName"
                  autoComplete="given-name"
                  value={values.firstName}
                  onChange={(e) => set("firstName", e.target.value)}
                  aria-invalid={Boolean(errors.firstName)}
                  aria-describedby={errors.firstName ? "firstName-error" : undefined}
                  placeholder="Marie"
                  className={cn(control, errors.firstName && controlError)}
                />
              </Field>

              <Field label="Nom" htmlFor="lastName" error={errors.lastName}>
                <input
                  id="lastName"
                  name="lastName"
                  autoComplete="family-name"
                  value={values.lastName}
                  onChange={(e) => set("lastName", e.target.value)}
                  aria-invalid={Boolean(errors.lastName)}
                  aria-describedby={errors.lastName ? "lastName-error" : undefined}
                  placeholder="LeBlanc"
                  className={cn(control, errors.lastName && controlError)}
                />
              </Field>

              <Field label="Courriel" htmlFor="email" error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(e) => set("email", e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  placeholder="marie@exemple.ca"
                  className={cn(control, errors.email && controlError)}
                />
              </Field>

              <Field label="Téléphone" htmlFor="phone" error={errors.phone}>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  placeholder="(506) 000-0000"
                  className={cn(control, errors.phone && controlError)}
                />
              </Field>

              <Field label="Service souhaité" htmlFor="service" error={errors.service}>
                <select
                  id="service"
                  name="service"
                  value={values.service}
                  onChange={(e) => set("service", e.target.value)}
                  aria-invalid={Boolean(errors.service)}
                  aria-describedby={errors.service ? "service-error" : undefined}
                  className={cn(control, "appearance-none", errors.service && controlError)}
                >
                  <option value="">Select a service…</option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.titleFr} — {s.price}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Taille du logement" htmlFor="propertySize">
                <select
                  id="propertySize"
                  name="propertySize"
                  value={values.propertySize}
                  onChange={(e) => set("propertySize", e.target.value)}
                  className={cn(control, "appearance-none")}
                >
                  <option value="">Facultatif…</option>
                  {sizes.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                label="Date souhaitée"
                htmlFor="preferredDate"
                className="sm:col-span-2"
              >
                <input
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  value={values.preferredDate}
                  onChange={(e) => set("preferredDate", e.target.value)}
                  className={control}
                />
              </Field>

              <Field
                label="Autre chose à savoir ?"
                htmlFor="message"
                className="sm:col-span-2"
              >
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={(e) => set("message", e.target.value)}
                  placeholder="Animaux, allergies, stationnement, zones problématiques, accès…"
                  className={cn(control, "resize-y")}
                />
              </Field>
            </div>

            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Button
                type="submit"
                size="lg"
                disabled={submitting}
                icon={<IconArrowRight className="size-3.5" />}
              >
                {submitting ? "Envoi…" : "Envoyer ma demande"}
              </Button>
              <p className="text-xs leading-relaxed text-ink-muted">
                Sans engagement. Vos coordonnées ne sont jamais transmises à des tiers.
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
