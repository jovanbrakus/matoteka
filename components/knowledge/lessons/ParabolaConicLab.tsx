"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

/* ── Types & helpers ── */

interface State {
  p: number;
  k: number;
  l: number;
}

type Mode = "tangent" | "secant" | "outside";

function clampSlope(value: number): number {
  if (Math.abs(value) < 0.5) return value < 0 ? -0.5 : 0.5;
  return value;
}

function classify({ p, k, l }: State): Mode {
  const diff = p - 2 * k * l;
  if (Math.abs(diff) < 0.08) return "tangent";
  return diff > 0 ? "secant" : "outside";
}

function getIntersectionPoints({ p, k, l }: State) {
  const A = k * k;
  const B = 2 * k * l - 2 * p;
  const C = l * l;
  const D = B * B - 4 * A * C;
  if (D < -1e-8) return [];
  if (Math.abs(D) < 1e-8) {
    const x = -B / (2 * A);
    return [{ x, y: k * x + l }];
  }
  const sqrtD = Math.sqrt(D);
  const x1 = (-B - sqrtD) / (2 * A);
  const x2 = (-B + sqrtD) / (2 * A);
  return [
    { x: x1, y: k * x1 + l },
    { x: x2, y: k * x2 + l },
  ];
}

function tangentLValue(p: number, k: number) {
  return p / (2 * k);
}

function clampL(value: number) {
  return Math.max(-10, Math.min(10, value));
}

/* ── Canvas drawing ── */

