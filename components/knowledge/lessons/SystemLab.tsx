"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { MathJax } from "better-react-mathjax";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

/* ── Helpers ── */

const EPS = 1e-9;

function fmt(v: number): string {
  if (Math.abs(v) < EPS) return "0";
  const r = Math.round(v * 100) / 100;
  return Number.isInteger(r) ? String(r) : String(r).replace(/\.0+$/, "");
}

function signTerm(v: number, body: string): string {
  if (Math.abs(v) < EPS) return "";
  const abs = Math.abs(v);
  const coeff = Math.abs(abs - 1) < EPS && body ? "" : fmt(abs);
  const sign = v < 0 ? "-" : "+";
  return `${sign}${coeff}${body}`;
}

function latexQuad(a: number, b: number, c: number, x = "x"): string {
  const parts: string[] = [];
  if (Math.abs(a) >= EPS) {
    const lead = `${a < 0 ? "-" : ""}${Math.abs(Math.abs(a) - 1) < EPS ? "" : fmt(Math.abs(a))}${x}^2`;
    parts.push(lead);
  }
  const mid = signTerm(b, x);
  const con = signTerm(c, "");
  if (mid) parts.push(mid);
  if (con) parts.push(con);
  const raw = parts.join("");
  return raw ? raw.replace(/^\+/, "") : "0";
}

function latexLin(m: number, n: number, x = "x"): string {
  const lin = signTerm(m, x).replace(/^\+/, "");
  const con = signTerm(n, "");
  const joined = `${lin || "0"}${con}`;
  return joined || "0";
}

interface QuadResult {
  kind: "all" | "none" | "linear" | "quadratic";
  discriminant: number | null;
  roots: number[];
}

function solveQuadratic(a: number, b: number, c: number): QuadResult {
  if (Math.abs(a) < EPS) {
    if (Math.abs(b) < EPS) {
      return { kind: Math.abs(c) < EPS ? "all" : "none", discriminant: null, roots: [] };
    }
    return { kind: "linear", discriminant: null, roots: [-c / b] };
  }
  const d = b * b - 4 * a * c;
  if (d > EPS) {
    const sq = Math.sqrt(d);
    return { kind: "quadratic", discriminant: d, roots: [(-b - sq) / (2 * a), (-b + sq) / (2 * a)] };
  }
  if (Math.abs(d) <= EPS) {
    return { kind: "quadratic", discriminant: 0, roots: [-b / (2 * a)] };
  }
  return { kind: "quadratic", discriminant: d, roots: [] };
}

/* ── Presets ── */

type Mode = "line-parabola" | "parabola-parabola";

interface Preset {
  id: string;
  label: string;
  values: Record<string, number>;
}

const PRESETS: Record<Mode, Preset[]> = {
  "line-parabola": [
    { id: "two", label: "Dva preseka", values: { a1: 1, b1: -1, c1: -1, m: 1, n: 1 } },
    { id: "touch", label: "Jedan dodir", values: { a1: 1, b1: -4, c1: 3, m: 0, n: -1 } },
    { id: "none", label: "Bez preseka", values: { a1: 1, b1: 1, c1: 2, m: -1, n: -2 } },
  ],
  "parabola-parabola": [
    { id: "two", label: "Dva preseka", values: { a1: 1, b1: 0, c1: 0, d: -1, e: 0, f: 4 } },
    { id: "touch", label: "Jedan dodir", values: { a1: 1, b1: 0, c1: 0, d: -1, e: 4, f: -2 } },
    { id: "none", label: "Bez preseka", values: { a1: 1, b1: 0, c1: 2, d: -1, e: 0, f: -1 } },
  ],
};

/* ── Component ── */

