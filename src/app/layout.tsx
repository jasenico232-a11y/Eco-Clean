import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { MotionProvider } from "@/components/motion/MotionProvider";
import { BubbleProvider } from "@/components/bubbles/BubbleProvider";
import { LanguageProvider } from "@/lib/i18n";
import { BubbleField } from "@/components/bubbles/BubbleField";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/lib/site";

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const heading = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline.fr}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  // Keywords stay compliant: no unqualified "eco-friendly" or "non-toxic".
  keywords: [
    "nettoyage Dieppe",
    "ménage Dieppe Nouveau-Brunswick",
    "entretien ménager Moncton",
    "nettoyage certifié ECOLOGO",
    "nettoyage commercial garderie clinique",
    "cleaning services Dieppe NB",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "fr_CA",
    alternateLocale: "en_CA",
    title: `${site.name} — ${site.tagline.fr}`,
    description: site.positioning.fr,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline.fr}`,
    description: site.positioning.fr,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#8e6bf2",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  additionalType: "https://schema.org/ProfessionalService",
  name: site.name,
  description: site.positioning.fr,
  telephone: site.phone,
  email: site.email,
  url: site.url,
  // Mobile service business: an area served, not a storefront address.
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dieppe",
    addressRegion: "NB",
    addressCountry: "CA",
  },
  areaServed: ["Dieppe, NB", "Moncton, NB", "Riverview, NB"].map((name) => ({
    "@type": "City",
    name,
  })),
  availableLanguage: [
    { "@type": "Language", name: "French" },
    { "@type": "Language", name: "English" },
  ],
  openingHours: "Mo-Sa 07:00-19:00",
  currenciesAccepted: "CAD",
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr-CA" className={`${body.variable} ${heading.variable}`}>
      <body className="min-h-dvh antialiased">
        <script
          type="application/ld+json"
          // Static, author-controlled payload — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>
        <MotionProvider>
        <BubbleProvider>
          <BubbleField />
          <Header />
          <main id="main" className="relative z-10">
            {children}
          </main>
          <Footer />
        </BubbleProvider>
        </MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
