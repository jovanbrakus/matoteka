"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";

interface CommentRow {
  id: string;
  userId: string;
  problemId: string;
  cardType: string;
  stepNumber: number | null;
  parentCommentId: string | null;
  kind: string;
  body: string;
  status: string;
  reportCount: number;
  createdAt: string;
  authorDisplayName: string;
}

const KIND_LABELS: Record<string, string> = {
  question: "Pitanje",
  suggestion: "Predlog",
  bug_report: "Greška",
};

const STATUS_LABELS: Record<string, string> = {
  open: "Otvoreno",
  resolved: "Rešeno",
  hidden: "Skriveno",
};

const KIND_COLORS: Record<string, string> = {
  question: "bg-blue-500/10 text-blue-500 border border-blue-500/20",
  suggestion: "bg-purple-500/10 text-purple-500 border border-purple-500/20",
  bug_report: "bg-red-500/10 text-red-500 border border-red-500/20",
};

const STATUS_COLORS: Record<string, string> = {
  open: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
  resolved: "bg-[var(--tint)] text-text-secondary border border-border",
  hidden: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
};

export default function AdminCommentsPage() {
  const [rows, setRows] = useState<CommentRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const requestIdRef = useRef(0);

  const fetchData = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: "50" });
    if (search) params.set("search", search);
    if (status) params.set("status", status);

    const res = await fetch(`/api/admin/comments?${params}`);
    const data = await res.json();
    if (requestId !== requestIdRef.current) return;
    setRows(data.comments ?? []);
    setTotal(data.total ?? 0);
    setLoading(false);
  }, [page, search, status]);

  useEffect(() => {
    setPage(1);
  }, [search, status]);

  useEffect(() => {
    const timeout = setTimeout(fetchData, 300);
    return () => clearTimeout(timeout);
  }, [fetchData]);

  const totalPages = Math.ceil(total / 50);

  return (
    <div className="p-8">
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
            Komentari
          </h1>
          <span className="rounded-full bg-[var(--tint)] px-3 py-1 text-xs font-bold text-text-secondary">
            {total}
          </span>
        </div>
        <p className="text-sm text-text-secondary ml-11">
          Svi komentari na karticama zadataka
        </p>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pretraži po autoru ili ID zadatka..."
          className="w-80 rounded-xl border border-border bg-card px-4 py-2 text-sm text-heading outline-none transition placeholder:text-muted focus:border-[#ec5b13] focus:ring-1 focus:ring-[#ec5b13]/30"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border border-border bg-card px-4 py-2 text-sm text-heading outline-none transition focus:border-[#ec5b13] focus:ring-1 focus:ring-[#ec5b13]/30"
        >
          <option value="">Svi statusi</option>
          <option value="open">Otvoreno</option>
          <option value="resolved">Rešeno</option>
          <option value="hidden">Skriveno</option>
        </select>
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        {loading ? (
          <div className="h-96 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#ec5b13] border-t-transparent" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--tint)] border-b border-[#ec5b13]/10">
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-[#ec5b13]/60">
                    Autor
                  </th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-[#ec5b13]/60">
                    Tip / Status
                  </th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-[#ec5b13]/60">
                    Zadatak
                  </th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-[#ec5b13]/60">
                    Kartica
                  </th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-[#ec5b13]/60">
                    Komentar
                  </th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-[#ec5b13]/60 text-center">
                    Prijave
                  </th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-[#ec5b13]/60">
                    Datum
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ec5b13]/5">
                {rows.map((r) => (
                  <tr key={r.id} className="hover:bg-[#ec5b13]/5 transition-colors">
                    <td className="px-6 py-3 text-sm font-bold text-heading whitespace-nowrap">
                      {r.authorDisplayName}
                      {r.parentCommentId && (
                        <span className="ml-1 text-xs font-normal text-text-secondary">
                          (odgovor)
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex flex-col gap-1">
                        <span
                          className={`inline-flex w-fit rounded-full px-2 py-0.5 text-xs font-bold ${KIND_COLORS[r.kind] ?? ""}`}
                        >
                          {KIND_LABELS[r.kind] ?? r.kind}
                        </span>
                        <span
                          className={`inline-flex w-fit rounded-full px-2 py-0.5 text-xs font-bold ${STATUS_COLORS[r.status] ?? ""}`}
                        >
                          {STATUS_LABELS[r.status] ?? r.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-sm font-mono whitespace-nowrap">
                      <Link
                        href={`/vezbe/${r.problemId}`}
                        className="text-[#ec5b13] underline decoration-[#ec5b13]/40 underline-offset-4 hover:decoration-[#ec5b13] transition-colors"
                      >
                        {r.problemId}
                      </Link>
                    </td>
                    <td className="px-6 py-3 text-xs text-text-secondary whitespace-nowrap">
                      {r.cardType}
                      {r.stepNumber != null && (
                        <span className="ml-1 text-muted">#{r.stepNumber}</span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-sm text-heading max-w-xs">
                      <span
                        className="block truncate"
                        title={r.body}
                      >
                        {r.body}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-center">
                      {r.reportCount > 0 ? (
                        <span className="inline-flex items-center rounded-full bg-red-500/10 border border-red-500/20 px-2 py-0.5 text-xs font-bold text-red-500">
                          {r.reportCount}
                        </span>
                      ) : (
                        <span className="text-sm text-muted">—</span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-sm text-text-secondary whitespace-nowrap">
                      {new Date(r.createdAt).toLocaleString("sr-Latn-RS", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-12 text-center text-text-secondary"
                    >
                      Nema komentara za izabrane filtere.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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
