"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { MathJax } from "better-react-mathjax";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

const FONT = '"Public Sans", sans-serif';

export default function GaussianPlaneDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [point, setPoint] = useState({ a: 3, b: 2 });
  const [dragging, setDragging] = useState(false);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isLight = document.documentElement.classList.contains("light");
    const T = {
      bg: isLight ? "#f5f0eb" : "rgba(8, 4, 2, 0.95)",
      text: isLight ? "#2a2420" : "#f6eee9",
      muted: isLight ? "#7a6f68" : "#cdb8aa",
      grid: isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)",
      gridStrong: isLight ? "rgba(0,0,0,0.22)" : "rgba(255,255,255,0.28)",
      gridLabel: isLight ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.3)",
      axisLabel: isLight ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.7)",
      projection: isLight ? "rgba(236,91,19,0.30)" : "rgba(255, 156, 109, 0.35)",
      pointGlow: isLight ? "rgba(236,91,19,0.40)" : "rgba(236, 91, 19, 0.5)",
    };

    const dpr = window.devicePixelRatio || 1;
    const w = Math.max(320, canvas.clientWidth || 500);
    const h = Math.max(320, Math.round(w * 0.85));
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const { a, b } = point;
    const maxCoord = Math.max(Math.abs(a), Math.abs(b), 4) + 1.5;
    const margin = 40;
    const scale = Math.min((w / 2 - margin) / maxCoord, (h / 2 - margin) / maxCoord);
    const cx = w / 2;
    const cy = h / 2;
    const mx = (x: number) => cx + x * scale;
    const my = (y: number) => cy - y * scale;

    // Background
    ctx.fillStyle = T.bg;
    ctx.fillRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = T.grid;
    ctx.lineWidth = 1;
    for (let i = -Math.ceil(maxCoord); i <= Math.ceil(maxCoord); i++) {
      ctx.beginPath();
      ctx.moveTo(mx(i), margin * 0.5);
      ctx.lineTo(mx(i), h - margin * 0.5);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(margin * 0.5, my(i));
      ctx.lineTo(w - margin * 0.5, my(i));
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = T.gridStrong;
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(margin * 0.4, cy); ctx.lineTo(w - margin * 0.4, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, margin * 0.4); ctx.lineTo(cx, h - margin * 0.4); ctx.stroke();

    ctx.fillStyle = T.axisLabel;
    ctx.font = `600 13px ${FONT}`;
    ctx.fillText("Re", w - 30, cy - 10);
    ctx.fillText("Im", cx + 10, 22);

    // Grid numbers
    ctx.fillStyle = T.gridLabel;
    ctx.font = `500 11px ${FONT}`;
    for (let i = -Math.ceil(maxCoord); i <= Math.ceil(maxCoord); i++) {
      if (i === 0) continue;
      ctx.fillText(String(i), mx(i) - 4, cy + 16);
      ctx.fillText(String(i), cx + 8, my(i) + 4);
    }

    // Dashed projections
    ctx.setLineDash([6, 4]);
    ctx.strokeStyle = T.projection;
    ctx.lineWidth = 1.2;
    // Horizontal from point to Im axis
    ctx.beginPath(); ctx.moveTo(mx(a), my(b)); ctx.lineTo(mx(a), cy); ctx.stroke();
    // Vertical from point to Re axis
    ctx.beginPath(); ctx.moveTo(mx(a), my(b)); ctx.lineTo(cx, my(b)); ctx.stroke();
    ctx.setLineDash([]);

    // Labels for a and b on axes
    ctx.fillStyle = "#ec5b13";
    ctx.font = `700 13px ${FONT}`;
    ctx.fillText(`a = ${a.toFixed(1)}`, mx(a) - 10, cy + 30);
    ctx.fillStyle = "#8fd7ff";
    ctx.fillText(`b = ${b.toFixed(1)}`, cx - 50, my(b) + 4);

    // Modulus r (the vector)
    const r = Math.sqrt(a * a + b * b);
    ctx.strokeStyle = "#ec5b13";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(mx(a), my(b));
    ctx.stroke();

    // Arrowhead
    const angle = Math.atan2(-b, a); // canvas y is inverted
    const arrowAngle = Math.atan2(my(b) - cy, mx(a) - cx);
    const sz = 10;
    ctx.fillStyle = "#ec5b13";
    ctx.beginPath();
    ctx.moveTo(mx(a), my(b));
    ctx.lineTo(mx(a) - sz * Math.cos(arrowAngle - Math.PI / 6), my(b) - sz * Math.sin(arrowAngle - Math.PI / 6));
    ctx.lineTo(mx(a) - sz * Math.cos(arrowAngle + Math.PI / 6), my(b) - sz * Math.sin(arrowAngle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();

    // Point dot
    ctx.fillStyle = "#ec5b13";
    ctx.beginPath();
    ctx.arc(mx(a), my(b), 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = T.pointGlow;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(mx(a), my(b), 12, 0, Math.PI * 2);
    ctx.stroke();

    // Argument arc
    const phi = Math.atan2(b, a);
    const arcR = Math.min(40, r * scale * 0.35);
    if (r > 0.1) {
      ctx.strokeStyle = "#cfb7ff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, arcR, 0, -phi, phi < 0);
      ctx.stroke();

      // Phi label
      const labelAngle = -phi / 2;
      ctx.fillStyle = "#cfb7ff";
      ctx.font = `700 13px ${FONT}`;
      ctx.fillText("φ", cx + (arcR + 12) * Math.cos(labelAngle), cy + (arcR + 12) * Math.sin(labelAngle) + 4);
    }

    // r label along vector
    const midX = (cx + mx(a)) / 2;
    const midY = (cy + my(b)) / 2;
    ctx.fillStyle = "#ff9c6d";
    ctx.font = `700 14px ${FONT}`;
    const rLabel = `r = ${r.toFixed(2)}`;
    ctx.fillText(rLabel, midX - 20, midY - 12);

    // z label
    ctx.fillStyle = T.text;
    ctx.font = `700 14px ${FONT}`;
    ctx.fillText(`z = ${a.toFixed(1)} + ${b.toFixed(1)}i`, mx(a) + 16, my(b) - 4);
  }, [point]);

  useEffect(() => { draw(); }, [draw]);
  useEffect(() => {
    const h = () => draw();
    window.addEventListener("resize", h);
    const observer = new MutationObserver(() => draw());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => { window.removeEventListener("resize", h); observer.disconnect(); };
  }, [draw]);

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const w = rect.width;
    const h = rect.height;
    const maxCoord = Math.max(Math.abs(point.a), Math.abs(point.b), 4) + 1.5;
    const margin = 40;
    const scale = Math.min((w / 2 - margin) / maxCoord, (h / 2 - margin) / maxCoord);
    const a = Math.round(((x - w / 2) / scale) * 10) / 10;
    const b = Math.round(((h / 2 - y) / scale) * 10) / 10;
    return { a: Math.max(-10, Math.min(10, a)), b: Math.max(-10, Math.min(10, b)) };
  };

  return (
    <div>
      <div className={s.diagramWrap}>
        <canvas
          ref={canvasRef}
          className={s.diagramCanvas}
          style={{ aspectRatio: "1 / 0.85", cursor: dragging ? "grabbing" : "grab" }}
          width={500}
          height={425}
          aria-label="Kompleksan broj u Gausovoj ravni — prevuci tačku"
          onMouseDown={(e) => {
            setDragging(true);
            const c = getCanvasCoords(e);
            if (c) setPoint(c);
          }}
          onMouseMove={(e) => {
            if (!dragging) return;
            const c = getCanvasCoords(e);
            if (c) setPoint(c);
          }}
          onMouseUp={() => setDragging(false)}
          onMouseLeave={() => setDragging(false)}
        />
      </div>
      <p className={s.diagramCaption}>
        Prevuci tačku po ravni da vidiš kako se menjaju{" "}
        <MathJax inline>{"\\(a\\)"}</MathJax>,{" "}
        <MathJax inline>{"\\(b\\)"}</MathJax>,{" "}
        <MathJax inline>{"\\(r\\)"}</MathJax> i{" "}
        <MathJax inline>{"\\(\\varphi\\)"}</MathJax>.
      </p>
    </div>
  );
}
