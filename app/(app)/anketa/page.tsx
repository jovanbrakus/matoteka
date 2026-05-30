import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/drizzle/schema";
import SurveyFlow from "./survey-flow";

export const metadata = {
  title: "Anketa — Matoteka",
};

export default async function SurveyPage({
  searchParams,
}: {
  searchParams: Promise<{ replay?: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/prijava");

  const { replay } = await searchParams;

  // Fresh DB lookup — authoritative. The page renders for ANY logged-in user so
  // the shareable link always works; the admin flag + 1-week rule only govern the
  // automatic redirect in proxy.ts, not access to this page.
  const rows = await db
    .select({ surveyCompletedAt: users.surveyCompletedAt })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);

  const fresh = rows[0];
  // Already answered or skipped — don't show again unless explicitly replaying.
  if (fresh?.surveyCompletedAt && !replay) {
    redirect("/vezba");
  }

  return <SurveyFlow />;
}
