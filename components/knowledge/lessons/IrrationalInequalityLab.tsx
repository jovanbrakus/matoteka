"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import InlineMath from "@/components/knowledge/InlineMath";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

/* ── Interval helpers ── */
const EPS = 1e-9;

interface Interval {
  left: number;
  right: number;
  openLeft: boolean;
  openRight: boolean;
}

function iv(
  left: number,
  right: number,
  openLeft: boolean,
  openRight: boolean
): Interval {
  return { left, right, openLeft, openRight };
}

function isEmpty(i: Interval) {
  if (i.left > i.right + EPS) return true;
  if (Math.abs(i.left - i.right) < EPS && (i.openLeft || i.openRight))
    return true;
  return false;
}

function normalize(intervals: (Interval | null)[]): Interval[] {
  const filtered = (intervals.filter(Boolean) as Interval[])
    .filter((i) => !isEmpty(i))
    .sort((a, b) => a.left - b.left);
  if (!filtered.length) return [];
  const merged = [{ ...filtered[0] }];
  for (let i = 1; i < filtered.length; i++) {
    const cur = filtered[i];
    const last = merged[merged.length - 1];
    const touching = Math.abs(cur.left - last.right) < EPS;
    const overlapping = cur.left < last.right - EPS;
    const connected =
      overlapping || (touching && (!cur.openLeft || !last.openRight));
    if (!connected) {
      merged.push({ ...cur });
      continue;
    }
    if (cur.right > last.right + EPS) {
      last.right = cur.right;
      last.openRight = cur.openRight;
    } else if (Math.abs(cur.right - last.right) < EPS) {
      last.openRight = last.openRight && cur.openRight;
    }
  }
  return merged;
}

function intersectTwo(a: Interval, b: Interval): Interval | null {
  const left = Math.max(a.left, b.left);
  const right = Math.min(a.right, b.right);
  let oL: boolean;
  if (Math.abs(left - a.left) < EPS && Math.abs(left - b.left) < EPS)
    oL = a.openLeft || b.openLeft;
  else oL = Math.abs(left - a.left) < EPS ? a.openLeft : b.openLeft;
  let oR: boolean;
  if (Math.abs(right - a.right) < EPS && Math.abs(right - b.right) < EPS)
    oR = a.openRight || b.openRight;
  else oR = Math.abs(right - a.right) < EPS ? a.openRight : b.openRight;
  const r = iv(left, right, oL, oR);
  return isEmpty(r) ? null : r;
}

function intersectSets(a: Interval[], b: Interval[]): Interval[] {
  const out: Interval[] = [];
  a.forEach((x) =>
    b.forEach((y) => {
      const r = intersectTwo(x, y);
      if (r) out.push(r);
    })
  );
  return normalize(out);
}

function unionSets(a: Interval[], b: Interval[]): Interval[] {
  return normalize([...a, ...b]);
}

/* ── Domain / branch logic ── */

function fmt(v: number) {
  if (Math.abs(v - Math.round(v)) < EPS) return String(Math.round(v));
  return v.toFixed(2).replace(/\.00$/, "").replace(/(\.\d*[1-9])0+$/, "$1");
}

function fmtLinear(off: number) {
  if (Math.abs(off) < EPS) return "x";
  return off > 0 ? `x+${fmt(off)}` : `x-${fmt(Math.abs(off))}`;
}

function valToLatex(v: number) {
  if (v === Infinity) return "\\infty";
  if (v === -Infinity) return "-\\infty";
  return fmt(v);
}

function setToLatex(intervals: Interval[]) {
  if (!intervals.length) return "\\varnothing";
  return intervals
    .map(
      (i) =>
        `${i.openLeft ? "(" : "["}${valToLatex(i.left)},\\ ${valToLatex(i.right)}${i.openRight ? ")" : "]"}`
    )
    .join(" \\cup ");
}

function setToPlain(intervals: Interval[]) {
  if (!intervals.length) return "\u2205";
  return intervals
    .map(
      (i) =>
        `${i.openLeft ? "(" : "["}${valToLatex(i.left)}, ${valToLatex(i.right)}${i.openRight ? ")" : "]"}`
    )
    .join(" \u222a ")
    .replace(/\\infty/g, "\u221e");
}

type Op = ">=" | ">" | "<=" | "<";

function domainSet(p: number): Interval[] {
  return [iv(-p, Infinity, false, true)];
}

