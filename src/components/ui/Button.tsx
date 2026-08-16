"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { usePressFeedback, type PressTone } from "./PressFeedback";

type Variant = "primary" | "secondary" | "ghost" | "dark" | "mint";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Leading pill-icon, as seen on the reference layout's CTAs. */
  icon?: ReactNode;
  fullWidth?: boolean;
};

type AnchorProps = BaseProps & {
  href: string;
  external?: boolean;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  type?: never;
  disabled?: never;
};

type ButtonProps = BaseProps & {
  href?: undefined;
  external?: never;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const base =
  "group relative isolate inline-flex select-none items-center justify-center gap-2.5 overflow-hidden rounded-full font-semibold " +
  "transition-[transform,box-shadow,background-color,color] duration-300 ease-[var(--ease-bubble)] " +
  "active:scale-[0.97] disabled:pointer-events-none disabled:opacity-55";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-gradient text-white shadow-[var(--shadow-glow)] hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-10px_rgb(142_107_242/0.6)]",
  secondary:
    "bg-white text-lilac-800 ring-1 ring-lilac-200 shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:ring-lilac-400 hover:text-lilac-900",
  ghost:
    "bg-white/10 text-white ring-1 ring-white/35 backdrop-blur-sm hover:bg-white/20 hover:-translate-y-0.5",
  dark: "bg-ink-gradient text-white shadow-[var(--shadow-lift)] hover:-translate-y-0.5",
  mint: "bg-mint-400 text-lilac-950 shadow-[0_12px_36px_-10px_rgb(34_205_169/0.65)] hover:-translate-y-0.5 hover:bg-mint-300",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5.5 py-3 text-[0.95rem]",
  lg: "px-7 py-3.5 text-base",
};

/** Press tone per variant — light surfaces need a lilac wash, not white. */
const pressTone: Record<Variant, PressTone> = {
  primary: "light",
  secondary: "lilac",
  ghost: "light",
  dark: "dark",
  mint: "mint",
};

export function Button(props: AnchorProps | ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    icon,
    fullWidth,
  } = props;

  // Buttons are small, so a lighter scatter keeps the glint from crowding.
  const { press, layer } = usePressFeedback(pressTone[variant], {
    sparkleCount: 4,
  });

  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );

  const inner = (
    <>
      {layer}
      {icon ? (
        <span
          className={cn(
            "grid size-6 shrink-0 place-items-center rounded-full transition-transform duration-300 ease-[var(--ease-bubble)] group-hover:scale-110",
            variant === "primary" || variant === "dark"
              ? "bg-white/25 text-white"
              : "bg-lilac-100 text-lilac-700",
          )}
        >
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
    </>
  );

  if (props.href !== undefined) {
    const { href, external, onClick } = props;
    const handle = (e: MouseEvent<HTMLAnchorElement>) => {
      press(e);
      onClick?.(e);
    };

    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handle}
        >
          {inner}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} onClick={handle}>
        {inner}
      </Link>
    );
  }

  const { onClick, type = "button", disabled } = props;

  return (
    <button
      type={type}
      disabled={disabled}
      className={classes}
      onClick={(e) => {
        press(e);
        onClick?.(e);
      }}
    >
      {inner}
    </button>
  );
}
