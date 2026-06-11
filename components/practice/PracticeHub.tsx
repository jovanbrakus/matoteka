"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowRight, Bookmark, Play } from "lucide-react";
import ScoreCircle from "./ScoreCircle";
import SectionLabel from "@/components/ui/section-label";
import { scoreColor } from "@/lib/score-colors";

/* ─── Types ─── */

interface SubcategoryStat {
  id: string;
  name: string;
  total: number;
  solved: number;
  readinessScore: number;
}

interface CategoryGroup {
  id: string;
  name: string;
  totalProblems: number;
  solvedCorrectly: number;
  progressPercent: number;
  readinessScore: number;
  categories: SubcategoryStat[];
}

/* ─── Group meta (icons + images) ─── */

const GROUP_META: Record<
  string,
  { icon: string; description?: string; image: string; imageLight: string }
> = {
  algebra: {
    icon: "variables",
    description:
      "Srce matematike. Od osnova proporcije do kompleksnih logaritamskih struktura.",
    image: "/images/categories/algebra.png",
    imageLight: "/images/categories/light/algebra.png",
  },
  trigonometry: {
    icon: "change_history",
    image: "/images/categories/trigonometry.png",
    imageLight: "/images/categories/light/trigonometry.png",
  },
  geometry: {
    icon: "category",
    image: "/images/categories/geometry.png",
    imageLight: "/images/categories/light/geometry.png",
  },
  analysis: {
    icon: "insights",
    image: "/images/categories/analysis.png",
    imageLight: "/images/categories/light/analysis.png",
  },
  combinatorics_and_probability: {
    icon: "casino",
    image: "/images/categories/combinatorics_and_probability.png",
    imageLight: "/images/categories/light/combinatorics_and_probability.png",
  },
};

const ART_MASK = {
  maskImage: "radial-gradient(130% 160% at 85% 45%, black 25%, transparent 72%)",
  WebkitMaskImage: "radial-gradient(130% 160% at 85% 45%, black 25%, transparent 72%)",
} as const;

/* ─── hooks ─── */

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

/* ─── Animated readiness bar ─── */

