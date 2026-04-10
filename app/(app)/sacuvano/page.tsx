import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { bookmarks } from "@/drizzle/schema";
import { eq, desc } from "drizzle-orm";
import { redirect } from "next/navigation";
import { generateBookmarkToken } from "@/lib/utils/bookmark-token";
import { Bookmark } from "lucide-react";
import Link from "next/link";

export default async function SacuvanoPage() {
  const session = await auth();
  if (!session?.user) redirect("/prijava");

  const userId = session.user.id;

  const rows = await db
    .select({ problemId: bookmarks.problemId })
    .from(bookmarks)
    .where(eq(bookmarks.userId, userId))
    .orderBy(desc(bookmarks.createdAt))
    .limit(1);

  if (rows.length > 0) {
    const firstToken = generateBookmarkToken(userId, rows[0].problemId);
    redirect(`/sacuvano/${firstToken}`);
  }

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-8">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--tint)]">
        <Bookmark size={36} className="text-muted" />
      </div>
      <h2 className="text-2xl font-black tracking-tight text-heading">
        Nema sačuvanih zadataka
      </h2>
      <p className="max-w-md text-center text-sm text-text-secondary">
        Klikni &quot;Sačuvaj&quot; na bilo kom zadatku tokom vežbanja da ga
        dodaš ovde za kasnije.
      </p>
      <Link
        href="/zadaci"
        className="mt-2 rounded-xl bg-primary px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition-all hover:brightness-110"
      >
        Kreni da vežbaš
      </Link>
    </div>
  );
}