function signSet(op: Op, q: number): Interval[] {
  if (op === ">=" || op === ">") return [iv(-q, Infinity, false, true)];
  if (op === "<=") return [iv(-q, Infinity, false, true)];
  return [iv(-q, Infinity, true, true)];
}

function autoBranch(op: Op, p: number, q: number): Interval[] {
  const domain = domainSet(p);
  if (op === ">=" || op === ">")
    return intersectSets(domain, [iv(-Infinity, -q, true, true)]);
  return [];
}

function quadBranch(op: Op, p: number, q: number) {
  const D = 4 * (p - q) + 1;
  const rootsExist = D >= -EPS;
  const sqrtD = rootsExist ? Math.sqrt(Math.max(D, 0)) : null;
  const r1 = sqrtD !== null ? ((1 - 2 * q) - sqrtD) / 2 : null;
  const r2 = sqrtD !== null ? ((1 - 2 * q) + sqrtD) / 2 : null;
  let base: Interval[] = [];

  if (op === ">=") {
    if (!rootsExist) base = [];
    else if (Math.abs(D) < EPS) base = [iv(r1!, r1!, false, false)];
    else base = [iv(r1!, r2!, false, false)];
  } else if (op === ">") {
    if (!rootsExist || Math.abs(D) < EPS) base = [];
    else base = [iv(r1!, r2!, true, true)];
  } else if (op === "<=") {
    if (!rootsExist) base = [iv(-Infinity, Infinity, true, true)];
    else if (Math.abs(D) < EPS) base = [iv(-Infinity, Infinity, true, true)];
    else base = [iv(-Infinity, r1!, true, false), iv(r2!, Infinity, false, true)];
  } else {
    if (!rootsExist) base = [iv(-Infinity, Infinity, true, true)];
    else if (Math.abs(D) < EPS) base = [iv(-Infinity, r1!, true, true), iv(r1!, Infinity, true, true)];
    else base = [iv(-Infinity, r1!, true, true), iv(r2!, Infinity, true, true)];
  }

  return {
    set: normalize(base),
    discriminant: D,
    roots: rootsExist && r1 !== null && r2 !== null ? [r1, r2] as [number, number] : null,
  };
}

function branch2Set(op: Op, p: number, q: number) {
  const domain = domainSet(p);
  const sign = signSet(op, q);
  const qd = quadBranch(op, p, q);
  return {
    intervals: intersectSets(intersectSets(domain, sign), qd.set),
    discriminant: qd.discriminant,
    roots: qd.roots,
  };
}

function finalSet(op: Op, p: number, q: number): Interval[] {
  const first = autoBranch(op, p, q);
  const second = branch2Set(op, p, q).intervals;
  return unionSets(first, second);
}

/* ── Canvas drawing ── */

interface ThemePalette {
  bg: string;
  grid: string;
  axis: string;
  axisLabel: string;
  solutionShade: string;
  solutionColor: string;
  domainLine: string;
  domainLabel: string;
  sqrtCurve: string;
  lineCurve: string;
  sqrtLabel: string;
  lineLabel: string;
  solutionLabel: string;
  tickMark: string;
  tickLabel: string;
  hintText: string;
  openCircleBg: string;
}

function getTheme(): ThemePalette {
  const isLight = document.documentElement.classList.contains("light");
  return {
    bg: isLight ? "rgba(245, 240, 235, 0.95)" : "rgba(8, 4, 3, 0.95)",
    grid: isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)",
    axis: isLight ? "rgba(0,0,0,0.24)" : "rgba(255,255,255,0.24)",
    axisLabel: isLight ? "rgba(42, 36, 32, 0.8)" : "rgba(246, 238, 233, 0.8)",
    solutionShade: isLight ? "rgba(26, 158, 110, 0.08)" : "rgba(116, 223, 183, 0.08)",
    solutionColor: isLight ? "#1a9e6e" : "#74dfb7",
    domainLine: isLight ? "rgba(200, 130, 50, 0.95)" : "rgba(255, 195, 127, 0.95)",
    domainLabel: isLight ? "#a06820" : "#ffc37f",
    sqrtCurve: isLight ? "#d94e0a" : "#ff9a6a",
    lineCurve: isLight ? "#2e8ebf" : "#8ed7ff",
    sqrtLabel: isLight ? "#d94e0a" : "#ff9a6a",
    lineLabel: isLight ? "#2e8ebf" : "#8ed7ff",
    solutionLabel: isLight ? "#1a9e6e" : "#74dfb7",
    tickMark: isLight ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.18)",
    tickLabel: isLight ? "rgba(42, 36, 32, 0.72)" : "rgba(246, 238, 233, 0.72)",
    hintText: isLight ? "rgba(42, 36, 32, 0.8)" : "rgba(246, 238, 233, 0.8)",
    openCircleBg: isLight ? "#f5f0eb" : "#090403",
  };
}

