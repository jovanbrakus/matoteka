"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

/* ── Helpers ── */

const EPS = 1e-9;

function fmt(v: number): string {
  if (Math.abs(v) < EPS) return "0";
  const r = Math.round(v * 100) / 100;
  return Number.isInteger(r)
    ? String(r)
    : r.toFixed(2).replace(/\.?0+$/, "");
}

interface Term {
  coef: number;
  variable: string;
}

function buildExpr(terms: Term[]): string {
  const parts: string[] = [];
  terms.forEach(({ coef, variable }) => {
    if (Math.abs(coef) < EPS) return;
    const sign = coef < 0 ? "\u2212" : "+";
    const abs = Math.abs(coef);
    const coefText = variable
      ? Math.abs(abs - 1) < EPS
        ? ""
        : fmt(abs)
      : fmt(abs);
    parts.push(`${sign}${coefText}${variable}`);
  });
  if (!parts.length) return "0";
  let text = parts.join(" ");
  if (text.startsWith("+")) text = text.slice(1);
  return text.trim();
}

function funcExpr(a: number, b: number, c: number, d: number): string {
  return `f(x) = ${buildExpr([
    { coef: a, variable: "x\u00B3" },
    { coef: b, variable: "x\u00B2" },
    { coef: c, variable: "x" },
    { coef: d, variable: "" },
  ])}`;
}

function derivExprStr(a: number, b: number, c: number): string {
  return `f\u2032(x) = ${buildExpr([
    { coef: 3 * a, variable: "x\u00B2" },
    { coef: 2 * b, variable: "x" },
    { coef: c, variable: "" },
  ])}`;
}

function tangentExprStr(x0: number, y0: number, slope: number): string {
  const n = y0 - slope * x0;
  return `y = ${buildExpr([
    { coef: slope, variable: "x" },
    { coef: n, variable: "" },
  ])}`;
}

function fVal(x: number, a: number, b: number, c: number, d: number): number {
  return a * x * x * x + b * x * x + c * x + d;
}

function fpVal(x: number, a: number, b: number, c: number): number {
  return 3 * a * x * x + 2 * b * x + c;
}

function solveFpRoots(a: number, b: number, c: number): number[] {
  const A = 3 * a;
  const B = 2 * b;
  const C = c;
  if (Math.abs(A) < EPS) {
    if (Math.abs(B) < EPS) return [];
    return [-C / B];
  }
  const disc = B * B - 4 * A * C;
  if (disc < -EPS) return [];
  if (Math.abs(disc) < EPS) return [-B / (2 * A)];
  const sq = Math.sqrt(disc);
  return [(-B - sq) / (2 * A), (-B + sq) / (2 * A)].sort((m, n) => m - n);
}

interface IntervalInfo {
  left: number;
  right: number;
  sign: number;
  label: string;
  behavior: string;
}

function analyseIntervals(
  a: number,
  b: number,
  c: number,
  roots: number[]
): IntervalInfo[] {
  const pts = [-Infinity, ...roots, Infinity];
  return pts.slice(0, -1).map((left, i) => {
    const right = pts[i + 1];
    let sample: number;
    if (!Number.isFinite(left)) sample = Number.isFinite(right) ? right - 1 : 0;
    else if (!Number.isFinite(right)) sample = left + 1;
    else sample = (left + right) / 2;
    const val = fpVal(sample, a, b, c);
    const sign = val > EPS ? 1 : val < -EPS ? -1 : 0;
    const bL = !Number.isFinite(left) ? "\u2212\u221E" : fmt(left);
    const bR = !Number.isFinite(right) ? "+\u221E" : fmt(right);
    return {
      left,
      right,
      sign,
      label: `(${bL}, ${bR})`,
      behavior: sign > 0 ? "raste" : sign < 0 ? "opada" : "miruje",
    };
  });
}

function classifyRoot(
  root: number,
  idx: number,
  intervals: IntervalInfo[],
  a: number,
  b: number,
  c: number,
  d: number
): { x: number; y: number; type: string } {
  const leftSign = intervals[idx]?.sign ?? 0;
  const rightSign = intervals[idx + 1]?.sign ?? 0;
  let type = "stacionarna ta\u010Dka bez ekstrema";
  if (leftSign > 0 && rightSign < 0) type = "lokalni maksimum";
  else if (leftSign < 0 && rightSign > 0) type = "lokalni minimum";
  return { x: root, y: fVal(root, a, b, c, d), type };
}

