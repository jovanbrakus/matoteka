"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

/* ── Types ── */

type Orientation = "horizontal" | "vertical";

interface LabState {
  orientation: Orientation;
  a: number;
  b: number;
  k: number;
  l: number;
}

interface Intersection {
  x: number;
  y: number;
  multiplicity: number;
}

interface ViewBox {
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
}

type StatusKind = "secant" | "tangent" | "external" | "asymptote" | "single";

interface Status {
  kind: StatusKind;
  label: string;
  caption: string;
  intersections: Intersection[];
  asymSlope: number;
  target: number;
}

/* ── Constants ── */

const EPS = 1e-7;

const PRESETS: { label: string; apply: (st: LabState) => Partial<LabState> }[] = [
  {
    label: "Tangenta",
    apply: (st) => {
      const asymSlope =
        st.orientation === "horizontal" ? st.b / st.a : st.a / st.b;
      if (st.orientation === "horizontal") {
        const candidateSlope = Math.max(Math.abs(st.k), asymSlope + 0.55);
        const k = (st.k < 0 ? -1 : 1) * candidateSlope;
        const l = Math.sqrt(Math.max(0, st.a * st.a * k * k - st.b * st.b));
        return { k, l };
      } else {
        const maxSlope = Math.max(0.2, asymSlope - 0.25);
        const sign = st.k < 0 ? -1 : 1;
        const k = sign * Math.min(Math.abs(st.k) || 0.8, maxSlope);
        const l = Math.sqrt(Math.max(0, st.a * st.a - st.b * st.b * k * k));
        return { k, l };
      }
    },
  },
  {
    label: "Sečica",
    apply: (st) => {
      if (st.orientation === "horizontal") return { k: 0, l: 0 };
      return { k: 0, l: st.a + 1.6 };
    },
  },
  {
    label: "Spoljašnja",
    apply: (st) => {
      const asymSlope =
        st.orientation === "horizontal" ? st.b / st.a : st.a / st.b;
      if (st.orientation === "horizontal") return { k: 0.55 * asymSlope, l: 0 };
      return { k: 0, l: 0 };
    },
  },
  {
    label: "Asimptota",
    apply: (st) => {
      const asymSlope =
        st.orientation === "horizontal" ? st.b / st.a : st.a / st.b;
      return { k: asymSlope, l: 0 };
    },
  },
];

/* ── Helpers ── */

function fmt(v: number): string {
  if (!Number.isFinite(v)) return "0";
  const r = Math.round(v * 100) / 100;
  if (Math.abs(r) < 0.005) return "0";
  return r.toString();
}

function getView(st: LabState): ViewBox {
  const slope = Math.abs(st.k);
  const asymSlope =
    st.orientation === "horizontal" ? st.b / st.a : st.a / st.b;
  const hSpan = st.orientation === "horizontal" ? st.a : st.b;
  const vSpan = st.orientation === "horizontal" ? st.b : st.a;
  const maxX = Math.max(
    8,
    hSpan * 2.8,
    Math.abs(st.l) + 4,
    Math.abs(vSpan / Math.max(slope, 0.2)) + 4
  );
  const maxY = Math.max(
    8,
    vSpan * 2.8,
    slope * maxX + Math.abs(st.l) + 3,
    asymSlope * maxX + 3
  );
  return { xmin: -maxX, xmax: maxX, ymin: -maxY, ymax: maxY };
}

function solveIntersections(st: LabState): Intersection[] {
  const a2 = st.a * st.a;
  const b2 = st.b * st.b;
  let A: number, B: number, C: number;
  if (st.orientation === "horizontal") {
    A = b2 - a2 * st.k * st.k;
    B = -2 * a2 * st.k * st.l;
    C = -a2 * (st.l * st.l + b2);
  } else {
    A = b2 * st.k * st.k - a2;
    B = 2 * b2 * st.k * st.l;
    C = b2 * (st.l * st.l - a2);
  }

  if (Math.abs(A) < EPS) {
    if (Math.abs(B) < EPS) return [];
    const x = -C / B;
    return [{ x, y: st.k * x + st.l, multiplicity: 1 }];
  }
  const D = B * B - 4 * A * C;
  if (D < -EPS) return [];
  if (Math.abs(D) <= EPS) {
    const x = -B / (2 * A);
    return [{ x, y: st.k * x + st.l, multiplicity: 2 }];
  }
  const sqrtD = Math.sqrt(Math.max(D, 0));
  const x1 = (-B - sqrtD) / (2 * A);
  const x2 = (-B + sqrtD) / (2 * A);
  if (Math.abs(x1 - x2) < 1e-5) return [{ x: x1, y: st.k * x1 + st.l, multiplicity: 2 }];
  return [
    { x: x1, y: st.k * x1 + st.l, multiplicity: 1 },
    { x: x2, y: st.k * x2 + st.l, multiplicity: 1 },
  ];
}

