"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark } from "lucide-react";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/bookmarks").then((r) => r.json()).then(setBookmarks);
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-text">
        <Bookmark className="mr-2 inline text-[#fbbf24]" size={28} />
        Sačuvani zadaci
      </h1>

      {bookmarks.length === 0 ? (
        <div className="py-20 text-center text-text-secondary">
          <p>Nemaš sačuvanih zadataka.</p>
          <Link href="/vezbe" className="mt-4 inline-block text-[#60a5fa] hover:underline">
            Pretraži zadatke
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {bookmarks.map((b) => (
            <Link
              key={b.id}
              href={`/vezbe/${b.id}`}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition hover:border-[#60a5fa]/50"
            >
              <div>
                <h3 className="text-sm font-medium text-text">{b.title}</h3>
                <p className="text-xs text-text-secondary">
                  {b.facultyId?.toUpperCase()} {b.year} · Zadatak #{b.problemNumber}
                </p>
              </div>
              <Bookmark size={16} className="text-[#fbbf24]" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
