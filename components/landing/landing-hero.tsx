import Link from "next/link";
import { BookOpen, ClipboardList, Trophy, Bot, CheckCircle, BarChart3 } from "lucide-react";

export default function LandingHero() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      {/* Hero */}
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">
          <span className="bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] bg-clip-text text-transparent">
            Pripremi se za prijemni ispit
          </span>
        </h1>
        <p className="mb-8 text-lg text-[#94a3b8] md:text-xl">
          sa 600+ rešenih zadataka iz matematike
        </p>

        <Link
          href="/prijava"
          className="inline-flex items-center gap-2 rounded-xl bg-[#60a5fa] px-8 py-4 text-lg font-semibold text-white transition hover:bg-[#3b82f6]"
        >
          Počni besplatno
        </Link>
      </div>

      {/* Stats */}
      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
        {[
          { value: "600+", label: "rešenih zadataka" },
          { value: "3+", label: "fakulteta" },
          { value: "Besplatno", label: "u prvoj sezoni" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-[#334155] bg-[#1e293b] p-6 text-center"
          >
            <div className="text-3xl font-bold text-[#60a5fa]">{s.value}</div>
            <div className="mt-1 text-[#94a3b8]">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            icon: BookOpen,
            title: "Rešeni zadaci",
            desc: "Kompletna rešenja sa teorijom, korak-po-korak objašnjenjima i vizuelizacijama.",
          },
          {
            icon: ClipboardList,
            title: "Probni ispiti",
            desc: "Simuliraj pravi prijemni ispit sa tajmerom i automatskim ocenjivanjem.",
          },
          {
            icon: Trophy,
            title: "Rang lista",
            desc: "Takmič se sa drugim učenicima i prati svoj napredak.",
          },
          {
            icon: Bot,
            title: "AI Tutor",
            desc: "Pitaj AI da ti objasni korak, reši sličan zadatak ili pomogne sa tvojim zadatkom.",
          },
          {
            icon: CheckCircle,
            title: "Praćenje napretka",
            desc: "Označi zadatke kao rešene i prati napredak po fakultetu i temi.",
          },
          {
            icon: BarChart3,
            title: "Statistika",
            desc: "Detaljni uvid u tvoje rezultate, proseke i napredovanje tokom vremena.",
          },
        ].map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="rounded-xl border border-[#334155] bg-[#1e293b] p-6"
          >
            <Icon className="mb-3 text-[#60a5fa]" size={28} />
            <h3 className="mb-2 text-lg font-semibold text-[#e2e8f0]">
              {title}
            </h3>
            <p className="text-sm text-[#94a3b8]">{desc}</p>
          </div>
        ))}
      </div>

      {/* Faculty badges */}
      <div className="mt-16 text-center">
        <h2 className="mb-6 text-2xl font-bold text-[#e2e8f0]">
          Zadaci sa prijemnih ispita
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {["ETF", "FON", "RGF"].map((f) => (
            <span
              key={f}
              className="rounded-full border border-[#334155] bg-[#1e293b] px-4 py-2 text-sm font-medium text-[#60a5fa]"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
