"use client";

import { useSession } from "next-auth/react";
import AuthenticatedLayout from "@/components/layout/authenticated-layout";
import { TopNav } from "@/components/nav/top-nav";

export default function KnowledgeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <>
        <TopNav />
        <main>{children}</main>
      </>
    );
  }

  if (session?.user) {
    const user = session.user;
    return (
      <AuthenticatedLayout
        user={{
          displayName: (user as any).displayName || user.name || "Korisnik",
          avatarUrl: user.image || null,
        }}
      >
        {children}
      </AuthenticatedLayout>
    );
  }

  return (
    <>
      <TopNav />
      <main>{children}</main>
    </>
  );
}
