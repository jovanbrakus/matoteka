"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { MathJax } from "better-react-mathjax";
import s from "@/styles/lesson-layout.module.css";

const FONT = '"Public Sans", sans-serif';

interface AngleInfo {
  deg: number;
  rad: string;
  cos: string;
  sin: string;
}

const ANGLES: AngleInfo[] = [
  { deg: 0, rad: "0", cos: "1", sin: "0" },
  { deg: 30, rad: "\\frac{\\pi}{6}", cos: "\\frac{\\sqrt{3}}{2}", sin: "\\frac{1}{2}" },
  { deg: 45, rad: "\\frac{\\pi}{4}", cos: "\\frac{\\sqrt{2}}{2}", sin: "\\frac{\\sqrt{2}}{2}" },
  { deg: 60, rad: "\\frac{\\pi}{3}", cos: "\\frac{1}{2}", sin: "\\frac{\\sqrt{3}}{2}" },
  { deg: 90, rad: "\\frac{\\pi}{2}", cos: "0", sin: "1" },
  { deg: 120, rad: "\\frac{2\\pi}{3}", cos: "-\\frac{1}{2}", sin: "\\frac{\\sqrt{3}}{2}" },
  { deg: 135, rad: "\\frac{3\\pi}{4}", cos: "-\\frac{\\sqrt{2}}{2}", sin: "\\frac{\\sqrt{2}}{2}" },
  { deg: 150, rad: "\\frac{5\\pi}{6}", cos: "-\\frac{\\sqrt{3}}{2}", sin: "\\frac{1}{2}" },
  { deg: 180, rad: "\\pi", cos: "-1", sin: "0" },
  { deg: 210, rad: "\\frac{7\\pi}{6}", cos: "-\\frac{\\sqrt{3}}{2}", sin: "-\\frac{1}{2}" },
  { deg: 225, rad: "\\frac{5\\pi}{4}", cos: "-\\frac{\\sqrt{2}}{2}", sin: "-\\frac{\\sqrt{2}}{2}" },
  { deg: 240, rad: "\\frac{4\\pi}{3}", cos: "-\\frac{1}{2}", sin: "-\\frac{\\sqrt{3}}{2}" },
  { deg: 270, rad: "\\frac{3\\pi}{2}", cos: "0", sin: "-1" },
  { deg: 300, rad: "\\frac{5\\pi}{3}", cos: "\\frac{1}{2}", sin: "-\\frac{\\sqrt{3}}{2}" },
  { deg: 315, rad: "\\frac{7\\pi}{4}", cos: "\\frac{\\sqrt{2}}{2}", sin: "-\\frac{\\sqrt{2}}{2}" },
  { deg: 330, rad: "\\frac{11\\pi}{6}", cos: "\\frac{\\sqrt{3}}{2}", sin: "-\\frac{1}{2}" },
];

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

