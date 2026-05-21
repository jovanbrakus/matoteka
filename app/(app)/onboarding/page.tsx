import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/drizzle/schema";
import OnboardingFlow from "./onboarding-flow";

export const metadata = {
  title: "Dobrodošli — Matoteka",
};

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ replay?: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/prijava");

  const { replay } = await searchParams;

  // Fresh DB lookup — the JWT cookie may lag behind the actual `onboarded_at`
  // immediately after the user submits the flow. Trust the database. The proxy
  // also does a DB fallback so /vezba won't bounce back when we redirect.
  const rows = await db
    .select({
      onboardedAt: users.onboardedAt,
      targetFaculties: users.targetFaculties,
    })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);

  const fresh = rows[0];
  // If the user is already onboarded, send them to /vezba — UNLESS they're
  // intentionally replaying the tour via /onboarding?replay=1.
  if (fresh?.onboardedAt && !replay) {
    redirect("/vezba");
  }

  const initialFaculties = (fresh?.targetFaculties as string[] | null) ?? [];

  return (
    <OnboardingFlow
      initialFaculties={initialFaculties}
      alreadyOnboarded={!!fresh?.onboardedAt}
    />
  );
}
