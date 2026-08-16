/**
 * Single source of truth for site copy, navigation and service data.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ADVERTISING COMPLIANCE — READ BEFORE EDITING ANY COPY
 *
 * Canada's Competition Act (as amended by Bill C-59, in force June 2024) puts
 * the burden of proof for environmental claims on the ADVERTISER. A private
 * right of action before the Competition Tribunal followed in June 2025.
 *
 * Never publish on this site:
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
  qualifier: "Certifié ECOLOGO & Green Seal",
  taglineFr: "Nettoyage certifié écologique à Dieppe",
  taglineEn: "Certified green cleaning in Dieppe",

  /** §A1 positioning sentence, French first as the manual requires. */
  positioningFr:
    "Nettoyage résidentiel et commercial certifié écologique, au service des familles, garderies et cliniques de Dieppe.",
  positioningEn:
    "Certified green residential and commercial cleaning for Dieppe families, daycares and clinics.",

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
  region: "Dieppe, Nouveau-Brunswick",
  serviceArea: "Dieppe · Moncton · Riverview",
  hoursFr: "Lun–Sam · 7 h – 19 h",
  hoursEn: "Mon–Sat · 7am – 7pm",

  socials: [
    { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
    { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  ],
} as const;

export const nav = [
  { label: "Accueil", sub: "Home", href: "/" },
  { label: "Services", sub: "Services", href: "/services" },
  { label: "À propos", sub: "About", href: "/about" },
  { label: "Contact", sub: "Contact", href: "/contact" },
] as const;

export type Service = {
  slug: string;
  titleFr: string;
  titleEn: string;
  short: string;
  description: string;
  /** Drives the accent tint when the card is activated. */
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

/**
 * §A2 price card. Flat rates only — never hourly for residential work.
 * Minimum charge $150 per visit. Prices reviewed every April.
 */
export const services: Service[] = [
  {
    slug: "menage-recurrent",
    titleFr: "Ménage récurrent",
    titleEn: "Recurring clean",
    short:
      "Aux deux semaines, chaque semaine ou une fois par mois — la même équipe, à chaque visite.",
    description:
      "Notre service de base pour une maison de 3 chambres et 2 salles de bain. Séquence pièce par pièce, système de chiffons à code de couleur, aspirateur à filtration HEPA. Chaque nouveau client récurrent commence par un grand ménage.",
    tint: ["#a98bfb", "#ded0ff"],
    icon: "home",
    price: "220 $",
    duration: "4 h · 3 ch / 2 sdb",
    includes: [
      "Toutes les pièces de vie, chambres et couloirs",
      "Cuisine : dégraissage, façades d'électroménagers, dosserets",
      "Salles de bain : chiffons rouges réservés aux toilettes",
      "Aspirateur HEPA, vadrouille à plat, plinthes détaillées",
    ],
  },
  {
    slug: "grand-menage",
    titleFr: "Grand ménage",
    titleEn: "Deep clean",
    short:
      "La remise à zéro complète — et la première visite obligatoire de tout contrat récurrent.",
    description:
      "Notre service le plus complet. On déplace ce qui peut l'être, on traite la saleté incrustée et on termine par la vérification en 10 points du propriétaire avant de quitter les lieux.",
    tint: ["#22cda9", "#b6f7e7"],
    icon: "deep",
    price: "420 $",
    duration: "6,5 h",
    includes: [
      "Intérieur du four, de la hotte et du réfrigérateur",
      "Coulis, céramique et traitement du calcaire",
      "Plinthes, cadres de porte et luminaires",
      "Fenêtres intérieures, rails et appuis",
    ],
  },
  {
    slug: "demenagement",
    titleFr: "Déménagement",
    titleEn: "Move-in / move-out",
    short:
      "Pour les courtiers, gestionnaires d'immeubles et propriétaires, à l'heure de la remise des clés.",
    description:
      "Listes de vérification calquées sur les états des lieux réels. On photographie le résultat pour que votre agent n'ait rien à contester, et on revient gratuitement sous 48 heures si nécessaire.",
    tint: ["#ee8dd6", "#ffd6f2"],
    icon: "move",
    price: "475 $",
    duration: "7 h",
    includes: [
      "Intérieur de toutes les armoires, tiroirs et garde-robes",
      "Électroménagers en profondeur et détartrage",
      "Restauration des planchers durs",
      "Rapport photographique de fin de travaux",
    ],
  },
  {
    slug: "location-court-terme",
    titleFr: "Location court terme",
    titleEn: "Short-term rental turnover",
    short:
      "Rotation Airbnb près de l'aéroport et de Place Champlain, avec délai garanti.",
    description:
      "Pour les hôtes de 1 à 2 chambres qui ont besoin d'une rotation fiable entre deux séjours. Réapprovisionnement du linge, remise en scène et vérification photo avant chaque arrivée.",
    tint: ["#6540bc", "#93e6e4"],
    icon: "window",
    price: "130 $",
    duration: "2,5 h · 1–2 ch",
    includes: [
      "Rotation complète entre deux séjours",
      "Changement de literie et de serviettes",
      "Réapprovisionnement des consommables",
      "Vérification photo avant l'arrivée",
    ],
  },
  {
    slug: "apres-construction",
    titleFr: "Après-construction",
    titleEn: "Post-construction",
    short:
      "Pour les constructeurs des nouveaux quartiers de Dieppe. Devis après visite du chantier.",
    description:
      "Retrait de la poussière de construction, des résidus d'adhésif et des étiquettes. Toujours estimé au pied carré après une visite sur place — jamais par téléphone.",
    tint: ["#7a52e0", "#c6aeff"],
    icon: "leaf",
    price: "dès 550 $",
    duration: "≈10 h",
    includes: [
      "Poussière de construction, du plafond au plancher",
      "Retrait des étiquettes, adhésifs et résidus",
      "Conduits, luminaires et quincaillerie",
      "Devis de 0,15 $ à 0,50 $ / pi² après visite",
    ],
  },
  {
    slug: "entretien-commercial",
    titleFr: "Entretien commercial",
    titleEn: "Commercial janitorial",
    short:
      "Garderies, cliniques et petits bureaux — notre spécialité, en dehors des heures d'ouverture.",
    description:
      "Notre marché de prédilection. Fiche de certification de chaque produit disponible sur demande pour vos visites d'inspection, gamme sans parfum pour les cliniques, et un responsable de compte que vous pouvez joindre.",
    tint: ["#12a98b", "#7ff0d6"],
    icon: "office",
    price: "42 $ / h-personne",
    duration: "selon contrat",
    includes: [
      "Garderies, cliniques médicales et dentaires",
      "Programme de désinfection des points de contact",
      "Gamme sans parfum disponible",
      "0,12 $ à 0,25 $ / pi² selon le contrat",
    ],
  },
];

/** §A2 add-ons. Quoted on top of any service above. */
export const addOns = [
  { label: "Fenêtres intérieures", labelEn: "Interior windows", price: "90 $" },
  { label: "Four ou réfrigérateur", labelEn: "Oven or fridge", price: "55 $ ch." },
  {
    label: "Extraction de tapis",
    labelEn: "Carpet extraction",
    price: "0,20–0,30 $ / pi²",
  },
];

/**
 * Substantiated commitments, not volume claims. This is a launching business:
 * every number here is a policy we control, not a history we cannot prove.
 */
export const commitments = [
  {
    value: "100",
    suffix: "%",
    label: "Produits certifiés ECOLOGO ou Green Seal",
    labelEn: "Certified products, every job",
  },
  {
    value: "2",
    suffix: " h",
    label: "Délai de réponse à toute demande",
    labelEn: "Response to any enquiry",
  },
  {
    value: "48",
    suffix: " h",
    label: "Reprise gratuite si rien ne va",
    labelEn: "Free redo window",
  },
  {
    value: "2",
    suffix: " M$",
    label: "Assurance responsabilité civile",
    labelEn: "General liability cover",
  },
];

/** Condensed from the eight-stage job cycle in §A3. */
export const processSteps = [
  {
    step: "01",
    titleFr: "Votre demande",
    titleEn: "Enquiry",
    body: "On répond en moins de deux heures ouvrables, en français ou en anglais. On note les chambres, les animaux, les sensibilités et votre langue préférée.",
  },
  {
    step: "02",
    titleFr: "Un prix fixe",
    titleEn: "Flat quote",
    body: "Un tarif forfaitaire écrit le jour même, valable 14 jours, avec ce qui est inclus et ce qui ne l'est pas. Jamais à l'heure pour le résidentiel.",
  },
  {
    step: "03",
    titleFr: "Le grand ménage",
    titleEn: "First deep clean",
    body: "Tout contrat récurrent commence par un grand ménage. C'est la seule façon honnête de partir sur une base propre — sans exception.",
  },
  {
    step: "04",
    titleFr: "La vérification",
    titleEn: "Quality check",
    body: "Vérification en 10 points avant de partir, puis un suivi sous 24 heures après chaque première visite. Reprise gratuite sous 48 heures.",
  },
];

/**
 * Operational standards from §A4 and §A5. These replace testimonials: a
 * business that has not yet served clients cannot publish client quotes.
 */
export const standards = [
  {
    icon: "recycle" as const,
    titleFr: "Chiffons à code de couleur",
    titleEn: "Colour-coded cloths",
    body: "Le rouge ne quitte jamais la toilette. Le jaune n'entre jamais dans la cuisine. Le vert n'entre jamais dans une salle de bain. Le bleu sert au dépoussiérage à sec uniquement.",
  },
  {
    icon: "shield" as const,
    titleFr: "Filtration HEPA",
    titleEn: "HEPA filtration",
    body: "Aspirateurs commerciaux à filtration HEPA sur chaque camion, avec un jeu de filtres de rechange en permanence. Important dans les foyers avec des sensibilités respiratoires.",
  },
  {
    icon: "leaf" as const,
    titleFr: "Gamme sans parfum",
    titleEn: "Fragrance-free line",
    body: "Une gamme complète sans parfum pour les cliniques et les clients sensibles. Personne d'autre à Dieppe ne l'offre explicitement.",
  },
  {
    icon: "check" as const,
    titleFr: "Cartable de conformité",
    titleEn: "Compliance binder",
    body: "Le certificat et la fiche signalétique de chaque produit, sur papier et dans le nuage. Disponible pour toute visite d'inspection de garderie ou de clinique.",
  },
];

/** The three segments §A1 tells us to specialise in. */
export const specialties = [
  {
    icon: "users" as const,
    titleFr: "Garderies",
    titleEn: "Daycares",
    body: "Fiche de certification remise à chaque visite d'inspection. Produits certifiés ECOLOGO ou Green Seal, sans exception, y compris pour les travaux difficiles.",
    tone: "lilac" as const,
  },
  {
    icon: "shield" as const,
    titleFr: "Cliniques",
    titleEn: "Medical & dental clinics",
    body: "Gamme sans parfum, programme de désinfection des points de contact, et fiches signalétiques accessibles sur place comme l'exige le SIMDUT.",
    tone: "mint" as const,
  },
  {
    icon: "home" as const,
    titleFr: "Familles",
    titleEn: "Families",
    body: "Foyers avec de jeunes enfants ou des sensibilités respiratoires. Formulations à faible COV et filtration HEPA à chaque visite.",
    tone: "orchid" as const,
  },
];

export const faqs = [
  {
    q: "Vos produits sont-ils vraiment certifiés ?",
    qEn: "Are your products genuinely certified?",
    a: "Oui, et nous pouvons le prouver. Chaque produit porte la certification UL ECOLOGO, Green Seal ou une certification tierce reconnue équivalente. Le certificat et la fiche signalétique de chaque produit se trouvent dans notre cartable de conformité, sur papier et dans le nuage. Demandez-le : nous le remettons volontiers avant toute visite.",
  },
  {
    q: "Servez-vous la clientèle en français ?",
    qEn: "Do you serve clients in French?",
    a: "Le français d'abord. Nos devis, nos factures, notre boîte vocale et notre site mènent en français, avec l'anglais à côté. Vous choisissez votre langue à la première prise de contact et nous nous y tenons pour toute la durée du contrat.",
  },
  {
    q: "Pourquoi facturez-vous un prix fixe plutôt qu'à l'heure ?",
    qEn: "Why flat rates instead of hourly?",
    a: "Parce que le tarif horaire vous invite à surveiller l'horloge. Un prix fixe nous récompense d'être efficaces et vous garantit le montant avant que quiconque entre chez vous. Si la tâche prend plus de temps que prévu, c'est notre problème, pas le vôtre. Facturation minimale de 150 $ par visite.",
  },
  {
    q: "Pourquoi dois-je commencer par un grand ménage ?",
    qEn: "Why must I start with a deep clean?",
    a: "Tout nouveau contrat récurrent commence par un grand ménage payant, sans exception. Reprendre l'accumulation laissée par quelqu'un d'autre au tarif d'entretien courant mène à un mauvais résultat pour vous et à une perte pour nous. Une seule visite remet le compteur à zéro.",
  },
  {
    q: "Que se passe-t-il si le résultat ne me convient pas ?",
    qEn: "What if I am not happy with the result?",
    a: "Dites-le-nous dans les 48 heures et nous revenons gratuitement. Aucun formulaire, aucune négociation. Pendant notre première année, le propriétaire se déplace lui-même pour chaque reprise.",
  },
  {
    q: "Êtes-vous assurés ?",
    qEn: "Are you insured?",
    a: "Assurance responsabilité civile générale de 2 M$, cautionnement d'entretien ménager attendu par la clientèle commerciale, et assurance automobile commerciale. Nous sommes inscrits auprès de Travail sécuritaire NB et notre personnel reçoit la formation SIMDUT à l'embauche, avec mise à jour annuelle.",
  },
];
