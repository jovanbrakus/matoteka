import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import SurveyAdminClient from "./survey-admin-client";

export default async function SurveyAdminPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    redirect("/");
  }

  return <SurveyAdminClient />;
}