function getStatus(st: LabState): Status {
  const intersections = solveIntersections(st);
  const asymSlope =
    st.orientation === "horizontal" ? st.b / st.a : st.a / st.b;
  const isAsym =
    Math.abs(st.l) < 0.05 &&
    (Math.abs(st.k - asymSlope) < 0.05 || Math.abs(st.k + asymSlope) < 0.05);
  const target =
    st.orientation === "horizontal"
      ? st.a * st.a * st.k * st.k - st.b * st.b
      : st.a * st.a - st.b * st.b * st.k * st.k;

  if (isAsym) {
    return {
      kind: "asymptote",
      label: "Asimptota",
      caption:
        "Prava se poklapa sa asimptotom: grane joj prilaze, ali je ne seku.",
      intersections,
      asymSlope,
      target,
    };
  }
  if (intersections.length >= 2) {
    return {
      kind: "secant",
      label: "Sečica",
      caption: "Prava seče hiperbolu u dve realne tačke.",
      intersections,
      asymSlope,
      target,
    };
  }
  if (intersections.length === 1 && intersections[0].multiplicity === 2) {
    return {
      kind: "tangent",
      label: "Tangenta",
      caption: "Sistem ima jedno dvostruko rešenje: to je prava tangenta.",
      intersections,
      asymSlope,
      target,
    };
  }
  if (intersections.length === 1) {
    return {
      kind: "single",
      label: "Jedan presek",
      caption:
        "Prava ima jedan realan presek, ali taj položaj nije prava tangenta.",
      intersections,
      asymSlope,
      target,
    };
  }
  return {
    kind: "external",
    label: "Spoljašnja prava",
    caption: "Prava nema realnih preseka sa hiperbolom.",
    intersections,
    asymSlope,
    target,
  };
}

/* ── Canvas drawing ── */

