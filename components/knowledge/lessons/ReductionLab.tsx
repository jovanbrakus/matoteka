"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { MathJax } from "better-react-mathjax";
import s from "@/styles/lesson-layout.module.css";

/* ── Types ── */

type FamilyKey =
  | "direct"
  | "180minus"
  | "180plus"
  | "360minus"
  | "90minus"
  | "90plus"
  | "270minus"
  | "270plus";

type TrigFn = "sin" | "cos" | "tan" | "cot";

interface Reduction {
  sign: 1 | -1;
  fn: TrigFn;
}

interface Family {
  label: string;
  patternLatex: string;
  note: string;
  theta: (alpha: number) => number;
  reductions: Record<TrigFn, Reduction>;
}

/* ── Constants ── */

const FAMILIES: Record<FamilyKey, Family> = {
  direct: {
    label: "\u03B8 = \u03B1",
    patternLatex: "\\theta = \\alpha",
    note: "ugao je vec u prvom kvadrantu",
    theta: (a) => a,
    reductions: {
      sin: { sign: 1, fn: "sin" },
      cos: { sign: 1, fn: "cos" },
      tan: { sign: 1, fn: "tan" },
      cot: { sign: 1, fn: "cot" },
    },
  },
  "180minus": {
    label: "\u03B8 = 180\u00B0 \u2212 \u03B1",
    patternLatex: "\\theta = 180^\\circ - \\alpha",
    note: "ista funkcija, znak iz II kvadranta",
    theta: (a) => 180 - a,
    reductions: {
      sin: { sign: 1, fn: "sin" },
      cos: { sign: -1, fn: "cos" },
      tan: { sign: -1, fn: "tan" },
      cot: { sign: -1, fn: "cot" },
    },
  },
  "180plus": {
    label: "\u03B8 = 180\u00B0 + \u03B1",
    patternLatex: "\\theta = 180^\\circ + \\alpha",
    note: "ista funkcija, znak iz III kvadranta",
    theta: (a) => 180 + a,
    reductions: {
      sin: { sign: -1, fn: "sin" },
      cos: { sign: -1, fn: "cos" },
      tan: { sign: 1, fn: "tan" },
      cot: { sign: 1, fn: "cot" },
    },
  },
  "360minus": {
    label: "\u03B8 = 360\u00B0 \u2212 \u03B1",
    patternLatex: "\\theta = 360^\\circ - \\alpha",
    note: "ista funkcija, znak iz IV kvadranta",
    theta: (a) => 360 - a,
    reductions: {
      sin: { sign: -1, fn: "sin" },
      cos: { sign: 1, fn: "cos" },
      tan: { sign: -1, fn: "tan" },
      cot: { sign: -1, fn: "cot" },
    },
  },
  "90minus": {
    label: "\u03B8 = 90\u00B0 \u2212 \u03B1",
    patternLatex: "\\theta = 90^\\circ - \\alpha",
    note: "kofunkcija bez promene znaka",
    theta: (a) => 90 - a,
    reductions: {
      sin: { sign: 1, fn: "cos" },
      cos: { sign: 1, fn: "sin" },
      tan: { sign: 1, fn: "cot" },
      cot: { sign: 1, fn: "tan" },
    },
  },
  "90plus": {
    label: "\u03B8 = 90\u00B0 + \u03B1",
    patternLatex: "\\theta = 90^\\circ + \\alpha",
    note: "kofunkcija uz znak iz II kvadranta",
    theta: (a) => 90 + a,
    reductions: {
      sin: { sign: 1, fn: "cos" },
      cos: { sign: -1, fn: "sin" },
      tan: { sign: -1, fn: "cot" },
      cot: { sign: -1, fn: "tan" },
    },
  },
  "270minus": {
    label: "\u03B8 = 270\u00B0 \u2212 \u03B1",
    patternLatex: "\\theta = 270^\\circ - \\alpha",
    note: "kofunkcija uz znak iz III kvadranta",
    theta: (a) => 270 - a,
    reductions: {
      sin: { sign: -1, fn: "cos" },
      cos: { sign: -1, fn: "sin" },
      tan: { sign: 1, fn: "cot" },
      cot: { sign: 1, fn: "tan" },
    },
  },
  "270plus": {
    label: "\u03B8 = 270\u00B0 + \u03B1",
    patternLatex: "\\theta = 270^\\circ + \\alpha",
    note: "kofunkcija uz znak iz IV kvadranta",
    theta: (a) => 270 + a,
    reductions: {
      sin: { sign: -1, fn: "cos" },
      cos: { sign: 1, fn: "sin" },
      tan: { sign: -1, fn: "cot" },
      cot: { sign: -1, fn: "tan" },
    },
  },
};

