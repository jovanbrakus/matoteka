import type { Metadata } from "next";
import { createNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = createNoIndexMetadata({
  title: "Profil — Matoteka",
  description:
    "Upravljaj svojim profilom, podesi ciljeve i odaberi fakultete za pripremu.",
});

export default function ProfilLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
