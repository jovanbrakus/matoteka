"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { MathJax } from "better-react-mathjax";
import LessonShell from "@/components/knowledge/LessonShell";
import LessonHero from "@/components/knowledge/LessonHero";
import LessonNav from "@/components/knowledge/LessonNav";
import LessonSection from "@/components/knowledge/LessonSection";
import MathBlock from "@/components/knowledge/MathBlock";
import InlineMath from "@/components/knowledge/InlineMath";
import WalkStep from "@/components/knowledge/WalkStep";
import ExerciseCard from "@/components/knowledge/ExerciseCard";
import InsightCard from "@/components/knowledge/InsightCard";
import FormulaCard from "@/components/knowledge/FormulaCard";
import MicroCheck from "@/components/knowledge/MicroCheck";
import SectionCard from "@/components/knowledge/SectionCard";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

/* ───────────────────────── NAV ───────────────────────── */

const NAV_LINKS = [
  { href: "#vaznost", label: "Zašto je važno" },
  { href: "#osnove", label: "Osnovna ideja" },
  { href: "#metode", label: "Kako biraš metodu" },
  { href: "#interaktivno", label: "Interaktivni deo" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#formule", label: "Ključne formule" },
  { href: "#zamke", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

/* ───────────────────────── FACTOR LAB ───────────────────────── */

type LabMode = "square" | "difference" | "grouping";

interface LabState {
  mode: LabMode;
  a: number;
  b: number;
  showLabels: boolean;
}

const PRESETS: Record<string, LabState> = {
  square: { mode: "square", a: 2, b: 3, showLabels: true },
  difference: { mode: "difference", a: 5, b: 3, showLabels: true },
  grouping: { mode: "grouping", a: 2, b: 3, showLabels: true },
  exam: { mode: "difference", a: 4, b: 1, showLabels: true },
};

function clampInt(value: string, fallback: number, min: number, max: number) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

interface FactorTheme {
  bg: string;
  grid: string;
  stroke: string;
  sqFill: string;
  abFill: string;
  resultFill: string;
  cutoutFill: string;
  boxGroupBg: string;
  boxGroupStroke: string;
  textDefault: string;
  labelAccent: string;     // #ffd7b9 equiv
  labelSq: string;         // #ffe5d6 equiv
  labelAb: string;         // #caecff equiv
  labelResult: string;     // #dffbea equiv
  labelCutout: string;     // #ffb9b3 equiv
  labelContent: string;    // #ffeadd equiv
  labelMuted: string;      // #c8b5a8 equiv
  arrowColor: string;
}

function getFactorTheme(): FactorTheme {
  const isLight = document.documentElement.classList.contains("light");
  return {
    bg: isLight ? "rgba(245, 240, 235, 0.95)" : "rgba(8, 4, 2, 0.95)",
    grid: isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.05)",
    stroke: isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.14)",
    sqFill: isLight ? "rgba(217, 78, 10, 0.15)" : "rgba(236, 91, 19, 0.22)",
    abFill: isLight ? "rgba(40, 120, 184, 0.12)" : "rgba(136, 216, 255, 0.16)",
    resultFill: isLight ? "rgba(26, 158, 110, 0.12)" : "rgba(107, 223, 183, 0.16)",
    cutoutFill: isLight ? "rgba(245, 240, 235, 0.96)" : "rgba(12, 7, 5, 0.96)",
    boxGroupBg: isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.05)",
    boxGroupStroke: isLight ? "rgba(0,0,0,0.10)" : "rgba(255,255,255,0.12)",
    textDefault: isLight ? "rgba(0,0,0,0.72)" : "rgba(255,255,255,0.85)",
    labelAccent: isLight ? "#a06030" : "#ffd7b9",
    labelSq: isLight ? "#8b4513" : "#ffe5d6",
    labelAb: isLight ? "#2060a0" : "#caecff",
    labelResult: isLight ? "#1a7050" : "#dffbea",
    labelCutout: isLight ? "#b03020" : "#ffb9b3",
    labelContent: isLight ? "#6e4020" : "#ffeadd",
    labelMuted: isLight ? "#7a6f68" : "#c8b5a8",
    arrowColor: isLight ? "#a06030" : "#ffd7b9",
  };
}

function drawLabel(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color = "rgba(255,255,255,0.85)",
  size = 14
) {
  ctx.fillStyle = color;
  ctx.font = `700 ${size}px "Inter", sans-serif`;
  ctx.fillText(text, x, y);
}

