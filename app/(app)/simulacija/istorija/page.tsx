"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  TrendingUp,
  Clock,
  CheckCircle,
  ClipboardList,
  Zap,
  Edit3,
} from "lucide-react";

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
  if (percent >= 85)
    return {
      label: "Odlično",
      color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    };
  if (percent >= 65)
    return {
      label: "Dobro",
      color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    };
  return {
    label: "Potrebna vežba",
    color: "bg-[#ec5b13]/10 text-[#ec5b13] border-[#ec5b13]/20",
  };
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
        iconColor: "text-blue-500",
        bgColor: "bg-blue-500/10",
      };
    case "quick":
      return {
        label: "Brzi test",
        icon: Zap,
        iconColor: "text-orange-500",
        bgColor: "bg-orange-500/10",
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

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-black text-heading tracking-tight">
            Istorija <span className="text-[#ec5b13]">testova</span>
          </h1>
          <Link
            href="/simulacija"
            className="flex items-center gap-2 bg-[#ec5b13] hover:bg-[#ec5b13]/90 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-[#ec5b13]/20"
          >
            <Plus size={16} />
            Započni novi test
          </Link>
        </div>


        {/* Table */}
        <div className="rounded-2xl border border-[#ec5b13]/10 bg-[var(--glass-bg)] backdrop-blur-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--tint)] border-b border-[#ec5b13]/10">
                  <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-[#ec5b13]/60">
                    Datum
                  </th>
                  <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-[#ec5b13]/60">
                    Tip testa
                  </th>
                  <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-[#ec5b13]/60 text-center">
                    Trajanje
                  </th>
                  <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-[#ec5b13]/60 text-center">
                    Rezultat
                  </th>
                  <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-[#ec5b13]/60">
                    Status
                  </th>
                  <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-[#ec5b13]/60 text-right">
                    Akcija
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ec5b13]/5">
                {loading && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-8 py-12 text-center text-text-secondary"
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
                      className="px-8 py-12 text-center text-text-secondary"
                    >
                      <p className="text-lg font-bold">
                        Nema završenih testova
                      </p>
                      <p className="mt-1 text-sm">
                        Započni svoju prvu simulaciju!
                      </p>
                      <Link
                        href="/simulacija"
                        className="mt-4 inline-flex items-center gap-2 bg-[#ec5b13] text-white px-5 py-2.5 rounded-xl font-bold text-sm"
                      >
                        <Plus size={16} />
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
                        className="hover:bg-[#ec5b13]/5 transition-colors group"
                      >
                        <td className="px-8 py-6">
                          <div className="flex flex-col">
                            <span className="font-bold text-heading">
                              {dateInfo.date}
                            </span>
                            <span className="text-xs text-muted">
                              {dateInfo.detail}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-lg ${typeInfo.bgColor} flex items-center justify-center`}
                            >
                              <TypeIcon
                                size={16}
                                className={typeInfo.iconColor}
                              />
                            </div>
                            <span className="font-medium text-text">
                              {typeInfo.label}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <span className="text-sm font-mono text-text-secondary">
                            {formatDuration(exam.timeSpent)} /{" "}
                            {formatDuration(exam.durationLimit)}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <span className="text-lg font-black text-[#ec5b13]">
                            {totalCorrect}/{problemCount}
                          </span>
                          <span className="text-xs text-text-secondary block font-bold">
                            {pct.toFixed(0)}%
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black border uppercase tracking-tight ${badge.color}`}
                          >
                            {badge.label}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <Link
                            href={`/simulacija/${exam.id}/rezultati`}
                            className="inline-flex items-center gap-2 font-bold text-sm text-text-secondary hover:text-[#ec5b13] transition-all group-hover:translate-x-[-4px]"
                          >
                            Pogledaj rešenja
                            <ChevronRight size={16} />
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
            <div className="px-8 py-4 bg-[var(--tint)] border-t border-[#ec5b13]/10 flex items-center justify-between">
              <p className="text-xs text-[#ec5b13]/60 font-medium">
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
                  className="p-2 rounded-lg bg-[#0a0705]/60 text-text-secondary disabled:opacity-30 hover:text-[#ec5b13] transition-colors"
                >
                  <ChevronLeft size={16} />
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
                        className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                          pageNum === page
                            ? "bg-[#ec5b13] text-white shadow-md shadow-[#ec5b13]/30"
                            : "bg-[#0a0705]/60 text-text-secondary hover:text-[#ec5b13]"
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
                  className="p-2 rounded-lg bg-[#0a0705]/60 text-text-secondary disabled:opacity-30 hover:text-[#ec5b13] transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        {data && data.stats.totalTests > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-[#ec5b13]/10 bg-[var(--glass-bg)] backdrop-blur-xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#ec5b13]/20 flex items-center justify-center text-[#ec5b13]">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-xs text-[#ec5b13]/60 font-bold uppercase tracking-widest">
                  Prosečan rezultat
                </p>
                <h3 className="text-2xl font-black text-heading">
                  {data.stats.avgScore}%
                </h3>
              </div>
            </div>
            <div className="rounded-2xl border border-[#ec5b13]/10 bg-[var(--glass-bg)] backdrop-blur-xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-500">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-xs text-[#ec5b13]/60 font-bold uppercase tracking-widest">
                  Ukupno vreme vežbanja
                </p>
                <h3 className="text-2xl font-black text-heading">
                  {formatTotalTime(data.stats.totalTime)}
                </h3>
              </div>
            </div>
            <div className="rounded-2xl border border-[#ec5b13]/10 bg-[var(--glass-bg)] backdrop-blur-xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                <CheckCircle size={24} />
              </div>
              <div>
                <p className="text-xs text-[#ec5b13]/60 font-bold uppercase tracking-widest">
                  Urađeno testova
                </p>
                <h3 className="text-2xl font-black text-heading">
                  {data.stats.totalTests}
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