const FN_LATEX: Record<TrigFn, string> = {
  sin: "\\sin",
  cos: "\\cos",
  tan: "\\operatorname{tg}",
  cot: "\\operatorname{ctg}",
};

const FN_LABELS: Record<TrigFn, string> = {
  sin: "Sinus",
  cos: "Kosinus",
  tan: "Tangens",
  cot: "Kotangens",
};

const EXACT_VALUES: Record<
  number,
  Record<TrigFn, string>
> = {
  0: { sin: "0", cos: "1", tan: "0", cot: "\\text{n.d.}" },
  30: {
    sin: "\\frac{1}{2}",
    cos: "\\frac{\\sqrt{3}}{2}",
    tan: "\\frac{\\sqrt{3}}{3}",
    cot: "\\sqrt{3}",
  },
  45: {
    sin: "\\frac{\\sqrt{2}}{2}",
    cos: "\\frac{\\sqrt{2}}{2}",
    tan: "1",
    cot: "1",
  },
  60: {
    sin: "\\frac{\\sqrt{3}}{2}",
    cos: "\\frac{1}{2}",
    tan: "\\sqrt{3}",
    cot: "\\frac{\\sqrt{3}}{3}",
  },
  90: { sin: "1", cos: "0", tan: "\\text{n.d.}", cot: "0" },
};

const PRESETS = [0, 30, 45, 60, 90];

/* ── Utility functions ── */

