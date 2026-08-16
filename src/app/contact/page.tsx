import type { Metadata } from "next";
import { ContactContent } from "./content";

/**
 * Server shell. The page body is a client component (it needs the language
 * context), and client components cannot export `metadata` — so the metadata
 * lives here. It is authored in French, the served language.
 */
export const metadata: Metadata = {
  title: "Contact et soumission",
  description:
    "Demandez une soumission ou posez-nous une question. Prix fixe écrit en moins de deux heures ouvrables, en français ou en anglais.",
};

export default function Page() {
  return <ContactContent />;
}
