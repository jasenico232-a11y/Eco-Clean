# Eco-Clean

Marketing site for a certified green cleaning company in **Dieppe, New
Brunswick**, built with Next.js 16 (App Router), React 19, TypeScript and
Tailwind CSS v4. French is the default language, with an FR/EN toggle.

> ## ⚠️ Read before editing any copy
>
> Canada's Competition Act (as amended by **Bill C-59**, in force June 2024)
> places the burden of proof for environmental claims on the **advertiser**,
> not on a regulator who has to disprove them. A private right of action before
> the Competition Tribunal followed in June 2025.
>
> **Never publish:** "organic cleaning", "chemical-free", unqualified
> "non-toxic", unqualified "eco-friendly", "100% natural", "safe for children".
>
> **Always phrase as:** "cleaned with UL ECOLOGO and Green Seal certified
> products", "low-VOC formulations", "third-party certified", "HEPA
> filtration", "fragrance-free options available".
>
> Volume and experience claims need substantiation too. This is a launching
> business, so the site publishes **commitments it controls** (response time,
> redo window, insurance cover) rather than history it cannot evidence — and no
> testimonials, since there are no clients to quote yet.
>
> The full rule set lives at the top of `src/lib/site.ts`. Source: operations
> manual §A1.

Interaction feedback is tiered: pressable surfaces answer at the point of
contact with a sheen and sparkle glints, and soap bubbles are reserved for two
moments — reaching the final call to action, and completing a booking. Nothing
is ambient; the screen always returns to clean within ~5 seconds.

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
| Press | Every `<Button>` and service card | Sheen + sparkle scatter from the contact point |
| Activation | Service card opened | Squeegee shine sweep across the card |
| Milestone | Final CTA scrolled into view | Bubble cloud, **once per page view** |
| Milestone | Booking sent, newsletter joined | Bubble cloud with a splash |

**Press feedback** lives in `usePressFeedback` (`ui/PressFeedback.tsx`) and is
shared by buttons and cards so every pressable surface answers the same way.
Two layers fire from the exact point of contact: a radial **sheen** clipped by
the element's own border radius, and a scatter of four-point **sparkle**
glints. Because both are bounded by the element, the press reads as the surface
reacting rather than as particles thrown over the UI. Keyboard activation
reports `(0,0)`, so those originate from the centre.

The hook measures the pointer against `currentTarget`, so each card owns its
own instance — a single shared instance at section level would render the sheen
in the wrong card. That is why `ServiceCard` is split out of `Services`.

**`ShineSweep`** is the "just-cleaned" pass: a specular band travelling across
the card when it opens, keyed on an activation counter so it replays each time.

**Bubbles are never triggered by clicking.** Opening a service card is
browsing, not an achievement. The scroll trigger (`BubbleReveal`) fires **once
per page view** on purpose: an effect that re-fires whenever the element
re-enters the viewport becomes ambient noise the moment someone scrolls up and
back down.

Everything above is suppressed under `prefers-reduced-motion` via
`motion-reduce:hidden` and the engine's own reduced-motion guard.

### Bubbles

Four files under `src/components/bubbles/`:

- **`engine.ts`** — framework-free canvas simulation. Owns the bubble pool,
  droplet and shock-ring particles, hit testing and pointer repulsion.
- **`BubbleField.tsx`** — mounts the canvas and wires window events.
- **`BubbleProvider.tsx`** — React context exposing `burst` and `burstFrom` to
  any client component via `useBubbles()`.
- **`BubbleReveal.tsx`** — drop-in absolute overlay that fires one burst when
  its parent scrolls into view, once per page view.

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
pointer listeners — where it does not change what is rendered.

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
use it (`Hero`, `About`, `Specialties`, `ServicesPage`, `ContactPage`) and keep
the existing aspect-ratio and `rounded-*` classes.

## Content

All copy, navigation, services, pricing, commitments, standards, specialties
and FAQs live in `src/lib/site.ts`. Editing that one file updates every page.
**Read the compliance header in that file before changing marketing copy.**

Pricing is the §A2 price card in Canadian dollars, before 15% HST, cross-checked
against the Unit Economics tab of the financial model. Flat rates only — never
hourly for residential work — with a $150 minimum per visit.

### Placeholders still to replace before launch

- `site.phone` — currently a reserved fictional 506 number
- `site.email` / `site.url` — placeholder domain
- `site.socials` — placeholder profile URLs
- Business hours are an assumption; the operations manual does not set them

### Bilingual approach

Dieppe is roughly two-thirds mainly French-speaking, so **French is the default
and the served language**, with an FR/EN toggle in the header and mobile drawer.

Copy lives as `{ fr, en }` pairs and is resolved with `t()` from
`@/lib/i18n`. The language lives in a small external store read through
`useSyncExternalStore`, because the server cannot know the visitor's stored
preference: it always renders French, and the saved choice is applied
immediately after mount. English speakers therefore see one frame of French on
a cold load — the trade for keeping this a fully static site. The choice
persists in `localStorage` and updates `<html lang>`.

**Limits worth knowing.** This is a UI-level toggle, not true multilingual
routing. There is one URL per page, metadata and structured data are French
only, and there is no `hreflang`. Search engines only ever index the French
copy. For an indexable English site — per-locale URLs, translated metadata,
`hreflang` pairs — this should graduate to `next-intl` with locale routing.

Pages that need `metadata` keep a server `page.tsx` shell that renders a client
`content.tsx`, since client components cannot export metadata.

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
│   ├── bubbles/          # canvas engine + React bindings + scroll trigger
│   ├── forms/            # booking, newsletter
│   ├── layout/           # header, footer, logo
│   ├── motion/           # global reduced-motion policy
│   ├── sections/         # page sections
│   └── ui/               # button, reveal, icons, scene, dividers
└── lib/                  # site content + helpers
```

## Wide viewports

The page container steps up past 1600px and the root font-size scales with it
(17px → 18px → 20px). Because Tailwind sizing and spacing are rem-based, type,
padding and gaps grow together, so a zoomed-out or ultrawide window scales as
one piece instead of stranding a small layout in the middle of the screen.

Note that lengths in media queries always resolve against the *initial* 16px
root, so the breakpoints stay fixed as the scale steps up.

## Page rhythm

Only the footer uses the dark `bg-ink-gradient`. A dark band mid-page reads as
the end of the site and stops people scrolling, so light sections alternate
between white, `mesh-soft` and `lilac-50` instead.