const VIEWPORT = { minX: -10, maxX: 10, minY: -6, maxY: 8 };

function xToCanvas(x: number, w: number) {
  return ((x - VIEWPORT.minX) / (VIEWPORT.maxX - VIEWPORT.minX)) * w;
}
function yToCanvas(y: number, h: number) {
  return h - ((y - VIEWPORT.minY) / (VIEWPORT.maxY - VIEWPORT.minY)) * h;
}

function setupCanvas(canvas: HTMLCanvasElement) {
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.round(rect.width * ratio);
  canvas.height = Math.round(rect.height * ratio);
  const ctx = canvas.getContext("2d")!;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  return { ctx, width: rect.width, height: rect.height };
}

function drawIntervals(
  ctx: CanvasRenderingContext2D,
  w: number,
  y: number,
  intervals: Interval[],
  color: string,
  openCircleBg: string
) {
  intervals.forEach((item) => {
    const l = Math.max(item.left, VIEWPORT.minX);
    const r = Math.min(item.right, VIEWPORT.maxX);
    if (r < VIEWPORT.minX || l > VIEWPORT.maxX) return;
    const x1 = xToCanvas(l, w);
    const x2 = xToCanvas(r, w);
    ctx.strokeStyle = color;
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x1, y);
    ctx.lineTo(x2, y);
    ctx.stroke();

    if (item.left !== -Infinity && item.left >= VIEWPORT.minX - EPS && item.left <= VIEWPORT.maxX + EPS) {
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x1, y, 6, 0, Math.PI * 2);
      if (item.openLeft) {
        ctx.fillStyle = openCircleBg;
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.stroke();
      } else {
        ctx.fillStyle = color;
        ctx.fill();
      }
    }
    if (item.right !== Infinity && item.right >= VIEWPORT.minX - EPS && item.right <= VIEWPORT.maxX + EPS) {
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x2, y, 6, 0, Math.PI * 2);
      if (item.openRight) {
        ctx.fillStyle = openCircleBg;
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.stroke();
      } else {
        ctx.fillStyle = color;
        ctx.fill();
      }
    }
  });
}

function drawGraph(
  canvas: HTMLCanvasElement,
  op: Op,
  p: number,
  q: number,
  solution: Interval[],
  theme: ThemePalette
) {
  const { ctx, width, height } = setupCanvas(canvas);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = theme.bg;
  ctx.fillRect(0, 0, width, height);

  solution.forEach((item) => {
    const l = Math.max(item.left, VIEWPORT.minX);
    const r = Math.min(item.right, VIEWPORT.maxX);
    if (r <= VIEWPORT.minX || l >= VIEWPORT.maxX) return;
    ctx.fillStyle = theme.solutionShade;
    ctx.fillRect(xToCanvas(l, width), 0, xToCanvas(r, width) - xToCanvas(l, width), height);
  });

  ctx.strokeStyle = theme.grid;
  ctx.lineWidth = 1;
  for (let x = Math.ceil(VIEWPORT.minX); x <= VIEWPORT.maxX; x++) {
    const px = xToCanvas(x, width);
    ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px, height); ctx.stroke();
  }
  for (let y = Math.ceil(VIEWPORT.minY); y <= VIEWPORT.maxY; y++) {
    const py = yToCanvas(y, height);
    ctx.beginPath(); ctx.moveTo(0, py); ctx.lineTo(width, py); ctx.stroke();
  }

  const axisX = yToCanvas(0, height);
  const axisY = xToCanvas(0, width);
  ctx.strokeStyle = theme.axis;
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(0, axisX); ctx.lineTo(width, axisX); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(axisY, 0); ctx.lineTo(axisY, height); ctx.stroke();

  const domainStart = -p;
  if (domainStart >= VIEWPORT.minX && domainStart <= VIEWPORT.maxX) {
    const dx = xToCanvas(domainStart, width);
    ctx.strokeStyle = theme.domainLine;
    ctx.setLineDash([7, 6]);
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(dx, 0); ctx.lineTo(dx, height); ctx.stroke();
    ctx.setLineDash([]);
  }

  // sqrt curve
  ctx.lineWidth = 3;
  ctx.strokeStyle = theme.sqrtCurve;
  ctx.beginPath();
  let started = false;
  for (let x = VIEWPORT.minX; x <= VIEWPORT.maxX; x += 0.02) {
    const rad = x + p;
    if (rad < 0) { started = false; continue; }
    const yv = Math.sqrt(rad);
    const px = xToCanvas(x, width);
    const py = yToCanvas(yv, height);
    if (!started) { ctx.moveTo(px, py); started = true; }
    else ctx.lineTo(px, py);
  }
  ctx.stroke();

  // line
  ctx.strokeStyle = theme.lineCurve;
  ctx.beginPath();
  started = false;
  for (let x = VIEWPORT.minX; x <= VIEWPORT.maxX; x += 0.02) {
    const yv = x + q;
    const px = xToCanvas(x, width);
    const py = yToCanvas(yv, height);
    if (!started) { ctx.moveTo(px, py); started = true; }
    else ctx.lineTo(px, py);
  }
  ctx.stroke();

  // labels
  ctx.fillStyle = theme.axisLabel;
  ctx.font = '12px "Public Sans", system-ui, sans-serif';
  ctx.fillText("x", width - 18, axisX - 8);
  ctx.fillText("y", axisY + 10, 14);
  ctx.fillStyle = theme.domainLabel;
  ctx.fillText(`domena pocinje od x=${fmt(domainStart)}`, 18, 24);
  ctx.fillStyle = theme.sqrtLabel;
  ctx.fillText(`y=sqrt(${fmtLinear(p)})`, 18, 44);
  ctx.fillStyle = theme.lineLabel;
  ctx.fillText(`y=${fmtLinear(q)}`, 18, 64);
  ctx.fillStyle = theme.solutionLabel;
  ctx.fillText(`resenje za znak ${op}`, 18, 84);
}

