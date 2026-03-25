"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { MathJax } from "better-react-mathjax";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

/* ── Helpers ── */

const EPS = 1e-9;

function fmt(value: number): string {
  let n = Number(value);
  if (!Number.isFinite(n)) return "0";
  if (Math.abs(n) < EPS) n = 0;
  if (Math.abs(n - Math.round(n)) < EPS) return String(Math.round(n));
  return n
    .toFixed(2)
    .replace(/\.00$/, "")
    .replace(/(\.\d*[1-9])0+$/, "$1");
}

function evaluate(a: number, b: number, c: number, x: number): number {
  return a * x * x + b * x + c;
}

function discriminant(a: number, b: number, c: number): number {
  return b * b - 4 * a * c;
}

function getRoots(
  a: number,
  b: number,
  c: number
): number[] {
  const delta = discriminant(a, b, c);
  if (delta < -EPS) return [];
  if (Math.abs(delta) <= EPS) return [-b / (2 * a)];
  const sqrtD = Math.sqrt(delta);
  const x1 = (-b - sqrtD) / (2 * a);
  const x2 = (-b + sqrtD) / (2 * a);
  return [Math.min(x1, x2), Math.max(x1, x2)];
}

type Relation = "gt" | "ge" | "lt" | "le";

function compare(value: number, relation: Relation): boolean {
  if (relation === "gt") return value > EPS;
  if (relation === "ge") return value >= -EPS;
  if (relation === "lt") return value < -EPS;
  return value <= EPS;
}

function interval(
  left: number,
  right: number,
  leftClosed: boolean,
  rightClosed: boolean
): string {
  const lb = leftClosed ? "[" : "(";
  const rb = rightClosed ? "]" : ")";
  const lt = left === -Infinity ? "-\\infty" : fmt(left);
  const rt = right === Infinity ? "\\infty" : fmt(right);
  return `${lb}${lt},\\,${rt}${rb}`;
}

function singleton(value: number): string {
  return `\\{${fmt(value)}\\}`;
}

function outsideInterval(x1: number, x2: number, closed: boolean): string {
  return `${interval(-Infinity, x1, false, closed)} \\cup ${interval(x2, Infinity, closed, false)}`;
}

function insideInterval(x1: number, x2: number, closed: boolean): string {
  return interval(x1, x2, closed, closed);
}

function complementOfPoint(x0: number): string {
  return `${interval(-Infinity, x0, false, false)} \\cup ${interval(x0, Infinity, false, false)}`;
}

function solutionSetLatex(
  a: number,
  b: number,
  c: number,
  relation: Relation
): string {
  const delta = discriminant(a, b, c);

  if (delta < -EPS) {
    const ok =
      (a > 0 && (relation === "gt" || relation === "ge")) ||
      (a < 0 && (relation === "lt" || relation === "le"));
    return ok ? "\\mathbb{R}" : "\\varnothing";
  }

  if (Math.abs(delta) <= EPS) {
    const x0 = -b / (2 * a);
    if (a > 0) {
      if (relation === "gt") return complementOfPoint(x0);
      if (relation === "ge") return "\\mathbb{R}";
      if (relation === "lt") return "\\varnothing";
      return singleton(x0);
    }
    if (relation === "gt") return "\\varnothing";
    if (relation === "ge") return singleton(x0);
    if (relation === "lt") return complementOfPoint(x0);
    return "\\mathbb{R}";
  }

  const [x1, x2] = getRoots(a, b, c);

  if (a > 0) {
    if (relation === "gt") return outsideInterval(x1, x2, false);
    if (relation === "ge") return outsideInterval(x1, x2, true);
    if (relation === "lt") return insideInterval(x1, x2, false);
    return insideInterval(x1, x2, true);
  }

  if (relation === "gt") return insideInterval(x1, x2, false);
  if (relation === "ge") return insideInterval(x1, x2, true);
  if (relation === "lt") return outsideInterval(x1, x2, false);
  return outsideInterval(x1, x2, true);
}

function rootsDescription(a: number, b: number, c: number): string {
  const delta = discriminant(a, b, c);
  if (delta < -EPS) return "Nema realnih nula.";
  const roots = getRoots(a, b, c);
  if (roots.length === 1) return `x\\u2080 = ${fmt(roots[0])}`;
  return `x_1 \\approx ${fmt(roots[0])},\\quad x_2 \\approx ${fmt(roots[1])}`;
}

