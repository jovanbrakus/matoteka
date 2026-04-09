import type { Metadata } from "next";
import PracticeSolver from "@/components/practice/PracticeSolver";
import { createNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = createNoIndexMetadata({
  title: "Zadaci — Matoteka",
  description: "Rešavaj zadatke iz matematike za prijemni ispit.",
});

export default function ZadaciPage() {
  return <PracticeSolver />;
}