function renderSquare(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  st: LabState,
  T: FactorTheme
) {
  const margin = 56;
  const total = st.a + st.b;
  const unit = Math.min(
    (width - 2 * margin) / (total + 3.2),
    (height - 2 * margin) / total
  );
  const x0 = margin;
  const y0 = 88;
  const aSize = st.a * unit;
  const bSize = st.b * unit;

  ctx.strokeStyle = T.stroke;
  ctx.lineWidth = 1.4;

  ctx.fillStyle = T.sqFill;
  ctx.fillRect(x0, y0, aSize, aSize);
  ctx.strokeRect(x0, y0, aSize, aSize);

  ctx.fillStyle = T.abFill;
  ctx.fillRect(x0 + aSize, y0, bSize, aSize);
  ctx.strokeRect(x0 + aSize, y0, bSize, aSize);
  ctx.fillRect(x0, y0 + aSize, aSize, bSize);
  ctx.strokeRect(x0, y0 + aSize, aSize, bSize);

  ctx.fillStyle = T.resultFill;
  ctx.fillRect(x0 + aSize, y0 + aSize, bSize, bSize);
  ctx.strokeRect(x0 + aSize, y0 + aSize, bSize, bSize);

  if (st.showLabels) {
    drawLabel(
      ctx,
      `${st.a * st.a}x²`,
      x0 + aSize * 0.34,
      y0 + aSize * 0.52,
      T.labelSq,
      18
    );
    drawLabel(
      ctx,
      `${st.a * st.b}x`,
      x0 + aSize + bSize * 0.18,
      y0 + aSize * 0.52,
      T.labelAb,
      18
    );
    drawLabel(
      ctx,
      `${st.a * st.b}x`,
      x0 + aSize * 0.34,
      y0 + aSize + bSize * 0.58,
      T.labelAb,
      18
    );
    drawLabel(
      ctx,
      `${st.b * st.b}`,
      x0 + aSize + bSize * 0.22,
      y0 + aSize + bSize * 0.58,
      T.labelResult,
      18
    );
    drawLabel(
      ctx,
      `${st.a}x`,
      x0 + aSize * 0.42,
      y0 - 16,
      T.labelAccent,
      15
    );
    drawLabel(
      ctx,
      `${st.b}`,
      x0 + aSize + bSize * 0.35,
      y0 - 16,
      T.labelAccent,
      15
    );
    drawLabel(ctx, `${st.a}x`, x0 - 36, y0 + aSize * 0.55, T.labelAccent, 15);
    drawLabel(
      ctx,
      `${st.b}`,
      x0 - 28,
      y0 + aSize + bSize * 0.55,
      T.labelAccent,
      15
    );
  }

  drawLabel(
    ctx,
    "Kvadrat sa stranicom ax + b",
    x0,
    42,
    T.labelAccent,
    17
  );
  drawLabel(
    ctx,
    "\u2192 zbir \u010Detiri dela daje kvadrat binoma",
    x0,
    y0 + aSize + bSize + 40,
    T.labelMuted,
    14
  );
}

function renderDifference(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  st: LabState,
  T: FactorTheme
) {
  const compact = width < 720;
  const margin = 40;
  const unit = compact
    ? Math.min((width * 0.56) / st.a, (height * 0.32) / st.a)
    : Math.min((width * 0.26) / st.a, (height * 0.42) / st.a);
  const big = st.a * unit;
  const small = st.b * unit;

  ctx.strokeStyle = T.stroke;
  ctx.lineWidth = 1.4;

  if (compact) {
    const leftX = (width - big) / 2;
    const topY = 70;

    ctx.fillStyle = T.sqFill;
    ctx.fillRect(leftX, topY, big, big);
    ctx.strokeRect(leftX, topY, big, big);
    ctx.fillStyle = T.cutoutFill;
    ctx.fillRect(leftX + big - small, topY, small, small);
    ctx.strokeRect(leftX + big - small, topY, small, small);

    if (st.showLabels) {
      drawLabel(
        ctx,
        `${st.a * st.a}x\u00B2`,
        leftX + big * 0.24,
        topY + big * 0.55,
        T.labelSq,
        Math.max(12, unit * 0.34)
      );
      drawLabel(
        ctx,
        `${st.b * st.b}`,
        leftX + big - small * 0.75,
        topY + small * 0.58,
        T.labelCutout,
        Math.max(11, unit * 0.28)
      );
    }

    drawLabel(ctx, "\u2193", width / 2 - 8, topY + big + 42, T.arrowColor, 28);

    const rectW = (st.a + st.b) * unit;
    const rectH = Math.max(st.a - st.b, 1) * unit;
    const rectX = (width - rectW) / 2;
    const rectY = topY + big + 78;
    ctx.fillStyle = T.resultFill;
    ctx.fillRect(rectX, rectY, rectW, rectH);
    ctx.strokeRect(rectX, rectY, rectW, rectH);

    if (st.showLabels) {
      drawLabel(
        ctx,
        `(${st.a}x + ${st.b})`,
        rectX + rectW * 0.18,
        rectY - 12,
        T.labelResult,
        Math.max(11, unit * 0.24)
      );
      drawLabel(
        ctx,
        `(${st.a}x - ${st.b})`,
        rectX + 4,
        rectY + rectH / 2 + 6,
        T.labelResult,
        Math.max(11, unit * 0.24)
      );
    }

    drawLabel(
      ctx,
      "Veliki kvadrat minus mali kvadrat",
      margin,
      34,
      T.labelAccent,
      15
    );
    return;
  }

  const leftX = margin;
  const topY = 88;

  ctx.fillStyle = T.sqFill;
  ctx.fillRect(leftX, topY, big, big);
  ctx.strokeRect(leftX, topY, big, big);
  ctx.fillStyle = T.cutoutFill;
  ctx.fillRect(leftX + big - small, topY, small, small);
  ctx.strokeRect(leftX + big - small, topY, small, small);

  if (st.showLabels) {
    drawLabel(
      ctx,
      `${st.a * st.a}x\u00B2`,
      leftX + big * 0.28,
      topY + big * 0.55,
      T.labelSq,
      18
    );
    drawLabel(
      ctx,
      `${st.b * st.b}`,
      leftX + big - small * 0.7,
      topY + small * 0.58,
      T.labelCutout,
      16
    );
    drawLabel(
      ctx,
      `${st.a}x`,
      leftX + big * 0.42,
      topY - 16,
      T.labelAccent,
      15
    );
    drawLabel(
      ctx,
      `${st.a}x`,
      leftX - 36,
      topY + big * 0.55,
      T.labelAccent,
      15
    );
    drawLabel(
      ctx,
      `${st.b}`,
      leftX + big - small * 0.45,
      topY - 16,
      T.labelCutout,
      15
    );
  }

  const arrowX = leftX + big + 52;
  drawLabel(ctx, "\u2192", arrowX, topY + big * 0.52, T.arrowColor, 34);

  const rectX = arrowX + 56;
  const rectW = (st.a + st.b) * unit;
  const rectH = Math.max(st.a - st.b, 1) * unit;
  ctx.fillStyle = T.resultFill;
  ctx.fillRect(rectX, topY + (big - rectH) / 2, rectW, rectH);
  ctx.strokeRect(rectX, topY + (big - rectH) / 2, rectW, rectH);

  if (st.showLabels) {
    drawLabel(
      ctx,
      `(${st.a}x + ${st.b})`,
      rectX + rectW * 0.23,
      topY + (big - rectH) / 2 - 14,
      T.labelResult,
      14
    );
    drawLabel(
      ctx,
      `(${st.a}x - ${st.b})`,
      rectX - 8,
      topY + (big + rectH) / 2,
      T.labelResult,
      14
    );
  }

  drawLabel(
    ctx,
    "Veliki kvadrat minus mali kvadrat",
    leftX,
    42,
    T.labelAccent,
    17
  );
  drawLabel(
    ctx,
    "\u2192 rezultat se mo\u017Ee zapisati kao proizvod dva binoma",
    leftX,
    topY + big + 40,
    T.labelMuted,
    14
  );
}