function draw(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  st: LabState,
  status: Status
) {
  const view = getView(st);
  const toC = (x: number, y: number) => ({
    x: ((x - view.xmin) / (view.xmax - view.xmin)) * w,
    y: h - ((y - view.ymin) / (view.ymax - view.ymin)) * h,
  });

  // Background
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#0a0605";
  ctx.fillRect(0, 0, w, h);

  // Grid
  const rangeX = view.xmax - view.xmin;
  const gridStep = rangeX > 24 ? 2 : 1;
  ctx.strokeStyle = "rgba(255,255,255,0.05)";
  ctx.lineWidth = 1;
  for (let x = Math.ceil(view.xmin); x <= view.xmax; x += gridStep) {
    const p1 = toC(x, view.ymin);
    const p2 = toC(x, view.ymax);
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }
  for (let y = Math.ceil(view.ymin); y <= view.ymax; y += gridStep) {
    const p1 = toC(view.xmin, y);
    const p2 = toC(view.xmax, y);
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }

  // Axes
  ctx.strokeStyle = "rgba(255, 214, 151, 0.22)";
  ctx.lineWidth = 1.6;
  let p = toC(view.xmin, 0);
  let q = toC(view.xmax, 0);
  ctx.beginPath();
  ctx.moveTo(p.x, p.y);
  ctx.lineTo(q.x, q.y);
  ctx.stroke();
  p = toC(0, view.ymin);
  q = toC(0, view.ymax);
  ctx.beginPath();
  ctx.moveTo(p.x, p.y);
  ctx.lineTo(q.x, q.y);
  ctx.stroke();
  ctx.fillStyle = "rgba(255, 214, 151, 0.7)";
  ctx.font = "600 14px system-ui, sans-serif";
  ctx.fillText("x", w - 18, toC(view.xmax, 0).y - 10);
  ctx.fillText("y", toC(0, view.ymax).x + 10, 18);

  // Asymptotes
  const asymSlope = status.asymSlope;
  const span = Math.max(rangeX, view.ymax - view.ymin);
  ctx.save();
  ctx.setLineDash([10, 8]);
  ctx.strokeStyle = "rgba(255, 214, 151, 0.45)";
  ctx.lineWidth = 1.5;
  [asymSlope, -asymSlope].forEach((sl) => {
    const p1 = toC(-span, -sl * span);
    const p2 = toC(span, sl * span);
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  });
  ctx.restore();

  // Hyperbola
  ctx.save();
  ctx.strokeStyle = "rgba(255, 148, 79, 0.95)";
  ctx.lineWidth = 3;
  if (st.orientation === "horizontal") {
    [1, -1].forEach((dir) => {
      const start = st.a;
      const step = (view.xmax - start) / 240;
      if (step <= 0) return;
      [1, -1].forEach((signY) => {
        ctx.beginPath();
        let started = false;
        for (let x = start; x <= view.xmax; x += step) {
          const rx = dir * x;
          const y = signY * st.b * Math.sqrt((rx * rx) / (st.a * st.a) - 1);
          if (!Number.isFinite(y)) continue;
          const pt = toC(rx, y);
          if (!started) {
            ctx.moveTo(pt.x, pt.y);
            started = true;
          } else {
            ctx.lineTo(pt.x, pt.y);
          }
        }
        ctx.stroke();
      });
    });
  } else {
    [1, -1].forEach((dir) => {
      const step = (2 * view.xmax) / 300;
      if (step <= 0) return;
      ctx.beginPath();
      let started = false;
      for (let x = -view.xmax; x <= view.xmax; x += step) {
        const y = dir * st.a * Math.sqrt(1 + (x * x) / (st.b * st.b));
        const pt = toC(x, y);
        if (!started) {
          ctx.moveTo(pt.x, pt.y);
          started = true;
        } else {
          ctx.lineTo(pt.x, pt.y);
        }
      }
      ctx.stroke();
    });
  }
  ctx.restore();

  // Line y = kx + l
  ctx.save();
  ctx.strokeStyle = "rgba(183, 221, 255, 0.95)";
  ctx.lineWidth = 2.4;
  const lp1 = toC(view.xmin, st.k * view.xmin + st.l);
  const lp2 = toC(view.xmax, st.k * view.xmax + st.l);
  ctx.beginPath();
  ctx.moveTo(lp1.x, lp1.y);
  ctx.lineTo(lp2.x, lp2.y);
  ctx.stroke();
  ctx.restore();

  // Key points (vertices & foci)
  const c = Math.sqrt(st.a * st.a + st.b * st.b);
  const drawDot = (cx: number, cy: number, color: string, r: number) => {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };
  const drawLbl = (text: string, cx: number, cy: number, color: string) => {
    ctx.save();
    ctx.fillStyle = color;
    ctx.font = "600 14px system-ui, sans-serif";
    ctx.fillText(text, cx + 10, cy - 10);
    ctx.restore();
  };

  if (st.orientation === "horizontal") {
    const lv = toC(-st.a, 0);
    const rv = toC(st.a, 0);
    const lf = toC(-c, 0);
    const rf = toC(c, 0);
    drawDot(lv.x, lv.y, "#ffe5a5", 5.5);
    drawDot(rv.x, rv.y, "#ffe5a5", 5.5);
    drawDot(lf.x, lf.y, "#b7ddff", 5);
    drawDot(rf.x, rf.y, "#b7ddff", 5);
    drawLbl("V", lv.x, lv.y, "#ffe5a5");
    drawLbl("V", rv.x, rv.y, "#ffe5a5");
    drawLbl("F", lf.x, lf.y, "#b7ddff");
    drawLbl("F", rf.x, rf.y, "#b7ddff");
  } else {
    const lv = toC(0, -st.a);
    const uv = toC(0, st.a);
    const lf = toC(0, -c);
    const uf = toC(0, c);
    drawDot(lv.x, lv.y, "#ffe5a5", 5.5);
    drawDot(uv.x, uv.y, "#ffe5a5", 5.5);
    drawDot(lf.x, lf.y, "#b7ddff", 5);
    drawDot(uf.x, uf.y, "#b7ddff", 5);
    drawLbl("V", lv.x, lv.y, "#ffe5a5");
    drawLbl("V", uv.x, uv.y, "#ffe5a5");
    drawLbl("F", lf.x, lf.y, "#b7ddff");
    drawLbl("F", uf.x, uf.y, "#b7ddff");
  }

  // Intersection points
  status.intersections.forEach((ip, i) => {
    const pt = toC(ip.x, ip.y);
    const col = status.kind === "tangent" ? "#ffd796" : "#92e4c4";
    drawDot(pt.x, pt.y, col, 6);
    drawLbl(
      `P${status.intersections.length > 1 ? i + 1 : ""}`,
      pt.x,
      pt.y,
      "#fff4ea"
    );
  });
}

