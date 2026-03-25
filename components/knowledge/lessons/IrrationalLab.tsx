"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MathJax } from "better-react-mathjax";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

/* ── Math helpers ── */

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const temp = x % y;
    x = y;
    y = temp;
  }
  return x || 1;
}

function rationalLatex(num: number, den: number): string {
  if (den === 0) return "\\infty";
  let n = num;
  let d = den;
  if (d < 0) { n *= -1; d *= -1; }
  if (n === 0) return "0";
  const divisor = gcd(n, d);
  n /= divisor;
  d /= divisor;
  if (d === 1) return String(n);
  return `\\frac{${n}}{${d}}`;
}

function numberLatex(value: number): string {
  if (Number.isInteger(value)) return String(value);
  const fixed = value.toFixed(3).replace(/\.?0+$/, "");
  return fixed === "-0" ? "0" : fixed;
}

function signedConstantLatex(value: number, firstTerm: boolean): string {
  if (value === 0 && !firstTerm) return "";
  const abs = numberLatex(Math.abs(value));
  if (firstTerm) return numberLatex(value);
  return value > 0 ? `+ ${abs}` : `- ${abs}`;
}

function linearLatex(m: number, b: number): string {
  const parts: string[] = [];
  if (m !== 0) {
    if (m === 1) parts.push("x");
    else if (m === -1) parts.push("-x");
    else parts.push(`${numberLatex(m)}x`);
  }
  if (b !== 0 || parts.length === 0) {
    parts.push(signedConstantLatex(b, parts.length === 0));
  }
  return parts.join(" ");
}

function quadraticLatex(A: number, B: number, C: number): string {
  const parts: string[] = [];
  if (A !== 0) {
    if (A === 1) parts.push("x^2");
    else if (A === -1) parts.push("-x^2");
    else parts.push(`${numberLatex(A)}x^2`);
  }
  if (B !== 0) {
    const abs = numberLatex(Math.abs(B));
    const term = abs === "1" ? "x" : `${abs}x`;
    if (parts.length === 0) parts.push(B > 0 ? term : `-${term}`);
    else parts.push(B > 0 ? `+ ${term}` : `- ${term}`);
  }
  if (C !== 0 || parts.length === 0) {
    parts.push(signedConstantLatex(C, parts.length === 0));
  }
  return `${parts.join(" ")} = 0`;
}

function uniqueSorted(values: number[]): number[] {
  const sorted = values.slice().sort((x, y) => x - y);
  return sorted.filter((v, i) => i === 0 || Math.abs(v - sorted[i - 1]) > 1e-7);
}

function formatSolutionSet(values: number[]): string {
  if (!values.length) return "\\varnothing";
  if (values.length === 1) return `\\left\\{${numberLatex(values[0])}\\right\\}`;
  return `\\left\\{${values.map((v) => numberLatex(v)).join(", ")}\\right\\}`;
}

/* ── Domain & solver ── */

interface CoefData { a: number; b: number; c: number; d: number }

interface DomainResult {
  kind: "all" | "none" | "right" | "left";
  text: string;
  latex: string;
  boundary: number | null;
}

interface SolveResult {
  domain: DomainResult;
  squared: { A: number; B: number; C: number };
  candidates: number[];
  actualSolutions: number[];
  kind: "all" | "none" | "finite";
}

function getDomain(data: CoefData): DomainResult {
  const { a, b } = data;
  if (a === 0) {
    if (b >= 0) return { kind: "all", text: "Domena korena je ceo skup realnih brojeva.", latex: "x \\in \\mathbb{R}", boundary: null };
    return { kind: "none", text: "Radikand je stalno negativan, pa koren ne postoji ni za jedno realno x.", latex: "\\varnothing", boundary: null };
  }
  const boundary = -b / a;
  return {
    kind: a > 0 ? "right" : "left",
    text: a > 0 ? "Domena pocinje od granicne tacke i ide udesno." : "Domena ide ulevo od granicne tacke.",
    latex: a > 0 ? `x \\ge ${rationalLatex(-b, a)}` : `x \\le ${rationalLatex(-b, a)}`,
    boundary,
  };
}

function isValidSolution(x: number, data: CoefData): boolean {
  const radicand = data.a * x + data.b;
  if (radicand < -1e-7) return false;
  const lhs = Math.sqrt(Math.max(0, radicand));
  const rhs = data.c * x + data.d;
  return Math.abs(lhs - rhs) < 1e-7;
}

