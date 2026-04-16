"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ScoreCircle from "./ScoreCircle";

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

/* ─── Score color helper ─── */

function scoreColor(pct: number): string {
  if (pct === 0) return "#f9a8a8";
  if (pct <= 30) return "#dc2626";
  if (pct <= 60) return "#f5b731";
  return "#22c55e";
}

/* ─── Recommended topic card ─── */

function RecommendedTopicCard({
  topic,
  groupName,
}: {
  topic: SubcategoryStat;
  groupName: string;
}) {
  const pct = topic.readinessScore;
  const color = scoreColor(pct);

  return (
    <Link
      href={`/zadaci?topic=${topic.id}`}
      className="glass-card rounded-2xl p-6 flex items-center justify-between gap-4 group transition-all hover:border-primary/40 hover:bg-primary/5"
    >
      <div className="min-w-0 flex-1">
        <p
          className="text-[10px] font-black uppercase tracking-widest mb-1"
          style={{ color }}
        >
          {groupName}
        </p>
        <h4 className="text-lg font-bold text-heading mb-3 truncate">
          {topic.name}
        </h4>
        <div className="flex items-center gap-3">
          <div
            className="flex-1 h-1.5 rounded-full overflow-hidden"
            style={{ backgroundColor: "var(--tint-strong)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${Math.max(pct, pct === 0 ? 100 : 0)}%`,
                backgroundColor: color,
              }}
            />
          </div>
          <span
            className="text-xs font-bold shrink-0"
            style={{ color: pct === 0 ? "#dc2626" : color }}
          >
            {pct}
            <span className="text-muted">/100</span>
          </span>
        </div>
      </div>
      <span
        className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30 group-hover:scale-110 transition-transform shrink-0"
        aria-hidden
      >
        <span
          className="material-symbols-outlined"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          play_arrow
        </span>
      </span>
    </Link>
  );
}

/* ─── Compact topic row (default focus state) ─── */

