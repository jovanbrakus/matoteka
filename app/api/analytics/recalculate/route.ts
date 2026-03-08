import { auth } from "@/lib/auth";
import { recalculateAnalytics } from "@/lib/analytics";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;

  try {
    await recalculateAnalytics(userId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics recalculation failed:", error);
    return NextResponse.json(
      { error: "Recalculation failed" },
      { status: 500 }
    );
  }
}