function renderGrouping(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  st: LabState,
  T: FactorTheme
) {
  const compact = width < 760;

  if (compact) {
    const startX = 24;
    const startY = 70;
    const boxW = (width - 3 * startX) / 2;
    const boxH = Math.min(64, height * 0.13);
    const gap = 12;

    const labels = [`${st.a}x`, `${st.a}y`, `${st.b}x`, `${st.b}y`];
    const boxColors = [T.sqFill, T.sqFill, T.abFill, T.abFill];

    labels.forEach((label, index) => {
      const row = index < 2 ? 0 : 1;
      const col = index % 2;
      const x = startX + col * (boxW + gap);
      const y = startY + row * (boxH + gap);
      ctx.fillStyle = boxColors[index];
      ctx.fillRect(x, y, boxW, boxH);
      ctx.strokeStyle = T.boxGroupStroke;
      ctx.strokeRect(x, y, boxW, boxH);
      drawLabel(
        ctx,
        label,
        x + boxW * 0.28,
        y + boxH * 0.58,
        T.labelContent,
        Math.max(15, boxH * 0.36)
      );
    });

    drawLabel(
      ctx,
      "\u2193",
      width / 2 - 8,
      startY + 2 * (boxH + gap) + 10,
      T.arrowColor,
      26
    );

    const midW = Math.min(width * 0.62, 220);
    const midH = 58;
    const midX = (width - midW) / 2;
    const midY = startY + 2 * (boxH + gap) + 38;

    ctx.fillStyle = T.boxGroupBg;
    ctx.fillRect(midX, midY, midW, midH);
    ctx.strokeStyle = T.boxGroupStroke;
    ctx.strokeRect(midX, midY, midW, midH);
    ctx.fillRect(midX, midY + midH + 14, midW, midH);
    ctx.strokeRect(midX, midY + midH + 14, midW, midH);
    drawLabel(
      ctx,
      `${st.a}(x+y)`,
      midX + midW * 0.22,
      midY + midH * 0.58,
      T.labelContent,
      18
    );
    drawLabel(
      ctx,
      `${st.b}(x+y)`,
      midX + midW * 0.22,
      midY + midH + 14 + midH * 0.58,
      T.labelAb,
      18
    );

    drawLabel(
      ctx,
      "\u2193",
      width / 2 - 8,
      midY + 2 * midH + 54,
      T.arrowColor,
      26
    );

    const finalW = Math.min(width * 0.68, 240);
    const finalH = 72;
    const finalX = (width - finalW) / 2;
    const finalY = midY + 2 * midH + 84;
    ctx.fillStyle = T.resultFill;
    ctx.fillRect(finalX, finalY, finalW, finalH);
    ctx.strokeStyle = T.boxGroupStroke;
    ctx.strokeRect(finalX, finalY, finalW, finalH);
    drawLabel(
      ctx,
      `(${st.a + st.b})(x+y)`,
      finalX + finalW * 0.15,
      finalY + finalH * 0.58,
      T.labelResult,
      18
    );

    drawLabel(
      ctx,
      "Na uskom ekranu grupisanje ide korak po korak nadole",
      startX,
      34,
      T.labelAccent,
      14
    );
    return;
  }

  const startX = 56;
  const startY = 120;
  const boxW = 140;
  const boxH = 78;
  const gap = 18;

  const labels = [`${st.a}x`, `${st.a}y`, `${st.b}x`, `${st.b}y`];
  const boxColors = [T.sqFill, T.sqFill, T.abFill, T.abFill];

  labels.forEach((label, index) => {
    const row = index < 2 ? 0 : 1;
    const col = index % 2;
    const x = startX + col * (boxW + gap);
    const y = startY + row * (boxH + gap);
    ctx.fillStyle = boxColors[index];
    ctx.fillRect(x, y, boxW, boxH);
    ctx.strokeStyle = T.boxGroupStroke;
    ctx.strokeRect(x, y, boxW, boxH);
    drawLabel(ctx, label, x + 42, y + 46, T.labelContent, 22);
  });

  if (st.showLabels) {
    drawLabel(
      ctx,
      `(${st.a}x + ${st.a}y)`,
      startX + 26,
      startY - 18,
      T.labelAccent,
      14
    );
    drawLabel(
      ctx,
      `(${st.b}x + ${st.b}y)`,
      startX + 26,
      startY + boxH + gap - 18,
      T.labelAb,
      14
    );
  }

  drawLabel(
    ctx,
    "\u2192",
    startX + 2 * (boxW + gap) + 36,
    startY + 88,
    T.arrowColor,
    34
  );

  const fx = startX + 2 * (boxW + gap) + 94;
  const fy = startY + 8;
  ctx.fillStyle = T.boxGroupBg;
  ctx.fillRect(fx, fy, 210, 80);
  ctx.strokeStyle = T.boxGroupStroke;
  ctx.strokeRect(fx, fy, 210, 80);
  ctx.fillRect(fx, fy + 100, 210, 80);
  ctx.strokeRect(fx, fy + 100, 210, 80);
  drawLabel(ctx, `${st.a}(x+y)`, fx + 50, fy + 48, T.labelContent, 22);
  drawLabel(ctx, `${st.b}(x+y)`, fx + 50, fy + 148, T.labelAb, 22);

  drawLabel(ctx, "\u2192", fx + 236, startY + 88, T.arrowColor, 34);

  ctx.fillStyle = T.resultFill;
  ctx.fillRect(fx + 292, startY + 56, 200, 100);
  ctx.strokeStyle = T.boxGroupStroke;
  ctx.strokeRect(fx + 292, startY + 56, 200, 100);
  drawLabel(
    ctx,
    `(${st.a + st.b})(x+y)`,
    fx + 325,
    startY + 114,
    T.labelResult,
    21
  );

  drawLabel(
    ctx,
    "Grupi\u0161i tako da isti binom ispadne u obe grupe",
    startX,
    48,
    T.labelAccent,
    17
  );
}

function FactorLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<LabState>({
    mode: "square",
    a: 2,
    b: 3,
    showLabels: true,
  });

  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const T = getFactorTheme();

    const dpr = window.devicePixelRatio || 1;
    const width = Math.max(320, canvas.clientWidth || 640);
    const ratio = state.mode === "grouping" ? 0.82 : 0.68;
    const minHeight = state.mode === "grouping" ? 340 : 280;
    const height = Math.max(minHeight, Math.round(width * ratio));
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = T.bg;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = T.grid;
    ctx.lineWidth = 1;
    for (let x = 28; x < width; x += 38) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 28; y < height; y += 38) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    if (state.mode === "square") {
      renderSquare(ctx, width, height, state, T);
    } else if (state.mode === "difference") {
      renderDifference(ctx, width, height, state, T);
    } else {
      renderGrouping(ctx, width, height, state, T);
    }
  }, [state]);

  useEffect(() => {
    renderCanvas();
    const handleResize = () => renderCanvas();
    window.addEventListener("resize", handleResize);
    const observer = new MutationObserver(() => renderCanvas());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => { window.removeEventListener("resize", handleResize); observer.disconnect(); };
  }, [renderCanvas]);

  /* ---- derived summaries ---- */
  let expressionLatex: string;
  let factorLatex: string;
  let recognitionText: string;
  let conceptText: string;
  let formulaLatex: string;
  let hintText: string;

  if (state.mode === "square") {
    const aa = state.a * state.a;
    const ab2 = 2 * state.a * state.b;
    const bb = state.b * state.b;
    expressionLatex = `${aa}x^2 + ${ab2}x + ${bb}`;
    factorLatex = `(${state.a}x+${state.b})^2`;
    recognitionText =
      "Tri člana, savršeni kvadrati na krajevima i srednji član jednak dvostrukom proizvodu.";
    conceptText =
      "Veliki kvadrat se sastoji od jednog kvadrata, dva ista pravougaonika i malog kvadrata.";
    formulaLatex = `(${state.a}x+${state.b})^2 = (${state.a}x)^2 + 2\\cdot (${state.a}x)\\cdot ${state.b} + ${state.b}^2 = ${expressionLatex}`;
    hintText =
      "Ako bi srednji član bio negativan, dobio bi kvadrat razlike: (ax−b)².";
  } else if (state.mode === "difference") {
    const aa = state.a * state.a;
    const bb = state.b * state.b;
    expressionLatex = `${aa}x^2 - ${bb}`;
    factorLatex = `(${state.a}x-${state.b})(${state.a}x+${state.b})`;
    recognitionText =
      "Dva člana, oba su savršeni kvadrati i između njih stoji minus.";
    conceptText =
      "Razlika površina dva kvadrata može da se preuredi u pravougaonik čije su stranice zbir i razlika.";
    formulaLatex = `${expressionLatex} = (${state.a}x)^2 - ${state.b}^2 = (${state.a}x-${state.b})(${state.a}x+${state.b})`;
    hintText =
      "Razlika kvadrata radi samo sa minusom. Zbir kvadrata a²+b² ne prati ovu formulu.";
  } else {
    expressionLatex = `${state.a}x+${state.a}y+${state.b}x+${state.b}y`;
    factorLatex = `${state.a}(x+y)+${state.b}(x+y)=(${state.a + state.b})(x+y)`;
    recognitionText = `Četiri člana, a posle grupisanja u obe grupe ispada isti binom (x+y).`;
    conceptText =
      "Dobar izbor grupa pravi isti faktor u obe zagrade. Tek tada grupisanje ima smisla.";
    formulaLatex = `${state.a}x+${state.a}y+${state.b}x+${state.b}y = ${state.a}(x+y)+${state.b}(x+y) = (${state.a + state.b})(x+y)`;
    hintText =
      'Kod grupisanja ne tražiš da svaka grupa bude "lepa", nego da obe grupe izbace isti binom ili isti faktor.';
  }

  return (
    <>
      <div className={s.interactiveShell}>
        <article className={s.interactiveCard}>
          <h3 className={cs.tCardTitle}>Kontrole</h3>
          <p>
            Laboratorijum se fokusira na obrasce koji se najlakše vide:
            kvadrat binoma, razlika kvadrata i grupisanje. Kubne formule su
            dodatno obrađene kroz statičke primere i vežbe.
          </p>

          <div className={s.controlGrid}>
            <div className={s.field}>
              <label htmlFor="modeSelect">Obrazac</label>
              <select
                id="modeSelect"
                value={state.mode}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    mode: e.target.value as LabMode,
                  }))
                }
              >
                <option value="square">Kvadrat binoma</option>
                <option value="difference">Razlika kvadrata</option>
                <option value="grouping">Grupisanje</option>
              </select>
            </div>
            <div className={s.field}>
              <label htmlFor="paramA">
                Parametar <InlineMath>{"a"}</InlineMath>
              </label>
              <input
                id="paramA"
                type="number"
                min={1}
                max={6}
                step={1}
                value={state.a}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    a: clampInt(e.target.value, prev.a, 1, 6),
                  }))
                }
              />
            </div>
            <div className={s.field}>
              <label htmlFor="paramB">
                Parametar <InlineMath>{"b"}</InlineMath>
              </label>
              <input
                id="paramB"
                type="number"
                min={1}
                max={6}
                step={1}
                value={state.b}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    b: clampInt(e.target.value, prev.b, 1, 6),
                  }))
                }
              />
            </div>
          </div>

          <label className={s.toggleRow}>
            <input
              type="checkbox"
              checked={state.showLabels}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  showLabels: e.target.checked,
                }))
              }
            />
            <span>Prikaži oznake delova i pomoćne komentare</span>
          </label>

          <div className={cs.presetRow} style={{ marginTop: 14 }}>
            {(
              [
                ["square", "Kvadrat binoma"],
                ["difference", "Razlika kvadrata"],
                ["grouping", "Grupisanje"],
                ["exam", "Složeniji primer"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                className={s.presetBtn}
                type="button"
                onClick={() => setState(PRESETS[key])}
              >
                {label}
              </button>
            ))}
          </div>

          <div className={s.labNote}>{hintText}</div>
        </article>

        <article className={s.interactiveCard}>
          <h3 className={cs.tCardTitle}>Vizuelni prikaz i faktorizacija</h3>
          <div className={s.canvasWrap}>
            <canvas
              ref={canvasRef}
              className={s.polarCanvas}
              width={960}
              height={600}
              aria-label="Vizuelni prikaz rastavljanja na faktore kroz kvadrat binoma, razliku kvadrata ili grupisanje"
            />
          </div>

          <div className={s.resultsGrid}>
            <div className={s.resultCard}>
              <strong>Polazni izraz</strong>
              <MathJax dynamic>{`\\(${expressionLatex}\\)`}</MathJax>
            </div>
            <div className={s.resultCard}>
              <strong>Faktorisani oblik</strong>
              <MathJax dynamic>{`\\(${factorLatex}\\)`}</MathJax>
            </div>
            <div className={s.resultCard}>
              <strong>Kako ga prepoznaš</strong>
              <div>{recognitionText}</div>
            </div>
            <div className={s.resultCard}>
              <strong>Glavna poruka</strong>
              <div>{conceptText}</div>
            </div>
          </div>

          <div className={s.labNote}>
            <MathJax dynamic>{`\\[${formulaLatex}\\]`}</MathJax>
          </div>
        </article>
      </div>

      <InsightCard title="Kako da koristiš laboratorijum">
        <p>
          Pre nego što pogledaš desni panel, pokušaj da sam
          naglas kažeš koji metod biraš i zašto. Ako to
          umeš, onda formula više nije nasumična informacija nego
          alat koji znaš kada da uključiš.
        </p>
      </InsightCard>
    </>
  );
}

