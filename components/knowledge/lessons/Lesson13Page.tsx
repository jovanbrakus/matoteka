"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { MathJax } from "better-react-mathjax";
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

/* ───────────────────────── NAV ───────────────────────── */

const NAV_LINKS = [
  { href: "#vaznost", label: "Zašto je važno" },
  { href: "#osnove", label: "Osnove" },
  { href: "#operacije", label: "Operacije" },
  { href: "#interaktivno", label: "Interaktivno" },
  { href: "#primeri", label: "Primeri" },
  { href: "#formule", label: "Formule" },
  { href: "#zamke", label: "Zamke" },
  { href: "#prijemni", label: "Prijemni" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

/* ───────────────────────── POLY LAB ───────────────────────── */

type PolyOp = "+" | "-" | "*";

interface PolyLabState {
  p: number[];
  q: number[];
  op: PolyOp;
}

const POLY_PRESETS: Record<string, PolyLabState> = {
  sabiranje: {
    p: [4, -1, 0, 2],
    q: [2, -6, 3, 1],
    op: "+",
  },
  oduzimanje: {
    p: [7, -1, 0, 4],
    q: [-1, -5, 2, 1],
    op: "-",
  },
  množenje: {
    p: [-3, 2, 0, 0],
    q: [1, 1, 1, 0],
    op: "*",
  },
};

function clampCoeff(val: string, fallback: number): number {
  const n = Number.parseInt(val, 10);
  if (Number.isNaN(n)) return fallback;
  return Math.min(99, Math.max(-99, n));
}

function trimPoly(poly: number[]): number[] {
  const out = poly.slice();
  while (out.length > 1 && Math.abs(out[out.length - 1]) < 1e-9) out.pop();
  if (out.length === 1 && Math.abs(out[0]) < 1e-9) return [0];
  return out;
}

function getDeg(poly: number[]): number | null {
  const t = trimPoly(poly);
  return t.length === 1 && Math.abs(t[0]) < 1e-9 ? null : t.length - 1;
}

function addSub(a: number[], b: number[], sign: 1 | -1): number[] {
  const len = Math.max(a.length, b.length);
  const out = Array(len).fill(0);
  for (let i = 0; i < len; i++) out[i] = (a[i] || 0) + sign * (b[i] || 0);
  return trimPoly(out);
}

function multiplyPoly(a: number[], b: number[]): number[] {
  const out = Array(a.length + b.length - 1).fill(0);
  for (let i = 0; i < a.length; i++)
    for (let j = 0; j < b.length; j++) out[i + j] += a[i] * b[j];
  return trimPoly(out);
}

function compute(st: PolyLabState): number[] {
  if (st.op === "+") return addSub(st.p, st.q, 1);
  if (st.op === "-") return addSub(st.p, st.q, -1);
  return multiplyPoly(st.p, st.q);
}

function fmtNum(v: number): string {
  if (Math.abs(v) < 1e-9) return "0";
  const r = Math.round(v);
  if (Math.abs(v - r) < 1e-9) return String(r);
  return v.toFixed(2).replace(/\.?0+$/, "");
}

function polyToLatex(poly: number[]): string {
  const t = trimPoly(poly);
  if (t.length === 1 && Math.abs(t[0]) < 1e-9) return "0";
  let out = "";
  for (let i = t.length - 1; i >= 0; i--) {
    const c = t[i];
    if (Math.abs(c) < 1e-9) continue;
    const sign = c < 0 ? " - " : out ? " + " : "";
    const abs = Math.abs(c);
    let term: string;
    if (i === 0) term = fmtNum(abs);
    else if (i === 1) term = abs === 1 ? "x" : `${fmtNum(abs)}x`;
    else term = abs === 1 ? `x^{${i}}` : `${fmtNum(abs)}x^{${i}}`;
    out += sign + term;
  }
  return out || "0";
}

function degLabel(poly: number[]): string {
  const d = getDeg(poly);
  return d === null ? "poseban slučaj (nulti polinom)" : `${d}`;
}

function colorAlpha(hex: string, alpha: number): string {
  const n = parseInt(hex.replace("#", ""), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
}

function drawPolyLab(
  canvas: HTMLCanvasElement,
  st: PolyLabState,
  result: number[]
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const ratio = window.devicePixelRatio || 1;
  const cssW = canvas.clientWidth;
  const cssH = canvas.clientHeight;
  canvas.width = Math.round(cssW * ratio);
  canvas.height = Math.round(cssH * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, cssW, cssH);

  const rows = [
    { label: "P(x)", poly: st.p, color: "#ff8a52" },
    { label: "Q(x)", poly: st.q, color: "#88d8ff" },
    {
      label: st.op === "*" ? "P(x)\u00b7Q(x)" : "Rezultat",
      poly: result,
      color: "#6bdfb7",
    },
  ];

  const maxDeg = Math.max(
    getDeg(st.p) || 0,
    getDeg(st.q) || 0,
    getDeg(result) || 0
  );
  let maxAbs = 1;
  for (const row of rows)
    for (let i = 0; i <= maxDeg; i++)
      maxAbs = Math.max(maxAbs, Math.abs(row.poly[i] || 0));

  const leftPad = 92;
  const rightPad = 16;
  const headerY = 40;
  const rowH = (cssH - 78) / rows.length;
  const cellW = (cssW - leftPad - rightPad) / (maxDeg + 1);

  ctx.fillStyle = "rgba(255,255,255,0.05)";
  ctx.fillRect(0, 0, cssW, cssH);

  ctx.font = '600 14px "Inter", sans-serif';
  ctx.fillStyle = "#ffd7b9";
  ctx.fillText("Poravnanje koeficijenata po stepenu", 20, 26);

  for (let d = maxDeg; d >= 0; d--) {
    const x = leftPad + (maxDeg - d) * cellW;
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.fillRect(x, headerY, cellW - 6, cssH - headerY - 18);
    ctx.fillStyle = "#d5c3b6";
    ctx.font = '600 13px "Inter", sans-serif';
    const colLabel = d === 0 ? "1" : d === 1 ? "x" : `x^${d}`;
    ctx.fillText(colLabel, x + 10, headerY + 18);
  }

  rows.forEach((row, ri) => {
    const y = headerY + ri * rowH + 34;
    ctx.fillStyle = "#f6eee9";
    ctx.font = '700 15px "Inter", sans-serif';
    ctx.fillText(row.label, 22, y + 18);

    const deg = getDeg(row.poly);
    ctx.fillStyle = "#d5c3b6";
    ctx.font = '500 12px "Inter", sans-serif';
    ctx.fillText(deg === null ? "deg: poseb." : `deg: ${deg}`, 22, y + 38);

    for (let d = maxDeg; d >= 0; d--) {
      const x = leftPad + (maxDeg - d) * cellW;
      const coeff = row.poly[d] || 0;
      const intensity =
        Math.abs(coeff) < 1e-9
          ? 0.05
          : 0.2 + 0.68 * (Math.abs(coeff) / maxAbs);
      ctx.fillStyle = colorAlpha(row.color, intensity);
      ctx.fillRect(x + 6, y, cellW - 18, rowH - 24);
      ctx.strokeStyle = colorAlpha(row.color, 0.4);
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 6, y, cellW - 18, rowH - 24);

      ctx.fillStyle = Math.abs(coeff) < 1e-9 ? "#bfaea2" : "#fff5ee";
      ctx.font = '700 16px "Inter", sans-serif';
      const text = fmtNum(coeff);
      const tw = ctx.measureText(text).width;
      ctx.fillText(
        text,
        x + (cellW - 18 - tw) / 2 + 6,
        y + (rowH - 24) / 2 + 6
      );
    }
  });

  ctx.fillStyle = "#d5c3b6";
  ctx.font = '500 12px "Inter", sans-serif';
  ctx.fillText(
    "Tamne ćelije znače koeficijent 0. Jača boja znači veći apsolutni iznos.",
    20,
    cssH - 10
  );
}

function PolyLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [st, setSt] = useState<PolyLabState>(POLY_PRESETS.sabiranje);
  const result = compute(st);

  const render = useCallback(() => {
    if (canvasRef.current) drawPolyLab(canvasRef.current, st, result);
  }, [st, result]);

  useEffect(() => {
    render();
    const onResize = () => render();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [render]);

  const setCoeff = (which: "p" | "q", idx: number, val: string) => {
    setSt((prev) => {
      const arr = [...prev[which]];
      arr[idx] = clampCoeff(val, arr[idx]);
      return { ...prev, [which]: arr };
    });
  };

  const applyPreset = (name: string) => {
    const preset = POLY_PRESETS[name];
    if (preset) setSt({ ...preset });
  };

  const clearAll = () => {
    setSt({ p: [0, 0, 0, 0], q: [0, 0, 0, 0], op: st.op });
  };

  const explanation = (() => {
    if (st.op === "+")
      return "Sabiranje: gledaj samo kolone istog stepena. Koeficijenti uz x\u00B3, x\u00B2, x i konstante sabiraju se odvojeno.";
    if (st.op === "-")
      return "Oduzimanje: prvo mentalno promeni znakove drugog polinoma, pa onda sabiraj kolone istog stepena.";
    const dp = getDeg(st.p);
    const dq = getDeg(st.q);
    const dr = getDeg(result);
    let tail = "";
    if (dp !== null && dq !== null && dr !== null)
      tail = ` Ovde vidiš i proveru stepena: ${dp} + ${dq} = ${dr}.`;
    return (
      "Množenje: svaki član prvog polinoma množi se svakim članom drugog, a stepeni se sabiraju." +
      tail
    );
  })();

  return (
    <div className={s.interactiveShell}>
      <div className={s.interactiveCard} style={{ padding: 22 }}>
        <h3 className={cs.tCardTitle}>Podesi polinome</h3>

        {/* P(x) coefficients */}
        <p
          style={{
            marginTop: 14,
            marginBottom: 8,
            fontWeight: 700,
            color: "var(--lesson-muted-strong)",
          }}
        >
          Polinom <InlineMath>{"P(x)=a_3x^3+a_2x^2+a_1x+a_0"}</InlineMath>
        </p>
        <div className={s.controlGrid}>
          {[3, 2, 1, 0].map((i) => (
            <div key={`p${i}`} className={s.field}>
              <label>
                <MathJax inline>{`\\(a_{${i}}\\)`}</MathJax>
              </label>
              <input
                type="number"
                value={st.p[i]}
                step={1}
                onChange={(e) => setCoeff("p", i, e.target.value)}
              />
            </div>
          ))}
        </div>

        {/* Q(x) coefficients */}
        <p
          style={{
            marginTop: 18,
            marginBottom: 8,
            fontWeight: 700,
            color: "var(--lesson-muted-strong)",
          }}
        >
          Polinom <InlineMath>{"Q(x)=b_3x^3+b_2x^2+b_1x+b_0"}</InlineMath>
        </p>
        <div className={s.controlGrid}>
          {[3, 2, 1, 0].map((i) => (
            <div key={`q${i}`} className={s.field}>
              <label>
                <MathJax inline>{`\\(b_{${i}}\\)`}</MathJax>
              </label>
              <input
                type="number"
                value={st.q[i]}
                step={1}
                onChange={(e) => setCoeff("q", i, e.target.value)}
              />
            </div>
          ))}
        </div>

        {/* Operation selector */}
        <div className={s.field} style={{ marginTop: 16 }}>
          <label>Operacija</label>
          <select
            value={st.op}
            onChange={(e) =>
              setSt((prev) => ({ ...prev, op: e.target.value as PolyOp }))
            }
          >
            <option value="+">Sabiranje: P(x)+Q(x)</option>
            <option value="-">Oduzimanje: P(x)-Q(x)</option>
            <option value="*">Množenje: P(x)&middot;Q(x)</option>
          </select>
        </div>

        {/* Presets */}
        <p
          style={{
            marginTop: 16,
            marginBottom: 8,
            fontWeight: 700,
            color: "var(--lesson-muted-strong)",
          }}
        >
          Brzi primeri
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <button
            className={s.presetBtn}
            type="button"
            onClick={() => applyPreset("sabiranje")}
          >
            Sabiranje
          </button>
          <button
            className={s.presetBtn}
            type="button"
            onClick={() => applyPreset("oduzimanje")}
          >
            Oduzimanje
          </button>
          <button
            className={s.presetBtn}
            type="button"
            onClick={() => applyPreset("množenje")}
          >
            Množenje
          </button>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginTop: 14,
          }}
        >
          <button
            className={s.presetBtn}
            type="button"
            style={{
              background:
                "linear-gradient(135deg, rgba(236,91,19,0.28), rgba(255,154,106,0.18))",
              borderColor: "rgba(255,154,106,0.26)",
            }}
            onClick={render}
          >
            Prikaži rezultat
          </button>
          <button className={s.presetBtn} type="button" onClick={clearAll}>
            Poništi na nulu
          </button>
        </div>
      </div>

      <div>
        <div className={s.canvasWrap}>
          <canvas
            ref={canvasRef}
            className={s.polarCanvas}
            style={{ aspectRatio: "16 / 10" }}
          />
        </div>

        <div
          className={s.resultsGrid}
          style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
        >
          <div className={s.resultCard}>
            <strong>Polinom P</strong>
            <MathJax dynamic>{`\\(P(x)=${polyToLatex(st.p)}\\)`}</MathJax>
            <p
              style={{
                marginTop: 8,
                color: "var(--lesson-primary-soft)",
                fontWeight: 700,
              }}
            >
              Stepen: {degLabel(st.p)}
            </p>
          </div>
          <div className={s.resultCard}>
            <strong>Polinom Q</strong>
            <MathJax dynamic>{`\\(Q(x)=${polyToLatex(st.q)}\\)`}</MathJax>
            <p
              style={{
                marginTop: 8,
                color: "var(--lesson-primary-soft)",
                fontWeight: 700,
              }}
            >
              Stepen: {degLabel(st.q)}
            </p>
          </div>
          <div className={s.resultCard}>
            <strong>Rezultat</strong>
            <MathJax dynamic>{`\\(${polyToLatex(result)}\\)`}</MathJax>
            <p
              style={{
                marginTop: 8,
                color: "var(--lesson-primary-soft)",
                fontWeight: 700,
              }}
            >
              Stepen: {degLabel(result)}
            </p>
          </div>
        </div>

        <div className={s.labNote}>{explanation}</div>
      </div>
    </div>
  );
}

