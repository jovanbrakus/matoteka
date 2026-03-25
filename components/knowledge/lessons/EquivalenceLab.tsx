"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import InlineMath from "@/components/knowledge/InlineMath";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

/* ─── Types & data ─── */

interface ScenarioRow {
  p: boolean;
  q: boolean | null;
}

interface SingleScenario {
  title: string;
  mode: "single";
  description: string;
  rules: string[];
  headers: string[];
  rows: ScenarioRow[];
  value: (row: ScenarioRow) => boolean;
  explain: (row: ScenarioRow) => string;
  summary: () => string;
}

interface PairScenario {
  title: string;
  mode: "pair";
  description: string;
  rules: string[];
  headers: string[];
  rows: ScenarioRow[];
  left: (row: ScenarioRow) => boolean;
  right: (row: ScenarioRow) => boolean;
  explain: (row: ScenarioRow) => string;
  summary: () => string;
}

type Scenario = SingleScenario | PairScenario;

const SCENARIOS: Record<string, Scenario> = {
  excludedMiddle: {
    title: "p \\lor \\neg p",
    mode: "single",
    description:
      "U svakom redu makar jedan od iskaza p ili \\neg p mora biti tačan, zato je ovo klasična tautologija.",
    rules: [
      "Tautologija znači da je poslednja kolona svuda T.",
      "Ovde postoji samo jedna osnovna promenljiva p.",
      "Negacija samo menja vrednost iskaza.",
    ],
    headers: ["Red", "p", "\\neg p", "formula", "status"],
    rows: [
      { p: true, q: null },
      { p: false, q: null },
    ],
    value: (row) => row.p || !row.p,
    explain: (row) =>
      row.p
        ? "Kada je p = T, već je prvi član disjunkcije tačan, pa je cela formula tačna."
        : "Kada je p = N, negacija \\neg p postaje tačna, pa je disjunkcija opet tačna.",
    summary: () => "Poslednja kolona je svuda T, pa je ovo tautologija.",
  },
  deMorgan1: {
    title: "\\neg(p \\lor q) i (\\neg p) \\land (\\neg q)",
    mode: "pair",
    description:
      "Ovde proveravamo da li negacija disjunkcije daje isti rezultat kao konjunkcija negacija.",
    rules: [
      "Dve formule su ekvivalentne ako su obe poslednje kolone iste.",
      "Negacija menja vrednost svakog osnovnog iskaza.",
      "Ovo je prvi De Morganov zakon.",
    ],
    headers: ["Red", "p", "q", "leva", "desna", "isto?"],
    rows: [
      { p: true, q: true },
      { p: true, q: false },
      { p: false, q: true },
      { p: false, q: false },
    ],
    left: (row) => !(row.p || !!row.q),
    right: (row) => !row.p && !row.q,
    explain: (row) => {
      const l = !(row.p || !!row.q);
      const r = !row.p && !row.q;
      return `U ovom redu leva formula daje ${l ? "T" : "N"}, a desna formula takođe daje ${r ? "T" : "N"}. Zato se u ovom redu poklapaju.`;
    },
    summary: () =>
      "Sve vrednosti se poklapaju, pa važi ekvivalencija \\neg(p \\lor q) \\Leftrightarrow (\\neg p) \\land (\\neg q).",
  },
  implicationForm: {
    title: "p \\Rightarrow q i \\neg p \\lor q",
    mode: "pair",
    description:
      "Ovo je standardni način da ukloniš implikaciju iz formule.",
    rules: [
      "Implikacija je netačna samo kada je p = T i q = N.",
      "Disjunkcija \\neg p \\lor q je netačna baš u istom redu.",
      "Zato su formule ekvivalentne.",
    ],
    headers: ["Red", "p", "q", "leva", "desna", "isto?"],
    rows: [
      { p: true, q: true },
      { p: true, q: false },
      { p: false, q: true },
      { p: false, q: false },
    ],
    left: (row) => !row.p || !!row.q,
    right: (row) => !row.p || !!row.q,
    explain: (row) =>
      row.p && !row.q
        ? "Ovo je jedini red u kome su i p \\Rightarrow q i \\neg p \\lor q netačni. Baš zato su formule ekvivalentne."
        : "U ovom redu obe formule daju isti rezultat, pa se poklapaju i ovde.",
    summary: () =>
      "Obe kolone su identične, zato važi ekvivalencija p \\Rightarrow q \\Leftrightarrow \\neg p \\lor q.",
  },
  contraposition: {
    title: "p \\Rightarrow q i \\neg q \\Rightarrow \\neg p",
    mode: "pair",
    description:
      "Kontrapozicija ne menja logičku snagu iskaza. To je prava ekvivalencija, ne samo slična forma.",
    rules: [
      "Ne mešaj kontrapoziciju sa konverzijom q \\Rightarrow p.",
      "Ovde proveravamo p \\Rightarrow q i \\neg q \\Rightarrow \\neg p.",
      "Ako su kolone iste, dobijaš legitimnu zamenu.",
    ],
    headers: ["Red", "p", "q", "leva", "desna", "isto?"],
    rows: [
      { p: true, q: true },
      { p: true, q: false },
      { p: false, q: true },
      { p: false, q: false },
    ],
    left: (row) => !row.p || !!row.q,
    right: (row) => !!row.q || !row.p,
    explain: () =>
      "U ovom redu i izvorna implikacija i njena kontrapozicija daju isti rezultat, što je znak prave ekvivalencije.",
    summary: () =>
      "Sve vrednosti se poklapaju, pa važi p \\Rightarrow q \\Leftrightarrow \\neg q \\Rightarrow \\neg p.",
  },
  notEquivalent: {
    title: "p \\lor q i p \\land q",
    mode: "pair",
    description:
      "Ovaj scenario namerno pokazuje dve formule koje nisu ekvivalentne.",
    rules: [
      "Dovoljan je jedan red razlike da formule ne budu ekvivalentne.",
      "Disjunkcija traži bar jedan tačan deo.",
      "Konjunkcija traži oba tačna dela.",
    ],
    headers: ["Red", "p", "q", "leva", "desna", "isto?"],
    rows: [
      { p: true, q: true },
      { p: true, q: false },
      { p: false, q: true },
      { p: false, q: false },
    ],
    left: (row) => row.p || !!row.q,
    right: (row) => row.p && !!row.q,
    explain: (row) =>
      (row.p || !!row.q) !== (row.p && !!row.q)
        ? "Baš u ovom redu formule se razlikuju: disjunkcija daje drugi rezultat od konjunkcije, pa ekvivalencija pada."
        : "U ovom redu su slučajno iste, ali to nije dovoljno. Treba da budu iste u svim redovima.",
    summary: () =>
      "Postoji više redova u kojima se kolone razlikuju, zato ove formule nisu ekvivalentne.",
  },
};