/* ── Presets ── */

interface Preset {
  label: string;
  a: number;
  b: number;
  c: number;
  d: number;
  x0: number;
}

const PRESETS: Preset[] = [
  { label: "Dve ekstremne", a: 1, b: 0, c: -3, d: 1, x0: 1 },
  { label: "Stacionarna bez ekstrema", a: 1, b: 0, c: 0, d: 0, x0: 0 },
  { label: "Stalni rast", a: 0.5, b: 0, c: 1, d: 0, x0: -1 },
];

/* ── Canvas ── */

function drawCanvas(
  canvas: HTMLCanvasElement,
  a: number,
  b: number,
  c: number,
  d: number,
  x0: number,
  roots: number[],
  intervals: IntervalInfo[]
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const isLight = document.documentElement.classList.contains("light");
  const T = {
    bg1: isLight ? "rgba(245, 240, 235, 0.96)" : "rgba(20, 9, 6, 0.96)",
    bg2: isLight ? "rgba(235, 229, 223, 0.98)" : "rgba(10, 4, 3, 0.98)",
    text: isLight ? "#2a2420" : "#f6eee9",
    muted: isLight ? "#7a6f68" : "#cdb8aa",
    plotBg: isLight ? "rgba(0,0,0,0.02)" : "rgba(255,255,255,0.02)",
    grid: isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)",
    axis: isLight ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.18)",
    curve: isLight ? "#d94e0a" : "#ec5b13",
    tangent: isLight ? "rgba(40,120,184,0.60)" : "rgba(143,215,255,0.7)",
    tangentDot: isLight ? "#2878b8" : "#8fd7ff",
    tangentLabel: isLight ? "#2a2420" : "#fff",
    critDot: isLight ? "#1a9e6e" : "#79dfb8",
    critLabel: isLight ? "#1a9e6e" : "#c0f0d8",
    stripBg: isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.04)",
    stripBorder: isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)",
    stripPosBg: isLight ? "rgba(26,158,110,0.10)" : "rgba(121,223,184,0.12)",
    stripNegBg: isLight ? "rgba(217,78,10,0.10)" : "rgba(255,155,143,0.12)",
    stripZeroBg: isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.06)",
    stripPos: isLight ? "#1a9e6e" : "#79dfb8",
    stripNeg: isLight ? "#c42020" : "#ff9b8f",
    stripZero: isLight ? "#888" : "#ccc",
    rootLine: isLight ? "rgba(0,0,0,0.16)" : "rgba(255,255,255,0.22)",
  };

  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const width = Math.max(320, Math.floor(rect.width));
  const height = Math.max(360, Math.min(500, Math.floor(width * 0.68)));
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
  bgGrad.addColorStop(0, T.bg1);
  bgGrad.addColorStop(1, T.bg2);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  const xMin = -4.5;
  const xMax = 4.5;
  const gR = { x: 58, y: 22, w: width - 82, h: height - 164 };
  const sR = { x: 58, y: height - 110, w: width - 82, h: 60 };

  const samples: number[] = [];
  for (let i = 0; i <= 240; i++) {
    const x = xMin + ((xMax - xMin) * i) / 240;
    samples.push(fVal(x, a, b, c, d));
  }
  let yMin = Math.min(...samples, fVal(x0, a, b, c, d));
  let yMax = Math.max(...samples, fVal(x0, a, b, c, d));
  if (Math.abs(yMax - yMin) < 1) {
    yMax += 1;
    yMin -= 1;
  }
  const pad = (yMax - yMin) * 0.18;
  yMax += pad;
  yMin -= pad;

  const sx = (x: number) => gR.x + ((x - xMin) / (xMax - xMin)) * gR.w;
  const sy = (y: number) => gR.y + gR.h - ((y - yMin) / (yMax - yMin)) * gR.h;

  ctx.fillStyle = T.plotBg;
  ctx.fillRect(gR.x, gR.y, gR.w, gR.h);

  ctx.strokeStyle = T.grid;
  ctx.lineWidth = 1;
  for (let tick = -4; tick <= 4; tick++) {
    const px = sx(tick);
    ctx.beginPath();
    ctx.moveTo(px, gR.y);
    ctx.lineTo(px, gR.y + gR.h);
    ctx.stroke();
  }
  for (let i = 0; i <= 6; i++) {
    const py = gR.y + (gR.h * i) / 6;
    ctx.beginPath();
    ctx.moveTo(gR.x, py);
    ctx.lineTo(gR.x + gR.w, py);
    ctx.stroke();
  }

  ctx.strokeStyle = T.axis;
  ctx.lineWidth = 1.2;
  if (xMin < 0 && xMax > 0) {
    const xA = sx(0);
    ctx.beginPath();
    ctx.moveTo(xA, gR.y);
    ctx.lineTo(xA, gR.y + gR.h);
    ctx.stroke();
  }
  if (yMin < 0 && yMax > 0) {
    const yA = sy(0);
    ctx.beginPath();
    ctx.moveTo(gR.x, yA);
    ctx.lineTo(gR.x + gR.w, yA);
    ctx.stroke();
  }

  ctx.fillStyle = T.muted;
  ctx.font = '12px "Public Sans", system-ui, sans-serif';
  ctx.textAlign = "center";
  for (let tick = -4; tick <= 4; tick++) {
    ctx.fillText(String(tick), sx(tick), gR.y + gR.h + 18);
  }

  /* f(x) curve */
  ctx.strokeStyle = T.curve;
  ctx.lineWidth = 3;
  ctx.beginPath();
  let started = false;
  for (let i = 0; i <= 240; i++) {
    const x = xMin + ((xMax - xMin) * i) / 240;
    const px = sx(x);
    const py = sy(fVal(x, a, b, c, d));
    if (py < gR.y - 40 || py > gR.y + gR.h + 40) {
      started = false;
      continue;
    }
    if (!started) {
      ctx.moveTo(px, py);
      started = true;
    } else {
      ctx.lineTo(px, py);
    }
  }
  ctx.stroke();

  /* tangent */
  const y0 = fVal(x0, a, b, c, d);
  const slope = fpVal(x0, a, b, c);
  ctx.strokeStyle = T.tangent;
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 4]);
  ctx.beginPath();
  ctx.moveTo(sx(xMin), sy(y0 + slope * (xMin - x0)));
  ctx.lineTo(sx(xMax), sy(y0 + slope * (xMax - x0)));
  ctx.stroke();
  ctx.setLineDash([]);

  const px0 = sx(x0);
  const py0 = sy(y0);
  ctx.fillStyle = T.tangentDot;
  ctx.beginPath();
  ctx.arc(px0, py0, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = T.tangentLabel;
  ctx.font = '12px "Public Sans", system-ui, sans-serif';
  ctx.textAlign = "left";
  ctx.fillText(`x\u2080=${fmt(x0)}`, px0 + 10, py0 - 10);

  /* critical points */
  roots.forEach((root) => {
    if (root < xMin || root > xMax) return;
    const rpx = sx(root);
    const rpy = sy(fVal(root, a, b, c, d));
    ctx.fillStyle = T.critDot;
    ctx.beginPath();
    ctx.arc(rpx, rpy, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = T.critLabel;
    ctx.font = '11px "Public Sans", system-ui, sans-serif';
    ctx.textAlign = "center";
    ctx.fillText(fmt(root), rpx, rpy - 10);
  });

  /* derivative sign strip */
  ctx.fillStyle = T.stripBg;
  ctx.fillRect(sR.x, sR.y, sR.w, sR.h);
  ctx.strokeStyle = T.stripBorder;
  ctx.lineWidth = 1;
  ctx.strokeRect(sR.x, sR.y, sR.w, sR.h);

  ctx.fillStyle = T.muted;
  ctx.font = '12px "Public Sans", system-ui, sans-serif';
  ctx.textAlign = "right";
  ctx.fillText("f\u2032(x)", sR.x - 8, sR.y + sR.h / 2 + 4);

  intervals.forEach((iv) => {
    const leftPx = iv.left <= xMin ? sR.x : sx(iv.left);
    const rightPx = iv.right >= xMax ? sR.x + sR.w : sx(iv.right);
    const cL = Math.max(leftPx, sR.x);
    const cR = Math.min(rightPx, sR.x + sR.w);
    if (cR <= cL) return;
    ctx.fillStyle =
      iv.sign > 0
        ? T.stripPosBg
        : iv.sign < 0
        ? T.stripNegBg
        : T.stripZeroBg;
    ctx.fillRect(cL, sR.y, cR - cL, sR.h);
    ctx.fillStyle = iv.sign > 0 ? T.stripPos : iv.sign < 0 ? T.stripNeg : T.stripZero;
    ctx.font = 'bold 18px "Public Sans", system-ui, sans-serif';
    ctx.textAlign = "center";
    ctx.fillText(
      iv.sign > 0 ? "+" : iv.sign < 0 ? "\u2212" : "0",
      (cL + cR) / 2,
      sR.y + sR.h / 2 + 7
    );
  });

  roots.forEach((root) => {
    if (root < xMin || root > xMax) return;
    const rpx = sx(root);
    ctx.strokeStyle = T.rootLine;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(rpx, sR.y);
    ctx.lineTo(rpx, sR.y + sR.h);
    ctx.stroke();
  });

  ctx.fillStyle = T.muted;
  ctx.font = '11px "Public Sans", system-ui, sans-serif';
  ctx.textAlign = "center";
  ctx.fillText(
    "Traka znakova f\u2032(x)",
    sR.x + sR.w / 2,
    sR.y + sR.h + 18
  );
}

/* ── Component ── */

export default function DerivativeApplicationLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [aVal, setA] = useState(1);
  const [bVal, setB] = useState(0);
  const [cVal, setC] = useState(-3);
  const [dVal, setD] = useState(1);
  const [x0Val, setX0] = useState(1);
  const [activePreset, setActivePreset] = useState("Dve ekstremne");

  const roots = solveFpRoots(aVal, bVal, cVal);
  const intervals = analyseIntervals(aVal, bVal, cVal, roots);
  const classifications = roots.map((r, i) =>
    classifyRoot(r, i, intervals, aVal, bVal, cVal, dVal)
  );

  const y0 = fVal(x0Val, aVal, bVal, cVal, dVal);
  const slope = fpVal(x0Val, aVal, bVal, cVal);

  const paint = useCallback(() => {
    if (!canvasRef.current) return;
    drawCanvas(
      canvasRef.current,
      aVal,
      bVal,
      cVal,
      dVal,
      x0Val,
      roots,
      intervals
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aVal, bVal, cVal, dVal, x0Val]);

  useEffect(() => {
    paint();
    const onResize = () => paint();
    window.addEventListener("resize", onResize);
    const observer = new MutationObserver(() => paint());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => { window.removeEventListener("resize", onResize); observer.disconnect(); };
  }, [paint]);

  const applyPreset = (p: Preset) => {
    setA(p.a);
    setB(p.b);
    setC(p.c);
    setD(p.d);
    setX0(p.x0);
    setActivePreset(p.label);
  };

  const handleSlider =
    (setter: (v: number) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(Number(e.target.value));
      setActivePreset("");
    };

  const critSummary =
    roots.length === 0
      ? "nema kriti\u010Dnih ta\u010Daka"
      : roots.map((r) => `x = ${fmt(r)}`).join(" i ");
  const critDetails =
    classifications.length === 0
      ? "izvod ne menja znak"
      : classifications
          .map((cl) => `${cl.type} u x = ${fmt(cl.x)}`)
          .join(", ");
  const monoSummary = intervals
    .map((iv) => iv.behavior)
    .join(", pa ");
  const monoDetails =
    "znak izvoda: " +
    intervals
      .map((iv) => (iv.sign > 0 ? "+" : iv.sign < 0 ? "\u2212" : "0"))
      .join(", zatim ");

  return (
    <div className={s.interactiveShell}>
      {/* Controls */}
      <div>
        <article className={s.interactiveCard} style={{ padding: 22 }}>
          <h3 className={cs.tCardTitle}>Kontrole</h3>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 16,
            }}
          >
            {PRESETS.map((p) => (
              <button
                key={p.label}
                className={s.presetBtn}
                style={
                  activePreset === p.label
                    ? {
                        background: "rgba(236,91,19,0.22)",
                        borderColor: "rgba(255,156,109,0.40)",
                      }
                    : undefined
                }
                onClick={() => applyPreset(p)}
              >
                {p.label}
              </button>
            ))}
          </div>

          {(
            [
              { label: "a", value: aVal, setter: setA, min: -2, max: 2, step: 0.25 },
              { label: "b", value: bVal, setter: setB, min: -4, max: 4, step: 0.25 },
              { label: "c", value: cVal, setter: setC, min: -6, max: 6, step: 0.25 },
              { label: "d", value: dVal, setter: setD, min: -6, max: 6, step: 0.5 },
              {
                label: "x\u2080",
                value: x0Val,
                setter: setX0,
                min: -3.5,
                max: 3.5,
                step: 0.25,
              },
            ] as const
          ).map(({ label, value, setter, min, max, step }) => (
            <div key={label} className={s.rangeWrap}>
              <label>{label}</label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 56px",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={value}
                  onChange={handleSlider(setter)}
                  style={{ accentColor: "var(--lesson-primary)" }}
                />
                <span
                  style={{
                    textAlign: "right",
                    padding: "6px 10px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "var(--lesson-accent)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {fmt(value)}
                </span>
              </div>
            </div>
          ))}

          <div
            style={{
              marginTop: 16,
              padding: "16px 18px",
              borderRadius: 18,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <strong style={{ color: "var(--lesson-muted-strong)" }}>
              Kako da koristiš laboratoriju
            </strong>
            <p style={{ color: "var(--lesson-muted)", marginTop: 8 }}>
              Prvo gledaj gde graf menja smer, pa tek onda proveri znakove u
              traci izvoda. Zatim pomeraj x&#x2080; i prati kako se menja nagib
              tangente.
            </p>
          </div>
        </article>
      </div>

      {/* Canvas + readouts */}
      <div>
        <div className={s.canvasWrap}>
          <canvas
            ref={canvasRef}
            className={s.polarCanvas}
            style={{ aspectRatio: "16/10" }}
            aria-label="Graf funkcije, tangenta i traka znakova izvoda"
          />
        </div>

        <div className={s.resultsGrid}>
          <div className={s.resultCard}>
            <strong>Aktuelna funkcija</strong>
            <p style={{ color: "var(--lesson-muted-strong)", fontWeight: 600 }}>
              {funcExpr(aVal, bVal, cVal, dVal)}
            </p>
            <p style={{ color: "var(--lesson-muted)", marginTop: 4 }}>
              {derivExprStr(aVal, bVal, cVal)}
            </p>
          </div>
          <div className={s.resultCard}>
            <strong>Kriti\u010Dne ta\u010Dke</strong>
            <p style={{ color: "var(--lesson-muted-strong)", fontWeight: 600 }}>
              {critSummary}
            </p>
            <p style={{ color: "var(--lesson-muted)", marginTop: 4 }}>
              {critDetails}
            </p>
          </div>
          <div className={s.resultCard}>
            <strong>Monotonost</strong>
            <p style={{ color: "var(--lesson-muted-strong)", fontWeight: 600 }}>
              {monoSummary}
            </p>
            <p style={{ color: "var(--lesson-muted)", marginTop: 4 }}>
              {monoDetails}
            </p>
          </div>
          <div className={s.resultCard}>
            <strong>Tangenta u ta\u010Dki x&#x2080;</strong>
            <p style={{ color: "var(--lesson-muted-strong)", fontWeight: 600 }}>
              {tangentExprStr(x0Val, y0, slope)}
            </p>
            <p style={{ color: "var(--lesson-muted)", marginTop: 4 }}>
              nagib tangente jednak je vrednosti izvoda u izabranoj ta\u010Dki
            </p>
          </div>
        </div>

        <p className={s.labNote}>
          Napomena: laboratorija pokriva i slu\u010Daj a=0, pa tada posmatraš
          kvadratnu ili linearnu funkciju. To je korisno jer ista logika znaka
          izvoda ostaje va\u017Ena, iako se tip funkcije menja.
        </p>
      </div>
    </div>
  );
}
