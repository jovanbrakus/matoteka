import type { Metadata } from "next";
import { createNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = createNoIndexMetadata({
  title: "Simulacija ispita — Matoteka",
  description:
    "Simuliraj prijemni ispit iz matematike u realnim uslovima. Odaberi fakultet, vreme i broj zadataka.",
});

export default function SimulacijaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
