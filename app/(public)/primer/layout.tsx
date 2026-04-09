import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createMetadata({
    title: "Primer zadatka — Matoteka",
    description:
      "Pogledaj kako izgleda rešen zadatak sa prijemnog ispita. Mašinski fakultet 2021, zadatak #2.",
    path: "/primer",
  }),
};

export default function PrimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
