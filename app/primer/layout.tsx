import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Primer zadatka — Matoteka",
  description:
    "Pogledaj kako izgleda rešen zadatak sa prijemnog ispita. Mašinski fakultet 2021, zadatak #2.",
};

export default function PrimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
