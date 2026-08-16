import type { L } from "./i18n";

/**
 * Single source of truth for site copy, navigation and service data.
 *
 * User-facing strings are `{ fr, en }` pairs resolved by `t()` from
 * `@/lib/i18n`. French is the default and the server-rendered language.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ADVERTISING COMPLIANCE — READ BEFORE EDITING ANY COPY
 *
 * Canada's Competition Act (as amended by Bill C-59, in force June 2024) puts
 * the burden of proof for environmental claims on the ADVERTISER. A private
 * right of action before the Competition Tribunal followed in June 2025.
 *
 * Never publish on this site, in either language:
 *   "organic cleaning", "chemical-free", unqualified "non-toxic",
 *   unqualified "eco-friendly", "100% natural", "safe for children".
 *
 * Always phrase green claims as:
 *   "cleaned with UL ECOLOGO and Green Seal certified products",
 *   "low-VOC formulations", "third-party certified", "HEPA filtration",
 *   "fragrance-free options available".
 *
 * Volume and experience claims ("X years", "X homes cleaned") must also be
 * substantiated. This is a launching business — do not add them.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Source: Dieppe_Operations_Manual.docx §A1, §A2, §A5, Part D.
 * Pricing cross-checked against Dieppe_Venture_Financial_Model.xlsx (Unit
 * Economics tab). All figures in Canadian dollars, before 15% HST.
 */

