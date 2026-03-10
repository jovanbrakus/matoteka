"use client";

import { useEffect, useState } from "react";
import { BarChart3, Users, BookOpen, Settings } from "lucide-react";

export default function AdminPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/analytics").then((r) => r.json()).then(setStats).catch(() => {});
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-text">
        <Settings className="mr-2 inline" size={28} />
        Admin Dashboard
      </h1>

      {stats && (
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <Users className="mb-2 text-[#60a5fa]" size={20} />
            <div className="text-2xl font-bold text-text">{stats.totalUsers}</div>
            <div className="text-xs text-text-secondary">Korisnika</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <BookOpen className="mb-2 text-[#a78bfa]" size={20} />
            <div className="text-2xl font-bold text-text">{stats.totalProblems}</div>
            <div className="text-xs text-text-secondary">Zadataka</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <BarChart3 className="mb-2 text-[#4ade80]" size={20} />
            <div className="text-2xl font-bold text-text">{stats.totalExams}</div>
            <div className="text-xs text-text-secondary">Ispita ukupno</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <BarChart3 className="mb-2 text-[#f472b6]" size={20} />
            <div className="text-2xl font-bold text-text">{stats.totalAiSolutions}</div>
            <div className="text-xs text-text-secondary">AI rešenja</div>
          </div>
        </div>
      )}

      <p className="text-text-secondary">Detaljniji admin panel dolazi u sledećoj verziji.</p>
    </div>
  );
}
