"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { MathJax } from "better-react-mathjax";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

/* ── Types ── */

interface LabState {
  base: number;
  operator: "<" | "<=" | ">" | ">=";
  m1: number;
  b1: number;
  m2: number;
  b2: number;
  x0: number;
}

/* ── Helpers ── */

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = x % y;
    x = y;
    y = t;
  }
  return x || 1;
}

function baseTex(base: number): string {
  if (Math.abs(base - 0.5) < 1e-6) return "\\frac{1}{2}";
  if (Math.abs(base - 1 / 3) < 1e-4) return "\\frac{1}{3}";
  if (Math.abs(base - 2) < 1e-6) return "2";
  return "3";
}

function baseLabel(base: number): string {
  if (Math.abs(base - 0.5) < 1e-6) return "1/2";
  if (Math.abs(base - 1 / 3) < 1e-4) return "1/3";
  if (Math.abs(base - 2) < 1e-6) return "2";
  return "3";
}

function texOp(op: string): string {
  const map: Record<string, string> = {
    "<": "<",
    "<=": "\\le",
    ">": ">",
    ">=": "\\ge",
  };
  return map[op] || op;
}

function reverseOp(op: string): string {
  const map: Record<string, string> = {
    "<": ">",
    "<=": ">=",
    ">": "<",
    ">=": "<=",
  };
  return map[op] || op;
}

function compare(a: number, op: string, b: number): boolean {
  switch (op) {
    case "<":
      return a < b;
    case "<=":
      return a <= b;
    case ">":
      return a > b;
    case ">=":
      return a >= b;
    default:
      return false;
  }
}

function numberTex(value: number): string {
  if (!Number.isFinite(value)) return "0";
  if (Math.abs(value) < 1e-9) return "0";
  if (Math.abs(value - Math.round(value)) < 1e-9)
    return String(Math.round(value));
  for (let d = 2; d <= 12; d += 1) {
    const n = Math.round(value * d);
    if (Math.abs(value - n / d) < 1e-9) {
      const g = gcd(n, d);
      const nn = n / g;
      const dd = d / g;
      if (dd === 1) return String(nn);
      return "\\frac{" + nn + "}{" + dd + "}";
    }
  }
  return value.toFixed(2).replace(/\.00$/, "");
}

function numberLabel(value: number): string {
  if (Math.abs(value - Math.round(value)) < 1e-9)
    return String(Math.round(value));
  return value.toFixed(1).replace(/\.0$/, "");
}

function linearTex(m: number, b: number): string {
  let text = "";
  if (m !== 0) {
    if (m === 1) text = "x";
    else if (m === -1) text = "-x";
    else text = String(m) + "x";
  }
  if (b !== 0) {
    if (text === "") text = String(b);
    else text += b > 0 ? "+" + b : String(b);
  }
  return text || "0";
}

interface Solution {
  reducedTex: string;
  allReal: boolean;
  empty: boolean;
  boundary: number | null;
  finalOp: string | null;
}

function solveLinear(A: number, B: number, op: string): Solution {
  const reducedTex = linearTex(A, B) + " " + texOp(op) + " 0";
  if (Math.abs(A) < 1e-9) {
    const truth = compare(B, op, 0);
    return { reducedTex, allReal: truth, empty: !truth, boundary: null, finalOp: null };
  }
  const boundary = -B / A;
  const finalOp = A > 0 ? op : reverseOp(op);
  return { reducedTex, allReal: false, empty: false, boundary, finalOp };
}

function intervalTex(sol: Solution): string {
  if (sol.allReal) return "\\mathbb{R}";
  if (sol.empty) return "\\varnothing";
  const bnd = numberTex(sol.boundary!);
  switch (sol.finalOp) {
    case "<":
      return "(-\\infty," + bnd + ")";
    case "<=":
      return "(-\\infty," + bnd + "]";
    case ">":
      return "(" + bnd + ",\\infty)";
    case ">=":
      return "[" + bnd + ",\\infty)";
    default:
      return "\\varnothing";
  }
}

