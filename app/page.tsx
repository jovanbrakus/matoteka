import { auth } from "@/lib/auth";
import LandingHero from "@/components/landing/landing-hero";
import Dashboard from "@/components/dashboard/dashboard";
import AuthenticatedLayout from "@/components/layout/authenticated-layout";
import { TopNav } from "@/components/nav/top-nav";
import { getDashboardData } from "@/lib/dashboard-data";

export default async function HomePage() {
  const session = await auth();

  if (session?.user) {
    const user = session.user;
    const initialData = await getDashboardData(user.id);
    return (
      <AuthenticatedLayout
        user={{
          displayName: user.displayName || user.name || "Korisnik",
          avatarUrl: user.image || null,
        }}
      >
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
      </AuthenticatedLayout>
    );
  }

  return (
    <>
      <TopNav />
      <main><LandingHero /></main>
    </>
  );
}
