"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Filter, BookOpen, XCircle } from "lucide-react";
import { MAJOR_CATEGORIES } from "@/lib/major-categories";

interface Problem {
  id: string;
  slug: string;
  title: string;
  facultyId: string;
  year: number;
  problemNumber: number;
  difficulty: string | null;
}

interface Topic {
  id: string;
  name: string;
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
  const searchParams = useSearchParams();
  const router = useRouter();
  const topic = searchParams?.get("topic") || "";
  const majorCategory = searchParams?.get("majorCategory") || "";

  const [topicName, setTopicName] = useState("");
  const [problems, setProblems] = useState<Problem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [faculty, setFaculty] = useState("");
  const [year, setYear] = useState("");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const updateFilterQuery = useCallback((updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams?.toString());

    for (const [key, value] of Object.entries(updates)) {
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }

    const query = params.toString();
    router.replace(query ? `/zadaci?${query}` : "/zadaci");
    setPage(1);
  }, [router, searchParams]);

  const clearOneFilter = useCallback(
    (key: "topic" | "majorCategory" | "faculty" | "year" | "search") => {
      const params = new URLSearchParams(searchParams?.toString());
      params.delete(key);

      if (key === "search") {
        setSearch("");
        setSearchInput("");
      }

      if (key === "majorCategory") {
        params.delete("topic");
      }

      if (key === "faculty") {
        if (majorCategory) {
          params.delete("majorCategory");
        }
      }

      const query = params.toString();
      router.replace(query ? `/zadaci?${query}` : "/zadaci");
      setPage(1);
    },
    [router, searchParams, majorCategory],
  );

  const fetchTopicLabel = useCallback(async () => {
    if (!topic) {
      setTopicName("");
      return;
    }

    try {
      const res = await fetch("/api/topics");
      if (!res.ok) return;
      const data: Topic[] = await res.json();
      const match = data.find((t) => t.id === topic);
      setTopicName(match?.name || "");
    } catch {
      setTopicName("");
    }
  }, [topic]);

  const fetchProblems = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: "30" });

    if (faculty) params.set("faculty", faculty);
    if (year) params.set("year", year);
    if (search) params.set("search", search);
    if (topic) params.set("topic", topic);
    if (majorCategory) params.set("majorCategory", majorCategory);

    const res = await fetch(`/api/problems?${params}`);
    const data = await res.json();
    setProblems(data.problems || []);
    setTotal(data.total || 0);
    setLoading(false);
  }, [page, faculty, year, search, topic, majorCategory]);

  useEffect(() => {
    setPage(1);
    fetchTopicLabel();
  }, [topic, majorCategory, fetchTopicLabel]);

  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);

  const years = Array.from({ length: 2025 - 2003 + 1 }, (_, i) => 2025 - i);

  const hasFilters = Boolean(topic || majorCategory || faculty || year || search);
  const selectedMajorName = MAJOR_CATEGORIES.find((item) => item.id === majorCategory)?.name;

  const clearAllFilters = () => {
    setFaculty("");
    setYear("");
    setSearch("");
    setSearchInput("");
    setPage(1);
    router.replace("/zadaci");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-[#e2e8f0]">
        <BookOpen className="mr-2 inline" size={28} />
        Zadaci
      </h1>

      <div className="mb-6 rounded-xl border border-[#334155] bg-[#1e293b] p-4">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <select
            value={majorCategory}
            onChange={(e) => {
              updateFilterQuery({
                majorCategory: e.target.value,
                topic: "",
              });
            }}
            className="rounded-lg border border-[#334155] bg-[#0f172a] px-3 py-2 text-sm text-[#e2e8f0]"
          >
            <option value="">Sve kategorije</option>
            {MAJOR_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            value={faculty}
            onChange={(e) => {
              setFaculty(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-[#334155] bg-[#0f172a] px-3 py-2 text-sm text-[#e2e8f0]"
          >
            <option value="">Svi fakulteti</option>
            {Object.entries(FACULTY_LABELS).map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>

          <select
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-[#334155] bg-[#0f172a] px-3 py-2 text-sm text-[#e2e8f0]"
          >
            <option value="">Sve godine</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
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
              <Search className="absolute left-3 top-2.5 text-[#64748b]" size={16} />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Pretraži zadatke..."
                className="w-full rounded-lg border border-[#334155] bg-[#0f172a] py-2 pl-9 pr-3 text-sm text-[#e2e8f0] outline-none focus:border-[#60a5fa]"
              />
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSearchInput("");
                  setPage(1);
                }}
                className="absolute right-2 top-2 rounded-full p-0.5 text-[#64748b] transition hover:text-[#f8fafc]"
                aria-label="Obriši pretragu"
              >
                <XCircle size={16} />
              </button>
            </div>
          </form>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          {hasFilters && (
            <div className="inline-flex items-center gap-2 rounded-lg border border-[#334155] bg-[#0f172a] px-3 py-2 text-sm text-[#94a3b8]">
              <span>Aktivni filteri:</span>

              {majorCategory && (
                <span className="inline-flex items-center gap-1 rounded-full border border-[#334155] bg-[#1e293b] px-2 py-1 text-xs text-[#818cf8]">
                  Kategorija: <strong>{selectedMajorName}</strong>
                  <button
                    type="button"
                    onClick={() => clearOneFilter("majorCategory")}
                    className="ml-1 text-[#94a3b8] hover:text-[#f8fafc]"
                    aria-label="Ukloni kategoriju"
                  >
                    ×
                  </button>
                </span>
              )}
              {topic && (
                <span className="inline-flex items-center gap-1 rounded-full border border-[#334155] bg-[#1e293b] px-2 py-1 text-xs text-[#38bdf8]">
                  Tema: <strong>{topicName || topic}</strong>
                  <button
                    type="button"
                    onClick={() => clearOneFilter("topic")}
                    className="ml-1 text-[#94a3b8] hover:text-[#f8fafc]"
                    aria-label="Ukloni temu"
                  >
                    ×
                  </button>
                </span>
              )}
              {faculty && (
                <span className="inline-flex items-center gap-1 rounded-full border border-[#334155] bg-[#1e293b] px-2 py-1 text-xs text-[#60a5fa]">
                  Fakultet: <strong>{FACULTY_LABELS[faculty] || faculty}</strong>
                  <button
                    type="button"
                    onClick={() => clearOneFilter("faculty")}
                    className="ml-1 text-[#94a3b8] hover:text-[#f8fafc]"
                    aria-label="Ukloni filter fakulteta"
                  >
                    ×
                  </button>
                </span>
              )}
              {year && (
                <span className="inline-flex items-center gap-1 rounded-full border border-[#334155] bg-[#1e293b] px-2 py-1 text-xs text-[#60a5fa]">
                  Godina: <strong>{year}</strong>
                  <button
                    type="button"
                    onClick={() => clearOneFilter("year")}
                    className="ml-1 text-[#94a3b8] hover:text-[#f8fafc]"
                    aria-label="Ukloni filter godine"
                  >
                    ×
                  </button>
                </span>
              )}
              {search && (
                <span className="inline-flex items-center gap-1 rounded-full border border-[#334155] bg-[#1e293b] px-2 py-1 text-xs text-[#60a5fa]">
                  Pretraga: <strong>{search}</strong>
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setSearchInput("");
                      setPage(1);
                    }}
                    className="ml-1 text-[#94a3b8] hover:text-[#f8fafc]"
                    aria-label="Ukloni pretragu"
                  >
                    ×
                  </button>
                </span>
              )}
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="ml-1 rounded-lg border border-[#334155] bg-[#1e293b] px-3 py-1 text-xs text-[#f8fafc] hover:bg-[#334155]"
                >
                  Ukloni sve
                </button>
              )}
            </div>
          )}

          <p className="text-sm text-[#94a3b8]">Prikazano: {total} zadataka</p>
          {(majorCategory || topic) && (
            <p className="ml-auto text-xs text-[#64748b]">
              <Filter size={13} className="mr-1 inline text-[#38bdf8]" />
              Fokusirano na ciljanu praksu
            </p>
          )}
        </div>
      </div>

      {!loading && problems.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          <Link
            href="/zadaci"
            className={`rounded-full border px-3 py-1.5 text-xs transition ${
              !majorCategory && !topic ? "border-[#60a5fa] bg-[#60a5fa]/10 text-[#60a5fa]" : "border-[#334155] text-[#94a3b8] hover:border-[#60a5fa]/70"
            }`}
          >
            Sve teme
          </Link>
          {MAJOR_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/zadaci?majorCategory=${encodeURIComponent(cat.id)}`}
              className={`rounded-full border px-3 py-1.5 text-xs transition ${
                majorCategory === cat.id ? "border-[#a78bfa] bg-[#a78bfa]/10 text-[#a78bfa]" : "border-[#334155] text-[#94a3b8] hover:border-[#a78bfa]/70"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center text-[#94a3b8]">Učitavanje...</div>
      ) : problems.length === 0 ? (
        <div className="py-20 text-center text-[#94a3b8]">Nema pronađenih zadataka.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((p) => (
              <Link
                key={p.id}
                href={`/zadaci/${p.slug}`}
                className="group rounded-xl border border-[#334155] bg-[#1e293b] p-5 transition hover:border-[#60a5fa]/50"
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
                  <span className="text-xs text-[#94a3b8]">{p.year}</span>
                </div>
                <h3 className="mb-2 line-clamp-2 text-sm font-medium text-[#e2e8f0] group-hover:text-[#60a5fa]">
                  {p.title}
                </h3>
                <p className="text-xs text-[#64748b]">Zadatak #{p.problemNumber}</p>
              </Link>
            ))}
          </div>

          {total > 30 && (
            <div className="mt-8 flex justify-center gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="rounded-lg border border-[#334155] px-4 py-2 text-sm text-[#94a3b8] disabled:opacity-50"
              >
                Prethodna
              </button>
              <span className="flex items-center px-4 text-sm text-[#94a3b8]">
                Strana {page} od {Math.ceil(total / 30)}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= Math.ceil(total / 30)}
                className="rounded-lg border border-[#334155] px-4 py-2 text-sm text-[#94a3b8] disabled:opacity-50"
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