export default function SystemLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<Mode>("line-parabola");
  const [activePreset, setActivePreset] = useState("two");

  /* Curve 1 coefficients */
  const [a1, setA1] = useState(1);
  const [b1, setB1] = useState(-1);
  const [c1, setC1] = useState(-1);

  /* Line coefficients */
  const [mL, setML] = useState(1);
  const [nL, setNL] = useState(1);

  /* Curve 2 (parabola) coefficients */
  const [d2, setD2] = useState(-1);
  const [e2, setE2] = useState(0);
  const [f2, setF2] = useState(4);

  /* Apply preset */
  const applyPreset = useCallback(
    (presetId: string, m: Mode) => {
      const p = PRESETS[m].find((pp) => pp.id === presetId) ?? PRESETS[m][0];
      setActivePreset(p.id);
      const v = p.values;
      setA1(v.a1 ?? 1);
      setB1(v.b1 ?? 0);
      setC1(v.c1 ?? 0);
      if (m === "line-parabola") {
        setML(v.m ?? 0);
        setNL(v.n ?? 0);
      } else {
        setD2(v.d ?? -1);
        setE2(v.e ?? 0);
        setF2(v.f ?? 4);
      }
    },
    []
  );

  /* Initialise on mode change */
  useEffect(() => {
    applyPreset("two", mode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  /* Compute reduction */
  const reduction = (() => {
    if (mode === "line-parabola") {
      const ra = a1;
      const rb = b1 - mL;
      const rc = c1 - nL;
      return { a: ra, b: rb, c: rc };
    }
    return { a: a1 - d2, b: b1 - e2, c: c1 - f2 };
  })();

  const sol = solveQuadratic(reduction.a, reduction.b, reduction.c);

  const curveTwo = (x: number) =>
    mode === "line-parabola" ? mL * x + nL : d2 * x * x + e2 * x + f2;

  const points = (() => {
    if (sol.kind === "all") return [] as { x: number; y: number }[];
    return sol.roots
      .slice()
      .sort((l, r) => l - r)
      .map((xv) => ({ x: xv, y: curveTwo(xv) }));
  })();

  /* MathJax strings */
  const curve1Latex = `y = ${latexQuad(a1, b1, c1)}`;
  const curve2Latex =
    mode === "line-parabola"
      ? `y = ${latexLin(mL, nL)}`
      : `y = ${latexQuad(d2, e2, f2)}`;

  const reductionLatex = `${latexQuad(reduction.a, reduction.b, reduction.c)} = 0`;

  let countText: string;
  let interpText: string;
  if (sol.kind === "all") {
    countText = "Beskonacno mnogo resenja";
    interpText =
      "Dve krive se potpuno poklapaju, pa je svaka njihova tacka resenje sistema.";
  } else if (points.length === 0) {
    countText = "0 realnih resenja";
    interpText =
      sol.discriminant !== null
        ? `Posle redukcije diskriminanta je negativna: \u0394 = ${fmt(sol.discriminant!)}.`
        : "Krive se u realnoj ravni ne seku.";
  } else if (points.length === 1) {
    countText = "1 realno resenje";
    interpText =
      sol.discriminant !== null
        ? `Jedan dodir. \u0394 = ${fmt(sol.discriminant!)}.`
        : "Redukcija vodi na linearnu jednacinu ili dvostruki koren.";
  } else {
    countText = `${points.length} realna resenja`;
    interpText =
      sol.discriminant !== null
        ? `Dva preseka. \u0394 = ${fmt(sol.discriminant!)}.`
        : "Broj preseka potice iz jednacine posle zamene.";
  }

  const solLatex = (() => {
    if (sol.kind === "all") return "\\text{Beskonačno mnogo rešenja.}";
    if (!points.length) return "\\text{Nema realnih preseka.}";
    return points
      .map((p, i) => `S_{${i + 1}}=\\left(${fmt(p.x)},\\,${fmt(p.y)}\\right)`)
      .join(",\\quad ");
  })();

  /* Canvas */
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isLight = document.documentElement.classList.contains("light");

    // Theme-aware palette
    const T = {
      bg: isLight ? "#f5f0eb" : "rgba(9, 4, 3, 0.94)",
      grid: isLight ? "rgba(0,0,0,0.06)" : "rgba(255, 255, 255, 0.06)",
      gridStrong: isLight ? "rgba(180,120,80,0.30)" : "rgba(255, 215, 185, 0.34)",
      pointFill: isLight ? "#d94e0a" : "#ffd7b9",
      pointStroke: isLight ? "#f5f0eb" : "#090403",
      pointLabel: isLight ? "rgba(42,36,32,0.90)" : "rgba(255, 240, 230, 0.95)",
      axisLabel: isLight ? "rgba(42,36,32,0.65)" : "rgba(255, 240, 230, 0.72)",
    };

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const w = Math.max(320, Math.floor(rect.width));
    const h = Math.floor(rect.height || 420);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const bounds = { xMin: -6, xMax: 6, yMin: -6, yMax: 6 };
    const mapX = (x: number) =>
      ((x - bounds.xMin) / (bounds.xMax - bounds.xMin)) * w;
    const mapY = (y: number) =>
      h - ((y - bounds.yMin) / (bounds.yMax - bounds.yMin)) * h;

    /* Background */
    ctx.fillStyle = T.bg;
    ctx.fillRect(0, 0, w, h);

    /* Grid */
    for (let x = Math.ceil(bounds.xMin); x <= Math.floor(bounds.xMax); x++) {
      const px = mapX(x);
      ctx.strokeStyle = x === 0 ? T.gridStrong : T.grid;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(px, 0);
      ctx.lineTo(px, h);
      ctx.stroke();
    }
    for (let y = Math.ceil(bounds.yMin); y <= Math.floor(bounds.yMax); y++) {
      const py = mapY(y);
      ctx.strokeStyle = y === 0 ? T.gridStrong : T.grid;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, py);
      ctx.lineTo(w, py);
      ctx.stroke();
    }

    /* Draw curve helper */
    const drawCurve = (
      fn: (x: number) => number,
      color: string,
      dashed = false
    ) => {
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.6;
      if (dashed) ctx.setLineDash([8, 7]);
      ctx.beginPath();
      let started = false;
      const steps = 520;
      for (let i = 0; i <= steps; i++) {
        const x = bounds.xMin + (i / steps) * (bounds.xMax - bounds.xMin);
        const y = fn(x);
        if (!Number.isFinite(y) || y < bounds.yMin - 2 || y > bounds.yMax + 2) {
          started = false;
          continue;
        }
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
      ctx.restore();
    };

    /* Curves — accent colors stay the same in both themes */
    drawCurve((x) => a1 * x * x + b1 * x + c1, "#ec5b13");
    const fn2 = (x: number) =>
      mode === "line-parabola" ? mL * x + nL : d2 * x * x + e2 * x + f2;
    drawCurve(fn2, "#8fd7ff", sol.kind === "all");

    /* Points */
    points.forEach((p, i) => {
      const px = mapX(p.x);
      const py = mapY(p.y);
      ctx.fillStyle = T.pointFill;
      ctx.strokeStyle = T.pointStroke;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.font = "600 13px Inter, sans-serif";
      ctx.fillStyle = T.pointLabel;
      ctx.fillText(`S${i + 1}`, px + 10, py - 10);
    });

    /* Axis labels */
    ctx.fillStyle = T.axisLabel;
    ctx.font = "500 12px Inter, sans-serif";
    ctx.fillText("x", w - 18, mapY(0) - 8);
    ctx.fillText("y", mapX(0) + 8, 16);
  }, [a1, b1, c1, mL, nL, d2, e2, f2, mode, sol, points]);

  useEffect(() => {
    draw();
    const handleResize = () => draw();
    window.addEventListener("resize", handleResize);
    const observer = new MutationObserver(() => draw());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => { window.removeEventListener("resize", handleResize); observer.disconnect(); };
  }, [draw]);

  /* Slider change helper */
  const onSlider = (setter: (v: number) => void) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setActivePreset("custom");
    setter(Number(e.target.value));
  };

  return (
    <div className={s.interactiveShell}>
      {/* Canvas side */}
      <div>
        <div className={s.canvasWrap}>
          <canvas
            ref={canvasRef}
            className={s.polarCanvas}
            style={{ aspectRatio: "16 / 10" }}
          />
        </div>

        {/* Legend */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginTop: 14,
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 12px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,155,109,0.12)",
              color: "var(--lesson-muted)",
              fontSize: "0.88rem",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#ec5b13",
              }}
            />{" "}
            Prva kriva
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 12px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,155,109,0.12)",
              color: "var(--lesson-muted)",
              fontSize: "0.88rem",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#8fd7ff",
              }}
            />{" "}
            Druga kriva
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 12px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,155,109,0.12)",
              color: "var(--lesson-muted)",
              fontSize: "0.88rem",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#ffd7b9",
              }}
            />{" "}
            Preseci sistema
          </span>
        </div>
      </div>

      {/* Controls side */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Mode switch */}
        <article className={s.sectionCard}>
          <h3 className={cs.tCardTitle}>Izaberi tip sistema</h3>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button
              className={s.presetBtn}
              style={
                mode === "line-parabola"
                  ? { background: "rgba(236,91,19,0.22)", borderColor: "rgba(255,155,109,0.32)" }
                  : {}
              }
              onClick={() => setMode("line-parabola")}
            >
              Prava + parabola
            </button>
            <button
              className={s.presetBtn}
              style={
                mode === "parabola-parabola"
                  ? { background: "rgba(236,91,19,0.22)", borderColor: "rgba(255,155,109,0.32)" }
                  : {}
              }
              onClick={() => setMode("parabola-parabola")}
            >
              Dve parabole
            </button>
          </div>
        </article>

        {/* Presets */}
        <article className={s.sectionCard}>
          <h3 className={cs.tCardTitle}>Brzi presetovi</h3>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            {PRESETS[mode].map((p) => (
              <button
                key={p.id}
                className={s.presetBtn}
                style={
                  activePreset === p.id
                    ? { background: "rgba(236,91,19,0.22)", borderColor: "rgba(255,155,109,0.32)" }
                    : {}
                }
                onClick={() => applyPreset(p.id, mode)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </article>

        {/* Curve 1 controls */}
        <article className={s.sectionCard}>
          <h3 className={cs.tCardTitle}>
            <MathJax inline dynamic>{"\\(y = ax^2 + bx + c\\)"}</MathJax>
          </h3>
          <div className={s.controlGrid}>
            <div className={s.field}>
              <label>a = {fmt(a1)}</label>
              <input
                type="range"
                min={-2}
                max={2}
                step={0.5}
                value={a1}
                onChange={onSlider(setA1)}
              />
            </div>
            <div className={s.field}>
              <label>b = {fmt(b1)}</label>
              <input
                type="range"
                min={-5}
                max={5}
                step={0.5}
                value={b1}
                onChange={onSlider(setB1)}
              />
            </div>
            <div className={s.field}>
              <label>c = {fmt(c1)}</label>
              <input
                type="range"
                min={-5}
                max={5}
                step={0.5}
                value={c1}
                onChange={onSlider(setC1)}
              />
            </div>
          </div>
        </article>

        {/* Curve 2 controls */}
        <article className={s.sectionCard}>
          <h3 className={cs.tCardTitle}>
            {mode === "line-parabola" ? (
              <MathJax inline dynamic>{"\\(y = mx + n\\)"}</MathJax>
            ) : (
              <MathJax inline dynamic>{"\\(y = dx^2 + ex + f\\)"}</MathJax>
            )}
          </h3>
          <div className={s.controlGrid}>
            {mode === "line-parabola" ? (
              <>
                <div className={s.field}>
                  <label>m = {fmt(mL)}</label>
                  <input
                    type="range"
                    min={-4}
                    max={4}
                    step={0.5}
                    value={mL}
                    onChange={onSlider(setML)}
                  />
                </div>
                <div className={s.field}>
                  <label>n = {fmt(nL)}</label>
                  <input
                    type="range"
                    min={-5}
                    max={5}
                    step={0.5}
                    value={nL}
                    onChange={onSlider(setNL)}
                  />
                </div>
              </>
            ) : (
              <>
                <div className={s.field}>
                  <label>d = {fmt(d2)}</label>
                  <input
                    type="range"
                    min={-2}
                    max={2}
                    step={0.5}
                    value={d2}
                    onChange={onSlider(setD2)}
                  />
                </div>
                <div className={s.field}>
                  <label>e = {fmt(e2)}</label>
                  <input
                    type="range"
                    min={-5}
                    max={5}
                    step={0.5}
                    value={e2}
                    onChange={onSlider(setE2)}
                  />
                </div>
                <div className={s.field}>
                  <label>f = {fmt(f2)}</label>
                  <input
                    type="range"
                    min={-5}
                    max={5}
                    step={0.5}
                    value={f2}
                    onChange={onSlider(setF2)}
                  />
                </div>
              </>
            )}
          </div>
        </article>

        {/* Analysis output */}
        <article className={s.sectionCard}>
          <h3 className={cs.tCardTitle}>Analiza sistema</h3>
          <div className={s.resultsGrid}>
            <div className={s.resultCard}>
              <strong>Jednacine krivih</strong>
              <MathJax dynamic>{`\\[${curve1Latex}\\]`}</MathJax>
              <MathJax dynamic>{`\\[${curve2Latex}\\]`}</MathJax>
            </div>
            <div className={s.resultCard}>
              <strong>Posle zamene / izjednacavanja</strong>
              <MathJax dynamic>{`\\[${reductionLatex}\\]`}</MathJax>
            </div>
            <div className={s.resultCard}>
              <strong>Broj realnih resenja</strong>
              <p
                style={{
                  fontWeight: 700,
                  color: "var(--lesson-muted-strong)",
                  marginTop: 6,
                }}
              >
                {countText}
              </p>
              <p style={{ color: "var(--lesson-muted)", marginTop: 4 }}>
                {interpText}
              </p>
            </div>
            <div className={s.resultCard}>
              <strong>Priblizna resenja</strong>
              <MathJax dynamic>{`\\[${solLatex}\\]`}</MathJax>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
