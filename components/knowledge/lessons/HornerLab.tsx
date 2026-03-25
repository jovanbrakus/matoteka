"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MathJax } from "better-react-mathjax";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

/* ── Helpers ── */

function safeNumber(value: string | number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatNumber(value: number): string {
  const rounded = Math.round(value * 1000) / 1000;
  if (Math.abs(rounded) < 1e-9) return "0";
  return Number.isInteger(rounded) ? String(rounded) : String(rounded);
}

function trimLeadingZeros(coeffs: number[]): number[] {
  let index = 0;
  while (index < coeffs.length - 1 && Math.abs(coeffs[index]) < 1e-9) {
    index += 1;
  }
  return coeffs.slice(index);
}

function polynomialToLatex(coeffs: number[]): string {
  const normalized = trimLeadingZeros(coeffs.slice());
  const degree = normalized.length - 1;
  const terms: { sign: string; core: string }[] = [];

  normalized.forEach((coeff, index) => {
    if (Math.abs(coeff) < 1e-9) return;
    const power = degree - index;
    const sign = coeff < 0 ? "-" : "+";
    const abs = Math.abs(coeff);
    let core = "";

    if (power === 0) {
      core = formatNumber(abs);
    } else {
      const coeffPart = Math.abs(abs - 1) < 1e-9 ? "" : formatNumber(abs);
      const variablePart = power === 1 ? "x" : `x^{${power}}`;
      core = coeffPart + variablePart;
    }

    terms.push({ sign, core });
  });

  if (!terms.length) return "0";

  return terms
    .map((term, index) => {
      if (index === 0) return term.sign === "-" ? `-${term.core}` : term.core;
      return ` ${term.sign} ${term.core}`;
    })
    .join("");
}

function divisorLabel(root: number): string {
  if (Math.abs(root) < 1e-9) return "x";
  return root > 0
    ? `x - ${formatNumber(root)}`
    : `x + ${formatNumber(Math.abs(root))}`;
}

interface SyntheticResult {
  quotient: number[];
  remainder: number;
  bottom: number[];
  products: number[];
}

function syntheticDivision(coeffs: number[], root: number): SyntheticResult {
  const bottom = [coeffs[0]];
  const products: number[] = [];

  for (let i = 1; i < coeffs.length; i += 1) {
    const product = bottom[i - 1] * root;
    products.push(product);
    bottom.push(coeffs[i] + product);
  }

  return {
    quotient: bottom.slice(0, -1),
    remainder: bottom[bottom.length - 1],
    bottom,
    products,
  };
}

function remainderExpression(value: number): string {
  if (Math.abs(value) < 1e-9) return "";
  return value < 0
    ? ` - ${formatNumber(Math.abs(value))}`
    : ` + ${formatNumber(value)}`;
}

/* ── Canvas renderer ── */

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number,
) {
  const r = Math.min(radius, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function renderCanvas(
  canvas: HTMLCanvasElement,
  coeffs: number[],
  root: number,
  result: SyntheticResult,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const cssWidth =
    canvas.clientWidth || (canvas.parentElement?.clientWidth ?? 700);
  const cssHeight = cssWidth < 500 ? 300 : 340;
  const ratio = window.devicePixelRatio || 1;

  canvas.width = Math.round(cssWidth * ratio);
  canvas.height = Math.round(cssHeight * ratio);
  canvas.style.height = `${cssHeight}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const width = cssWidth;
  const height = cssHeight;
  ctx.clearRect(0, 0, width, height);

  /* background */
  drawRoundedRect(ctx, 0, 0, width, height, 22);
  ctx.fillStyle = "#0a0403";
  ctx.fill();

  const titleFont = width < 500 ? 15 : 18;
  const numberFont = width < 500 ? 18 : 22;
  const noteFont = width < 500 ? 12 : 13;
  const leftPad = width < 500 ? 34 : 46;
  const rightPad = width < 500 ? 20 : 28;
  const topY = 88;
  const midY = 160;
  const bottomY = 236;
  const startX = leftPad + 56;
  const usableWidth = width - startX - rightPad;
  const stepX = usableWidth / coeffs.length;

  /* title */
  ctx.fillStyle = "#ffd7b9";
  ctx.font = `700 ${titleFont}px Inter, sans-serif`;
  ctx.textAlign = "left";
  ctx.fillText(
    `Hornerova \u0161ema za deljenje sa ${divisorLabel(root)}`,
    leftPad,
    36,
  );

  ctx.fillStyle = "#cdb8ab";
  ctx.font = `400 ${noteFont}px Inter, sans-serif`;
  ctx.fillText(
    "Gornji red: koeficijenti \u00B7 Srednji red: umno\u0161ci \u00B7 Donji red: rezultat",
    leftPad,
    58,
  );

  /* L-shaped border */
  ctx.strokeStyle = "rgba(255, 154, 106, 0.55)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(leftPad + 30, topY - 28);
  ctx.lineTo(leftPad + 30, bottomY + 24);
  ctx.moveTo(leftPad + 30, bottomY + 24);
  ctx.lineTo(width - rightPad, bottomY + 24);
  ctx.stroke();

  /* root value on the left */
  ctx.fillStyle = "#88d8ff";
  ctx.font = `700 ${noteFont + 2}px Inter, sans-serif`;
  ctx.textAlign = "right";
  ctx.fillText(formatNumber(root), leftPad + 24, midY);

  /* column labels */
  ctx.textAlign = "left";
  ctx.fillStyle = "#ffd7b9";
  ctx.font = `700 ${noteFont}px Inter, sans-serif`;
  ctx.fillText("koef.", 12, topY - 6);
  ctx.fillText("umno\u0161ci", 8, midY - 6);
  ctx.fillText("rezultat", 10, bottomY - 6);

  /* numbers */
  ctx.textAlign = "center";
  coeffs.forEach((coeff, index) => {
    const x = startX + stepX * index + stepX / 2;
    ctx.fillStyle = "#f6eee9";
    ctx.font = `700 ${numberFont}px Inter, sans-serif`;
    ctx.fillText(formatNumber(coeff), x, topY);

    if (index < result.products.length) {
      ctx.fillStyle = "#c0a2ff";
      ctx.fillText(formatNumber(result.products[index]), x + stepX, midY);
    }

    ctx.fillStyle =
      index === coeffs.length - 1 ? "#ec5b13" : "#6bdfb7";
    ctx.fillText(formatNumber(result.bottom[index]), x, bottomY);
  });

  /* highlight remainder box */
  const lastX = startX + stepX * (coeffs.length - 1) + stepX / 2;
  ctx.strokeStyle = "rgba(236, 91, 19, 0.5)";
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, lastX - 32, bottomY - 28, 64, 38, 12);
  ctx.stroke();
}

/* ── Presets ── */

interface Preset {
  label: string;
  coeffs: number[];
  root: number;
}

const PRESETS: Preset[] = [
  { label: "Deljiv slu\u010Daj", coeffs: [1, -4, 1, 6, -8], root: 2 },
  { label: "Nedostaje \u010Dlan", coeffs: [2, -3, 0, 5, -4], root: -1 },
  { label: "Ostatak 3", coeffs: [1, -2, 0, 5, -7], root: 2 },
];

/* ── Component ── */

export default function HornerLab() {
  const [coeffs, setCoeffs] = useState([1, -4, 1, 6, -8]);
  const [root, setRoot] = useState(2);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const result = syntheticDivision(coeffs, root);
  const divisible = Math.abs(result.remainder) < 1e-9;
  const polyLatex = polynomialToLatex(coeffs);
  const quotientLatex = polynomialToLatex(result.quotient);
  const divisor = divisorLabel(root);
  const relation = `${polyLatex} = (${divisor})(${quotientLatex})${remainderExpression(result.remainder)}`;

  const draw = useCallback(() => {
    if (canvasRef.current) renderCanvas(canvasRef.current, coeffs, root, result);
  }, [coeffs, root, result]);

  useEffect(() => {
    draw();
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [draw]);

  function updateCoeff(index: number, value: string) {
    const next = [...coeffs];
    next[index] = safeNumber(value);
    setCoeffs(next);
  }

  function selectPreset(preset: Preset) {
    setCoeffs(preset.coeffs);
    setRoot(preset.root);
  }

  const labels = ["x\u2074", "x\u00B3", "x\u00B2", "x", "sl. \u010Dlan"];

  return (
    <>
      {/* Preset buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
        {PRESETS.map((preset) => (
          <button
            key={preset.label}
            className={s.presetBtn}
            style={
              preset.coeffs.every((c, i) => c === coeffs[i]) && preset.root === root
                ? { background: "rgba(236,91,19,0.24)", borderColor: "rgba(236,91,19,0.5)" }
                : undefined
            }
            onClick={() => selectPreset(preset)}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Coefficient inputs */}
      <div className={s.controlGrid} style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        {coeffs.map((c, i) => (
          <div className={s.field} key={i}>
            <label>
              Koeficijent uz{" "}
              <MathJax inline>{`\\(${
                i < 4
                  ? labels[i]
                  : labels[4]
              }\\)`}</MathJax>
            </label>
            <input
              type="number"
              step="any"
              value={c}
              onChange={(e) => updateCoeff(i, e.target.value)}
            />
          </div>
        ))}
        <div className={s.field}>
          <label>
            Broj <MathJax inline>{"\\(a\\)"}</MathJax> iz{" "}
            <MathJax inline>{"\\(x-a\\)"}</MathJax>
          </label>
          <input
            type="number"
            step="any"
            value={root}
            onChange={(e) => setRoot(safeNumber(e.target.value))}
          />
        </div>
      </div>

      {/* Canvas */}
      <div className={s.canvasWrap} style={{ marginTop: 18 }}>
        <canvas
          ref={canvasRef}
          className={s.polarCanvas}
          style={{ aspectRatio: "16 / 8" }}
        />
        <p style={{ marginTop: 10, color: "var(--lesson-muted)", fontSize: "0.92rem" }}>
          Na levom rubu stoji broj <MathJax inline dynamic>{"\\(a\\)"}</MathJax>, gore
          koeficijenti polinoma, u srednjem redu umno\u0161ci, a dole koli\u010Dnik i ostatak.
        </p>
      </div>

      {/* Result panels */}
      <div className={s.interactiveShell} style={{ marginTop: 18 }}>
        <div className={s.sectionCard} style={{ padding: 22 }}>
          <h3 className={cs.tCardTitle}>Koraci Hornerove \u0161eme</h3>
          <MathJax dynamic>
            {`Polinom: \\(${polyLatex}\\), delilac: \\(${divisor}\\), pa je \\(a=${formatNumber(root)}\\).`}
          </MathJax>
          <div style={{ marginTop: 12 }}>
            <MathJax dynamic>{`Koeficijenti: \\(${coeffs.map(formatNumber).join(",\\;")}\\)`}</MathJax>
          </div>
          <div style={{ marginTop: 8 }}>
            <MathJax dynamic>{`Donji red: \\(${result.bottom.map(formatNumber).join(",\\;")}\\)`}</MathJax>
          </div>
          <div style={{ marginTop: 12 }}>
            <MathJax dynamic>{`\\[${relation}\\]`}</MathJax>
          </div>
        </div>

        <div className={s.sectionCard} style={{ padding: 22 }}>
          <h3 className={cs.tCardTitle}>Rezultat</h3>
          <div className={s.resultsGrid}>
            <div className={s.resultCard}>
              <strong>Koli\u010Dnik</strong>
              <MathJax dynamic>{`\\(${quotientLatex}\\)`}</MathJax>
            </div>
            <div className={s.resultCard}>
              <strong>Ostatak</strong>
              <MathJax dynamic>{`\\(r = ${formatNumber(result.remainder)}\\)`}</MathJax>
            </div>
            <div className={s.resultCard}>
              <strong>Deljivost</strong>
              <span style={{ color: divisible ? "#67d7ad" : "#ffb488", fontWeight: 700 }}>
                {divisible ? "Da" : "Ne"}
              </span>
              <p style={{ color: "var(--lesson-muted)", marginTop: 6, fontSize: "0.9rem" }}>
                {divisible
                  ? `Polinom je deljiv sa ${divisor}.`
                  : `Polinom nije deljiv sa ${divisor}. Ostatak je ${formatNumber(result.remainder)}.`}
              </p>
            </div>
            <div className={s.resultCard}>
              <strong>
                <MathJax inline dynamic>{`\\(P(${formatNumber(root)})\\)`}</MathJax>
              </strong>
              <MathJax dynamic>{`\\(P(${formatNumber(root)}) = ${formatNumber(result.remainder)}\\)`}</MathJax>
              <p style={{ color: "var(--lesson-muted)", marginTop: 6, fontSize: "0.9rem" }}>
                Po Bezoutovom stavu, ovo je ujedno i ostatak.
              </p>
            </div>
          </div>
          <div className={s.labNote}>
            <strong style={{ color: "var(--lesson-accent)" }}>Savet za u\u010Denje:</strong>{" "}
            Pre nego \u0161to pogleda\u0161 automatski rezultat, poku\u0161aj da sam odredi\u0161
            slede\u0107i broj u donjem redu, pa tek onda proveri.
          </div>
        </div>
      </div>
    </>
  );
}
