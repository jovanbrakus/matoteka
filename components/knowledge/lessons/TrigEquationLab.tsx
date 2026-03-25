"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";
import MathBlock from "@/components/knowledge/MathBlock";

/* ─── Constants ─── */
const TAU = Math.PI * 2;
const EPS = 1e-9;

type Mode = "homogeneous" | "linear";

interface Interval {
  start: number;
  end: number;
}

interface Family {
  base: number;
  period: number;
}

interface SolveState {
  mode: Mode;
  interval: Interval;
  equationTex: string;
  recognition: string;
  condition: string;
  transformTex: string;
  transformNote: string;
  generalTex: string;
  periodNote: string;
  intervalTex: string;
  countNote: string;
  sumNote: string;
  status: string;
  intervalSolutions: number[];
  allReal: boolean;
  target: number;
  fn: (x: number) => number;
}

/* ─── Utility helpers ─── */

function nearlyEqual(a: number, b: number, eps = 1e-6) {
  return Math.abs(a - b) <= eps;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function normalizePositive(angle: number, period: number) {
  let result = angle % period;
  if (result < 0) result += period;
  if (nearlyEqual(result, period)) result = 0;
  return result;
}

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

function simplifyPiFraction(num: number, den: number) {
  const d = gcd(num, den);
  return { num: num / d, den: den / d };
}

function piFractionTex(num: number, den: number) {
  const sign = num < 0 ? "-" : "";
  const absNum = Math.abs(num);
  if (absNum === 0) return "0";
  if (den === 1) return absNum === 1 ? sign + "\\pi" : sign + absNum + "\\pi";
  if (absNum === 1) return sign + "\\frac{\\pi}{" + den + "}";
  return sign + "\\frac{" + absNum + "\\pi}{" + den + "}";
}

function piFractionLabel(num: number, den: number) {
  const sign = num < 0 ? "-" : "";
  const absNum = Math.abs(num);
  if (absNum === 0) return "0";
  if (den === 1) return absNum === 1 ? sign + "\u03C0" : sign + absNum + "\u03C0";
  if (absNum === 1) return sign + "\u03C0/" + den;
  return sign + absNum + "\u03C0/" + den;
}

function formatDecimal(value: number, digits = 3) {
  const rounded = Number(value.toFixed(digits));
  if (Object.is(rounded, -0)) return "0";
  return rounded.toString();
}

const COMMON_VALUES: { value: number; tex: string }[] = [
  { value: -2, tex: "-2" },
  { value: -Math.sqrt(3), tex: "-\\sqrt{3}" },
  { value: -1, tex: "-1" },
  { value: -Math.sqrt(3) / 2, tex: "-\\frac{\\sqrt{3}}{2}" },
  { value: -Math.sqrt(2) / 2, tex: "-\\frac{\\sqrt{2}}{2}" },
  { value: -0.5, tex: "-\\frac{1}{2}" },
  { value: 0, tex: "0" },
  { value: 0.5, tex: "\\frac{1}{2}" },
  { value: Math.sqrt(2) / 2, tex: "\\frac{\\sqrt{2}}{2}" },
  { value: Math.sqrt(3) / 2, tex: "\\frac{\\sqrt{3}}{2}" },
  { value: 1, tex: "1" },
  { value: 1 / Math.sqrt(3), tex: "\\frac{\\sqrt{3}}{3}" },
  { value: Math.sqrt(3), tex: "\\sqrt{3}" },
  { value: 2, tex: "2" },
];

function valueToTex(value: number) {
  for (const c of COMMON_VALUES) {
    if (nearlyEqual(value, c.value, 1e-6)) return c.tex;
  }
  return formatDecimal(value, 3);
}

function angleToTex(angle: number) {
  const ratio = angle / Math.PI;
  const denominators = [1, 2, 3, 4, 6, 12];
  for (const den of denominators) {
    const rawNum = Math.round(ratio * den);
    if (Math.abs(ratio - rawNum / den) < 1e-6) {
      const sim = simplifyPiFraction(rawNum, den);
      return piFractionTex(sim.num, sim.den);
    }
  }
  return formatDecimal(angle, 3);
}

function angleToLabel(angle: number) {
  const ratio = angle / Math.PI;
  const denominators = [1, 2, 3, 4, 6, 12];
  for (const den of denominators) {
    const rawNum = Math.round(ratio * den);
    if (Math.abs(ratio - rawNum / den) < 1e-6) {
      const sim = simplifyPiFraction(rawNum, den);
      return piFractionLabel(sim.num, sim.den);
    }
  }
  return formatDecimal(angle, 2);
}

function intervalToTex(start: number, end: number) {
  return "[" + angleToTex(start) + "," + angleToTex(end) + "]";
}

function dedupeNumbers(values: number[], eps = 1e-6) {
  const sorted = values.slice().sort((a, b) => a - b);
  const result: number[] = [];
  for (const v of sorted) {
    if (!result.length || Math.abs(v - result[result.length - 1]) > eps) {
      result.push(v);
    }
  }
  return result;
}

function branchTex(base: number, periodTex: string) {
  if (nearlyEqual(base, 0)) return "x=" + periodTex;
  return "x=" + angleToTex(base) + "+" + periodTex;
}

function wrapMathDisplay(content: string) {
  return "\\[" + content + "\\]";
}

function generateSolutions(families: Family[], start: number, end: number) {
  const values: number[] = [];
  for (const f of families) {
    const minK = Math.floor((start - f.base) / f.period) - 1;
    const maxK = Math.ceil((end - f.base) / f.period) + 1;
    for (let k = minK; k <= maxK; k++) {
      const x = f.base + k * f.period;
      if (x >= start - EPS && x <= end + EPS) {
        values.push(nearlyEqual(x, 0) ? 0 : x);
      }
    }
  }
  return dedupeNumbers(values);
}

function appendTerm(parts: string[], coeff: number, core: string, omitOne = true) {
  if (nearlyEqual(coeff, 0)) return;
  const abs = Math.abs(coeff);
  const coeffTex = omitOne && core && nearlyEqual(abs, 1) ? "" : valueToTex(abs);
  const term = coeffTex + core;
  if (!parts.length) {
    parts.push((coeff < 0 ? "-" : "") + term);
  } else {
    parts.push((coeff < 0 ? " - " : " + ") + term);
  }
}

function linearExpressionTex(a: number, b: number) {
  const parts: string[] = [];
  appendTerm(parts, a, "\\sin x");
  appendTerm(parts, b, "\\cos x");
  return parts.length ? parts.join("") : "0";
}

function homogeneousExpressionTex(a: number, b: number, c: number) {
  const parts: string[] = [];
  appendTerm(parts, a, "\\sin^2 x");
  appendTerm(parts, b, "\\sin x\\cos x");
  appendTerm(parts, c, "\\cos^2 x");
  return parts.length ? parts.join("") : "0";
}

function quadraticTex(a: number, b: number, c: number) {
  const parts: string[] = [];
  appendTerm(parts, a, "t^2");
  appendTerm(parts, b, "t");
  appendTerm(parts, c, "", false);
  return parts.length ? parts.join("") : "0";
}

function signedAngleTex(angle: number) {
  if (nearlyEqual(angle, 0)) return "";
  return angle < 0 ? "-" + angleToTex(Math.abs(angle)) : "+" + angleToTex(angle);
}

function alignedDisplay(lines: string[]) {
  return "\\[\\begin{aligned}" + lines.join("\\\\") + "\\end{aligned}\\]";
}

function solutionListTex(values: number[] | "all", interval?: Interval) {
  if (interval && values === "all") {
    return wrapMathDisplay("\\text{svaki }x\\in" + intervalToTex(interval.start, interval.end));
  }
  if (typeof values !== "string" && !values.length) {
    return wrapMathDisplay("\\text{nema realnih rešenja}");
  }
  if (typeof values !== "string") {
    return wrapMathDisplay("x=" + values.map(angleToTex).join(",\\ "));
  }
  return "";
}

function familyGeneralTex(families: Family[], periodTex: string) {
  if (!families.length) return wrapMathDisplay("\\text{nema realnih rešenja}");
  return wrapMathDisplay(
    families.map((f) => branchTex(f.base, periodTex)).join("\\quad \\text{ili} \\quad ") +
      ",\\ k\\in\\mathbb{Z}",
  );
}

/* ─── Solvers ─── */

function baseState(mode: Mode, interval: Interval): SolveState {
  return {
    mode,
    interval,
    equationTex: "",
    recognition: "",
    condition: "",
    transformTex: "",
    transformNote: "",
    generalTex: "",
    periodNote: "",
    intervalTex: "",
    countNote: "",
    sumNote: "",
    status: "",
    intervalSolutions: [],
    allReal: false,
    target: 0,
    fn: () => 0,
  };
}

function solveHomogeneous(A: number, B: number, C: number, interval: Interval): SolveState {
  const state = baseState("homogeneous", interval);
  state.equationTex = homogeneousExpressionTex(A, B, C) + "=0";
  state.recognition =
    "Homogena jednačina drugog stepena: svi članovi imaju isti ukupan stepen u sinusu i kosinusu.";
  state.condition =
    "Pre deljenja sa \\(\\cos^2 x\\) proveri slučaj \\(\\cos x=0\\). Taj korak čuva eventualna skrivena rešenja.";
  state.fn = (x: number) =>
    A * Math.sin(x) * Math.sin(x) + B * Math.sin(x) * Math.cos(x) + C * Math.cos(x) * Math.cos(x);
  state.target = 0;

  if (nearlyEqual(A, 0) && nearlyEqual(B, 0) && nearlyEqual(C, 0)) {
    state.allReal = true;
    state.transformTex = wrapMathDisplay("0=0");
    state.transformNote = "Jednačina je identitet, pa svaki realan ugao zadovoljava uslov.";
    state.generalTex = wrapMathDisplay("\\text{svako }x\\in\\mathbb{R}");
    state.periodNote = "Nema potrebe za periodom, jer su sva realna \\(x\\) rešenja.";
    state.intervalTex = solutionListTex("all", interval);
    state.countNote = "Broj rešenja na intervalu: beskonačno mnogo.";
    state.sumNote = "Zbir rešenja nije definisan.";
    state.status = "Degenerisan slučaj u kome graf cele leve strane leži na osi x.";
    return state;
  }

  const families: Family[] = [];
  const transformLines: string[] = ["t=\\tan x", quadraticTex(A, B, C) + "=0"];

  if (nearlyEqual(A, 0)) {
    families.push({ base: Math.PI / 2, period: Math.PI });
  }

  if (!nearlyEqual(A, 0)) {
    const D = B * B - 4 * A * C;
    transformLines.push("\\Delta=" + valueToTex(D));
    if (D > EPS) {
      const sqrtD = Math.sqrt(D);
      const t1 = (-B - sqrtD) / (2 * A);
      const t2 = (-B + sqrtD) / (2 * A);
      transformLines.push("t_1=" + valueToTex(t1) + ",\\quad t_2=" + valueToTex(t2));
      families.push({ base: Math.atan(t1), period: Math.PI });
      families.push({ base: Math.atan(t2), period: Math.PI });
    } else if (Math.abs(D) <= EPS) {
      const t = -B / (2 * A);
      transformLines.push("t=" + valueToTex(t));
      families.push({ base: Math.atan(t), period: Math.PI });
    } else {
      transformLines.push("\\text{nema realnih vrednosti za }t");
    }
  } else if (!nearlyEqual(B, 0)) {
    const t = -C / B;
    transformLines.push("t=" + valueToTex(t));
    families.push({ base: Math.atan(t), period: Math.PI });
  } else {
    transformLines.push("\\text{za }\\cos x\\ne0\\text{ nema novih korena}");
  }

  const uniqueFamilies: Family[] = [];
  for (const f of families) {
    if (
      !uniqueFamilies.some(
        (u) => nearlyEqual(u.base, f.base) && nearlyEqual(u.period, f.period),
      )
    ) {
      uniqueFamilies.push(f);
    }
  }

  state.transformTex = alignedDisplay(transformLines);
  state.transformNote = nearlyEqual(A, 0)
    ? "Pošto je koeficijent uz \\(\\sin^2 x\\) jednak nuli, slučaj \\(\\cos x=0\\) daje dodatnu porodicu rešenja."
    : "Ovde slučaj \\(\\cos x=0\\) ne daje rešenje, pa deljenje sa \\(\\cos^2 x\\) ne gubi korene.";
  state.generalTex = familyGeneralTex(uniqueFamilies, "k\\pi");
  state.periodNote =
    "Svaki koren jednačine po t daje porodicu x=arctan(t)+k\u03C0, jer tangens ima periodu \u03C0.";
  state.intervalSolutions = generateSolutions(uniqueFamilies, interval.start, interval.end);
  state.intervalTex = solutionListTex(
    state.allReal ? "all" : state.intervalSolutions,
    interval,
  );
  state.countNote =
    "Broj rešenja na intervalu " +
    intervalToTex(interval.start, interval.end) +
    ": " +
    state.intervalSolutions.length +
    ".";
  state.sumNote = state.intervalSolutions.length
    ? "Zbir rešenja: " +
      angleToTex(state.intervalSolutions.reduce((sum, v) => sum + v, 0)) +
      "."
    : "Zbir rešenja nije definisan jer na zadatom intervalu nema korena.";
  state.status = uniqueFamilies.length
    ? "Najvažnije je da spojiš korene dobijene iz t sa eventualnim posebnim slučajem cos x=0."
    : "Kvadratna jednačina po t nema realne korene.";
  return state;
}

function solveLinear(a: number, b: number, c: number, interval: Interval): SolveState {
  const state = baseState("linear", interval);
  state.equationTex = linearExpressionTex(a, b) + "=" + valueToTex(c);
  state.recognition =
    "Linearna jednačina prvog stepena po sinusu i kosinusu: cilj je svođenje na jedan sinus sa pomerajem.";
  state.fn = (x: number) => a * Math.sin(x) + b * Math.cos(x);
  state.target = c;

  if (nearlyEqual(a, 0) && nearlyEqual(b, 0)) {
    if (nearlyEqual(c, 0)) {
      state.allReal = true;
      state.condition = "Leva strana je stalno jednaka nuli, a desna strana je takođe nula.";
      state.transformTex = wrapMathDisplay("0=0");
      state.transformNote = "Ovo je identitet: svako realno x zadovoljava jednačinu.";
      state.generalTex = wrapMathDisplay("\\text{svako }x\\in\\mathbb{R}");
      state.periodNote = "Nema potrebe za daljim svođenjem.";
      state.intervalTex = solutionListTex("all", interval);
      state.countNote = "Beskonačno mnogo rešenja.";
      state.sumNote = "Zbir rešenja nije definisan.";
      state.status = "Graf leve strane potpuno se poklapa sa pravom y=0.";
    } else {
      state.condition = "Kada su a=b=0, leva strana je stalno nula.";
      state.transformTex = wrapMathDisplay("0=" + valueToTex(c));
      state.transformNote = "Pošto desna strana nije nula, jednačina je kontradikcija.";
      state.generalTex = wrapMathDisplay("\\text{nema realnih rešenja}");
      state.periodNote = "Perioda nije relevantna, jer rešenja ne postoje.";
      state.intervalTex = solutionListTex([]);
      state.countNote = "Broj rešenja: 0.";
      state.sumNote = "Zbir rešenja nije definisan.";
      state.status = "Graf leve strane je horizontalna prava y=0.";
    }
    return state;
  }

  const R = Math.hypot(a, b);
  const phi = Math.atan2(b, a);
  const ratio = c / R;
  state.condition =
    "Prvi uslov je |c| \u2264 R. Ovde je R=" +
    valueToTex(R) +
    ", pa proveravaš da li je |" +
    valueToTex(c) +
    "| \u2264 " +
    valueToTex(R) +
    ".";
  state.transformTex = alignedDisplay([
    "R=" + valueToTex(R),
    "\\varphi=" + angleToTex(phi),
    linearExpressionTex(a, b) + "=" + valueToTex(R) + "\\sin(x" + signedAngleTex(phi) + ")",
    "\\sin(x" + signedAngleTex(phi) + ")=" + valueToTex(ratio),
  ]);

  if (Math.abs(ratio) > 1 + EPS) {
    state.transformNote = "Desna strana po apsolutnoj vrednosti prelazi amplitudu.";
    state.generalTex = wrapMathDisplay("\\text{nema realnih rešenja}");
    state.periodNote = "Pošto je |c|>R, nema potrebe za daljim rešavanjem.";
    state.intervalTex = solutionListTex([]);
    state.countNote = "Broj rešenja: 0.";
    state.sumNote = "Zbir rešenja nije definisan.";
    state.status = "Kriva nikada ne seče horizontalu y=c.";
    return state;
  }

  const yBases: number[] = [];
  if (nearlyEqual(ratio, 1)) {
    yBases.push(Math.PI / 2);
  } else if (nearlyEqual(ratio, -1)) {
    yBases.push((3 * Math.PI) / 2);
  } else {
    yBases.push(normalizePositive(Math.asin(clamp(ratio, -1, 1)), TAU));
    yBases.push(normalizePositive(Math.PI - Math.asin(clamp(ratio, -1, 1)), TAU));
  }

  const families = dedupeNumbers(yBases.map((v) => normalizePositive(v - phi, TAU))).map(
    (base) => ({
      base,
      period: TAU,
    }),
  );

  state.transformNote =
    "Posle pomoćnog ugla zadatak više nije složen: ostaje bazna jednačina za sinus.";
  state.generalTex = familyGeneralTex(families, "2k\\pi");
  state.periodNote =
    "Pošto si zadatak sveo na sinus, opšta rešenja se pišu sa periodom 2k\u03C0.";
  state.intervalSolutions = generateSolutions(families, interval.start, interval.end);
  state.intervalTex = solutionListTex(
    state.allReal ? "all" : state.intervalSolutions,
    interval,
  );
  state.countNote =
    "Broj rešenja na intervalu " +
    intervalToTex(interval.start, interval.end) +
    ": " +
    state.intervalSolutions.length +
    ".";
  state.sumNote = state.intervalSolutions.length
    ? "Zbir rešenja: " +
      angleToTex(state.intervalSolutions.reduce((sum, v) => sum + v, 0)) +
      "."
    : "Zbir rešenja nije definisan.";
  state.status = state.intervalSolutions.length
    ? "Svaki označeni presek grafa sa pravom y=c odgovara jednom konkretnom rešenju."
    : "Na zadatom intervalu nema preseka sa pravom y=c.";
  return state;
}

/* ─── Canvas drawing ─── */

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
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

function drawCanvas(
  canvas: HTMLCanvasElement,
  state: SolveState,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(320, Math.round(rect.width));
  const height = Math.max(360, Math.round(rect.height));
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);

  // Background
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "rgba(32,16,10,0.96)");
  gradient.addColorStop(1, "rgba(10,5,3,0.98)");
  roundedRect(ctx, 0, 0, width, height, 18);
  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.fillStyle = "rgba(236,91,19,0.08)";
  ctx.beginPath();
  ctx.arc(width * 0.18, height * 0.18, 90, 0, TAU);
  ctx.fill();

  ctx.fillStyle = "rgba(143,215,255,0.06)";
  ctx.beginPath();
  ctx.arc(width * 0.82, height * 0.22, 70, 0, TAU);
  ctx.fill();

  // Function panel
  const topBox = { x: 14, y: 14, w: width - 28, h: height * 0.58 };
  roundedRect(ctx, topBox.x, topBox.y, topBox.w, topBox.h, 16);
  ctx.fillStyle = "rgba(255,255,255,0.025)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.06)";
  ctx.stroke();

  ctx.fillStyle = "#f1e2d7";
  ctx.font = "700 14px Public Sans, sans-serif";
  ctx.fillText("Graf leve strane i ciljna vrednost", topBox.x + 16, topBox.y + 24);

  const pad = 20;
  const plot = {
    x: topBox.x + pad,
    y: topBox.y + 38,
    w: topBox.w - pad * 2,
    h: topBox.h - 52,
  };

  const sampleCount = Math.max(320, Math.floor(plot.w));
  const xs: number[] = [];
  const ys: number[] = [];
  let minY = state.target;
  let maxY = state.target;
  for (let i = 0; i <= sampleCount; i++) {
    const x =
      state.interval.start +
      ((state.interval.end - state.interval.start) * i) / sampleCount;
    const y = state.fn(x);
    xs.push(x);
    ys.push(y);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }

  if (state.allReal) {
    minY = Math.min(minY, 0);
    maxY = Math.max(maxY, 0);
  }

  const span = Math.max(2, maxY - minY);
  const paddedMinY = minY - span * 0.2;
  const paddedMaxY = maxY + span * 0.2;

  function mapX(value: number) {
    return (
      plot.x +
      ((value - state.interval.start) / (state.interval.end - state.interval.start)) * plot.w
    );
  }
  function mapY(value: number) {
    return plot.y + plot.h - ((value - paddedMinY) / (paddedMaxY - paddedMinY)) * plot.h;
  }

  // Grid lines
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(255,255,255,0.07)";
  const tickStep = Math.PI / 2;
  const firstTick = Math.ceil(state.interval.start / tickStep) * tickStep;
  for (let t = firstTick; t <= state.interval.end + EPS; t += tickStep) {
    const x = mapX(t);
    ctx.beginPath();
    ctx.moveTo(x, plot.y);
    ctx.lineTo(x, plot.y + plot.h);
    ctx.stroke();
  }
  for (let n = 0; n <= 4; n++) {
    const y = plot.y + (plot.h * n) / 4;
    ctx.beginPath();
    ctx.moveTo(plot.x, y);
    ctx.lineTo(plot.x + plot.w, y);
    ctx.stroke();
  }

  // Axis
  const axisY = mapY(0);
  ctx.strokeStyle = "rgba(143,215,255,0.24)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(plot.x, axisY);
  ctx.lineTo(plot.x + plot.w, axisY);
  ctx.stroke();

  // Target line
  const targetY = mapY(state.target);
  ctx.save();
  ctx.setLineDash([7, 6]);
  ctx.strokeStyle = "rgba(121,223,184,0.9)";
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(plot.x, targetY);
  ctx.lineTo(plot.x + plot.w, targetY);
  ctx.stroke();
  ctx.restore();

  ctx.fillStyle = "rgba(255,216,187,0.9)";
  ctx.font = "600 12px Public Sans, sans-serif";
  ctx.fillText(
    state.mode === "homogeneous" ? "y=0" : "y=c",
    plot.x + plot.w - 44,
    targetY - 10,
  );

  // Function curve
  ctx.strokeStyle = "rgba(255,140,92,0.95)";
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  xs.forEach((x, index) => {
    const px = mapX(x);
    const py = mapY(ys[index]);
    if (index === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });
  ctx.stroke();

  // X labels
  ctx.fillStyle = "#79dfb8";
  ctx.font = "500 11px Public Sans, sans-serif";
  for (let t = firstTick; t <= state.interval.end + EPS; t += tickStep) {
    const label = angleToLabel(t);
    const x = mapX(t);
    ctx.fillText(label, x - ctx.measureText(label).width / 2, plot.y + plot.h + 16);
  }

  if (state.allReal) {
    ctx.fillStyle = "rgba(255,140,92,0.12)";
    roundedRect(ctx, plot.x, plot.y, plot.w, plot.h, 14);
    ctx.fill();
  }

  // Solution dots on curve
  if (state.intervalSolutions.length) {
    ctx.fillStyle = "#ff9c6d";
    ctx.strokeStyle = "rgba(255,156,109,0.35)";
    ctx.lineWidth = 1.5;
    ctx.font = "600 11px Public Sans, sans-serif";
    state.intervalSolutions.forEach((solution, index) => {
      const px = mapX(solution);
      const py = mapY(state.fn(solution));
      ctx.beginPath();
      ctx.arc(px, py, 5.5, 0, TAU);
      ctx.fill();
      ctx.fillText(
        angleToLabel(solution),
        px + 8,
        py - 8 + (index % 2) * 12,
      );
    });
  } else {
    ctx.fillStyle = "#ffb278";
    ctx.font = "600 14px Public Sans, sans-serif";
    ctx.fillText(
      "Na izabranom intervalu nema preseka sa ciljnom vrednošću.",
      topBox.x + 18,
      topBox.y + topBox.h - 18,
    );
  }

  // Interval panel (bottom)
  const bottomBox = {
    x: 14,
    y: topBox.y + topBox.h + 14,
    w: width - 28,
    h: height - topBox.h - 42,
  };

  roundedRect(ctx, bottomBox.x, bottomBox.y, bottomBox.w, bottomBox.h, 16);
  ctx.fillStyle = "rgba(255,255,255,0.025)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.06)";
  ctx.stroke();

  ctx.fillStyle = "#f1e2d7";
  ctx.font = "700 14px Public Sans, sans-serif";
  ctx.fillText("Rešenja na realnoj osi", bottomBox.x + 16, bottomBox.y + 24);

  const bAxisY = bottomBox.y + bottomBox.h * 0.58;
  const leftX = bottomBox.x + 26;
  const rightX = bottomBox.x + bottomBox.w - 26;
  const bWidth = rightX - leftX;

  function xMap(value: number) {
    return (
      leftX + ((value - state.interval.start) / (state.interval.end - state.interval.start)) * bWidth
    );
  }

  ctx.strokeStyle = "rgba(143,215,255,0.3)";
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(leftX, bAxisY);
  ctx.lineTo(rightX, bAxisY);
  ctx.stroke();

  const step = Math.PI / 2;
  const beginTick = Math.ceil(state.interval.start / step) * step;
  ctx.fillStyle = "rgba(255,216,187,0.82)";
  ctx.font = "500 11px Public Sans, sans-serif";
  for (let t = beginTick; t <= state.interval.end + EPS; t += step) {
    const x = xMap(t);
    ctx.beginPath();
    ctx.moveTo(x, bAxisY - 8);
    ctx.lineTo(x, bAxisY + 8);
    ctx.strokeStyle = "rgba(255,255,255,0.14)";
    ctx.stroke();
    const label = angleToLabel(t);
    ctx.fillText(label, x - ctx.measureText(label).width / 2, bAxisY + 24);
  }

  ctx.fillStyle = "#ff9c6d";
  ctx.font = "600 12px Public Sans, sans-serif";
  if (state.allReal) {
    ctx.strokeStyle = "#ff9c6d";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(leftX, bAxisY);
    ctx.lineTo(rightX, bAxisY);
    ctx.stroke();
    ctx.fillText("Svaka tačka na intervalu je rešenje.", bottomBox.x + 18, bottomBox.y + bottomBox.h - 18);
    return;
  }

  if (!state.intervalSolutions.length) {
    ctx.fillText("Nema realnih rešenja u izabranom intervalu.", bottomBox.x + 18, bottomBox.y + bottomBox.h - 18);
    return;
  }

  state.intervalSolutions.forEach((value, index) => {
    const x = xMap(value);
    ctx.beginPath();
    ctx.arc(x, bAxisY, 6, 0, TAU);
    ctx.fill();
    const label = angleToLabel(value);
    const yOffset = index % 2 === 0 ? -14 : -28;
    ctx.fillText(label, x - ctx.measureText(label).width / 2, bAxisY + yOffset);
  });
}