function renderCanvas(
  canvas: HTMLCanvasElement,
  state: State
): { mode: Mode; points: { x: number; y: number }[] } {
  const ctx = canvas.getContext("2d");
  if (!ctx) return { mode: "outside", points: [] };

  const ratio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth || 960;
  const height = Math.max(320, Math.min(560, Math.round(width * 0.62)));
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const xMax = Math.max(10, state.p * 4.2);
  const yMax = Math.max(
    8,
    Math.abs(state.l) + Math.abs(state.k) * xMax * 0.55,
    Math.sqrt(2 * state.p * xMax) + 2
  );
  const bounds = { xMin: -state.p - 2, xMax, yMin: -yMax, yMax };

  const inner = {
    left: 54,
    right: width - 28,
    top: 24,
    bottom: height - 40,
  };
  const toCanvas = (x: number, y: number) => ({
    x:
      inner.left +
      ((x - bounds.xMin) / (bounds.xMax - bounds.xMin)) *
        (inner.right - inner.left),
    y:
      inner.bottom -
      ((y - bounds.yMin) / (bounds.yMax - bounds.yMin)) *
        (inner.bottom - inner.top),
  });

  // Grid
  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
  ctx.lineWidth = 1;
  const xStep = bounds.xMax - bounds.xMin > 18 ? 2 : 1;
  const yStep = bounds.yMax - bounds.yMin > 18 ? 2 : 1;
  for (let x = Math.ceil(bounds.xMin); x <= Math.floor(bounds.xMax); x += xStep) {
    const st = toCanvas(x, bounds.yMin);
    const en = toCanvas(x, bounds.yMax);
    ctx.beginPath();
    ctx.moveTo(st.x, st.y);
    ctx.lineTo(en.x, en.y);
    ctx.stroke();
  }
  for (let y = Math.ceil(bounds.yMin); y <= Math.floor(bounds.yMax); y += yStep) {
    const st = toCanvas(bounds.xMin, y);
    const en = toCanvas(bounds.xMax, y);
    ctx.beginPath();
    ctx.moveTo(st.x, st.y);
    ctx.lineTo(en.x, en.y);
    ctx.stroke();
  }
  ctx.strokeStyle = "rgba(255, 214, 151, 0.15)";
  ctx.strokeRect(inner.left, inner.top, inner.right - inner.left, inner.bottom - inner.top);
  ctx.restore();

  // Axes
  ctx.save();
  ctx.strokeStyle = "rgba(255, 214, 151, 0.36)";
  ctx.lineWidth = 1.5;
  if (bounds.xMin <= 0 && bounds.xMax >= 0) {
    const st = toCanvas(0, bounds.yMin);
    const en = toCanvas(0, bounds.yMax);
    ctx.beginPath();
    ctx.moveTo(st.x, st.y);
    ctx.lineTo(en.x, en.y);
    ctx.stroke();
  }
  if (bounds.yMin <= 0 && bounds.yMax >= 0) {
    const st = toCanvas(bounds.xMin, 0);
    const en = toCanvas(bounds.xMax, 0);
    ctx.beginPath();
    ctx.moveTo(st.x, st.y);
    ctx.lineTo(en.x, en.y);
    ctx.stroke();
  }
  ctx.fillStyle = "rgba(255, 214, 151, 0.72)";
  ctx.font = "600 13px Public Sans, sans-serif";
  const xLabel = toCanvas(bounds.xMax, 0);
  const yLabel = toCanvas(0, bounds.yMax);
  ctx.fillText("x", xLabel.x - 14, xLabel.y - 10);
  ctx.fillText("y", yLabel.x + 10, yLabel.y + 16);
  ctx.restore();

  // Directrix
  const xDir = -state.p / 2;
  ctx.save();
  ctx.strokeStyle = "rgba(255, 214, 151, 0.55)";
  ctx.setLineDash([8, 8]);
  ctx.lineWidth = 1.6;
  const dStart = toCanvas(xDir, bounds.yMin);
  const dEnd = toCanvas(xDir, bounds.yMax);
  ctx.beginPath();
  ctx.moveTo(dStart.x, dStart.y);
  ctx.lineTo(dEnd.x, dEnd.y);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "rgba(255, 214, 151, 0.78)";
  ctx.font = "600 13px Public Sans, sans-serif";
  ctx.fillText("direktrisa", dStart.x + 8, dStart.y + 18);
  ctx.restore();

  // Parabola y^2 = 2px
  ctx.save();
  ctx.strokeStyle = "#ff944f";
  ctx.lineWidth = 3;
  ctx.beginPath();
  let started = false;
  const step = Math.max(0.05, (bounds.yMax - bounds.yMin) / 400);
  for (let y = bounds.yMin; y <= bounds.yMax; y += step) {
    const x = (y * y) / (2 * state.p);
    if (x < bounds.xMin - 1 || x > bounds.xMax + 1) continue;
    const pt = toCanvas(x, y);
    if (!started) {
      ctx.moveTo(pt.x, pt.y);
      started = true;
    } else {
      ctx.lineTo(pt.x, pt.y);
    }
  }
  ctx.stroke();
  ctx.restore();

  // Line y = kx + l
  ctx.save();
  ctx.strokeStyle = "#b7ddff";
  ctx.lineWidth = 2.4;
  const yAtMin = state.k * bounds.xMin + state.l;
  const yAtMax = state.k * bounds.xMax + state.l;
  const p1 = toCanvas(bounds.xMin, yAtMin);
  const p2 = toCanvas(bounds.xMax, yAtMax);
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
  ctx.restore();

  // Focus & vertex
  const focus = toCanvas(state.p / 2, 0);
  const vertex = toCanvas(0, 0);
  ctx.save();
  ctx.fillStyle = "#ffd796";
  ctx.beginPath();
  ctx.arc(focus.x, focus.y, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = "700 13px Public Sans, sans-serif";
  ctx.fillText("F", focus.x + 10, focus.y - 10);
  ctx.fillStyle = "#ffb978";
  ctx.beginPath();
  ctx.arc(vertex.x, vertex.y, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillText("V", vertex.x + 10, vertex.y - 10);
  ctx.restore();

  // Intersection points
  const curMode = classify(state);
  const points = getIntersectionPoints(state);
  if (points.length) {
    ctx.save();
    ctx.fillStyle = curMode === "tangent" ? "#ffd796" : "#92e4c4";
    ctx.font = "600 12px Public Sans, sans-serif";
    points.forEach((point, index) => {
      const cp = toCanvas(point.x, point.y);
      ctx.beginPath();
      ctx.arc(cp.x, cp.y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText(
        `T${points.length > 1 ? index + 1 : ""}`,
        cp.x + 8,
        cp.y - 8
      );
    });
    ctx.restore();
  }

  return { mode: curMode, points };
}

/* ── Component ── */

export default function ParabolaConicLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pVal, setPVal] = useState(4);
  const [kVal, setKVal] = useState(1.0);
  const [lVal, setLVal] = useState(2.0);
  const [mode, setMode] = useState<Mode>("tangent");
  const [captionText, setCaptionText] = useState(
    "Savet: prvo klikni na preset Tangenta, pa onda malo pomeraj klizac za l levo i desno da vidis prelaz izmedju tri polozaja prave."
  );
  const [summaryText, setSummaryText] = useState("");
  const [relationText, setRelationText] = useState("");

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const state: State = { p: pVal, k: clampSlope(kVal), l: lVal };
    const { mode: curMode, points } = renderCanvas(canvas, state);
    setMode(curMode);

    const relationValue = 2 * state.k * state.l;
    const tIntercept = tangentLValue(state.p, state.k);
    setRelationText(
      `Trenutno je 2kl = ${relationValue.toFixed(2)}, a p = ${state.p.toFixed(2)}. Za isti p i k, tangentni polozaj bi imao l \u2248 ${tIntercept.toFixed(2)}.`
    );

    if (curMode === "tangent") {
      const x0 = state.p / (2 * state.k * state.k);
      const y0 = state.p / state.k;
      setSummaryText(
        `Vazi 2kl \u2248 p, pa je prava tangenta. Tacka dodira je priblizno (${x0.toFixed(2)}, ${y0.toFixed(2)}).`
      );
      setCaptionText(
        "Prava je u granicnom polozaju. Ako sada malo povecas ili smanjs l, videces kako tangenta prelazi u secicu ili spoljasnju pravu."
      );
    } else if (curMode === "secant") {
      const pointText = points
        .map((pt) => `(${pt.x.toFixed(2)}, ${pt.y.toFixed(2)})`)
        .join(" i ");
      setSummaryText(
        `Posto je p > 2kl, sistem daje dve realne tacke preseka: ${pointText}.`
      );
      setCaptionText(
        "Ovde prava probija parabolu. Da bi postala tangenta, moras je pomeriti tako da odrzis isti nagib, ali preciznije podesis l."
      );
    } else {
      setSummaryText(
        "Posto je p < 2kl, prava nema realan presek sa parabolom. Upravo iz ovog polozaja se vidi zasto je tangenta granica izmedju preseka i promasaja."
      );
      setCaptionText(
        "Ovo je odlican polozaj za razmisljanje o minimalnoj distanci: najbliza paralelna prava nece ostati spoljasnja, nego ce sici do tacnog tangencijalnog polozaja."
      );
    }
  }, [pVal, kVal, lVal]);

  useEffect(() => {
    draw();
    const handleResize = () => draw();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [draw]);

  const applyPreset = (preset: string) => {
    const state: State = { p: pVal, k: clampSlope(kVal), l: lVal };
    if (preset === "tangent") {
      setLVal(clampL(tangentLValue(state.p, state.k)));
    } else if (preset === "secant") {
      setLVal(clampL(tangentLValue(state.p, state.k) - Math.sign(state.k) * 1.6));
    } else if (preset === "outside") {
      setLVal(clampL(tangentLValue(state.p, state.k) + Math.sign(state.k) * 1.6));
    } else if (preset === "distance") {
      setPVal(2);
      setKVal(1.0);
      setLVal(5.0);
    }
  };

  const modeLabel =
    mode === "tangent"
      ? "Tangenta"
      : mode === "secant"
        ? "Secica"
        : "Spoljasnja prava";

  const modeStyle =
    mode === "tangent"
      ? {
          background: "rgba(255, 214, 151, 0.12)",
          color: "var(--lesson-warning)",
          border: "1px solid rgba(255, 214, 151, 0.18)",
        }
      : mode === "secant"
        ? {
            background: "rgba(146, 228, 196, 0.12)",
            color: "var(--lesson-success)",
            border: "1px solid rgba(146, 228, 196, 0.18)",
          }
        : {
            background: "rgba(255, 176, 168, 0.12)",
            color: "var(--lesson-danger)",
            border: "1px solid rgba(255, 176, 168, 0.18)",
          };

  return (
    <div className={s.interactiveShell}>
      {/* ── Canvas ── */}
      <div className={s.interactiveCard}>
        <div className={s.canvasWrap}>
          <canvas
            ref={canvasRef}
            className={s.polarCanvas}
            aria-label="Interaktivni prikaz parabole i prave"
          />
        </div>
        <p style={{ marginTop: 12, color: "var(--lesson-muted)" }}>
          {captionText}
        </p>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            borderRadius: 999,
            fontWeight: 800,
            marginTop: 14,
            ...modeStyle,
          }}
        >
          {modeLabel}
        </div>
        <p style={{ marginTop: 12, color: "var(--lesson-muted)" }}>
          <strong style={{ color: "var(--lesson-text)" }}>Rezime:</strong>{" "}
          {summaryText}
        </p>
      </div>

      {/* ── Controls ── */}
      <div className={s.interactiveCard}>
        <h3 className={cs.tCardTitle}>Kontrole laboratorije</h3>
        <div className={s.controlGrid}>
          <div className={s.field}>
            <label>Parametar p</label>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                fontSize: "0.95rem",
                color: "var(--lesson-muted)",
              }}
            >
              <span>Oblik parabole</span>
              <strong style={{ color: "var(--lesson-text)" }}>{pVal}</strong>
            </div>
            <input
              type="range"
              min={2}
              max={10}
              step={1}
              value={pVal}
              onChange={(e) => setPVal(Number(e.target.value))}
              style={{ accentColor: "var(--lesson-primary)" }}
            />
          </div>

          <div className={s.field}>
            <label>Nagib k</label>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                fontSize: "0.95rem",
                color: "var(--lesson-muted)",
              }}
            >
              <span>Smer prave</span>
              <strong style={{ color: "var(--lesson-text)" }}>
                {clampSlope(kVal).toFixed(1)}
              </strong>
            </div>
            <input
              type="range"
              min={-2.5}
              max={2.5}
              step={0.1}
              value={kVal}
              onChange={(e) => setKVal(clampSlope(Number(e.target.value)))}
              style={{ accentColor: "var(--lesson-primary)" }}
            />
          </div>

          <div className={s.field}>
            <label>Odsecak l</label>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                fontSize: "0.95rem",
                color: "var(--lesson-muted)",
              }}
            >
              <span>Pomeranje prave</span>
              <strong style={{ color: "var(--lesson-text)" }}>
                {lVal.toFixed(1)}
              </strong>
            </div>
            <input
              type="range"
              min={-10}
              max={10}
              step={0.1}
              value={lVal}
              onChange={(e) => setLVal(Number(e.target.value))}
              style={{ accentColor: "var(--lesson-primary)" }}
            />
          </div>

          <div className={s.field}>
            <label>Kljucna relacija</label>
            <div
              style={{
                padding: "16px 18px",
                borderRadius: 18,
                background: "rgba(183, 221, 255, 0.06)",
                color: "var(--lesson-muted-strong)",
                border: "1px solid rgba(183, 221, 255, 0.18)",
                fontSize: "0.92rem",
              }}
            >
              {relationText}
            </div>
          </div>
        </div>

        <div className={cs.presetRow} style={{ marginTop: 18 }}>
          <button className={s.presetBtn} onClick={() => applyPreset("secant")}>
            Secica
          </button>
          <button className={s.presetBtn} onClick={() => applyPreset("tangent")}>
            Tangenta
          </button>
          <button className={s.presetBtn} onClick={() => applyPreset("outside")}>
            Spoljasnja
          </button>
          <button className={s.presetBtn} onClick={() => applyPreset("distance")}>
            Minimum distance
          </button>
        </div>

        <div
          style={{
            marginTop: 14,
            padding: "16px 18px",
            borderRadius: 18,
            background: "rgba(255, 176, 168, 0.06)",
            color: "var(--lesson-muted-strong)",
            border: "1px solid rgba(255, 176, 168, 0.18)",
            fontSize: "0.92rem",
          }}
        >
          Napomena: klizac za k namerno izbegava nulu, jer formula p=2kl opisuje
          tangente zapisane kao y=kx+l. Vertikalna tangenta u temenu x=0 je
          poseban slucaj.
        </div>
      </div>
    </div>
  );
}
