"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useBubbles } from "@/components/bubbles/BubbleProvider";
import { IconArrowRight, IconCheck } from "@/components/ui/Icons";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");
  const { pop, surge } = useBubbles();

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!EMAIL.test(email.trim())) {
      setState("error");
      return;
    }

    // No backend wired yet — swap this for your ESP call.
    const rect = e.currentTarget.getBoundingClientRect();
    pop(rect.left + rect.width / 2, rect.top + rect.height / 2, {
      colors: ["#7ff0d6", "#4fe3c4", "#ffffff"],
      count: 22,
      power: 1.3,
      radius: 40,
    });
    surge({
      colors: ["#7ff0d6", "#4fe3c4", "#c6aeff"],
      amount: 14,
      duration: 5,
      origin: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
    });
    setState("done");
    setEmail("");
  };

  return (
    <div>
      <AnimatePresence mode="wait" initial={false}>
        {state === "done" ? (
          <motion.p
            key="done"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2.5 rounded-full bg-mint-400/15 px-4 py-3 text-sm font-semibold text-mint-200 ring-1 ring-mint-400/40"
          >
            <IconCheck className="size-4 shrink-0" />
            You are on the list. Watch out for our first tip.
          </motion.p>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            noValidate
            initial={false}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 rounded-full bg-white/8 p-1.5 ring-1 ring-white/20 focus-within:ring-lilac-300"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              placeholder="Email address"
              onChange={(e) => {
                setEmail(e.target.value);
                if (state === "error") setState("idle");
              }}
              aria-invalid={state === "error"}
              className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder:text-lilac-200/55 focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-mint-400 px-4 py-2 text-sm font-bold text-lilac-950 transition-transform duration-300 hover:scale-105 active:scale-95"
            >
              Subscribe
              <IconArrowRight className="size-3.5" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {state === "error" ? (
        <p className="mt-2 pl-4 text-xs font-medium text-orchid-300">
          Please enter a valid email address.
        </p>
      ) : null}
    </div>
  );
}
