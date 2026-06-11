"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Plus,
  TrendingUp,
  Clock,
  CheckCircle,
  ClipboardList,
  Zap,
  Edit3,
} from "lucide-react";
import SectionLabel from "@/components/ui/section-label";

interface HistoryExam {
  id: string;
  testSize: string;
  mode: string;
  facultyId: string;
  facultyName: string;
  status: string;
  score: string;
  maxScore: string;
  scorePercent: string;
  numCorrect: number;
  numWrong: number;
  numBlank: number;
  timeSpent: number;
  durationLimit: number | null;
  startedAt: string;
  finishedAt: string;
}

interface HistoryData {
  exams: HistoryExam[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
  stats: {
    avgScore: string;
    totalTime: number;
    totalTests: number;
  };
}

function getStatusBadge(percent: number) {
  if (percent >= 85) return { label: "Odlično", color: "#10b981" };
  if (percent >= 65) return { label: "Dobro", color: "#f59e0b" };
  return { label: "Potrebna vežba", color: "#f97316" };
}

function getTestTypeInfo(testSize: string) {
  switch (testSize) {
    case "full":
      return {
        label: "Kompletan test",
        icon: ClipboardList,
        iconColor: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
      };
    case "medium":
      return {
        label: "Srednji test",
        icon: Edit3,
        iconColor: "text-amber-500",
        bgColor: "bg-amber-500/10",
      };
    case "quick":
      return {
        label: "Brzi test",
        icon: Zap,
        iconColor: "text-[#ec5b13]",
        bgColor: "bg-[#ec5b13]/10",
      };
    default:
      return {
        label: testSize,
        icon: ClipboardList,
        iconColor: "text-text-secondary",
        bgColor: "bg-slate-400/10",
      };
  }
}

function formatDuration(seconds: number | null): string {
  if (!seconds) return "--";
  const m = Math.floor(seconds / 60);
  return `${m}m`;
}

function formatTotalTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const months = [
    "Januar",
    "Februar",
    "Mart",
    "April",
    "Maj",
    "Jun",
    "Jul",
    "Avgust",
    "Septembar",
    "Oktobar",
    "Novembar",
    "Decembar",
  ];
  const days = [
    "nedelja",
    "ponedeljak",
    "utorak",
    "sreda",
    "četvrtak",
    "petak",
    "subota",
  ];
  const day = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  const dayName = days[d.getDay()];
  const time = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}h`;

  return {
    date: `${day}. ${month} ${year}`,
    detail: `${dayName}, ${time}`,
  };
}

function getTestProblemCount(testSize: string): number {
  switch (testSize) {
    case "full":
      return 20;
    case "medium":
      return 14;
    case "quick":
      return 8;
    default:
      return 20;
  }
}

const STAT_CARDS = [
  {
    key: "avg",
    label: "Prosečan rezultat",
    icon: TrendingUp,
    iconColor: "text-[#ec5b13]",
    bgColor: "bg-[#ec5b13]/10",
  },
  {
    key: "time",
    label: "Ukupno vreme vežbanja",
    icon: Clock,
    iconColor: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    key: "tests",
    label: "Urađeno testova",
    icon: CheckCircle,
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
] as const;

export default function SimulationHistoryPage() {
  const [data, setData] = useState<HistoryData | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({
      page: page.toString(),
      perPage: "10",
    });

    fetch(`/api/simulation/history?${params}`)
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page]);

  const statValues: Record<(typeof STAT_CARDS)[number]["key"], string> = {
    avg: `${data?.stats.avgScore ?? 0}%`,
    time: formatTotalTime(data?.stats.totalTime ?? 0),
    tests: String(data?.stats.totalTests ?? 0),
  };

  return (
    <div className="mx-auto max-w-[1440px] p-4 sm:p-6 lg:p-7">
      {/* ── Header ── */}
      <header className="dash-rise mb-7 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h1 className="font-headline text-[28px] font-bold tracking-tight text-heading sm:text-3xl">
            Istorija testova
            <span className="text-[#ec5b13]">.</span>
          </h1>
          <p className="text-sm text-text-secondary">
            Svaki test je korak bliže indeksu.
          </p>
        </div>
        <Link
          href="/simulacija"
          className="btn-shine inline-flex items-center gap-2 rounded-full bg-[#ec5b13] px-5 py-2.5 text-xs font-black uppercase tracking-widest text-white shadow-[0_10px_30px_-10px_rgba(236,91,19,0.6)] transition-all hover:-translate-y-0.5 hover:brightness-110"
        >
          <Plus size={15} />
          Započni novi test
        </Link>
      </header>

      {/* ── Zone 1: Stats overview ── */}
      {data && data.stats.totalTests > 0 && (
        <section className="mb-7">
          <div className="dash-rise mb-4" style={{ animationDelay: "60ms" }}>
            <SectionLabel index="01">Pregled</SectionLabel>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {STAT_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.key}
                  className="dash-rise glass-card flex items-center gap-4 rounded-3xl p-5"
                  style={{ animationDelay: `${120 + i * 60}ms` }}
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${card.bgColor} ${card.iconColor}`}
                  >
                    <Icon size={21} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                      {card.label}
                    </p>
                    <h3 className="mt-0.5 font-headline text-2xl font-bold tracking-tight text-heading">
                      {statValues[card.key]}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Zone 2: Table ── */}
      <section>
        <div className="dash-rise mb-4" style={{ animationDelay: "300ms" }}>
          <SectionLabel index="02">Svi testovi</SectionLabel>
        </div>
        <div
          className="dash-rise glass-card overflow-hidden rounded-3xl"
          style={{ animationDelay: "360ms" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-[var(--glass-border)] bg-[var(--tint)]">
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.25em] text-muted">
                    Datum
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.25em] text-muted">
                    Tip testa
                  </th>
                  <th className="px-6 py-4 text-center text-[10px] font-bold uppercase tracking-[0.25em] text-muted">
                    Trajanje
                  </th>
                  <th className="px-6 py-4 text-center text-[10px] font-bold uppercase tracking-[0.25em] text-muted">
                    Rezultat
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.25em] text-muted">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-[0.25em] text-muted">
                    Akcija
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--glass-border)]">
                {loading && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-text-secondary"
                    >
                      <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-[#ec5b13] border-t-transparent" />
                      <p className="mt-2">Učitavanje...</p>
                    </td>
                  </tr>
                )}
                {!loading && data?.exams.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-14 text-center text-text-secondary"
                    >
                      <p className="font-headline text-lg font-bold text-heading">
                        Nema završenih testova
                      </p>
                      <p className="mt-1 text-sm">
                        Započni svoju prvu simulaciju!
                      </p>
                      <Link
                        href="/simulacija"
                        className="btn-shine mt-5 inline-flex items-center gap-2 rounded-full bg-[#ec5b13] px-6 py-2.5 text-xs font-black uppercase tracking-widest text-white transition-all hover:brightness-110"
                      >
                        <Plus size={15} />
                        Novi test
                      </Link>
                    </td>
                  </tr>
                )}
                {!loading &&
                  data?.exams.map((exam) => {
                    const pct = parseFloat(exam.scorePercent || "0");
                    const badge = getStatusBadge(pct);
                    const typeInfo = getTestTypeInfo(exam.testSize);
                    const TypeIcon = typeInfo.icon;
                    const dateInfo = formatDate(exam.startedAt);
                    const problemCount = getTestProblemCount(exam.testSize);
                    const totalCorrect = exam.numCorrect || 0;

                    return (
                      <tr
                        key={exam.id}
                        className="group transition-colors hover:bg-[var(--tint)]"
                      >
                        <td className="px-6 py-5">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-heading">
                              {dateInfo.date}
                            </span>
                            <span className="text-xs text-muted">
                              {dateInfo.detail}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-lg ${typeInfo.bgColor}`}
                            >
                              <TypeIcon
                                size={15}
                                className={typeInfo.iconColor}
                              />
                            </div>
                            <span className="text-sm font-medium text-text">
                              {typeInfo.label}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span className="font-headline text-sm tabular-nums text-text-secondary">
                            {formatDuration(exam.timeSpent)} /{" "}
                            {formatDuration(exam.durationLimit)}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span
                            className="font-headline text-lg font-bold tabular-nums"
                            style={{ color: badge.color }}
                          >
                            {totalCorrect}/{problemCount}
                          </span>
                          <span className="block text-xs font-bold text-text-secondary">
                            {pct.toFixed(0)}%
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <span
                            className="inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wide"
                            style={{
                              color: badge.color,
                              borderColor: `${badge.color}33`,
                              background: `${badge.color}1a`,
                            }}
                          >
                            {badge.label}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <Link
                            href={`/simulacija/${exam.id}/rezultati`}
                            className="inline-flex items-center gap-2 text-sm font-bold text-text-secondary transition-colors hover:text-[#ec5b13]"
                          >
                            Pogledaj rešenja
                            <ArrowRight
                              size={15}
                              className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {data && data.pagination.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-[var(--glass-border)] bg-[var(--tint)] px-6 py-4">
              <p className="text-xs font-medium text-muted">
                Prikazano{" "}
                {(data.pagination.page - 1) * data.pagination.perPage + 1}-
                {Math.min(
                  data.pagination.page * data.pagination.perPage,
                  data.pagination.total
                )}{" "}
                od {data.pagination.total} testova
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--tint-strong)] text-text-secondary transition-colors hover:text-[#ec5b13] disabled:opacity-30"
                >
                  <ChevronLeft size={15} />
                </button>
                {Array.from(
                  { length: Math.min(5, data.pagination.totalPages) },
                  (_, i) => {
                    let pageNum: number;
                    if (data.pagination.totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= data.pagination.totalPages - 2) {
                      pageNum = data.pagination.totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`h-8 w-8 rounded-full font-headline text-xs font-bold transition-colors ${
                          pageNum === page
                            ? "bg-[#ec5b13] text-white shadow-md shadow-[#ec5b13]/30"
                            : "bg-[var(--tint-strong)] text-text-secondary hover:text-[#ec5b13]"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                )}
                <button
                  onClick={() =>
                    setPage(Math.min(data.pagination.totalPages, page + 1))
                  }
                  disabled={page === data.pagination.totalPages}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--tint-strong)] text-text-secondary transition-colors hover:text-[#ec5b13] disabled:opacity-30"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
