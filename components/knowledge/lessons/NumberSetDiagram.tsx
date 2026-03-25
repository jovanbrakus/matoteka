"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import s from "@/styles/lesson-layout.module.css";

/**
 * Interactive nested Venn-style diagram showing N ⊂ Z ⊂ Q ⊂ R.
 * Users can hover over each region to see which numbers belong to that set.
 */

interface SetInfo {
  key: string;
  label: string;
  symbol: string;
  color: string;
  colorFill: string;
  examples: string;
  description: string;
}

const SETS: SetInfo[] = [
  {
    key: "R",
    label: "Realni brojevi",
    symbol: "\u211D",
    color: "rgba(143, 215, 255, 0.85)",
    colorFill: "rgba(143, 215, 255, 0.06)",
    examples: "\u221A2, \u03C0, e, \u221A5, ...",
    description:
      "Svi brojevi na brojevnoj pravoj. Obuhvataju i racionalne i iracionalne.",
  },
  {
    key: "Q",
    label: "Racionalni brojevi",
    symbol: "\u211A",
    color: "rgba(207, 183, 255, 0.85)",
    colorFill: "rgba(207, 183, 255, 0.08)",
    examples: "1/2, -3/4, 0.25, 0.\u03053, ...",
    description:
      "Brojevi koji se mogu zapisati kao razlomak p/q gde su p i q celi, q \u2260 0.",
  },
  {
    key: "Z",
    label: "Celi brojevi",
    symbol: "\u2124",
    color: "rgba(255, 197, 127, 0.85)",
    colorFill: "rgba(255, 197, 127, 0.08)",
    examples: "..., -3, -2, -1, 0, 1, 2, 3, ...",
    description:
      "Prirodni brojevi, njihovi negativni parnjaci i nula.",
  },
  {
    key: "N",
    label: "Prirodni brojevi",
    symbol: "\u2115",
    color: "rgba(121, 223, 184, 0.85)",
    colorFill: "rgba(121, 223, 184, 0.10)",
    examples: "1, 2, 3, 4, 5, ...",
    description: "Brojevi za prebrojavanje: 1, 2, 3, ...",
  },
];

