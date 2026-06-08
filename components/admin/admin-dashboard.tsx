"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import DailyTrendChart, { type DailyPoint } from "@/components/admin/daily-trend-chart";

interface Analytics {
  totalUsers: number;
  totalProblems: number;
  totalExams: number;
  activeUsersToday: number;
  newUsersThisWeek: number;
  registrationsByDay: DailyPoint[];
  viewsByDay: DailyPoint[];
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
  hasGoogle: boolean;
  hasPassword: boolean;
}

function GoogleGIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

export default function AdminDashboard() {
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  async function toggleActive(user: UserRow) {
    const action = user.isActive ? "onemogućiti" : "omogućiti";
    if (!confirm(`Da li želite da ${action} nalog ${user.email}?`)) return;
    setTogglingId(user.id);
    try {
      const res = await fetch(`/api/admin/users/${user.id}/toggle-active`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data?.error || "Greška pri menjanju statusa.");
        return;
      }
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, isActive: data.isActive } : u))
      );
    } catch {
      alert("Greška pri menjanju statusa.");
    } finally {
      setTogglingId(null);
    }
  }

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
        <div className="mb-8 grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-5">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-2xl bg-[var(--tint)]" />
          ))}
        </div>
        <div className="mb-8 grid gap-4 lg:grid-cols-2">
          {[0, 1].map((i) => (
            <div key={i} className="h-72 animate-pulse rounded-2xl bg-[var(--tint)]" />
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
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
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

      {/* Daily trends */}
      <div className="mb-8 grid gap-4 lg:grid-cols-2">
        <DailyTrendChart
          title="Nove registracije"
          icon="person_add"
          data={analytics?.registrationsByDay ?? []}
          color="#ec5b13"
        />
        <DailyTrendChart
          title="Pregledi rešenja"
          icon="visibility"
          data={analytics?.viewsByDay ?? []}
          color="#0ea5e9"
        />
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
        <Link
          href="/admin/anketa"
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--tint)] px-5 py-3 text-sm font-bold text-text-secondary hover:bg-[#ec5b13]/10 hover:text-[#ec5b13] transition-colors"
        >
          <span className="material-symbols-outlined text-base">poll</span>
          Anketa
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
                  Tip
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
                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-[#ec5b13]/60 text-center">
                  Akcije
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
                  <td className="px-6 py-4">
                    <div
                      className="flex items-center justify-center gap-1.5"
                      title={
                        u.hasGoogle && u.hasPassword
                          ? "Google i lozinka"
                          : u.hasGoogle
                          ? "Google"
                          : u.hasPassword
                          ? "Lozinka"
                          : "—"
                      }
                    >
                      {u.hasGoogle && <GoogleGIcon className="h-4 w-4" />}
                      {u.hasGoogle && u.hasPassword && (
                        <span className="text-xs text-text-secondary">&</span>
                      )}
                      {u.hasPassword && (
                        <span className="material-symbols-outlined text-base text-text-secondary">
                          key
                        </span>
                      )}
                      {!u.hasGoogle && !u.hasPassword && (
                        <span className="text-muted">—</span>
                      )}
                    </div>
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
                  <td className="px-6 py-4 text-center">
                    {u.role === "admin" || u.id === currentUserId ? (
                      <span className="text-xs text-muted">—</span>
                    ) : (
                      <button
                        onClick={() => toggleActive(u)}
                        disabled={togglingId === u.id}
                        className={`inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-bold transition-colors disabled:opacity-50 ${
                          u.isActive
                            ? "border-red-500/30 bg-red-500/10 text-red-600 hover:bg-red-500/20"
                            : "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {u.isActive ? "block" : "check_circle"}
                        </span>
                        {togglingId === u.id
                          ? "..."
                          : u.isActive
                          ? "Onemogući"
                          : "Omogući"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-text-secondary">
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