export default function UnitCircleDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

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
      gridStrong: isLight ? "rgba(0,0,0,0.22)" : "rgba(255,255,255,0.22)",
      gridLabel: isLight ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.35)",
      axisLabel: isLight ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.6)",
      circleStroke: isLight ? "rgba(236,91,19,0.18)" : "rgba(255, 154, 106, 0.15)",
      dotInactive: isLight ? "rgba(236,91,19,0.50)" : "rgba(255, 156, 109, 0.6)",
    };

    const dpr = window.devicePixelRatio || 1;
    const w = Math.max(300, canvas.clientWidth || 500);
    const h = w;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;
    const R = (w / 2) * 0.7;

    // Background
    ctx.fillStyle = T.bg;
    ctx.fillRect(0, 0, w, h);

    // Grid circle at r=1
    ctx.strokeStyle = T.circleStroke;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.stroke();

    // Axes
    ctx.strokeStyle = T.gridStrong;
    ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(20, cy); ctx.lineTo(w - 20, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, 20); ctx.lineTo(cx, h - 20); ctx.stroke();

    ctx.fillStyle = T.axisLabel;
    ctx.font = `600 12px ${FONT}`;
    ctx.fillText("Re", w - 22, cy - 8);
    ctx.fillText("Im", cx + 8, 18);

    // 1 and -1 labels
    ctx.fillStyle = T.gridLabel;
    ctx.font = `500 11px ${FONT}`;
    ctx.fillText("1", cx + R + 4, cy + 14);
    ctx.fillText("-1", cx - R - 14, cy + 14);
    ctx.fillText("i", cx + 6, cy - R - 4);
    ctx.fillText("-i", cx + 6, cy + R + 14);

    // Points
    ANGLES.forEach((angle, idx) => {
      const rad = degToRad(angle.deg);
      const px = cx + R * Math.cos(rad);
      const py = cy - R * Math.sin(rad);
      const isActive = activeIdx === idx;

      // Vector for active
      if (isActive) {
        ctx.strokeStyle = "#ec5b13";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(px, py);
        ctx.stroke();

        // Arc
        const arcR = 28;
        ctx.strokeStyle = "#cfb7ff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, arcR, 0, -rad, rad > 0);
        ctx.stroke();
      }

      // Dot
      ctx.fillStyle = isActive ? "#ec5b13" : T.dotInactive;
      ctx.beginPath();
      ctx.arc(px, py, isActive ? 6 : 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Degree label near point
      if (isActive) {
        ctx.fillStyle = T.text;
        ctx.font = `700 11px ${FONT}`;
        const labelDist = R + 18;
        const lx = cx + labelDist * Math.cos(rad);
        const ly = cy - labelDist * Math.sin(rad);
        ctx.textAlign = "center";
        ctx.fillText(`${angle.deg}°`, lx, ly + 4);
        ctx.textAlign = "start";
      }
    });
  }, [activeIdx]);

  useEffect(() => { draw(); }, [draw]);
  useEffect(() => {
    const h = () => draw();
    window.addEventListener("resize", h);
    const observer = new MutationObserver(() => draw());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => { window.removeEventListener("resize", h); observer.disconnect(); };
  }, [draw]);

  const handleInteraction = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const clickAngle = Math.atan2(cy - y, x - cx);
    const clickDeg = ((clickAngle * 180) / Math.PI + 360) % 360;

    let closest = 0;
    let minDist = 999;
    ANGLES.forEach((a, i) => {
      let d = Math.abs(a.deg - clickDeg);
      if (d > 180) d = 360 - d;
      if (d < minDist) {
        minDist = d;
        closest = i;
      }
    });
    setActiveIdx(closest);
  };

  const active = activeIdx !== null ? ANGLES[activeIdx] : null;

  return (
    <div>
      <div className={s.diagramWrap}>
        <canvas
          ref={canvasRef}
          className={s.diagramCanvas}
          style={{ aspectRatio: "1 / 1", cursor: "pointer" }}
          width={500}
          height={500}
          aria-label="Jedinična kružnica sa specijalnim uglovima"
          onClick={handleInteraction}
          onMouseMove={handleInteraction}
        />
      </div>
      {active && (
        <div className={s.labNote} style={{ marginTop: 12 }}>
          <MathJax dynamic>
            {`\\(\\varphi = ${active.rad}\\) \\((${active.deg}^\\circ)\\) \\(\\Rightarrow\\) \\(\\cos \\varphi = ${active.cos}\\), \\(\\sin \\varphi = ${active.sin}\\)`}
          </MathJax>
        </div>
      )}
      <p className={s.diagramCaption}>
        Pomeri miš po kružnici da vidiš vrednosti{" "}
        <MathJax inline>{"\\(\\cos\\varphi\\)"}</MathJax> i{" "}
        <MathJax inline>{"\\(\\sin\\varphi\\)"}</MathJax> za specijalne uglove.
      </p>
    </div>
  );
}
