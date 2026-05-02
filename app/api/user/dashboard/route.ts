import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { getDashboardData } from "@/lib/dashboard-data";

export async function GET() {
  const session = await auth();
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await getDashboardData(session.user.id);
  return NextResponse.json(data);
}
