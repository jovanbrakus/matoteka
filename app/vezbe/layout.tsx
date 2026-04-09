import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { createNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = createNoIndexMetadata({
  title: "Pregled zadataka — Matoteka",
  description: "Administratorski pregled zadataka i baze problema.",
});

export default async function VezbeLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    redirect("/");
  }
  return <>{children}</>;
}
