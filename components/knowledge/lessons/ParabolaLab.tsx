"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { MathJax } from "better-react-mathjax";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

/* ── Types ── */

interface LabState {
  a: number;
  b: number;
  c: number;
  xProbe: number;
}

interface Preset {
  label: string;
  a: number;
  b: number;
  c: number;
  x: number;
}

const PRESETS: Preset[] = [
  { label: "Dve nule", a: 1, b: -4, c: 3, x: 2 },
  { label: "Dvostruka nula", a: 1, b: -4, c: 4, x: 2 },
  { label: "Bez realnih nula", a: 1, b: 4, c: 5, x: -2 },
  { label: "Otvorena nadole", a: -1, b: 4, c: -3, x: 2 },
];

const A_OPTIONS = [-3, -2, -1, -0.5, 0.5, 1, 2, 3];

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

function quadraticLatex(a: number, b: number, c: number): string {
  const parts: string[] = [];

  // ax^2 term
  if (Math.abs(a - 1) < 1e-9) parts.push("x^2");
  else if (Math.abs(a + 1) < 1e-9) parts.push("-x^2");
  else parts.push(`${latexNum(a)}x^2`);

  // bx term
  if (Math.abs(b) > 1e-9) {
    const bBody = Math.abs(Math.abs(b) - 1) < 1e-9 ? "x" : `${latexNum(Math.abs(b))}x`;
    parts.push(b > 0 ? `+${bBody}` : `-${bBody}`);
  }

  // c term
  if (Math.abs(c) > 1e-9) {
    parts.push(c > 0 ? `+${latexNum(c)}` : `-${latexNum(Math.abs(c))}`);
  }

  return `f(x)=${parts.join("")}`;
}

function getDiscriminant(a: number, b: number, c: number): number {
  return b * b - 4 * a * c;
}

function getVertex(a: number, b: number, c: number): { x: number; y: number } {
  const x = -b / (2 * a);
  const y = a * x * x + b * x + c;
  return { x, y };
}

function getRoots(a: number, b: number, c: number): number[] {
  const d = getDiscriminant(a, b, c);
  if (d < -1e-9) return [];
  if (Math.abs(d) < 1e-9) return [-b / (2 * a)];
  const sqrtD = Math.sqrt(d);
  const x1 = (-b - sqrtD) / (2 * a);
  const x2 = (-b + sqrtD) / (2 * a);
  return [Math.min(x1, x2), Math.max(x1, x2)];
}

function vertexLatex(a: number, b: number, c: number): string {
  const v = getVertex(a, b, c);
  const type = a > 0 ? "minimum" : "maksimum";
  return `T\\left(${latexNum(v.x)},\\,${latexNum(v.y)}\\right), \\text{ ${type}} = ${latexNum(v.y)}`;
}

function axisLatex(a: number, b: number): string {
  const xT = -b / (2 * a);
  return `x=${latexNum(xT)}`;
}

function rootsLatex(a: number, b: number, c: number): string {
  const d = getDiscriminant(a, b, c);
  const roots = getRoots(a, b, c);
  if (roots.length === 0) {
    return `\\Delta=${latexNum(d)}<0 \\text{ \u2014 nema realnih nula.}`;
  }
  if (roots.length === 1) {
    return `\\Delta=0 \\text{ \u2014 dvostruka nula: } x_0=${latexNum(roots[0])}`;
  }
  return `x_1=${latexNum(roots[0])},\\quad x_2=${latexNum(roots[1])}`;
}

function signLatex(a: number, b: number, c: number): string {
  const roots = getRoots(a, b, c);
  if (roots.length === 0) {
    return a > 0
      ? "f(x)>0 \\text{ za svako } x\\in\\mathbb{R}."
      : "f(x)<0 \\text{ za svako } x\\in\\mathbb{R}.";
  }
  if (roots.length === 1) {
    const r = latexNum(roots[0]);
    return a > 0
      ? `f(x)\\ge 0 \\text{ za svako } x,\\; f(x)=0 \\text{ samo za } x=${r}.`
      : `f(x)\\le 0 \\text{ za svako } x,\\; f(x)=0 \\text{ samo za } x=${r}.`;
  }
  const x1 = latexNum(roots[0]);
  const x2 = latexNum(roots[1]);
  return a > 0
    ? `f(x)>0 \\text{ za } x<${x1} \\text{ ili } x>${x2};\\; f(x)<0 \\text{ za } ${x1}<x<${x2}.`
    : `f(x)<0 \\text{ za } x<${x1} \\text{ ili } x>${x2};\\; f(x)>0 \\text{ za } ${x1}<x<${x2}.`;
}

