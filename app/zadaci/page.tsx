"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Search, Filter, BookOpen } from "lucide-react";

interface Problem {
  id: string;
  slug: string;
  title: string;
  facultyId: string;
  year: number;
  problemNumber: number;
  difficulty: string | null;
}

const FACULTY_LABELS: Record<string, string> = {
  etf: "ETF",
  fon: "FON",
  rgf: "RGF",
  matf: "MATF",
  masf: "MAŠF",
  grf: "GRF",
  tmf: "TMF",
  sf: "SF",
  ff: "FF",
};

const FACULTY_COLORS: Record<string, string> = {
  etf: "#60a5fa",
  fon: "#a78bfa",
  rgf: "#f472b6",
  matf: "#4ade80",
  masf: "#fbbf24",
};

export default function ProblemsPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [faculty, setFaculty] = useState("");
  const [year, setYear] = useState("");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const fetchProblems = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: "30" });
    if (faculty) params.set("faculty", faculty);
    if (year) params.set("year", year);
    if (search) params.set("search", search);

    const res = await fetch(`/api/problems?${params}`);
    const data = await res.json();
    setProblems(data.problems || []);
    setTotal(data.total || 0);
    setLoading(false);
  }, [page, faculty, year, search]);

  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);

  const years = Array.from({ length: 2025 - 2003 + 1 }, (_, i) => 2025 - i);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-text">
        <BookOpen className="mr-2 inline" size={28} />
        Zadaci
      </h1>

      {/* Filter bar */}
      <div className="mb-6 rounded-xl border border-border bg-card p-4">
        <div className="flex flex-wrap gap-3">
          <select
            value={faculty}
            onChange={(e) => { setFaculty(e.target.value); setPage(1); }}
            className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text"
          >
            <option value="">Svi fakulteti</option>
            {Object.entries(FACULTY_LABELS).map(([id, label]) => (
              <option key={id} value={id}>{label}</option>
            ))}
          </select>

          <select
            value={year}
            onChange={(e) => { setYear(e.target.value); setPage(1); }}
            className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-text"
          >
            <option value="">Sve godine</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          <form
            className="flex flex-1 gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              setSearch(searchInput);
              setPage(1);
            }}
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 text-muted" size={16} />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Pretraži zadatke..."
                className="w-full rounded-lg border border-border bg-bg py-2 pl-9 pr-3 text-sm text-text outline-none focus:border-[#60a5fa]"
              />
            </div>
          </form>
        </div>
        <p className="mt-3 text-sm text-text-secondary">Prikazano: {total} zadataka</p>
      </div>

      {/* Problem grid */}
      {loading ? (
        <div className="py-20 text-center text-text-secondary">Učitavanje...</div>
      ) : problems.length === 0 ? (
        <div className="py-20 text-center text-text-secondary">Nema pronađenih zadataka.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((p) => (
              <Link
                key={p.id}
                href={`/zadaci/${p.slug}`}
                className="group rounded-xl border border-border bg-card p-5 transition hover:border-[#60a5fa]/50"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                    style={{
                      color: FACULTY_COLORS[p.facultyId] || "#60a5fa",
                      backgroundColor: `${FACULTY_COLORS[p.facultyId] || "#60a5fa"}20`,
                    }}
                  >
                    {FACULTY_LABELS[p.facultyId] || p.facultyId.toUpperCase()}
                  </span>
                  <span className="text-xs text-text-secondary">{p.year}</span>
                </div>
                <h3 className="mb-2 line-clamp-2 text-sm font-medium text-text group-hover:text-[#60a5fa]">
                  {p.title}
                </h3>
                <p className="text-xs text-muted">Zadatak #{p.problemNumber}</p>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {total > 30 && (
            <div className="mt-8 flex justify-center gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="rounded-lg border border-border px-4 py-2 text-sm text-text-secondary disabled:opacity-50"
              >
                Prethodna
              </button>
              <span className="flex items-center px-4 text-sm text-text-secondary">
                Strana {page} od {Math.ceil(total / 30)}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= Math.ceil(total / 30)}
                className="rounded-lg border border-border px-4 py-2 text-sm text-text-secondary disabled:opacity-50"
              >
                Sledeća
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
