import { Button } from "@/components/ui/Button";
import { IconArrowRight, IconBubble } from "@/components/ui/Icons";

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden bg-brand-gradient">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50rem_32rem_at_20%_0%,rgba(255,255,255,0.3),transparent_62%)]"
      />
      <span
        aria-hidden="true"
        className="animate-float-slow pointer-events-none absolute top-16 right-[14%] size-28 rounded-full bg-white/12 ring-1 ring-white/25"
      />

      <div className="relative container-page grid min-h-[70vh] place-items-center py-24 text-center">
        <div className="max-w-xl">
          <span className="mx-auto grid size-20 place-items-center rounded-full bg-white/14 text-white ring-1 ring-white/25">
            <IconBubble className="size-10" />
          </span>

          <p className="font-display mt-8 text-6xl font-extrabold text-white sm:text-8xl">
            404
          </p>
          <h1 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
            This one popped.
          </h1>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-lilac-50/85">
            The page you were after is not here any more. Let&apos;s get you back
            to something spotless.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              href="/"
              size="lg"
              variant="mint"
              icon={<IconArrowRight className="size-3.5" />}
            >
              Back to home
            </Button>
            <Button href="/contact" size="lg" variant="ghost">
              Contact us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
