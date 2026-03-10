"use client";

import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<any[]>([]);
  const [myRank, setMyRank] = useState<any>(null);

  useEffect(() => {
    fetch("/api/leaderboard").then((r) => r.json()).then(setEntries);
    fetch("/api/leaderboard/me").then((r) => r.json()).then(setMyRank).catch(() => {});
  }, []);

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-text">
        <Trophy className="mr-2 inline text-[#fbbf24]" size={28} />
        Rang lista
      </h1>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-text-secondary">
              <th className="px-4 py-3 w-12">#</th>
              <th className="px-4 py-3">Korisnik</th>
              <th className="px-4 py-3 text-right">Bodovi</th>
              <th className="hidden px-4 py-3 text-right sm:table-cell">Zadaci</th>
              <th className="hidden px-4 py-3 text-right sm:table-cell">Ispiti</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e, i) => (
              <tr
                key={e.userId}
                className={`border-b border-border/50 ${
                  myRank?.userId === e.userId ? "bg-[#60a5fa]/10" : ""
                }`}
              >
                <td className="px-4 py-3 text-text">
                  {i < 3 ? medals[i] : i + 1}
                </td>
                <td className="px-4 py-3 font-medium text-text">
                  {myRank?.userId === e.userId && "★ "}
                  {e.displayName}
                </td>
                <td className="px-4 py-3 text-right font-mono text-[#60a5fa]">
                  {parseFloat(e.totalScore).toLocaleString()}
                </td>
                <td className="hidden px-4 py-3 text-right text-text-secondary sm:table-cell">
                  {e.problemsSolved}
                </td>
                <td className="hidden px-4 py-3 text-right text-text-secondary sm:table-cell">
                  {e.examsCompleted}
                </td>
              </tr>
            ))}
            {entries.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-text-secondary">
                  Rang lista je prazna. Budi prvi!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {myRank?.rank && !entries.find((e: any) => e.userId === myRank.userId) && (
        <div className="mt-4 rounded-xl border border-[#60a5fa]/30 bg-[#60a5fa]/10 p-4 text-sm">
          <span className="text-text-secondary">Tvoja pozicija: </span>
          <span className="font-bold text-[#60a5fa]">#{myRank.rank}</span>
          <span className="ml-2 text-text-secondary">({parseFloat(myRank.totalScore).toLocaleString()} bodova)</span>
        </div>
      )}
    </div>
  );
}
