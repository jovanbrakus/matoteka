"use client";

import { useState, useRef, useEffect, useCallback } from "react";

import LessonShell from "@/components/knowledge/LessonShell";
import LessonHero from "@/components/knowledge/LessonHero";
import LessonNav from "@/components/knowledge/LessonNav";
import LessonSection from "@/components/knowledge/LessonSection";
import MathBlock from "@/components/knowledge/MathBlock";
import InlineMath from "@/components/knowledge/InlineMath";
import WalkStep from "@/components/knowledge/WalkStep";
import ExerciseCard from "@/components/knowledge/ExerciseCard";
import InsightCard from "@/components/knowledge/InsightCard";
import FormulaCard from "@/components/knowledge/FormulaCard";
import MicroCheck from "@/components/knowledge/MicroCheck";
import SectionCard from "@/components/knowledge/SectionCard";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

/* ─── NAV ─── */
const NAV_LINKS = [
  { href: "#vaznost", label: "Zašto je važna" },
  { href: "#pojmovi", label: "Osnovni pojmovi" },
  { href: "#laboratorija", label: "Interaktivni laboratorij" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#zakoni", label: "Klasične ekvivalencije" },
  { href: "#zamke", label: "Česte greške" },
  { href: "#ispit", label: "Veza sa prijemnim" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

/* ═══════════════════════════════════════════════════════════
   Interactive truth-table lab (canvas-based)
   ═══════════════════════════════════════════════════════════ */

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

function EquivalenceLab() {
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
    bg.addColorStop(0, "#160906");
    bg.addColorStop(1, "#0b0403");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    /* title */
    ctx.fillStyle = "#f6eee9";
    ctx.font = '800 24px "Public Sans", system-ui, sans-serif';
    ctx.textAlign = "left";
    ctx.fillText("Laboratorija ekvivalencije", 26, 42);

    ctx.fillStyle = "#cdb8aa";
    ctx.font = '400 14px "Public Sans", system-ui, sans-serif';
    ctx.fillText("Klikni red koji želiš da analiziraš", 26, 66);

    /* badge */
    const badgeText = scenario.mode === "single" ? "provera tautologije" : "provera ekvivalencije";
    const pillW = 166;
    const pillH = 34;
    const pillX = W - pillW - 30;
    ctx.beginPath();
    ctx.roundRect(pillX, 24, pillW, pillH, 999);
    ctx.fillStyle = "rgba(236,91,19,0.16)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255,154,106,0.30)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = "#f6eee9";
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
    ctx.fillStyle = "rgba(255,255,255,0.02)";
    ctx.fill();
    ctx.strokeStyle = "rgba(236,91,19,0.14)";
    ctx.lineWidth = 1;
    ctx.stroke();

    /* headers */
    let x = left;
    scenario.headers.forEach((header, idx) => {
      const w = colWidths[idx];
      ctx.fillStyle = "rgba(236,91,19,0.10)";
      ctx.fillRect(x, top, w, headerHeight);
      ctx.strokeStyle = "rgba(236,91,19,0.12)";
      ctx.strokeRect(x, top, w, headerHeight);
      ctx.fillStyle = "#ffb488";
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

      ctx.fillStyle = selected ? "rgba(236,91,19,0.16)" : "rgba(255,255,255,0.01)";
      ctx.fillRect(left, y, tableWidth, rowHeight);
      ctx.strokeStyle = selected ? "rgba(255,154,106,0.34)" : "rgba(236,91,19,0.08)";
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
            truthy ? "rgba(103,215,173,0.14)" : "rgba(255,180,136,0.14)",
            truthy ? "rgba(103,215,173,0.34)" : "rgba(255,180,136,0.34)",
            cell,
            truthy ? "#67d7ad" : "#ffb488"
          );
        } else if (isDecision) {
          const good = cell === "da" || cell === "uvek drži";
          drawPill(
            centerX - 32, y + 16, 64, 30,
            good ? "rgba(103,215,173,0.14)" : "rgba(255,180,136,0.14)",
            good ? "rgba(103,215,173,0.34)" : "rgba(255,180,136,0.34)",
            cell,
            good ? "#67d7ad" : "#ffb488"
          );
        } else {
          ctx.fillStyle = "#f6eee9";
          ctx.font = '700 15px "Public Sans", system-ui, sans-serif';
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(cell, centerX, y + rowHeight / 2);
        }
        cx += w;
      });
    });

    /* footer hint */
    ctx.fillStyle = "#cdb8aa";
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
    return () => window.removeEventListener("resize", onResize);
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

