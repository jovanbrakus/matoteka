"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";
import { MathJax } from "better-react-mathjax";

/* ──────────────────── helpers ──────────────────── */

const X_MIN = -8;
const X_MAX = 8;

type Relation = "le" | "eq" | "ge";

interface LabData {
  a: number;
  b: number;
  c: number;
  p: number;
  q: number;
  sum: number;
  middle: number;
  relation: Relation;
}

interface SolveResult {
  kind: string;
  latex: string;
  explanation: string;
  strategy: string;
  intervals?: {
    start: number;
    end: number;
    closedStart: boolean;
    closedEnd: boolean;
  }[];
}

function latexNumber(value: number): string {
  const doubled = Math.round(value * 2);
  if (Math.abs(value * 2 - doubled) < 1e-9) {
    if (doubled % 2 === 0) return String(doubled / 2);
    const sign = doubled < 0 ? "-" : "";
    return `${sign}\\frac{${Math.abs(doubled)}}{2}`;
  }
  return value
    .toFixed(2)
    .replace(/\.00$/, "")
    .replace(/(\.\d)0$/, "$1");
}

function plainNumber(value: number): string {
  const doubled = Math.round(value * 2);
  if (Math.abs(value * 2 - doubled) < 1e-9) {
    return doubled % 2 === 0 ? String(doubled / 2) : String(doubled / 2);
  }
  return value
    .toFixed(2)
    .replace(/\.00$/, "")
    .replace(/(\.\d)0$/, "$1");
}

function linearLatex(coef: number, constant: number): string {
  let out = "";
  if (coef === 1) out = "x";
  else if (coef === -1) out = "-x";
  else out = `${coef}x`;
  if (constant > 0) out += ` + ${latexNumber(constant)}`;
  else if (constant < 0) out += ` - ${latexNumber(Math.abs(constant))}`;
  return out;
}

function intervalLatex(
  start: number,
  end: number,
  closedStart: boolean,
  closedEnd: boolean
): string {
  const lb = closedStart ? "[" : "(";
  const rb = closedEnd ? "]" : ")";
  const l = start === -Infinity ? "-\\infty" : latexNumber(start);
  const r = end === Infinity ? "+\\infty" : latexNumber(end);
  return `${lb}${l},\\, ${r}${rb}`;
}