function signComment(
  a: number,
  b: number,
  c: number,
  relation: Relation
): string {
  const delta = discriminant(a, b, c);

  if (delta < -EPS) {
    if (a > 0)
      return relation === "gt" || relation === "ge"
        ? "Parabola je otvorena navi\u0161e i nema realnih nula, pa je ceo grafik iznad x-ose."
        : "Parabola je otvorena navi\u0161e i nema realnih nula, zato strogo ili nestrogo negativnih vrednosti nema.";
    return relation === "lt" || relation === "le"
      ? "Parabola je otvorena nani\u017Ee i nema realnih nula, pa je ceo grafik ispod x-ose."
      : "Parabola je otvorena nani\u017Ee i nema realnih nula, zato pozitivnih vrednosti nema.";
  }

  if (Math.abs(delta) <= EPS) {
    return a > 0
      ? "Parabola dodiruje x-osu odozgo: nenegativna je za svaki x, a jednaka nuli samo u jednoj ta\u010Dki."
      : "Parabola dodiruje x-osu odozdo: nepozitivna je za svaki x, a jednaka nuli samo u jednoj ta\u010Dki.";
  }

  if (a > 0) {
    return relation === "gt" || relation === "ge"
      ? "Parabola je otvorena navi\u0161e i se\u010De x-osu u dve ta\u010Dke, pa je pozitivna spolja, a negativna izme\u0111u nula."
      : "Parabola je otvorena navi\u0161e i se\u010De x-osu u dve ta\u010Dke, pa je negativna izme\u0111u nula.";
  }

  return relation === "gt" || relation === "ge"
    ? "Parabola je otvorena nani\u017Ee i se\u010De x-osu u dve ta\u010Dke, pa je pozitivna izme\u0111u nula."
    : "Parabola je otvorena nani\u017Ee i se\u010De x-osu u dve ta\u010Dke, pa je negativna spolja.";
}

function parameterComment(a: number, b: number, c: number): string {
  const delta = discriminant(a, b, c);
  if (delta < -EPS && a > 0)
    return 'Ovo je model \u201Euvek pozitivno\u201C: uslovi a > 0 i \u0394 < 0 su ispunjeni.';
  if (Math.abs(delta) <= EPS && a > 0)
    return 'Ovo je model \u201Euvek nenegativno\u201C: parabola dodiruje x-osu, pa za strogo > 0 otpada jedna ta\u010Dka.';
  if (delta < -EPS && a < 0)
    return 'Ovo je model \u201Euvek negativno\u201C: uslovi a < 0 i \u0394 < 0 su ispunjeni.';
  if (Math.abs(delta) <= EPS && a < 0)
    return 'Ovo je model \u201Euvek nepozitivno\u201C: cela parabola je ispod ili na x-osi.';
  return "Po\u0161to postoje dve realne nule, ovaj trinom menja znak i zato ne mo\u017Ee biti svuda istog strogog znaka.";
}

function relationSymbol(rel: Relation): string {
  return { gt: ">", ge: "\u2265", lt: "<", le: "\u2264" }[rel];
}

/* ── Presets ── */

interface Preset {
  label: string;
  a: number;
  b: number;
  c: number;
  rel: Relation;
}

const PRESETS: Preset[] = [
  { label: "Dve nule", a: 1, b: -5, c: 6, rel: "gt" },
  { label: "a < 0", a: -1, b: 1, c: 2, rel: "le" },
  { label: "\u0394 < 0", a: 1, b: 4, c: 5, rel: "ge" },
  { label: "\u0394 = 0", a: 1, b: -6, c: 9, rel: "le" },
];

/* ── Canvas ── */

function niceStep(range: number): number {
  const rough = range / 6 || 1;
  const base = Math.pow(10, Math.floor(Math.log10(Math.abs(rough))));
  const norm = Math.abs(rough) / base;
  if (norm < 1.5) return base;
  if (norm < 3.5) return 2 * base;
  if (norm < 7.5) return 5 * base;
  return 10 * base;
}