function computeData(st: LabState) {
  const exponentOp = st.base > 1 ? st.operator : reverseOp(st.operator);
  const A = st.m1 - st.m2;
  const B = st.b1 - st.b2;
  const solved = solveLinear(A, B, exponentOp);
  const t1 = st.m1 * st.x0 + st.b1;
  const t2 = st.m2 * st.x0 + st.b2;
  const y1 = Math.pow(st.base, t1);
  const y2 = Math.pow(st.base, t2);
  return {
    ...st,
    exponentOp,
    A,
    B,
    solved,
    t1,
    t2,
    y1,
    y2,
    sampleTruth: compare(y1, st.operator, y2),
  };
}

/* ── Canvas drawing ── */

interface ThemePalette {
  panelGradTop: string;
  panelGradBottom: string;
  panelBorder: string;
  panelTitle: string;
  axisLine: string;
  muted: string;
  text: string;
  accent: string;
  accentShade: string;
  lineCurve: string;
  solutionColor: string;
  emptyColor: string;
  dashed: string;
  openCircleBg: string;
  dotBorder: string;
}

function getTheme(): ThemePalette {
  const isLight = document.documentElement.classList.contains("light");
  return {
    panelGradTop: isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)",
    panelGradBottom: isLight ? "rgba(0,0,0,0.01)" : "rgba(255,255,255,0.01)",
    panelBorder: isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)",
    panelTitle: isLight ? "#2a2420" : "#f6eee9",
    axisLine: isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)",
    muted: isLight ? "#7a6f68" : "#d8c6ba",
    text: isLight ? "#2a2420" : "#f6eee9",
    accent: isLight ? "#d94e0a" : "#ec5b13",
    accentShade: isLight ? "rgba(217, 78, 10, 0.10)" : "rgba(236,91,19,0.10)",
    lineCurve: isLight ? "#2e8ebf" : "#8fd7ff",
    solutionColor: isLight ? "#1a9e6e" : "#74dfb7",
    emptyColor: isLight ? "#d94e0a" : "#ff9b8e",
    dashed: isLight ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.35)",
    openCircleBg: isLight ? "#f5f0eb" : "#090403",
    dotBorder: isLight ? "#2a2420" : "#090403",
  };
}

