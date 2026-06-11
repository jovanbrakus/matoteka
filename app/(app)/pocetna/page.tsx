import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Dashboard from "@/components/dashboard/dashboard";
import { getDashboardData } from "@/lib/dashboard-data";
import { createNoIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = createNoIndexMetadata({
  title: "Početna — Matoteka",
  description: "Tvoj pregled napretka i preporuke za vežbanje.",
});

// Signed-in visitors land here via the proxy rewrite of "/" (see proxy.ts),
// so the URL they see stays matoteka.com.
export default async function PocetnaPage() {
  const session = await auth();

  // The (app) layout also redirects, but layouts and pages render in
  // parallel — the page needs its own guard before touching session.user.
  if (!session?.user) {
    redirect("/prijava");
  }

  const user = session.user;
  const initialData = await getDashboardData(user.id);

  return (
    <Dashboard
      user={{
        displayName: user.displayName || user.name || "Korisnik",
        email: user.email || "",
        avatarUrl: user.image || null,
        targetFaculties: (user.targetFaculties as string[]) || [],
        role: user.role || "student",
      }}
      initialData={initialData}
    />
  );
}