function draw(
  canvas: HTMLCanvasElement,
  a: number,
  b: number,
  c: number,
  relation: Relation
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const width = Math.max(320, Math.floor(rect.width));
  const height = Math.max(320, Math.floor(rect.height || 430));
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  ctx.fillStyle = "#0c0503";
  ctx.fillRect(0, 0, width, height);

  const xMin = -6;
  const xMax = 6;
  const plotLeft = 56;
  const plotRight = width - 24;
  const plotTop = 22;
  const plotBottom = height - 86;
  const plotWidth = plotRight - plotLeft;
  const plotHeight = plotBottom - plotTop;

  const samples: number[] = [];
  for (let i = 0; i <= 400; i++) {
    const x = xMin + (i / 400) * (xMax - xMin);
    samples.push(evaluate(a, b, c, x));
  }
  const xVertex = -b / (2 * a);
  const yVertex = evaluate(a, b, c, xVertex);
  samples.push(0, yVertex);

  let yMin = Math.min(...samples);
  let yMax = Math.max(...samples);
  if (Math.abs(yMax - yMin) < 4) {
    yMax += 2;
    yMin -= 2;
  }
  const padding = (yMax - yMin) * 0.18;
  yMax += padding;
  yMin -= padding;

  const sx = (x: number) =>
    plotLeft + ((x - xMin) / (xMax - xMin)) * plotWidth;
  const sy = (y: number) =>
    plotBottom - ((y - yMin) / (yMax - yMin)) * plotHeight;

  /* grid */
  ctx.strokeStyle = "rgba(255,255,255,0.06)";
  ctx.lineWidth = 1;
  for (let x = Math.ceil(xMin); x <= xMax; x++) {
    const px = sx(x);
    ctx.beginPath();
    ctx.moveTo(px, plotTop);
    ctx.lineTo(px, plotBottom);
    ctx.stroke();
  }

  const stepY = niceStep(yMax - yMin);
  const startY = Math.ceil(yMin / stepY) * stepY;
  for (let y = startY; y <= yMax + EPS; y += stepY) {
    const py = sy(y);
    ctx.beginPath();
    ctx.moveTo(plotLeft, py);
    ctx.lineTo(plotRight, py);
    ctx.stroke();
  }

  /* axes */
  if (0 >= xMin && 0 <= xMax) {
    ctx.strokeStyle = "rgba(255, 215, 185, 0.45)";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(sx(0), plotTop);
    ctx.lineTo(sx(0), plotBottom);
    ctx.stroke();
  }
  if (0 >= yMin && 0 <= yMax) {
    ctx.strokeStyle = "rgba(255, 215, 185, 0.45)";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(plotLeft, sy(0));
    ctx.lineTo(plotRight, sy(0));
    ctx.stroke();
  }

  /* vertex dashed line */
  ctx.strokeStyle = "rgba(255, 154, 106, 0.26)";
  ctx.setLineDash([6, 6]);
  if (xVertex >= xMin && xVertex <= xMax) {
    ctx.beginPath();
    ctx.moveTo(sx(xVertex), plotTop);
    ctx.lineTo(sx(xVertex), plotBottom);
    ctx.stroke();
  }
  ctx.setLineDash([]);

  /* parabola */
  ctx.strokeStyle = "#ec5b13";
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let i = 0; i <= 400; i++) {
    const x = xMin + (i / 400) * (xMax - xMin);
    const y = evaluate(a, b, c, x);
    if (i === 0) ctx.moveTo(sx(x), sy(y));
    else ctx.lineTo(sx(x), sy(y));
  }
  ctx.stroke();

  /* vertex point */
  if (xVertex >= xMin && xVertex <= xMax) {
    ctx.fillStyle = "#ffc37f";
    ctx.beginPath();
    ctx.arc(sx(xVertex), sy(yVertex), 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255, 215, 185, 0.92)";
    ctx.font = '600 12px "Public Sans", sans-serif';
    ctx.fillText(
      `T(${fmt(xVertex)}, ${fmt(yVertex)})`,
      sx(xVertex) + 10,
      sy(yVertex) - 10
    );
  }

  /* roots */
  const roots = getRoots(a, b, c);
  roots.forEach((root, idx) => {
    if (root < xMin || root > xMax) return;
    ctx.fillStyle = "#8ed7ff";
    ctx.beginPath();
    ctx.arc(sx(root), sy(0), 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(142, 215, 255, 0.96)";
    ctx.font = '600 12px "Public Sans", sans-serif';
    ctx.fillText(
      `x${idx + 1}\u2248${fmt(root)}`,
      sx(root) + 8,
      sy(0) - 12
    );
  });

  /* solution band */
  const bandTop = height - 42;
  const bandHeight = 18;
  ctx.fillStyle = "rgba(255,255,255,0.04)";
  ctx.fillRect(plotLeft, bandTop, plotWidth, bandHeight);
  ctx.strokeStyle = "rgba(255, 154, 106, 0.2)";
  ctx.strokeRect(plotLeft, bandTop, plotWidth, bandHeight);

  ctx.fillStyle = "#ec5b13";
  for (let px = plotLeft; px < plotRight; px++) {
    const x = xMin + ((px - plotLeft) / plotWidth) * (xMax - xMin);
    if (compare(evaluate(a, b, c, x), relation)) {
      ctx.fillRect(px, bandTop, 1, bandHeight);
    }
  }

  const rootIncluded = relation === "ge" || relation === "le";
  roots.forEach((root) => {
    if (root < xMin || root > xMax) return;
    const px = sx(root);
    ctx.beginPath();
    ctx.arc(px, bandTop + bandHeight / 2, 5, 0, Math.PI * 2);
    if (rootIncluded) {
      ctx.fillStyle = "#ffd7b9";
      ctx.fill();
    } else {
      ctx.fillStyle = "#0c0503";
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#ffd7b9";
      ctx.stroke();
    }
  });

  /* labels */
  ctx.fillStyle = "rgba(246, 238, 233, 0.9)";
  ctx.font = '600 12px "Public Sans", sans-serif';
  ctx.fillText("Re\u0161enje na brojevnoj pravoj", plotLeft, bandTop - 10);

  const sign = relationSymbol(relation);
  ctx.fillText(
    `Nejednacina: ${fmt(a)}x\u00B2 ${b >= 0 ? "+" : "\u2212"} ${fmt(Math.abs(b))}x ${c >= 0 ? "+" : "\u2212"} ${fmt(Math.abs(c))} ${sign} 0`,
    plotLeft,
    plotTop + 14
  );

  ctx.fillStyle = "rgba(246, 238, 233, 0.55)";
  ctx.font = '500 11px "Public Sans", sans-serif';
  for (let x = Math.ceil(xMin); x <= xMax; x++) {
    ctx.fillText(String(x), sx(x) - 4, plotBottom + 18);
  }
}

