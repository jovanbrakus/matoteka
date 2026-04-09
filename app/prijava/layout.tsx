import type { Metadata } from "next";
import { createNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = createNoIndexMetadata({
  title: "Prijava — Matoteka",
  description: "Prijavite se na Matoteka nalog da nastavite sa pripremom i pratite svoj napredak.",
});

export default function PrijavaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
