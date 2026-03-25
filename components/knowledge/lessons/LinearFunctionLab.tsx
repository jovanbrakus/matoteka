"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { MathJax } from "better-react-mathjax";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

/* ── Types ── */

interface LabState {
  k: number;
  n: number;
  xProbe: number;
}

interface Preset {
  label: string;
  k: number;
  n: number;
  x: number;
}

const PRESETS: Preset[] = [
  { label: "Rastuća", k: 2, n: -3, x: 2 },
  { label: "Opadajuća", k: -1.5, n: 4, x: -1 },
  { label: "Konstantna", k: 0, n: 2, x: 3 },
  { label: "Kroz O", k: 1, n: 0, x: 4 },
];

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

function formulaLatex(k: number, n: number): string {
  const kText = latexNum(k);
  const nText = latexNum(n);
  let body = "";

  if (Math.abs(k) < 1e-9) {
    body = nText;
  } else if (Math.abs(k - 1) < 1e-9) {
    body = "x";
  } else if (Math.abs(k + 1) < 1e-9) {
    body = "-x";
  } else {
    body = `${kText}x`;
  }

  if (Math.abs(k) < 1e-9) return `y=${body}`;
  if (Math.abs(n) < 1e-9) return `y=${body}`;
  if (n > 0) return `y=${body}+${nText}`;
  return `y=${body}${nText}`;
}

function zeroLatex(k: number, n: number): string {
  if (Math.abs(k) < 1e-9) {
    if (Math.abs(n) < 1e-9)
      return "\\text{Svaki } x \\in \\mathbb{R} \\text{ je nula funkcije.}";
    return "\\text{Funkcija nema nulu.}";
  }
  const zero = -n / k;
  return `x_0=${latexNum(zero)}`;
}

function monotonicityText(k: number): string {
  if (k > 1e-9) return "Rastuća funkcija na \\(\\mathbb{R}\\).";
  if (k < -1e-9) return "Opadajuća funkcija na \\(\\mathbb{R}\\).";
  return "Konstantna funkcija.";
}

function signText(k: number, n: number): string {
  if (Math.abs(k) < 1e-9) {
    if (n > 1e-9) return "Za svaki \\(x\\) važi \\(f(x)>0\\).";
    if (n < -1e-9) return "Za svaki \\(x\\) važi \\(f(x)<0\\).";
    return "Za svaki \\(x\\) važi \\(f(x)=0\\).";
  }
  const zero = latexNum(-n / k);
  if (k > 0)
    return `Za \\(x<${zero}\\) je negativna, za \\(x>${zero}\\) pozitivna.`;
  return `Za \\(x<${zero}\\) je pozitivna, za \\(x>${zero}\\) negativna.`;
}

function interceptText(k: number, n: number): string {
  const yText = `(0,${latexNum(n)})`;
  if (Math.abs(k) < 1e-9) {
    if (Math.abs(n) < 1e-9) return `\\(${yText}\\) je i presek sa \\(x\\)-osom.`;
    return `Presek sa \\(y\\)-osom je \\(${yText}\\); sa \\(x\\)-osom nema preseka.`;
  }
  return `Sa \\(y\\)-osom: \\(${yText}\\). Sa \\(x\\)-osom: \\((${latexNum(-n / k)},0)\\).`;
}

function probeText(k: number, n: number, x: number): string {
  const value = k * x + n;
  return `f(${latexNum(x)})=${latexNum(value)}`;
}

/* ── Canvas drawing ── */