/* ── Component ── */

export default function QuadraticInequalityLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [aVal, setA] = useState(1);
  const [bVal, setB] = useState(-5);
  const [cVal, setC] = useState(6);
  const [rel, setRel] = useState<Relation>("gt");

  const a = aVal === 0 ? 1 : aVal;
  const delta = discriminant(a, bVal, cVal);
  const safeDelta = Math.abs(delta) < EPS ? 0 : delta;

  const paint = useCallback(() => {
    if (!canvasRef.current) return;
    draw(canvasRef.current, a, bVal, cVal, rel);
  }, [a, bVal, cVal, rel]);

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
    setRel(p.rel);
  };

  const solLatex = solutionSetLatex(a, bVal, cVal, rel);
  const rootsDesc = rootsDescription(a, bVal, cVal);
  const signDesc = signComment(a, bVal, cVal, rel);
  const paramDesc = parameterComment(a, bVal, cVal);

  return (
    <>
      <div className={s.interactiveShell}>
        {/* Controls */}
        <div>
          <article className={s.interactiveCard} style={{ padding: 22 }}>
            <div className={cs.tLabel}>Pode\u0161avanje modela</div>
            <h3 className={cs.tCardTitle}>Trenutna nejednacina</h3>

            <div className={s.mathBlock} style={{ textAlign: "center" }}>
              <MathJax dynamic>{`\\(${fmt(a)}x^2 ${bVal >= 0 ? "+" : "-"} ${fmt(Math.abs(bVal))}x ${cVal >= 0 ? "+" : "-"} ${fmt(Math.abs(cVal))} ${rel === "gt" ? ">" : rel === "ge" ? "\\ge" : rel === "lt" ? "<" : "\\le"} 0\\)`}</MathJax>
            </div>

            <div className={s.field} style={{ marginTop: 16 }}>
              <label>Koeficijent a</label>
              <select
                value={aVal}
                onChange={(e) => setA(Number(e.target.value))}
              >
                {[-4, -3, -2, -1, 1, 2, 3, 4].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            <div className={s.rangeWrap}>
              <label>
                Koeficijent b:{" "}
                <span style={{ color: "var(--lesson-accent)" }}>{bVal}</span>
              </label>
              <input
                type="range"
                min={-8}
                max={8}
                step={1}
                value={bVal}
                onChange={(e) => setB(Number(e.target.value))}
              />
            </div>

            <div className={s.rangeWrap}>
              <label>
                Koeficijent c:{" "}
                <span style={{ color: "var(--lesson-accent)" }}>{cVal}</span>
              </label>
              <input
                type="range"
                min={-8}
                max={8}
                step={1}
                value={cVal}
                onChange={(e) => setC(Number(e.target.value))}
              />
            </div>

            <div className={s.field} style={{ marginTop: 12 }}>
              <label>Znak nejednakosti</label>
              <select
                value={rel}
                onChange={(e) => setRel(e.target.value as Relation)}
              >
                <option value="gt">&gt; 0</option>
                <option value="ge">{"\u2265"} 0</option>
                <option value="lt">&lt; 0</option>
                <option value="le">{"\u2264"} 0</option>
              </select>
            </div>

            <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  className={s.presetBtn}
                  type="button"
                  onClick={() => applyPreset(p)}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </article>

          <article
            className={s.interactiveCard}
            style={{ padding: 22, marginTop: 18 }}
          >
            <div className={cs.tLabel}>Kako da citas laboratoriju</div>
            <h3 className={cs.tCardTitle}>Sta vidis na slici</h3>
            <ul style={{ paddingLeft: 18, marginTop: 8 }}>
              <li style={{ color: "var(--lesson-muted)" }}>
                Narandzasta kriva je parabola y = ax{"\u00B2"} + bx + c.
              </li>
              <li style={{ color: "var(--lesson-muted)" }}>
                Plave tacke su realne nule, a zuta tacka je teme parabole.
              </li>
              <li style={{ color: "var(--lesson-muted)" }}>
                Narandzasti pojas pri dnu canvasa pokazuje gde je nejednacina
                ispunjena na brojevnoj pravoj.
              </li>
            </ul>
          </article>
        </div>

        {/* Canvas */}
        <div>
          <article className={s.interactiveCard} style={{ padding: 22 }}>
            <div className={cs.tLabel}>Canvas prikaz</div>
            <h3 className={cs.tCardTitle}>
              Parabola i skup re\u0161enja u istoj slici
            </h3>
            <p style={{ color: "var(--lesson-muted)", marginBottom: 12 }}>
              Za dobru intuiciju gledaj istovremeno gde je parabola u odnosu na
              x-osu i koje delove brojevne prave boji narandzasti pojas.
            </p>
            <div className={s.canvasWrap}>
              <canvas
                ref={canvasRef}
                className={s.polarCanvas}
                style={{ aspectRatio: "16 / 10", minHeight: 400 }}
                aria-label="Interaktivni prikaz kvadratne nejednacine"
              />
            </div>
            <p
              style={{
                color: "var(--lesson-muted)",
                fontSize: "0.88rem",
                marginTop: 10,
              }}
            >
              Prazan narandzasti pojas znaci da nejednacina nema resenja.
              Popunjen pojas od ivice do ivice znaci da je resenje ceo R.
            </p>
          </article>
        </div>
      </div>

      {/* Results grid */}
      <div className={s.resultsGrid} style={{ marginTop: 18 }}>
        <article className={s.resultCard}>
          <strong>Diskriminanta</strong>
          <MathJax dynamic>{`\\(\\Delta = ${fmt(safeDelta)}\\)`}</MathJax>
        </article>
        <article className={s.resultCard}>
          <strong>Realne nule</strong>
          <MathJax dynamic>{`\\(${rootsDesc}\\)`}</MathJax>
        </article>
        <article className={s.resultCard}>
          <strong>Skup re\u0161enja</strong>
          <MathJax dynamic>{`\\(S = ${solLatex}\\)`}</MathJax>
        </article>
        <article className={s.resultCard}>
          <strong>Tuma\u010Denje</strong>
          <p style={{ color: "var(--lesson-muted)", fontSize: "0.92rem" }}>
            {signDesc}
          </p>
        </article>
      </div>

      <div className={s.resultsGrid} style={{ marginTop: 12 }}>
        <article className={s.resultCard} style={{ gridColumn: "1 / -1" }}>
          <strong>Veza sa parametrima</strong>
          <p style={{ color: "var(--lesson-muted)", fontSize: "0.92rem" }}>
            {paramDesc}
          </p>
        </article>
      </div>
    </>
  );
}
