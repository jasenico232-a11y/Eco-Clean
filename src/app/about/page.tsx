import type { Metadata } from "next";
import { AboutContent } from "./content";

/**
 * Server shell. The page body is a client component (it needs the language
 * context), and client components cannot export `metadata` — so the metadata
 * lives here. It is authored in French, the served language.
 */
export const metadata: Metadata = {
  title: "À propos",
  description:
    "Eco-Clean est une entreprise de nettoyage de Dieppe qui sert d'abord en français, avec des produits certifiés UL ECOLOGO et Green Seal, et des certificats vérifiables sur demande.",
};

export default function Page() {
  return <AboutContent />;
}