function TopicRow({ topic }: { topic: SubcategoryStat }) {
  const pct = topic.readinessScore;
  const color = scoreColor(pct);
  const isComplete = pct === 100;
  return (
    <div className="flex flex-wrap sm:flex-nowrap items-center gap-y-2 gap-x-3 sm:gap-x-6 py-3 px-3 rounded-xl hover:bg-[var(--tint)] transition-colors group">
      <Link
        href={`/zadaci?topic=${topic.id}`}
        className="w-full sm:w-auto sm:flex-1 sm:min-w-0 sm:truncate text-sm font-medium text-text-secondary group-hover:text-primary transition-colors"
      >
        {topic.name}
      </Link>
      <div
        className="flex-1 sm:flex-initial sm:w-2/5 h-1.5 rounded-full overflow-hidden shrink-0"
        style={{ backgroundColor: "var(--tint-strong)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${Math.max(pct, pct === 0 ? 100 : 0)}%`,
            backgroundColor: color,
          }}
        />
      </div>
      <span
        className="w-10 text-right text-xs font-bold shrink-0"
        style={{ color: pct === 0 ? "#dc2626" : color }}
      >
        {pct}
        <span className="text-muted">/100</span>
      </span>
      <Link
        href={`/zadaci?topic=${topic.id}`}
        className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center shadow-sm shadow-primary/30 hover:brightness-110 active:scale-90 transition-all shrink-0"
        aria-label={`Vežbaj ${topic.name}`}
      >
        <span
          className="material-symbols-outlined text-base"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {isComplete ? "check" : "play_arrow"}
        </span>
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
    <section className="glass-card rounded-2xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 sm:px-8 sm:py-6 flex items-center justify-between gap-3 sm:gap-4 border-b border-[var(--glass-border)]">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
          {meta.image && (
            <>
              <img
                src={meta.image}
                alt={group.name}
                className="h-12 w-16 sm:h-14 sm:w-20 shrink-0 rounded-xl object-cover dark-only"
              />
              <img
                src={meta.imageLight}
                alt={group.name}
                className="h-12 w-16 sm:h-14 sm:w-20 shrink-0 rounded-xl object-cover light-only"
              />
            </>
          )}
          <div className="min-w-0 flex-1">
            <h4 className="font-headline text-xl sm:text-2xl font-black text-heading break-words">
              {group.name}
            </h4>
            <p className="text-sm text-text-secondary mt-1">
              {group.categories.length} dostupnih tema
            </p>
          </div>
        </div>
        <div className="shrink-0 sm:hidden">
          <ScoreCircle score={group.readinessScore} size={64} />
        </div>
        <div className="shrink-0 hidden sm:block">
          <ScoreCircle score={group.readinessScore} size={88} />
        </div>
      </div>

      {/* Topic list */}
      <div className="px-5 pt-4 pb-2 flex flex-col gap-1">
        {visibleTopics.map((t) => (
          <TopicRow key={t.id} topic={t} />
        ))}
      </div>

      {/* Footer with toggle + main CTA */}
      <div className="px-8 pt-6 pb-8 flex flex-col items-center gap-4">
        {!expanded && hiddenCount > 0 && (
          <button
            type="button"
            onClick={onToggleExpand}
            className="text-sm italic text-text-secondary hover:text-primary hover:underline transition-colors"
          >
            + još {hiddenCount} tema u ovoj kategoriji
          </button>
        )}
        {expanded && group.categories.length > COMPACT_LIMIT && (
          <button
            type="button"
            onClick={onToggleExpand}
            className="text-sm italic text-text-secondary hover:text-primary hover:underline transition-colors"
          >
            Sažmi listu
          </button>
        )}
        <Link
          href={`/zadaci?group=${group.id}`}
          className="rounded-xl bg-primary text-white px-10 py-4 font-black uppercase tracking-widest text-sm flex items-center gap-3 shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            rocket_launch
          </span>
          Vežbaj celu oblast
        </Link>
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
      className="rounded-2xl py-7 px-6 flex items-center justify-between gap-4 text-left transition-all border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl hover:border-[#ec5b13]/50 hover:bg-[#ec5b13]/5 hover:scale-[1.02] cursor-pointer"
    >
      <div className="flex items-center gap-4 min-w-0">
        {meta.image ? (
          <>
            <img
              src={meta.image}
              alt={group.name}
              className="h-14 w-20 shrink-0 rounded-lg object-cover dark-only"
            />
            <img
              src={meta.imageLight}
              alt={group.name}
              className="h-14 w-20 shrink-0 rounded-lg object-cover light-only"
            />
          </>
        ) : (
          <span
            className="w-14 h-14 rounded-xl shrink-0 flex items-center justify-center bg-[var(--tint-strong)] text-text-secondary material-symbols-outlined"
            aria-hidden
          >
            {meta.icon}
          </span>
        )}
        <h5 className="text-lg font-bold text-heading truncate min-w-0">
          {group.name}
        </h5>
      </div>
      <ScoreCircle score={group.readinessScore} size={60} />
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
      <div className="w-full px-8 py-8">
        <div className="mb-12">
          <div className="h-3 w-32 animate-pulse rounded bg-[var(--tint-strong)] mb-4" />
          <div className="h-10 w-96 animate-pulse rounded-lg bg-[var(--tint-strong)]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="h-32 animate-pulse rounded-2xl bg-[var(--tint)]" />
          <div className="h-32 animate-pulse rounded-2xl bg-[var(--tint)]" />
          <div className="h-32 animate-pulse rounded-2xl bg-[var(--tint)]" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 h-[480px] animate-pulse rounded-2xl bg-[var(--tint)]" />
          <div className="lg:col-span-4 space-y-4">
            <div className="h-24 animate-pulse rounded-2xl bg-[var(--tint)]" />
            <div className="h-24 animate-pulse rounded-2xl bg-[var(--tint)]" />
            <div className="h-24 animate-pulse rounded-2xl bg-[var(--tint)]" />
            <div className="h-24 animate-pulse rounded-2xl bg-[var(--tint)]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-8 pb-12 pt-6">
      {/* Page Intro — keep title styling identical to previous version */}
      <div className="mb-6">
        <h2 className="text-3xl font-black tracking-tight text-heading">
          Slobodna <span className="text-primary">Vežba</span>
        </h2>
      </div>

      {/* Zone 1: Recommendations */}
      {(weakestTopics.length > 0 || savedCount !== null) && (
        <section className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-black tracking-tight text-heading">
              Preporučeno sledeće
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weakestTopics.map(({ topic, groupName }) => (
              <RecommendedTopicCard
                key={topic.id}
                topic={topic}
                groupName={groupName}
              />
            ))}

            {/* Saved problems card — always shown as 3rd */}
            <Link
              href="/sacuvano"
              className="glass-card rounded-2xl p-6 flex items-center justify-between gap-4 group transition-all hover:border-[#ec5b13]/40 hover:bg-[#ec5b13]/5"
            >
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-[#ec5b13]">
                  Sačuvano
                </p>
                <h4 className="text-lg font-bold text-heading mb-3">
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
                className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-md shadow-primary/30 group-hover:scale-110 transition-transform shrink-0"
                aria-hidden
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_arrow
                </span>
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* Zone 2: Oblasti učenja — focus + side cards */}
      {selectedGroup && (
        <section>
          <h3 className="text-xl font-black tracking-tight text-heading mb-3">
            Oblasti učenja
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8">
              <FocusCard
                group={selectedGroup}
                expanded={expanded}
                onToggleExpand={() => setExpanded((v) => !v)}
              />
            </div>
            <aside className="lg:col-span-4 grid grid-cols-1 gap-4">
              {sideGroups.map((g) => (
                <SideGroupCard
                  key={g.id}
                  group={g}
                  onSelect={handleSelectGroup}
                />
              ))}
            </aside>
          </div>
        </section>
      )}
    </div>
  );
}