/* ═══════════════════════════════════════════════════════════
   MAIN LESSON COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function Lesson1_5Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka znanje · Lekcija 1.5"
        title={
          <>
            Tautologije i{" "}
            <span className={cs.tHeroAccent}>logičke ekvivalencije</span>
          </>
        }
        description="Posle uvoda u iskaze i operacije, sledeće veliko pitanje glasi: kada je formula uvek tačna, a kada dve različite formule zapravo govore istu stvar? Ovo je ključna lekcija za svako ozbiljno preuređivanje uslova i izraza."
        heroImageSrc="/api/lessons/1.5/hero"
        heroImageAlt="Apstraktna matematička tabla sa simbolima i formulama za tautologije i logičke ekvivalencije"
        cards={[
          {
            label: "Naučićeš",
            description:
              "Kako da prepoznaš formulu koja je tačna u svakom mogućem slučaju.",
          },
          {
            label: "Najveća zamka",
            description:
              "Misliti da su dve formule ekvivalentne samo zato što zvuče slično.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Bezbedna transformacija uslova, negacija složenih tvrdenja i čuvanje tačnosti rešenja.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description: "30 do 40 minuta pažljivog rada.",
          },
          {
            label: "Predznanje",
            description:
              "Lekcija 1: iskazi, negacija, konjunkcija, disjunkcija, implikacija i ekvivalencija.",
          },
          {
            label: "Glavna veština",
            description:
              "Čitanje poslednje kolone tabele i zamena formule njenim ekvivalentnim oblikom.",
          },
          {
            label: "Interaktivno",
            description:
              "Canvas laboratorija za proveru tautologije i ekvivalencije.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ 1. ZAŠTO JE VAŽNA ═══════════ */}
      <LessonSection
        id="vaznost"
        eyebrow="Zašto je ova lekcija važna"
        title="Ovde učiš kada smeš da zameniš jedan zapis drugim"
        description="U algebri stalno preoblikuješ izraze. U logici radiš istu stvar, ali sa uslovima i tvrdenjima. Ako dve formule nisu ekvivalentne, njihova zamena menja smisao zadatka. Ako jesu ekvivalentne, dobijaš moćan i bezbedan alat za pojednostavljivanje."
      >
        <div className={s.grid2}>
          <SectionCard title="Šta dobijaš iz ove lekcije">
            <ul>
              <li>Jasnu razliku između &ldquo;nekad tačno&rdquo; i &ldquo;uvek tačno&rdquo;</li>
              <li>Sigurnost da proveriš da li dve formule zaista govore isto</li>
              <li>Osnovu za racionalno preuređivanje uslova domena i ograničenja</li>
            </ul>
          </SectionCard>
          <SectionCard title="Gde se ovo kasnije pojavljuje">
            <ul>
              <li>Negacija složenih uslova kod nejednačina i skupova</li>
              <li>Prelazak sa implikacije na oblik bez implikacije</li>
              <li>Dokazivanje da dva uslova vode do istog skupa rešenja</li>
            </ul>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ 2. OSNOVNI POJMOVI ═══════════ */}
      <LessonSection
        id="pojmovi"
        eyebrow="Osnovni pojmovi"
        title="Tautologija, kontradikcija i ekvivalencija"
        description="Pre nego što počneš da pamtiš zakone, važno je da razumeš tri reči koje organizuju celu temu."
      >
        <div className={s.grid2}>
          <SectionCard title="Tautologija">
            <p style={{ fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--lesson-primary-soft)", fontWeight: 700, marginBottom: 8 }}>
              Definicija 1
            </p>
            <p>
              Formula koja je tačna za svaku moguću raspodelu istinitosnih vrednosti
              svojih sastavnih iskaza.
            </p>
            <MathBlock>{"p \\lor \\neg p"}</MathBlock>
            <p>
              Bez obzira na to da li je <InlineMath>{"p"}</InlineMath> tačno ili
              netačno, ova formula ispada tačna.
            </p>
          </SectionCard>

          <SectionCard title="Kontradikcija">
            <p style={{ fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--lesson-primary-soft)", fontWeight: 700, marginBottom: 8 }}>
              Definicija 2
            </p>
            <p>Formula koja je netačna u svakom mogućem slučaju.</p>
            <MathBlock>{"p \\land \\neg p"}</MathBlock>
            <p>
              Nijedan iskaz ne može istovremeno biti i tačan i netačan.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 18 }}>
          <SectionCard title="Kontingentna formula">
            <p style={{ fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--lesson-primary-soft)", fontWeight: 700, marginBottom: 8 }}>
              Definicija 3
            </p>
            <p>Formula koja je u nekim redovima tačna, a u nekim netačna.</p>
            <MathBlock>{"p \\land q"}</MathBlock>
            <p>
              Ovde rezultat zavisi od vrednosti iskaza{" "}
              <InlineMath>{"p"}</InlineMath> i <InlineMath>{"q"}</InlineMath>.
              Dakle nije ni tautologija ni kontradikcija.
            </p>
          </SectionCard>

          <SectionCard title="Logička ekvivalencija">
            <p style={{ fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--lesson-primary-soft)", fontWeight: 700, marginBottom: 8 }}>
              Definicija 4
            </p>
            <p>
              Dve formule su logički ekvivalentne kada imaju istu vrednost u svakom
              redu istinitosne tabele.
            </p>
            <MathBlock>{"A \\Leftrightarrow B"}</MathBlock>
            <p>
              Praktično: njihove poslednje kolone su identične, pa jednu možeš
              zameniti drugom.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Proveri sebe: da li je dovoljno da formula bude tačna u jednom redu da bi bila tautologija?"
          answer={
            <p>
              Ne. Tautologija mora da bude tačna u svakom mogućem redu, bez izuzetka.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ 3. INTERAKTIVNI LABORATORIJ ═══════════ */}
      <LessonSection
        id="laboratorija"
        eyebrow="Interaktivni laboratorij"
        title="Proveri da li je formula tautologija i da li su dve formule ekvivalentne"
        description="Izaberi scenario. U nekim scenarijima posmatraš jednu formulu i proveravaš da li je svuda tačna. U drugim scenarijima posmatraš dve formule i proveravaš da li im se poslednje kolone potpuno poklapaju."
      >
        <EquivalenceLab />
      </LessonSection>

      {/* ═══════════ 4. VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Kako se tautologije i ekvivalencije proveravaju korak po korak"
        description="Ovde nije cilj mehanički prepis. Cilj je da navikneš oko da prepozna obrazac i da razumeš zašto je tabela takva kakva jeste."
      >
        <div className={s.walkthrough}>
          {/* Primer 1 */}
          <WalkStep
            number={1}
            title={
              <>
                Pokažimo da je <InlineMath>{"p \\lor \\neg p"}</InlineMath>{" "}
                tautologija
              </>
            }
          >
            <p>
              Imamo samo jedan osnovni iskaz <InlineMath>{"p"}</InlineMath>, pa su
              moguća samo dva reda:{" "}
              <InlineMath>{"p = T"}</InlineMath> i{" "}
              <InlineMath>{"p = N"}</InlineMath>.
            </p>
            <MathBlock>
              {
                "\\begin{array}{c|c|c} p & \\neg p & p \\lor \\neg p \\\\ \\hline T & N & T \\\\ N & T & T \\end{array}"
              }
            </MathBlock>
            <p>
              Poslednja kolona je svuda <InlineMath>{"T"}</InlineMath>. To je baš
              definicija tautologije.
            </p>
          </WalkStep>

          <MicroCheck
            question="Mikro-provera: da li je p ∧ ¬p tautologija?"
            answer={
              <p>
                Ne. Naprotiv, to je kontradikcija, jer je u svim redovima netačna.
              </p>
            }
          />

          {/* Primer 2 */}
          <WalkStep
            number={2}
            title="Pokažimo De Morganov zakon"
          >
            <p>
              Želimo da proverimo da li su formule{" "}
              <InlineMath>{"\\neg(p \\lor q)"}</InlineMath> i{" "}
              <InlineMath>{"(\\neg p) \\land (\\neg q)"}</InlineMath>{" "}
              ekvivalentne.
            </p>
            <MathBlock>
              {"\\neg(p \\lor q) \\Leftrightarrow (\\neg p) \\land (\\neg q)"}
            </MathBlock>
            <p>Popunimo obe poslednje kolone i uporedimo ih red po red.</p>
            <MathBlock>
              {
                "\\begin{array}{c|c|c|c} p & q & \\neg(p \\lor q) & (\\neg p) \\land (\\neg q) \\\\ \\hline T & T & N & N \\\\ T & N & N & N \\\\ N & T & N & N \\\\ N & N & T & T \\end{array}"
              }
            </MathBlock>
            <p>
              Kolone su iste, pa su formule logički ekvivalentne.
            </p>
          </WalkStep>

          {/* Primer 3 */}
          <WalkStep
            number={3}
            title="Uklanjanje implikacije"
          >
            <p>
              Formula <InlineMath>{"p \\Rightarrow q"}</InlineMath> se veoma često
              zamenjuje formulom <InlineMath>{"\\neg p \\lor q"}</InlineMath>. To nije
              zgodna pretpostavka nego prava ekvivalencija.
            </p>
            <MathBlock>
              {"p \\Rightarrow q \\Leftrightarrow \\neg p \\lor q"}
            </MathBlock>
            <p>
              Zašto? Zato što su netačne u istom i samo u istom slučaju: kada je{" "}
              <InlineMath>{"p = T"}</InlineMath>, a{" "}
              <InlineMath>{"q = N"}</InlineMath>.
            </p>
            <p>
              Ovaj prelaz je izuzetno koristan kad želiš da logički izraz prebaciš na
              jezik negacije, konjunkcije i disjunkcije.
            </p>
          </WalkStep>

          <MicroCheck
            question="Mikro-provera: da li iz p ⇒ q sledi da je q ⇒ p?"
            answer={
              <p>
                Ne. To je konverzija implikacije i uglavnom nije tačna. Tačna
                ekvivalentna forma je kontrapozicija:{" "}
                <InlineMath>
                  {"p \\Rightarrow q \\Leftrightarrow \\neg q \\Rightarrow \\neg p"}
                </InlineMath>
                .
              </p>
            }
          />

          {/* Primer 4 */}
          <WalkStep
            number={4}
            title="Primer kada formule nisu ekvivalentne"
          >
            <p>
              Uzmimo formule <InlineMath>{"p \\lor q"}</InlineMath> i{" "}
              <InlineMath>{"p \\land q"}</InlineMath>. One zvuče povezano, ali nisu
              iste.
            </p>
            <MathBlock>
              {
                "\\begin{array}{c|c|c|c} p & q & p \\lor q & p \\land q \\\\ \\hline T & T & T & T \\\\ T & N & T & N \\\\ N & T & T & N \\\\ N & N & N & N \\end{array}"
              }
            </MathBlock>
            <p>
              Već u drugom redu kolone se razlikuju. Dakle ove formule nisu logički
              ekvivalentne.
            </p>
          </WalkStep>
        </div>
      </LessonSection>

      {/* ═══════════ 5. KLASIČNE EKVIVALENCIJE ═══════════ */}
      <LessonSection
        id="zakoni"
        eyebrow="Klasične ekvivalencije"
        title="Ovo su obrasci koje vredi imati odmah u glavi"
        description="Ne treba slepo pamtiti liste, ali nekoliko standardnih ekvivalencija drastično ubrzava rad."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Dvostruka negacija"
            formula={"\\neg(\\neg p) \\Leftrightarrow p"}
            note="Negacija negacije vraća originalni iskaz."
          />
          <FormulaCard
            title="De Morgan 1"
            formula={"\\neg(p \\lor q) \\Leftrightarrow (\\neg p) \\land (\\neg q)"}
            note={
              <>
                Negacija prolazi kroz zagradu i menja{" "}
                <InlineMath>{"\\lor"}</InlineMath> u{" "}
                <InlineMath>{"\\land"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="De Morgan 2"
            formula={"\\neg(p \\land q) \\Leftrightarrow (\\neg p) \\lor (\\neg q)"}
            note={
              <>
                Negacija prolazi kroz zagradu i menja{" "}
                <InlineMath>{"\\land"}</InlineMath> u{" "}
                <InlineMath>{"\\lor"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Bez implikacije"
            formula={"p \\Rightarrow q \\Leftrightarrow \\neg p \\lor q"}
            note="Implikacija se može prevesti na jezik negacije i disjunkcije."
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Kontrapozicija">
            <MathBlock>
              {"p \\Rightarrow q \\Leftrightarrow \\neg q \\Rightarrow \\neg p"}
            </MathBlock>
            <p>
              Ovo je jedna od najvažnijih ekvivalencija u dokazivanju i proveri
              uslova.
            </p>
          </SectionCard>
          <SectionCard title="Komutativnost">
            <MathBlock>
              {
                "p \\lor q \\Leftrightarrow q \\lor p, \\qquad p \\land q \\Leftrightarrow q \\land p"
              }
            </MathBlock>
            <p>
              Redosled članova se ne menja za disjunkciju i konjunkciju.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Praktično pravilo">
          <p>
            Kad god sumnjaš da su dve formule ekvivalentne, ne oslanjaj se na utisak.
            Napravi tabelu i proveri da li su poslednje kolone identične.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 6. ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="zamke"
        eyebrow="Česte greške"
        title="Tipični promašaji kod ove teme"
        description="Ove greške izgledaju male, ali kasnije vode do loše postavljenih uslova i pogrešnih transformacija."
      >
        <div className={s.grid2}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              &ldquo;Tačno u jednom redu&rdquo; nije isto što i tautologija
            </h3>
            <p>
              Formula koja je tačna samo ponekad nije tautologija. Tautologija mora da
              bude svuda tačna.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Mešanje ekvivalencije i implikacije
            </h3>
            <p>
              Ako jedna formula povlači drugu, to još ne znači da su ekvivalentne.
              Ekvivalencija traži oba smera.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Pogrešna negacija složene formule
            </h3>
            <p>
              Učenici često zaborave da se pri negaciji menja i operacija, pa pogrešno
              pišu De Morganove zakone.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Ignorisanje samo jednog spornog reda
            </h3>
            <p>
              Dovoljan je jedan red u kome se kolone razlikuju da formule ne budu
              ekvivalentne.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ 7. VEZA SA PRIJEMNIM ═══════════ */}
      <LessonSection
        id="ispit"
        eyebrow="Veza sa prijemnim zadacima"
        title="Ovo nije samo teorija: ovde počinje kontrola transformacija"
        description="U zadacima sa korenima, logaritmima, apsolutnom vrednošću i parametrima vrlo lako napraviš korak koji nije ekvivalentan. Zato je ideja logičke ekvivalencije praktično pitanje tačnosti, a ne teorijski luksuz."
      >
        <div className={s.grid2}>
          <SectionCard title="Negacija uslova domena">
            <p>Ako znaš da mora da važi</p>
            <MathBlock>{"x \\ge 1 \\land x \\ne 3"}</MathBlock>
            <p>onda se negacija ne piše napamet, nego preko zakona:</p>
            <MathBlock>
              {
                "\\neg(x \\ge 1 \\land x \\ne 3) \\Leftrightarrow (x < 1) \\lor (x = 3)"
              }
            </MathBlock>
          </SectionCard>
          <SectionCard title="Bezbedno pojednostavljivanje uslova">
            <p>
              Ako neki uslov možeš da zameniš njegovim ekvivalentnim oblikom, skup
              rešenja se ne menja. Upravo zato su ekvivalencije dragocene: čuvaju
              smisao zadatka.
            </p>
            <MathBlock>
              {"p \\Rightarrow q \\Leftrightarrow \\neg p \\lor q"}
            </MathBlock>
            <p>
              Ovakve zamene su legitimne jer ne menjaju nijedan red tabele.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Prijemni mentalni test">
          <p>
            Kad god zameniš jedan uslov drugim, pitaj sebe: &ldquo;Da li su ove dve
            formule zaista ekvivalentne, ili samo jedna povlači drugu?&rdquo; Ako nisi
            siguran, pravi tabelu ili proveri sporne slučajeve.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 8. VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe"
        title="Kratka provera razumevanja"
        description="Probaj najpre bez pomoći. Cilj je da usvojiš kriterijum, a ne da mehanički prepisuješ rezultat."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Zadatak 1: Tautologija ili ne?"
            problem={
              <p>
                Odredi da li je{" "}
                <InlineMath>{"p \\lor \\neg p"}</InlineMath> tautologija.
              </p>
            }
            solution={
              <p>
                Jeste. U oba moguća reda poslednja kolona je{" "}
                <InlineMath>{"T"}</InlineMath>.
              </p>
            }
          />
          <ExerciseCard
            title="Zadatak 2: Kontradikcija ili ne?"
            problem={
              <p>
                Odredi da li je{" "}
                <InlineMath>{"p \\land \\neg p"}</InlineMath> kontradikcija.
              </p>
            }
            solution={
              <p>Jeste. U svim redovima formula je netačna.</p>
            }
          />
          <ExerciseCard
            title="Zadatak 3: Proveri ekvivalenciju"
            problem={
              <p>
                Da li važi{" "}
                <InlineMath>
                  {"p \\Rightarrow q \\Leftrightarrow \\neg p \\lor q"}
                </InlineMath>
                ?
              </p>
            }
            solution={
              <p>
                Da. Poslednje kolone se poklapaju u svim redovima, pa su formule
                ekvivalentne.
              </p>
            }
          />
          <ExerciseCard
            title="Zadatak 4: Negacija formule"
            problem={
              <p>
                Preoblikuj{" "}
                <InlineMath>{"\\neg(p \\land q)"}</InlineMath>.
              </p>
            }
            solution={
              <MathBlock>
                {
                  "\\neg(p \\land q) \\Leftrightarrow (\\neg p) \\lor (\\neg q)"
                }
              </MathBlock>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ GLAVNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Glavni uvid lekcije"
        title="Tautologija i ekvivalencija nisu ukrasne reči"
        description="One odlučuju da li formula važi uvek i da li smeš bezbedno da zameniš jedan zapis drugim."
      >
        <InsightCard title="Ključna formula">
          <MathBlock>
            {
              "\\text{tautologija} = \\text{poslednja kolona svuda } T, \\qquad A \\Leftrightarrow B = \\text{iste poslednje kolone}"
            }
          </MathBlock>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ 9. ZAVRŠNI REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta treba da zapamtiš iz ove lekcije"
        description="Ako sledeće stavke možeš da proveriš bez konfuzije, lekcija je usvojena na dobrom nivou."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Tautologija</h3>
            <p>
              Formula koja je tačna u svakom mogućem redu tabele.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Kontradikcija</h3>
            <p>
              Formula koja je netačna u svakom mogućem redu.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>3. Logička ekvivalencija</h3>
            <p>
              Dve formule su logički ekvivalentne ako imaju iste poslednje kolone.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>4. De Morganovi zakoni</h3>
            <p>
              Menjaju i negacije i veznike.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>5. Implikacija</h3>
            <p>
              Može se prevesti u oblik{" "}
              <InlineMath>{"\\neg p \\lor q"}</InlineMath>.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>6. Prijemni</h3>
            <p>
              Na prijemnom ekvivalencija čuva tačnost transformacija i sprečava lažna
              rešenja.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Sledeći prirodan korak je dalje vezivanje logike sa skupovima, relacijama i
          funkcijama, gde ista disciplina čitanja uslova postaje još važnija.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