function drawLine(
  canvas: HTMLCanvasElement,
  solution: Interval[],
  theme: ThemePalette
) {
  const { ctx, width, height } = setupCanvas(canvas);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = theme.bg;
  ctx.fillRect(0, 0, width, height);

  const y = height / 2;
  ctx.strokeStyle = theme.axis;
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(24, y); ctx.lineTo(width - 24, y); ctx.stroke();

  for (let x = Math.ceil(VIEWPORT.minX); x <= VIEWPORT.maxX; x++) {
    const px = xToCanvas(x, width);
    ctx.strokeStyle = theme.tickMark;
    ctx.lineWidth = 1.3;
    ctx.beginPath(); ctx.moveTo(px, y - 12); ctx.lineTo(px, y + 12); ctx.stroke();
    ctx.fillStyle = theme.tickLabel;
    ctx.font = '12px "Public Sans", system-ui, sans-serif';
    ctx.fillText(String(x), px - 8, y + 30);
  }

  drawIntervals(ctx, width, y, solution, theme.solutionColor, theme.openCircleBg);
  ctx.fillStyle = theme.hintText;
  ctx.font = '12px "Public Sans", system-ui, sans-serif';
  ctx.fillText("Brojevna prava: obojen je skup resenja u prikazanom prozoru.", 18, 24);
}

/* ── Preset definitions ── */
const PRESETS: Record<string, { p: number; q: number; op: Op }> = {
  classic: { p: 1, q: -1, op: ">=" },
  strict: { p: 4, q: 2, op: "<" },
  wide: { p: 6, q: -2, op: ">" },
  impossible: { p: -1, q: -4, op: "<=" },
};

/* ══════════════════════════════════════════════════════════════════════
   React component
   ══════════════════════════════════════════════════════════════════════ */