function solve(data: LabData): SolveResult {
  const eps = 1e-9;
  const leftPoint = (data.sum - data.c) / 2;
  const rightPoint = (data.sum + data.c) / 2;

  if (data.relation === "le") {
    if (data.c < data.middle - eps) {
      return {
        kind: "empty",
        latex: "x \\in \\varnothing",
        explanation:
          "Horizontala je ispod minimalne vrednosti funkcije, pa nema rešenja.",
        strategy:
          "Za relaciju \\(\\le\\) horizontala mora biti bar na nivou platoa.",
      };
    }
    return {
      kind: "interval",
      intervals: [
        {
          start: leftPoint,
          end: rightPoint,
          closedStart: true,
          closedEnd: true,
        },
      ],
      latex: `x \\in ${intervalLatex(leftPoint, rightPoint, true, true)}`,
      explanation:
        "Rešenje je zatvoren interval između preseka horizontale sa grafikom.",
      strategy:
        "Kada je c veće ili jednako od platoa q-p, rešenje je centralni pojas.",
    };
  }

  if (data.relation === "eq") {
    if (data.c < data.middle - eps) {
      return {
        kind: "empty",
        latex: "x \\in \\varnothing",
        explanation: "Horizontala ne seče grafik, pa jednačina nema rešenja.",
        strategy: "Za jednakost mora da postoji stvarni presek.",
      };
    }
    if (Math.abs(data.c - data.middle) <= eps) {
      if (data.p === data.q) {
        return {
          kind: "point",
          intervals: [
            {
              start: data.p,
              end: data.p,
              closedStart: true,
              closedEnd: true,
            },
          ],
          latex: `x = ${latexNumber(data.p)}`,
          explanation:
            "Prelomne tačke se poklapaju, pa postoji samo jedno rešenje.",
          strategy: "Kada je p=q, plato je jedna tačka.",
        };
      }
      return {
        kind: "plateau",
        intervals: [
          {
            start: data.p,
            end: data.q,
            closedStart: true,
            closedEnd: true,
          },
        ],
        latex: `x \\in ${intervalLatex(data.p, data.q, true, true)}`,
        explanation:
          "Horizontala dodiruje ceo plato, pa jednačina ima beskonačno mnogo rešenja.",
        strategy:
          "Jednačina sa apsolutnim vrednostima ne mora dati samo dve tačke.",
      };
    }
    return {
      kind: "two-points",
      intervals: [
        {
          start: leftPoint,
          end: leftPoint,
          closedStart: true,
          closedEnd: true,
        },
        {
          start: rightPoint,
          end: rightPoint,
          closedStart: true,
          closedEnd: true,
        },
      ],
      latex: `x \\in \\left\\{ ${latexNumber(leftPoint)},\\, ${latexNumber(rightPoint)} \\right\\}`,
      explanation:
        "Horizontala seče grafik u dve tačke, na levom i desnom kraku.",
      strategy:
        "Iznad platoa obično dobijaš dva simetrična preseka.",
    };
  }

  /* ge */
  if (data.c <= data.middle + eps) {
    return {
      kind: "all",
      latex: "x \\in \\mathbb{R}",
      explanation:
        "Minimalna vrednost funkcije je već veća ili jednaka od c, pa važi za svaki realan broj.",
      strategy:
        "Ako je prag ispod ili na nivou platoa, cela realna prava je rešenje.",
    };
  }

  return {
    kind: "rays",
    intervals: [
      {
        start: -Infinity,
        end: leftPoint,
        closedStart: false,
        closedEnd: true,
      },
      {
        start: rightPoint,
        end: Infinity,
        closedStart: true,
        closedEnd: false,
      },
    ],
    latex: `x \\in ${intervalLatex(-Infinity, leftPoint, false, true)} \\cup ${intervalLatex(rightPoint, Infinity, true, false)}`,
    explanation:
      "Srednji deo ne zadovoljava uslov, pa ostaju dva spoljašnja kraka.",
    strategy:
      "Za relaciju \\(\\ge\\) sa većim pragom dobijaš uniju dva poluprava.",
  };
}

/* ──────────────────── canvas draw ──────────────────── */

