"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Analytics {
  totalUsers: number;
  totalProblems: number;
  totalExams: number;
  totalAiSolutions: number;
  activeUsersToday: number;
  newUsersThisWeek: number;
}

interface UserRow {
  id: string;
  email: string;
  displayName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  lastActiveDate: string | null;
  streakCurrent: number;
  avatarUrl: string | null;
}

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/analytics").then((r) => r.json()),
      fetch("/api/admin/users").then((r) => r.json()),
    ])
      .then(([a, u]) => {
        setAnalytics(a);
        setUsers(u.users);
        setTotalUsers(u.total);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading) return;
    const timeout = setTimeout(() => {
      fetch(`/api/admin/users?search=${encodeURIComponent(search)}`)
        .then((r) => r.json())
        .then((u) => {
          setUsers(u.users);
          setTotalUsers(u.total);
        });
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, loading]);

  if (loading) {
    return (
      <div className="p-8">
        <div className="mb-10 h-12 w-80 animate-pulse rounded-lg bg-[var(--tint)]" />
        <div className="mb-8 grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-6">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-2xl bg-[var(--tint)]" />
          ))}
        </div>
        <div className="h-10 w-64 mb-4 animate-pulse rounded-xl bg-[var(--tint)]" />
        <div className="h-96 animate-pulse rounded-2xl bg-[var(--tint)]" />
      </div>
    );
  }

  const statCards = [
    { label: "Korisnici", value: analytics?.totalUsers ?? 0, icon: "group", accent: true },
    { label: "Zadaci", value: analytics?.totalProblems ?? 0, icon: "menu_book", accent: false },
    { label: "Simulacije", value: analytics?.totalExams ?? 0, icon: "quiz", accent: false },
    { label: "AI rešenja", value: analytics?.totalAiSolutions ?? 0, icon: "smart_toy", accent: false },
    { label: "Aktivni danas", value: analytics?.activeUsersToday ?? 0, icon: "today", accent: false },
    { label: "Novi (7 dana)", value: analytics?.newUsersThisWeek ?? 0, icon: "person_add", accent: true },
  ];

  return (
    <div className="relative p-8">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-black tracking-tight text-heading mb-1">
          Admin kontrolna tabla
        </h1>
        <p className="text-sm text-text-secondary">
          Pregled platforme i upravljanje korisnicima
        </p>
      </header>

      {/* Analytics cards */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`glass-card rounded-2xl p-5 ${
              card.accent ? "border-l-4 border-[#ec5b13]" : ""
            }`}
          >
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ec5b13]/10">
                <span className="material-symbols-outlined text-lg text-[#ec5b13]">
                  {card.icon}
                </span>
              </div>
            </div>
            <p className="text-2xl font-black text-heading">{card.value.toLocaleString("sr-Latn")}</p>
            <p className="text-xs font-medium text-text-secondary">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div className="mb-8 flex flex-wrap gap-3">
        <Link
          href="/admin/solution-views"
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--tint)] px-5 py-3 text-sm font-bold text-text-secondary hover:bg-[#ec5b13]/10 hover:text-[#ec5b13] transition-colors"
        >
          <span className="material-symbols-outlined text-base">visibility</span>
          Pregledi resenja
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </Link>
        <Link
          href="/admin/comments"
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--tint)] px-5 py-3 text-sm font-bold text-text-secondary hover:bg-[#ec5b13]/10 hover:text-[#ec5b13] transition-colors"
        >
          <span className="material-symbols-outlined text-base">chat</span>
          Komentari
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </Link>
      </div>

      {/* User management */}
      <div className="glass-card rounded-2xl border-l-4 border-[#ec5b13] overflow-hidden">
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[22px] text-[#ec5b13]">
              manage_accounts
            </span>
            <h3 className="text-lg font-bold">Korisnici</h3>
            <span className="rounded-full bg-[var(--tint)] px-3 py-1 text-xs font-bold text-text-secondary">
              {totalUsers}
            </span>
          </div>
          <div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pretraži po imenu ili emailu..."
              className="w-64 rounded-xl border border-border bg-card px-4 py-2 text-sm text-heading outline-none transition placeholder:text-muted focus:border-[#ec5b13] focus:ring-1 focus:ring-[#ec5b13]/30"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--tint)] border-b border-[#ec5b13]/10">
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-[#ec5b13]/60">
                  Korisnik
                </th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-[#ec5b13]/60">
                  Email
                </th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-[#ec5b13]/60 text-center">
                  Uloga
                </th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-[#ec5b13]/60 text-center">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-[#ec5b13]/60 text-center">
                  Streak
                </th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-[#ec5b13]/60">
                  Poslednja aktivnost
                </th>
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-[#ec5b13]/60">
                  Registracija
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ec5b13]/5">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-[#ec5b13]/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full border border-[#ec5b13]/20">
                        {u.avatarUrl ? (
                          <img src={u.avatarUrl} alt={u.displayName} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-[#ec5b13]/10 text-xs font-bold text-[#ec5b13]">
                            {u.displayName.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <span className="font-bold text-heading">{u.displayName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{u.email}</td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold border ${
                        u.role === "admin"
                          ? "border-[#ec5b13]/20 bg-[#ec5b13]/10 text-[#ec5b13]"
                          : "border-[var(--glass-border)] bg-[var(--tint)] text-text-secondary"
                      }`}
                    >
                      {u.role === "admin" ? "Admin" : "Student"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex h-2.5 w-2.5 rounded-full ${
                        u.isActive ? "bg-emerald-500" : "bg-red-500"
                      }`}
                      title={u.isActive ? "Aktivan" : "Neaktivan"}
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    {u.streakCurrent > 0 ? (
                      <span className="font-bold text-[#ec5b13]">{u.streakCurrent}🔥</span>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">
                    {u.lastActiveDate
                      ? new Date(u.lastActiveDate).toLocaleDateString("sr-Latn-RS")
                      : "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">
                    {u.createdAt
                      ? new Date(u.createdAt).toLocaleDateString("sr-Latn-RS")
                      : "—"}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-text-secondary">
                    {search ? "Nema rezultata za pretragu." : "Nema korisnika."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
