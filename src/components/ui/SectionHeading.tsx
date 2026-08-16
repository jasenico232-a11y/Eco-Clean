import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { IconSparkle } from "./Icons";

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-[0.14em] uppercase",
        tone === "light"
          ? "bg-lilac-100 text-lilac-700 ring-1 ring-lilac-200"
          : "bg-white/12 text-lilac-100 ring-1 ring-white/25",
        className,
      )}
    >
      <IconSparkle className="size-3.5" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        action && "md:flex-row md:items-end md:justify-between md:gap-10",
        className,
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-4",
          align === "center" && "items-center",
          action && "md:max-w-2xl",
        )}
      >
        {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
        <h2
          className={cn(
            "text-3xl leading-[1.12] font-bold sm:text-4xl lg:text-[2.9rem]",
            tone === "light" ? "text-ink" : "text-white",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "max-w-2xl text-[1.02rem] leading-relaxed",
              tone === "light" ? "text-ink-muted" : "text-lilac-100/85",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