/* ── Component ── */

export default function HyperbolaLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<LabState>({
    orientation: "horizontal",
    a: 4,
    b: 3,
    k: 1.2,
    l: 4.5,
  });

  const status = getStatus(state);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    draw(ctx, canvas.width, canvas.height, state, status);
  }, [state, status]);

  useEffect(() => {
    render();
    const onResize = () => render();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [render]);

  const chipClass =
    status.kind === "secant"
      ? "rgba(146,228,196,0.14)"
      : status.kind === "tangent"
      ? "rgba(255,214,151,0.16)"
      : status.kind === "external"
      ? "rgba(255,176,168,0.12)"
      : "rgba(183,221,255,0.12)";
  const chipColor =
    status.kind === "secant"
      ? "var(--lesson-success)"
      : status.kind === "tangent"
      ? "var(--lesson-warning)"
      : status.kind === "external"
      ? "var(--lesson-danger)"
      : "var(--lesson-sky)";

  const c = Math.sqrt(state.a * state.a + state.b * state.b);
  const orientationText =
    state.orientation === "horizontal"
      ? "Horizontalna hiperbola: x\u00B2/a\u00B2 \u2212 y\u00B2/b\u00B2 = 1"
      : "Vertikalna hiperbola: y\u00B2/a\u00B2 \u2212 x\u00B2/b\u00B2 = 1";
  const tangencyText =
    state.orientation === "horizontal"
      ? "Uslov tangente: l\u00B2 = a\u00B2k\u00B2 \u2212 b\u00B2"
      : "Uslov tangente: l\u00B2 = a\u00B2 \u2212 b\u00B2k\u00B2";
  const slopeRule =
    state.orientation === "horizontal"
      ? `Tangentni nagib mora zadovoljiti |k| \u2265 b/a = ${fmt(status.asymSlope)}.`
      : `Tangentni nagib mora zadovoljiti |k| \u2264 a/b = ${fmt(status.asymSlope)}.`;

  return (
    <div className={s.interactiveShell}>
      {/* Canvas */}
      <div>
        <div className={s.canvasWrap}>
          <canvas
            ref={canvasRef}
            className={s.polarCanvas}
            width={960}
            height={620}
          />
        </div>
        <p className={cs.tSmall} style={{ marginTop: 10, textAlign: "center" }}>
          {status.caption}
        </p>
        <p className={cs.tSmall} style={{ marginTop: 6, textAlign: "center" }}>
          Zlatne tačke su temena, plave su žiže, isprekidane linije su
          asimptote, a svetloplava prava je y&nbsp;=&nbsp;kx&nbsp;+&nbsp;l.
        </p>
      </div>

      {/* Controls */}
      <div>
        {/* Orientation */}
        <div style={{ marginBottom: 14 }}>
          <h4 className={cs.tCardTitle}>Orijentacija hiperbole</h4>
          <div style={{ display: "flex", gap: 10 }}>
            {(["horizontal", "vertical"] as Orientation[]).map((o) => (
              <button
                key={o}
                className={s.presetBtn}
                style={
                  state.orientation === o
                    ? {
                        background: "rgba(236,91,19,0.22)",
                        borderColor: "rgba(236,91,19,0.4)",
                      }
                    : undefined
                }
                onClick={() => {
                  const newSt = { ...state, orientation: o };
                  const asl =
                    o === "horizontal"
                      ? newSt.b / newSt.a
                      : newSt.a / newSt.b;
                  if (
                    o === "horizontal" &&
                    Math.abs(newSt.k) < asl * 0.4
                  )
                    newSt.k = 1.2;
                  if (
                    o === "vertical" &&
                    Math.abs(newSt.k) > asl + 0.8
                  )
                    newSt.k = 0.8;
                  setState(newSt);
                }}
              >
                {o === "horizontal" ? "Horizontalna" : "Vertikalna"}
              </button>
            ))}
          </div>
        </div>

        {/* Hyperbola params */}
        <div style={{ marginBottom: 14 }}>
          <h4 className={cs.tCardTitle}>Parametri hiperbole</h4>
          <div className={s.controlGrid}>
            <label className={s.field}>
              <span style={{ display: "flex", justifyContent: "space-between" }}>
                <span className={cs.tSmall}>Parametar a</span>
                <span
                  style={{
                    padding: "2px 8px",
                    borderRadius: 999,
                    background: "rgba(255,148,79,0.12)",
                    border: "1px solid rgba(255,214,151,0.16)",
                    fontSize: "0.82rem",
                    fontWeight: 800,
                  }}
                >
                  {fmt(state.a)}
                </span>
              </span>
              <input
                type="range"
                min={2}
                max={8}
                step={0.5}
                value={state.a}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, a: Number(e.target.value) }))
                }
              />
            </label>
            <label className={s.field}>
              <span style={{ display: "flex", justifyContent: "space-between" }}>
                <span className={cs.tSmall}>Parametar b</span>
                <span
                  style={{
                    padding: "2px 8px",
                    borderRadius: 999,
                    background: "rgba(255,148,79,0.12)",
                    border: "1px solid rgba(255,214,151,0.16)",
                    fontSize: "0.82rem",
                    fontWeight: 800,
                  }}
                >
                  {fmt(state.b)}
                </span>
              </span>
              <input
                type="range"
                min={1}
                max={7}
                step={0.5}
                value={state.b}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, b: Number(e.target.value) }))
                }
              />
            </label>
          </div>
        </div>

        {/* Line params */}
        <div style={{ marginBottom: 14 }}>
          <h4 className={cs.tCardTitle}>
            Prava y&nbsp;=&nbsp;kx&nbsp;+&nbsp;l
          </h4>
          <div className={s.controlGrid}>
            <label className={s.field}>
              <span style={{ display: "flex", justifyContent: "space-between" }}>
                <span className={cs.tSmall}>Nagib k</span>
                <span
                  style={{
                    padding: "2px 8px",
                    borderRadius: 999,
                    background: "rgba(255,148,79,0.12)",
                    border: "1px solid rgba(255,214,151,0.16)",
                    fontSize: "0.82rem",
                    fontWeight: 800,
                  }}
                >
                  {fmt(state.k)}
                </span>
              </span>
              <input
                type="range"
                min={-4}
                max={4}
                step={0.1}
                value={state.k}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, k: Number(e.target.value) }))
                }
              />
            </label>
            <label className={s.field}>
              <span style={{ display: "flex", justifyContent: "space-between" }}>
                <span className={cs.tSmall}>Odsečak l</span>
                <span
                  style={{
                    padding: "2px 8px",
                    borderRadius: 999,
                    background: "rgba(255,148,79,0.12)",
                    border: "1px solid rgba(255,214,151,0.16)",
                    fontSize: "0.82rem",
                    fontWeight: 800,
                  }}
                >
                  {fmt(state.l)}
                </span>
              </span>
              <input
                type="range"
                min={-10}
                max={10}
                step={0.1}
                value={state.l}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, l: Number(e.target.value) }))
                }
              />
            </label>
          </div>
        </div>

        {/* Presets */}
        <div style={{ marginBottom: 14 }}>
          <h4 className={cs.tCardTitle}>Brzi preset položaji</h4>
          <div className={cs.presetRow}>
            {PRESETS.map((pr) => (
              <button
                key={pr.label}
                className={s.presetBtn}
                onClick={() =>
                  setState((prev) => ({ ...prev, ...pr.apply(prev) }))
                }
              >
                {pr.label}
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div>
          <h4 className={cs.tCardTitle}>Šta trenutno vidiš</h4>
          <div style={{ display: "grid", gap: 8 }}>
            <span
              style={{
                display: "inline-block",
                width: "fit-content",
                padding: "5px 10px",
                borderRadius: 999,
                fontSize: "0.82rem",
                fontWeight: 800,
                background: chipClass,
                color: chipColor,
                border: `1px solid ${chipColor}`,
              }}
            >
              {status.label}
            </span>
            <SummaryLine>{orientationText}</SummaryLine>
            <SummaryLine>
              a = {fmt(state.a)}, b = {fmt(state.b)}, c = {fmt(c)}
            </SummaryLine>
            <SummaryLine>{tangencyText}</SummaryLine>
            <SummaryLine>
              Trenutno: l&sup2; = {fmt(state.l * state.l)}, ciljna vrednost ={" "}
              {fmt(status.target)}
            </SummaryLine>
            <SummaryLine>{slopeRule}</SummaryLine>
            <SummaryLine>
              Broj realnih preseka: {status.intersections.length}
            </SummaryLine>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryLine({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: "10px 12px",
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.02)",
        color: "var(--lesson-muted)",
        fontSize: "0.92rem",
      }}
    >
      {children}
    </div>
  );
}
