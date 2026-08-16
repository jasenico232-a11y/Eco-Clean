import type { Metadata } from "next";
import { ServicesContent } from "./content";

/**
 * Server shell. The page body is a client component (it needs the language
 * context), and client components cannot export `metadata` — so the metadata
 * lives here. It is authored in French, the served language.
 */
export const metadata: Metadata = {
  title: "Services et tarifs",
  description:
    "Ménage récurrent, grand ménage, déménagement, location court terme, après-construction et entretien commercial. Prix fixes en dollars canadiens, produits certifiés ECOLOGO et Green Seal.",
};

export default function Page() {
  return <ServicesContent />;
}