function solveEquation(data: CoefData): SolveResult {
  const domain = getDomain(data);
  const squared = {
    A: data.c * data.c,
    B: 2 * data.c * data.d - data.a,
    C: data.d * data.d - data.b,
  };

  let candidates: number[] = [];
  let kind: "all" | "none" | "finite" = "finite";

  if (data.a === 0 && data.c === 0) {
    if (data.b >= 0 && Math.abs(Math.sqrt(data.b) - data.d) < 1e-9) kind = "all";
    else kind = "none";
  } else if (Math.abs(squared.A) < 1e-9) {
    if (Math.abs(squared.B) < 1e-9) candidates = [];
    else candidates = [-squared.C / squared.B];
  } else {
    const discriminant = squared.B * squared.B - 4 * squared.A * squared.C;
    if (discriminant >= -1e-8) {
      const safeDisc = Math.max(0, discriminant);
      const root = Math.sqrt(safeDisc);
      candidates = uniqueSorted([(-squared.B - root) / (2 * squared.A), (-squared.B + root) / (2 * squared.A)]);
    }
  }

  const actualSolutions = kind === "all" ? [] : uniqueSorted(candidates.filter((v) => isValidSolution(v, data)));
  if (kind !== "all" && actualSolutions.length === 0) kind = "none";

  return { domain, squared, candidates, actualSolutions, kind };
}

/* ── Canvas drawing ── */

interface Bounds { xMin: number; xMax: number; yMin: number; yMax: number }

function buildBounds(data: CoefData, result: SolveResult): Bounds {
  const values: number[] = [];
  if (result.domain.boundary != null && Number.isFinite(result.domain.boundary)) values.push(result.domain.boundary);
  result.candidates.forEach((v) => values.push(v));
  result.actualSolutions.forEach((v) => values.push(v));

  let xMin = -6, xMax = 10;
  if (values.length) {
    xMin = Math.min(xMin, Math.floor(Math.min(...values) - 2));
    xMax = Math.max(xMax, Math.ceil(Math.max(...values) + 2));
  }

  let yMin = -6, yMax = 10;
  [xMin, xMax, ...values].forEach((x) => {
    const lineY = data.c * x + data.d;
    if (Number.isFinite(lineY)) {
      yMin = Math.min(yMin, Math.floor(lineY - 2));
      yMax = Math.max(yMax, Math.ceil(lineY + 2));
    }
    const radicand = data.a * x + data.b;
    if (radicand >= 0) {
      const rootY = Math.sqrt(radicand);
      yMin = Math.min(yMin, Math.floor(rootY - 2));
      yMax = Math.max(yMax, Math.ceil(rootY + 2));
    }
  });
  if (yMax - yMin < 8) { yMax += 2; yMin -= 2; }
  return { xMin, xMax, yMin, yMax };
}

function mapX(x: number, b: Bounds, w: number) { return ((x - b.xMin) / (b.xMax - b.xMin)) * w; }
function mapY(y: number, b: Bounds, h: number) { return h - ((y - b.yMin) / (b.yMax - b.yMin)) * h; }