/* ─── Presets ─── */

interface Preset {
  label: string;
  mode: Mode;
  c1: number;
  c2: number;
  c3: number;
}

const PRESETS: Preset[] = [
  { label: "2s\u00B2-3sc+c\u00B2", mode: "homogeneous", c1: 2, c2: -3, c3: 1 },
  { label: "sc-c\u00B2", mode: "homogeneous", c1: 0, c2: 1, c3: -1 },
  { label: "s\u00B2+c\u00B2", mode: "homogeneous", c1: 1, c2: 0, c3: 1 },
  { label: "sin+cos=1", mode: "linear", c1: 1, c2: 1, c3: 1 },
  { label: "3sin+4cos=5", mode: "linear", c1: 3, c2: 4, c3: 5 },
  { label: "2sin-2cos=1", mode: "linear", c1: 2, c2: -2, c3: 1 },
];

const INTERVALS = [
  { label: "[0, 2\u03C0]", value: "0," + String(TAU) },
  { label: "[-\u03C0, \u03C0]", value: String(-Math.PI) + "," + String(Math.PI) },
  { label: "[0, 4\u03C0]", value: "0," + String(TAU * 2) },
];

const MODE_LABELS: Record<Mode, [string, string, string]> = {
  homogeneous: ["A uz sin\u00B2x", "B uz sinx cosx", "C uz cos\u00B2x"],
  linear: ["a uz sin x", "b uz cos x", "c desna strana"],
};