function probeLatex(a: number, b: number, c: number, x: number): string {
  const y = a * x * x + b * x + c;
  return `f(${latexNum(x)})=${latexNum(y)}`;
}

/* ── Canvas drawing ── */

function chooseStep(span: number): number {
  const target = span / 7;
  const steps = [0.5, 1, 2, 5, 10, 20];
  for (const step of steps) {
    if (step >= target) return step;
  }
  return 20;
}

function drawParabola(
  canvas: HTMLCanvasElement,
  a: number,
  b: number,
  c: number,
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

  const vertex = getVertex(a, b, c);
  const roots = getRoots(a, b, c);
  const d = getDiscriminant(a, b, c);
  const yProbe = a * xMark * xMark + b * xMark + c;

  const xMin = -8,
    xMax = 8;
  const padding = 42;

  // Sample to determine y-range
  const sampleYs: number[] = [];
  for (let i = 0; i <= 160; i++) {
    const sx = xMin + (i / 160) * (xMax - xMin);
    sampleYs.push(a * sx * sx + b * sx + c);
  }
  sampleYs.push(0, vertex.y, yProbe);
  const rawMinY = Math.min(...sampleYs);
  const rawMaxY = Math.max(...sampleYs);
  const span = Math.max(8, rawMaxY - rawMinY);
  const extra = span * 0.18 + 1;
  const yMin = rawMinY - extra;
  const yMax = rawMaxY + extra;
  const plotWidth = width - padding * 2;
  const plotHeight = height - padding * 2 - 24;

  const mapX = (v: number) => padding + ((v - xMin) / (xMax - xMin)) * plotWidth;
  const mapY = (v: number) => padding + ((yMax - v) / (yMax - yMin)) * plotHeight;

  // Background
  const bg = ctx.createLinearGradient(0, 0, 0, height);
  bg.addColorStop(0, "rgba(21, 9, 6, 0.96)");
  bg.addColorStop(1, "rgba(7, 3, 2, 0.98)");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  // Grid
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;
  for (let i = xMin; i <= xMax; i++) {
    ctx.beginPath();
    ctx.moveTo(mapX(i), padding);
    ctx.lineTo(mapX(i), padding + plotHeight);
    ctx.stroke();
  }
  const yStep = chooseStep(yMax - yMin);
  const yStart = Math.ceil(yMin / yStep) * yStep;
  for (let v = yStart; v <= yMax; v += yStep) {
    ctx.beginPath();
    ctx.moveTo(padding, mapY(v));
    ctx.lineTo(width - padding, mapY(v));
    ctx.stroke();
  }

  // Axes
  if (0 >= xMin && 0 <= xMax) {
    ctx.strokeStyle = "rgba(255,215,185,0.88)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(mapX(0), padding);
    ctx.lineTo(mapX(0), padding + plotHeight);
    ctx.stroke();
  }
  if (0 >= yMin && 0 <= yMax) {
    ctx.strokeStyle = "rgba(255,215,185,0.88)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, mapY(0));
    ctx.lineTo(width - padding, mapY(0));
    ctx.stroke();
  }

  // Labels
  ctx.fillStyle = "rgba(214,199,187,0.9)";
  ctx.font = '12px "Public Sans", system-ui, sans-serif';
  for (let i = xMin; i <= xMax; i++) {
    if (i !== 0) {
      ctx.fillText(String(i), mapX(i) - 4, Math.min(height - 12, mapY(0) + 18));
    }
  }
  for (let v = yStart; v <= yMax; v += yStep) {
    if (Math.abs(v) > 1e-9) {
      ctx.fillText(fmt(v), mapX(0) + 8, mapY(v) + 4);
    }
  }

  // Axis of symmetry
  ctx.setLineDash([6, 6]);
  ctx.strokeStyle = "rgba(136,216,255,0.8)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(mapX(vertex.x), padding);
  ctx.lineTo(mapX(vertex.x), padding + plotHeight);
  ctx.stroke();
  ctx.setLineDash([]);

  // Parabola
  ctx.strokeStyle = "#ec5b13";
  ctx.lineWidth = 4;
  ctx.beginPath();
  for (let i = 0; i <= 300; i++) {
    const sx = xMin + (i / 300) * (xMax - xMin);
    const sy = a * sx * sx + b * sx + c;
    if (i === 0) ctx.moveTo(mapX(sx), mapY(sy));
    else ctx.lineTo(mapX(sx), mapY(sy));
  }
  ctx.stroke();

  // Helper to draw points
  const drawPoint = (
    px: number,
    py: number,
    color: string,
    label: string,
    dx = 10,
    dy = -10
  ) => {
    if (px < xMin - 0.2 || px > xMax + 0.2 || py < yMin - 0.2 || py > yMax + 0.2)
      return;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(mapX(px), mapY(py), 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(246,238,233,0.95)";
    ctx.font = '12px "Public Sans", system-ui, sans-serif';
    ctx.textAlign = "left";
    ctx.fillText(label, mapX(px) + dx, mapY(py) + dy);
  };

  drawPoint(vertex.x, vertex.y, "#ffd7b9", "T");
  drawPoint(0, c, "#88d8ff", "(0,c)");
  drawPoint(xMark, yProbe, "#c0a2ff", "P");

  roots.forEach((root, i) => {
    const lbl = roots.length === 1 ? "x\u2080" : i === 0 ? "x\u2081" : "x\u2082";
    drawPoint(root, 0, "#6bdfb7", lbl, 10, -12);
  });

  // Dashed probe lines
  ctx.setLineDash([6, 6]);
  ctx.strokeStyle = "rgba(192,162,255,0.55)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(mapX(xMark), mapY(0));
  ctx.lineTo(mapX(xMark), mapY(yProbe));
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(mapX(0), mapY(yProbe));
  ctx.lineTo(mapX(xMark), mapY(yProbe));
  ctx.stroke();
  ctx.setLineDash([]);

  // Sign ribbon at bottom
  const ribbonY = height - 18;
  ctx.lineWidth = 5;
  const drawSegment = (from: number, to: number, positive: boolean) => {
    const left = Math.max(from, xMin);
    const right = Math.min(to, xMax);
    if (right <= left) return;
    ctx.strokeStyle = positive
      ? "rgba(107,223,183,0.95)"
      : "rgba(255,154,146,0.92)";
    ctx.beginPath();
    ctx.moveTo(mapX(left), ribbonY);
    ctx.lineTo(mapX(right), ribbonY);
    ctx.stroke();
    const lbl = positive ? "+" : "\u2212";
    ctx.fillStyle = positive ? "#6bdfb7" : "#ff9a92";
    ctx.font = '12px "Public Sans", system-ui, sans-serif';
    ctx.textAlign = "center";
    ctx.fillText(lbl, (mapX(left) + mapX(right)) / 2, ribbonY - 8);
    ctx.textAlign = "left";
  };

  if (roots.length === 0) {
    drawSegment(xMin, xMax, a > 0);
  } else if (roots.length === 1) {
    drawSegment(xMin, roots[0], a > 0);
    drawSegment(roots[0], xMax, a > 0);
  } else {
    drawSegment(xMin, roots[0], a > 0);
    drawSegment(roots[0], roots[1], a < 0);
    drawSegment(roots[1], xMax, a > 0);
  }

  // Top-left info overlay
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.font = '600 13px "Public Sans", system-ui, sans-serif';
  ctx.fillText(
    `f(x) = ${fmt(a)}x\u00B2 ${b >= 0 ? "+" : "\u2212"} ${fmt(Math.abs(b))}x ${c >= 0 ? "+" : "\u2212"} ${fmt(Math.abs(c))}`,
    18,
    24
  );
  ctx.fillStyle = "rgba(255,215,185,0.9)";
  ctx.fillText(
    `\u0394 = ${fmt(d)}   |   teme: (${fmt(vertex.x)}, ${fmt(vertex.y)})`,
    18,
    44
  );
}

/* ── Component ── */

export default function ParabolaLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<LabState>({
    a: 1,
    b: -4,
    c: 3,
    xProbe: 2,
  });

  const redraw = useCallback(() => {
    if (canvasRef.current) {
      drawParabola(canvasRef.current, state.a, state.b, state.c, state.xProbe);
    }
  }, [state]);

  useEffect(() => {
    redraw();
    const handleResize = () => redraw();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [redraw]);

  const setA = (v: number) => setState((p) => ({ ...p, a: v }));
  const setB = (v: number) => setState((p) => ({ ...p, b: v }));
  const setC = (v: number) => setState((p) => ({ ...p, c: v }));
  const setX = (v: number) => setState((p) => ({ ...p, xProbe: v }));

  return (
    <div>
      <div className={s.interactiveShell}>
        {/* ── Controls ── */}
        <div className={s.interactiveCard}>
          <h3 className={cs.tCardTitle}>Kontrole</h3>

          <div className={s.rangeWrap}>
            <label>
              Koeficijent <em>a</em>{" "}
              <span style={{ color: "var(--lesson-primary-soft)" }}>
                {fmt(state.a)}
              </span>
            </label>
            <select
              value={state.a}
              onChange={(e) => setA(Number(e.target.value))}
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
              {A_OPTIONS.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
            <span style={{ fontSize: "0.88rem", color: "var(--lesson-muted)" }}>
              Znak od <em>a</em> menja smer otvaranja, a njegova apsolutna
              vrednost menja &quot;sirinu&quot; parabole.
            </span>
          </div>

          <div className={s.rangeWrap}>
            <label>
              Koeficijent <em>b</em>{" "}
              <span style={{ color: "var(--lesson-primary-soft)" }}>
                {fmt(state.b)}
              </span>
            </label>
            <input
              type="range"
              min={-8}
              max={8}
              step={1}
              value={state.b}
              onChange={(e) => setB(Number(e.target.value))}
            />
            <span style={{ fontSize: "0.88rem", color: "var(--lesson-muted)" }}>
              Koeficijent <em>b</em> zajedno sa <em>a</em> odredjuje osu
              simetrije i polozaj temena.
            </span>
          </div>

          <div className={s.rangeWrap}>
            <label>
              Koeficijent <em>c</em>{" "}
              <span style={{ color: "var(--lesson-primary-soft)" }}>
                {fmt(state.c)}
              </span>
            </label>
            <input
              type="range"
              min={-8}
              max={8}
              step={1}
              value={state.c}
              onChange={(e) => setC(Number(e.target.value))}
            />
            <span style={{ fontSize: "0.88rem", color: "var(--lesson-muted)" }}>
              Posto je f(0)=c, ovaj koeficijent direktno pomera presek sa
              y-osom.
            </span>
          </div>

          <div className={s.rangeWrap}>
            <label>
              Proveri vrednost u tacki <em>x</em>{" "}
              <span style={{ color: "var(--lesson-primary-soft)" }}>
                {fmt(state.xProbe)}
              </span>
            </label>
            <input
              type="range"
              min={-8}
              max={8}
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
                onClick={() =>
                  setState({ a: p.a, b: p.b, c: p.c, xProbe: p.x })
                }
              >
                {p.label}
              </button>
            ))}
          </div>

          <p
            className={s.labNote}
            style={{ marginTop: 16, fontSize: "0.92rem" }}
          >
            Posmatraj kako se osa simetrije i nule &quot;dogovaraju&quot;: kada
            postoje dve nule, teme je tacno na sredini izmedju njih. Kada nula
            nema, znak cele funkcije odredjuje samo polozaj temena i smer
            otvaranja.
          </p>
        </div>

        {/* ── Canvas ── */}
        <div className={s.canvasWrap}>
          <canvas
            ref={canvasRef}
            className={s.polarCanvas}
            style={{ aspectRatio: "16 / 11" }}
            aria-label="Interaktivni prikaz parabole"
          />
        </div>
      </div>

      {/* ── Live readouts ── */}
      <div
        className={s.resultsGrid}
        style={{ gridTemplateColumns: "repeat(3, 1fr)", marginTop: 16 }}
      >
        <div className={s.resultCard}>
          <strong>Formula</strong>
          <MathJax dynamic>{`\\(${quadraticLatex(state.a, state.b, state.c)}\\)`}</MathJax>
        </div>
        <div className={s.resultCard}>
          <strong>Teme</strong>
          <MathJax dynamic>{`\\(${vertexLatex(state.a, state.b, state.c)}\\)`}</MathJax>
        </div>
        <div className={s.resultCard}>
          <strong>Osa simetrije</strong>
          <MathJax dynamic>{`\\(${axisLatex(state.a, state.b)}\\)`}</MathJax>
        </div>
        <div className={s.resultCard}>
          <strong>Nule</strong>
          <MathJax dynamic>{`\\(${rootsLatex(state.a, state.b, state.c)}\\)`}</MathJax>
        </div>
        <div className={s.resultCard}>
          <strong>Znak</strong>
          <MathJax dynamic>{`\\(${signLatex(state.a, state.b, state.c)}\\)`}</MathJax>
        </div>
        <div className={s.resultCard}>
          <strong>Vrednost u tacki</strong>
          <MathJax dynamic>{`\\(${probeLatex(state.a, state.b, state.c, state.xProbe)}\\)`}</MathJax>
        </div>
      </div>
    </div>
  );
}
