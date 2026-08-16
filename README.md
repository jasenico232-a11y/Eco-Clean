# Eco-Clean

Marketing site for an eco-friendly cleaning company, built with Next.js 16 (App
Router), React 19, TypeScript and Tailwind CSS v4.

The signature interaction is a canvas bubble field: soap bubbles drift up across
the whole viewport, visitors can pop them by tapping, and activating a service
card floods the page with bubbles tinted in that service's colour.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script              | What it does                          |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Dev server                            |
| `npm run build`     | Production build                      |
| `npm start`         | Serve the production build            |
| `npm run lint`      | ESLint (`eslint-config-next` flat)    |
| `npm run typecheck` | `tsc --noEmit`                        |

## The palette

"Eco Bloom" — a lilac ramp blended into aqua-mint, with an orchid flourish.
Lilac leads because it is the brand colour; mint carries the eco signal and
keeps the gradient from reading as generic purple SaaS.

The signature gradient runs
`#6540bc → #8e6bf2 → #b79bff → #93e6e4 → #7ff0d6` and is exposed as the
`bg-brand-gradient` utility. Tokens live in `src/app/globals.css` under
`@theme`; changing them there updates the whole site.

| Token       | Role                                                       |
| ----------- | ---------------------------------------------------------- |
| `lilac-*`   | Primary ramp, 50–950                                        |
| `mint-*`    | Eco accent — CTAs, ticks, "we mean it" moments              |
| `orchid-*`  | Warm flourish, plus form error states                       |
| `ink*`      | Text and dark surfaces                                      |

## Bubble system

Four files under `src/components/bubbles/`:

- **`engine.ts`** — framework-free canvas simulation. Owns the bubble pool,
  droplet and shock-ring particles, hit testing and pointer repulsion.
- **`BubbleField.tsx`** — mounts the canvas and wires window events.
- **`BubbleProvider.tsx`** — React context exposing `pop`, `popFrom` and
  `surge` to any client component via `useBubbles()`.

### Triggering effects

```tsx
const { pop, popFrom, surge } = useBubbles();

// Burst at a point
pop(x, y, { colors: ["#7ff0d6"], count: 20, power: 1.3, radius: 40 });

// Burst from an element (or the pointer that hit it)
popFrom(el, { event: { clientX, clientY } });

// Flood the screen — used when a service card is activated
surge({ colors: ["#22cda9", "#b6f7e7"], amount: 26, duration: 7, origin });
```

Every method no-ops safely when the field is not mounted, so components never
need to guard.

Where the effects fire today: every `<Button>` click, main-nav links, service
cards (pop **and** tinted surge), FAQ rows, the CTA band, newsletter signup and
booking-form submission.

### Why the canvas never blocks the UI

The canvas is full-viewport and sits at `z-40`, above page content — that is
what makes bubbles appear to drift *across* the page rather than behind it. It
is also `pointer-events: none`, so it can never swallow a click. Popping works
by hit-testing window-level `pointerdown` events against the bubble pool
instead. A bubble drifting over a button is poppable *and* the button still
works.

### Performance

- Bubble bodies are pre-rendered once per tint into offscreen sprites and
  blitted with `drawImage` — no per-frame gradient allocation.
- Device pixel ratio capped at 2; population scales with viewport area and
  halves on coarse-pointer devices. Hard ceilings of 90 bubbles / 260 droplets.
- The rAF loop parks itself when the tab is hidden, and delta time is clamped so
  returning to a backgrounded tab does not teleport the simulation.
- All pages are statically prerendered; there are no image requests at all
  (see below).

## Motion and accessibility

`MotionProvider` applies Framer Motion's `reducedMotion="user"` globally.

**Components must not branch their rendered output on `useReducedMotion()`.**
That hook reads the media query during render, so the server (which always sees
"no preference") and a client that prefers reduced motion emit different markup,
and React fails hydration. `reducedMotion="user"` handles it inside Framer
Motion instead: transform animations are suppressed while opacity still
resolves, so revealed content always ends up visible and the markup is identical
either way. CSS keyframe animations are neutralised separately by the
`prefers-reduced-motion` block in `globals.css`, and the bubble engine drops its
ambient population entirely.

`useReducedMotion()` is still fine for effect-only logic — autoplay timers,
pointer listeners, the stat count-up — where it does not change what is
rendered.

Also covered: skip link, visible focus rings, labelled form fields with
`aria-invalid` and `role="alert"`, focus moved to the first invalid field on
submit, `aria-expanded` on all disclosures, Escape-to-close and scroll lock on
the mobile drawer.

## Artwork

There is no photography. The `<Scene>` component draws brand artwork in SVG —
gradient ground, a suggested interior, floating motes — wherever the design
calls for an image. That means no image requests, no layout shift and no broken
placeholders.

To swap in real photos, replace `<Scene>` with `next/image` in the sections that
use it (`Hero`, `About`, `Articles`, `ServicesPage`, `ContactPage`) and keep the
existing aspect-ratio and `rounded-*` classes.

## Content

All copy, navigation, services, stats, testimonials, articles and FAQs live in
`src/lib/site.ts`. Editing that one file updates every page.

## Wiring up a backend

Two forms currently simulate submission client-side, each marked with a comment:

- `src/components/forms/BookingForm.tsx` — replace the `setTimeout` with your
  booking endpoint.
- `src/components/forms/NewsletterForm.tsx` — replace with your ESP call.

Validation, error display and the success state are already built; only the
network call is missing.

## Project structure

```
src/
├── app/                  # routes: /, /services, /about, /contact, 404
├── components/
│   ├── bubbles/          # canvas engine + React bindings
│   ├── forms/            # booking, newsletter
│   ├── layout/           # header, footer, logo
│   ├── motion/           # global reduced-motion policy
│   ├── sections/         # page sections
│   └── ui/               # button, reveal, count-up, icons, scene, dividers
└── lib/                  # site content + helpers
```
