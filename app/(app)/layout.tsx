import { auth } from "@/lib/auth";
import AuthenticatedLayout from "@/components/layout/authenticated-layout";
import { TopNav } from "@/components/nav/top-nav";
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/prijava");
  }

  const user = session.user;

  return (
    <AuthenticatedLayout
      user={{
        displayName: user.displayName || user.name || "Korisnik",
        avatarUrl: user.image || null,
      }}
    >
      {children}
    </AuthenticatedLayout>
  );
}
