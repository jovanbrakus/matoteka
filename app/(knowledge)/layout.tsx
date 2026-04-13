import { auth } from "@/lib/auth";
import AuthenticatedLayout from "@/components/layout/authenticated-layout";
import { TopNav } from "@/components/nav/top-nav";

export default async function KnowledgeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) {
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

  return (
    <>
      <TopNav />
      <main>{children}</main>
    </>
  );
}
