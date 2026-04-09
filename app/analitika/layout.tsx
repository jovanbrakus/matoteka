import type { Metadata } from "next";
import { createNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = createNoIndexMetadata({
  title: "Analitika — Matoteka",
  description:
    "Prati svoj napredak, analiziraj rezultate i identifikuj oblasti za poboljšanje.",
});

export default function AnalitikaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
