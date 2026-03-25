"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { MathJax } from "better-react-mathjax";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

/* ── Types ── */

interface LabState {
  base: number;
  p: number;
  q: number;
  xProbe: number;
}

interface Preset {
  label: string;
  base: number;
  p: number;
  q: number;
  x: number;
}

const PRESETS: Preset[] = [
  { label: "Osnovni rast", base: 2, p: 0, q: 0, x: 1 },
  { label: "Osnovni pad", base: 0.5, p: 0, q: 0, x: 1 },
  { label: "Pomerena nadole", base: 2, p: 1, q: -3, x: 3 },
  { label: "Levo i navise", base: 3, p: -2, q: 1, x: 0 },
];

const BASE_OPTIONS = [
  { value: 0.25, label: "1/4" },
  { value: 0.5, label: "1/2" },
  { value: 0.75, label: "3/4" },
  { value: 1.5, label: "3/2" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
];

const SPECIAL_LATEX = new Map<number, string>([
  [0.25, "\\frac{1}{4}"],
  [0.5, "\\frac{1}{2}"],
  [0.75, "\\frac{3}{4}"],
  [1.5, "\\frac{3}{2}"],
  [2, "2"],
  [3, "3"],
]);

/* ── Helpers ── */

function fmt(value: number): string {
  if (Math.abs(value) < 1e-9) return "0";
  const rounded = Math.round(value * 100) / 100;
  const text = Number.isInteger(rounded)
    ? String(rounded)
    : rounded
        .toFixed(2)
        .replace(/0+$/, "")
        .replace(/\.$/, "");
  return text.replace("-", "\u2212");
}

function latexNum(value: number): string {
  const rounded = Math.round(value * 100) / 100;
  if (Math.abs(rounded) < 1e-9) return "0";
  if (Number.isInteger(rounded)) return String(rounded);
  return rounded
    .toFixed(2)
    .replace(/0+$/, "")
    .replace(/\.$/, "");
}

function baseLatex(a: number): string {
  return SPECIAL_LATEX.get(a) || latexNum(a);
}

function wrappedBaseLatex(a: number): string {
  const text = baseLatex(a);
  return text.includes("\\frac") ? `\\left(${text}\\right)` : text;
}

function exponentLatex(p: number): string {
  if (Math.abs(p) < 1e-9) return "x";
  if (p > 0) return `x-${latexNum(p)}`;
  return `x+${latexNum(-p)}`;
}

function formulaLatex(a: number, p: number, q: number): string {
  let body = `${wrappedBaseLatex(a)}^{${exponentLatex(p)}}`;
  if (Math.abs(q) < 1e-9) return `y=${body}`;
  if (q > 0) body += `+${latexNum(q)}`;
  else body += `${latexNum(q)}`;
  return `y=${body}`;
}

function pointLatex(x: number, y: number): string {
  return `\\left(${latexNum(x)},${latexNum(y)}\\right)`;
}

function monotonicityLatex(a: number): string {
  return a > 1
    ? "\\text{Rastuca funkcija na }\\mathbb{R}."
    : "\\text{Opadajuca funkcija na }\\mathbb{R}.";
}

function rangeLatex(q: number): string {
  return `D=\\mathbb{R},\\quad V=(${latexNum(q)},\\infty)`;
}

function pointsLatex(a: number, p: number, q: number): string {
  const p1 = pointLatex(p - 1, 1 / a + q);
  const p2 = pointLatex(p, 1 + q);
  const p3 = pointLatex(p + 1, a + q);
  return `${p1},\\ ${p2},\\ ${p3}`;
}

function probeLatex(a: number, p: number, q: number, x: number): string {
  const y = Math.pow(a, x - p) + q;
  return `f(${latexNum(x)})=${latexNum(y)}`;
}

/* ── Canvas drawing ── */

function drawExponential(
  canvas: HTMLCanvasElement,
  a: number,
  p: number,
  q: number,
  xMark: number
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(320, rect.width);
  const height = Math.max(340, rect.height);
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const yMark = Math.pow(a, xMark - p) + q;
  const xMin = -6,
    xMax = 6;
  const yMin = Math.min(-6, q - 4);
  const yMax = Math.max(8, q + 10);
  const padding = 44;
  const plotWidth = width - padding * 2;
  const plotHeight = height - padding * 2;

  const mapX = (v: number) =>
    padding + ((v - xMin) / (xMax - xMin)) * plotWidth;
  const mapY = (v: number) =>
    height - padding - ((v - yMin) / (yMax - yMin)) * plotHeight;

  // Background
  const bg = ctx.createLinearGradient(0, 0, 0, height);
  bg.addColorStop(0, "rgba(21, 9, 6, 0.96)");
  bg.addColorStop(1, "rgba(7, 3, 2, 0.98)");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  // Grid
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;
  for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x += 1) {
    ctx.beginPath();
    ctx.moveTo(mapX(x), padding);
    ctx.lineTo(mapX(x), height - padding);
    ctx.stroke();
  }
  for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y += 1) {
    ctx.beginPath();
    ctx.moveTo(padding, mapY(y));
    ctx.lineTo(width - padding, mapY(y));
    ctx.stroke();
  }

  // Axes
  if (yMin <= 0 && yMax >= 0) {
    ctx.strokeStyle = "rgba(255,215,185,0.9)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, mapY(0));
    ctx.lineTo(width - padding, mapY(0));
    ctx.stroke();
  }
  if (xMin <= 0 && xMax >= 0) {
    ctx.strokeStyle = "rgba(255,215,185,0.9)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(mapX(0), padding);
    ctx.lineTo(mapX(0), height - padding);
    ctx.stroke();
  }

  // Axis labels
  ctx.fillStyle = "rgba(214,199,187,0.92)";
  ctx.font = '12px "Public Sans", system-ui, sans-serif';
  if (yMin <= 0 && yMax >= 0) {
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x += 1) {
      if (x !== 0) ctx.fillText(String(x), mapX(x) - 4, mapY(0) + 16);
    }
  }
  if (xMin <= 0 && xMax >= 0) {
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y += 1) {
      if (y !== 0) ctx.fillText(String(y), mapX(0) + 8, mapY(y) + 4);
    }
  }

  // Asymptote line
  if (q >= yMin && q <= yMax) {
    ctx.setLineDash([8, 8]);
    ctx.strokeStyle = "rgba(116,223,183,0.82)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, mapY(q));
    ctx.lineTo(width - padding, mapY(q));
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "rgba(116,223,183,0.96)";
    ctx.font = '600 13px "Public Sans", system-ui, sans-serif';
    ctx.fillText(`y = ${fmt(q)}`, width - padding - 72, mapY(q) - 10);
  }

  // Exponential curve
  ctx.save();
  ctx.beginPath();
  ctx.rect(padding, padding, plotWidth, plotHeight);
  ctx.clip();
  ctx.strokeStyle = "#ec5b13";
  ctx.lineWidth = 4;
  ctx.beginPath();
  const samples = 420;
  for (let i = 0; i <= samples; i += 1) {
    const x = xMin + ((xMax - xMin) * i) / samples;
    const y = Math.pow(a, x - p) + q;
    const clippedY = Math.max(yMin - 2, Math.min(yMax + 2, y));
    const px = mapX(x);
    const py = mapY(clippedY);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();
  ctx.restore();

  // Probe dashed lines
  ctx.setLineDash([6, 6]);
  ctx.strokeStyle = "rgba(142,215,255,0.6)";
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(mapX(xMark), mapY(q));
  ctx.lineTo(mapX(xMark), mapY(yMark));
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(mapX(0), mapY(yMark));
  ctx.lineTo(mapX(xMark), mapY(yMark));
  ctx.stroke();
  ctx.setLineDash([]);

  // Key points
  const drawPoint = (
    x: number,
    y: number,
    color: string,
    label: string
  ) => {
    if (x < xMin - 0.5 || x > xMax + 0.5 || y < yMin - 0.5 || y > yMax + 0.5)
      return;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(mapX(x), mapY(y), 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(246,238,233,0.96)";
    ctx.font = '13px "Public Sans", system-ui, sans-serif';
    ctx.fillText(label, mapX(x) + 10, mapY(y) - 10);
  };

  drawPoint(p, 1 + q, "#ffd7b9", "A");
  drawPoint(p + 1, a + q, "#74dfb7", "B");
  drawPoint(xMark, yMark, "#8ed7ff", "P");

  // Top-left info overlay
  const canvasFormula = (() => {
    let expr = `${fmt(a)}^(`;
    if (Math.abs(p) < 1e-9) expr += "x";
    else if (p > 0) expr += `x - ${fmt(p)}`;
    else expr += `x + ${fmt(-p)}`;
    expr += ")";
    if (Math.abs(q) < 1e-9) return `y = ${expr}`;
    return `y = ${expr} ${q > 0 ? "+" : "\u2212"} ${fmt(Math.abs(q))}`;
  })();

  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.font = '600 14px "Public Sans", system-ui, sans-serif';
  ctx.fillText(canvasFormula, 18, 24);
  ctx.fillText(`A = (${fmt(p)}, ${fmt(1 + q)})`, 18, 46);
  ctx.fillText(`P = (${fmt(xMark)}, ${fmt(yMark)})`, 18, 68);
}

/* ── Component ── */

export default function ExponentialLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<LabState>({
    base: 2,
    p: 0,
    q: 0,
    xProbe: 1,
  });

  const redraw = useCallback(() => {
    if (canvasRef.current) {
      drawExponential(
        canvasRef.current,
        state.base,
        state.p,
        state.q,
        state.xProbe
      );
    }
  }, [state]);

  useEffect(() => {
    redraw();
    const handleResize = () => redraw();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [redraw]);

  const setBase = (v: number) => setState((prev) => ({ ...prev, base: v }));
  const setP = (v: number) => setState((prev) => ({ ...prev, p: v }));
  const setQ = (v: number) => setState((prev) => ({ ...prev, q: v }));
  const setX = (v: number) => setState((prev) => ({ ...prev, xProbe: v }));

  return (
    <div>
      <div className={s.interactiveShell}>
        {/* ── Controls ── */}
        <div className={s.interactiveCard}>
          <h3 className={cs.tCardTitle}>Kontrole</h3>

          <div className={s.rangeWrap}>
            <label>
              Baza <em>a</em>{" "}
              <span style={{ color: "var(--lesson-primary-soft)" }}>
                {BASE_OPTIONS.find((o) => o.value === state.base)?.label ??
                  fmt(state.base)}
              </span>
            </label>
            <select
              value={state.base}
              onChange={(e) => setBase(Number(e.target.value))}
              style={{
                width: "100%",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.05)",
                color: "var(--lesson-text)",
                padding: "11px 12px",
                font: "inherit",
              }}
            >
              {BASE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <span style={{ fontSize: "0.88rem", color: "var(--lesson-muted)" }}>
              Tri prve baze daju opadajuce grafike, a poslednje tri rastuce.
            </span>
          </div>

          <div className={s.rangeWrap}>
            <label>
              Horizontalni pomeraj <em>p</em>{" "}
              <span style={{ color: "var(--lesson-primary-soft)" }}>
                {fmt(state.p)}
              </span>
            </label>
            <input
              type="range"
              min={-4}
              max={4}
              step={0.5}
              value={state.p}
              onChange={(e) => setP(Number(e.target.value))}
            />
            <span style={{ fontSize: "0.88rem", color: "var(--lesson-muted)" }}>
              Pozitivan <em>p</em> pomera grafik udesno, negativan ulevo.
            </span>
          </div>

          <div className={s.rangeWrap}>
            <label>
              Vertikalni pomeraj <em>q</em>{" "}
              <span style={{ color: "var(--lesson-primary-soft)" }}>
                {fmt(state.q)}
              </span>
            </label>
            <input
              type="range"
              min={-4}
              max={4}
              step={0.5}
              value={state.q}
              onChange={(e) => setQ(Number(e.target.value))}
            />
            <span style={{ fontSize: "0.88rem", color: "var(--lesson-muted)" }}>
              Ovaj broj pomera i ceo grafik i horizontalnu asimptotu.
            </span>
          </div>

          <div className={s.rangeWrap}>
            <label>
              Posmatrana tacka <em>x</em>{" "}
              <span style={{ color: "var(--lesson-primary-soft)" }}>
                {fmt(state.xProbe)}
              </span>
            </label>
            <input
              type="range"
              min={-5}
              max={5}
              step={0.5}
              value={state.xProbe}
              onChange={(e) => setX(Number(e.target.value))}
            />
            <span style={{ fontSize: "0.88rem", color: "var(--lesson-muted)" }}>
              Plava tacka pokazuje konkretnu vrednost funkcije za izabrano{" "}
              <em>x</em>.
            </span>
          </div>

          <div className={cs.presetRow} style={{ marginTop: 16 }}>
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                className={s.presetBtn}
                type="button"
                onClick={() =>
                  setState({
                    base: preset.base,
                    p: preset.p,
                    q: preset.q,
                    xProbe: preset.x,
                  })
                }
              >
                {preset.label}
              </button>
            ))}
          </div>

          <p
            className={s.labNote}
            style={{ marginTop: 16, fontSize: "0.92rem" }}
          >
            Ne pomeraj kontrole nasumice. Za svaku novu postavku prvo pokusaj da
            sam predvidis: da li funkcija raste ili opada, gde je asimptota i
            koja je tacka sa eksponentom 0.
          </p>
        </div>

        {/* ── Canvas ── */}
        <div className={s.canvasWrap}>
          <canvas
            ref={canvasRef}
            className={s.polarCanvas}
            style={{ aspectRatio: "16 / 11" }}
            aria-label="Interaktivni prikaz eksponencijalne funkcije"
          />
        </div>
      </div>

      {/* ── Live readouts ── */}
      <div
        className={s.resultsGrid}
        style={{ gridTemplateColumns: "repeat(3, 1fr)", marginTop: 16 }}
      >
        <div className={s.resultCard}>
          <strong>Trenutna funkcija</strong>
          <MathJax dynamic>{`\\(${formulaLatex(state.base, state.p, state.q)}\\)`}</MathJax>
          <p style={{ fontSize: "0.88rem", color: "var(--lesson-muted)", marginTop: 4 }}>
            Ovo je zapis koji trenutno crtas.
          </p>
        </div>
        <div className={s.resultCard}>
          <strong>Asimptota</strong>
          <MathJax dynamic>{`\\(y=${latexNum(state.q)}\\)`}</MathJax>
          <p style={{ fontSize: "0.88rem", color: "var(--lesson-muted)", marginTop: 4 }}>
            Grafik joj se priblizava, ali je ne sece.
          </p>
        </div>
        <div className={s.resultCard}>
          <strong>Monotonost</strong>
          <MathJax dynamic>{`\\(${monotonicityLatex(state.base)}\\)`}</MathJax>
          <p style={{ fontSize: "0.88rem", color: "var(--lesson-muted)", marginTop: 4 }}>
            Smer zavisi samo od baze, ne od pomeraja.
          </p>
        </div>
        <div className={s.resultCard}>
          <strong>Domen i skup vrednosti</strong>
          <MathJax dynamic>{`\\(${rangeLatex(state.q)}\\)`}</MathJax>
          <p style={{ fontSize: "0.88rem", color: "var(--lesson-muted)", marginTop: 4 }}>
            Za ovaj model grafik je uvek iznad svoje asimptote.
          </p>
        </div>
        <div className={s.resultCard}>
          <strong>Karakteristicne tacke</strong>
          <MathJax dynamic>{`\\(${pointsLatex(state.base, state.p, state.q)}\\)`}</MathJax>
          <p style={{ fontSize: "0.88rem", color: "var(--lesson-muted)", marginTop: 4 }}>
            Najvaznija je tacka u kojoj je eksponent jednak nuli.
          </p>
        </div>
        <div className={s.resultCard}>
          <strong>Vrednost u izabranoj tacki</strong>
          <MathJax dynamic>{`\\(${probeLatex(state.base, state.p, state.q, state.xProbe)}\\)`}</MathJax>
          <p style={{ fontSize: "0.88rem", color: "var(--lesson-muted)", marginTop: 4 }}>
            Koristi je da proveris da li umes da citas funkciju bez kalkulatora.
          </p>
        </div>
      </div>
    </div>
  );
}
