"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import s from "@/styles/lesson-layout.module.css";

/* ── Element placement ── */
interface VennElement {
  value: string;
  region: "Aonly" | "Bonly" | "both" | "outside";
}

const ELEMENTS: VennElement[] = [
  { value: "1", region: "Aonly" },
  { value: "2", region: "Aonly" },
  { value: "3", region: "both" },
  { value: "5", region: "both" },
  { value: "4", region: "Bonly" },
  { value: "6", region: "Bonly" },
  { value: "7", region: "outside" },
  { value: "8", region: "outside" },
];

type OpKey = "union" | "intersection" | "aMinusB" | "bMinusA" | "symDiff";

interface Operation {
  label: string;
  formula: string;
  description: string;
  contains: (region: string) => boolean;
  highlightRegions: string[];
}

const OPERATIONS: Record<OpKey, Operation> = {
  union: {
    label: "A \\cup B",
    formula: "A \\cup B",
    description:
      "Unija sadrzi sve elemente koji se nalaze u skupu A, u skupu B, ili u oba skupa odjednom.",
    contains: (r) => r === "Aonly" || r === "Bonly" || r === "both",
    highlightRegions: ["Aonly", "Bonly", "both"],
  },
  intersection: {
    label: "A \\cap B",
    formula: "A \\cap B",
    description:
      "Presek zadrzava samo elemente koji pripadaju i skupu A i skupu B.",
    contains: (r) => r === "both",
    highlightRegions: ["both"],
  },
  aMinusB: {
    label: "A \\setminus B",
    formula: "A \\setminus B",
    description:
      "Razlika A \\ B sadrzi elemente koji su u A, ali nisu u B.",
    contains: (r) => r === "Aonly",
    highlightRegions: ["Aonly"],
  },
  bMinusA: {
    label: "B \\setminus A",
    formula: "B \\setminus A",
    description:
      "Razlika B \\ A sadrzi elemente koji su u B, ali nisu u A.",
    contains: (r) => r === "Bonly",
    highlightRegions: ["Bonly"],
  },
  symDiff: {
    label: "A \\triangle B",
    formula: "A \\triangle B",
    description:
      "Simetricna razlika sadrzi elemente koji pripadaju tacno jednom od skupova, ali ne i preseku.",
    contains: (r) => r === "Aonly" || r === "Bonly",
    highlightRegions: ["Aonly", "Bonly"],
  },
};

const OP_KEYS: OpKey[] = [
  "union",
  "intersection",
  "aMinusB",
  "bMinusA",
  "symDiff",
];

const OP_BUTTON_LABELS: Record<OpKey, string> = {
  union: "A \u222a B",
  intersection: "A \u2229 B",
  aMinusB: "A \\ B",
  bMinusA: "B \\ A",
  symDiff: "A \u25b3 B",
};

/* ── Positions relative to a 980x480 logical space ── */
function elementPositions(): Record<string, { x: number; y: number }> {
  return {
    "1": { x: 250, y: 230 },
    "2": { x: 300, y: 160 },
    "3": { x: 465, y: 190 },
    "5": { x: 445, y: 260 },
    "4": { x: 610, y: 165 },
    "6": { x: 660, y: 235 },
    "7": { x: 130, y: 100 },
    "8": { x: 785, y: 315 },
  };
}