export const site = {
  name: "Eco-Clean",
  /** Always pair the brand with its substantiation — never "eco" on its own. */
  qualifier: {
    fr: "Certifié ECOLOGO & Green Seal",
    en: "ECOLOGO & Green Seal certified",
  } satisfies L,

  tagline: {
    fr: "Nettoyage certifié écologique à Dieppe",
    en: "Certified green cleaning in Dieppe",
  } satisfies L,

  /** §A1 positioning sentence. */
  positioning: {
    fr: "Nettoyage résidentiel et commercial certifié écologique, au service des familles, garderies et cliniques de Dieppe.",
    en: "Certified green residential and commercial cleaning for Dieppe families, daycares and clinics.",
  } satisfies L,

  description:
    "Nettoyage résidentiel et commercial à Dieppe, Moncton et Riverview avec des produits certifiés UL ECOLOGO et Green Seal. Service bilingue, aspirateurs à filtration HEPA, options sans parfum. Certified green cleaning for Dieppe families, daycares and clinics.",

  url: "https://eco-clean.ca",

  // TODO: replace with the real business line before launch.
  phone: "(506) 555-0142",
  phoneHref: "tel:+15065550142",
  // TODO: replace with the real mailbox before launch.
  email: "bonjour@eco-clean.ca",
  emailHref: "mailto:bonjour@eco-clean.ca",

  /** No street address published — this is a mobile service business. */
  region: {
    fr: "Dieppe, Nouveau-Brunswick",
    en: "Dieppe, New Brunswick",
  } satisfies L,
  serviceArea: "Dieppe · Moncton · Riverview",
  hours: {
    fr: "Lun–Sam · 7 h – 19 h",
    en: "Mon–Sat · 7am – 7pm",
  } satisfies L,

  socials: [
    { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
    { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  ],
} as const;

export const nav: { label: L; href: string }[] = [
  { label: { fr: "Accueil", en: "Home" }, href: "/" },
  { label: { fr: "Services", en: "Services" }, href: "/services" },
  { label: { fr: "À propos", en: "About" }, href: "/about" },
  { label: { fr: "Contact", en: "Contact" }, href: "/contact" },
];

export type Service = {
  slug: string;
  title: L;
  short: L;
  description: L;
  /** Drives the accent tint when the card is activated. */
  tint: [string, string];
  icon: ServiceIcon;
  price: L;
  duration: L;
  includes: L[];
};

export type ServiceIcon =
  | "home"
  | "office"
  | "deep"
  | "move"
  | "leaf"
  | "window";

/**
 * §A2 price card. Flat rates only — never hourly for residential work.
 * Minimum charge $150 per visit. Prices reviewed every April.
 */
export const services: Service[] = [
  {
    slug: "menage-recurrent",
    title: { fr: "Ménage récurrent", en: "Recurring clean" },
    short: {
      fr: "Aux deux semaines, chaque semaine ou une fois par mois — la même équipe, à chaque visite.",
      en: "Weekly, biweekly or monthly — the same crew, every visit.",
    },
    description: {
      fr: "Notre service de base pour une maison de 3 chambres et 2 salles de bain. Séquence pièce par pièce, système de chiffons à code de couleur, aspirateur à filtration HEPA. Chaque nouveau client récurrent commence par un grand ménage.",
      en: "Our core service for a 3-bedroom, 2-bathroom home. Room-by-room sequence, colour-coded cloth system, HEPA-filtered vacuums. Every new recurring client starts with a deep clean.",
    },
    tint: ["#a98bfb", "#ded0ff"],
    icon: "home",
    price: { fr: "220 $", en: "$220" },
    duration: { fr: "4 h · 3 ch / 2 sdb", en: "4 hrs · 3 bed / 2 bath" },
    includes: [
      {
        fr: "Toutes les pièces de vie, chambres et couloirs",
        en: "All living areas, bedrooms and hallways",
      },
      {
        fr: "Cuisine : dégraissage, façades d'électroménagers, dosserets",
        en: "Kitchen degrease, appliance fronts, backsplashes",
      },
      {
        fr: "Salles de bain : chiffons rouges réservés aux toilettes",
        en: "Bathrooms, with red cloths reserved for toilets",
      },
      {
        fr: "Aspirateur HEPA, vadrouille à plat, plinthes détaillées",
        en: "HEPA vacuum, flat-mop system, baseboard detailing",
      },
    ],
  },
  {
    slug: "grand-menage",
    title: { fr: "Grand ménage", en: "Deep clean" },
    short: {
      fr: "La remise à zéro complète — et la première visite obligatoire de tout contrat récurrent.",
      en: "The full reset — and the mandatory first visit on every recurring contract.",
    },
    description: {
      fr: "Notre service le plus complet. On déplace ce qui peut l'être, on traite la saleté incrustée et on termine par la vérification en 10 points du propriétaire avant de quitter les lieux.",
      en: "Our most thorough service. We move what can be moved, treat built-up soiling, and finish with the owner's 10-point check before we leave.",
    },
    tint: ["#22cda9", "#b6f7e7"],
    icon: "deep",
    price: { fr: "420 $", en: "$420" },
    duration: { fr: "6,5 h", en: "6.5 hrs" },
    includes: [
      {
        fr: "Intérieur du four, de la hotte et du réfrigérateur",
        en: "Oven, range hood and fridge interiors",
      },
      {
        fr: "Coulis, céramique et traitement du calcaire",
        en: "Grout, tile and limescale treatment",
      },
      {
        fr: "Plinthes, cadres de porte et luminaires",
        en: "Baseboards, door frames and light fittings",
      },
      {
        fr: "Fenêtres intérieures, rails et appuis",
        en: "Interior windows, tracks and sills",
      },
    ],
  },
  {
    slug: "demenagement",
    title: { fr: "Déménagement", en: "Move-in / move-out" },
    short: {
      fr: "Pour les courtiers, gestionnaires d'immeubles et propriétaires, à l'heure de la remise des clés.",
      en: "For realtors, property managers and landlords, timed to handover.",
    },
    description: {
      fr: "Listes de vérification calquées sur les états des lieux réels. On photographie le résultat pour que votre agent n'ait rien à contester, et on revient gratuitement sous 48 heures si nécessaire.",
      en: "Checklists built from real inventory reports. We photograph the finish so your agent has nothing to dispute, and we return free within 48 hours if needed.",
    },
    tint: ["#ee8dd6", "#ffd6f2"],
    icon: "move",
    price: { fr: "475 $", en: "$475" },
    duration: { fr: "7 h", en: "7 hrs" },
    includes: [
      {
        fr: "Intérieur de toutes les armoires, tiroirs et garde-robes",
        en: "Inside every cupboard, drawer and wardrobe",
      },
      {
        fr: "Électroménagers en profondeur et détartrage",
        en: "Appliance deep clean and descaling",
      },
      {
        fr: "Restauration des planchers durs",
        en: "Hard-floor restoration",
      },
      {
        fr: "Rapport photographique de fin de travaux",
        en: "Photographic completion report",
      },
    ],
  },
  {
    slug: "location-court-terme",
    title: { fr: "Location court terme", en: "Short-term rental turnover" },
    short: {
      fr: "Rotation Airbnb près de l'aéroport et de Place Champlain, avec délai garanti.",
      en: "Airbnb turnovers near the airport and Champlain Place, with a guaranteed window.",
    },
    description: {
      fr: "Pour les hôtes de 1 à 2 chambres qui ont besoin d'une rotation fiable entre deux séjours. Réapprovisionnement du linge, remise en scène et vérification photo avant chaque arrivée.",
      en: "For 1–2 bedroom hosts who need a reliable turnover between stays. Linen restock, restaging and a photo check before every arrival.",
    },
    tint: ["#6540bc", "#93e6e4"],
    icon: "window",
    price: { fr: "130 $", en: "$130" },
    duration: { fr: "2,5 h · 1–2 ch", en: "2.5 hrs · 1–2 bed" },
    includes: [
      { fr: "Rotation complète entre deux séjours", en: "Full turnover between stays" },
      { fr: "Changement de literie et de serviettes", en: "Bed linen and towel change" },
      { fr: "Réapprovisionnement des consommables", en: "Consumables restocked" },
      { fr: "Vérification photo avant l'arrivée", en: "Photo check before arrival" },
    ],
  },
  {
    slug: "apres-construction",
    title: { fr: "Après-construction", en: "Post-construction" },
    short: {
      fr: "Pour les constructeurs des nouveaux quartiers de Dieppe. Devis après visite du chantier.",
      en: "For builders in Dieppe's new subdivisions. Quoted after a site visit.",
    },
    description: {
      fr: "Retrait de la poussière de construction, des résidus d'adhésif et des étiquettes. Toujours estimé au pied carré après une visite sur place — jamais par téléphone.",
      en: "Construction dust, adhesive residue and label removal. Always quoted by the square foot after a site visit — never over the phone.",
    },
    tint: ["#7a52e0", "#c6aeff"],
    icon: "leaf",
    price: { fr: "dès 550 $", en: "from $550" },
    duration: { fr: "≈10 h", en: "≈10 hrs" },
    includes: [
      {
        fr: "Poussière de construction, du plafond au plancher",
        en: "Construction dust, ceiling to floor",
      },
      {
        fr: "Retrait des étiquettes, adhésifs et résidus",
        en: "Label, adhesive and residue removal",
      },
      { fr: "Conduits, luminaires et quincaillerie", en: "Vents, fittings and hardware" },
      {
        fr: "Devis de 0,15 $ à 0,50 $ / pi² après visite",
        en: "Quoted $0.15–$0.50 / sq ft after a visit",
      },
    ],
  },
  {
    slug: "entretien-commercial",
    title: { fr: "Entretien commercial", en: "Commercial janitorial" },
    short: {
      fr: "Garderies, cliniques et petits bureaux — notre spécialité, en dehors des heures d'ouverture.",
      en: "Daycares, clinics and small offices — our specialism, after hours.",
    },
    description: {
      fr: "Notre marché de prédilection. Fiche de certification de chaque produit disponible sur demande pour vos visites d'inspection, gamme sans parfum pour les cliniques, et un responsable de compte que vous pouvez joindre.",
      en: "Our core market. Every product's certification sheet available for your inspection walkthroughs, a fragrance-free line for clinics, and a named account lead you can actually reach.",
    },
    tint: ["#12a98b", "#7ff0d6"],
    icon: "office",
    price: { fr: "42 $ / h-personne", en: "$42 / cleaner-hour" },
    duration: { fr: "selon contrat", en: "per contract" },
    includes: [
      {
        fr: "Garderies, cliniques médicales et dentaires",
        en: "Daycares, medical and dental clinics",
      },
      {
        fr: "Programme de désinfection des points de contact",
        en: "Touchpoint disinfection programme",
      },
      { fr: "Gamme sans parfum disponible", en: "Fragrance-free line available" },
      {
        fr: "0,12 $ à 0,25 $ / pi² selon le contrat",
        en: "$0.12–$0.25 / sq ft depending on contract",
      },
    ],
  },
];

/** §A2 add-ons. Quoted on top of any service above. */
export const addOns: { label: L; price: L }[] = [
  {
    label: { fr: "Fenêtres intérieures", en: "Interior windows" },
    price: { fr: "90 $", en: "$90" },
  },
  {
    label: { fr: "Four ou réfrigérateur", en: "Oven or fridge" },
    price: { fr: "55 $ ch.", en: "$55 each" },
  },
  {
    label: { fr: "Extraction de tapis", en: "Carpet extraction" },
    price: { fr: "0,20–0,30 $ / pi²", en: "$0.20–$0.30 / sq ft" },
  },
];

/**
 * Substantiated commitments, not volume claims. This is a launching business:
 * every number here is a policy we control, not a history we cannot prove.
 */
export const commitments: { value: string; suffix: L; label: L }[] = [
  {
    value: "100",
    suffix: { fr: "%", en: "%" },
    label: {
      fr: "Produits certifiés ECOLOGO ou Green Seal",
      en: "Products certified ECOLOGO or Green Seal",
    },
  },
  {
    value: "2",
    suffix: { fr: " h", en: " hrs" },
    label: {
      fr: "Délai de réponse à toute demande",
      en: "Response to any enquiry",
    },
  },
  {
    value: "48",
    suffix: { fr: " h", en: " hrs" },
    label: {
      fr: "Reprise gratuite si rien ne va",
      en: "Free redo window",
    },
  },
  {
    value: "2",
    suffix: { fr: " M$", en: "M" },
    label: {
      fr: "Assurance responsabilité civile",
      en: "General liability cover",
    },
  },
];

/** Condensed from the eight-stage job cycle in §A3. */
export const processSteps: { step: string; title: L; body: L }[] = [
  {
    step: "01",
    title: { fr: "Votre demande", en: "Your enquiry" },
    body: {
      fr: "On répond en moins de deux heures ouvrables, en français ou en anglais. On note les chambres, les animaux, les sensibilités et votre langue préférée.",
      en: "We answer within two working hours, in French or English. We capture bedrooms, pets, sensitivities and your preferred language.",
    },
  },
  {
    step: "02",
    title: { fr: "Un prix fixe", en: "A flat quote" },
    body: {
      fr: "Un tarif forfaitaire écrit le jour même, valable 14 jours, avec ce qui est inclus et ce qui ne l'est pas. Jamais à l'heure pour le résidentiel.",
      en: "A written flat rate the same day, valid 14 days, stating what is and is not included. Never hourly for residential work.",
    },
  },
  {
    step: "03",
    title: { fr: "Le grand ménage", en: "The first deep clean" },
    body: {
      fr: "Tout contrat récurrent commence par un grand ménage. C'est la seule façon honnête de partir sur une base propre — sans exception.",
      en: "Every recurring contract starts with a deep clean. It is the only honest way to start from a clean baseline — no exceptions.",
    },
  },
  {
    step: "04",
    title: { fr: "La vérification", en: "The quality check" },
    body: {
      fr: "Vérification en 10 points avant de partir, puis un suivi sous 24 heures après chaque première visite. Reprise gratuite sous 48 heures.",
      en: "A 10-point check before we leave, then a follow-up within 24 hours of every first visit. Free redo within 48 hours.",
    },
  },
];

/**
 * Operational standards from §A4 and §A5. These replace testimonials: a
 * business that has not yet served clients cannot publish client quotes.
 */
export const standards: {
  icon: "recycle" | "shield" | "leaf" | "check";
  title: L;
  body: L;
}[] = [
  {
    icon: "recycle",
    title: { fr: "Chiffons à code de couleur", en: "Colour-coded cloths" },
    body: {
      fr: "Le rouge ne quitte jamais la toilette. Le jaune n'entre jamais dans la cuisine. Le vert n'entre jamais dans une salle de bain. Le bleu sert au dépoussiérage à sec uniquement.",
      en: "Red never leaves the toilet. Yellow never enters the kitchen. Green never enters a bathroom. Blue is for dry dusting only.",
    },
  },
  {
    icon: "shield",
    title: { fr: "Filtration HEPA", en: "HEPA filtration" },
    body: {
      fr: "Aspirateurs commerciaux à filtration HEPA sur chaque camion, avec un jeu de filtres de rechange en permanence. Important dans les foyers avec des sensibilités respiratoires.",
      en: "Commercial HEPA-filtered vacuums on every van, with a spare filter set always carried. It matters in homes with respiratory sensitivities.",
    },
  },
  {
    icon: "leaf",
    title: { fr: "Gamme sans parfum", en: "Fragrance-free line" },
    body: {
      fr: "Une gamme complète sans parfum pour les cliniques et les clients sensibles. Personne d'autre à Dieppe ne l'offre explicitement.",
      en: "A full fragrance-free line for clinics and sensitive clients. Nobody else in Dieppe markets one explicitly.",
    },
  },
  {
    icon: "check",
    title: { fr: "Cartable de conformité", en: "Compliance binder" },
    body: {
      fr: "Le certificat et la fiche signalétique de chaque produit, sur papier et dans le nuage. Disponible pour toute visite d'inspection de garderie ou de clinique.",
      en: "Every product's certificate and safety data sheet, on paper and in the cloud. Available for any daycare or clinic walkthrough.",
    },
  },
];

/** The three segments §A1 tells us to specialise in. */
export const specialties: {
  icon: "users" | "shield" | "home";
  title: L;
  body: L;
  tone: "lilac" | "mint" | "orchid";
}[] = [
  {
    icon: "users",
    title: { fr: "Garderies", en: "Daycares" },
    body: {
      fr: "Fiche de certification remise à chaque visite d'inspection. Produits certifiés ECOLOGO ou Green Seal, sans exception, y compris pour les travaux difficiles.",
      en: "A certification sheet handed over at every inspection visit. ECOLOGO or Green Seal certified products, without exception, including for tough jobs.",
    },
    tone: "lilac",
  },
  {
    icon: "shield",
    title: { fr: "Cliniques", en: "Medical & dental clinics" },
    body: {
      fr: "Gamme sans parfum, programme de désinfection des points de contact, et fiches signalétiques accessibles sur place comme l'exige le SIMDUT.",
      en: "Fragrance-free line, a touchpoint disinfection programme, and safety data sheets accessible on site as WHMIS requires.",
    },
    tone: "mint",
  },
  {
    icon: "home",
    title: { fr: "Familles", en: "Families" },
    body: {
      fr: "Foyers avec de jeunes enfants ou des sensibilités respiratoires. Formulations à faible COV et filtration HEPA à chaque visite.",
      en: "Homes with young children or respiratory sensitivities. Low-VOC formulations and HEPA filtration on every visit.",
    },
    tone: "orchid",
  },
];

export const faqs: { q: L; a: L }[] = [
  {
    q: {
      fr: "Vos produits sont-ils vraiment certifiés ?",
      en: "Are your products genuinely certified?",
    },
    a: {
      fr: "Oui, et nous pouvons le prouver. Chaque produit porte la certification UL ECOLOGO, Green Seal ou une certification tierce reconnue équivalente. Le certificat et la fiche signalétique de chaque produit se trouvent dans notre cartable de conformité, sur papier et dans le nuage. Demandez-le : nous le remettons volontiers avant toute visite.",
      en: "Yes, and we can prove it. Every product carries UL ECOLOGO, Green Seal or an equivalent recognised third-party certification. Each product's certificate and safety data sheet sits in our compliance binder, on paper and in the cloud. Ask for it — we hand it over before any visit.",
    },
  },
  {
    q: {
      fr: "Servez-vous la clientèle en français ?",
      en: "Do you serve clients in French?",
    },
    a: {
      fr: "Le français d'abord. Nos devis, nos factures, notre boîte vocale et notre site mènent en français, avec l'anglais à côté. Vous choisissez votre langue à la première prise de contact et nous nous y tenons pour toute la durée du contrat.",
      en: "French first. Our quotes, invoices, voicemail and website lead in French with English alongside. You pick your language at first contact and we hold to it for the life of the contract.",
    },
  },
  {
    q: {
      fr: "Pourquoi facturez-vous un prix fixe plutôt qu'à l'heure ?",
      en: "Why flat rates instead of hourly?",
    },
    a: {
      fr: "Parce que le tarif horaire vous invite à surveiller l'horloge. Un prix fixe nous récompense d'être efficaces et vous garantit le montant avant que quiconque entre chez vous. Si la tâche prend plus de temps que prévu, c'est notre problème, pas le vôtre. Facturation minimale de 150 $ par visite.",
      en: "Because hourly billing invites you to watch the clock. A flat rate rewards us for being efficient and fixes your number before anyone sets foot in your space. If the job runs long, that is our problem, not yours. Minimum charge $150 per visit.",
    },
  },
  {
    q: {
      fr: "Pourquoi dois-je commencer par un grand ménage ?",
      en: "Why must I start with a deep clean?",
    },
    a: {
      fr: "Tout nouveau contrat récurrent commence par un grand ménage payant, sans exception. Reprendre l'accumulation laissée par quelqu'un d'autre au tarif d'entretien courant mène à un mauvais résultat pour vous et à une perte pour nous. Une seule visite remet le compteur à zéro.",
      en: "Every new recurring contract starts with a paid deep clean, without exception. Taking on someone else's build-up at maintenance rates means a poor result for you and a loss for us. One visit resets the baseline.",
    },
  },
  {
    q: {
      fr: "Que se passe-t-il si le résultat ne me convient pas ?",
      en: "What if I am not happy with the result?",
    },
    a: {
      fr: "Dites-le-nous dans les 48 heures et nous revenons gratuitement. Aucun formulaire, aucune négociation. Pendant notre première année, le propriétaire se déplace lui-même pour chaque reprise.",
      en: "Tell us within 48 hours and we return free of charge. No forms, no negotiation. Through our first year the owner attends every redo personally.",
    },
  },
  {
    q: { fr: "Êtes-vous assurés ?", en: "Are you insured?" },
    a: {
      fr: "Assurance responsabilité civile générale de 2 M$, cautionnement d'entretien ménager attendu par la clientèle commerciale, et assurance automobile commerciale. Nous sommes inscrits auprès de Travail sécuritaire NB et notre personnel reçoit la formation SIMDUT à l'embauche, avec mise à jour annuelle.",
      en: "$2M general liability, the janitorial bond commercial clients expect, and commercial auto cover. We are registered with WorkSafeNB and our staff receive WHMIS training at onboarding with an annual refresh.",
    },
  },
];
