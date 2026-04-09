import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createMetadata({
    title: "Lekcije — Matoteka",
    description:
      "Interaktivne lekcije iz matematike za pripremu prijemnog ispita. Teorija, primeri i objašnjenja.",
    path: "/znanje",
    keywords: [
      "lekcije matematike",
      "priprema za prijemni",
      "interaktivne lekcije",
      "matoteka znanje",
    ],
  }),
};

export default function ZnanjeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