const SCENARIO_KEYS = [
  "excludedMiddle",
  "deMorgan1",
  "implicationForm",
  "contraposition",
  "notEquivalent",
] as const;

const SCENARIO_LABELS: Record<string, string> = {
  excludedMiddle: "p \\lor \\neg p",
  deMorgan1: "De Morgan 1",
  implicationForm: "p \\Rightarrow q ~ \\text{i} ~ \\neg p \\lor q",
  contraposition: "Kontrapozicija",
  notEquivalent: "Primer bez ekvivalencije",
};

function boolLabel(v: boolean): string {
  return v ? "T" : "N";
}

/* ─── Component ─── */

export default function EquivalenceLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeKey, setActiveKey] = useState<string>("excludedMiddle");
  const [activeRow, setActiveRow] = useState(0);
  const rowHitsRef = useRef<{ x: number; y: number; w: number; h: number; index: number }[]>([]);

  const scenario = SCENARIOS[activeKey];

  /* ---- draw ---- */
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const isLight = document.documentElement.classList.contains("light");

    // Theme-aware palette
    const T = {
      bg1: isLight ? "#f5f0eb" : "#160906",
      bg2: isLight ? "#ebe5df" : "#0b0403",
      text: isLight ? "#2a2420" : "#f6eee9",
      muted: isLight ? "#7a6f68" : "#cdb8aa",
      accent: isLight ? "#d94e0a" : "#ffb488",
      success: isLight ? "#1a9e6e" : "#67d7ad",
      rowBg: isLight ? "rgba(0,0,0,0.01)" : "rgba(255,255,255,0.01)",
      rowSelBg: isLight ? "rgba(236,91,19,0.10)" : "rgba(236,91,19,0.16)",
      rowSelBorder: isLight ? "rgba(236,91,19,0.25)" : "rgba(255,154,106,0.34)",
      rowBorder: isLight ? "rgba(0,0,0,0.06)" : "rgba(236,91,19,0.08)",
      headerBg: "rgba(236,91,19,0.10)",
      headerBorder: isLight ? "rgba(236,91,19,0.10)" : "rgba(236,91,19,0.14)",
      pillBg: isLight ? "rgba(236,91,19,0.12)" : "rgba(236,91,19,0.16)",
      pillBorder: isLight ? "rgba(236,91,19,0.20)" : "rgba(255,154,106,0.30)",
      tableBorder: isLight ? "rgba(0,0,0,0.06)" : "rgba(236,91,19,0.14)",
      trueBg: isLight ? "rgba(26,158,110,0.12)" : "rgba(103,215,173,0.14)",
      trueBorder: isLight ? "rgba(26,158,110,0.30)" : "rgba(103,215,173,0.34)",
      falseBg: isLight ? "rgba(217,78,10,0.10)" : "rgba(255,180,136,0.14)",
      falseBorder: isLight ? "rgba(217,78,10,0.25)" : "rgba(255,180,136,0.34)",
    };

    const rect = canvas.getBoundingClientRect();
    const W = Math.max(320, Math.floor(rect.width));
    const H = 470;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    canvas.style.height = H + "px";

    const rowHits: typeof rowHitsRef.current = [];

    /* background */
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, T.bg1);
    bg.addColorStop(1, T.bg2);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    /* title */
    ctx.fillStyle = T.text;
    ctx.font = '800 24px "Public Sans", system-ui, sans-serif';
    ctx.textAlign = "left";
    ctx.fillText("Laboratorija ekvivalencije", 26, 42);

    ctx.fillStyle = T.muted;
    ctx.font = '400 14px "Public Sans", system-ui, sans-serif';
    ctx.fillText("Klikni red koji želiš da analiziraš", 26, 66);

    /* badge */
    const badgeText = scenario.mode === "single" ? "provera tautologije" : "provera ekvivalencije";
    const pillW = 166;
    const pillH = 34;
    const pillX = W - pillW - 30;
    ctx.beginPath();
    ctx.roundRect(pillX, 24, pillW, pillH, 999);
    ctx.fillStyle = T.pillBg;
    ctx.fill();
    ctx.strokeStyle = T.pillBorder;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = T.text;
    ctx.font = '700 14px "Public Sans", system-ui, sans-serif';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(badgeText, pillX + pillW / 2, 24 + pillH / 2 + 0.5);

    /* table */
    const left = 26;
    const top = 96;
    const tableWidth = W - 52;
    const headerHeight = 48;
    const rowHeight = 62;
    const colCount = scenario.headers.length;
    const colWidths =
      colCount === 5
        ? [70, 80, 100, 150, tableWidth - 400]
        : [70, 70, 70, 110, 110, tableWidth - 430];

    ctx.beginPath();
    ctx.roundRect(left, top, tableWidth, headerHeight + rowHeight * scenario.rows.length, 22);
    ctx.fillStyle = isLight ? "rgba(0,0,0,0.02)" : "rgba(255,255,255,0.02)";
    ctx.fill();
    ctx.strokeStyle = T.tableBorder;
    ctx.lineWidth = 1;
    ctx.stroke();

    /* headers */
    let x = left;
    scenario.headers.forEach((header, idx) => {
      const w = colWidths[idx];
      ctx.fillStyle = T.headerBg;
      ctx.fillRect(x, top, w, headerHeight);
      ctx.strokeStyle = T.headerBorder;
      ctx.strokeRect(x, top, w, headerHeight);
      ctx.fillStyle = T.accent;
      ctx.font = '700 13px "Public Sans", system-ui, sans-serif';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(header, x + w / 2, top + headerHeight / 2);
      x += w;
    });

    const drawPill = (px: number, py: number, pw: number, ph: number, fill: string, stroke: string, text: string, color: string) => {
      ctx.beginPath();
      ctx.roundRect(px, py, pw, ph, 999);
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.strokeStyle = stroke;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.font = '700 14px "Public Sans", system-ui, sans-serif';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, px + pw / 2, py + ph / 2 + 0.5);
    };

    /* rows */
    scenario.rows.forEach((row, idx) => {
      const y = top + headerHeight + idx * rowHeight;
      const selected = idx === activeRow;
      rowHits.push({ x: left, y, w: tableWidth, h: rowHeight, index: idx });

      ctx.fillStyle = selected ? T.rowSelBg : T.rowBg;
      ctx.fillRect(left, y, tableWidth, rowHeight);
      ctx.strokeStyle = selected ? T.rowSelBorder : T.rowBorder;
      ctx.strokeRect(left, y, tableWidth, rowHeight);

      let cells: string[];
      if (scenario.mode === "single") {
        const notP = !row.p;
        const result = (scenario as SingleScenario).value(row);
        cells = [String(idx + 1), boolLabel(row.p), boolLabel(notP), boolLabel(result), result ? "uvek drži" : "pada"];
      } else {
        const leftVal = (scenario as PairScenario).left(row);
        const rightVal = (scenario as PairScenario).right(row);
        cells = [String(idx + 1), boolLabel(row.p), boolLabel(!!row.q), boolLabel(leftVal), boolLabel(rightVal), leftVal === rightVal ? "da" : "ne"];
      }

      let cx = left;
      cells.forEach((cell, ci) => {
        const w = colWidths[ci];
        const centerX = cx + w / 2;
        const isBool =
          (scenario.mode === "single" && (ci === 1 || ci === 2 || ci === 3)) ||
          (scenario.mode === "pair" && ci >= 1 && ci <= 4);
        const isDecision =
          (scenario.mode === "single" && ci === 4) ||
          (scenario.mode === "pair" && ci === 5);

        if (isBool) {
          const truthy = cell === "T";
          drawPill(
            centerX - 24, y + 16, 48, 30,
            truthy ? T.trueBg : T.falseBg,
            truthy ? T.trueBorder : T.falseBorder,
            cell,
            truthy ? T.success : T.accent
          );
        } else if (isDecision) {
          const good = cell === "da" || cell === "uvek drži";
          drawPill(
            centerX - 32, y + 16, 64, 30,
            good ? T.trueBg : T.falseBg,
            good ? T.trueBorder : T.falseBorder,
            cell,
            good ? T.success : T.accent
          );
        } else {
          ctx.fillStyle = T.text;
          ctx.font = '700 15px "Public Sans", system-ui, sans-serif';
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(cell, centerX, y + rowHeight / 2);
        }
        cx += w;
      });
    });

    /* footer hint */
    ctx.fillStyle = T.muted;
    ctx.font = '400 13px "Public Sans", system-ui, sans-serif';
    ctx.textAlign = "left";
    ctx.fillText(
      "Za ekvivalenciju gledaj da li su poslednje dve kolone iste u svim redovima.",
      28,
      H - 22
    );

    rowHitsRef.current = rowHits;
  }, [scenario, activeRow]);

  useEffect(() => {
    draw();
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    // Redraw when theme changes
    const observer = new MutationObserver(() => draw());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => { window.removeEventListener("resize", onResize); observer.disconnect(); };
  }, [draw]);

  const handlePointer = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const source = "touches" in e ? e.touches[0] : e;
    const px = source.clientX - rect.left;
    const py = source.clientY - rect.top;
    const hit = rowHitsRef.current.find(
      (r) => px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h
    );
    if (hit) setActiveRow(hit.index);
  };

  return (
    <>
      {/* scenario buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 18 }}>
        {SCENARIO_KEYS.map((key) => (
          <button
            key={key}
            className={s.presetBtn}
            style={
              activeKey === key
                ? { background: "rgba(236,91,19,0.22)", borderColor: "rgba(255,154,106,0.40)" }
                : undefined
            }
            onClick={() => {
              setActiveKey(key);
              setActiveRow(0);
            }}
          >
            <InlineMath>{SCENARIO_LABELS[key]}</InlineMath>
          </button>
        ))}
      </div>

      {/* canvas */}
      <div className={s.canvasWrap}>
        <canvas
          ref={canvasRef}
          className={s.polarCanvas}
          style={{ aspectRatio: "16 / 7", cursor: "pointer" }}
          onClick={handlePointer}
          onTouchStart={(e) => {
            e.preventDefault();
            handlePointer(e);
          }}
        />
        <p style={{ color: "var(--lesson-muted)", fontSize: "0.92rem", marginTop: 12, textAlign: "center" }}>
          Klikni red tabele. Na telefonu koristi dodir. Oznake: T = tačno, N = netačno.
        </p>
      </div>

      {/* reading panel */}
      <div className={s.grid2} style={{ marginTop: 16 }}>
        <article className={s.sectionCard}>
          <h3 className={cs.tCardTitle}>
            Aktivni scenario: <InlineMath>{scenario.title}</InlineMath>
          </h3>
          <p>{scenario.explain(scenario.rows[activeRow])} {scenario.summary()}</p>
        </article>
        <article className={s.sectionCard}>
          <h3 className={cs.tCardTitle}>Kako čitaš rezultat</h3>
          <ul>
            {scenario.rules.map((rule, i) => (
              <li key={i}>{rule}</li>
            ))}
          </ul>
        </article>
      </div>
    </>
  );
}