function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function normalize360(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

function trigValue(fn: TrigFn, deg: number): number | null {
  const rad = degToRad(deg);
  const eps = 1e-10;
  const sinVal = Math.sin(rad);
  const cosVal = Math.cos(rad);
  if (fn === "sin") return Math.abs(sinVal) < eps ? 0 : sinVal;
  if (fn === "cos") return Math.abs(cosVal) < eps ? 0 : cosVal;
  if (fn === "tan") {
    if (Math.abs(cosVal) < eps) return null;
    const v = sinVal / cosVal;
    return Math.abs(v) < eps ? 0 : v;
  }
  if (Math.abs(sinVal) < eps) return null;
  const v = cosVal / sinVal;
  return Math.abs(v) < eps ? 0 : v;
}

function signedLatex(sign: number, val: string): string {
  if (val === "\\text{n.d.}") return val;
  if (sign === 1 || val === "0") return val;
  return val.startsWith("-") ? val.slice(1) : `-${val}`;
}

function quadrantLabel(deg: number): { label: string; hint: string } {
  const n = normalize360(deg);
  const eps = 1e-10;
  if (Math.abs(n) < eps || Math.abs(n - 360) < eps)
    return { label: "pozitivna x-osa", hint: "na pozitivnoj x-osi" };
  if (Math.abs(n - 90) < eps)
    return { label: "pozitivna y-osa", hint: "na pozitivnoj y-osi" };
  if (Math.abs(n - 180) < eps)
    return { label: "negativna x-osa", hint: "na negativnoj x-osi" };
  if (Math.abs(n - 270) < eps)
    return { label: "negativna y-osa", hint: "na negativnoj y-osi" };
  if (n > 0 && n < 90)
    return { label: "I kvadrant", hint: "sve funkcije pozitivne" };
  if (n > 90 && n < 180)
    return { label: "II kvadrant", hint: "pozitivan je samo sinus" };
  if (n > 180 && n < 270)
    return { label: "III kvadrant", hint: "pozitivni su tg i ctg" };
  return { label: "IV kvadrant", hint: "pozitivan je samo kosinus" };
}

function buildFormulaLatex(
  fnName: TrigFn,
  thetaDeg: number,
  alpha: number,
  red: Reduction
): string {
  const lhs = `${FN_LATEX[fnName]}\\left(${thetaDeg}^\\circ\\right)`;
  const rhsFn = FN_LATEX[red.fn];
  const rhs = `${red.sign === -1 ? "-" : ""}${rhsFn}\\left(${alpha}^\\circ\\right)`;
  const exact = EXACT_VALUES[alpha]?.[red.fn];
  if (exact) {
    return `${lhs}=${rhs}=${signedLatex(red.sign, exact)}`;
  }
  const val = trigValue(fnName, thetaDeg);
  const dec = val === null ? "\\text{n.d.}" : val.toFixed(4);
  return `${lhs}=${rhs}\\approx ${dec}`;
}

/* ── Canvas drawing ── */

function renderCanvas(
  canvas: HTMLCanvasElement,
  thetaDeg: number,
  alphaDeg: number
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const size = Math.max(320, Math.floor(rect.width || 500));
  canvas.width = Math.floor(size * ratio);
  canvas.height = Math.floor(size * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, size, size);

  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.34;
  const normalT = normalize360(thetaDeg);
  const normalTRad = degToRad(normalT);
  const alphaRad = degToRad(alphaDeg);

  // background
  ctx.fillStyle = "#0b0503";
  ctx.fillRect(0, 0, size, size);

  // grid circles
  ctx.strokeStyle = "rgba(255,255,255,0.06)";
  ctx.lineWidth = 1;
  for (let i = 1; i <= 5; i++) {
    ctx.beginPath();
    ctx.arc(cx, cy, (i * size) / 12, 0, Math.PI * 2);
    ctx.stroke();
  }

  // axes
  ctx.strokeStyle = "rgba(255,255,255,0.14)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(0, cy);
  ctx.lineTo(size, cy);
  ctx.moveTo(cx, 0);
  ctx.lineTo(cx, size);
  ctx.stroke();

  // unit circle
  ctx.strokeStyle = "rgba(255,255,255,0.22)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  // theta arc
  const tX = cx + r * Math.cos(-normalTRad);
  const tY = cy + r * Math.sin(-normalTRad);
  ctx.strokeStyle = "#ec5b13";
  ctx.lineWidth = 2.8;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(tX, tY);
  ctx.stroke();

  // theta arc indicator
  ctx.strokeStyle = "rgba(236,91,19,0.5)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  const arcR = r * 0.22;
  if (normalTRad > 0) {
    ctx.arc(cx, cy, arcR, 0, -normalTRad, true);
  } else {
    ctx.arc(cx, cy, arcR, 0, -normalTRad, false);
  }
  ctx.stroke();

  // theta point
  ctx.fillStyle = "#ec5b13";
  ctx.beginPath();
  ctx.arc(tX, tY, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ec5b13";
  ctx.font = `600 ${Math.round(size * 0.026)}px "Public Sans", sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText(`\u03B8 = ${Math.round(normalT)}\u00B0`, tX + 18, tY - 14);

  // dashed projections
  ctx.setLineDash([5, 5]);
  ctx.strokeStyle = "rgba(255,255,255,0.16)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(tX, tY);
  ctx.lineTo(tX, cy);
  ctx.moveTo(tX, tY);
  ctx.lineTo(cx, tY);
  ctx.stroke();
  ctx.setLineDash([]);

  // reference angle (alpha) in first quadrant
  if (alphaDeg > 0 && alphaDeg < 90) {
    const aX = cx + r * Math.cos(-alphaRad);
    const aY = cy + r * Math.sin(-alphaRad);
    ctx.strokeStyle = "#8fd7ff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(aX, aY);
    ctx.stroke();

    // alpha arc
    ctx.strokeStyle = "rgba(143,215,255,0.5)";
    ctx.lineWidth = 1.6;
    const aArcR = r * 0.16;
    ctx.beginPath();
    ctx.arc(cx, cy, aArcR, 0, -alphaRad, true);
    ctx.stroke();

    // alpha point
    ctx.fillStyle = "#8fd7ff";
    ctx.beginPath();
    ctx.arc(aX, aY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#8fd7ff";
    ctx.font = `600 ${Math.round(size * 0.024)}px "Public Sans", sans-serif`;
    ctx.fillText(`\u03B1 = ${Math.round(alphaDeg)}\u00B0`, aX + 16, aY - 10);
  }

  // quadrant labels
  ctx.fillStyle = "rgba(255,255,255,0.18)";
  ctx.font = `700 ${Math.round(size * 0.02)}px "Public Sans", sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText("I", cx + r * 0.55, cy - r * 0.55);
  ctx.fillText("II", cx - r * 0.55, cy - r * 0.55);
  ctx.fillText("III", cx - r * 0.55, cy + r * 0.6);
  ctx.fillText("IV", cx + r * 0.55, cy + r * 0.6);
}

/* ── Component ── */

export default function ReductionLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [family, setFamily] = useState<FamilyKey>("180minus");
  const [alpha, setAlpha] = useState(30);

  const fam = FAMILIES[family];
  const thetaDeg = fam.theta(alpha);
  const qi = quadrantLabel(thetaDeg);

  const draw = useCallback(() => {
    if (!canvasRef.current) return;
    renderCanvas(canvasRef.current, thetaDeg, alpha);
  }, [thetaDeg, alpha]);

  useEffect(() => {
    draw();
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [draw]);

  return (
    <div className={s.interactiveShell}>
      {/* Canvas side */}
      <div className={s.canvasWrap}>
        <canvas
          ref={canvasRef}
          className={s.polarCanvas}
          style={{ aspectRatio: "1 / 1" }}
          aria-label="Interaktivna jedinicna kruznica za svodjenje ugla na prvi kvadrant"
        />
        <p
          style={{
            marginTop: 10,
            fontSize: "0.88rem",
            color: "var(--lesson-muted)",
          }}
        >
          Narandzasti krak prikazuje izabrani ugao, a svetloplavi krak
          referentni ugao u prvom kvadrantu.
        </p>
      </div>

      {/* Controls side */}
      <div className={s.interactiveCard}>
        <h3
          style={{
            fontSize: "1.05rem",
            marginBottom: 16,
            color: "var(--lesson-text)",
          }}
        >
          Kontrole laboratorije
        </h3>

        {/* Family select */}
        <div className={s.field} style={{ marginBottom: 14 }}>
          <label htmlFor="family-select">Porodica ugla</label>
          <select
            id="family-select"
            value={family}
            onChange={(e) => setFamily(e.target.value as FamilyKey)}
          >
            {(Object.keys(FAMILIES) as FamilyKey[]).map((k) => (
              <option key={k} value={k}>
                {FAMILIES[k].label}
              </option>
            ))}
          </select>
        </div>

        {/* Alpha slider */}
        <div className={s.rangeWrap}>
          <label>
            Referentni ugao \u03B1:{" "}
            <strong style={{ color: "var(--lesson-accent)" }}>
              {alpha}\u00B0
            </strong>
          </label>
          <input
            type="range"
            min={0}
            max={90}
            step={1}
            value={alpha}
            onChange={(e) => setAlpha(Number(e.target.value))}
          />
        </div>

        {/* Presets */}
        <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
          {PRESETS.map((p) => (
            <button
              key={p}
              className={s.presetBtn}
              style={
                p === alpha
                  ? {
                      background: "rgba(236,91,19,0.22)",
                      borderColor: "rgba(255,154,106,0.4)",
                    }
                  : {}
              }
              onClick={() => setAlpha(p)}
            >
              {p}\u00B0
            </button>
          ))}
        </div>

        {/* Readout */}
        <div className={s.resultsGrid} style={{ marginTop: 18 }}>
          <div className={s.resultCard}>
            <strong>Dobijeni ugao</strong>
            <MathJax dynamic inline>{`\\(${Math.round(thetaDeg)}^\\circ\\)`}</MathJax>
          </div>
          <div className={s.resultCard}>
            <strong>Polozaj</strong>
            <span style={{ color: "var(--lesson-muted-strong)", fontWeight: 700 }}>
              {qi.label}
            </span>
            <br />
            <span style={{ fontSize: "0.84rem", color: "var(--lesson-muted)" }}>
              {qi.hint}
            </span>
          </div>
          <div className={s.resultCard}>
            <strong>Referentni ugao</strong>
            <MathJax dynamic inline>{`\\(${alpha}^\\circ\\)`}</MathJax>
          </div>
          <div className={s.resultCard}>
            <strong>Opsta forma</strong>
            <MathJax dynamic inline>{`\\(${fam.patternLatex}\\)`}</MathJax>
            <br />
            <span style={{ fontSize: "0.84rem", color: "var(--lesson-muted)" }}>
              {fam.note}
            </span>
          </div>
        </div>

        {/* Formula output */}
        <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
          {(["sin", "cos", "tan", "cot"] as TrigFn[]).map((fn) => (
            <div
              key={fn}
              style={{
                padding: "12px 14px",
                borderRadius: 16,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <small
                style={{
                  display: "block",
                  color: "var(--lesson-primary-soft)",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  fontSize: "0.68rem",
                  fontWeight: 800,
                  marginBottom: 6,
                }}
              >
                {FN_LABELS[fn]}
              </small>
              <MathJax dynamic>{`\\[${buildFormulaLatex(fn, Math.round(thetaDeg), alpha, fam.reductions[fn])}\\]`}</MathJax>
            </div>
          ))}
        </div>

        {/* Lab notes */}
        <div className={s.labNote} style={{ marginTop: 14 }}>
          <strong
            style={{
              display: "block",
              color: "var(--lesson-success)",
              marginBottom: 6,
            }}
          >
            Kako da koristis laboratoriju
          </strong>
          <p>
            Probaj isti referentni ugao u vise razlicitih porodica. Tako ces
            odmah videti da ista brojcana vrednost standardnog ugla dobija
            drugaciji znak, ili cak prelazi u drugu funkciju.
          </p>
        </div>
      </div>
    </div>
  );
}
