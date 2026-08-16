# Eco-Clean

Marketing site for an eco-friendly cleaning company, built with Next.js 16 (App
Router), React 19, TypeScript and Tailwind CSS v4.

Interaction feedback is tiered: ordinary controls get a contained press sheen,
meaningful choices get a short-lived cloud of soap bubbles in the relevant
brand colour, and nothing is ambient — the screen always returns to clean.

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

### Feedback tiers

Click feedback is deliberately **not** uniform. Applying the same effect to
every control makes it read as decoration rather than as a response, so effort
scales with the weight of the action:

| Tier | Where | Effect |
| ---- | ----- | ------ |
| Ordinary | Every `<Button>`, nav links, FAQ rows | Press sheen inside the control; no particles |
| Selection | Service card activated | Short bubble cloud in that service's tint |
| Milestone | Booking sent, newsletter joined | Larger bubble cloud with a splash |

**Tier 1 — the sheen.** A radial wipe expands from the exact point of contact,
clipped by the button's own border radius (`eco-sheen` in `globals.css`, driven
by `Button.tsx`). Because it is bounded by the control and tinted per variant,
it reads as the *surface reacting to a press* rather than as particles thrown
over the top of the UI. Keyboard activation reports `(0,0)`, so those start
from the centre instead.

**Tiers 2–3 — bubbles.** Reserved for moments that earn them.

### Bubbles

Three files under `src/components/bubbles/`:

- **`engine.ts`** — framework-free canvas simulation. Owns the bubble pool,
  droplet and shock-ring particles, hit testing and pointer repulsion.
- **`BubbleField.tsx`** — mounts the canvas and wires window events.
- **`BubbleProvider.tsx`** — React context exposing `burst` and `burstFrom` to
  any client component via `useBubbles()`.

```tsx
const { burst, burstFrom } = useBubbles();

// A cloud at a point — every bubble self-expires
burst(x, y, { colors: ["#22cda9", "#b6f7e7"], count: 14, spread: 60, splash: true });

// Same, centred on an element (or the pointer that activated it)
burstFrom(el, { event: { clientX, clientY } });
```

Both no-op safely when the field is not mounted, so components never guard.

**Nothing is ambient.** There is no idle bubble population. Every bubble is
born from a `burst()` call carrying its own lifetime (2.4–4.6s), and ends by
either popping into a ring and droplets or drifting out — the mix is
randomised per bubble so the finish never looks like a synchronised
switch-off. The screen is guaranteed to return to clean within ~5 seconds of
the last trigger.

### Why the canvas never blocks the UI

The canvas is full-viewport at `z-40`, above page content, so bubbles pass
*across* the page rather than behind it. It is `pointer-events: none`, so it
can never swallow a click — popping works by hit-testing window-level
`pointerdown` events instead. A bubble over a button is poppable *and* the
button still works.

### Performance

- **An idle page costs nothing.** The render loop is parked whenever the screen
  is clean and only wakes on a burst; pointer handlers bail out early via
  `engine.isActive()` when there is nothing to move.
- Bubble bodies are pre-rendered once per tint into offscreen sprites and
  blitted with `drawImage` — no per-frame gradient allocation.
- Device pixel ratio capped at 2; burst sizes scale down on coarse-pointer
  devices. Hard ceilings of 64 bubbles / 220 droplets.
- The loop also parks when the tab is hidden, and delta time is clamped so
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
`prefers-reduced-motion` block in `globals.css`; the bubble engine suppresses
bursts entirely, and the press sheen is hidden via `motion-reduce:hidden`.

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