export default function NumberSetDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredSet, setHoveredSet] = useState<string | null>(null);
  const [selectedSet, setSelectedSet] = useState<string | null>("R");

  const activeSet = hoveredSet || selectedSet;

  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cssWidth = canvas.clientWidth || 700;
    const cssHeight = Math.max(320, Math.round(cssWidth * 0.5));
    const ratio = window.devicePixelRatio || 1;

    canvas.width = Math.round(cssWidth * ratio);
    canvas.height = Math.round(cssHeight * ratio);
    canvas.style.height = `${cssHeight}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    ctx.clearRect(0, 0, cssWidth, cssHeight);

    const cx = cssWidth / 2;
    const cy = cssHeight / 2;

    /* Nested ellipses from outermost (R) to innermost (N) */
    const ellipses = [
      { key: "R", rx: cssWidth * 0.44, ry: cssHeight * 0.42 },
      { key: "Q", rx: cssWidth * 0.34, ry: cssHeight * 0.34 },
      { key: "Z", rx: cssWidth * 0.24, ry: cssHeight * 0.26 },
      { key: "N", rx: cssWidth * 0.14, ry: cssHeight * 0.17 },
    ];

    for (const e of ellipses) {
      const setInfo = SETS.find((s) => s.key === e.key)!;
      const isActive = activeSet === e.key;

      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx, cy, e.rx, e.ry, 0, 0, Math.PI * 2);

      /* Fill */
      ctx.fillStyle = isActive
        ? setInfo.colorFill.replace(/[\d.]+\)$/, (m) =>
            `${Math.min(parseFloat(m) * 3, 0.25)})`,
          )
        : setInfo.colorFill;
      ctx.fill();

      /* Border */
      ctx.strokeStyle = isActive
        ? setInfo.color
        : setInfo.color.replace(/[\d.]+\)$/, "0.35)");
      ctx.lineWidth = isActive ? 2.5 : 1.5;
      if (!isActive) ctx.setLineDash([6, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      /* Label */
      const labelY = cy - e.ry + 22;
      ctx.fillStyle = isActive
        ? setInfo.color
        : setInfo.color.replace(/[\d.]+\)$/, "0.6)");
      ctx.font = `${isActive ? 800 : 600} ${isActive ? 18 : 15}px Inter, system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(setInfo.symbol, cx, labelY);

      ctx.restore();
    }

    /* Irrationals label in the gap between R and Q */
    const irrActive = activeSet === "R";
    ctx.fillStyle = irrActive
      ? "rgba(143, 215, 255, 0.8)"
      : "rgba(143, 215, 255, 0.4)";
    ctx.font = `500 ${irrActive ? 13 : 11}px Inter, system-ui, sans-serif`;
    ctx.textAlign = "left";
    ctx.fillText(
      "\u211D \\ \u211A (iracionalni)",
      cx + cssWidth * 0.2,
      cy - cssHeight * 0.12,
    );

    /* Example numbers placed on the diagram */
    const examples = [
      { label: "1", x: cx, y: cy + 8, set: "N" },
      { label: "5", x: cx + cssWidth * 0.06, y: cy - cssHeight * 0.04, set: "N" },
      { label: "0", x: cx - cssWidth * 0.18, y: cy, set: "Z" },
      { label: "-3", x: cx + cssWidth * 0.16, y: cy + cssHeight * 0.08, set: "Z" },
      { label: "\u00BD", x: cx - cssWidth * 0.28, y: cy - cssHeight * 0.06, set: "Q" },
      { label: "0.\u03053", x: cx + cssWidth * 0.26, y: cy + cssHeight * 0.15, set: "Q" },
      { label: "\u221A2", x: cx - cssWidth * 0.38, y: cy + cssHeight * 0.08, set: "R" },
      { label: "\u03C0", x: cx + cssWidth * 0.36, y: cy - cssHeight * 0.2, set: "R" },
    ];

    for (const ex of examples) {
      const isExActive = activeSet === ex.set;
      const setInfo = SETS.find((s) => s.key === ex.set)!;

      ctx.fillStyle = isExActive
        ? setInfo.color
        : "rgba(246, 238, 233, 0.4)";
      ctx.font = `${isExActive ? 700 : 500} ${isExActive ? 15 : 13}px Inter, system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(ex.label, ex.x, ex.y);
    }
  }, [activeSet]);

  useEffect(() => {
    renderCanvas();
    const handler = () => renderCanvas();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [renderCanvas]);

  /* Mouse interaction */
  const handleCanvasMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      const dx = (mx - cx) / rect.width;
      const dy = (my - cy) / rect.height;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 0.14) setHoveredSet("N");
      else if (dist < 0.24) setHoveredSet("Z");
      else if (dist < 0.34) setHoveredSet("Q");
      else if (dist < 0.44) setHoveredSet("R");
      else setHoveredSet(null);
    },
    [],
  );

  const activeInfo = SETS.find((s) => s.key === activeSet);

  return (
    <div style={{ marginTop: 18 }}>
      <div className={s.canvasWrap}>
        <canvas
          ref={canvasRef}
          onMouseMove={handleCanvasMove}
          onMouseLeave={() => setHoveredSet(null)}
          onClick={() => {
            if (hoveredSet) setSelectedSet(hoveredSet);
          }}
          style={{
            width: "100%",
            display: "block",
            borderRadius: 18,
            cursor: "pointer",
            background:
              "radial-gradient(circle at 50% 50%, rgba(236,91,19,0.04), transparent 40%), linear-gradient(180deg, rgba(255,255,255,0.015), rgba(255,255,255,0))",
          }}
        />
      </div>

      {/* Buttons row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          marginTop: 14,
          justifyContent: "center",
        }}
      >
        {SETS.map((set) => (
          <button
            key={set.key}
            className={s.presetBtn}
            style={{
              background:
                activeSet === set.key
                  ? set.colorFill.replace(/[\d.]+\)$/, "0.22)")
                  : undefined,
              borderColor:
                activeSet === set.key
                  ? set.color.replace(/[\d.]+\)$/, "0.5)")
                  : undefined,
              color:
                activeSet === set.key ? set.color : "var(--lesson-accent)",
            }}
            onMouseEnter={() => setHoveredSet(set.key)}
            onMouseLeave={() => setHoveredSet(null)}
            onClick={() => setSelectedSet(set.key)}
          >
            {set.symbol} {set.label}
          </button>
        ))}
      </div>

      {/* Info panel */}
      {activeInfo && (
        <div
          className={s.labNote}
          style={{
            marginTop: 14,
            borderColor: activeInfo.color.replace(/[\d.]+\)$/, "0.25)"),
          }}
        >
          <strong style={{ color: activeInfo.color, fontSize: "1.05rem" }}>
            {activeInfo.symbol} {activeInfo.label}
          </strong>
          <p
            style={{
              color: "var(--lesson-muted)",
              marginTop: 6,
              marginBottom: 4,
            }}
          >
            {activeInfo.description}
          </p>
          <p style={{ color: "var(--lesson-muted-strong)", fontWeight: 600 }}>
            Primeri: {activeInfo.examples}
          </p>
        </div>
      )}
    </div>
  );
}
