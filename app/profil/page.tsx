"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import {
  User,
  Mail,
  Clock,
  Pencil,
  Check,
  X,
  Target,
  TrendingUp,
  Award,
  BookOpen,
} from "lucide-react";
import FacultyMultiSelect, { FACULTIES } from "@/components/ui/faculty-multi-select";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [progress, setProgress] = useState<any>(null);
  const [examHistory, setExamHistory] = useState<any[]>([]);
  const [targetFaculties, setTargetFaculties] = useState<string[]>([]);
  const [editingFaculties, setEditingFaculties] = useState(false);
  const [pendingFaculties, setPendingFaculties] = useState<string[]>([]);
  const [savingFaculty, setSavingFaculty] = useState(false);
  const [facultyLoaded, setFacultyLoaded] = useState(false);

  // Display name editing
  const [editingName, setEditingName] = useState(false);
  const [pendingName, setPendingName] = useState("");
  const [savingName, setSavingName] = useState(false);
  const [nameError, setNameError] = useState("");

  const user = session?.user as any;

  const loadData = useCallback(() => {
    fetch("/api/progress").then((r) => r.json()).then(setProgress).catch(() => {});
    fetch("/api/exams/history").then((r) => r.json()).then(setExamHistory).catch(() => {});
    fetch("/api/profile/faculty")
      .then((r) => r.json())
      .then((data) => {
        const faculties = data.targetFaculties || [];
        setTargetFaculties(faculties);
        setFacultyLoaded(true);
      })
      .catch(() => setFacultyLoaded(true));
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  function getFacultyLabels(ids: string[]): string {
    return ids
      .map((id) => {
        if (id === "other") return "Ostalo";
        return FACULTIES.find((f) => f.id === id)?.short || id;
      })
      .join(", ");
  }

  async function handleFacultySave() {
    if (pendingFaculties.length === 0) return;
    setSavingFaculty(true);
    try {
      const res = await fetch("/api/profile/faculty", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetFaculties: pendingFaculties }),
      });
      if (res.ok) {
        setTargetFaculties(pendingFaculties);
        setEditingFaculties(false);
      }
    } catch {}
    setSavingFaculty(false);
  }

  async function handleNameSave() {
    setNameError("");
    if (pendingName.length < 3 || pendingName.length > 20) {
      setNameError("3-20 karaktera.");
      return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(pendingName)) {
      setNameError("Samo slova, brojevi i _.");
      return;
    }
    setSavingName(true);
    try {
      const res = await fetch("/api/profile/name", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName: pendingName }),
      });
      if (res.ok) {
        setEditingName(false);
      } else {
        const data = await res.json();
        setNameError(data.error || "Greška.");
      }
    } catch {
      setNameError("Greška pri čuvanju.");
    }
    setSavingName(false);
  }

  function formatTime(s: number) {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }

  const avgScore =
    examHistory.length > 0
      ? (
          examHistory.reduce((sum: number, e: any) => sum + parseFloat(e.scorePercent || 0), 0) /
          examHistory.length
        ).toFixed(0)
      : "0";

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Profile Header */}
      <div className="mb-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
        <div className="flex items-start gap-5">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {user?.image ? (
              <img
                src={user.image}
                alt="Avatar"
                className="h-20 w-20 rounded-2xl border-2 border-amber-500/30 object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-500/10 border-2 border-amber-500/30">
                <User size={36} className="text-amber-400" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            {/* Display Name */}
            <div className="mb-1 flex items-center gap-2">
              {editingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={pendingName}
                    onChange={(e) => setPendingName(e.target.value)}
                    className="rounded-lg border border-amber-500/50 bg-[var(--color-bg)] px-3 py-1.5 text-lg font-bold text-[var(--color-text)] outline-none focus:border-amber-500"
                    maxLength={20}
                    autoFocus
                  />
                  <button
                    onClick={handleNameSave}
                    disabled={savingName}
                    className="rounded-lg bg-amber-500 p-1.5 text-black transition hover:bg-amber-400 disabled:opacity-50"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    onClick={() => { setEditingName(false); setNameError(""); }}
                    className="rounded-lg p-1.5 text-[var(--color-muted)] transition hover:bg-[var(--color-surface-lighter)]"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-[var(--color-text)]">
                    {user?.displayName || user?.name || "Profil"}
                  </h1>
                  <button
                    onClick={() => {
                      setPendingName(user?.displayName || user?.name || "");
                      setEditingName(true);
                    }}
                    className="rounded-lg p-1 text-[var(--color-muted)] transition hover:bg-[var(--color-surface-lighter)] hover:text-[var(--color-text)]"
                    title="Promeni ime"
                  >
                    <Pencil size={14} />
                  </button>
                </>
              )}
            </div>
            {nameError && <p className="mb-1 text-xs text-red-400">{nameError}</p>}

            {/* Email */}
            <p className="mb-2 flex items-center gap-1.5 text-sm text-[var(--color-muted)]">
              <Mail size={14} />
              {user?.email}
            </p>

            {/* Faculty display */}
            {facultyLoaded && (
              <div className="flex items-start gap-2">
                <Target size={14} className="mt-0.5 flex-shrink-0 text-amber-400" />
                {editingFaculties ? (
                  <div className="flex-1">
                    <FacultyMultiSelect
                      selected={pendingFaculties}
                      onChange={setPendingFaculties}
                    />
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={handleFacultySave}
                        disabled={savingFaculty || pendingFaculties.length === 0}
                        className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-amber-400 disabled:opacity-50"
                      >
                        {savingFaculty ? "Čuvanje..." : "Sačuvaj"}
                      </button>
                      <button
                        onClick={() => setEditingFaculties(false)}
                        className="rounded-lg px-4 py-2 text-sm text-[var(--color-muted)] transition hover:bg-[var(--color-surface-lighter)]"
                      >
                        Otkaži
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {targetFaculties.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {targetFaculties.map((id) => (
                          <span
                            key={id}
                            className="inline-flex items-center rounded-lg bg-amber-500/15 px-2.5 py-1 text-xs font-medium text-amber-400 border border-amber-500/25"
                          >
                            {id === "other"
                              ? "Ostalo"
                              : FACULTIES.find((f) => f.id === id)?.short || id}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm text-[var(--color-muted)]">
                        Fakultet nije izabran
                      </span>
                    )}
                    <button
                      onClick={() => {
                        setPendingFaculties([...targetFaculties]);
                        setEditingFaculties(true);
                      }}
                      className="rounded-lg p-1 text-[var(--color-muted)] transition hover:bg-[var(--color-surface-lighter)] hover:text-[var(--color-text)]"
                      title="Promeni fakultete"
                    >
                      <Pencil size={14} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {progress && (
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5">
            <BookOpen size={20} className="mb-2 text-amber-400" />
            <div className="text-2xl font-bold text-[var(--color-text)]">
              {progress.solved}
            </div>
            <div className="text-xs text-[var(--color-muted)]">Rešenih zadataka</div>
            {progress.total > 0 && (
              <div className="mt-1 text-xs text-amber-400">
                od {progress.total} ({((progress.solved / progress.total) * 100).toFixed(0)}%)
              </div>
            )}
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5">
            <Award size={20} className="mb-2 text-purple-400" />
            <div className="text-2xl font-bold text-[var(--color-text)]">
              {examHistory.length}
            </div>
            <div className="text-xs text-[var(--color-muted)]">Završenih ispita</div>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5">
            <TrendingUp size={20} className="mb-2 text-green-400" />
            <div className="text-2xl font-bold text-[var(--color-text)]">
              {avgScore}%
            </div>
            <div className="text-xs text-[var(--color-muted)]">Prosečan rezultat</div>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-5">
            <Clock size={20} className="mb-2 text-blue-400" />
            <div className="text-2xl font-bold text-[var(--color-text)]">
              {progress.streak || 0}
            </div>
            <div className="text-xs text-[var(--color-muted)]">Dana u nizu</div>
          </div>
        </div>
      )}

      {/* Exam History */}
      {examHistory.length > 0 && (
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[var(--color-text)]">
            <Clock size={20} />
            Istorija ispita
          </h2>
          <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-card)]">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border)] text-left text-[var(--color-muted)]">
                    <th className="px-4 py-3 font-medium">Fakultet</th>
                    <th className="px-4 py-3 font-medium">Datum</th>
                    <th className="px-4 py-3 text-right font-medium">Rezultat</th>
                    <th className="px-4 py-3 text-right font-medium">Tačnih</th>
                    <th className="hidden px-4 py-3 text-right font-medium sm:table-cell">Vreme</th>
                    <th className="hidden px-4 py-3 text-right font-medium md:table-cell">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {examHistory.map((e: any) => {
                    const pct = parseFloat(e.scorePercent || 0);
                    const statusLabel =
                      pct >= 80 ? "Odlično" : pct >= 60 ? "Dobro" : "Potrebna vežba";
                    const statusColor =
                      pct >= 80
                        ? "text-green-400 bg-green-500/10 border-green-500/20"
                        : pct >= 60
                        ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
                        : "text-red-400 bg-red-500/10 border-red-500/20";
                    return (
                      <tr key={e.id} className="border-b border-[var(--color-border)]/30">
                        <td className="px-4 py-3 text-[var(--color-text)]">{e.facultyName}</td>
                        <td className="px-4 py-3 text-[var(--color-muted)]">
                          {new Date(e.startedAt).toLocaleDateString("sr-Latn")}
                        </td>
                        <td className="px-4 py-3 text-right font-medium text-amber-400">
                          {pct.toFixed(0)}%
                        </td>
                        <td className="px-4 py-3 text-right text-[var(--color-muted)]">
                          {e.numCorrect}/
                          {(e.numCorrect || 0) + (e.numWrong || 0) + (e.numBlank || 0)}
                        </td>
                        <td className="hidden px-4 py-3 text-right text-[var(--color-muted)] sm:table-cell">
                          {e.timeSpent ? formatTime(e.timeSpent) : "\u2014"}
                        </td>
                        <td className="hidden px-4 py-3 text-right md:table-cell">
                          <span
                            className={`inline-block rounded-lg border px-2 py-0.5 text-xs font-medium ${statusColor}`}
                          >
                            {statusLabel}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {examHistory.length === 0 && progress && (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-8 text-center">
          <Award size={40} className="mx-auto mb-3 text-[var(--color-muted)]" />
          <p className="text-[var(--color-muted)]">
            Još nemaš završenih ispita. Uradi prvu simulaciju!
          </p>
        </div>
      )}
    </div>
  );
}
