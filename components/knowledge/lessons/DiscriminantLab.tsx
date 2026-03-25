"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { MathJax } from "better-react-mathjax";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

/* ── Helpers ── */

function fmt(value: number): string {
  if (Math.abs(value) < 1e-10) return "0";
  const rounded = Math.round(value * 100) / 100;
  return Number.isInteger(rounded)
    ? String(rounded)
    : String(rounded).replace(/\.0+$/, "");
}

function equationString(a: number, b: number, c: number): string {
  const parts: string[] = [];
  const first = a === 1 ? "x\u00B2" : a === -1 ? "-x\u00B2" : `${fmt(a)}x\u00B2`;
  parts.push(first);
  if (b !== 0) {
    const bPart = Math.abs(b) === 1 ? "x" : `${fmt(Math.abs(b))}x`;
    parts.push(`${b >= 0 ? "+" : "\u2212"} ${bPart}`);
  }
  if (c !== 0) {
    parts.push(`${c >= 0 ? "+" : "\u2212"} ${fmt(Math.abs(c))}`);
  }
  return `${parts.join(" ")} = 0`;
}

interface RootInfo {
  nature: string;
  roots: string;
  message: string;
}

function rootsDescription(a: number, b: number, delta: number): RootInfo {
  if (delta > 0) {
    const sqrtDelta = Math.sqrt(delta);
    const x1 = (-b - sqrtDelta) / (2 * a);
    const x2 = (-b + sqrtDelta) / (2 * a);
    return {
      nature: "Dva razli\u010Dita realna",
      roots: `x\u2081 = ${fmt(x1)},  x\u2082 = ${fmt(x2)}`,
      message:
        "Diskriminanta je pozitivna, pa o\u010Dekujemo dva razli\u010Dita realna korena i dva preseka sa x-osom.",
    };
  }
  if (delta === 0) {
    const x = -b / (2 * a);
    return {
      nature: "Jedan dvostruki realan",
      roots: `x = ${fmt(x)}`,
      message:
        "Diskriminanta je nula, pa parabola dodiruje x-osu i jedna\u010Dina ima jedan dvostruki realan koren.",
    };
  }
  const real = -b / (2 * a);
  const imag = Math.sqrt(-delta) / Math.abs(2 * a);
  return {
    nature: "Nema realnih; postoje kompleksni",
    roots: `x = ${fmt(real)} \u00B1 ${fmt(imag)}i`,
    message:
      "Diskriminanta je negativna: nema realnih preseka sa x-osom, ali nad kompleksnim brojevima postoje konjugovani koreni.",
  };
}

/* ── Presets ── */

interface Preset {
  label: string;
  a: number;
  b: number;
  c: number;
}

const PRESETS: Preset[] = [
  { label: "Dva realna", a: 1, b: -5, c: 6 },
  { label: "Dvostruki koren", a: 1, b: 2, c: 1 },
  { label: "Kompleksni", a: 2, b: 4, c: 5 },
];

/* ── Canvas drawing ── */