function renderCanvas(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  data: CoefData,
  result: SolveResult,
) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const isLight = document.documentElement.classList.contains("light");
  const T = {
    bg: isLight ? "rgba(245, 240, 235, 0.94)" : "rgba(9, 4, 3, 0.94)",
    grid: isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)",
    axis: isLight ? "rgba(0,0,0,0.22)" : "rgba(255, 255, 255, 0.22)",
    domainShade: isLight ? "rgba(26, 158, 110, 0.12)" : "rgba(117, 223, 184, 0.14)",
    sqrtCurve: isLight ? "#d94e0a" : "#ec5b13",
    lineCurve: isLight ? "#2e8ebf" : "#8fd7ff",
    solutionDot: isLight ? "#1a9e6e" : "#75dfb8",
    solutionRing: isLight ? "rgba(26, 158, 110, 0.4)" : "rgba(117, 223, 184, 0.4)",
    labelText: isLight ? "#2a2420" : "#f6eee9",
    axisLabel: isLight ? "rgba(42, 36, 32, 0.72)" : "rgba(246, 238, 233, 0.72)",
  };

  const w = rect.width;
  const h = rect.height;
  const bounds = buildBounds(data, result);

  // background
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = T.bg;
  ctx.fillRect(0, 0, w, h);

  // grid
  ctx.strokeStyle = T.grid;
  ctx.lineWidth = 1;
  for (let x = Math.ceil(bounds.xMin); x <= Math.floor(bounds.xMax); x++) {
    const px = mapX(x, bounds, w);
    ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px, h); ctx.stroke();
  }
  for (let y = Math.ceil(bounds.yMin); y <= Math.floor(bounds.yMax); y++) {
    const py = mapY(y, bounds, h);
    ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(w, py); ctx.stroke();
  }

  // axes
  ctx.strokeStyle = T.axis;
  ctx.lineWidth = 1.4;
  if (bounds.yMin <= 0 && bounds.yMax >= 0) {
    const ay = mapY(0, bounds, h);
    ctx.beginPath(); ctx.moveTo(0, ay); ctx.lineTo(w, ay); ctx.stroke();
  }
  if (bounds.xMin <= 0 && bounds.xMax >= 0) {
    const ax = mapX(0, bounds, w);
    ctx.beginPath(); ctx.moveTo(ax, 0); ctx.lineTo(ax, h); ctx.stroke();
  }

  // shade domain
  if (result.domain.kind !== "none") {
    ctx.fillStyle = T.domainShade;
    if (result.domain.kind === "all") {
      ctx.fillRect(0, 0, w, h);
    } else if (result.domain.boundary != null) {
      const bx = Math.max(0, Math.min(w, mapX(result.domain.boundary, bounds, w)));
      if (result.domain.kind === "right") ctx.fillRect(bx, 0, w - bx, h);
      else ctx.fillRect(0, 0, bx, h);
    }
  }

  // re-draw grid on top
  ctx.strokeStyle = T.grid;
  ctx.lineWidth = 1;
  for (let x = Math.ceil(bounds.xMin); x <= Math.floor(bounds.xMax); x++) {
    const px = mapX(x, bounds, w);
    ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px, h); ctx.stroke();
  }
  for (let y = Math.ceil(bounds.yMin); y <= Math.floor(bounds.yMax); y++) {
    const py = mapY(y, bounds, h);
    ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(w, py); ctx.stroke();
  }

  // sqrt function
  ctx.beginPath();
  ctx.lineWidth = 2.6;
  ctx.strokeStyle = T.sqrtCurve;
  let started = false;
  for (let px = 0; px <= w; px++) {
    const x = bounds.xMin + (px / w) * (bounds.xMax - bounds.xMin);
    const radicand = data.a * x + data.b;
    if (radicand < 0) { started = false; continue; }
    const y = Math.sqrt(radicand);
    const py = mapY(y, bounds, h);
    if (!started) { ctx.moveTo(px, py); started = true; }
    else ctx.lineTo(px, py);
  }
  ctx.stroke();

  // line function
  ctx.beginPath();
  ctx.lineWidth = 2.6;
  ctx.strokeStyle = T.lineCurve;
  started = false;
  for (let px = 0; px <= w; px++) {
    const x = bounds.xMin + (px / w) * (bounds.xMax - bounds.xMin);
    const y = data.c * x + data.d;
    if (!Number.isFinite(y)) { started = false; continue; }
    const py = mapY(y, bounds, h);
    if (!started) { ctx.moveTo(px, py); started = true; }
    else ctx.lineTo(px, py);
  }
  ctx.stroke();

  // solution points
  result.actualSolutions.forEach((x, i) => {
    const y = data.c * x + data.d;
    const px = mapX(x, bounds, w);
    const py = mapY(y, bounds, h);
    ctx.fillStyle = T.solutionDot;
    ctx.beginPath(); ctx.arc(px, py, 5.5, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = T.solutionRing;
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(px, py, 10, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = T.labelText;
    ctx.font = '600 12px "Public Sans", sans-serif';
    ctx.fillText(`R${i + 1}`, px + 8, py - 10);
  });

  // axis labels
  ctx.fillStyle = T.axisLabel;
  ctx.font = '500 12px "Public Sans", sans-serif';
  for (let x = Math.ceil(bounds.xMin); x <= Math.floor(bounds.xMax); x += 2) {
    const px = mapX(x, bounds, w);
    const py = bounds.yMin <= 0 && bounds.yMax >= 0 ? mapY(0, bounds, h) + 16 : h - 8;
    ctx.fillText(String(x), px + 3, py);
  }
  for (let y = Math.ceil(bounds.yMin); y <= Math.floor(bounds.yMax); y += 2) {
    if (y === 0) continue;
    const py = mapY(y, bounds, h);
    const px = bounds.xMin <= 0 && bounds.xMax >= 0 ? mapX(0, bounds, w) + 8 : 8;
    ctx.fillText(String(y), px, py - 6);
  }
}

/* ── Presets ── */

const PRESETS: Record<string, CoefData> = {
  single: { a: 2, b: -1, c: 0, d: 3 },
  fake: { a: 1, b: 5, c: 1, d: -1 },
  double: { a: 4, b: 1, c: 1, d: 1 },
  none: { a: 2, b: 3, c: 0, d: -5 },
};

const PRESET_LABELS: Record<string, string> = {
  single: "Jedno resenje",
  fake: "Lazno resenje",
  double: "Dva resenja",
  none: "Bez resenja",
};

/* ── Component ── */

export default function IrrationalLab() {
  const [coefs, setCoefs] = useState<CoefData>({ a: 2, b: -1, c: 0, d: 3 });
  const [activePreset, setActivePreset] = useState<string | null>("single");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const result = solveEquation(coefs);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    renderCanvas(canvas, ctx, coefs, result);
  }, [coefs, result]);

  useEffect(() => {
    draw();
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    const observer = new MutationObserver(() => draw());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => { window.removeEventListener("resize", onResize); observer.disconnect(); };
  }, [draw]);

  function applyPreset(name: string) {
    setCoefs(PRESETS[name]);
    setActivePreset(name);
  }

  function setCoef(key: keyof CoefData, val: number) {
    setCoefs((prev) => ({ ...prev, [key]: val }));
    setActivePreset(null);
  }

  /* ── derived latex strings ── */
  const equationLatex = `\\sqrt{${linearLatex(coefs.a, coefs.b)}} = ${linearLatex(coefs.c, coefs.d)}`;
  const squaredLatex = `${linearLatex(coefs.a, coefs.b)} = \\left(${linearLatex(coefs.c, coefs.d)}\\right)^2 \\Longrightarrow ${quadraticLatex(result.squared.A, result.squared.B, result.squared.C)}`;
  const candidateSet = formatSolutionSet(result.candidates);
  const actualSet = formatSolutionSet(result.actualSolutions);

  const rejectedCount = result.candidates.length - result.actualSolutions.length;
  let message: string;
  if (result.kind === "all") {
    message = "Ovde se grafovi poklapaju, pa svako realno x zadovoljava jednacinu.";
  } else if (!result.actualSolutions.length) {
    message = "Grafovi se ne seku. Kvadrirana jednacina moze dati kandidate, ali original nema realno resenje.";
  } else if (rejectedCount > 0) {
    message = "Kvadriranje je proizvelo dodatnog kandidata koji otpada u originalu. To je tipicno lazno resenje.";
  } else {
    message = "Ovde se svi kandidati poklapaju sa stvarnim resenjima. I dalje proveru ne preskaces.";
  }

  return (
    <div className={s.interactiveShell}>
      {/* Left: controls */}
      <div className={s.interactiveCard}>
        <div className={cs.eyebrow}>Postavke</div>
        <h3 className={cs.tCardTitle}>Menjaj koeficijente</h3>
        <p style={{ color: "var(--lesson-muted)", marginBottom: 14 }}>
          Isprobaj gotove primere, a zatim pomeraj klizace. Posebno gledaj sta
          se desava kada je desna strana negativna za deo domena.
        </p>

        <div className={cs.presetRow}>
          {Object.keys(PRESETS).map((key) => (
            <button
              key={key}
              type="button"
              className={s.presetBtn}
              style={activePreset === key ? { background: "rgba(236, 91, 19, 0.22)", borderColor: "rgba(236, 91, 19, 0.4)" } : undefined}
              onClick={() => applyPreset(key)}
            >
              {PRESET_LABELS[key]}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
          {(["a", "b", "c", "d"] as const).map((key) => {
            const min = key === "a" || key === "c" ? -5 : -8;
            const max = key === "a" || key === "c" ? 5 : 8;
            const labels: Record<string, string> = { a: "a", b: "b", c: "c", d: "d" };
            const helps: Record<string, string> = {
              a: "U radikandu je izraz ax+b.",
              b: "Pomera pocetak domene ulevo ili udesno.",
              c: "Nagib desne strane cx+d.",
              d: "Vertikalni pomeraj desne strane.",
            };
            return (
              <div key={key} style={{ padding: 16, borderRadius: 18, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: 700 }}>
                  <MathJax inline>{`\\(${labels[key]}\\)`}</MathJax>
                  <span style={{ minWidth: 48, textAlign: "center", padding: "6px 10px", borderRadius: 999, background: "rgba(236, 91, 19, 0.12)", border: "1px solid rgba(236, 91, 19, 0.18)", color: "var(--lesson-accent)" }}>
                    {coefs[key]}
                  </span>
                </div>
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={1}
                  value={coefs[key]}
                  onChange={(e) => setCoef(key, Number(e.target.value))}
                  style={{ width: "100%", marginTop: 12, accentColor: "var(--lesson-primary)" }}
                />
                <div style={{ marginTop: 8, fontSize: "0.88rem", color: "var(--lesson-muted)" }}>{helps[key]}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: output & canvas */}
      <div>
        <div className={s.interactiveCard}>
          <div className={cs.eyebrow}>Analiza modela</div>
          <h3 className={cs.tCardTitle}>Sta algebra kaze</h3>
          <div style={{ display: "grid", gap: 14, marginTop: 16 }}>
            <div className={s.mathBlock}>
              <strong style={{ display: "block", marginBottom: 6 }}>Model jednacina</strong>
              <MathJax dynamic>{`\\[${equationLatex}\\]`}</MathJax>
            </div>
            <div className={s.mathBlock} style={{ borderColor: "rgba(255, 195, 127, 0.24)", background: "rgba(255, 195, 127, 0.08)" }}>
              <strong style={{ display: "block", marginBottom: 6 }}>Domena korena</strong>
              <MathJax dynamic inline>{`\\(${result.domain.latex}\\)`}</MathJax>
              <div style={{ marginTop: 8 }}>
                <strong>Uslov znaka desne strane: </strong>
                <MathJax dynamic inline>{`\\(${linearLatex(coefs.c, coefs.d)} \\ge 0\\)`}</MathJax>
              </div>
              <p style={{ marginTop: 10, color: "var(--lesson-muted)" }}>{result.domain.text}</p>
            </div>
            <div className={s.mathBlock}>
              <strong style={{ display: "block", marginBottom: 6 }}>Kvadrirana jednacina</strong>
              <MathJax dynamic>{`\\[${squaredLatex}\\]`}</MathJax>
            </div>
            <div className={s.mathBlock}>
              <strong style={{ display: "block", marginBottom: 6 }}>Algebarski kandidati</strong>
              <MathJax dynamic>{`\\[${candidateSet}\\]`}</MathJax>
            </div>
            <div className={s.mathBlock} style={{ borderColor: "rgba(117, 223, 184, 0.24)", background: "rgba(117, 223, 184, 0.08)" }}>
              <strong style={{ display: "block", marginBottom: 6 }}>Stvarna resenja</strong>
              <MathJax dynamic>{`\\[${actualSet}\\]`}</MathJax>
            </div>
          </div>
          <p style={{ marginTop: 16, fontSize: "1.02rem", color: "var(--lesson-muted-strong)" }}>
            {message}
          </p>
        </div>

        <div className={s.interactiveCard} style={{ marginTop: 16 }}>
          <div className={cs.eyebrow}>Graficka intuicija</div>
          <h3 className={cs.tCardTitle}>Presek funkcija daje pravo resenje</h3>
          <p style={{ color: "var(--lesson-muted)" }}>
            Zasenceni deo na osi <MathJax inline>{"\\(x\\)"}</MathJax> oznacava
            domenu korena. Ako kvadratna jednacina da kandidata van tog dela ili
            na mestu gde je prava negativna, taj kandidat otpada.
          </p>
          <div className={s.canvasWrap} style={{ marginTop: 16 }}>
            <canvas
              ref={canvasRef}
              className={s.polarCanvas}
              style={{ aspectRatio: "16 / 10" }}
            />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 14, fontSize: "0.92rem", color: "var(--lesson-muted)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <i style={{ width: 12, height: 12, borderRadius: 999, background: "#ec5b13", display: "inline-block" }} />
              <MathJax inline>{"\\(y=\\sqrt{ax+b}\\)"}</MathJax>
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <i style={{ width: 12, height: 12, borderRadius: 999, background: "#8fd7ff", display: "inline-block" }} />
              <MathJax inline>{"\\(y=cx+d\\)"}</MathJax>
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <i style={{ width: 12, height: 12, borderRadius: 999, background: "#75dfb8", display: "inline-block" }} />
              stvarno resenje
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <i style={{ width: 12, height: 12, borderRadius: 999, background: "rgba(117,223,184,0.22)", display: "inline-block" }} />
              domena korena
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