export default function VennDiagramLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeOp, setActiveOp] = useState<OpKey>("union");
  const [activeEl, setActiveEl] = useState<VennElement>(ELEMENTS[0]);

  /* Hit-test list rebuilt every draw */
  const hitRef = useRef<
    { x: number; y: number; r: number; item: VennElement }[]
  >([]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const W = Math.max(320, Math.floor(rect.width));
    const H = 480;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    canvas.style.height = H + "px";

    const op = OPERATIONS[activeOp];
    const positions = elementPositions();
    const hits: typeof hitRef.current = [];

    /* Background */
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, "#160906");
    bg.addColorStop(1, "#0b0403");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    /* Title */
    ctx.fillStyle = "#f6eee9";
    ctx.font = '800 24px "Public Sans", system-ui, sans-serif';
    ctx.textAlign = "left";
    ctx.fillText("Venn laboratorija", 26, 42);

    ctx.fillStyle = "#cdb8aa";
    ctx.font = '400 14px "Public Sans", system-ui, sans-serif';
    ctx.fillText(
      "Klikni broj u dijagramu i proveri pripadnost rezultujucem skupu",
      26,
      66
    );

    /* Scale factors for responsive sizing */
    const scaleX = W / 980;

    /* Circle centres & radius (scale horizontally) */
    const leftC = { x: 380 * scaleX, y: 240, r: 120 * scaleX };
    const rightC = { x: 550 * scaleX, y: 240, r: 120 * scaleX };
    const uRect = { x: 70 * scaleX, y: 95, w: W - 140 * scaleX, h: 320 };

    /* Universal set rectangle */
    ctx.strokeStyle = "rgba(255, 154, 106, 0.18)";
    ctx.lineWidth = 2;
    ctx.strokeRect(uRect.x, uRect.y, uRect.w, uRect.h);
    ctx.fillStyle = "#cdb8aa";
    ctx.font = '700 16px "Public Sans", system-ui, sans-serif';
    ctx.textAlign = "left";
    ctx.fillText("U", uRect.x + 8, uRect.y + 20);

    /* Highlighted regions */
    const highlightA =
      op.highlightRegions.includes("Aonly") ||
      op.highlightRegions.includes("both");
    const highlightB =
      op.highlightRegions.includes("Bonly") ||
      op.highlightRegions.includes("both");

    if (highlightA) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(leftC.x, leftC.y, leftC.r, 0, Math.PI * 2);
      ctx.clip();
      if (!op.highlightRegions.includes("both")) {
        ctx.beginPath();
        ctx.arc(rightC.x, rightC.y, rightC.r, 0, Math.PI * 2);
        ctx.globalCompositeOperation = "destination-out";
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(236, 91, 19, 0.14)";
      ctx.fillRect(uRect.x, uRect.y, uRect.w, uRect.h);
      ctx.restore();
    }

    if (highlightB) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(rightC.x, rightC.y, rightC.r, 0, Math.PI * 2);
      ctx.clip();
      if (!op.highlightRegions.includes("both")) {
        ctx.beginPath();
        ctx.arc(leftC.x, leftC.y, leftC.r, 0, Math.PI * 2);
        ctx.globalCompositeOperation = "destination-out";
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(255, 154, 106, 0.12)";
      ctx.fillRect(uRect.x, uRect.y, uRect.w, uRect.h);
      ctx.restore();
    }

    /* Circle outlines */
    ctx.strokeStyle = "rgba(255, 154, 106, 0.42)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(leftC.x, leftC.y, leftC.r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(rightC.x, rightC.y, rightC.r, 0, Math.PI * 2);
    ctx.stroke();

    /* Labels */
    ctx.fillStyle = "#ffb488";
    ctx.font = '700 18px "Public Sans", system-ui, sans-serif';
    ctx.textAlign = "center";
    ctx.fillText("A", leftC.x - 65 * scaleX, leftC.y - 85);
    ctx.fillText("B", rightC.x + 55 * scaleX, rightC.y - 85);

    /* Elements */
    ELEMENTS.forEach((item) => {
      const pos = positions[item.value];
      const px = pos.x * scaleX;
      const py = pos.y;
      const isActive = item.value === activeEl.value;
      const belongs = op.contains(item.region);
      const radius = isActive ? 22 : 18;
      hits.push({ x: px, y: py, r: radius + 8, item });

      const fill = belongs
        ? "rgba(103, 215, 173, 0.18)"
        : "rgba(255, 180, 136, 0.12)";
      const stroke = belongs
        ? "rgba(103, 215, 173, 0.42)"
        : "rgba(255, 180, 136, 0.32)";
      const textColor = belongs ? "#67d7ad" : "#ffb488";

      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.strokeStyle = isActive ? "#f6eee9" : stroke;
      ctx.lineWidth = isActive ? 2.5 : 1.4;
      ctx.stroke();

      ctx.fillStyle = textColor;
      ctx.font = '700 15px "Public Sans", system-ui, sans-serif';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(item.value, px, py + 0.5);
    });

    /* Footer note */
    ctx.fillStyle = "#cdb8aa";
    ctx.font = '400 13px "Public Sans", system-ui, sans-serif';
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(
      "Zelenkasto obelezeni elementi pripadaju trenutno izabranoj operaciji.",
      28,
      H - 22
    );

    hitRef.current = hits;
  }, [activeOp, activeEl]);

  /* Redraw on state or resize */
  useEffect(() => {
    draw();
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [draw]);

  /* Click / touch handler */
  const handlePointer = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clientX =
        "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
      const clientY =
        "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const hit = hitRef.current.find((h) => {
        const dx = x - h.x;
        const dy = y - h.y;
        return Math.sqrt(dx * dx + dy * dy) <= h.r;
      });
      if (hit) {
        setActiveEl(hit.item);
      }
    },
    []
  );

  /* Derive explanation text */
  const op = OPERATIONS[activeOp];
  const belongsA =
    activeEl.region === "Aonly" || activeEl.region === "both";
  const belongsB =
    activeEl.region === "Bonly" || activeEl.region === "both";
  const belongsResult = op.contains(activeEl.region);

  return (
    <>
      {/* Operation buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 18 }}>
        {OP_KEYS.map((key) => (
          <button
            key={key}
            className={s.presetBtn}
            style={
              activeOp === key
                ? {
                    background: "rgba(236, 91, 19, 0.22)",
                    borderColor: "rgba(255, 154, 106, 0.45)",
                  }
                : undefined
            }
            onClick={() => setActiveOp(key)}
          >
            {OP_BUTTON_LABELS[key]}
          </button>
        ))}
      </div>

      {/* Canvas */}
      <div className={s.canvasWrap}>
        <canvas
          ref={canvasRef}
          className={s.polarCanvas}
          style={{ cursor: "pointer", touchAction: "none" }}
          onClick={handlePointer}
          onTouchStart={(e) => {
            e.preventDefault();
            handlePointer(e);
          }}
        />
        <p
          style={{
            color: "var(--lesson-muted)",
            fontSize: "0.92rem",
            marginTop: 12,
            textAlign: "center",
          }}
        >
          Klikni element u dijagramu. Na telefonu koristi dodir. Oznaka U
          predstavlja univerzalni skup.
        </p>
      </div>

      {/* Readings */}
      <div className={s.resultsGrid} style={{ marginTop: 16 }}>
        <div className={s.resultCard}>
          <strong>Aktivna operacija</strong>
          <p style={{ color: "var(--lesson-muted-strong)" }}>
            {OP_BUTTON_LABELS[activeOp]}
          </p>
          <p style={{ color: "var(--lesson-muted)", marginTop: 8, fontSize: "0.92rem" }}>
            {op.description}
          </p>
        </div>
        <div className={s.resultCard}>
          <strong>Izabrani element: {activeEl.value}</strong>
          <p style={{ color: "var(--lesson-muted)", marginTop: 8, fontSize: "0.92rem" }}>
            {activeEl.value} {belongsA ? "\u2208 A" : "\u2209 A"},{" "}
            {activeEl.value} {belongsB ? "\u2208 B" : "\u2209 B"}.
          </p>
          <p
            style={{
              color: belongsResult
                ? "var(--lesson-success)"
                : "var(--lesson-danger)",
              marginTop: 6,
              fontWeight: 700,
            }}
          >
            {activeEl.value}{" "}
            {belongsResult ? "\u2208" : "\u2209"}{" "}
            {OP_BUTTON_LABELS[activeOp]}
          </p>
        </div>
      </div>

      <div className={s.labNote} style={{ marginTop: 16 }}>
        <strong style={{ display: "block", marginBottom: 8, color: "var(--lesson-primary-soft)" }}>
          Fiksni skupovi u laboratoriji
        </strong>
        <p style={{ color: "var(--lesson-muted-strong)", fontSize: "0.92rem" }}>
          A = {"{"} 1, 2, 3, 5 {"}"}, B = {"{"} 3, 4, 5, 6 {"}"}. Elementi 7 i
          8 su u univerzalnom skupu, ali van A i B.
        </p>
      </div>
    </>
  );
}