const MODE_DEFAULTS: Record<Mode, [number, number, number]> = {
  homogeneous: [2, -3, 1],
  linear: [1, 1, 1],
};

/* ─── Component ─── */

export default function TrigEquationLab() {
  const [mode, setMode] = useState<Mode>("homogeneous");
  const [c1, setC1] = useState(2);
  const [c2, setC2] = useState(-3);
  const [c3, setC3] = useState(1);
  const [intervalStr, setIntervalStr] = useState(INTERVALS[0].value);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const parseInterval = useCallback((): Interval => {
    const [start, end] = intervalStr.split(",").map(Number);
    return { start, end };
  }, [intervalStr]);

  const getState = useCallback(() => {
    const interval = parseInterval();
    return mode === "homogeneous"
      ? solveHomogeneous(c1, c2, c3, interval)
      : solveLinear(c1, c2, c3, interval);
  }, [mode, c1, c2, c3, parseInterval]);

  const draw = useCallback(() => {
    if (!canvasRef.current) return;
    drawCanvas(canvasRef.current, getState());
  }, [getState]);

  useEffect(() => {
    draw();
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [draw]);

  const state = getState();
  const labels = MODE_LABELS[mode];

  function applyPreset(p: Preset) {
    setMode(p.mode);
    setC1(p.c1);
    setC2(p.c2);
    setC3(p.c3);
  }

  function handleModeChange(newMode: Mode) {
    setMode(newMode);
    const defs = MODE_DEFAULTS[newMode];
    setC1(defs[0]);
    setC2(defs[1]);
    setC3(defs[2]);
  }

  return (
    <div className={s.interactiveShell}>
      {/* Controls */}
      <article className={s.interactiveCard}>
        <h3 className={cs.tCardTitle}>Podešavanja</h3>

        <div className={s.controlGrid}>
          <div className={s.field}>
            <label>Režim laboratorije</label>
            <select
              value={mode}
              onChange={(e) => handleModeChange(e.target.value as Mode)}
            >
              <option value="homogeneous">Homogena jednačina</option>
              <option value="linear">Linearna jednačina</option>
            </select>
          </div>

          <div className={s.field}>
            <label>Interval</label>
            <select
              value={intervalStr}
              onChange={(e) => setIntervalStr(e.target.value)}
            >
              {INTERVALS.map((iv) => (
                <option key={iv.value} value={iv.value}>
                  {iv.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={s.rangeWrap}>
          <label>
            {labels[0]}: <strong>{c1}</strong>
          </label>
          <input
            type="range"
            min={-4}
            max={4}
            step={1}
            value={c1}
            onChange={(e) => setC1(Number(e.target.value))}
          />
        </div>
        <div className={s.rangeWrap}>
          <label>
            {labels[1]}: <strong>{c2}</strong>
          </label>
          <input
            type="range"
            min={-4}
            max={4}
            step={1}
            value={c2}
            onChange={(e) => setC2(Number(e.target.value))}
          />
        </div>
        <div className={s.rangeWrap}>
          <label>
            {labels[2]}: <strong>{c3}</strong>
          </label>
          <input
            type="range"
            min={-4}
            max={4}
            step={1}
            value={c3}
            onChange={(e) => setC3(Number(e.target.value))}
          />
        </div>

        <div style={{ marginTop: 14 }}>
          <label className={cs.tLabel}>Brzi primeri</label>
          <div className={cs.presetRow}>
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
        </div>
      </article>

      {/* Canvas + outputs */}
      <div>
        <div className={s.canvasWrap}>
          <canvas
            ref={canvasRef}
            className={s.polarCanvas}
            aria-label="Interaktivni prikaz složenijih trigonometrijskih jednačina"
          />
        </div>

        <div className={s.resultsGrid}>
          <div className={s.resultCard}>
            <strong>Jednačina</strong>
            <MathBlock dynamic>{state.equationTex}</MathBlock>
            <p style={{ color: "var(--lesson-muted)", fontSize: "0.9rem" }}>
              {state.recognition}
            </p>
          </div>
          <div className={s.resultCard}>
            <strong>Transformacija</strong>
            <MathBlock dynamic>{state.transformTex.replace(/\\\[|\\\]/g, "")}</MathBlock>
            <p style={{ color: "var(--lesson-muted)", fontSize: "0.9rem" }}>
              {state.transformNote}
            </p>
          </div>
          <div className={s.resultCard}>
            <strong>Opšte rešenje</strong>
            <MathBlock dynamic>{state.generalTex.replace(/\\\[|\\\]/g, "")}</MathBlock>
            <p style={{ color: "var(--lesson-muted)", fontSize: "0.9rem" }}>
              {state.periodNote}
            </p>
          </div>
          <div className={s.resultCard}>
            <strong>Rešenja u intervalu</strong>
            <MathBlock dynamic>{state.intervalTex.replace(/\\\[|\\\]/g, "")}</MathBlock>
            <p style={{ color: "var(--lesson-muted)", fontSize: "0.9rem" }}>
              {state.countNote} {state.sumNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
