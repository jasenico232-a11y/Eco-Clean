import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { MotionProvider } from "@/components/motion/MotionProvider";
import { BubbleProvider } from "@/components/bubbles/BubbleProvider";
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
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "eco friendly cleaning",
    "green cleaning service",
    "house cleaning",
    "commercial cleaning",
    "deep cleaning",
    "non-toxic cleaning",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
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
  "@type": "LocalBusiness",
  name: site.name,
  description: site.description,
  telephone: site.phone,
  email: site.email,
  url: site.url,
  address: {
    "@type": "PostalAddress",
    streetAddress: "657 Twin Lakes Drive",
    addressLocality: "Reno",
    addressRegion: "NV",
    postalCode: "89523",
    addressCountry: "US",
  },
  openingHours: "Mo-Sa 07:00-19:00",
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${body.variable} ${heading.variable}`}>
      <body className="min-h-dvh antialiased">
        <script
          type="application/ld+json"
          // Static, author-controlled payload — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
      </body>
    </html>
  );
}
