import Link from "next/link";
import type { ReactNode } from "react";
import { CloudDivider } from "@/components/ui/Dividers";
import { IconSparkle } from "@/components/ui/Icons";

/** Compact banner for inner pages — same brand gradient, less height. */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  breadcrumb: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-gradient">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50rem_30rem_at_20%_-20%,rgba(255,255,255,0.3),transparent_62%),radial-gradient(40rem_28rem_at_92%_10%,rgba(127,240,214,0.28),transparent_62%)]"
      />
      <span
        aria-hidden="true"
        className="animate-float-slow pointer-events-none absolute top-10 right-[12%] size-24 rounded-full bg-white/12 ring-1 ring-white/25 lg:size-36"
      />
      <span
        aria-hidden="true"
        className="animate-float pointer-events-none absolute bottom-24 left-[8%] hidden size-16 rounded-full bg-mint-300/22 ring-1 ring-white/25 sm:block"
      />

      <div className="relative container-page pt-14 pb-24 sm:pt-16 lg:pt-20 lg:pb-36">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs font-semibold text-lilac-100/75">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-white">{breadcrumb}</li>
          </ol>
        </nav>

        <span className="inline-flex items-center gap-2 rounded-full bg-white/14 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-white uppercase ring-1 ring-white/25 backdrop-blur-sm">
          <IconSparkle className="size-3.5 text-mint-300" />
          {eyebrow}
        </span>

        <h1 className="mt-6 max-w-3xl text-4xl leading-[1.08] font-extrabold text-white sm:text-5xl lg:text-[3.6rem]">
          {title}
        </h1>

        {description ? (
          <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-lilac-50/85">
            {description}
          </p>
        ) : null}

        {children}
      </div>

      <CloudDivider className="absolute inset-x-0 bottom-0" />
    </section>
  );
}
