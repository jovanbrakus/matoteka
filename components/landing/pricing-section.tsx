"use client";

import { useState } from "react";
import Link from "next/link";

const PLANS = {
  standard: {
    name: "Standard",
    icon: "menu_book",
    badge: null,
    monthly: "Besplatno",
    seasonal: "Besplatno",
    monthlyNote: null,
    seasonalNote: null,
    features: [
      "Pristup kompletnoj bazi zadataka za pripremu prijemnih ispita (4000+ zadataka)",
    ],
    cta: "Aktiviraj besplatno",
    ctaStyle: "border border-[var(--glass-border)] bg-[var(--tint)] text-heading hover:bg-[var(--tint-strong)]",
    highlight: false,
  },
  premium: {
    name: "Premium",
    icon: "workspace_premium",
    badge: "Besplatno u sezoni 2026",
    monthly: "2.000 din/mes",
    seasonal: "5.000 din/sezona",
    monthlyNote: "Besplatno u sezoni 2026",
    seasonalNote: "Besplatno u sezoni 2026",
    features: [
      "Sve iz Standard paketa",
      "Rešenja svih zadataka sa objašnjenjem",
      "59 interaktivnih lekcija sa laboratorijumima",
      "Simulacija ispita sa tajmerom",
      "Procena znanja i rang lista",
      "Napredna analitika uspeha",
    ],
    cta: "Aktiviraj besplatno",
    ctaStyle: "bg-[#ec5b13] text-white shadow-[0_0_20px_rgba(236,91,19,0.2)] hover:bg-[#ff7a3d]",
    highlight: true,
  },
  ai: {
    name: "AI Tutor",
    icon: "smart_toy",
    badge: "Uskoro — 2027",
    monthly: "3.000 din/mes",
    seasonal: "8.000 din/sezona",
    monthlyNote: null,
    seasonalNote: null,
    features: [
      "Sve iz Premium paketa",
      "AI tutor za pitanja iz matematike",
      "Rešavanje bilo kog zadatka na zahtev",
      "Detaljnija objašnjenja koraka rešenja",
      "Personalizovane preporuke za učenje",
    ],
    cta: "Obavesti me",
    ctaStyle: "border border-cyan-500/30 bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20",
    highlight: false,
  },
};

