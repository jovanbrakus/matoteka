"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { MathJax } from "better-react-mathjax";
import s from "@/styles/lesson-layout.module.css";

const FONT = '"Public Sans", sans-serif';

const QUADRANT_COLORS = [
  "rgba(236, 91, 19, 0.12)",   // I  — orange
  "rgba(143, 215, 255, 0.10)", // II — cyan
  "rgba(207, 183, 255, 0.10)", // III — violet
  "rgba(121, 223, 184, 0.10)", // IV — green
];

const QUADRANT_LABELS = ["I", "II", "III", "IV"];
const QUADRANT_FORMULAS = [
  "\\varphi = \\alpha",
  "\\varphi = \\pi - \\alpha",
  "\\varphi = \\pi + \\alpha",
  "\\varphi = 2\\pi - \\alpha",
];

const EXAMPLE_POINTS: { a: number; b: number }[] = [
  { a: 2, b: 1.5 },
  { a: -2, b: 1.5 },
  { a: -2, b: -1.5 },
  { a: 2, b: -1.5 },
];

export default function QuadrantDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeQ, setActiveQ] = useState<number | null>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = Math.max(280, canvas.clientWidth || 460);
    const h = Math.max(280, Math.round(w * 0.85));
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;
    const qw = cx - 30;
    const qh = cy - 30;

    // Background
    ctx.fillStyle = "rgba(8, 4, 2, 0.95)";
    ctx.fillRect(0, 0, w, h);

    // Quadrant fills
    const quadRects = [
      [cx, cy - qh, qw, qh],           // I (top-right)
      [cx - qw, cy - qh, qw, qh],      // II (top-left)
      [cx - qw, cy, qw, qh],           // III (bottom-left)
      [cx, cy, qw, qh],                // IV (bottom-right)
    ];

    quadRects.forEach((rect, i) => {
      ctx.fillStyle = activeQ === i ? QUADRANT_COLORS[i].replace(/[\d.]+\)$/, "0.25)") : QUADRANT_COLORS[i];
      ctx.fillRect(rect[0], rect[1], rect[2], rect[3]);
    });

    // Axes
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(30, cy); ctx.lineTo(w - 30, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, 30); ctx.lineTo(cx, h - 30); ctx.stroke();

    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.font = `600 13px ${FONT}`;
    ctx.fillText("Re", w - 28, cy - 10);
    ctx.fillText("Im", cx + 10, 22);

    // Quadrant labels
    const labelPositions = [
      [cx + qw * 0.5, cy - qh * 0.5],
      [cx - qw * 0.5, cy - qh * 0.5],
      [cx - qw * 0.5, cy + qh * 0.5],
      [cx + qw * 0.5, cy + qh * 0.5],
    ];

    labelPositions.forEach((pos, i) => {
      ctx.fillStyle = activeQ === i ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.25)";
      ctx.font = `800 22px ${FONT}`;
      ctx.textAlign = "center";
      ctx.fillText(QUADRANT_LABELS[i], pos[0], pos[1] - 10);
      ctx.textAlign = "start";
    });

    // Example point + vector for active quadrant
    if (activeQ !== null) {
      const pt = EXAMPLE_POINTS[activeQ];
      const scale = Math.min(qw, qh) * 0.4;
      const px = cx + pt.a / 2.5 * scale;
      const py = cy - pt.b / 2.5 * scale;

      // Vector
      ctx.strokeStyle = "#ec5b13";
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(px, py);
      ctx.stroke();

      // Arc for reference angle
      const refAngle = Math.atan2(Math.abs(pt.b), Math.abs(pt.a));
      const actualAngle = Math.atan2(pt.b, pt.a);
      const arcR = 30;
      ctx.strokeStyle = "#cfb7ff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, arcR, 0, -actualAngle, actualAngle > 0);
      ctx.stroke();

      // Reference angle dashed
      ctx.setLineDash([4, 3]);
      ctx.strokeStyle = "rgba(255, 156, 109, 0.4)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px, cy);
      ctx.stroke();
      ctx.setLineDash([]);

      // Point
      ctx.fillStyle = "#ec5b13";
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fill();

      // Alpha label
      ctx.fillStyle = "#ff9c6d";
      ctx.font = `700 12px ${FONT}`;
      const aX = cx + 38 * Math.cos(-actualAngle / 2);
      const aY = cy + 38 * Math.sin(-actualAngle / 2);
      ctx.fillText("α", aX, aY + 4);

      // Sign indicators
      ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
      ctx.font = `600 11px ${FONT}`;
      const signs = [
        ["a>0, b>0", "a<0, b>0", "a<0, b<0", "a>0, b<0"],
      ][0];
      labelPositions.forEach((pos, i) => {
        ctx.textAlign = "center";
        ctx.fillText(signs[i], pos[0], pos[1] + 14);
        ctx.textAlign = "start";
      });
    }
  }, [activeQ]);

  useEffect(() => { draw(); }, [draw]);
  useEffect(() => {
    const h = () => draw();
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [draw]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    if (x >= cx && y < cy) setActiveQ(0);
    else if (x < cx && y < cy) setActiveQ(1);
    else if (x < cx && y >= cy) setActiveQ(2);
    else setActiveQ(3);
  };

  return (
    <div>
      <div className={s.diagramWrap}>
        <canvas
          ref={canvasRef}
          className={s.diagramCanvas}
          style={{ aspectRatio: "1 / 0.85", cursor: "pointer" }}
          width={460}
          height={391}
          aria-label="Kvadranti i argument — klikni na kvadrant"
          onClick={handleClick}
        />
      </div>
      {activeQ !== null && (
        <div className={s.labNote} style={{ marginTop: 12 }}>
          <strong style={{ color: "var(--lesson-primary-soft)" }}>
            Kvadrant {QUADRANT_LABELS[activeQ]}:
          </strong>{" "}
          <MathJax inline dynamic>
            {`\\(${QUADRANT_FORMULAS[activeQ]}\\)`}
          </MathJax>
          <span style={{ color: "var(--lesson-muted)", marginLeft: 8 }}>
            gde je{" "}
            <MathJax inline>
              {"\\(\\alpha = \\arctan\\left|\\frac{b}{a}\\right|\\)"}
            </MathJax>
          </span>
        </div>
      )}
      <p className={s.diagramCaption}>
        Klikni na kvadrant da vidiš formulu za argument. Referentni ugao{" "}
        <MathJax inline>{"\\(\\alpha\\)"}</MathJax> je uvek pozitivan — kvadrant
        određuje konačan <MathJax inline>{"\\(\\varphi\\)"}</MathJax>.
      </p>
    </div>
  );
}
