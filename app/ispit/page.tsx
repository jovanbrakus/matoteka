"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ClipboardList, Clock, Hash, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Faculty {
  id: string;
  shortName: string;
  name: string;
  examDuration: number;
  examNumProblems: number;
}

export default function ExamSetupPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user as any;
  const [faculty, setFaculty] = useState<Faculty | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchingFaculty, setFetchingFaculty] = useState(true);

  // Read user's current targetFaculties from DB (fresh) and get its config
  useEffect(() => {
    async function load() {
      try {
        const [profileRes, facultiesRes] = await Promise.all([
          fetch("/api/profile/faculty"),
          fetch("/api/faculties"),
        ]);
        const profile = await profileRes.json();
        const allFaculties: Faculty[] = await facultiesRes.json();

        const facIds = (profile.targetFaculties as string[]) || [];
        const primaryFaculty = facIds.find(f => f !== "other");
        if (primaryFaculty) {
          const match = allFaculties.find((f) => f.id === primaryFaculty);
          if (match) setFaculty(match);
        }
      } catch {}
      setFetchingFaculty(false);
    }
    load();
  }, []);

  async function startExam() {
    setLoading(true);
    const res = await fetch("/api/exams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    const data = await res.json();
    if (data.examId) {
      router.push(`/ispit/${data.examId}`);
    }
    setLoading(false);
  }

  if (fetchingFaculty) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-card" />
        <div className="mt-4 h-40 animate-pulse rounded-2xl bg-card" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold text-text">
        <ClipboardList className="mr-2 inline" size={28} />
        Probni prijemni ispit
      </h1>
      <p className="mb-8 text-text-secondary">
        Simulacija prijemnog ispita sa nasumičnim zadacima iz cele baze.
      </p>

      {!faculty ? (
        /* No faculty set — prompt user to set one */
        <div className="rounded-2xl border border-[#fbbf24]/30 bg-[#fbbf24]/5 p-6">
          <div className="mb-3 flex items-center gap-2 text-[#fbbf24]">
            <AlertCircle size={20} />
            <span className="font-semibold">Fakultet nije izabran</span>
          </div>
          <p className="mb-4 text-sm text-text-secondary">
            Da bismo podesili trajanje i broj zadataka na ispitu, potrebno je da izabereš
            fakultet za koji se spremaš.
          </p>
          <Link
            href="/profil"
            className="inline-flex items-center gap-2 rounded-xl bg-[#fbbf24] px-5 py-2.5 text-sm font-semibold text-heading transition hover:bg-[#f59e0b]"
          >
            Izaberi u profilu <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <>
          {/* Exam info card */}
          <div className="mb-6 rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold text-text">
              Format ispita — {faculty.shortName}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-bg/60 p-4 text-center">
                <Hash size={20} className="mx-auto mb-1 text-[#60a5fa]" />
                <div className="text-2xl font-bold text-text">{faculty.examNumProblems}</div>
                <div className="text-xs text-text-secondary">zadataka</div>
              </div>
              <div className="rounded-xl bg-bg/60 p-4 text-center">
                <Clock size={20} className="mx-auto mb-1 text-[#a78bfa]" />
                <div className="text-2xl font-bold text-text">{faculty.examDuration}</div>
                <div className="text-xs text-text-secondary">minuta</div>
              </div>
            </div>
          </div>

          <div className="mb-6 rounded-xl border border-border bg-card p-4 text-sm text-text-secondary">
            Zadaci se nasumično biraju iz cele baze. Tajmer počinje odmah!
          </div>

          <button
            onClick={startExam}
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] px-8 py-4 text-lg font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Pokretanje..." : "Započni ispit"}
          </button>
        </>
      )}
    </div>
  );
}