export default function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "seasonal">("seasonal");
  const [showAiDialog, setShowAiDialog] = useState(false);

  return (
    <section className="relative py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-full -translate-x-1/2 -translate-y-1/2 bg-[#ec5b13]/20 opacity-30 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-8 text-6xl font-black text-heading md:text-7xl">
            Tvoja{" "}
            <span className="text-[#ec5b13]">budućnost</span>{" "}
            počinje ovde.
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-text-secondary">
            Ne ostavljaj upis slučaju. Pridruži se stotinama učenika koji
            osvajaju mesta na najboljim tehničkim fakultetima u Srbiji i regionu.
          </p>

          {/* Billing toggle */}
          <div className="mx-auto mb-12 inline-flex items-center gap-1 rounded-full border border-[var(--glass-border)] bg-[var(--tint)] p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all ${
                billing === "monthly"
                  ? "bg-[#ec5b13]/20 text-[#ec5b13]"
                  : "text-muted hover:text-heading"
              }`}
            >
              Mesečno
            </button>
            <button
              onClick={() => setBilling("seasonal")}
              className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all ${
                billing === "seasonal"
                  ? "bg-[#ec5b13]/20 text-[#ec5b13]"
                  : "text-muted hover:text-heading"
              }`}
            >
              Sezonski
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {Object.values(PLANS).map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-[2rem] border p-8 transition-all ${
                plan.highlight
                  ? "border-[#ec5b13]/30 bg-[#ec5b13]/[0.03] shadow-[0_0_60px_rgba(236,91,19,0.08)]"
                  : "border-[var(--glass-border)] glass-card"
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold ${
                    plan.name === "Premium"
                      ? "bg-[#ec5b13] text-white"
                      : "bg-cyan-500/20 text-cyan-500 border border-cyan-500/30"
                  }`}>
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="mb-6 flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                  plan.highlight ? "bg-[#ec5b13]/15" : "bg-[var(--tint-strong)]"
                }`}>
                  <span className={`material-symbols-outlined text-2xl ${
                    plan.name === "AI Tutor" ? "text-cyan-500" : "text-[#ec5b13]"
                  }`}>
                    {plan.icon}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-heading">{plan.name}</h3>
              </div>

              {/* Price */}
              <div className="mb-8">
                {(() => {
                  const price = billing === "monthly" ? plan.monthly : plan.seasonal;
                  const note = billing === "monthly" ? plan.monthlyNote : plan.seasonalNote;
                  if (note) {
                    return (
                      <>
                        <p className="text-sm line-through text-muted">{price}</p>
                        <p className="text-3xl font-black text-[#ec5b13]">Besplatno</p>
                        <p className="mt-1 text-sm font-semibold text-[#ec5b13]">{note}</p>
                      </>
                    );
                  }
                  return <p className="text-3xl font-black text-heading">{price}</p>;
                })()}
              </div>

              {/* Features */}
              <ul className="mb-8 flex-grow space-y-3">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className={`material-symbols-outlined mt-0.5 text-base ${
                      i === 0 && plan.name !== "Standard"
                        ? "text-[#ec5b13]"
                        : "text-text-secondary"
                    }`}>
                      {i === 0 && plan.name !== "Standard" ? "add_circle" : "check_circle"}
                    </span>
                    <span className={`${
                      i === 0 && plan.name !== "Standard"
                        ? "font-bold text-[#ec5b13]"
                        : "text-text-secondary"
                    }`}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {plan.name === "AI Tutor" ? (
                <button
                  onClick={() => setShowAiDialog(true)}
                  className={`block w-full rounded-xl px-6 py-3.5 text-center text-sm font-bold transition-all ${plan.ctaStyle}`}
                >
                  {plan.cta}
                </button>
              ) : (
                <Link
                  href="/prijava"
                  className={`block rounded-xl px-6 py-3.5 text-center text-sm font-bold transition-all ${plan.ctaStyle}`}
                >
                  {plan.cta}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Faculty logos */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-12 opacity-50 transition-all duration-700 grayscale hover:opacity-100 hover:grayscale-0">
          {[
            ["school", "ETF"],
            ["science", "FON"],
            ["calculate", "MATF"],
            ["precision_manufacturing", "MAŠF"],
            ["apartment", "GRF"],
            ["settings", "RGF"],
            ["biotech", "TMF"],
            ["commute", "SF"],
            ["experiment", "FF"],
          ].map(([icon, name]) => (
            <div key={name} className="flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl">{icon}</span>
              <span className="font-bold">{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Tutor Dialog */}
      {showAiDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={() => setShowAiDialog(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border border-[var(--glass-border)] bg-card p-8 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAiDialog(false)}
              className="absolute right-4 top-4 text-muted hover:text-heading transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/15">
                <span className="material-symbols-outlined text-4xl text-cyan-500">smart_toy</span>
              </div>
            </div>

            <h3 className="mb-3 text-2xl font-black text-heading">AI Tutor stiže 2027!</h3>
            <p className="mb-6 leading-relaxed text-text-secondary">
              Radimo na ličnom AI tutoru koji će moći da odgovori na svako tvoje
              pitanje iz matematike, reši bilo koji zadatak korak po korak i
              prilagodi objašnjenja tvom nivou znanja.
            </p>
            <p className="mb-8 text-sm text-text-secondary">
              Kreiraj <strong className="text-heading">besplatan Premium nalog</strong> već
              danas i bićeš među prvima koji će dobiti pristup kada AI Tutor bude spreman.
            </p>

            <div className="flex flex-col gap-3">
              <Link
                href="/prijava"
                className="block rounded-xl bg-[#ec5b13] px-6 py-3.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(236,91,19,0.2)] transition-all hover:bg-[#ff7a3d]"
                onClick={() => setShowAiDialog(false)}
              >
                Kreiraj besplatan nalog
              </Link>
              <button
                onClick={() => setShowAiDialog(false)}
                className="rounded-xl px-6 py-3 text-sm font-medium text-muted transition-colors hover:text-heading"
              >
                Možda kasnije
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
