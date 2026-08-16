/**
 * Single source of truth for site copy, navigation and service data.
 * Keeping it here means pages stay presentational and content edits are one-file.
 */

export const site = {
  name: "Eco-Clean",
  tagline: "Spotless Spaces, Greener Living",
  description:
    "Eco-Clean delivers plant-based, non-toxic cleaning for homes and workplaces. Reliable crews, transparent pricing, and a spotless finish that is safe for kids, pets and the planet.",
  url: "https://eco-clean.example.com",
  phone: "(775) 329-3115",
  phoneHref: "tel:+17753293115",
  email: "hello@eco-clean.com",
  emailHref: "mailto:hello@eco-clean.com",
  address: "657 Twin Lakes Drive, Reno, NV 89523",
  hours: "Mon–Sat · 7:00am – 7:00pm",
  socials: [
    { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
    { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
    { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
  ],
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  /** Drives the bubble surge tint when the card is activated. */
  tint: [string, string];
  icon: ServiceIcon;
  price: string;
  duration: string;
  includes: string[];
};

export type ServiceIcon =
  | "home"
  | "office"
  | "deep"
  | "move"
  | "leaf"
  | "window";

export const services: Service[] = [
  {
    slug: "residential-cleaning",
    title: "Residential Cleaning",
    short: "Weekly, fortnightly or one-off cleans that keep home feeling new.",
    description:
      "A consistent crew who learns your home. We work room by room with plant-based products, so every surface is safe for bare feet, curious toddlers and napping pets.",
    tint: ["#a98bfb", "#ded0ff"],
    icon: "home",
    price: "from $119",
    duration: "2–4 hrs",
    includes: [
      "All living areas, bedrooms and hallways",
      "Kitchen degrease, appliance fronts, splashbacks",
      "Bathroom sanitising and limescale treatment",
      "Vacuum, mop and edge detailing",
    ],
  },
  {
    slug: "commercial-cleaning",
    title: "Commercial Cleaning",
    short: "After-hours office care that never interrupts a workday.",
    description:
      "Studios, clinics and offices up to 40,000 sq ft. Fully insured, police-checked crews, digital sign-off sheets and a named account lead you can actually reach.",
    tint: ["#7a52e0", "#c6aeff"],
    icon: "office",
    price: "custom quote",
    duration: "nightly",
    includes: [
      "Desks, meeting rooms and breakout zones",
      "Washroom restocking and sanitising",
      "Touchpoint disinfection programme",
      "Monthly reporting and audit trail",
    ],
  },
  {
    slug: "deep-cleaning",
    title: "Deep Cleaning",
    short: "The full reset — skirting boards, grout, ovens and everything behind.",
    description:
      "Our most thorough service. We move what can be moved, steam what should be steamed, and finish with a written checklist of all 148 points covered.",
    tint: ["#22cda9", "#b6f7e7"],
    icon: "deep",
    price: "from $289",
    duration: "5–8 hrs",
    includes: [
      "Oven, extractor and fridge interiors",
      "Grout, tile and limescale restoration",
      "Skirting, door frames and light fittings",
      "Interior windows, tracks and sills",
    ],
  },
  {
    slug: "move-in-move-out",
    title: "Move-In / Move-Out",
    short: "Deposit-back cleans, timed to your handover, not ours.",
    description:
      "Landlord-grade checklists built from real inventory reports. We photograph the finish so your agent has nothing to argue with — and we will return free within 72 hours if they do.",
    tint: ["#ee8dd6", "#ffd6f2"],
    icon: "move",
    price: "from $249",
    duration: "4–7 hrs",
    includes: [
      "Inside every cupboard, drawer and wardrobe",
      "Appliance deep clean and descale",
      "Carpet lift and hard-floor restoration",
      "Photographic completion report",
    ],
  },
  {
    slug: "eco-sanitising",
    title: "Eco Sanitising",
    short: "Hospital-grade results from plant-derived, zero-residue formulas.",
    description:
      "Electrostatic misting with biodegradable disinfectant that kills 99.99% of common bacteria and leaves no synthetic residue behind. Safe to re-enter in 20 minutes.",
    tint: ["#12a98b", "#7ff0d6"],
    icon: "leaf",
    price: "from $169",
    duration: "1–2 hrs",
    includes: [
      "Electrostatic full-room misting",
      "High-touch point programme",
      "Allergen and dust-mite reduction",
      "Certificate of sanitisation",
    ],
  },
  {
    slug: "window-glass",
    title: "Window & Glass Care",
    short: "Streak-free glass inside and out, up to four storeys.",
    description:
      "Purified-water pole systems mean no ladders, no detergent runoff and no smears — just glass that disappears. Frames, tracks and sills included as standard.",
    tint: ["#6540bc", "#93e6e4"],
    icon: "window",
    price: "from $99",
    duration: "1–3 hrs",
    includes: [
      "Interior and exterior glass",
      "Frames, tracks and sills",
      "Skylights and conservatory panels",
      "Purified-water, detergent-free system",
    ],
  },
];

export const stats = [
  { value: 12, suffix: "+", label: "Years of experience" },
  { value: 10400, suffix: "+", label: "Spaces cleaned" },
  { value: 99, suffix: "%", label: "Customer satisfaction" },
  { value: 640, suffix: "+", label: "Happy households" },
];

export const processSteps = [
  {
    step: "01",
    title: "Tell us about the space",
    body: "Ninety seconds online, or one call. Size, rooms, pets, any problem areas — that is all we need to price it properly.",
  },
  {
    step: "02",
    title: "Get a fixed quote",
    body: "A flat price within two hours, itemised by room. No hourly creep, no surprise line items on the invoice.",
  },
  {
    step: "03",
    title: "Meet your crew",
    body: "The same vetted team every visit. You will know their names, and they will know how you like the kitchen left.",
  },
  {
    step: "04",
    title: "Enjoy the sparkle",
    body: "Photo sign-off after each clean. If anything is not right, tell us within 48 hours and we come back free.",
  },
];

export const testimonials = [
  {
    quote:
      "Our clinic switched to Eco-Clean because of the non-toxic products and stayed because of the consistency. Three years, not one missed night.",
    name: "Dr. Amara Bello",
    role: "Practice Manager, Northside Dental",
    initials: "AB",
  },
  {
    quote:
      "They deep-cleaned a flat I was convinced needed replacing. The oven alone was worth the money. Deposit back in full.",
    name: "James Whitfield",
    role: "Tenant, Riverside Quarter",
    initials: "JW",
  },
  {
    quote:
      "Two toddlers and a rescue greyhound. Knowing there is nothing harsh on the floors they all roll around on is the entire reason we booked.",
    name: "Priya Raman",
    role: "Homeowner, Somerset Way",
    initials: "PR",
  },
  {
    quote:
      "The reporting is what sold our facilities board. Audit trail, monthly summary, one named contact. It is genuinely professional.",
    name: "Tom Okafor",
    role: "Facilities Lead, Marlow Studios",
    initials: "TO",
  },
];

export const articles = [
  {
    date: "Sep 17",
    year: "2026",
    category: "Cleaning Secrets",
    title: "Unlock expert cleaning secrets to transform your spaces",
    excerpt:
      "The five-minute habits that keep a home ninety percent clean, so the deep clean never feels like a rescue mission.",
    author: "David Elson",
    readTime: "6 min",
  },
  {
    date: "Sep 24",
    year: "2026",
    category: "Eco Living",
    title: "Plant-based products that actually outperform bleach",
    excerpt:
      "We ran citric, lactic and caprylic formulas against a chlorine control on real kitchen grime. The results surprised us too.",
    author: "James Hall",
    readTime: "8 min",
  },
  {
    date: "Sep 29",
    year: "2026",
    category: "Office Care",
    title: "The ultimate cleaning resource for homes and offices",
    excerpt:
      "A room-by-room frequency chart you can pin to the fridge — or hand to your facilities team on day one.",
    author: "Denise Cole",
    readTime: "5 min",
  },
];

export const faqs = [
  {
    q: "Are your products genuinely safe for pets and children?",
    a: "Yes. Every formula we carry is plant-derived, biodegradable and free of ammonia, chlorine bleach and phthalates. Surfaces are safe to touch as soon as they are dry, and we are happy to send you the full ingredient list for anything we use in your home.",
  },
  {
    q: "Do I need to be home during the clean?",
    a: "Not at all. Around two-thirds of our clients give us a key or door code, held under a logged key-management policy. You will get a start notification and a photo sign-off when we finish.",
  },
  {
    q: "What happens if I am not happy with something?",
    a: "Tell us within 48 hours and we return free of charge to put it right. That guarantee is on every clean, including one-off bookings, and it has never had a time limit hidden in the small print.",
  },
  {
    q: "How does pricing work — is it hourly?",
    a: "No. We quote a fixed price per visit based on the size and condition of the space. If your crew finishes early, the price does not change; if the job takes longer than we estimated, that is on us.",
  },
  {
    q: "Can I change or cancel a booking?",
    a: "Reschedule or cancel free up to 24 hours before your slot, straight from the confirmation email. Inside 24 hours we apply a 50% charge, because the crew is already rostered.",
  },
  {
    q: "Are your cleaners insured and background checked?",
    a: "Every crew member is employed directly, DBS/background checked, and covered by $2m public liability plus accidental damage cover. We never subcontract.",
  },
];