/* ───────────────────────── MAIN PAGE ───────────────────────── */

export default function Lesson13Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka znanje · Lekcija 13"
        title={
          <>
            Polinomi jedne promenljive i{" "}
            <span className={cs.tHeroAccent}>osnovne operacije</span>
          </>
        }
        description="Ova lekcija uvodi red u računanje sa polinomima: prvo prepoznaš kanonski oblik i stepen, zatim sigurno sabiraš, oduzimaš i množiš, a na kraju razumeš šta zapravo znači zapis P(x)=D(x)·Q(x)+R(x)."
        heroImageSrc="/api/lessons/13/hero"
        heroImageAlt="Ilustracija polinoma jedne promenljive i osnovnih operacija"
        cards={[
          {
            label: "Šta učiš",
            description:
              "Kako da središ polinom u kanonski oblik i odmah vidiš vodeći član.",
          },
          {
            label: "Operacije",
            description:
              "Sabiranje, oduzimanje, množenje i algoritamsko deljenje.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Sredi, izračunaj, odredi stepen. Često se traži i ostatak pri deljenju linearnim polinomom.",
          },
        ]}
        stats={[
          {
            label: "Predznanje",
            description:
              "Algebarski izrazi i sređivanje. Posebno rad sa sličnim članovima i distributivnost.",
          },
          {
            label: "Glavna veština",
            description:
              "Uređeno računanje po stepenu. Bez tog reda polinomi brzo postanu nepregledni.",
          },
          {
            label: "Tipičan zadatak",
            description:
              "Sredi, izračunaj, odredi stepen. Često se traži i ostatak pri deljenju linearnim polinomom.",
          },
          {
            label: "Važna napomena",
            description:
              "Nulti polinom je poseban slučaj. U ovoj lekciji ne dodeljujemo mu standardan stepen.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE VAŽNO ═══════════ */}
      <LessonSection
        id="vaznost"
        eyebrow="Zašto je ova lekcija važna"
        title="Polinomi su jezik velikog dela školske algebre"
        description="Ako ovde uvedeš dobar red, kasnije će ti biti mnogo lakši faktorisanje, racionalni izrazi, jednačine višeg stepena, Bezuova teorema i Hornerova šema."
      >
        <div className={s.grid2}>
          <SectionCard title="Prva velika ideja">
            <p>
              Polinom nije samo niz članova. On ima <em>strukturu</em>:
              koeficijenti stoje uz određene stepene promenljive, pa svaka
              operacija mora da poštuje te stepene.
            </p>
          </SectionCard>
          <SectionCard title="Praktično pravilo">
            <p>
              Kad god vidiš polinom, uradi tri koraka:{" "}
              <strong>sredi</strong>, <strong>poređaj</strong>,{" "}
              <strong>tek onda računaj</strong>. To je najkraći put do tačnog
              rešenja.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid3} style={{ marginTop: 16 }}>
          <SectionCard title="Bez sređivanja">
            <p>
              Lako pomešaš članove različitog stepena i pogrešno pročitaš stepen
              polinoma.
            </p>
          </SectionCard>
          <SectionCard title="Sa sređivanjem">
            <p>
              Odmah vidiš vodeći član, koeficijente, konstantni član i šta sme
              da se sabira.
            </p>
          </SectionCard>
          <SectionCard title="Na prijemnom">
            <p>
              Često greška nije u ideji, nego u neurednom zapisu. Ova lekcija to
              popravlja.
            </p>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ OSNOVE ═══════════ */}
      <LessonSection
        id="osnove"
        eyebrow="Osnove"
        title="Šta je polinom jedne promenljive"
        description="Polinom jedne promenljive je izraz oblika a_n x^n + a_{n-1} x^{n-1} + ... + a_1 x + a_0, gde su koeficijenti brojevi, a stepeni promenljive su nenegativni celi brojevi."
      >
        <div className={s.grid2}>
          <FormulaCard
            title="Kanonski oblik"
            formula="P(x)=5x^4-2x^2+3x-7"
            note={
              <>
                Polinom je u kanonskom obliku kada su svi slični članovi
                sabrani, a članovi poređani po opadajućim stepenima.
              </>
            }
          />
          <FormulaCard
            title="Vodeći koeficijent i konstantni član"
            formula={"\text{vodeći član: }5x^4,\quad \text{konstantni član: }-7"}
            note={
              <>
                U polinomu <InlineMath>{"5x^4-2x^2+3x-7"}</InlineMath> vodeći
                koeficijent je <InlineMath>{"5"}</InlineMath>, a konstantni član
                je <InlineMath>{"-7"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Stepen polinoma"
            formula={"\deg(5x^4-2x^2+3x-7)=4"}
            note="Stepen polinoma je najveći eksponent uz koji stoji koeficijent različit od nule."
          />
          <FormulaCard
            title="Nulti polinom"
            formula={"P(x)=0 \Rightarrow \text{ poseban slučaj}"}
            note="Polinom 0 nema vodeći član. U ovoj lekciji ga tretiramo kao poseban slučaj i ne koristimo mu standardan stepen."
          />
        </div>

        <InsightCard title="Ne čitaj stepen iz nesređenog izraza">
          <p>
            U izrazu <InlineMath>{"3x-2x^3+5-x^2+7x^3"}</InlineMath> najpre
            saberi članove istog stepena:{" "}
            <InlineMath>{"-2x^3+7x^3=5x^3"}</InlineMath>. Tek tada dobijaš
            kanonski oblik <InlineMath>{"5x^3-x^2+3x+5"}</InlineMath>, pa je
            stepen jednak <InlineMath>{"3"}</InlineMath>.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera 1: Da li je 4+x⁵-2x+x² u kanonskom obliku?"
          answer={
            <p>
              Nije, jer članovi nisu poređani po opadajućim stepenima. Kanonski
              oblik je <InlineMath>{"x^5+x^2-2x+4"}</InlineMath>.
            </p>
          }
        />

        <MicroCheck
          question="Mikro-provera 2: Koliki je stepen polinoma -7?"
          answer={
            <p>
              To je nenulti konstantni polinom, pa je stepen{" "}
              <InlineMath>{"0"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ OPERACIJE ═══════════ */}
      <LessonSection
        id="operacije"
        eyebrow="Osnovne operacije sa polinomima"
        title="Sabiranje, oduzimanje, množenje i deljenje"
        description="Sve operacije postaju jednostavne kada pišeš uredno. Polinome zamišljaj kao tabele koeficijenata: uz x³ idu koeficijenti za x³, uz x² oni za x², i tako redom."
      >
        <div className={s.grid2}>
          <SectionCard title="Sabiranje i oduzimanje">
            <p>
              Sabiraju se samo članovi istog stepena. Zato je korisno da oba
              polinoma napišeš u kanonskom obliku i da ispod{" "}
              <InlineMath>{"x^3"}</InlineMath> stoji{" "}
              <InlineMath>{"x^3"}</InlineMath>, ispod{" "}
              <InlineMath>{"x^2"}</InlineMath> stoji{" "}
              <InlineMath>{"x^2"}</InlineMath>, i tako dalje.
            </p>
            <MathBlock>
              {"(2x^3-x+4)+(x^3+3x^2-6x+2)=3x^3+3x^2-7x+6"}
            </MathBlock>
          </SectionCard>

          <SectionCard title="Množenje">
            <p>
              Svaki član prvog polinoma množi se svakim članom drugog. Posle
              toga se srede članovi istog stepena. Ovo je samo šira verzija
              distributivnosti.
            </p>
            <MathBlock>{"(2x-3)(x^2+x+1)=2x^3-x^2-x-3"}</MathBlock>
          </SectionCard>
        </div>

        <InsightCard title="Stepen pri množenju">
          <p>
            Ako su <InlineMath>{"P"}</InlineMath> i{" "}
            <InlineMath>{"Q"}</InlineMath> nenulti polinomi, tada važi{" "}
            <InlineMath>{"\\deg(P\\cdot Q)=\\deg P+\\deg Q"}</InlineMath>. To
            je veoma korisna brza provera: ako dobiješ manji stepen nego što
            očekuješ, verovatno si negde izgubio član.
          </p>
        </InsightCard>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Deljenje polinoma i teorem o deljenju sa ostatkom">
            <p>
              Ako polinom <InlineMath>{"P(x)"}</InlineMath> deliš polinomom{" "}
              <InlineMath>{"D(x)\\neq 0"}</InlineMath>, postoje jedinstveni
              polinomi <InlineMath>{"Q(x)"}</InlineMath> i{" "}
              <InlineMath>{"R(x)"}</InlineMath> takvi da važi:
            </p>
            <MathBlock>
              {
                "P(x)=D(x)\\cdot Q(x)+R(x),\\quad \\deg R < \\deg D \\text{ ili } R(x)=0"
              }
            </MathBlock>
            <p>
              To znači: ostatak mora da bude &ldquo;manji&rdquo; od delioca po
              stepenu. Ako to nije ispunjeno, deljenje još nije završeno.
            </p>
          </SectionCard>

          <SectionCard title="Algoritam deljenja">
            <ol>
              <li>Poredi vodeće članove deljenika i delioca.</li>
              <li>
                Odredi prvi član količnika tako da ukloni vodeći član deljenika.
              </li>
              <li>Pomnoži delilac tim članom količnika i oduzmi.</li>
              <li>
                Ponovi postupak dok ostatak ne dobije manji stepen od delioca.
              </li>
            </ol>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ INTERAKTIVNO ═══════════ */}
      <LessonSection
        id="interaktivno"
        eyebrow="Interaktivni laboratorijum"
        title="Polinomski laboratorijum: sabiranje, oduzimanje, množenje"
        description="Ovde menjaš koeficijente polinoma P(x) i Q(x), biraš operaciju i odmah vidiš kako se koeficijenti poravnavaju po stepenu. To je najbrži način da razumeš zašto se sabiraju samo slični članovi i zašto pri množenju nastaju novi stepeni."
      >
        <PolyLab />

        <InsightCard title="Kako da koristiš laboratorijum">
          <p>
            Za sabiranje i oduzimanje gledaj kolone istog stepena. Za množenje
            prati kako se novi članovi pojavljuju zato što se stepeni sabiraju:{" "}
            <InlineMath>{"x^2 \\cdot x^3 = x^5"}</InlineMath>.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Primeri koji grade rutinu za prijemni"
        description="Primeri su složeni po rastućoj težini: od sređivanja i stepena, preko osnovnih operacija, do deljenja sa ostatkom."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: Kanonski oblik i stepen
            </h3>
            <p>Odredi kanonski oblik i stepen polinoma:</p>
            <MathBlock>{"P(x)=3x-2x^3+5-x^2+7x^3"}</MathBlock>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Spoji članove istog stepena.">
                <MathBlock>{"-2x^3+7x^3=5x^3"}</MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Poređaj po opadajućim stepenima.">
                <MathBlock>{"P(x)=5x^3-x^2+3x+5"}</MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Očitaj stepen.">
                <p>
                  Najveći stepen je <InlineMath>{"3"}</InlineMath>, pa je{" "}
                  <InlineMath>{"\\deg P=3"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>Primer 2: Sabiranje polinoma</h3>
            <MathBlock>
              {"(2x^3-x^2+4x-5)+(x^3+3x^2-6x+2)"}
            </MathBlock>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Spoji <InlineMath>{"x^3"}</InlineMath>-članove.
                  </>
                }
              >
                <MathBlock>{"2x^3+x^3=3x^3"}</MathBlock>
              </WalkStep>
              <WalkStep
                number={2}
                title={
                  <>
                    Spoji <InlineMath>{"x^2"}</InlineMath>-članove.
                  </>
                }
              >
                <MathBlock>{"-x^2+3x^2=2x^2"}</MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Spoji x-članove i konstante.">
                <p>
                  <InlineMath>{"4x-6x=-2x"}</InlineMath>,{" "}
                  <InlineMath>{"-5+2=-3"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={4} title="Rezultat.">
                <MathBlock>{"3x^3+2x^2-2x-3"}</MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>Primer 3: Oduzimanje polinoma</h3>
            <MathBlock>{"(4x^3-x+7)-(x^3+2x^2-5x-1)"}</MathBlock>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Obrati pažnju na minus ispred zagrade."
              >
                <p>
                  Promeni znakove:{" "}
                  <InlineMath>{"-x^3-2x^2+5x+1"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Saberi sa prvim polinomom.">
                <MathBlock>{"4x^3-x+7-x^3-2x^2+5x+1"}</MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Sredi rezultat.">
                <MathBlock>{"3x^3-2x^2+4x+8"}</MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>Primer 4: Množenje polinoma</h3>
            <MathBlock>{"(2x-3)(x^2+x+1)"}</MathBlock>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Pomnoži <InlineMath>{"2x"}</InlineMath> sa svakim članom.
                  </>
                }
              >
                <MathBlock>{"2x^3+2x^2+2x"}</MathBlock>
              </WalkStep>
              <WalkStep
                number={2}
                title={
                  <>
                    Pomnoži <InlineMath>{"-3"}</InlineMath> sa svakim članom.
                  </>
                }
              >
                <MathBlock>{"-3x^2-3x-3"}</MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Sredi rezultat.">
                <MathBlock>{"2x^3+(2x^2-3x^2)+(2x-3x)-3"}</MathBlock>
              </WalkStep>
              <WalkStep number={4} title="Konačno.">
                <MathBlock>{"2x^3-x^2-x-3"}</MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 5 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 5: Deljenje sa ostatkom
            </h3>
            <MathBlock>{"(2x^3+3x^2-x+5):(x-1)"}</MathBlock>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Prvi član količnika.">
                <p>
                  <InlineMath>{"2x^3:x=2x^2"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Oduzmi.">
                <p>
                  Oduzmi{" "}
                  <InlineMath>{"(x-1)\\cdot 2x^2=2x^3-2x^2"}</InlineMath>, pa
                  ostaje <InlineMath>{"5x^2-x+5"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Nastavi sa 5x.">
                <p>
                  <InlineMath>{"5x^2:x=5x"}</InlineMath>. Posle oduzimanja
                  ostaje <InlineMath>{"4x+5"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={4} title="Poslednji član količnika.">
                <p>
                  Poslednji član je <InlineMath>{"4"}</InlineMath>. Posle
                  oduzimanja ostaje <InlineMath>{"9"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={5} title="Konačni zapis.">
                <MathBlock>
                  {"2x^3+3x^2-x+5=(x-1)(2x^2+5x+4)+9"}
                </MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 6 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>Primer 6: Tačno deljenje</h3>
            <MathBlock>{"(x^3-1):(x-1)"}</MathBlock>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Podeli.">
                <p>
                  Deljenjem dobijaš količnik{" "}
                  <InlineMath>{"x^2+x+1"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Ostatak je 0.">
                <p>Deljenje je tačno.</p>
              </WalkStep>
              <WalkStep number={3} title="Zapis.">
                <MathBlock>{"x^3-1=(x-1)(x^2+x+1)"}</MathBlock>
              </WalkStep>
            </div>
          </article>
        </div>

        <MicroCheck
          question="Zašto je ostatak u primeru 5 baš broj 9?"
          answer={
            <p>
              Pošto je delilac <InlineMath>{"x-1"}</InlineMath>, ostatak mora da
              ima stepen manji od <InlineMath>{"1"}</InlineMath>, dakle mora da
              bude konstanta. U računu smo dobili baš konstantu{" "}
              <InlineMath>{"9"}</InlineMath>, što je potpuno u skladu sa
              teoremom o deljenju sa ostatkom.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ FORMULE ═══════════ */}
      <LessonSection
        id="formule"
        eyebrow="Ključne formule i pravila"
        title="Sve na jednom mestu"
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Kanonski oblik"
            formula={"P(x)=a_nx^n+a_{n-1}x^{n-1}+\dots+a_1x+a_0"}
            note="Tek iz sređenog polinoma čitaš stepen, vodeći koeficijent i konstantni član."
          />
          <FormulaCard
            title="Stepen"
            formula={"\deg(a_nx^n+\dots+a_0)=n,\;\text{ako je }a_n\neq 0"}
            note="Za nenulti konstantni polinom stepen je 0. Nulti polinom ovde posmatramo posebno."
          />
          <FormulaCard
            title="Sabiranje i oduzimanje"
            formula="(a_2x^2+a_1x+a_0)+(b_2x^2+b_1x+b_0)=(a_2+b_2)x^2+(a_1+b_1)x+(a_0+b_0)"
            note="Samo isti stepeni idu zajedno. Koeficijenti uz x^k sabiraju se ili oduzimaju posebno za svaki k."
          />
          <FormulaCard
            title="Množenje"
            formula="(x+a)(x+b)=x^2+(a+b)x+ab"
            note="Svaki član prvog polinoma množi se svakim članom drugog, pa se onda sređuju slični članovi."
          />
          <FormulaCard
            title="Stepen proizvoda"
            formula={"\deg(P\cdot Q)=\deg P+\deg Q"}
            note="Brza kontrola računa: ako su oba polinoma nenulta, stepen proizvoda je zbir stepena."
          />
          <FormulaCard
            title="Deljenje sa ostatkom"
            formula={"P(x)=D(x)\cdot Q(x)+R(x),\quad \deg R<\deg D"}
            note="Ostatak mora da ima manji stepen od delioca. Ako je ostatak 0, deljenje je tačno."
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAMKE ═══════════ */}
      <LessonSection
        id="zamke"
        eyebrow="Česte greške"
        title="Kako da ih izbegneš"
      >
        <div className={s.summaryGrid}>
          <SectionCard title="Greška 1: Spajanje nesličnih članova">
            <p>
              <InlineMath>{"2x^2+3x"}</InlineMath> ne može da postane{" "}
              <InlineMath>{"5x^2"}</InlineMath> niti{" "}
              <InlineMath>{"5x"}</InlineMath>. Sabiraju se samo isti stepeni.
            </p>
          </SectionCard>
          <SectionCard title="Greška 2: Pogrešno čitanje stepena">
            <p>
              Ne posmatraj nasumičan redosled članova. Sredi polinom i tek onda
              čitaj stepen.
            </p>
          </SectionCard>
          <SectionCard title="Greška 3: Zaboravljen minus ispred zagrade">
            <p>
              Kod oduzimanja drugog polinoma moraju da se promene znakovi svih
              njegovih članova.
            </p>
          </SectionCard>
          <SectionCard title="Greška 4: Nepotpuno množenje">
            <p>
              Ako jedan član nisi pomnožio sa svim članovima drugog polinoma,
              rezultat je nepotpun.
            </p>
          </SectionCard>
          <SectionCard title="Greška 5: Ostatak prevelikog stepena">
            <p>
              Ako pri deljenju dobiješ ostatak koji ima isti ili veći stepen od
              delioca, deljenje nije završeno.
            </p>
          </SectionCard>
          <SectionCard title="Greška 6: Zbunjenost oko nultog polinoma">
            <p>
              <InlineMath>{"0"}</InlineMath> nema vodeći član. Zato ga u ovoj
              lekciji tretiramo odvojeno od običnih slučajeva.
            </p>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Prijemni fokus"
        title="Šta se najčešće traži na prijemnom"
        description="Na prijemnim zadacima polinomi se retko javljaju izolovano. Obično su priprema za sledeći korak: faktorisanje, rešavanje jednačina, ostatak pri deljenju ili procenu stepena izraza."
      >
        <div className={s.grid2}>
          <SectionCard title="Šta se najčešće traži">
            <ul>
              <li>da središ izraz u kanonski oblik</li>
              <li>da odrediš stepen i vodeći koeficijent</li>
              <li>da izračunaš zbir, razliku ili proizvod polinoma</li>
              <li>
                da odrediš količnik i ostatak pri deljenju linearnim polinomom
              </li>
            </ul>
          </SectionCard>
          <SectionCard title="Brza strategija">
            <ul>
              <li>prepiši uredno po stepenima</li>
              <li>
                ostavi &ldquo;prazna mesta&rdquo; za stepene koji nedostaju
              </li>
              <li>posle množenja proveri očekivani stepen</li>
              <li>
                kod deljenja proveri da li je ostatak manjeg stepena od delioca
              </li>
            </ul>
          </SectionCard>
        </div>

        <InsightCard title="Pedagoški savet za vežbanje">
          <p>
            Ako ti se polinomi &ldquo;raspadaju&rdquo; tokom računa, napiši ih
            kao niz koeficijenata po kolonama. Taj mali organizacioni korak
            drastično smanjuje broj mehaničkih grešaka.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe na kraju"
        title="Proveri da li ti je jasan red rada"
        description="Probaj prvo samostalno, pa tek onda otvori rešenje. Upravo na ovim kratkim zadacima se najbrže vidi da li ti je jasan red rada."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vežba 1: Kanonski oblik i stepen"
            problem={
              <>
                <p>Odredi kanonski oblik i stepen:</p>
                <MathBlock>{"4x-3x^4+2x^2-x+x^4-7"}</MathBlock>
              </>
            }
            solution={
              <>
                <p>
                  Spoji slične članove:{" "}
                  <InlineMath>{"-3x^4+x^4=-2x^4"}</InlineMath>, a{" "}
                  <InlineMath>{"4x-x=3x"}</InlineMath>.
                </p>
                <p>
                  Kanonski oblik je{" "}
                  <InlineMath>{"-2x^4+2x^2+3x-7"}</InlineMath>, pa je stepen{" "}
                  <InlineMath>{"4"}</InlineMath>.
                </p>
              </>
            }
          />

          <ExerciseCard
            title="Vežba 2: Sabiranje"
            problem={
              <>
                <p>Izračunaj:</p>
                <MathBlock>{"(2x^3-x+1)+(-x^3+4x^2+5x-6)"}</MathBlock>
              </>
            }
            solution={
              <>
                <p>
                  <InlineMath>{"2x^3-x^3=x^3"}</InlineMath>, zatim{" "}
                  <InlineMath>{"4x^2"}</InlineMath>, pa{" "}
                  <InlineMath>{"-x+5x=4x"}</InlineMath>, i{" "}
                  <InlineMath>{"1-6=-5"}</InlineMath>.
                </p>
                <p>
                  Rezultat je <InlineMath>{"x^3+4x^2+4x-5"}</InlineMath>.
                </p>
              </>
            }
          />

          <ExerciseCard
            title="Vežba 3: Oduzimanje"
            problem={
              <>
                <p>Izračunaj:</p>
                <MathBlock>{"(x^3+5x^2+x-4)-(3x^2-2x+1)"}</MathBlock>
              </>
            }
            solution={
              <>
                <p>
                  Promeni znakove drugog polinoma:{" "}
                  <InlineMath>{"-3x^2+2x-1"}</InlineMath>.
                </p>
                <p>
                  Dobijaš <InlineMath>{"x^3+2x^2+3x-5"}</InlineMath>.
                </p>
              </>
            }
          />

          <ExerciseCard
            title="Vežba 4: Množenje"
            problem={
              <>
                <p>Izračunaj:</p>
                <MathBlock>{"(x-2)(x^2+3x-1)"}</MathBlock>
              </>
            }
            solution={
              <>
                <p>
                  <InlineMath>{"x(x^2+3x-1)=x^3+3x^2-x"}</InlineMath>, a{" "}
                  <InlineMath>{"-2(x^2+3x-1)=-2x^2-6x+2"}</InlineMath>.
                </p>
                <p>
                  Posle sređivanja:{" "}
                  <InlineMath>{"x^3+x^2-7x+2"}</InlineMath>.
                </p>
              </>
            }
          />

          <ExerciseCard
            title="Vežba 5: Tačno deljenje"
            problem={
              <>
                <p>Izračunaj količnik i ostatak:</p>
                <MathBlock>{"(x^3+2x^2-5x-6):(x+3)"}</MathBlock>
              </>
            }
            solution={
              <>
                <p>
                  Dugim deljenjem dobijaš količnik{" "}
                  <InlineMath>{"x^2-x-2"}</InlineMath>.
                </p>
                <p>
                  Pošto važi{" "}
                  <InlineMath>
                    {"x^3+2x^2-5x-6=(x+3)(x^2-x-2)"}
                  </InlineMath>
                  , ostatak je <InlineMath>{"0"}</InlineMath>.
                </p>
              </>
            }
          />

          <ExerciseCard
            title="Vežba 6: Razumevanje ostatka"
            problem={
              <>
                <p>Dovrši zapis deljenja:</p>
                <MathBlock>
                  {"3x^2+4x+7=(x+1)\\cdot Q(x)+R(x)"}
                </MathBlock>
              </>
            }
            solution={
              <>
                <p>
                  Dugim deljenjem ili proverom dobijaš{" "}
                  <InlineMath>{"Q(x)=3x+1"}</InlineMath> i{" "}
                  <InlineMath>{"R(x)=6"}</InlineMath>.
                </p>
                <p>
                  Zaista:{" "}
                  <InlineMath>{"(x+1)(3x+1)=3x^2+4x+1"}</InlineMath>, pa do{" "}
                  <InlineMath>{"3x^2+4x+7"}</InlineMath> nedostaje još{" "}
                  <InlineMath>{"6"}</InlineMath>.
                </p>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Ključne poruke iz ove lekcije"
      >
        <div className={s.summaryGrid}>
          <SectionCard title="Korak 1: Sredi polinom">
            <p>
              Saberi slične članove i poređaj ih po opadajućim stepenima.
            </p>
          </SectionCard>
          <SectionCard title="Korak 2: Tek tada čitaj stepen">
            <p>Stepen je najveći eksponent uz nenulti koeficijent.</p>
          </SectionCard>
          <SectionCard title="Korak 3: Saberi i oduzmi po kolonama">
            <p>Isti stepeni idu zajedno, svi ostali ostaju odvojeni.</p>
          </SectionCard>
          <SectionCard title="Korak 4: Množi svaki sa svakim">
            <p>
              Posle množenja obavezno sredi rezultat i proveri očekivani stepen.
            </p>
          </SectionCard>
          <SectionCard title="Korak 5: Deljenje završava tek kada ostatak postane manji">
            <p>
              Ostatak mora da ima manji stepen od delioca ili da bude nula.
            </p>
          </SectionCard>
          <SectionCard title="Ključna poruka: Red zapisa je pola rešenja">
            <p>
              Većina grešaka u polinomima nije teška matematika, nego loša
              organizacija računa.
            </p>
          </SectionCard>
        </div>

        <p style={{ marginTop: 22, color: "var(--lesson-muted)" }}>
          Ako ti je ova lekcija jasna, sledeći prirodan korak je da povežeš
          deljenje polinoma sa ostatkom pri deljenju, nulama polinoma i
          Bezuovom teoremom.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
