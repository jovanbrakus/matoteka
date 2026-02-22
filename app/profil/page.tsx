"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { User, Target, Clock, Pencil } from "lucide-react";
import FacultyPickerDialog, { FACULTIES } from "@/components/ui/faculty-picker-dialog";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [progress, setProgress] = useState<any>(null);
  const [byFaculty, setByFaculty] = useState<any[]>([]);
  const [byTopic, setByTopic] = useState<any[]>([]);
  const [examHistory, setExamHistory] = useState<any[]>([]);
  const [currentFaculty, setCurrentFaculty] = useState<string | null>(null);
  const [showFacultyPicker, setShowFacultyPicker] = useState(false);
  const [savingFaculty, setSavingFaculty] = useState(false);
  const [facultyLoaded, setFacultyLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/progress").then((r) => r.json()).then(setProgress);
    fetch("/api/progress/by-faculty").then((r) => r.json()).then(setByFaculty);
    fetch("/api/progress/by-topic").then((r) => r.json()).then(setByTopic);
    fetch("/api/exams/history").then((r) => r.json()).then(setExamHistory);
    // Read current faculty from DB (always fresh)
    fetch("/api/profile/faculty")
      .then((r) => r.json())
      .then((data) => {
        setCurrentFaculty(data.targetFaculty || null);
        setFacultyLoaded(true);
        if (!data.targetFaculty) setShowFacultyPicker(true);
      });
  }, []);

  const user = session?.user as any;

  const facultyLabel = currentFaculty
    ? FACULTIES.find((f) => f.id === currentFaculty)?.name || currentFaculty.toUpperCase()
    : null;

  async function handleFacultySelect(facultyId: string) {
    setSavingFaculty(true);
    try {
      const res = await fetch("/api/profile/faculty", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetFaculty: facultyId }),
      });
      if (res.ok) {
        setCurrentFaculty(facultyId);
        setShowFacultyPicker(false);
      }
    } catch {}
    setSavingFaculty(false);
  }

  function formatTime(s: number) {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-1 text-2xl font-bold text-[#e2e8f0]">
          <User className="mr-2 inline" size={24} />
          {user?.displayName || user?.name || "Profil"}
        </h1>
        <p className="text-sm text-[#94a3b8]">{user?.email}</p>

        {/* Faculty display with edit button */}
        <div className="mt-2 flex items-center gap-2">
          {facultyLoaded && (
            <>
              <p className="text-sm text-[#60a5fa]">
                <Target className="mr-1 inline" size={14} />
                {facultyLabel || "Fakultet nije izabran"}
              </p>
              <button
                onClick={() => setShowFacultyPicker(true)}
                className="rounded-md p-1 text-[#94a3b8] transition hover:bg-[#334155] hover:text-[#e2e8f0]"
                title="Promeni fakultet"
              >
                <Pencil size={14} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Stats cards */}
      {progress && (
        <div className="mb-8 grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-[#334155] bg-[#1e293b] p-5 text-center">
            <div className="text-2xl font-bold text-[#60a5fa]">{progress.solved}/{progress.total}</div>
            <div className="text-xs text-[#94a3b8]">Zadaci rešeni</div>
            <div className="text-xs text-[#64748b]">{progress.total > 0 ? ((progress.solved / progress.total) * 100).toFixed(0) : 0}%</div>
          </div>
          <div className="rounded-xl border border-[#334155] bg-[#1e293b] p-5 text-center">
            <div className="text-2xl font-bold text-[#a78bfa]">{examHistory.length}</div>
            <div className="text-xs text-[#94a3b8]">Ispita</div>
          </div>
          <div className="rounded-xl border border-[#334155] bg-[#1e293b] p-5 text-center">
            <div className="text-2xl font-bold text-[#4ade80]">
              {examHistory.length > 0
                ? (examHistory.reduce((sum: number, e: any) => sum + parseFloat(e.scorePercent || 0), 0) / examHistory.length).toFixed(0)
                : 0}%
            </div>
            <div className="text-xs text-[#94a3b8]">Prosek</div>
          </div>
        </div>
      )}

      {/* Progress by faculty */}
      {byFaculty.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-[#e2e8f0]">Napredak po fakultetu</h2>
          <div className="space-y-3">
            {byFaculty.map((f: any) => {
              const pct = f.total > 0 ? (f.solved / f.total) * 100 : 0;
              return (
                <div key={f.faculty_id}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-[#e2e8f0]">{f.short_name}</span>
                    <span className="text-[#94a3b8]">{pct.toFixed(0)}% ({f.solved}/{f.total})</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#1e293b]">
                    <div className="h-full rounded-full bg-[#60a5fa]" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Progress by topic */}
      {byTopic.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-[#e2e8f0]">Napredak po temi</h2>
          <div className="space-y-3">
            {byTopic.slice(0, 10).map((t: any) => {
              const pct = t.total > 0 ? (t.solved / t.total) * 100 : 0;
              return (
                <div key={t.topic_id}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-[#e2e8f0]">{t.name}</span>
                    <span className="text-[#94a3b8]">{pct.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#1e293b]">
                    <div className="h-full rounded-full bg-[#a78bfa]" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Exam history */}
      {examHistory.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-[#e2e8f0]">Istorija ispita</h2>
          <div className="overflow-hidden rounded-xl border border-[#334155] bg-[#1e293b]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#334155] text-left text-[#94a3b8]">
                  <th className="px-4 py-3">Fakultet</th>
                  <th className="px-4 py-3">Datum</th>
                  <th className="px-4 py-3 text-right">Rezultat</th>
                  <th className="px-4 py-3 text-right">Tačnih</th>
                  <th className="hidden px-4 py-3 text-right sm:table-cell">Vreme</th>
                </tr>
              </thead>
              <tbody>
                {examHistory.map((e: any) => (
                  <tr key={e.id} className="border-b border-[#334155]/50">
                    <td className="px-4 py-3 text-[#e2e8f0]">{e.facultyName}</td>
                    <td className="px-4 py-3 text-[#94a3b8]">
                      {new Date(e.startedAt).toLocaleDateString("sr-Latn")}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-[#60a5fa]">
                      {parseFloat(e.scorePercent || 0).toFixed(0)}%
                    </td>
                    <td className="px-4 py-3 text-right text-[#94a3b8]">
                      {e.numCorrect}/{(e.numCorrect || 0) + (e.numWrong || 0) + (e.numBlank || 0)}
                    </td>
                    <td className="hidden px-4 py-3 text-right text-[#94a3b8] sm:table-cell">
                      {e.timeSpent ? formatTime(e.timeSpent) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Faculty picker dialog */}
      <FacultyPickerDialog
        open={showFacultyPicker}
        current={currentFaculty}
        onSelect={handleFacultySelect}
        onClose={() => setShowFacultyPicker(false)}
        loading={savingFaculty}
      />
    </div>
  );
}