function drawParabola(
  canvas: HTMLCanvasElement,
  a: number,
  b: number,
  c: number,
  delta: number
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const width = Math.max(320, Math.floor(rect.width));
  const height = Math.floor(rect.height || 420);
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  ctx.clearRect(0, 0, width, height);

  /* background */
  const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
  bgGrad.addColorStop(0, "rgba(20, 9, 6, 0.96)");
  bgGrad.addColorStop(1, "rgba(10, 4, 3, 0.98)");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  const xMin = -7;
  const xMax = 7;
  const vertexX = -b / (2 * a);
  const vertexY = a * vertexX * vertexX + b * vertexX + c;

  /* collect y values to set the y range */
  const vals: number[] = [0, vertexY];
  for (let x = xMin; x <= xMax; x += 0.1) {
    vals.push(a * x * x + b * x + c);
  }
  let yMin = Math.min(...vals);
  let yMax = Math.max(...vals);
  if (yMin === yMax) {
    yMin -= 1;
    yMax += 1;
  }
  const padY = (yMax - yMin) * 0.16 + 1;
  yMin -= padY;
  yMax += padY;

  const plot = { left: 44, right: width - 18, top: 24, bottom: height - 48 };
  const mapX = (x: number) =>
    plot.left + ((x - xMin) / (xMax - xMin)) * (plot.right - plot.left);
  const mapY = (y: number) =>
    plot.bottom - ((y - yMin) / (yMax - yMin)) * (plot.bottom - plot.top);

  /* grid */
  ctx.strokeStyle = "rgba(255,255,255,0.06)";
  ctx.lineWidth = 1;
  for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x += 1) {
    const px = mapX(x);
    ctx.beginPath();
    ctx.moveTo(px, plot.top);
    ctx.lineTo(px, plot.bottom);
    ctx.stroke();
  }
  for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y += 1) {
    const py = mapY(y);
    ctx.beginPath();
    ctx.moveTo(plot.left, py);
    ctx.lineTo(plot.right, py);
    ctx.stroke();
  }

  /* axes */
  ctx.strokeStyle = "rgba(255,255,255,0.24)";
  ctx.lineWidth = 1.4;
  const zeroY = mapY(0);
  const zeroX = mapX(0);
  ctx.beginPath();
  ctx.moveTo(plot.left, zeroY);
  ctx.lineTo(plot.right, zeroY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(zeroX, plot.top);
  ctx.lineTo(zeroX, plot.bottom);
  ctx.stroke();

  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.font = '12px "Public Sans", system-ui, sans-serif';
  ctx.fillText("x", plot.right - 10, zeroY - 8);
  ctx.fillText("y", zeroX + 8, plot.top + 10);

  /* parabola */
  ctx.strokeStyle = "#ec5b13";
  ctx.lineWidth = 3;
  ctx.beginPath();
  let started = false;
  for (let x = xMin; x <= xMax; x += 0.03) {
    const y = a * x * x + b * x + c;
    const px = mapX(x);
    const py = mapY(y);
    if (!started) {
      ctx.moveTo(px, py);
      started = true;
    } else {
      ctx.lineTo(px, py);
    }
  }
  ctx.stroke();

  /* draw labelled point */
  const drawPoint = (
    x: number,
    y: number,
    color: string,
    label: string,
    dx = 10,
    dy = -12
  ) => {
    const px = mapX(x);
    const py = mapY(y);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(px, py, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = '12px "Public Sans", system-ui, sans-serif';
    ctx.fillText(label, px + dx, py + dy);
  };

  /* vertex */
  drawPoint(
    vertexX,
    vertexY,
    "#ffc37f",
    `T(${fmt(vertexX)}, ${fmt(vertexY)})`,
    10,
    -10
  );

  /* roots */
  if (delta > 0) {
    const sqD = Math.sqrt(delta);
    const x1 = (-b - sqD) / (2 * a);
    const x2 = (-b + sqD) / (2 * a);
    drawPoint(x1, 0, "#70ddb6", `x\u2081=${fmt(x1)}`);
    drawPoint(x2, 0, "#70ddb6", `x\u2082=${fmt(x2)}`);
  } else if (delta === 0) {
    const x = -b / (2 * a);
    drawPoint(x, 0, "#70ddb6", `x=${fmt(x)}`);
  }

  /* top-left text overlay */
  ctx.fillStyle = "rgba(255,255,255,0.86)";
  ctx.font = '14px "Public Sans", system-ui, sans-serif';
  ctx.fillText(equationString(a, b, c), 18, 24);
  ctx.fillStyle = "#ffd7b9";
  ctx.fillText(`\u0394 = ${fmt(delta)}`, 18, 46);
}

/* ── Component ── */

export default function DiscriminantLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [aVal, setA] = useState(1);
  const [bVal, setB] = useState(-5);
  const [cVal, setC] = useState(6);

  const normaliseA = (v: number) => (v === 0 ? 1 : v);
  const a = normaliseA(aVal);
  const delta = bVal * bVal - 4 * a * cVal;
  const safeDelta = Math.abs(delta) < 1e-9 ? 0 : delta;
  const rootInfo = rootsDescription(a, bVal, safeDelta);

  const paint = useCallback(() => {
    if (!canvasRef.current) return;
    drawParabola(canvasRef.current, a, bVal, cVal, safeDelta);
  }, [a, bVal, cVal, safeDelta]);

  useEffect(() => {
    paint();
    const onResize = () => paint();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [paint]);

  const applyPreset = (p: Preset) => {
    setA(p.a);
    setB(p.b);
    setC(p.c);
  };

  return (
    <div className={s.interactiveShell}>
      {/* Controls panel */}
      <div>
        <article className={s.interactiveCard} style={{ padding: 22 }}>
          <h3 className={cs.tCardTitle}>Koeficijenti jednacine</h3>
          <p>
            Posmatramo jednacinu oblika{" "}
            <MathJax inline>{"\\(ax^2+bx+c=0\\)"}</MathJax>. Koeficijent{" "}
            <MathJax inline>{"\\(a\\)"}</MathJax> je namerno bez nule, da bi
            jednacina ostala kvadratna.
          </p>

          <div className={s.rangeWrap}>
            <label>
              Koeficijent <MathJax inline>{"\\(a\\)"}</MathJax>
            </label>
            <input
              type="range"
              min={-4}
              max={4}
              step={1}
              value={aVal}
              onChange={(e) => setA(Number(e.target.value))}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "var(--lesson-muted)",
                fontSize: "0.9rem",
              }}
            >
              <span>Izabrana vrednost</span>
              <strong style={{ color: "var(--lesson-accent)" }}>
                a = {a}
              </strong>
            </div>
          </div>

          <div className={s.rangeWrap}>
            <label>
              Koeficijent <MathJax inline>{"\\(b\\)"}</MathJax>
            </label>
            <input
              type="range"
              min={-8}
              max={8}
              step={1}
              value={bVal}
              onChange={(e) => setB(Number(e.target.value))}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "var(--lesson-muted)",
                fontSize: "0.9rem",
              }}
            >
              <span>Izabrana vrednost</span>
              <strong style={{ color: "var(--lesson-accent)" }}>
                b = {bVal}
              </strong>
            </div>
          </div>

          <div className={s.rangeWrap}>
            <label>
              Koeficijent <MathJax inline>{"\\(c\\)"}</MathJax>
            </label>
            <input
              type="range"
              min={-8}
              max={8}
              step={1}
              value={cVal}
              onChange={(e) => setC(Number(e.target.value))}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "var(--lesson-muted)",
                fontSize: "0.9rem",
              }}
            >
              <span>Izabrana vrednost</span>
              <strong style={{ color: "var(--lesson-accent)" }}>
                c = {cVal}
              </strong>
            </div>
          </div>
        </article>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 }}>
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              className={s.presetBtn}
              onClick={() => applyPreset(p)}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className={s.labNote} style={{ marginTop: 14 }}>
          {rootInfo.message}
        </div>
      </div>

      {/* Visual panel */}
      <div>
        <div className={s.canvasWrap}>
          <canvas
            ref={canvasRef}
            className={s.polarCanvas}
            style={{ aspectRatio: "16 / 10" }}
            aria-label="Interaktivni prikaz parabole i diskriminante"
          />
        </div>

        <p
          style={{
            marginTop: 12,
            color: "var(--lesson-muted)",
            fontSize: "0.92rem",
          }}
        >
          Zuta tacka oznacava teme parabole. Zelene tacke se pojavljuju kada
          postoje realni koreni.
        </p>

        <div
          className={s.resultsGrid}
          style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
        >
          <div className={s.resultCard}>
            <strong>Jednacina</strong>
            <p style={{ color: "var(--lesson-text)", fontWeight: 700, fontSize: "1.05rem" }}>
              {equationString(a, bVal, cVal)}
            </p>
          </div>
          <div className={s.resultCard}>
            <strong>Diskriminanta</strong>
            <p style={{ color: "var(--lesson-accent)", fontWeight: 700, fontSize: "1.05rem" }}>
              {"\u0394"} = {fmt(safeDelta)}
            </p>
          </div>
          <div className={s.resultCard}>
            <strong>Priroda resenja</strong>
            <p style={{ color: "var(--lesson-text)", fontWeight: 700, fontSize: "1.05rem" }}>
              {rootInfo.nature}
            </p>
          </div>
          <div className={s.resultCard}>
            <strong>Koreni</strong>
            <p style={{ color: "var(--lesson-text)", fontWeight: 700, fontSize: "1.05rem" }}>
              {rootInfo.roots}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
