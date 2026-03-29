"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

type Tab = "views" | "daily";

interface ViewRow {
  id: string;
  userId: string;
  problemId: string;
  viewedAt: string;
  ipAddress: string | null;
  displayName: string;
  email: string;
}

interface DailyRow {
  userId: string;
  date: string;
  count: number;
  displayName: string;
  email: string;
}

export default function SolutionViewsPage() {
  const [tab, setTab] = useState<Tab>("daily");
  const [rows, setRows] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ tab, page: String(page) });
    if (search) params.set("search", search);
    if (dateFrom) params.set("from", dateFrom);
    if (dateTo) params.set("to", dateTo);

    const res = await fetch(`/api/admin/solution-views?${params}`);
    const data = await res.json();
    setRows(data.rows ?? []);
    setTotal(data.total ?? 0);
    setLoading(false);
  }, [tab, page, search, dateFrom, dateTo]);

  useEffect(() => {
    setPage(1);
  }, [tab, search, dateFrom, dateTo]);

  useEffect(() => {
    const timeout = setTimeout(fetchData, 300);
    return () => clearTimeout(timeout);
  }, [fetchData]);

  const totalPages = Math.ceil(total / 50);

  return (
    <div className="p-8">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <Link
            href="/admin"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--tint)] hover:bg-[#ec5b13]/10 transition-colors"
          >
            <span className="material-symbols-outlined text-lg text-text-secondary">
              arrow_back
            </span>
          </Link>
          <h1 className="text-3xl font-black tracking-tight text-heading">
            Pregledi resenja
          </h1>
          <span className="rounded-full bg-[var(--tint)] px-3 py-1 text-xs font-bold text-text-secondary">
            {total}
          </span>
        </div>
        <p className="text-sm text-text-secondary ml-11">
          Pracenje pristupa resenjima i dnevni limiti
        </p>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { id: "daily" as Tab, label: "Dnevni limiti", icon: "bar_chart" },
          { id: "views" as Tab, label: "Audit log", icon: "list_alt" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-colors ${
              tab === t.id
                ? "bg-[#ec5b13] text-white"
                : "bg-[var(--tint)] text-text-secondary hover:bg-[#ec5b13]/10"
            }`}
          >
            <span className="material-symbols-outlined text-base">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pretrazi po korisniku, emailu ili ID zadatka..."
          className="w-80 rounded-xl border border-border bg-card px-4 py-2 text-sm text-heading outline-none transition placeholder:text-muted focus:border-[#ec5b13] focus:ring-1 focus:ring-[#ec5b13]/30"
        />
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="rounded-xl border border-border bg-card px-4 py-2 text-sm text-heading outline-none transition focus:border-[#ec5b13] focus:ring-1 focus:ring-[#ec5b13]/30"
        />
        <span className="flex items-center text-sm text-text-secondary">—</span>
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="rounded-xl border border-border bg-card px-4 py-2 text-sm text-heading outline-none transition focus:border-[#ec5b13] focus:ring-1 focus:ring-[#ec5b13]/30"
        />
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        {loading ? (
          <div className="h-96 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#ec5b13] border-t-transparent" />
          </div>
        ) : tab === "daily" ? (
          <DailyTable rows={rows as DailyRow[]} />
        ) : (
          <ViewsTable rows={rows as ViewRow[]} />
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 px-2">
          <p className="text-sm text-text-secondary">
            Strana {page} od {totalPages} ({total} ukupno)
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg px-3 py-1.5 text-sm font-bold bg-[var(--tint)] text-text-secondary hover:bg-[#ec5b13]/10 disabled:opacity-30 transition-colors"
            >
              Prethodna
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-lg px-3 py-1.5 text-sm font-bold bg-[var(--tint)] text-text-secondary hover:bg-[#ec5b13]/10 disabled:opacity-30 transition-colors"
            >
              Sledeca
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function DailyTable({ rows }: { rows: DailyRow[] }) {
  return (
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
              Datum
            </th>
            <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-[#ec5b13]/60 text-center">
              Pregleda
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#ec5b13]/5">
          {rows.map((r, i) => (
            <tr key={`${r.userId}-${r.date}-${i}`} className="hover:bg-[#ec5b13]/5 transition-colors">
              <td className="px-6 py-3 font-bold text-heading text-sm">{r.displayName}</td>
              <td className="px-6 py-3 text-sm text-text-secondary">{r.email}</td>
              <td className="px-6 py-3 text-sm text-text-secondary text-center">
                {new Date(r.date).toLocaleDateString("sr-Latn-RS")}
              </td>
              <td className="px-6 py-3 text-center">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
                    r.count >= 25
                      ? "bg-red-500/10 text-red-500 border border-red-500/20"
                      : r.count >= 15
                        ? "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                        : "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                  }`}
                >
                  {r.count}/30
                </span>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={4} className="px-6 py-12 text-center text-text-secondary">
                Nema podataka za izabrane filtere.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function ViewsTable({ rows }: { rows: ViewRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[var(--tint)] border-b border-[#ec5b13]/10">
            <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-[#ec5b13]/60">
              Korisnik
            </th>
            <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-[#ec5b13]/60">
              ID zadatka
            </th>
            <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-[#ec5b13]/60">
              Vreme
            </th>
            <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-[#ec5b13]/60">
              IP adresa
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#ec5b13]/5">
          {rows.map((r) => (
            <tr key={r.id} className="hover:bg-[#ec5b13]/5 transition-colors">
              <td className="px-6 py-3">
                <div>
                  <span className="font-bold text-heading text-sm">{r.displayName}</span>
                  <p className="text-xs text-text-secondary">{r.email}</p>
                </div>
              </td>
              <td className="px-6 py-3 text-sm font-mono text-text-secondary">{r.problemId}</td>
              <td className="px-6 py-3 text-sm text-text-secondary">
                {new Date(r.viewedAt).toLocaleString("sr-Latn-RS", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td className="px-6 py-3 text-sm font-mono text-text-secondary">
                {r.ipAddress ?? "—"}
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={4} className="px-6 py-12 text-center text-text-secondary">
                Nema podataka za izabrane filtere.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