export default function IrrationalInequalityLab() {
  const graphRef = useRef<HTMLCanvasElement>(null);
  const lineRef = useRef<HTMLCanvasElement>(null);

  const [p, setP] = useState(1);
  const [q, setQ] = useState(-1);
  const [op, setOp] = useState<Op>(">=");
  const [activePreset, setActivePreset] = useState<string | null>("classic");

  const paint = useCallback(() => {
    if (!graphRef.current || !lineRef.current) return;
    const theme = getTheme();
    const sol = finalSet(op, p, q);
    drawGraph(graphRef.current, op, p, q, sol, theme);
    drawLine(lineRef.current, sol, theme);
  }, [op, p, q]);

  useEffect(() => {
    paint();
    const onResize = () => paint();
    window.addEventListener("resize", onResize);
    const observer = new MutationObserver(() => paint());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => { window.removeEventListener("resize", onResize); observer.disconnect(); };
  }, [paint]);

  /* derived data for text readouts */
  const domain = domainSet(p);
  const firstBranch = autoBranch(op, p, q);
  const secondData = branch2Set(op, p, q);
  const solution = unionSets(firstBranch, secondData.intervals);

  const rad = fmtLinear(p);
  const line = fmtLinear(q);

  const isGtType = op === ">=" || op === ">";

  /* branch 1 description */
  let branch1Latex: string;
  let branch1Note: string;
  if (isGtType) {
    branch1Latex = `\\begin{cases} ${rad}\\ge 0 \\\\ ${line}<0 \\end{cases}`;
    branch1Note = firstBranch.length
      ? `Ovde je nejednacina automatski tacna. Ova grana daje ${setToPlain(firstBranch)}.`
      : "Ova automatski tacna grana je prazna za izabrane parametre.";
  } else {
    if (op === "<=") {
      branch1Latex = `${line}<0 \\Rightarrow \\sqrt{${rad}}\\le ${line}\\ \\text{nema resenja}`;
    } else {
      branch1Latex = `${line}\\le 0 \\Rightarrow \\sqrt{${rad}}< ${line}\\ \\text{nema resenja}`;
    }
    branch1Note = "Kod znakova < i <= negativna ili nepozitivna desna strana ne pomaze, nego iskljucuje resenja.";
  }

  /* branch 2 description */
  const signCond = op === "<" ? `${line}>0` : `${line}\\ge 0`;
  const sqSign = op === ">=" ? "\\ge" : op === ">" ? ">" : op === "<=" ? "\\le" : "<";
  const branch2Latex = `\\begin{cases} ${rad}\\ge 0 \\\\ ${signCond} \\\\ ${rad} ${sqSign} (${line})^2 \\end{cases}`;
  let branch2Note = `U ovoj grani resavas odnos ${rad} ${op} (${line})^2 uz uslove domene i znaka desne strane.`;
  if (secondData.roots) {
    branch2Note += ` D=${fmt(secondData.discriminant)}, karakteristicne tacke su priblizno ${fmt(secondData.roots[0])} i ${fmt(secondData.roots[1])}.`;
  } else {
    branch2Note += ` D=${fmt(secondData.discriminant)}, pa kvadratna grana nema realne nule.`;
  }
  branch2Note += ` Ova grana daje ${setToPlain(secondData.intervals)}.`;

  function applyPreset(name: string) {
    const pr = PRESETS[name];
    setP(pr.p);
    setQ(pr.q);
    setOp(pr.op);
    setActivePreset(name);
  }

  function handleP(v: number) {
    setP(v);
    setActivePreset(null);
  }
  function handleQ(v: number) {
    setQ(v);
    setActivePreset(null);
  }
  function handleOp(v: Op) {
    setOp(v);
    setActivePreset(null);
  }

  return (
    <div className={s.interactiveShell}>
      {/* controls */}
      <div>
        <div className={s.controlGrid}>
          <div className={s.interactiveCard} style={{ padding: 18 }}>
            <div className={s.rangeWrap}>
              <label>Pomeraj radikanda</label>
              <strong>
                <InlineMath dynamic>{`p=${fmt(p)}`}</InlineMath>
              </strong>
              <input
                type="range"
                min={-6}
                max={6}
                step={1}
                value={p}
                onChange={(e) => handleP(Number(e.target.value))}
              />
            </div>
            <p style={{ marginTop: 8 }}>
              Model koristi <InlineMath dynamic>{`\\sqrt{${fmtLinear(p)}}`}</InlineMath>. Veci{" "}
              <InlineMath>{"p"}</InlineMath> pomera pocetak domene ulevo.
            </p>
          </div>

          <div className={s.interactiveCard} style={{ padding: 18 }}>
            <div className={s.rangeWrap}>
              <label>Pomeraj prave</label>
              <strong>
                <InlineMath dynamic>{`q=${fmt(q)}`}</InlineMath>
              </strong>
              <input
                type="range"
                min={-6}
                max={6}
                step={1}
                value={q}
                onChange={(e) => handleQ(Number(e.target.value))}
              />
            </div>
            <p style={{ marginTop: 8 }}>
              Desna strana je <InlineMath dynamic>{fmtLinear(q)}</InlineMath>. Njena nula
              odredjuje gde se logika zadatka lomi.
            </p>
          </div>

          <div className={s.interactiveCard} style={{ padding: 18 }}>
            <div className={s.field}>
              <label>Znak nejednakosti</label>
              <select value={op} onChange={(e) => handleOp(e.target.value as Op)}>
                <option value=">=">{"\u221a"}(x+p) {"\u2265"} x+q</option>
                <option value=">">{"\u221a"}(x+p) {">"} x+q</option>
                <option value="<=">{"\u221a"}(x+p) {"\u2264"} x+q</option>
                <option value="<">{"\u221a"}(x+p) {"<"} x+q</option>
              </select>
            </div>
            <p style={{ marginTop: 8 }}>
              Menjaj znak i posmatraj kako negativna desna strana prelazi iz
              pomoci u prepreku.
            </p>
          </div>

          <div className={s.interactiveCard} style={{ padding: 18 }}>
            <label style={{ display: "block", fontSize: "0.88rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--lesson-primary-soft)", fontWeight: 700, marginBottom: 10 }}>Brzi primeri</label>
            <div className={cs.presetRow}>
              {(["classic", "strict", "wide", "impossible"] as const).map(
                (name) => (
                  <button
                    key={name}
                    className={s.presetBtn}
                    style={
                      activePreset === name
                        ? { background: "rgba(236, 91, 19, 0.22)", borderColor: "rgba(255,154,106,0.32)" }
                        : undefined
                    }
                    onClick={() => applyPreset(name)}
                  >
                    {name === "classic" && "Klasicna zamka"}
                    {name === "strict" && "Strogo manje"}
                    {name === "wide" && "Siroka domena"}
                    {name === "impossible" && "Skoro nemoguce"}
                  </button>
                )
              )}
            </div>
            <p style={{ marginTop: 8 }}>
              Preseti sluze da brzo vidis razlicite tipove zadataka i nacin
              grananja.
            </p>
          </div>
        </div>

        {/* result cards */}
        <div className={s.resultsGrid} style={{ marginTop: 14 }}>
          <div className={s.resultCard}>
            <strong>Domena</strong>
            <InlineMath dynamic>{`x\\ge ${fmt(-p)}`}</InlineMath>
            <p style={{ color: "var(--lesson-muted)", marginTop: 6, fontSize: "0.92rem" }}>
              Radikand je {rad}, pa koren postoji od x={fmt(-p)} nadesno.
            </p>
          </div>
          <div className={s.resultCard}>
            <strong>Prva grana</strong>
            <InlineMath dynamic>{branch1Latex}</InlineMath>
            <p style={{ color: "var(--lesson-muted)", marginTop: 6, fontSize: "0.92rem" }}>
              {branch1Note}
            </p>
          </div>
          <div className={s.resultCard}>
            <strong>Druga grana</strong>
            <InlineMath dynamic>{branch2Latex}</InlineMath>
            <p style={{ color: "var(--lesson-muted)", marginTop: 6, fontSize: "0.92rem" }}>
              {branch2Note}
            </p>
          </div>
          <div
            className={s.resultCard}
            style={{
              background: "rgba(236, 91, 19, 0.12)",
              borderColor: "rgba(255,154,106,0.22)",
            }}
          >
            <strong>Skup resenja</strong>
            <InlineMath dynamic>{setToLatex(solution)}</InlineMath>
            <p style={{ color: "var(--lesson-muted)", marginTop: 6, fontSize: "0.92rem" }}>
              Konacno resenje dobijes kao uniju prve i druge grane.
            </p>
          </div>
        </div>
      </div>

      {/* canvases */}
      <div>
        <div className={s.canvasWrap}>
          <canvas
            ref={graphRef}
            className={s.polarCanvas}
            style={{ aspectRatio: "760 / 420" }}
          />
        </div>
        <div className={s.canvasWrap} style={{ marginTop: 12 }}>
          <canvas
            ref={lineRef}
            className={s.polarCanvas}
            style={{ aspectRatio: "760 / 170" }}
          />
        </div>
        <p
          style={{
            marginTop: 10,
            fontSize: "0.92rem",
            color: "var(--lesson-muted)",
          }}
        >
          Napomena: ova laboratorija resava tacno model{" "}
          <InlineMath>{"\\sqrt{x+p}\\,\\square\\,(x+q)"}</InlineMath>. Za opsti
          oblik{" "}
          <InlineMath>{"\\sqrt{A(x)}\\,\\square\\,B(x)"}</InlineMath> koristi
          istu logiku, ali racun u drugoj grani moze biti slozeniji.
        </p>
      </div>
    </div>
  );
}
