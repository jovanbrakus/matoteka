import { auth } from "@/lib/auth";
import LandingHero from "@/components/landing/landing-hero";
import Dashboard from "@/components/dashboard/dashboard";

export default async function HomePage() {
  const session = await auth();

  if (session?.user) {
    const user = session.user as any;
    return (
      <Dashboard
        user={{
          displayName: user.displayName || user.name || "Korisnik",
          email: user.email || "",
          targetFaculty: user.targetFaculty || null,
          role: user.role || "student",
        }}
      />
    );
  }

  return <LandingHero />;
}
