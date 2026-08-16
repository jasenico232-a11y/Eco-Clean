import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Scene } from "@/components/ui/Scene";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import {
  IconArrowUpRight,
  IconClock,
  IconDeep,
  IconLeaf,
  IconOffice,
} from "@/components/ui/Icons";
import { articles } from "@/lib/site";

const art = [
  { tone: "lilac" as const, icon: <IconDeep /> },
  { tone: "mint" as const, icon: <IconLeaf /> },
  { tone: "orchid" as const, icon: <IconOffice /> },
];

export function Articles() {
  return (
    <section className="relative bg-white py-20 lg:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Latest articles & guides"
          title="Expert tips and insights to keep your space spotless"
          description="Written by the crews who actually do the work — not a content agency."
          action={
            <Button
              href="/contact"
              variant="secondary"
              icon={<IconArrowUpRight className="size-3.5" />}
            >
              View all articles
            </Button>
          }
        />

        <RevealGroup
          as="ul"
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {articles.map((post, i) => (
            <RevealItem as="li" key={post.title}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[var(--shadow-soft)] ring-1 ring-lilac-100 transition-all duration-500 ease-[var(--ease-bubble)] hover:-translate-y-2 hover:shadow-[var(--shadow-lift)]">
                <div className="relative">
                  <Scene
                    tone={art[i % art.length].tone}
                    seed={i * 9 + 2}
                    icon={art[i % art.length].icon}
                    className="aspect-[16/10] rounded-none"
                  />
                  <span className="absolute top-4 left-4 flex flex-col items-center rounded-2xl bg-white px-3 py-2 leading-none shadow-md">
                    <span className="font-display text-lg font-extrabold text-ink">
                      {post.date.split(" ")[1]}
                    </span>
                    <span className="mt-0.5 text-[0.62rem] font-bold tracking-wider text-ink-muted uppercase">
                      {post.date.split(" ")[0]}
                    </span>
                  </span>
                  <span className="absolute right-4 bottom-4 rounded-full bg-white/92 px-3 py-1.5 text-[0.68rem] font-bold text-lilac-700 backdrop-blur">
                    {post.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-[0.72rem] font-semibold text-ink-muted">
                    <span>{post.author}</span>
                    <span className="inline-flex items-center gap-1">
                      <IconClock className="size-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-display mt-3 text-lg leading-snug font-bold text-ink transition-colors duration-300 group-hover:text-lilac-700">
                    {post.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-muted">
                    {post.excerpt}
                  </p>

                  <Link
                    href="/contact"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-lilac-700"
                  >
                    Read more
                    <IconArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