function ScoreBar({ score, className = "" }: { score: number; className?: string }) {
  const mounted = useMounted();
  return (
    <span className={`h-1 overflow-hidden rounded-full bg-[var(--tint-strong)] ${className}`}>
      <span
        className="block h-full rounded-full"
        style={{
          width: mounted ? `${Math.max(score, 2)}%` : "0%",
          background: scoreColor(score),
          transition: "width 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
    </span>
  );
}

/* ─── Recommended topic card ─── */

function RecommendedTopicCard({
  topic,
  groupName,
  delay,
}: {
  topic: SubcategoryStat;
  groupName: string;
  delay: number;
}) {
  const pct = topic.readinessScore;
  const color = scoreColor(pct);

  return (
    <Link
      href={`/zadaci?topic=${topic.id}`}
      className="dash-rise glass-card group flex items-center justify-between gap-4 rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#ec5b13]/40 hover:shadow-[0_16px_40px_-18px_rgba(236,91,19,0.4)]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="min-w-0 flex-1">
        <p className="mb-1 text-[10px] font-black uppercase tracking-widest" style={{ color }}>
          {groupName}
        </p>
        <h4 className="mb-3 truncate font-headline text-lg font-bold text-heading">
          {topic.name}
        </h4>
        <div className="flex items-center gap-3">
          <ScoreBar score={pct} className="flex-1" />
          <span className="shrink-0 font-headline text-xs font-bold tabular-nums" style={{ color }}>
            {pct}
            <span className="text-muted">/100</span>
          </span>
        </div>
      </div>
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ec5b13] text-white shadow-[0_8px_20px_-6px_rgba(236,91,19,0.6)] transition-transform duration-300 group-hover:scale-110"
        aria-hidden
      >
        <Play size={17} fill="currentColor" />
      </span>
    </Link>
  );
}

/* ─── Compact topic row (focus card) ─── */

function TopicRow({ topic }: { topic: SubcategoryStat }) {
  const pct = topic.readinessScore;
  const color = scoreColor(pct);
  const isComplete = pct === 100;
  return (
    <div className="group flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl px-3 py-2.5 transition-colors hover:bg-[var(--tint)] sm:flex-nowrap sm:gap-x-6">
      <Link
        href={`/zadaci?topic=${topic.id}`}
        className="w-full text-sm font-medium text-text-secondary transition-colors group-hover:text-[#ec5b13] sm:w-auto sm:min-w-0 sm:flex-1 sm:truncate"
      >
        {topic.name}
      </Link>
      <ScoreBar score={pct} className="flex-1 shrink-0 sm:w-2/5 sm:flex-initial" />
      <span className="w-10 shrink-0 text-right font-headline text-xs font-bold tabular-nums" style={{ color }}>
        {pct}
        <span className="text-muted">/100</span>
      </span>
      <Link
        href={`/zadaci?topic=${topic.id}`}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ec5b13] text-white shadow-sm shadow-[#ec5b13]/30 transition-all hover:brightness-110 active:scale-90"
        aria-label={`Vežbaj ${topic.name}`}
      >
        <Play size={13} fill="currentColor" />
      </Link>
    </div>
  );
}

/* ─── Focus card (left, expanded category) ─── */

function FocusCard({
  group,
  expanded,
  onToggleExpand,
}: {
  group: CategoryGroup;
  expanded: boolean;
  onToggleExpand: () => void;
}) {
  const meta = GROUP_META[group.id] ?? { icon: "functions", image: "", imageLight: "" };
  const COMPACT_LIMIT = 4;
  const sortedTopics = [...group.categories].sort(
    (a, b) => a.readinessScore - b.readinessScore,
  );
  const visibleTopics = expanded
    ? sortedTopics
    : sortedTopics.slice(0, COMPACT_LIMIT);
  const hiddenCount = Math.max(0, sortedTopics.length - COMPACT_LIMIT);

  return (
    <section
      className="relative flex flex-col rounded-3xl p-px"
      style={{
        background:
          "linear-gradient(135deg, rgba(236,91,19,0.5), var(--glass-border) 45%, transparent)",
      }}
    >
      <div className="relative flex flex-1 flex-col overflow-hidden rounded-[calc(1.5rem-1px)] bg-[var(--color-card)]">
        {/* Header with art backdrop */}
        <div className="relative border-b border-[var(--glass-border)]">
          {meta.image && (
            <>
              <img
                src={meta.image}
                alt=""
                aria-hidden
                className="dark-only pointer-events-none absolute inset-y-0 right-0 h-full w-3/5 object-cover opacity-50"
                style={ART_MASK}
              />
              <img
                src={meta.imageLight}
                alt=""
                aria-hidden
                className="light-only pointer-events-none absolute inset-y-0 right-0 h-full w-3/5 object-cover opacity-40"
                style={ART_MASK}
              />
            </>
          )}
          <div className="relative flex items-center justify-between gap-3 px-4 py-4 sm:gap-4 sm:px-7 sm:py-6">
            <div className="min-w-0 flex-1">
              <h4 className="break-words font-headline text-xl font-bold text-heading sm:text-2xl">
                {group.name}
              </h4>
              <p className="mt-1 text-sm text-text-secondary">
                {group.categories.length} dostupnih tema
              </p>
            </div>
            <div className="shrink-0 sm:hidden">
              <ScoreCircle score={group.readinessScore} size={64} color={scoreColor(group.readinessScore)} />
            </div>
            <div className="hidden shrink-0 sm:block">
              <ScoreCircle score={group.readinessScore} size={88} color={scoreColor(group.readinessScore)} />
            </div>
          </div>
        </div>

        {/* Topic list */}
        <div className="flex flex-col gap-1 px-4 pb-2 pt-4 sm:px-5">
          {visibleTopics.map((t) => (
            <TopicRow key={t.id} topic={t} />
          ))}
        </div>

        {/* Footer with toggle + main CTA */}
        <div className="flex flex-col items-center gap-4 px-8 pb-7 pt-5">
          {!expanded && hiddenCount > 0 && (
            <button
              type="button"
              onClick={onToggleExpand}
              className="text-xs font-bold text-text-secondary transition-colors hover:text-[#ec5b13]"
            >
              + još {hiddenCount} tema u ovoj kategoriji
            </button>
          )}
          {expanded && group.categories.length > COMPACT_LIMIT && (
            <button
              type="button"
              onClick={onToggleExpand}
              className="text-xs font-bold text-text-secondary transition-colors hover:text-[#ec5b13]"
            >
              Sažmi listu
            </button>
          )}
          <Link
            href={`/zadaci?group=${group.id}`}
            className="btn-shine inline-flex items-center gap-2 rounded-full bg-[#ec5b13] px-8 py-3 text-xs font-black uppercase tracking-widest text-white shadow-[0_10px_30px_-10px_rgba(236,91,19,0.6)] transition-all hover:-translate-y-0.5 hover:brightness-110"
          >
            Vežbaj celu oblast
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Side group card (right, collapsed) ─── */

function SideGroupCard({
  group,
  onSelect,
}: {
  group: CategoryGroup;
  onSelect: (id: string) => void;
}) {
  const meta = GROUP_META[group.id] ?? { icon: "functions", image: "", imageLight: "" };
  return (
    <button
      type="button"
      onClick={() => onSelect(group.id)}
      className="glass-card group relative flex w-full cursor-pointer items-center justify-between gap-4 overflow-hidden rounded-3xl px-5 py-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#ec5b13]/40 hover:shadow-[0_16px_40px_-18px_rgba(236,91,19,0.4)]"
    >
      {meta.image && (
        <>
          <img
            src={meta.image}
            alt=""
            aria-hidden
            className="dark-only pointer-events-none absolute inset-y-0 right-0 h-full w-1/2 object-cover opacity-25 transition-opacity duration-500 group-hover:opacity-45"
            style={ART_MASK}
          />
          <img
            src={meta.imageLight}
            alt=""
            aria-hidden
            className="light-only pointer-events-none absolute inset-y-0 right-0 h-full w-1/2 object-cover opacity-20 transition-opacity duration-500 group-hover:opacity-40"
            style={ART_MASK}
          />
        </>
      )}
      <div className="relative min-w-0">
        <h5 className="truncate font-headline text-base font-bold text-heading">
          {group.name}
        </h5>
        <p className="mt-0.5 text-[11px] text-text-secondary">
          {group.categories.length} tema
        </p>
      </div>
      <div className="relative shrink-0">
        <ScoreCircle score={group.readinessScore} size={56} color={scoreColor(group.readinessScore)} />
      </div>
    </button>
  );
}

/* ─── Main component ─── */

export default function PracticeHub() {
  const { status: sessionStatus } = useSession();
  const [groups, setGroups] = useState<CategoryGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (sessionStatus !== "authenticated") return;
    fetch("/api/practice/categories")
      .then((r) => r.json())
      .then((data) => {
        setGroups(data.categories ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [sessionStatus]);

  const weakestTopics = useMemo(() => {
    const all: { topic: SubcategoryStat; groupName: string }[] = [];
    for (const g of groups) {
      for (const t of g.categories) {
        all.push({ topic: t, groupName: g.name });
      }
    }
    return all
      .sort((a, b) => a.topic.readinessScore - b.topic.readinessScore)
      .slice(0, 2);
  }, [groups]);

  const [savedCount, setSavedCount] = useState<number | null>(null);

  useEffect(() => {
    if (sessionStatus !== "authenticated") return;
    fetch("/api/bookmarks/saved")
      .then((r) => r.json())
      .then((data) => setSavedCount(Array.isArray(data) ? data.length : 0))
      .catch(() => setSavedCount(0));
  }, [sessionStatus]);

  const selectedGroup =
    groups.find((g) => g.id === selectedGroupId) ?? groups[0];
  const sideGroups = selectedGroup
    ? groups.filter((g) => g.id !== selectedGroup.id)
    : [];

  function handleSelectGroup(id: string) {
    setSelectedGroupId(id);
    setExpanded(false);
  }

  /* ─── Loading State ─── */
  if (loading || sessionStatus === "loading") {
    return (
      <div className="mx-auto max-w-[1440px] p-4 sm:p-6 lg:p-7">
        <div className="mb-7 h-10 w-96 max-w-full animate-pulse rounded-2xl bg-[var(--tint)]" />
        <div className="mb-7 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div className="h-28 animate-pulse rounded-3xl bg-[var(--tint)]" />
          <div className="h-28 animate-pulse rounded-3xl bg-[var(--tint)]" />
          <div className="h-28 animate-pulse rounded-3xl bg-[var(--tint)]" />
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          <div className="h-[480px] animate-pulse rounded-3xl bg-[var(--tint)] lg:col-span-8" />
          <div className="space-y-4 lg:col-span-4">
            <div className="h-24 animate-pulse rounded-3xl bg-[var(--tint)]" />
            <div className="h-24 animate-pulse rounded-3xl bg-[var(--tint)]" />
            <div className="h-24 animate-pulse rounded-3xl bg-[var(--tint)]" />
            <div className="h-24 animate-pulse rounded-3xl bg-[var(--tint)]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] p-4 sm:p-6 lg:p-7">
      {/* ── Header ── */}
      <header className="dash-rise mb-7 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h1 className="font-headline text-[28px] font-bold tracking-tight text-heading sm:text-3xl">
          Slobodna vežba
          <span className="text-[#ec5b13]">.</span>
        </h1>
        <p className="text-sm text-text-secondary">
          Izaberi oblast i vežbaj tačno ono što ti treba.
        </p>
      </header>

      {/* ── Zone 1: Recommendations ── */}
      {(weakestTopics.length > 0 || savedCount !== null) && (
        <section className="mb-7">
          <div className="dash-rise mb-4" style={{ animationDelay: "60ms" }}>
            <SectionLabel index="01">Preporučeno sledeće</SectionLabel>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {weakestTopics.map(({ topic, groupName }, i) => (
              <RecommendedTopicCard
                key={topic.id}
                topic={topic}
                groupName={groupName}
                delay={120 + i * 60}
              />
            ))}

            {/* Saved problems card — always shown as 3rd */}
            <Link
              href="/sacuvano"
              className="dash-rise glass-card group flex items-center justify-between gap-4 rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#ec5b13]/40 hover:shadow-[0_16px_40px_-18px_rgba(236,91,19,0.4)]"
              style={{ animationDelay: "240ms" }}
            >
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-[#ec5b13]">
                  Sačuvano
                </p>
                <h4 className="mb-3 font-headline text-lg font-bold text-heading">
                  Sačuvani zadaci
                </h4>
                <p className="text-sm text-text-secondary">
                  {savedCount === null
                    ? "..."
                    : savedCount === 0
                      ? "Nema sačuvanih"
                      : `${savedCount} zadata${savedCount === 1 ? "k" : savedCount < 5 ? "ka" : "ka"}`}
                </p>
              </div>
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ec5b13] text-white shadow-[0_8px_20px_-6px_rgba(236,91,19,0.6)] transition-transform duration-300 group-hover:scale-110"
                aria-hidden
              >
                <Bookmark size={17} fill="currentColor" />
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* ── Zone 2: Oblasti učenja ── */}
      {selectedGroup && (
        <section>
          <div className="dash-rise mb-4" style={{ animationDelay: "300ms" }}>
            <SectionLabel index="02">Oblasti učenja</SectionLabel>
          </div>
          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12">
            <div className="dash-rise lg:col-span-8" style={{ animationDelay: "360ms" }}>
              <FocusCard
                group={selectedGroup}
                expanded={expanded}
                onToggleExpand={() => setExpanded((v) => !v)}
              />
            </div>
            <aside className="grid grid-cols-1 gap-4 lg:col-span-4">
              {sideGroups.map((g, i) => (
                <div key={g.id} className="dash-rise" style={{ animationDelay: `${420 + i * 70}ms` }}>
                  <SideGroupCard group={g} onSelect={handleSelectGroup} />
                </div>
              ))}
            </aside>
          </div>
        </section>
      )}
    </div>
  );
}