function drawGraph(
  canvas: HTMLCanvasElement,
  k: number,
  n: number,
  xMark: number
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(320, rect.width);
  const height = Math.max(320, rect.height);
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const yMark = k * xMark + n;
  const xMin = -8,
    xMax = 8,
    yMin = -8,
    yMax = 8;
  const padding = 40;
  const plotWidth = width - padding * 2;
  const plotHeight = height - padding * 2;

  const mapX = (x: number) =>
    padding + ((x - xMin) / (xMax - xMin)) * plotWidth;
  const mapY = (y: number) =>
    height - padding - ((y - yMin) / (yMax - yMin)) * plotHeight;

  // Background
  const bg = ctx.createLinearGradient(0, 0, 0, height);
  bg.addColorStop(0, "rgba(21, 9, 6, 0.96)");
  bg.addColorStop(1, "rgba(7, 3, 2, 0.98)");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  // Grid lines
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;
  for (let i = xMin; i <= xMax; i++) {
    const x = mapX(i);
    ctx.beginPath();
    ctx.moveTo(x, padding);
    ctx.lineTo(x, height - padding);
    ctx.stroke();
  }
  for (let i = yMin; i <= yMax; i++) {
    const y = mapY(i);
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
  }

  // Axes
  ctx.strokeStyle = "rgba(255,215,185,0.85)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(mapX(0), padding);
  ctx.lineTo(mapX(0), height - padding);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(padding, mapY(0));
  ctx.lineTo(width - padding, mapY(0));
  ctx.stroke();

  // Axis labels
  ctx.fillStyle = "rgba(255,215,185,0.92)";
  ctx.font = '12px "Public Sans", system-ui, sans-serif';
  ctx.fillText("y", mapX(0) + 8, padding + 14);
  ctx.fillText("x", width - padding - 14, mapY(0) - 8);

  // Tick labels
  for (let i = xMin; i <= xMax; i++) {
    if (i !== 0) {
      ctx.fillStyle = "rgba(214, 199, 187, 0.9)";
      ctx.fillText(String(i), mapX(i) - 4, mapY(0) + 16);
    }
  }
  for (let i = yMin; i <= yMax; i++) {
    if (i !== 0) {
      ctx.fillStyle = "rgba(214, 199, 187, 0.9)";
      ctx.fillText(String(i), mapX(0) + 8, mapY(i) + 4);
    }
  }

  // Line
  const x1 = xMin,
    y1 = k * x1 + n;
  const x2 = xMax,
    y2 = k * x2 + n;
  ctx.strokeStyle = "#ec5b13";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(mapX(x1), mapY(y1));
  ctx.lineTo(mapX(x2), mapY(y2));
  ctx.stroke();

  // Dashed lines for probe point
  ctx.setLineDash([6, 6]);
  ctx.strokeStyle = "rgba(255,154,106,0.55)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(mapX(xMark), mapY(0));
  ctx.lineTo(mapX(xMark), mapY(yMark));
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(mapX(0), mapY(yMark));
  ctx.lineTo(mapX(xMark), mapY(yMark));
  ctx.stroke();
  ctx.setLineDash([]);

  // Points
  const drawPoint = (
    px: number,
    py: number,
    color: string,
    label: string
  ) => {
    if (px < xMin - 0.5 || px > xMax + 0.5 || py < yMin - 0.5 || py > yMax + 0.5)
      return;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(mapX(px), mapY(py), 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(246,238,233,0.95)";
    ctx.font = '13px "Public Sans", system-ui, sans-serif';
    ctx.fillText(label, mapX(px) + 10, mapY(py) - 10);
  };

  drawPoint(0, n, "#ffd7b9", "(0,n)");
  drawPoint(xMark, yMark, "#88d8ff", "P");
  if (Math.abs(k) > 1e-9) {
    drawPoint(-n / k, 0, "#6bdfb7", "x\u2080");
  }

  // Top-left info
  ctx.fillStyle = "rgba(255,255,255,0.84)";
  ctx.font = '600 14px "Public Sans", system-ui, sans-serif';
  ctx.fillText(
    `y = ${fmt(k)}x ${n >= 0 ? "+" : "\u2212"} ${fmt(Math.abs(n))}`,
    18,
    24
  );
  ctx.fillText(`x = ${fmt(xMark)},  f(x) = ${fmt(yMark)}`, 18, 46);
}

/* ── Component ── */

export default function LinearFunctionLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<LabState>({ k: 1, n: 0, xProbe: 2 });

  const redraw = useCallback(() => {
    if (canvasRef.current) {
      drawGraph(canvasRef.current, state.k, state.n, state.xProbe);
    }
  }, [state]);

  useEffect(() => {
    redraw();
    const handleResize = () => redraw();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [redraw]);

  const setK = (v: number) => setState((p) => ({ ...p, k: v }));
  const setN = (v: number) => setState((p) => ({ ...p, n: v }));
  const setX = (v: number) => setState((p) => ({ ...p, xProbe: v }));

  return (
    <div>
      <div className={s.interactiveShell}>
        {/* ── Controls ── */}
        <div className={s.interactiveCard}>
          <h3 className={cs.tCardTitle}>Kontrole</h3>

          <div className={s.rangeWrap}>
            <label>
              Koeficijent pravca <em>k</em>{" "}
              <span style={{ color: "var(--lesson-primary-soft)" }}>
                {fmt(state.k)}
              </span>
            </label>
            <input
              type="range"
              min={-4}
              max={4}
              step={0.5}
              value={state.k}
              onChange={(e) => setK(Number(e.target.value))}
            />
          </div>

          <div className={s.rangeWrap}>
            <label>
              Slobodan član <em>n</em>{" "}
              <span style={{ color: "var(--lesson-primary-soft)" }}>
                {fmt(state.n)}
              </span>
            </label>
            <input
              type="range"
              min={-6}
              max={6}
              step={0.5}
              value={state.n}
              onChange={(e) => setN(Number(e.target.value))}
            />
          </div>

          <div className={s.rangeWrap}>
            <label>
              Posmatrana tačka <em>x</em>{" "}
              <span style={{ color: "var(--lesson-primary-soft)" }}>
                {fmt(state.xProbe)}
              </span>
            </label>
            <input
              type="range"
              min={-6}
              max={6}
              step={0.5}
              value={state.xProbe}
              onChange={(e) => setX(Number(e.target.value))}
            />
          </div>

          <div className={cs.presetRow} style={{ marginTop: 16 }}>
            {PRESETS.map((p) => (
              <button
                key={p.label}
                className={s.presetBtn}
                type="button"
                onClick={() => setState({ k: p.k, n: p.n, xProbe: p.x })}
              >
                {p.label}
              </button>
            ))}
          </div>

          <p
            className={s.labNote}
            style={{ marginTop: 16, fontSize: "0.92rem" }}
          >
            Pre nego što pogledaš rezultate, pokušaj sam da predvidiš gde će
            prava preseći ose. Tek onda proveri na grafiku da li je tvoj
            zaključak tačan.
          </p>
        </div>

        {/* ── Canvas ── */}
        <div className={s.canvasWrap}>
          <canvas
            ref={canvasRef}
            className={s.polarCanvas}
            style={{ aspectRatio: "16 / 10" }}
          />
        </div>
      </div>

      {/* ── Live readouts ── */}
      <div className={s.resultsGrid} style={{ gridTemplateColumns: "repeat(3, 1fr)", marginTop: 16 }}>
        <div className={s.resultCard}>
          <strong>Trenutna funkcija</strong>
          <MathJax dynamic>{`\\(${formulaLatex(state.k, state.n)}\\)`}</MathJax>
        </div>
        <div className={s.resultCard}>
          <strong>Nula funkcije</strong>
          <MathJax dynamic>{`\\(${zeroLatex(state.k, state.n)}\\)`}</MathJax>
        </div>
        <div className={s.resultCard}>
          <strong>Monotonost</strong>
          <MathJax dynamic>{monotonicityText(state.k)}</MathJax>
        </div>
        <div className={s.resultCard}>
          <strong>Znak funkcije</strong>
          <MathJax dynamic>{signText(state.k, state.n)}</MathJax>
        </div>
        <div className={s.resultCard}>
          <strong>Preseci sa osama</strong>
          <MathJax dynamic>{interceptText(state.k, state.n)}</MathJax>
        </div>
        <div className={s.resultCard}>
          <strong>Vrednost u izabranoj tački</strong>
          <MathJax dynamic>{`\\(${probeText(state.k, state.n, state.xProbe)}\\)`}</MathJax>
        </div>
      </div>
    </div>
  );
}
