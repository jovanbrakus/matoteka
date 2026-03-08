"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  ClipboardList,
  Edit3,
  Zap,
  Timer,
  Infinity,
  Play,
  X,
  Info,
  CheckCircle2,
  Shield,
} from "lucide-react";
import Link from "next/link";

type TestSize = 20 | 14 | 8;
type TestMode = "timed" | "untimed";

const TEST_SIZES: {
  size: TestSize;
  label: string;
  count: string;
  description: string;
  badge?: string;
  icon: typeof ClipboardList;
}[] = [
  {
    size: 20,
    label: "Kompletan test",
    count: "20 zadataka",
    description: "Simulacija mature",
    badge: "SIMULACIJA MATURE",
    icon: ClipboardList,
  },
  {
    size: 14,
    label: "Srednji test",
    count: "14 zadataka",
    description: "Svakodnevna vežba",
    icon: Edit3,
  },
  {
    size: 8,
    label: "Brzi test",
    count: "8 zadataka",
    description: "Brza provera",
    icon: Zap,
  },
];

function getDurationMinutes(testSize: TestSize): number {
  return Math.round((testSize / 20) * 180);
}

export default function SimulacijaPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [testSize, setTestSize] = useState<TestSize>(20);
  const [mode, setMode] = useState<TestMode>("timed");
  const [loading, setLoading] = useState(false);

  async function startSimulation() {
    setLoading(true);
    try {
      const res = await fetch("/api/simulation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testSize, mode }),
      });
      const data = await res.json();
      if (data.examId) {
        router.push(`/simulacija/${data.examId}`);
      }
    } catch (err) {
      console.error("Failed to start simulation:", err);
    }
    setLoading(false);
  }

  const durationMin = getDurationMinutes(testSize);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-[#0a0604]/85 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-3xl mx-4 rounded-3xl overflow-hidden shadow-2xl flex flex-col bg-[rgba(255,255,255,0.03)] backdrop-blur-xl border border-[#ec5b13]/10">
        {/* Decorative gradients */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#ec5b13]/10 blur-[100px] rounded-full -z-10" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full -z-10" />

        {/* Header */}
        <div className="px-8 pt-8 pb-4 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-black text-slate-100 tracking-tight">
              Započni simulaciju
            </h1>
            <p className="text-[#ec5b13] font-medium mt-1">
              Konfiguriši svoj test za maksimalni učinak
            </p>
          </div>
          <Link
            href="/"
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </Link>
        </div>

        <div className="p-8 space-y-8">
          {/* Step 1: Test Size */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Korak 1:
              </span>
              <h3 className="text-sm font-bold text-slate-300">
                VELIČINA TESTA
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {TEST_SIZES.map(({ size, label, count, description, badge, icon: Icon }) => {
                const isActive = testSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setTestSize(size)}
                    className={`rounded-2xl p-6 cursor-pointer text-left transition-all duration-300 ${
                      isActive
                        ? "bg-[#ec5b13]/10 border border-[#ec5b13]/50 shadow-[0_0_20px_rgba(236,91,19,0.15)]"
                        : "bg-[rgba(255,255,255,0.03)] border border-[#ec5b13]/10 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <Icon
                        size={32}
                        className={isActive ? "text-[#ec5b13]" : "text-slate-400"}
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isActive ? "border-[#ec5b13]" : "border-slate-600"
                        }`}
                      >
                        {isActive && (
                          <div className="w-2.5 h-2.5 bg-[#ec5b13] rounded-full" />
                        )}
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-white">{label}</h4>
                    <p className="text-slate-400 text-sm mt-1">{count}</p>
                    <div
                      className={`mt-4 pt-4 border-t ${
                        isActive ? "border-[#ec5b13]/20" : "border-white/5"
                      }`}
                    >
                      {badge ? (
                        <p className="text-xs text-[#ec5b13]/80 flex items-center gap-1 uppercase font-bold tracking-tighter">
                          <Shield size={12} /> {badge}
                        </p>
                      ) : (
                        <p className="text-xs text-slate-500 font-medium">
                          {description}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Step 2: Mode */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Korak 2:
              </span>
              <h3 className="text-sm font-bold text-slate-300">REŽIM RADA</h3>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Timed */}
              <button
                onClick={() => setMode("timed")}
                className={`flex-1 flex items-center justify-between p-4 rounded-xl transition-all ${
                  mode === "timed"
                    ? "border-2 border-[#ec5b13] bg-[#ec5b13]/5"
                    : "border border-white/10 bg-[rgba(255,255,255,0.03)] hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-lg ${
                      mode === "timed"
                        ? "bg-[#ec5b13]/20 text-[#ec5b13]"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    <Timer size={20} />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-white">Vremenski ograničen</p>
                    <p
                      className={`text-xs ${
                        mode === "timed" ? "text-[#ec5b13]/80" : "text-slate-500"
                      }`}
                    >
                      Ograničenje:{" "}
                      <span className="font-bold">{durationMin} min</span>
                    </p>
                  </div>
                </div>
                {mode === "timed" && (
                  <CheckCircle2 size={20} className="text-[#ec5b13]" />
                )}
              </button>

              {/* Untimed */}
              <button
                onClick={() => setMode("untimed")}
                className={`flex-1 flex items-center justify-between p-4 rounded-xl transition-all ${
                  mode === "untimed"
                    ? "border-2 border-[#ec5b13] bg-[#ec5b13]/5"
                    : "border border-white/10 bg-[rgba(255,255,255,0.03)] hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-lg ${
                      mode === "untimed"
                        ? "bg-[#ec5b13]/20 text-[#ec5b13]"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    <Infinity size={20} />
                  </div>
                  <div className="text-left">
                    <p
                      className={`font-bold ${
                        mode === "untimed" ? "text-white" : "text-slate-300"
                      }`}
                    >
                      Bez ograničenja
                    </p>
                    <p className="text-xs text-slate-500">Vežba bez stresa</p>
                  </div>
                </div>
                {mode === "untimed" && (
                  <CheckCircle2 size={20} className="text-[#ec5b13]" />
                )}
              </button>
            </div>
          </section>

          {/* Start Button */}
          <div className="pt-4 flex flex-col gap-4">
            <button
              onClick={startSimulation}
              disabled={loading}
              className="w-full bg-[#ec5b13] hover:bg-[#ec5b13]/90 text-white font-black text-lg py-5 rounded-2xl shadow-[0_0_15px_rgba(236,91,19,0.4)] transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? "Kreiranje testa..." : "ZAPOČNI TEST"}
              <Play size={20} />
            </button>
            <p className="text-center text-xs text-slate-500 flex items-center justify-center gap-1">
              <Info size={12} />
              Tvoj napredak će biti automatski sačuvan u profilu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