/* ───────────────────────── MAIN PAGE ───────────────────────── */

export default function Lesson11Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka · Centar znanja · Lekcija 11"
        title={
          <>
            Transformacije izraza i{" "}
            <span className={cs.tHeroAccent}>rastavljanje na faktore</span>
          </>
        }
        description="Ova lekcija je srce algebarske tehnike: umesto da izraz samo razviješ, učiš da ga vratiš unazad u proizvod. To je presudno za sređivanje razlomaka, rešavanje jednačina i brzo prepoznavanje skrivene strukture u prijemnim zadacima."
        heroImageSrc="/api/lessons/11/hero"
        heroImageAlt="Ilustracija algebarskih transformacija i rastavljanja na faktore"
        cards={[
          {
            label: "Naučićeš",
            description:
              "Kako da izabereš pravu metodu: zajednički faktor, identiteti i grupisanje neće više delovati kao nepovezan spisak formula.",
          },
          {
            label: "Najveća zamka",
            description:
              "Pogrešno prepoznavanje obrasca. Najviše grešaka nastaje kada učenik preskoči proveru da li izraz stvarno ima oblik kvadrata binoma ili razlike kvadrata.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Faktorisanje kao prvi korak. U mnogim zadacima ovo nije cilj samo po sebi, nego obavezan prvi potez pre jednačina, razlomaka i kasnijih transformacija.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "65 do 85 minuta uz vođene primere i laboratorijum obrazaca.",
          },
          {
            label: "Predznanje",
            description:
              "Množenje polinoma, stepeni i osnovne operacije sa monomima i binomima.",
          },
          {
            label: "Glavna veština",
            description:
              "Brzo prepoznavanje da li treba izvući faktor, primeniti identitet ili grupisati članove.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorijum za kvadrat binoma, razliku kvadrata i metod grupisanja.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE VAŽNO ═══════════ */}
      <LessonSection
        id="vaznost"
        eyebrow="Zašto je ova lekcija važna"
        title="Faktorisanje je obrnuta strana razvijanja izraza"
        description='Mnogo učenika zna da razvije (a+b)², ali zastane kada treba da prepozna a²+2ab+b² i vrati ga u proizvod. Ova lekcija gradi baš tu "obrnutu" refleksnu veštinu.'
      >
        <div className={s.grid3}>
          <SectionCard title="Kasnije se pojavljuje svuda">
            <p>
              Bez rastavljanja na faktore teško se rešavaju polinomske
              jednačine, racionalni izrazi, nejednačine i brojni zadaci
              sa parametrima.
            </p>
          </SectionCard>
          <SectionCard title="Štedi vreme na prijemnom">
            <p>
              Kada odmah vidiš obrazac, preskačeš nepotrebno
              razvijanje i brzo dolaziš do proizvoda koji je lak za dalje
              sređivanje.
            </p>
          </SectionCard>
          <SectionCard title="Gradi algebarsku intuiciju">
            <p>
              Počinješ da gledaš izraz kao strukturu, a ne kao niz
              nepovezanih članova. To je velika razlika između
              mehaničkog i sigurnog rada.
            </p>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ OSNOVNA IDEJA ═══════════ */}
      <LessonSection
        id="osnove"
        eyebrow="Osnovna ideja"
        title="Transformacija ne menja vrednost, menja pogled na izraz"
        description="Transformacija algebarskog izraza znači da isti izraz prepišeš u pogodniji oblik. Rastavljanje na faktore znači da sumu ili razliku vratiš u proizvod."
      >
        <div className={s.grid2}>
          <SectionCard title='Šta znači "rastaviti na faktore"'>
            <MathBlock>{"x^2+5x=x(x+5)"}</MathBlock>
            <p>
              Levi zapis je zbir članova, a desni proizvod. Oba izraza imaju
              istu vrednost za svako dozvoljeno{" "}
              <InlineMath>{"x"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Najvažniji princip reda rada">
            <p>
              Skoro uvek prvo proveravaš da li postoji zajednički
              faktor. Tek posle toga proveravaš formule i grupisanje.
            </p>
            <MicroCheck
              question="Mikro-provera: Zašto zajednički faktor proveravaš prvi?"
              answer={
                <p>
                  Zato što je to najjeftiniji i najčešći
                  korak. Često tek posle izdvajanja zajedničkog
                  faktora preostali deo dobije poznat obrazac.
                </p>
              }
            />
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ KAKO BIRAŠ METODU ═══════════ */}
      <LessonSection
        id="metode"
        eyebrow="Kako biraš metodu"
        title="Prepoznavanje obrasca je pola rešenja"
        description="Učenici često greše jer pokušaju pogrešnu formulu. Ovde je bitnije prepoznati situaciju nego napamet nabrojati identitete."
      >
        <div className={s.grid3}>
          <SectionCard title="1. Zajednički faktor">
            <p>
              Ako svi članovi dele isti broj, slovo ili ceo binom, prvo ga
              izvuči.
            </p>
            <MathBlock>{"6x^3-9x^2=3x^2(2x-3)"}</MathBlock>
          </SectionCard>
          <SectionCard title="2. Broj članova ti daje trag">
            <ul>
              <li>
                Dva člana: proveri razliku kvadrata ili zbir/razliku kubova.
              </li>
              <li>Tri člana: proveri kvadrat binoma.</li>
              <li>Četiri člana: proveri grupisanje.</li>
            </ul>
          </SectionCard>
          <SectionCard title="3. Proveri znakove i stepene">
            <p>
              Razlika kvadrata mora imati minus između savršenih
              kvadrata. Kvadrat binoma traži tačno dvostruki proizvod u
              sredini.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Izvlačenje zajedničkog faktora">
            <MathBlock>
              {"6x^3y-9x^2y^2+3xy=3xy(2x^2-3xy+1)"}
            </MathBlock>
            <p>
              Tražiš najveći zajednički broj i najmanje
              stepene zajedničkih promenljivih.
            </p>
          </SectionCard>
          <SectionCard title="Metod grupisanja">
            <MathBlock>
              {"ax+ay+bx+by=a(x+y)+b(x+y)=(a+b)(x+y)"}
            </MathBlock>
            <p>
              Poenta grupisanja nije samo prelomiti izraz na pola, nego napraviti
              isti binom ili isti faktor u obe grupe.
            </p>
            <MicroCheck
              question={`Mikro-provera: Da li je a²+b² razlika kvadrata?`}
              answer={
                <p>
                  Nije. Razlika kvadrata ima minus:{" "}
                  <InlineMath>{"a^2-b^2"}</InlineMath>. Zbir kvadrata se ne
                  rastavlja ovom formulom nad realnim brojevima.
                </p>
              }
            />
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ INTERAKTIVNI DEO ═══════════ */}
      <LessonSection
        id="interaktivno"
        eyebrow="Interaktivni deo"
        title="Laboratorijum obrazaca"
        description='Menjaj parametre i prati kako se ista struktura ponavlja. Cilj nije da dobiješ jednu vrednost, već da "u oku" napraviš vezu između izraza i faktorizovanog oblika.'
      >
        <FactorLab />
      </LessonSection>

      {/* ═══════════ VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Od jednog faktora do kombinovanih koraka"
        description="Primeri su složeni tako da pokažu kako se bira metoda i kako se ponekad u jednom zadatku koristi više od jedne ideje."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 1: Izvlačenje zajedničkog faktora
            </h3>
            <p>
              Rastavi na faktore izraz{" "}
              <InlineMath>{"6x^3y-9x^2y^2+3xy"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Nađi najveći zajednički faktor."
              >
                <p>
                  Sva tri člana dele{" "}
                  <InlineMath>{"3xy"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Izvuči ga ispred zagrade.">
                <MathBlock>
                  {"6x^3y-9x^2y^2+3xy=3xy(2x^2-3xy+1)"}
                </MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>Primer 2: Kvadrat binoma</h3>
            <p>
              Rastavi na faktore{" "}
              <InlineMath>{"x^2+10x+25"}</InlineMath>.
            </p>
            <MathBlock>{"x^2+10x+25=x^2+2\\cdot x\\cdot 5+5^2"}</MathBlock>
            <MathBlock>{"x^2+10x+25=(x+5)^2"}</MathBlock>
            <p>
              Prvi i poslednji član su kvadrati, a srednji je dvostruki
              proizvod.
            </p>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>Primer 3: Razlika kvadrata</h3>
            <p>
              Rastavi na faktore{" "}
              <InlineMath>{"9a^2-16b^2"}</InlineMath>.
            </p>
            <MathBlock>{"9a^2=(3a)^2,\\qquad 16b^2=(4b)^2"}</MathBlock>
            <MathBlock>{"9a^2-16b^2=(3a-4b)(3a+4b)"}</MathBlock>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>Primer 4: Razlika kubova</h3>
            <p>
              Rastavi na faktore{" "}
              <InlineMath>{"8x^3-27y^3"}</InlineMath>.
            </p>
            <MathBlock>{"8x^3=(2x)^3,\\qquad 27y^3=(3y)^3"}</MathBlock>
            <MathBlock>{"8x^3-27y^3=(2x-3y)(4x^2+6xy+9y^2)"}</MathBlock>
            <p>
              Zapamti obrazac znakova: kod razlike kubova prvi faktor nosi minus,
              a drugi sve pluseve.
            </p>
          </article>

          {/* Primer 5 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>Primer 5: Grupisanje</h3>
            <p>
              Rastavi na faktore{" "}
              <InlineMath>{"x^3+3x^2+2x+6"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title="Grupiši članove po parovima."
              >
                <MathBlock>
                  {"x^3+3x^2+2x+6=x^2(x+3)+2(x+3)"}
                </MathBlock>
              </WalkStep>
              <WalkStep
                number={2}
                title="Izvuči zajednički binom."
              >
                <MathBlock>{"x^2(x+3)+2(x+3)=(x^2+2)(x+3)"}</MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 6 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 6: Više ideja u jednom zadatku
            </h3>
            <p>
              Rastavi na faktore{" "}
              <InlineMath>{"4x^2+12x+9-y^2"}</InlineMath>.
            </p>
            <MathBlock>{"4x^2+12x+9=(2x+3)^2"}</MathBlock>
            <MathBlock>{"4x^2+12x+9-y^2=(2x+3)^2-y^2"}</MathBlock>
            <MathBlock>{"(2x+3)^2-y^2=(2x+3-y)(2x+3+y)"}</MathBlock>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ KLJUČNE FORMULE ═══════════ */}
      <LessonSection
        id="formule"
        eyebrow="Ključne formule"
        title="Formula-vault za ovu temu"
        description="Ove formule ne služe za mehaničko bubanje. Njihova prava vrednost je u brzom prepoznavanju kada se koja primenjuje."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Kvadrat zbira"
            formula="(a+b)^2=a^2+2ab+b^2"
          />
          <FormulaCard
            title="Kvadrat razlike"
            formula="(a-b)^2=a^2-2ab+b^2"
          />
          <FormulaCard
            title="Razlika kvadrata"
            formula="a^2-b^2=(a-b)(a+b)"
          />
          <FormulaCard
            title="Kub zbira"
            formula="(a+b)^3=a^3+3a^2b+3ab^2+b^3"
          />
          <FormulaCard
            title="Kub razlike"
            formula="(a-b)^3=a^3-3a^2b+3ab^2-b^3"
          />
          <FormulaCard
            title="Zbir kubova"
            formula="a^3+b^3=(a+b)(a^2-ab+b^2)"
          />
          <FormulaCard
            title="Razlika kubova"
            formula="a^3-b^3=(a-b)(a^2+ab+b^2)"
          />
          <FormulaCard
            title="Zajednički faktor"
            formula="Ax+Ay=A(x+y)"
          />
          <FormulaCard
            title="Grupisanje"
            formula="ax+ay+bx+by=(a+b)(x+y)"
          />
        </div>
      </LessonSection>

      {/* ═══════════ ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="zamke"
        eyebrow="Česte greške"
        title="Ovde najčešće puca tačnost"
        description="Većina grešaka ne nastaje jer je račun težak, nego jer je pogrešno izabrana formula ili je preskočena provera da li obrazac zaista postoji."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Nije svaki trinom kvadrat binoma
            </h3>
            <p>
              Moraš proveriti da su prvi i poslednji član
              savršeni kvadrati i da je srednji tačno{" "}
              <InlineMath>{"2ab"}</InlineMath>, odnosno{" "}
              <InlineMath>{"-2ab"}</InlineMath>.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Zbir kvadrata nije razlika kvadrata
            </h3>
            <p>
              <InlineMath>{"a^2+b^2"}</InlineMath> se ne rastavlja formulom
              za razliku kvadrata. Znak minus je presudan.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Zaboravljen zajednički faktor
            </h3>
            <p>
              Ako odmah kreneš na formule, lako propustiš
              najjednostavniji prvi korak i komplikuješ ostatak zadatka.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Pomešani znakovi kod kubova
            </h3>
            <p>
              Kod <InlineMath>{"a^3+b^3"}</InlineMath> u drugom faktoru ide
              minus ispred <InlineMath>{"ab"}</InlineMath>. Kod{" "}
              <InlineMath>{"a^3-b^3"}</InlineMath> u drugom faktoru svi
              znaci su plus.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Grupisanje bez istog binoma
            </h3>
            <p>
              Ako posle grupisanja ne dobiješ isti faktor u obe grupe,
              grupisanje nije dobro odabrano.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Preuranjeno razvijanje</h3>
            <p>
              Neki učenici prepoznaju proizvod, ali ga odmah razviju nazad.
              Na prijemnom ti treba kraći i pogodniji oblik, a ne duži.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako se ova tema stvarno koristi na testu"
        description='Na prijemnim zadacima faktorisanje je često skriveni prvi korak. Ne pitaju te uvek direktno "rastavi na faktore", ali bez toga ne možeš dalje.'
      >
        <div className={s.grid3}>
          <SectionCard title="Jednačine i nule izraza">
            <p>
              Kada izraz rastaviš na proizvod, jednačina se razbija na
              više jednostavnijih faktora jednakih nuli.
            </p>
          </SectionCard>
          <SectionCard title="Skraćivanje algebarskih razlomaka">
            <p>
              Često moraš prvo rastaviti brojilac i imenilac da bi
              uopšte video šta može da se skrati.
            </p>
          </SectionCard>
          <SectionCard title="Prepoznavanje skrivene strukture">
            <p>
              Mnogi &ldquo;teški&rdquo; zadaci postaju rutinski čim
              primetiš kvadrat binoma, razliku kvadrata ili binom koji se
              ponavlja posle grupisanja.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Prijemni algoritam u 4 koraka">
          <p>
            1. Proveri zajednički faktor. 2. Prebroj članove i proveri
            identitete. 3. Ako ih je četiri, probaj grupisanje. 4. Tek kada
            dobiješ proizvod, razmišljaj šta zadatak dalje
            traži. Taj redosled rešava veliki broj školskih i
            prijemnih zadataka.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe na kraju"
        title="Samostalna provera"
        description="Vežbe idu od čistih obrazaca ka kombinovanim zadacima. To je najbolji način da proveriš da li stvarno biraš dobru metodu."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Vežba 1"
            problem={
              <p>
                Rastavi na faktore{" "}
                <InlineMath>{"12x^3-18x^2"}</InlineMath>.
              </p>
            }
            solution={
              <MathBlock>{"12x^3-18x^2=6x^2(2x-3)"}</MathBlock>
            }
          />
          <ExerciseCard
            title="Vežba 2"
            problem={
              <p>
                Rastavi na faktore{" "}
                <InlineMath>{"y^2-14y+49"}</InlineMath>.
              </p>
            }
            solution={
              <MathBlock>
                {"y^2-14y+49=y^2-2\\cdot 7\\cdot y+7^2=(y-7)^2"}
              </MathBlock>
            }
          />
          <ExerciseCard
            title="Vežba 3"
            problem={
              <p>
                Rastavi na faktore{" "}
                <InlineMath>{"25m^2-n^2"}</InlineMath>.
              </p>
            }
            solution={
              <MathBlock>{"25m^2-n^2=(5m-n)(5m+n)"}</MathBlock>
            }
          />
          <ExerciseCard
            title="Vežba 4"
            problem={
              <p>
                Rastavi na faktore{" "}
                <InlineMath>{"x^3+8"}</InlineMath>.
              </p>
            }
            solution={
              <MathBlock>
                {"x^3+8=x^3+2^3=(x+2)(x^2-2x+4)"}
              </MathBlock>
            }
          />
          <ExerciseCard
            title="Vežba 5"
            problem={
              <p>
                Rastavi na faktore{" "}
                <InlineMath>{"3a+3b+2a+2b"}</InlineMath>.
              </p>
            }
            solution={
              <MathBlock>
                {"3a+3b+2a+2b=3(a+b)+2(a+b)=(3+2)(a+b)=5(a+b)"}
              </MathBlock>
            }
          />
          <ExerciseCard
            title="Vežba 6"
            problem={
              <p>
                Rastavi na faktore{" "}
                <InlineMath>{"4x^2+12x+9-y^2"}</InlineMath>.
              </p>
            }
            solution={
              <>
                <MathBlock>
                  {"4x^2+12x+9-y^2=(2x+3)^2-y^2"}
                </MathBlock>
                <MathBlock>
                  {"(2x+3)^2-y^2=(2x+3-y)(2x+3+y)"}
                </MathBlock>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRŠNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Završni uvid"
        title="Glavna misaona poruka lekcije"
        description="Rastavljanje na faktore nije lista nepovezanih trikova. To je disciplina prepoznavanja strukture: šta je zajedničko, šta je savršeni kvadrat, šta je razlika kvadrata, a šta traži grupisanje."
      >
        <InsightCard title="Najvažniji princip">
          <MathBlock>
            {
              "\\text{Prvo proveri zajedni\\v{c}ki faktor, zatim identitete, pa tek onda grupisanje.}"
            }
          </MathBlock>
          <p>
            Kada taj redosled postane navika, broj grešaka drastično
            opada.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta moraš da zapamtiš"
        description="Ako ti je sledećih šest tačaka jasno, imaš stabilnu osnovu za dalje algebarske teme."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              1. Faktorisanje je obrnuto razvijanju
            </h3>
            <p>Izraz ne menja vrednost, već samo dobija korisniji oblik.</p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              2. Zajednički faktor ide prvi
            </h3>
            <p>To je najčešći i najjeftiniji prvi korak.</p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>3. Broj članova daje trag</h3>
            <p>
              Dva, tri ili četiri člana često odmah sugerišu
              identitet ili grupisanje.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>4. Znakovi su presudni</h3>
            <p>
              Minus menja sve kod razlike kvadrata i kubova, kao i kod kvadrata
              razlike.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>
              5. Ne mešaj slične obrasce
            </h3>
            <p>
              <InlineMath>{"a^2+b^2"}</InlineMath> nije razlika kvadrata, a
              proizvoljan trinom nije nužno kvadrat binoma.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>6. Sledeći logičan korak</h3>
            <p>
              Sada si spreman za racionalne algebarske izraze, gde je
              rastavljanje na faktore često prvi uslov da zadatak uopšte
              krene.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Lekcija 11 postavlja algebarsku rutinu koja će ti trebati
          već u sledećoj lekciji o racionalnim izrazima.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
