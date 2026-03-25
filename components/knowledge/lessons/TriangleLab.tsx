"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

type Mode = "cosine" | "ssa";

const TAU = Math.PI * 2;
const EPS = 1e-7;

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function toDeg(rad: number) {
  return (rad * 180) / Math.PI;
}

function fmt(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return "\u2014";
  return Number(value)
    .toFixed(digits)
    .replace(/\.00$/, "");
}

interface Point {
  x: number;
  y: number;
}

function fitPoints(
  points: Point[],
  width: number,
  height: number,
  padding = 56
): Point[] {
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const boxW = Math.max(maxX - minX, 1);
  const boxH = Math.max(maxY - minY, 1);
  const scale = Math.min(
    (width - 2 * padding) / boxW,
    (height - 2 * padding) / boxH
  );
  const ox = (width - boxW * scale) / 2 - minX * scale;
  const oy = (height - boxH * scale) / 2 - minY * scale;
  return points.map((p) => ({ x: p.x * scale + ox, y: p.y * scale + oy }));
}

function midpoint(a: Point, b: Point): Point {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

function vectorLength(v: Point) {
  return Math.hypot(v.x, v.y);
}

function angleBetween(v1: Point, v2: Point) {
  const dot = v1.x * v2.x + v1.y * v2.y;
  const denom = vectorLength(v1) * vectorLength(v2);
  return Math.acos(Math.min(1, Math.max(-1, dot / denom)));
}

/* ── Theme ── */

interface TriTheme {
  bg1: string;
  bg2: string;
  grid: string;
  text: string;
  textSoft: string;
  accent: string;
  lineDefault: string;
  polyFill: string;
  polyStroke: string;
  marker: string;
  height: string;
  heightDash: string;
  rightAngle: string;
  arcBlue: string;
  circleBlue: string;
  rayColor: string;
  error: string;
  ssaFill1: string;
  ssaFill2: string;
  ssaLine1: string;
  ssaLine2: string;
}

function getTriTheme(): TriTheme {
  const isLight = document.documentElement.classList.contains("light");
  return {
    bg1: isLight ? "rgba(245, 240, 235, 0.95)" : "rgba(32, 14, 8, 0.95)",
    bg2: isLight ? "rgba(235, 229, 223, 0.98)" : "rgba(10, 5, 3, 0.98)",
    grid: isLight ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.04)",
    text: isLight ? "#2a2420" : "#f6eee9",
    textSoft: isLight ? "#6e6058" : "#ffd8bb",
    accent: isLight ? "#c44200" : "#ffb488",
    lineDefault: isLight ? "#b8860b" : "#ffd37b",
    polyFill: isLight ? "rgba(217, 78, 10, 0.12)" : "rgba(236, 91, 19, 0.14)",
    polyStroke: isLight ? "#b8860b" : "#ffd37b",
    marker: isLight ? "#d94e0a" : "#ec5b13",
    height: isLight ? "rgba(26, 158, 110, 0.85)" : "rgba(121, 223, 184, 0.95)",
    heightDash: isLight ? "rgba(26, 158, 110, 0.85)" : "rgba(121, 223, 184, 0.95)",
    rightAngle: isLight ? "#1a9e6e" : "#79dfb8",
    arcBlue: isLight ? "#2878b8" : "#8fd7ff",
    circleBlue: isLight ? "rgba(40, 120, 184, 0.75)" : "rgba(143, 215, 255, 0.9)",
    rayColor: isLight ? "rgba(140, 100, 60, 0.6)" : "rgba(255, 216, 187, 0.8)",
    error: isLight ? "#c42020" : "#ff9b8f",
    ssaFill1: isLight ? "rgba(184, 134, 11, 0.12)" : "rgba(255, 211, 123, 0.14)",
    ssaFill2: isLight ? "rgba(40, 120, 184, 0.12)" : "rgba(143, 215, 255, 0.14)",
    ssaLine1: isLight ? "#b8860b" : "#ffd37b",
    ssaLine2: isLight ? "#2878b8" : "#8fd7ff",
  };
}

/* ── Drawing helpers ── */

function clearCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  T: TriTheme
) {
  ctx.clearRect(0, 0, width, height);
  const bg = ctx.createLinearGradient(0, 0, 0, height);
  bg.addColorStop(0, T.bg1);
  bg.addColorStop(1, T.bg2);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.strokeStyle = T.grid;
  ctx.lineWidth = 1;
  for (let x = 24; x < width; x += 28) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 24; y < height; y += 28) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawLine(
  ctx: CanvasRenderingContext2D,
  from: Point,
  to: Point,
  opts: { stroke?: string; lineWidth?: number; dash?: number[] } = {}
) {
  ctx.save();
  ctx.strokeStyle = opts.stroke || "#ffd37b";
  ctx.lineWidth = opts.lineWidth || 3;
  if (opts.dash) ctx.setLineDash(opts.dash);
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
  ctx.restore();
}

function polygon(
  ctx: CanvasRenderingContext2D,
  pts: Point[],
  opts: { fill?: string; stroke?: string; lineWidth?: number } = {}
) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
  ctx.closePath();
  if (opts.fill) {
    ctx.fillStyle = opts.fill;
    ctx.fill();
  }
  ctx.strokeStyle = opts.stroke || "#ffd37b";
  ctx.lineWidth = opts.lineWidth || 3;
  ctx.stroke();
  ctx.restore();
}

function pointMarker(
  ctx: CanvasRenderingContext2D,
  pt: Point,
  color = "#ec5b13",
  radius = 5
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(pt.x, pt.y, radius, 0, TAU);
  ctx.fill();
  ctx.restore();
}

function pointLabel(
  ctx: CanvasRenderingContext2D,
  pt: Point,
  label: string,
  color = "#f6eee9"
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.font = '700 15px "Public Sans", system-ui, sans-serif';
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.fillText(label, pt.x, pt.y - 10);
  ctx.restore();
}

function textLabel(
  ctx: CanvasRenderingContext2D,
  pt: Point,
  label: string,
  color = "#ffd8bb",
  align: CanvasTextAlign = "center"
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.font = '600 14px "Public Sans", system-ui, sans-serif';
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.fillText(label, pt.x, pt.y);
  ctx.restore();
}

function drawAngleArc(
  ctx: CanvasRenderingContext2D,
  center: Point,
  radius: number,
  startAngle: number,
  endAngle: number,
  color: string,
  label: string
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, startAngle, endAngle, endAngle < startAngle);
  ctx.stroke();
  const mid = (startAngle + endAngle) / 2;
  const lp = {
    x: center.x + Math.cos(mid) * (radius + 14),
    y: center.y + Math.sin(mid) * (radius + 14),
  };
  textLabel(ctx, lp, label, color);
  ctx.restore();
}

function drawRightAngle(
  ctx: CanvasRenderingContext2D,
  foot: Point,
  size = 16,
  color = "#79dfb8"
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(foot.x, foot.y);
  ctx.lineTo(foot.x, foot.y - size);
  ctx.lineTo(foot.x + size, foot.y - size);
  ctx.lineTo(foot.x + size, foot.y);
  ctx.stroke();
  ctx.restore();
}

function circleStroke(
  ctx: CanvasRenderingContext2D,
  center: Point,
  radius: number,
  opts: { stroke?: string; lineWidth?: number; dash?: number[] } = {}
) {
  ctx.save();
  ctx.strokeStyle = opts.stroke || "rgba(143, 215, 255, 0.9)";
  ctx.lineWidth = opts.lineWidth || 2;
  if (opts.dash) ctx.setLineDash(opts.dash);
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, TAU);
  ctx.stroke();
  ctx.restore();
}

/* ── Cosine state ── */

interface CosineParams {
  b: number;
  c: number;
  angleA: number;
}

function cosineCalc(p: CosineParams) {
  const rad = toRad(p.angleA);
  const a = Math.sqrt(p.b ** 2 + p.c ** 2 - 2 * p.b * p.c * Math.cos(rad));
  const area = 0.5 * p.b * p.c * Math.sin(rad);
  const hc = p.b * Math.sin(rad);
  return { a, area, hc, rad };
}

/* ── SSA state ── */

interface SsaParams {
  angleA: number;
  a: number;
  b: number;
}

interface SsaSolution {
  c: number;
  Bdeg: number;
  Cdeg: number;
}