function mapValue(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  if (Math.abs(inMax - inMin) < 1e-9) return (outMin + outMax) / 2;
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  fill: boolean,
  stroke: boolean
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

function drawPanelBg(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  title: string,
  theme: ThemePalette
) {
  const grad = ctx.createLinearGradient(x, y, x, y + h);
  grad.addColorStop(0, theme.panelGradTop);
  grad.addColorStop(1, theme.panelGradBottom);
  ctx.fillStyle = grad;
  roundRect(ctx, x, y, w, h, 20, true, false);
  ctx.strokeStyle = theme.panelBorder;
  ctx.lineWidth = 1;
  roundRect(ctx, x, y, w, h, 20, false, true);
  ctx.fillStyle = theme.panelTitle;
  ctx.font = '700 14px "Public Sans", system-ui, sans-serif';
  ctx.fillText(title, x + 18, y + 28);
}

function drawAxes(
  ctx: CanvasRenderingContext2D,
  box: { x: number; y: number; w: number; h: number },
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
  theme: ThemePalette
) {
  ctx.strokeStyle = theme.axisLine;
  ctx.lineWidth = 1;
  if (xMin < 0 && xMax > 0) {
    const x0 = mapValue(0, xMin, xMax, box.x, box.x + box.w);
    ctx.beginPath();
    ctx.moveTo(x0, box.y + 30);
    ctx.lineTo(x0, box.y + box.h - 18);
    ctx.stroke();
  }
  if (yMin < 0 && yMax > 0) {
    const y0 = mapValue(0, yMin, yMax, box.y + box.h - 18, box.y + 40);
    ctx.beginPath();
    ctx.moveTo(box.x + 16, y0);
    ctx.lineTo(box.x + box.w - 16, y0);
    ctx.stroke();
  }
}

function drawDot(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  filled: boolean,
  openCircleBg: string
) {
  ctx.beginPath();
  ctx.arc(x, y, 5.5, 0, Math.PI * 2);
  if (filled) {
    ctx.fillStyle = color;
    ctx.fill();
  } else {
    ctx.fillStyle = openCircleBg;
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

type Data = ReturnType<typeof computeData>;

function drawMonotonicPlot(
  ctx: CanvasRenderingContext2D,
  box: { x: number; y: number; w: number; h: number },
  data: Data,
  theme: ThemePalette
) {
  drawPanelBg(ctx, box.x, box.y, box.w, box.h, "Graf funkcije y = a^t", theme);
  const tMin = -3,
    tMax = 3,
    yMax = 12,
    yMin = 0;
  drawAxes(ctx, box, tMin, tMax, yMin, yMax, theme);

  ctx.strokeStyle = theme.accent;
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let i = 0; i <= 180; i++) {
    const t = tMin + (i / 180) * (tMax - tMin);
    const y = Math.min(yMax, Math.pow(data.base, t));
    const px = mapValue(t, tMin, tMax, box.x + 20, box.x + box.w - 20);
    const py = mapValue(y, yMin, yMax, box.y + box.h - 22, box.y + 40);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();

  const markers = [
    { label: "t1", value: data.t1, color: theme.accent },
    { label: "t2", value: data.t2, color: theme.lineCurve },
  ];
  markers.forEach((m) => {
    const ct = Math.max(tMin, Math.min(tMax, m.value));
    const yVal = Math.min(yMax, Math.pow(data.base, ct));
    const px = mapValue(ct, tMin, tMax, box.x + 20, box.x + box.w - 20);
    const py = mapValue(yVal, yMin, yMax, box.y + box.h - 22, box.y + 40);
    ctx.strokeStyle = m.color;
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 5]);
    ctx.beginPath();
    ctx.moveTo(px, box.y + box.h - 22);
    ctx.lineTo(px, py);
    ctx.stroke();
    ctx.setLineDash([]);
    drawDot(ctx, px, py, m.color, true, theme.openCircleBg);
    ctx.fillStyle = m.color;
    ctx.font = '700 12px "Public Sans", system-ui, sans-serif';
    ctx.fillText(m.label, px - 10, py - 10);
  });

  ctx.fillStyle = theme.muted;
  ctx.font = '600 12px "Public Sans", system-ui, sans-serif';
  ctx.fillText(
    data.base > 1
      ? "Rastuca funkcija: veci eksponent daje vecu vrednost."
      : "Opadajuca funkcija: veci eksponent daje manju vrednost.",
    box.x + 18,
    box.y + box.h - 28
  );
}

function drawLinearPlot(
  ctx: CanvasRenderingContext2D,
  box: { x: number; y: number; w: number; h: number },
  data: Data,
  theme: ThemePalette
): { xMin: number; xMax: number } {
  drawPanelBg(ctx, box.x, box.y, box.w, box.h, "Eksponenti i region resenja", theme);
  const span = Math.max(
    4,
    data.solved.boundary === null ? 4 : Math.abs(data.solved.boundary) + 1.5
  );
  const xMin = -span,
    xMax = span;
  const vals = [
    data.m1 * xMin + data.b1,
    data.m1 * xMax + data.b1,
    data.m2 * xMin + data.b2,
    data.m2 * xMax + data.b2,
  ];
  let yMin = Math.min(...vals, -1);
  let yMax = Math.max(...vals, 1);
  const pad = Math.max(1, (yMax - yMin) * 0.15);
  yMin -= pad;
  yMax += pad;
  drawAxes(ctx, box, xMin, xMax, yMin, yMax, theme);

  const strips = 80;
  for (let i = 0; i < strips; i++) {
    const xa = xMin + (i / strips) * (xMax - xMin);
    const xb = xMin + ((i + 1) / strips) * (xMax - xMin);
    const xm = (xa + xb) / 2;
    const left = Math.pow(data.base, data.m1 * xm + data.b1);
    const right = Math.pow(data.base, data.m2 * xm + data.b2);
    if (compare(left, data.operator, right)) {
      const px1 = mapValue(xa, xMin, xMax, box.x + 16, box.x + box.w - 16);
      const px2 = mapValue(xb, xMin, xMax, box.x + 16, box.x + box.w - 16);
      ctx.fillStyle = theme.accentShade;
      ctx.fillRect(px1, box.y + 36, px2 - px1, box.h - 60);
    }
  }

  const lines = [
    { m: data.m1, b: data.b1, color: theme.accent, label: "f(x)" },
    { m: data.m2, b: data.b2, color: theme.lineCurve, label: "g(x)" },
  ];
  lines.forEach((line) => {
    ctx.strokeStyle = line.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let i = 0; i <= 100; i++) {
      const x = xMin + (i / 100) * (xMax - xMin);
      const y = line.m * x + line.b;
      const px = mapValue(x, xMin, xMax, box.x + 16, box.x + box.w - 16);
      const py = mapValue(y, yMin, yMax, box.y + box.h - 18, box.y + 40);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.fillStyle = line.color;
    ctx.font = '700 12px "Public Sans", system-ui, sans-serif';
    ctx.fillText(
      line.label + " = " + linearTex(line.m, line.b),
      box.x + 18,
      box.y + 48 + (line.label === "f(x)" ? 0 : 18)
    );
  });

  if (
    !data.solved.allReal &&
    !data.solved.empty &&
    data.solved.boundary !== null
  ) {
    const bx = mapValue(
      data.solved.boundary,
      xMin,
      xMax,
      box.x + 16,
      box.x + box.w - 16
    );
    ctx.setLineDash([6, 6]);
    ctx.strokeStyle = theme.dashed;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(bx, box.y + 36);
    ctx.lineTo(bx, box.y + box.h - 18);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  return { xMin, xMax };
}

function drawNumberLine(
  ctx: CanvasRenderingContext2D,
  box: { x: number; y: number; w: number; h: number },
  range: { xMin: number; xMax: number },
  data: Data,
  theme: ThemePalette
) {
  drawPanelBg(ctx, box.x, box.y, box.w, box.h, "Skup resenja na brojnoj pravoj", theme);
  const { xMin, xMax } = range;
  const y = box.y + box.h / 2 + 18;
  const left = box.x + 22;
  const right = box.x + box.w - 22;

  ctx.strokeStyle = theme.dashed;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(left, y);
  ctx.lineTo(right, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(right - 10, y - 6);
  ctx.lineTo(right, y);
  ctx.lineTo(right - 10, y + 6);
  ctx.stroke();

  if (data.solved.allReal) {
    ctx.strokeStyle = theme.accent;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(right, y);
    ctx.stroke();
    return;
  }
  if (data.solved.empty) {
    ctx.fillStyle = theme.emptyColor;
    ctx.font = '700 14px "Public Sans", system-ui, sans-serif';
    ctx.fillText("Nema dozvoljenih tacaka.", box.x + 20, box.y + 34);
    return;
  }

  const boundary = data.solved.boundary!;
  const px = mapValue(boundary, xMin, xMax, left, right);
  ctx.fillStyle = theme.muted;
  ctx.font = '600 12px "Public Sans", system-ui, sans-serif';
  ctx.fillText("0", mapValue(0, xMin, xMax, left, right) - 4, y + 24);
  ctx.fillText(numberLabel(boundary), px - 10, y + 24);

  ctx.strokeStyle = theme.accent;
  ctx.lineWidth = 5;
  ctx.beginPath();
  if (data.solved.finalOp === "<" || data.solved.finalOp === "<=") {
    ctx.moveTo(left, y);
    ctx.lineTo(px, y);
  } else {
    ctx.moveTo(px, y);
    ctx.lineTo(right, y);
  }
  ctx.stroke();

  drawDot(
    ctx,
    px,
    y,
    theme.accent,
    data.solved.finalOp === "<=" || data.solved.finalOp === ">=",
    theme.openCircleBg
  );
}

function drawCanvas(canvas: HTMLCanvasElement, state: LabState) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const theme = getTheme();
  const data = computeData(state);
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.floor(rect.width * dpr));
  canvas.height = Math.max(1, Math.floor(rect.height * dpr));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const width = rect.width;
  const height = rect.height;
  ctx.clearRect(0, 0, width, height);

  const topBox = { x: 12, y: 12, w: width - 24, h: height * 0.42 };
  const midY = topBox.y + topBox.h + 12;
  const plotW = (width - 36) / 2;
  const leftBox = { x: 12, y: midY, w: plotW, h: height * 0.34 };
  const rightBox = { x: 24 + plotW, y: midY, w: plotW, h: height * 0.34 };

  drawMonotonicPlot(ctx, topBox, data, theme);
  const range = drawLinearPlot(ctx, leftBox, data, theme);
  drawNumberLine(ctx, rightBox, range, data, theme);
}

/* ── Component ── */

const BASE_OPTIONS = [
  { value: 0.5, label: "1/2" },
  { value: 1 / 3, label: "1/3" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
];

const OP_OPTIONS: { value: LabState["operator"]; label: string }[] = [
  { value: "<=", label: "\u2264" },
  { value: "<", label: "<" },
  { value: ">", label: ">" },
  { value: ">=", label: "\u2265" },
];

export default function ExpInequalityLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<LabState>({
    base: 0.5,
    operator: "<=",
    m1: 2,
    b1: -1,
    m2: 0,
    b2: 3,
    x0: 1,
  });

  const data = computeData(state);

  const redraw = useCallback(() => {
    if (canvasRef.current) drawCanvas(canvasRef.current, state);
  }, [state]);

  useEffect(() => {
    redraw();
    const handleResize = () => redraw();
    window.addEventListener("resize", handleResize);
    const observer = new MutationObserver(() => redraw());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => { window.removeEventListener("resize", handleResize); observer.disconnect(); };
  }, [redraw]);

  const update = (patch: Partial<LabState>) =>
    setState((prev) => ({ ...prev, ...patch }));

  const originalLatex = `\\(${baseTex(data.base)}^{${linearTex(data.m1, data.b1)}} ${texOp(data.operator)} ${baseTex(data.base)}^{${linearTex(data.m2, data.b2)}}\\)`;
  const exponentLatex = `\\(${linearTex(data.m1, data.b1)} ${texOp(data.exponentOp)} ${linearTex(data.m2, data.b2)}\\)`;
  const reducedLatex = `\\(${data.solved.reducedTex}\\)`;
  const solutionLatex = `\\(S=${intervalTex(data.solved)}\\)`;

  const baseInfoText = data.base > 1
    ? "Baza je veca od 1, pa funkcija raste i znak na eksponentima ostaje isti."
    : "Baza je izmedju 0 i 1, pa funkcija opada i znak na eksponentima mora da se obrne.";

  const sampleNoteLatex = `Za izabranu test tacku vazi \\(x_0=${numberTex(data.x0)}\\). Tada su eksponenti \\(t_1=${numberTex(data.t1)}\\) i \\(t_2=${numberTex(data.t2)}\\). To je ${data.sampleTruth ? "tacna" : "netacna"} tvrdnja za ovu tacku.`;

  return (
    <>
      <div className={s.interactiveShell}>
        {/* Controls */}
        <article className={s.interactiveCard} style={{ padding: 22 }}>
          <h3 className={cs.tCardTitle}>Podesi prijemni primer</h3>
          <p style={{ color: "var(--lesson-muted)", marginBottom: 16 }}>
            Pocni od baze. To je najvazniji izbor u celoj laboratoriji.
          </p>

          <div className={s.controlGrid}>
            {/* Base */}
            <div className={s.field}>
              <label>
                Baza <MathJax inline dynamic>{"\\(a\\)"}</MathJax>
              </label>
              <select
                value={state.base}
                onChange={(e) =>
                  update({ base: parseFloat(e.target.value) })
                }
              >
                {BASE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Operator */}
            <div className={s.field}>
              <label>Znak nejednakosti</label>
              <select
                value={state.operator}
                onChange={(e) =>
                  update({ operator: e.target.value as LabState["operator"] })
                }
              >
                {OP_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sliders */}
          <div style={{ display: "grid", gap: 14, marginTop: 16 }}>
            <div className={s.rangeWrap}>
              <label>
                Koeficijent <MathJax inline dynamic>{"\\(m_1\\)"}</MathJax>:{" "}
                <strong>{state.m1}</strong>
              </label>
              <input
                type="range"
                min={-3}
                max={3}
                step={1}
                value={state.m1}
                onChange={(e) => update({ m1: parseInt(e.target.value, 10) })}
              />
            </div>
            <div className={s.rangeWrap}>
              <label>
                Slobodni clan <MathJax inline dynamic>{"\\(b_1\\)"}</MathJax>:{" "}
                <strong>{state.b1}</strong>
              </label>
              <input
                type="range"
                min={-4}
                max={4}
                step={1}
                value={state.b1}
                onChange={(e) => update({ b1: parseInt(e.target.value, 10) })}
              />
            </div>
            <div className={s.rangeWrap}>
              <label>
                Koeficijent <MathJax inline dynamic>{"\\(m_2\\)"}</MathJax>:{" "}
                <strong>{state.m2}</strong>
              </label>
              <input
                type="range"
                min={-3}
                max={3}
                step={1}
                value={state.m2}
                onChange={(e) => update({ m2: parseInt(e.target.value, 10) })}
              />
            </div>
            <div className={s.rangeWrap}>
              <label>
                Slobodni clan <MathJax inline dynamic>{"\\(b_2\\)"}</MathJax>:{" "}
                <strong>{state.b2}</strong>
              </label>
              <input
                type="range"
                min={-4}
                max={4}
                step={1}
                value={state.b2}
                onChange={(e) => update({ b2: parseInt(e.target.value, 10) })}
              />
            </div>
            <div className={s.rangeWrap}>
              <label>
                Test tacka <MathJax inline dynamic>{"\\(x_0\\)"}</MathJax>:{" "}
                <strong>{numberLabel(state.x0)}</strong>
              </label>
              <input
                type="range"
                min={-3}
                max={3}
                step={0.5}
                value={state.x0}
                onChange={(e) => update({ x0: parseFloat(e.target.value) })}
              />
            </div>
          </div>

          <div
            style={{
              marginTop: 16,
              padding: "14px 16px",
              borderRadius: 16,
              background: "rgba(236,91,19,0.08)",
              border: "1px solid rgba(236,91,19,0.14)",
              color: "var(--lesson-accent)",
            }}
          >
            {baseInfoText}
          </div>
        </article>

        {/* Canvas */}
        <div className={s.canvasWrap}>
          <canvas
            ref={canvasRef}
            className={s.polarCanvas}
            style={{ aspectRatio: "16 / 10", minHeight: 420 }}
            aria-label="Interaktivni graf eksponencijalne nejednacine"
          />
        </div>
      </div>

      {/* Math output cards */}
      <div className={s.resultsGrid} style={{ gridTemplateColumns: "repeat(4, 1fr)", marginTop: 16 }}>
        <div className={s.resultCard}>
          <strong>Originalna nejednacina</strong>
          <MathJax dynamic>{originalLatex}</MathJax>
        </div>
        <div className={s.resultCard}>
          <strong>Nejednacina po eksponentima</strong>
          <MathJax dynamic>{exponentLatex}</MathJax>
        </div>
        <div className={s.resultCard}>
          <strong>Svedeni oblik</strong>
          <MathJax dynamic>{reducedLatex}</MathJax>
        </div>
        <div className={s.resultCard}>
          <strong>Skup resenja</strong>
          <MathJax dynamic>{solutionLatex}</MathJax>
        </div>
      </div>

      <div className={s.labNote} style={{ marginTop: 16 }}>
        <MathJax dynamic>{sampleNoteLatex}</MathJax>
      </div>
    </>
  );
}