function drawCanvas(
  canvas: HTMLCanvasElement,
  data: LabData,
  solved: SolveResult
) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = rect.width || 960;
  const height = rect.height || 420;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const paddingX = 44;
  const graphTop = 22;
  const graphBottom = height - 132;
  const lineY = height - 54;
  const chartHeight = graphBottom - graphTop;

  const f = (x: number) => Math.abs(x - data.a) + Math.abs(x - data.b);
  const yMax = Math.max(f(X_MIN), f(X_MAX), data.c, data.middle) + 2;

  const toScreenX = (x: number) =>
    paddingX + ((x - X_MIN) / (X_MAX - X_MIN)) * (width - 2 * paddingX);
  const toScreenY = (y: number) =>
    graphBottom - (y / yMax) * chartHeight;

  const drawText = (
    text: string,
    x: number,
    y: number,
    color: string,
    align: CanvasTextAlign = "left",
    font = "12px Public Sans"
  ) => {
    ctx.save();
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textAlign = align;
    ctx.fillText(text, x, y);
    ctx.restore();
  };

  /* background */
  ctx.fillStyle = "rgba(255,255,255,0.015)";
  ctx.fillRect(0, 0, width, height);

  /* grid lines y */
  for (let y = 0; y <= yMax; y += 2) {
    const sy = toScreenY(y);
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(paddingX, sy);
    ctx.lineTo(width - paddingX, sy);
    ctx.stroke();
    drawText(
      String(y),
      paddingX - 10,
      sy + 4,
      "rgba(255,255,255,0.38)",
      "right"
    );
  }

  /* grid lines x */
  for (let x = X_MIN; x <= X_MAX; x += 1) {
    const sx = toScreenX(x);
    ctx.strokeStyle =
      x === 0 ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.045)";
    ctx.beginPath();
    ctx.moveTo(sx, graphTop);
    ctx.lineTo(sx, graphBottom);
    ctx.stroke();
    if (x < X_MAX) {
      drawText(
        String(x),
        sx,
        lineY + 24,
        "rgba(255,255,255,0.42)",
        "center"
      );
    }
  }

  /* graph vertices */
  const vertices = [X_MIN, data.p, data.q, X_MAX]
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort((a, b) => a - b)
    .map((x) => ({ x, y: f(x) }));

  /* c horizontal */
  ctx.strokeStyle = "rgba(136,216,255,0.85)";
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 6]);
  ctx.beginPath();
  ctx.moveTo(paddingX, toScreenY(data.c));
  ctx.lineTo(width - paddingX, toScreenY(data.c));
  ctx.stroke();
  ctx.setLineDash([]);
  drawText(
    `y = c = ${plainNumber(data.c)}`,
    width - paddingX,
    toScreenY(data.c) - 8,
    "rgba(136,216,255,0.9)",
    "right"
  );

  /* f(x) line */
  ctx.strokeStyle = "#ec5b13";
  ctx.lineWidth = 4;
  ctx.beginPath();
  vertices.forEach((pt, i) => {
    const sx = toScreenX(pt.x);
    const sy = toScreenY(pt.y);
    if (i === 0) ctx.moveTo(sx, sy);
    else ctx.lineTo(sx, sy);
  });
  ctx.stroke();

  /* area under f */
  ctx.fillStyle = "rgba(236,91,19,0.14)";
  ctx.beginPath();
  vertices.forEach((pt, i) => {
    const sx = toScreenX(pt.x);
    const sy = toScreenY(pt.y);
    if (i === 0) {
      ctx.moveTo(sx, graphBottom);
      ctx.lineTo(sx, sy);
    } else {
      ctx.lineTo(sx, sy);
    }
  });
  ctx.lineTo(toScreenX(vertices[vertices.length - 1].x), graphBottom);
  ctx.closePath();
  ctx.fill();

  /* breakpoint markers */
  const markBreakpoint = (x: number, label: string, color: string) => {
    const sx = toScreenX(x);
    ctx.setLineDash([5, 6]);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(sx, graphTop);
    ctx.lineTo(sx, lineY + 8);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(sx, lineY, 5.5, 0, Math.PI * 2);
    ctx.fill();
    drawText(label, sx, lineY - 12, color, "center", "700 12px Public Sans");
  };

  markBreakpoint(data.a, `a=${plainNumber(data.a)}`, "#ec5b13");
  if (data.b !== data.a) {
    markBreakpoint(data.b, `b=${plainNumber(data.b)}`, "#88d8ff");
  }

  /* number line */
  ctx.strokeStyle = "rgba(255,255,255,0.36)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(paddingX, lineY);
  ctx.lineTo(width - paddingX, lineY);
  ctx.stroke();
  drawText(
    "Skup rešenja",
    paddingX,
    lineY - 16,
    "rgba(255,255,255,0.55)"
  );

  /* solution segments */
  const drawSegment = (start: number, end: number) => {
    const sx = start === -Infinity ? paddingX : toScreenX(start);
    const ex = end === Infinity ? width - paddingX : toScreenX(end);
    ctx.strokeStyle = "rgba(236,91,19,0.95)";
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(sx, lineY);
    ctx.lineTo(ex, lineY);
    ctx.stroke();
  };

  if (solved.kind === "all") {
    drawSegment(-Infinity, Infinity);
  } else if (solved.intervals) {
    solved.intervals.forEach((iv) => {
      if (
        iv.start === iv.end &&
        iv.start !== -Infinity &&
        iv.end !== Infinity
      ) {
        const sx = toScreenX(iv.start);
        ctx.fillStyle = "#ffd7b9";
        ctx.beginPath();
        ctx.arc(sx, lineY, 7.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#ec5b13";
        ctx.lineWidth = 3;
        ctx.stroke();
      } else {
        drawSegment(iv.start, iv.end);
        if (iv.end !== Infinity) {
          const ex = toScreenX(iv.end);
          ctx.fillStyle = "#ffd7b9";
          ctx.beginPath();
          ctx.arc(ex, lineY, 5.5, 0, Math.PI * 2);
          ctx.fill();
        }
        if (iv.start !== -Infinity) {
          const sx = toScreenX(iv.start);
          ctx.fillStyle = "#ffd7b9";
          ctx.beginPath();
          ctx.arc(sx, lineY, 5.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    });
  }

  /* labels */
  const relSymbol =
    data.relation === "le"
      ? "<="
      : data.relation === "eq"
        ? "="
        : ">=";
  drawText(
    `f(x) = |x-a| + |x-b| ${relSymbol} ${plainNumber(data.c)}`,
    paddingX,
    graphTop + 14,
    "rgba(255,255,255,0.76)"
  );
  drawText(
    `min f = q - p = ${plainNumber(data.middle)}`,
    width - paddingX,
    graphTop + 14,
    "rgba(255,215,185,0.88)",
    "right"
  );
}

/* ──────────────────── Component ──────────────────── */

export default function AbsValueLab() {
  const [a, setA] = useState(-2);
  const [b, setB] = useState(3);
  const [c, setC] = useState(6);
  const [relation, setRelation] = useState<Relation>("le");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  const p = Math.min(a, b);
  const q = Math.max(a, b);
  const sum = p + q;
  const middle = q - p;

  const data: LabData = { a, b, c, p, q, sum, middle, relation };
  const solved = solve(data);

  const render = useCallback(() => {
    if (!canvasRef.current) return;
    drawCanvas(canvasRef.current, data, solved);
  }, [a, b, c, relation]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frameRef.current);
  }, [render]);

  useEffect(() => {
    const handleResize = () => {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(render);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [render]);

  /* piecewise display */
  const leftCaseLatex = `x < ${latexNumber(p)}:\\; f(x) = ${linearLatex(-2, sum)}`;
  const middleCaseLatex =
    p === q
      ? `x = ${latexNumber(p)}:\\; f(x) = 0`
      : `${latexNumber(p)} \\le x \\le ${latexNumber(q)}:\\; f(x) = ${latexNumber(middle)}`;
  const rightCaseLatex = `x > ${latexNumber(q)}:\\; f(x) = ${linearLatex(2, -sum)}`;

  const breakpointLatex = `p = ${latexNumber(p)},\\; q = ${latexNumber(q)}`;
  const middleHintText =
    p === q
      ? `Pošto je p=q, srednji deo se svodi na jednu tačku, a minimalna vrednost je 0.`
      : `Minimalna vrednost funkcije je q\u2212p = ${plainNumber(middle)}, i postiže se na celom segmentu [${plainNumber(p)}, ${plainNumber(q)}].`;

  const relLabel =
    relation === "le" ? "\u2264" : relation === "eq" ? "=" : "\u2265";

  return (
    <div className={s.interactiveShell}>
      {/* ── Controls panel ── */}
      <article className={s.interactiveCard} style={{ padding: 22 }}>
        <h3 className={cs.tCardTitle}>Podesi parametre</h3>

        <div className={s.rangeWrap}>
          <label>
            Tačka <MathJax inline>{"\\(a\\)"}</MathJax>{" "}
            <span style={{ color: "var(--lesson-primary-soft)" }}>
              {plainNumber(a)}
            </span>
          </label>
          <input
            type="range"
            min={-6}
            max={6}
            step={1}
            value={a}
            onChange={(e) => setA(Number(e.target.value))}
          />
        </div>

        <div className={s.rangeWrap}>
          <label>
            Tačka <MathJax inline>{"\\(b\\)"}</MathJax>{" "}
            <span style={{ color: "var(--lesson-primary-soft)" }}>
              {plainNumber(b)}
            </span>
          </label>
          <input
            type="range"
            min={-6}
            max={6}
            step={1}
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
          />
        </div>

        <div className={s.rangeWrap}>
          <label>
            Vrednost <MathJax inline>{"\\(c\\)"}</MathJax>{" "}
            <span style={{ color: "var(--lesson-primary-soft)" }}>
              {plainNumber(c)}
            </span>
          </label>
          <input
            type="range"
            min={0}
            max={12}
            step={1}
            value={c}
            onChange={(e) => setC(Number(e.target.value))}
          />
        </div>

        <div className={s.rangeWrap}>
          <label>
            Relacija{" "}
            <span style={{ color: "var(--lesson-primary-soft)" }}>
              {relLabel}
            </span>
          </label>
          <select
            value={relation}
            onChange={(e) => setRelation(e.target.value as Relation)}
            style={{
              width: "100%",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(9,4,3,0.9)",
              color: "var(--lesson-muted-strong)",
              padding: "10px 12px",
              font: "inherit",
            }}
          >
            <option value="le">{"\u2264"}</option>
            <option value="eq">=</option>
            <option value="ge">{"\u2265"}</option>
          </select>
        </div>

        {/* Piecewise cases */}
        <div
          className={s.labNote}
          style={{ marginTop: 16, background: "rgba(236,91,19,0.07)" }}
        >
          <p style={{ fontWeight: 700, marginBottom: 6 }}>Levi interval</p>
          <MathJax dynamic>{`\\(${leftCaseLatex}\\)`}</MathJax>
        </div>
        <div
          className={s.labNote}
          style={{ marginTop: 10, background: "rgba(236,91,19,0.07)" }}
        >
          <p style={{ fontWeight: 700, marginBottom: 6 }}>Srednji interval</p>
          <MathJax dynamic>{`\\(${middleCaseLatex}\\)`}</MathJax>
        </div>
        <div
          className={s.labNote}
          style={{ marginTop: 10, background: "rgba(236,91,19,0.07)" }}
        >
          <p style={{ fontWeight: 700, marginBottom: 6 }}>Desni interval</p>
          <MathJax dynamic>{`\\(${rightCaseLatex}\\)`}</MathJax>
        </div>
      </article>

      {/* ── Canvas panel ── */}
      <article className={s.interactiveCard} style={{ padding: 22 }}>
        <h3 className={cs.tCardTitle}>
          Grafik i skup rešenja
        </h3>
        <p>
          Narandžasta linija je{" "}
          <MathJax inline>{"\\(f(x)\\)"}</MathJax>, plava horizontala je{" "}
          <MathJax inline>{"\\(y=c\\)"}</MathJax>, a osenčeni deo na
          brojnoj pravoj su rešenja.
        </p>

        <div className={s.canvasWrap} style={{ marginTop: 16 }}>
          <canvas
            ref={canvasRef}
            className={s.polarCanvas}
            style={{ aspectRatio: "16 / 10" }}
            aria-label="Interaktivni grafik apsolutne vrednosti"
          />
        </div>

        {/* Solution box */}
        <div
          style={{
            marginTop: 16,
            padding: 16,
            borderRadius: 20,
            background:
              "linear-gradient(145deg, rgba(236,91,19,0.12), rgba(136,216,255,0.08))",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h4 className={cs.tCardTitle} style={{ marginBottom: 8 }}>
            Rezultat
          </h4>
          <div style={{ color: "var(--lesson-muted-strong)", minHeight: 42 }}>
            <MathJax dynamic>{`\\[${solved.latex}\\]`}</MathJax>
          </div>
          <p style={{ marginTop: 8 }}>{solved.explanation}</p>
        </div>

        {/* Hints */}
        <div
          className={s.labNote}
          style={{ marginTop: 16, background: "rgba(236,91,19,0.06)" }}
        >
          Prelomne tačke:{" "}
          <MathJax inline dynamic>{`\\(${breakpointLatex}\\)`}</MathJax>.
        </div>
        <div
          className={s.labNote}
          style={{ marginTop: 10, background: "rgba(236,91,19,0.06)" }}
        >
          {middleHintText}
        </div>
        <div
          className={s.labNote}
          style={{ marginTop: 10, background: "rgba(236,91,19,0.06)" }}
        >
          {solved.strategy}
        </div>
      </article>
    </div>
  );
}