function ssaCalc(p: SsaParams) {
  const rad = toRad(p.angleA);
  const h = p.b * Math.sin(rad);
  const xBase = p.b * Math.cos(rad);
  const disc = p.a ** 2 - h ** 2;
  const solutions: SsaSolution[] = [];

  if (disc >= -EPS) {
    const root = Math.sqrt(Math.max(0, disc));
    for (const cand of [xBase - root, xBase + root]) {
      if (
        cand > EPS &&
        !solutions.some((sol) => Math.abs(sol.c - cand) < 0.01)
      ) {
        const Bpoint = { x: cand, y: 0 };
        const Cpoint = { x: xBase, y: -h };
        const vBA = { x: -Bpoint.x, y: 0 };
        const vBC = { x: Cpoint.x - Bpoint.x, y: Cpoint.y - Bpoint.y };
        const Bdeg = toDeg(angleBetween(vBA, vBC));
        const Cdeg = 180 - p.angleA - Bdeg;
        solutions.push({ c: cand, Bdeg, Cdeg });
      }
    }
  }

  solutions.sort((l, r) => l.Bdeg - r.Bdeg);
  return { h, xBase, rad, solutions };
}

/* ── Component ── */

export default function TriangleLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<Mode>("cosine");

  // Cosine controls
  const [cosB, setCosB] = useState(9);
  const [cosC, setCosC] = useState(12);
  const [cosA, setCosA] = useState(60);

  // SSA controls
  const [ssaA, setSsaA] = useState(35);
  const [ssaSideA, setSsaSideA] = useState(8);
  const [ssaSideB, setSsaSideB] = useState(11);

  /* Side-panel state derived from current params */
  const cosState = cosineCalc({ b: cosB, c: cosC, angleA: cosA });
  const ssaState = ssaCalc({ angleA: ssaA, a: ssaSideA, b: ssaSideB });

  /* Canvas rendering */
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const TT = getTriTheme();

    const rect = wrap.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * ratio);
    canvas.height = Math.round(h * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    clearCanvas(ctx, w, h, TT);

    if (mode === "cosine") {
      const { a, hc, rad } = cosState;
      const bA: Point = { x: 0, y: 0 };
      const bB: Point = { x: cosC, y: 0 };
      const bC: Point = { x: cosB * Math.cos(rad), y: -cosB * Math.sin(rad) };
      const [A, B, C] = fitPoints([bA, bB, bC], w, h, 74);
      const foot = { x: C.x, y: A.y };

      polygon(ctx, [A, B, C], {
        fill: TT.polyFill,
        stroke: TT.polyStroke,
      });
      drawLine(ctx, C, foot, {
        stroke: TT.heightDash,
        lineWidth: 2.5,
        dash: [8, 6],
      });
      drawRightAngle(ctx, foot, 15, TT.rightAngle);
      drawAngleArc(ctx, A, 32, 0, -rad, TT.arcBlue, "A");

      pointMarker(ctx, A, TT.marker);
      pointMarker(ctx, B, TT.marker);
      pointMarker(ctx, C, TT.marker);
      pointLabel(ctx, A, "A", TT.text);
      pointLabel(ctx, B, "B", TT.text);
      pointLabel(ctx, C, "C", TT.text);

      textLabel(ctx, midpoint(B, C), `a = ${fmt(a)}`, TT.textSoft);
      textLabel(
        ctx,
        { x: (A.x + C.x) / 2 - 18, y: (A.y + C.y) / 2 },
        `b = ${fmt(cosB)}`,
        TT.arcBlue,
        "right"
      );
      textLabel(ctx, { x: (A.x + B.x) / 2, y: A.y + 18 }, `c = ${fmt(cosC)}`, TT.textSoft);
      textLabel(
        ctx,
        { x: foot.x + 22, y: (foot.y + C.y) / 2 },
        `h = ${fmt(hc)}`,
        TT.rightAngle,
        "left"
      );
    } else {
      const { rad, solutions } = ssaState;
      const hVal = ssaSideB * Math.sin(rad);
      const xBase = ssaSideB * Math.cos(rad);
      const maxC = solutions.length
        ? Math.max(...solutions.map((sol) => sol.c), ssaSideB, xBase)
        : Math.max(ssaSideA + xBase, ssaSideB, xBase + 2);
      const bA: Point = { x: 0, y: 0 };
      const bC: Point = { x: xBase, y: -hVal };
      const guideB: Point = { x: maxC * 1.08, y: 0 };
      const [A, C, rayEnd] = fitPoints([bA, bC, guideB], w, h, 70);
      const scale = (rayEnd.x - A.x) / Math.max(guideB.x, 1);
      const foot = { x: A.x + xBase * scale, y: A.y };
      const radius = ssaSideA * scale;

      drawLine(ctx, A, rayEnd, {
        stroke: TT.rayColor,
        lineWidth: 2.5,
      });
      drawLine(ctx, A, C, { stroke: TT.lineDefault });
      drawLine(ctx, C, foot, {
        stroke: TT.heightDash,
        lineWidth: 2.5,
        dash: [8, 6],
      });
      drawRightAngle(ctx, foot, 14, TT.rightAngle);
      circleStroke(ctx, C, radius, {
        stroke: TT.circleBlue,
        dash: [9, 7],
      });
      drawAngleArc(ctx, A, 30, 0, -rad, TT.arcBlue, "A");

      pointMarker(ctx, A, TT.marker);
      pointMarker(ctx, C, TT.marker);
      pointLabel(ctx, A, "A", TT.text);
      pointLabel(ctx, C, "C", TT.text);
      textLabel(
        ctx,
        { x: (A.x + C.x) / 2 - 10, y: (A.y + C.y) / 2 },
        `b = ${fmt(ssaSideB)}`,
        TT.textSoft,
        "right"
      );
      textLabel(
        ctx,
        { x: foot.x + 22, y: (foot.y + C.y) / 2 },
        `h = ${fmt(hVal)}`,
        TT.rightAngle,
        "left"
      );
      textLabel(
        ctx,
        { x: C.x + radius * 0.54, y: C.y - radius * 0.54 },
        `a = ${fmt(ssaSideA)}`,
        TT.arcBlue,
        "left"
      );

      const colors = [TT.ssaLine1, TT.ssaLine2];
      solutions.forEach((sol, i) => {
        const B: Point = { x: A.x + sol.c * scale, y: A.y };
        polygon(ctx, [A, B, C], {
          fill: i === 0 ? TT.ssaFill1 : TT.ssaFill2,
          stroke: colors[i],
        });
        pointMarker(ctx, B, colors[i]);
        pointLabel(
          ctx,
          B,
          `B${solutions.length > 1 ? i + 1 : ""}`,
          colors[i]
        );
        textLabel(
          ctx,
          { x: (A.x + B.x) / 2, y: A.y + 18 + i * 18 },
          `c${solutions.length > 1 ? i + 1 : ""} = ${fmt(sol.c)}`,
          colors[i]
        );
      });

      if (!solutions.length) {
        ctx.save();
        ctx.fillStyle = TT.error;
        ctx.font = '700 18px "Public Sans", system-ui, sans-serif';
        ctx.textAlign = "center";
        ctx.fillText(
          "Kružnica ne seče osnovnu polupravu: trougao ne postoji.",
          w / 2,
          h - 34
        );
        ctx.restore();
      }
    }
  }, [mode, cosB, cosC, cosA, ssaA, ssaSideA, ssaSideB, cosState, ssaState]);

  useEffect(() => {
    draw();
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    const observer = new MutationObserver(() => draw());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => { window.removeEventListener("resize", onResize); observer.disconnect(); };
  }, [draw]);

  /* Side-panel content */
  let focusLabel: string;
  let summaryText: string;
  let primary: string;
  let primaryText: string;
  let secondary: string;
  let secondaryText: string;
  let tertiary: string;
  let tertiaryText: string;
  let quaternary: string;
  let quaternaryText: string;
  let caption: string;

  if (mode === "cosine") {
    const angleLabel =
      cosA < 90 ? "oštar" : cosA === 90 ? "prav" : "tup";
    focusLabel = "Kosinusna teorema";
    summaryText =
      "Zadate su stranice b i c i zahvaćeni ugao A. Trougao je zato jednoznačno određen.";
    primary = `a \u2248 ${fmt(cosState.a)}`;
    primaryText = "Treća stranica se dobija iz a\u00B2 = b\u00B2 + c\u00B2 \u2212 2bc cos A.";
    secondary = `P \u2248 ${fmt(cosState.area)}`;
    secondaryText =
      "Površina se dobija najkraćim putem iz P = 1/2 \u00B7 b \u00B7 c \u00B7 sin A.";
    tertiary = `h\u2099 \u2248 ${fmt(cosState.hc)}`;
    tertiaryText =
      "Visina na stranicu c jednaka je b sin A i pokazuje poreklo formule za površinu.";
    quaternary = `Ugao A je ${angleLabel}`;
    quaternaryText =
      cosA === 90
        ? "Ovde se kosinusna teorema svodi na Pitagorinu."
        : cosA < 90
        ? "Pošto je A oštar, korekcioni član oduzima pozitivan broj."
        : "Pošto je A tup, kosinus je negativan i treća stranica postaje duža.";
    caption =
      "Posmatraj kako se sa porastom ugla A menja dužina stranice a i visina na stranicu c.";
  } else {
    const sols = ssaState.solutions;
    let statusText: string;
    if (sols.length === 0) {
      statusText =
        "Pošto je a kraća od visine h, trougao ne može da se zatvori.";
    } else if (sols.length === 1) {
      statusText =
        "Kružnica seče osnovu u jednoj relevantnoj tački, pa je rešenje jedinstveno.";
    } else {
      statusText =
        "Kružnica seče osnovu u dve tačke, pa ista tri podatka daju dva različita trougla.";
    }
    focusLabel = "Sinusna teorema / SSA";
    summaryText =
      "Dati su ugao A, njemu naspramna stranica a i još jedna stranica b. Broj preseka određuje broj trouglova.";
    primary = `${sols.length} moguća trougla`;
    primaryText = statusText;
    secondary = `h = ${fmt(ssaState.h)}`;
    secondaryText =
      "Visina h = b sin A je ključna veličina za proveru dvosmislenog slučaja.";
    if (sols.length >= 1) {
      const f = sols[0];
      tertiary = `B\u2081 \u2248 ${fmt(f.Bdeg)}\u00B0, C\u2081 \u2248 ${fmt(f.Cdeg)}\u00B0, c\u2081 \u2248 ${fmt(f.c)}`;
      tertiaryText =
        "Prvo rešenje dolazi iz prvog preseka kružnice i osnovne poluprave.";
    } else {
      tertiary = "Nema validnog preseka";
      tertiaryText =
        "U ovom rasporedu stranica a je prekratka da bi zatvorila trougao.";
    }
    if (sols.length >= 2) {
      const sc = sols[1];
      quaternary = `B\u2082 \u2248 ${fmt(sc.Bdeg)}\u00B0, C\u2082 \u2248 ${fmt(sc.Cdeg)}\u00B0, c\u2082 \u2248 ${fmt(sc.c)}`;
      quaternaryText =
        "Drugo rešenje je druga geometrijska konfiguracija sa istim početnim podacima.";
    } else if (sols.length === 1) {
      quaternary = "Jedinstveno rešenje";
      quaternaryText =
        "SSA ne daje uvek dva trougla. Nekad postoji samo jedan, a nekad nijedan.";
    } else {
      quaternary = "Uslov neuspeha";
      quaternaryText =
        "Ako je a < h = b sin A, kružnica ne doseže osnovu i trougao ne postoji.";
    }
    caption =
      "Prati kako se broj preseka kružnice i osnovne poluprave menja sa vrednostima a, b i ugla A.";
  }

  return (
    <>
      <div className={s.interactiveShell}>
        {/* Left: controls + canvas */}
        <div className={s.interactiveCard}>
          <h3 className={cs.tCardTitle}>Canvas laboratorija trougla</h3>
          <p>
            Koristi kontrole i poredi sliku sa objašnjenjem desno. Laboratorija
            nije dekoracija: ona vizuelno pokazuje zašto formule rade.
          </p>

          <div className={s.controlGrid}>
            <div className={s.field}>
              <label>Režim</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as Mode)}
              >
                <option value="cosine">Kosinusna teorema</option>
                <option value="ssa">Sinusna teorema / SSA</option>
              </select>
            </div>

            {mode === "cosine" && (
              <>
                <div className={s.field}>
                  <label>
                    Stranica b{" "}
                    <span style={{ color: "var(--lesson-primary-soft)", fontWeight: 800 }}>
                      {fmt(cosB, 1)}
                    </span>
                  </label>
                  <input
                    type="range"
                    min={5}
                    max={16}
                    step={0.5}
                    value={cosB}
                    onChange={(e) => setCosB(Number(e.target.value))}
                  />
                </div>
                <div className={s.field}>
                  <label>
                    Stranica c{" "}
                    <span style={{ color: "var(--lesson-primary-soft)", fontWeight: 800 }}>
                      {fmt(cosC, 1)}
                    </span>
                  </label>
                  <input
                    type="range"
                    min={5}
                    max={16}
                    step={0.5}
                    value={cosC}
                    onChange={(e) => setCosC(Number(e.target.value))}
                  />
                </div>
                <div className={s.field}>
                  <label>
                    Ugao A{" "}
                    <span style={{ color: "var(--lesson-primary-soft)", fontWeight: 800 }}>
                      {fmt(cosA, 0)}&deg;
                    </span>
                  </label>
                  <input
                    type="range"
                    min={20}
                    max={145}
                    step={1}
                    value={cosA}
                    onChange={(e) => setCosA(Number(e.target.value))}
                  />
                </div>
              </>
            )}

            {mode === "ssa" && (
              <>
                <div className={s.field}>
                  <label>
                    Ugao A{" "}
                    <span style={{ color: "var(--lesson-primary-soft)", fontWeight: 800 }}>
                      {fmt(ssaA, 0)}&deg;
                    </span>
                  </label>
                  <input
                    type="range"
                    min={20}
                    max={80}
                    step={1}
                    value={ssaA}
                    onChange={(e) => setSsaA(Number(e.target.value))}
                  />
                </div>
                <div className={s.field}>
                  <label>
                    Stranica a{" "}
                    <span style={{ color: "var(--lesson-primary-soft)", fontWeight: 800 }}>
                      {fmt(ssaSideA, 1)}
                    </span>
                  </label>
                  <input
                    type="range"
                    min={4}
                    max={16}
                    step={0.5}
                    value={ssaSideA}
                    onChange={(e) => setSsaSideA(Number(e.target.value))}
                  />
                </div>
                <div className={s.field}>
                  <label>
                    Stranica b{" "}
                    <span style={{ color: "var(--lesson-primary-soft)", fontWeight: 800 }}>
                      {fmt(ssaSideB, 1)}
                    </span>
                  </label>
                  <input
                    type="range"
                    min={4}
                    max={16}
                    step={0.5}
                    value={ssaSideB}
                    onChange={(e) => setSsaSideB(Number(e.target.value))}
                  />
                </div>
              </>
            )}
          </div>

          <p style={{ marginTop: 12, color: "var(--lesson-muted)", fontSize: "0.95rem" }}>
            {mode === "cosine"
              ? "U ovom režimu vidiš kako ugao između dve stranice menja treću stranicu i površinu."
              : "U SSA režimu ugao A je namerno ograničen na oštre uglove, jer se upravo tada najjasnije vidi dvosmisleni slučaj."}
          </p>

          <div className={s.canvasWrap} ref={wrapRef}>
            <canvas
              ref={canvasRef}
              className={s.polarCanvas}
              aria-label="Interaktivna laboratorija za sinusnu i kosinusnu teoremu"
            />
          </div>

          <p style={{ marginTop: 14, color: "var(--lesson-muted)", fontSize: "0.95rem" }}>
            {caption}
          </p>
        </div>

        {/* Right: readout cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <article className={s.resultCard}>
            <strong>Fokus laboratorije</strong>
            <p style={{ fontWeight: 700, color: "var(--lesson-text)" }}>
              {focusLabel}
            </p>
            <p>{summaryText}</p>
          </article>
          <article className={s.resultCard}>
            <strong>Glavni rezultat</strong>
            <p style={{ fontWeight: 700, color: "var(--lesson-text)" }}>
              {primary}
            </p>
            <p>{primaryText}</p>
          </article>
          <article className={s.resultCard}>
            <strong>Drugi korak</strong>
            <p style={{ fontWeight: 700, color: "var(--lesson-text)" }}>
              {secondary}
            </p>
            <p>{secondaryText}</p>
          </article>
          <article className={s.resultCard}>
            <strong>Tumačenje</strong>
            <p style={{ fontWeight: 700, color: "var(--lesson-text)" }}>
              {tertiary}
            </p>
            <p>{tertiaryText}</p>
          </article>
          <article className={s.resultCard}>
            <strong>Napomena</strong>
            <p style={{ fontWeight: 700, color: "var(--lesson-text)" }}>
              {quaternary}
            </p>
            <p>{quaternaryText}</p>
          </article>
        </div>
      </div>

      <MicroCheckInline
        question="Kako da čitaš SSA laboratoriju?"
        answer="Duž b i ugao A određuju položaj tačke C. Oko tačke C se crta kružnica poluprečnika a. Broj preseka te kružnice sa osnovnom polupravom daje broj mogućih trouglova."
      />
    </>
  );
}

/* Tiny inline micro-check for use inside this file only */
function MicroCheckInline({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className={s.microCheck} style={{ marginTop: 18 }}>
      <summary className={s.detailsSummary}>{question}</summary>
      <div className={s.detailsBody}>
        <p>{answer}</p>
      </div>
    </details>
  );
}
