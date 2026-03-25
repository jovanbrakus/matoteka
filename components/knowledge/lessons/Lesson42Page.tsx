"use client";

import { useState, useRef, useEffect, useCallback } from "react";

import LessonShell from "@/components/knowledge/LessonShell";
import LessonHero from "@/components/knowledge/LessonHero";
import LessonNav from "@/components/knowledge/LessonNav";
import LessonSection from "@/components/knowledge/LessonSection";
import MathBlock from "@/components/knowledge/MathBlock";
import InlineMath from "@/components/knowledge/InlineMath";
import WalkStep from "@/components/knowledge/WalkStep";
import ExerciseCard from "@/components/knowledge/ExerciseCard";
import InsightCard from "@/components/knowledge/InsightCard";
import FormulaCard from "@/components/knowledge/FormulaCard";
import MicroCheck from "@/components/knowledge/MicroCheck";
import SectionCard from "@/components/knowledge/SectionCard";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

/* ──────────────────────────────────────────────────────────────────────
   NAV LINKS
   ────────────────────────────────────────────────────────────────────── */

const NAV_LINKS = [
  { href: "#zasto", label: "Zašto je važno" },
  { href: "#osnove", label: "Osnove uglova" },
  { href: "#tales", label: "Talesova teorema" },
  { href: "#podudarnost", label: "Podudarnost" },
  { href: "#slicnost", label: "Sličnost" },
  { href: "#tacke", label: "Značajne tačke" },
  { href: "#interaktivno", label: "Interaktivno" },
  { href: "#primeri", label: "Vođeni primeri" },
  { href: "#formule", label: "Ključne relacije" },
  { href: "#greske", label: "Česte greške" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vežbe" },
  { href: "#rezime", label: "Rezime" },
];

/* ──────────────────────────────────────────────────────────────────────
   TRIANGLE LAB (interactive canvas component)
   ────────────────────────────────────────────────────────────────────── */

interface Point {
  x: number;
  y: number;
}

type TrianglePreset = "acute" | "right" | "obtuse" | "isosceles" | "equilateral";
type LabMode = "centers" | "similarity";
type CenterType = "medians" | "altitudes" | "perpBisectors" | "angleBisectors" | "all";

const PRESETS: Record<TrianglePreset, { label: string; points: Point[] }> = {
  acute: {
    label: "Oštrougli",
    points: [
      { x: -150, y: 110 },
      { x: 150, y: 110 },
      { x: 34, y: -134 },
    ],
  },
  right: {
    label: "Pravougli",
    points: [
      { x: -150, y: 110 },
      { x: 150, y: 110 },
      { x: -150, y: -130 },
    ],
  },
  obtuse: {
    label: "Tupougli",
    points: [
      { x: -150, y: 110 },
      { x: 150, y: 110 },
      { x: -18, y: 22 },
    ],
  },
  isosceles: {
    label: "Jednakokraki",
    points: [
      { x: -150, y: 110 },
      { x: 150, y: 110 },
      { x: 0, y: -150 },
    ],
  },
  equilateral: {
    label: "Jednakostranični",
    points: [
      { x: -150, y: 90 },
      { x: 150, y: 90 },
      { x: 0, y: -170 },
    ],
  },
};

function getTriColors() {
  const isLight = document.documentElement.classList.contains("light");
  return {
    triangle: isLight ? "#3a3028" : "#f6eee9",
    fill: isLight ? "rgba(42, 36, 32, 0.05)" : "rgba(246, 238, 233, 0.05)",
    medians: isLight ? "#1a9e6e" : "#7be0bb",
    altitudes: isLight ? "#d94e4e" : "#ff9c98",
    perpBisectors: isLight ? "#2980b9" : "#8ed3ff",
    angleBisectors: isLight ? "#c99a1a" : "#ffd37b",
    centroid: isLight ? "#1a9e6e" : "#7be0bb",
    orthocenter: isLight ? "#d94e4e" : "#ff9c98",
    circumcenter: isLight ? "#2980b9" : "#8ed3ff",
    incenter: isLight ? "#c99a1a" : "#ffd37b",
    accent: isLight ? "#8b5a2e" : "#ffd4b7",
    grid: isLight ? "rgba(0, 0, 0, 0.06)" : "rgba(255, 255, 255, 0.06)",
    labelBg: isLight ? "rgba(255, 255, 255, 0.84)" : "rgba(10, 5, 3, 0.84)",
    labelBorder: isLight ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.08)",
    simText: isLight ? "rgba(42, 36, 32, 0.92)" : "rgba(240, 223, 212, 0.92)",
    simLine: isLight ? "rgba(0, 0, 0, 0.10)" : "rgba(255, 255, 255, 0.10)",
  };
}

/* ---- geometry helpers ---- */
function add(a: Point, b: Point): Point {
  return { x: a.x + b.x, y: a.y + b.y };
}
function sub(a: Point, b: Point): Point {
  return { x: a.x - b.x, y: a.y - b.y };
}
function mul(p: Point, k: number): Point {
  return { x: p.x * k, y: p.y * k };
}
function midpoint(a: Point, b: Point): Point {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}
function dist(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}
function dot(a: Point, b: Point): number {
  return a.x * b.x + a.y * b.y;
}
function cross(a: Point, b: Point): number {
  return a.x * b.y - a.y * b.x;
}
function normalize(v: Point): Point {
  const length = Math.hypot(v.x, v.y) || 1;
  return { x: v.x / length, y: v.y / length };
}
function lineIntersection(p1: Point, d1: Point, p2: Point, d2: Point): Point | null {
  const det = cross(d1, d2);
  if (Math.abs(det) < 1e-8) return null;
  const delta = sub(p2, p1);
  const t = cross(delta, d2) / det;
  return add(p1, mul(d1, t));
}
function footFromPointToLine(p: Point, a: Point, b: Point): Point {
  const ab = sub(b, a);
  const t = dot(sub(p, a), ab) / dot(ab, ab);
  return add(a, mul(ab, t));
}
function circumcenterCalc(a: Point, b: Point, c: Point): Point | null {
  const midAB = midpoint(a, b);
  const midAC = midpoint(a, c);
  const dirAB = sub(b, a);
  const dirAC = sub(c, a);
  const perpAB: Point = { x: -dirAB.y, y: dirAB.x };
  const perpAC: Point = { x: -dirAC.y, y: dirAC.x };
  return lineIntersection(midAB, perpAB, midAC, perpAC);
}
function incenterCalc(a: Point, b: Point, c: Point): Point {
  const sA = dist(b, c);
  const sB = dist(a, c);
  const sC = dist(a, b);
  const sum = sA + sB + sC;
  return {
    x: (sA * a.x + sB * b.x + sC * c.x) / sum,
    y: (sA * a.y + sB * b.y + sC * c.y) / sum,
  };
}
function orthocenterCalc(a: Point, b: Point, c: Point): Point | null {
  const altA: Point = { x: -(c.y - b.y), y: c.x - b.x };
  const altB: Point = { x: -(c.y - a.y), y: c.x - a.x };
  return lineIntersection(a, altA, b, altB);
}
function centroidCalc(a: Point, b: Point, c: Point): Point {
  return { x: (a.x + b.x + c.x) / 3, y: (a.y + b.y + c.y) / 3 };
}
function transformPoint(
  p: Point,
  scale: number,
  oX: number,
  oY: number,
  mirror = false,
  rotation = 0
): Point {
  const mx = mirror ? -p.x : p.x;
  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);
  return {
    x: oX + (mx * cos - p.y * sin) * scale,
    y: oY + (mx * sin + p.y * cos) * scale,
  };
}
function classifyTriangle(pts: Point[]): { sideType: string; angleType: string } {
  const [a, b, c] = pts;
  const sides = [dist(b, c), dist(a, c), dist(a, b)].sort((m, n) => m - n);
  const tol = 1e-4;
  let sideType = "raznostraničan";
  if (Math.abs(sides[0] - sides[2]) < tol) sideType = "jednakostraničan";
  else if (Math.abs(sides[0] - sides[1]) < tol || Math.abs(sides[1] - sides[2]) < tol)
    sideType = "jednakokraki";
  const angleVectors: [Point, Point][] = [
    [sub(b, a), sub(c, a)],
    [sub(a, b), sub(c, b)],
    [sub(a, c), sub(b, c)],
  ];
  const dots = angleVectors.map(([u, v]) => dot(u, v));
  let angleType = "oštrougli";
  if (dots.some((v) => Math.abs(v) < 1e-4)) angleType = "pravougli";
  else if (dots.some((v) => v < 0)) angleType = "tupougli";
  return { sideType, angleType };
}

interface LabReadout {
  r1: string;
  r1t: string;
  r2: string;
  r2t: string;
  r3: string;
  r3t: string;
  caption: string;
  note: string;
}

function centersReadout(
  pts: Point[],
  centerType: CenterType
): LabReadout {
  const cls = classifyTriangle(pts);
  const tp = `${cls.angleType} ${cls.sideType} trougao`;

  if (centerType === "medians")
    return {
      r1: "Težište G je presek medijana i uvek je unutar trougla.",
      r1t: "Na svakoj medijani važi odnos 2:1, računato od temena ka sredini naspramne stranice.",
      r2: "Ako zadatak pominje sredine stranica, odmah proveri da li se krije medijana.",
      r2t: "Težište često povezuje površine i razlaganje trougla na tri manje oblasti jednakih površina.",
      r3: `Trenutno gledaš ${tp}.`,
      r3t: "Bez obzira na tip trougla, težište ostaje u unutrašnjosti.",
      caption: "Medijane seku naspramne stranice u njihovim sredinama i sastaju se u težištu G.",
      note: "Proveri da kod svakog tipa trougla težište ostaje unutar figure.",
    };
  if (centerType === "altitudes")
    return {
      r1: "Ortocentar H je presek visina.",
      r1t: "Visina ide iz temena pod pravim uglom na naspramnu stranicu ili njen produžetak.",
      r2: `Za ${cls.angleType} trougao položaj ortocentra je ključan signal.`,
      r2t:
        cls.angleType === "oštrougli"
          ? "Kod oštrouglog trougla ortocentar je unutar trougla."
          : cls.angleType === "pravougli"
          ? "Kod pravouglog trougla ortocentar je baš u temenu pravog ugla."
          : "Kod tupouglog trougla ortocentar izlazi van trougla, što je potpuno očekivano.",
      r3: "Visine su jake jer uvode prave uglove, a pravi uglovi često otvaraju nove sličnosti.",
      r3t: "Mnogo složenijih zadataka prevede se na pravougle trouglove upravo dodavanjem visina.",
      caption: "Pomeraj tip trougla i prati kada se ortocentar seli iz unutrašnjosti van figure.",
      note: "Najveća korist: navikni se da ortocentar van trougla nije greška nego osobina tupouglog trougla.",
    };
  if (centerType === "perpBisectors")
    return {
      r1: "Centar opisane kružnice O je presek simetrala stranica.",
      r1t: "To je tačka jednako udaljena od sva tri temena, pa kroz nju prolazi kružnica opisana oko trougla.",
      r2:
        cls.angleType === "pravougli"
          ? "Kod pravouglog trougla O je tačno u sredini hipotenuze."
          : `Kod ${cls.angleType} trougla položaj centra opisane kružnice zavisi od tipa ugla.`,
      r2t:
        cls.angleType === "oštrougli"
          ? "U oštrouglom trouglu O je unutar trougla."
          : cls.angleType === "pravougli"
          ? "To je jedna od najvažnijih kratkih činjenica za prijemni."
          : "U tupouglom trouglu O se nalazi van trougla.",
      r3: "Ako je tačka jednako udaljena od temena, ne traži simetrale uglova nego simetrale stranica.",
      r3t: "To je standardna razlika između centra opisane i centra upisane kružnice.",
      caption: "Simetrale stranica su normalne na stranicu i prolaze kroz njenu sredinu.",
      note: "Uporedi pravougli i tupougli trougao: u oba slučaja centar opisane kružnice više nije \"tipično unutra\".",
    };
  if (centerType === "angleBisectors")
    return {
      r1: "Centar upisane kružnice I je presek simetrala uglova.",
      r1t: "Jednako je udaljen od sve tri stranice, pa je prirodan centar kružnice upisane u trougao.",
      r2: "Za razliku od ortocentra i centra opisane kružnice, tačka I je uvek unutar trougla.",
      r2t: "To važi za svaki trougao jer se simetrale unutrašnjih uglova seku u unutrašnjosti.",
      r3: "Ako zadatak govori o dodiru kružnice sa sve tri stranice, misli na centar upisane kružnice.",
      r3t: "Tu gotovo uvek ulaze simetrale uglova.",
      caption: "Simetrale uglova vode do tačke koja je jednako udaljena od svih stranica trougla.",
      note: "Razlikuj: jednako udaljeno od stranica znači I, a jednako udaljeno od temena znači O.",
    };
  // all
  return {
    r1: "Sve četiri konstrukcije daju različite centre, ali ne i iste osobine.",
    r1t: "G i I su uvek unutra; H i O zavise od tipa trougla.",
    r2: "Ojlerova prava povezuje O, G i H.",
    r2t: "Kod opšteg trougla ove tri tačke su kolinearne, a važi i odnos OG:GH = 1:2.",
    r3: `Trenutni trougao je ${tp}.`,
    r3t: "Najkorisnije poređenje je između oštrouglog, pravouglog i tupouglog slučaja.",
    caption: "U režimu \"Sve zajedno\" uoči koje prave grade koji centar i koje tačke menjaju položaj.",
    note: "Za prijemni je dovoljno da bez zabune znaš kako svaka tačka nastaje i gde se nalazi.",
  };
}

function similarityReadout(
  basePts: Point[],
  ratio: number,
  mirrored: boolean
): LabReadout {
  const info = classifyTriangle(basePts);
  const isCongruent = Math.abs(ratio - 1) < 0.001;
  const ps = ratio.toFixed(2);
  const as2 = (ratio * ratio).toFixed(2);

  return {
    r1: isCongruent
      ? "Ovde je k = 1, pa su trouglovi i slični i podudarni."
      : `Ovde je k = ${ps}, pa je oblik isti, ali veličina nije.`,
    r1t: mirrored
      ? "Ogledalsko preslikavanje ne ruši sličnost; važni su korespondencija uglova i odnos odgovarajućih stranica."
      : "Bez ogledalskog preslikavanja drugi trougao je samo skalirana i blago zarotirana verzija prvog.",
    r2: `Obim se menja ${ps} puta, a površina ${as2} puta.`,
    r2t: "To je standardno mesto za grešku: površine uvek prate kvadrat koeficijenta sličnosti.",
    r3: `Polazni trougao je ${info.angleType} ${info.sideType} trougao.`,
    r3t: "Tip trougla ostaje isti pod svakom sličnom transformacijom, jer se uglovi ne menjaju.",
    caption: isCongruent
      ? "Kada je koeficijent sličnosti jednak jedan, sličnost prelazi u podudarnost."
      : "Menjaj k i prati kako se sve dužine menjaju u istom odnosu, dok uglovi ostaju isti.",
    note: "Najvažnije pitanje na ispitu: da li podaci garantuju samo isti oblik ili i istu veličinu?",
  };
}

function TriangleLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<LabMode>("centers");
  const [preset, setPreset] = useState<TrianglePreset>("acute");
  const [centerType, setCenterType] = useState<CenterType>("medians");
  const [scaleRatio, setScaleRatio] = useState(100);
  const [mirror, setMirror] = useState(false);
  const [readout, setReadout] = useState<LabReadout>(() =>
    centersReadout(PRESETS.acute.points, "medians")
  );

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const maybeCtx = canvas.getContext("2d");
    if (!maybeCtx) return;
    const ctx: CanvasRenderingContext2D = maybeCtx;
    const COLORS = getTriColors();

    const dpr = window.devicePixelRatio || 1;
    const rect = wrap.getBoundingClientRect();
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const W = rect.width;
    const H = rect.height;
    ctx.clearRect(0, 0, W, H);

    // grid
    ctx.save();
    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 1;
    for (let x = 28; x < W; x += 28) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 28; y < H; y += 28) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }
    ctx.restore();

    const basePts = PRESETS[preset].points;
    const ratio = scaleRatio / 100;

    /* ---- drawing helpers ---- */
    function drawTri(pts: Point[]) {
      ctx.save();
      ctx.fillStyle = COLORS.fill;
      ctx.strokeStyle = COLORS.triangle;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      ctx.lineTo(pts[1].x, pts[1].y);
      ctx.lineTo(pts[2].x, pts[2].y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
    function drawSeg(a: Point, b: Point, color: string, w = 2, dash: number[] = []) {
      ctx.save();
      ctx.setLineDash(dash);
      ctx.strokeStyle = color;
      ctx.lineWidth = w;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
      ctx.restore();
    }
    function drawInfLine(pt: Point, dir: Point, color: string, w = 1.7, dash = [8, 8]) {
      const nd = normalize(dir);
      const far = Math.max(W, H) * 1.3;
      drawSeg(add(pt, mul(nd, -far)), add(pt, mul(nd, far)), color, w, dash);
    }
    function drawPt(p: Point, label: string, color: string) {
      ctx.save();
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = '700 12px "Public Sans", sans-serif';
      const tw = ctx.measureText(label).width;
      const bw = tw + 18;
      const bx = p.x + 10;
      const by = p.y - 16;
      ctx.fillStyle = COLORS.labelBg;
      ctx.strokeStyle = COLORS.labelBorder;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(bx, by, bw, 22, 11);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.fillText(label, bx + 9, by + 15);
      ctx.restore();
    }
    function drawVLabels(pts: Point[], suffix = "") {
      const labels = ["A", "B", "C"];
      ctx.save();
      ctx.font = '700 13px "Public Sans", sans-serif';
      ctx.fillStyle = COLORS.accent;
      pts.forEach((pt, i) => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillText(labels[i] + suffix, pt.x + 10, pt.y - 10);
      });
      ctx.restore();
    }

    if (mode === "centers") {
      const fitScale =
        Math.min((W - 120) / 360, (H - 120) / 300) * 0.92;
      const cx = W / 2;
      const cy = H * 0.58;
      const pts = basePts.map((p) => transformPoint(p, fitScale, cx, cy));
      drawTri(pts);

      const [a, b, c] = pts;
      const G = centroidCalc(a, b, c);
      const Hpt = orthocenterCalc(a, b, c);
      const O = circumcenterCalc(a, b, c);
      const I = incenterCalc(a, b, c);
      const mBC = midpoint(b, c);
      const mCA = midpoint(c, a);
      const mAB = midpoint(a, b);
      const fA = footFromPointToLine(a, b, c);
      const fB = footFromPointToLine(b, a, c);
      const fC = footFromPointToLine(c, a, b);
      const ct = centerType;
      const isAll = ct === "all";
      const lw = isAll ? 1.8 : 2.3;

      if (ct === "medians" || isAll) {
        drawSeg(a, mBC, COLORS.medians, lw);
        drawSeg(b, mCA, COLORS.medians, lw);
        drawSeg(c, mAB, COLORS.medians, lw);
        drawPt(G, "G", COLORS.centroid);
      }
      if (ct === "altitudes" || isAll) {
        const d = isAll ? [7, 4] : [];
        drawSeg(a, fA, COLORS.altitudes, lw, d);
        drawSeg(b, fB, COLORS.altitudes, lw, d);
        drawSeg(c, fC, COLORS.altitudes, lw, d);
        if (Hpt) drawPt(Hpt, "H", COLORS.orthocenter);
      }
      if (ct === "perpBisectors" || isAll) {
        const w2 = isAll ? 1.6 : 2.0;
        drawInfLine(mAB, { x: -(b.y - a.y), y: b.x - a.x }, COLORS.perpBisectors, w2);
        drawInfLine(mBC, { x: -(c.y - b.y), y: c.x - b.x }, COLORS.perpBisectors, w2);
        drawInfLine(mCA, { x: -(a.y - c.y), y: a.x - c.x }, COLORS.perpBisectors, w2);
        if (O) drawPt(O, "O", COLORS.circumcenter);
      }
      if (ct === "angleBisectors" || isAll) {
        drawSeg(a, I, COLORS.angleBisectors, lw);
        drawSeg(b, I, COLORS.angleBisectors, lw);
        drawSeg(c, I, COLORS.angleBisectors, lw);
        drawPt(I, "I", COLORS.incenter);
      }
      drawVLabels(pts);
      setReadout(centersReadout(pts, ct));
    } else {
      // similarity mode
      const stacked = W < 620;
      const boxW = stacked ? W - 80 : W * 0.32;
      const boxH = stacked ? H * 0.3 : H - 150;
      const baseScale = (Math.min(boxW / 360, boxH / 280) * 0.88) / Math.max(1, ratio);
      const lC = stacked ? { x: W / 2, y: H * 0.28 } : { x: W * 0.27, y: H * 0.56 };
      const rC = stacked ? { x: W / 2, y: H * 0.75 } : { x: W * 0.74, y: H * 0.56 };
      const rot = stacked ? 0 : 0.18;

      const first = basePts.map((p) => transformPoint(p, baseScale, lC.x, lC.y));
      const second = basePts.map((p) =>
        transformPoint(p, baseScale * ratio, rC.x, rC.y, mirror, rot)
      );

      ctx.save();
      ctx.font = '700 13px "Public Sans", sans-serif';
      ctx.fillStyle = COLORS.simText;
      ctx.fillText("Osnovni trougao", stacked ? W / 2 - 52 : 70, stacked ? 34 : 38);
      ctx.fillText("Transformisani trougao", stacked ? W / 2 - 78 : W - 234, stacked ? H * 0.52 : 38);
      ctx.restore();

      drawTri(first);
      drawTri(second);
      drawVLabels(first);
      drawVLabels(second, "'");

      if (!stacked) {
        for (let i = 0; i < 3; i++)
          drawSeg(first[i], second[i], COLORS.simLine, 1.2, [5, 7]);
      }
      setReadout(similarityReadout(first, ratio, mirror));
    }
  }, [mode, preset, centerType, scaleRatio, mirror]);

  useEffect(() => {
    render();
    const onResize = () => render();
    window.addEventListener("resize", onResize);
    const observer = new MutationObserver(() => render());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => { window.removeEventListener("resize", onResize); observer.disconnect(); };
  }, [render]);

  return (
    <div className={s.interactiveShell}>
      {/* Canvas panel */}
      <div className={s.interactiveCard}>
        <h3 className={cs.tCardTitle}>Canvas laboratorija trougla</h3>
        <p style={{ color: "var(--lesson-muted)" }}>
          Koristi kontrolne opcije i prati šta se menja na slici i u objašnjenju desno.
        </p>

        <div className={s.controlGrid}>
          <div className={s.field}>
            <label>Režim</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as LabMode)}
            >
              <option value="centers">Značajne tačke</option>
              <option value="similarity">Sličnost i podudarnost</option>
            </select>
          </div>
          <div className={s.field}>
            <label>Tip trougla</label>
            <select
              value={preset}
              onChange={(e) => setPreset(e.target.value as TrianglePreset)}
            >
              <option value="acute">Oštrougli</option>
              <option value="right">Pravougli</option>
              <option value="obtuse">Tupougli</option>
              <option value="isosceles">Jednakokraki</option>
              <option value="equilateral">Jednakostranični</option>
            </select>
          </div>

          {mode === "centers" && (
            <div className={s.field}>
              <label>Konstrukcija / centar</label>
              <select
                value={centerType}
                onChange={(e) => setCenterType(e.target.value as CenterType)}
              >
                <option value="medians">Medijane i težište</option>
                <option value="altitudes">Visine i ortocentar</option>
                <option value="perpBisectors">Simetrale stranica i centar opisane</option>
                <option value="angleBisectors">Simetrale uglova i centar upisane</option>
                <option value="all">Sve zajedno</option>
              </select>
            </div>
          )}

          {mode === "similarity" && (
            <>
              <div className={s.rangeWrap}>
                <label>
                  Koeficijent sličnosti{" "}
                  <span style={{ color: "var(--lesson-primary-soft)", fontWeight: 800 }}>
                    {(scaleRatio / 100).toFixed(2)}
                  </span>
                </label>
                <input
                  type="range"
                  min={60}
                  max={140}
                  step={5}
                  value={scaleRatio}
                  onChange={(e) => setScaleRatio(Number(e.target.value))}
                />
              </div>
              <div className={s.toggleRow}>
                <input
                  type="checkbox"
                  checked={mirror}
                  onChange={(e) => setMirror(e.target.checked)}
                />
                <span>Preslikaj drugi trougao ogledalski</span>
              </div>
            </>
          )}
        </div>

        <div
          ref={wrapRef}
          className={s.canvasWrap}
          style={{ marginTop: 18, minHeight: 360 }}
        >
          <canvas
            ref={canvasRef}
            className={s.polarCanvas}
            aria-label="Interaktivna laboratorija za trouglove, sličnost, podudarnost i značajne tačke"
          />
        </div>
        <p style={{ marginTop: 10, fontSize: "0.88rem", color: "var(--lesson-muted)", textAlign: "center" }}>
          {readout.caption}
        </p>
      </div>

      {/* Side readout */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div className={s.sectionCard} style={{ padding: 22 }}>
          <small className={cs.tLabel}>Šta vidiš</small>
          <strong style={{ display: "block", fontSize: "1.08rem", marginBottom: 8 }}>
            {readout.r1}
          </strong>
          <p style={{ color: "var(--lesson-muted)" }}>{readout.r1t}</p>
        </div>
        <div className={s.sectionCard} style={{ padding: 22 }}>
          <small className={cs.tLabel}>Prijemni signal</small>
          <strong style={{ display: "block", fontSize: "1.08rem", marginBottom: 8 }}>
            {readout.r2}
          </strong>
          <p style={{ color: "var(--lesson-muted)" }}>{readout.r2t}</p>
        </div>
        <div className={s.sectionCard} style={{ padding: 22 }}>
          <small className={cs.tLabel}>Kako da čitaš sliku</small>
          <strong style={{ display: "block", fontSize: "1.08rem", marginBottom: 8 }}>
            {readout.r3}
          </strong>
          <p style={{ color: "var(--lesson-muted)" }}>{readout.r3t}</p>
        </div>
        <p style={{ color: "var(--lesson-muted)", fontSize: "0.95rem" }}>
          {readout.note}
        </p>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   LESSON 42 PAGE
   ────────────────────────────────────────────────────────────────────── */

export default function Lesson42Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka znanje · Lekcija 42"
        title={
          <>
            Uglovi i trouglovi{" "}
            <span className={cs.tHeroAccent}>
              Podudarnost, sličnost i značajne tačke
            </span>
          </>
        }
        description="Ovo je lekcija u kojoj geometrija prestaje da bude skup nepovezanih formula. Kada razumeš kako se iz uglova prelazi na podudarnost, iz paralelnosti na sličnost, a iz konstrukcije na značajne tačke trougla, dobijaš alat koji rešava veliki broj planimetrijskih zadataka na prijemnom ispitu."
        heroImageSrc="/api/lessons/42/hero"
        heroImageAlt="Apstraktna matematička ilustracija sa geometrijskim konstrukcijama, trouglovima i linijama"
        cards={[
          {
            label: "Šta ćeš naučiti",
            description:
              "Kako da prepoznaš dovoljne uslove za podudarnost i sličnost, kako da koristiš Talesovu teoremu i kako da razlikuješ težište, ortocentar, centar opisane i upisane kružnice.",
          },
          {
            label: "Najveća zamka",
            description:
              "Mnogo učenika prerano zaključi podudarnost iz tri ugla ili primeni Talesovu teoremu bez proverene paralelnosti. U geometriji je svaka tvrdnja jaka samo koliko i uslov koji je opravdava.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Na ispitu se često traži skrivena sličnost, dokaz da se neke duži poklapaju ili brzo prepoznavanje gde se nalaze ortocentar i centar opisane kružnice kod različitih tipova trougla.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "60 do 90 minuta za temeljno čitanje, laboratoriju i završne zadatke.",
          },
          {
            label: "Predznanje",
            description:
              "Osnovni rad sa dužima, paralelnim pravama i elementarnim računom sa razmerama.",
          },
          {
            label: "Glavna veština",
            description:
              "Prepoznati koji geometrijski argument otključava zadatak: ugao, proporcija, podudarnost ili centar.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija za sličnost, podudarnost i položaj značajnih tačaka.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZAŠTO JE VAŽNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zašto je ova lekcija važna"
        title="Geometrijski zadaci retko traže formulu, češće traže pravi ugao posmatranja"
        description={'Na prijemnom zadatak skoro nikada ne kaže: \u201EPrimeni kriterijum SUS.\u201C Umesto toga dobiješ crtež sa paralelama, nekoliko jednakih uglova i jednu skrivenu konstrukciju. Tvoj posao je da prepoznaš da li treba da dokažeš podudarnost, da izvučeš sličnost ili da iskoristiš osobine centra trougla.'}
      >
        <div className={s.grid3}>
          <SectionCard title="Kasnija primena">
            <p>
              Ova lekcija je osnova za sinusnu i kosinusnu teoremu, za zadatke
              sa krugom, za analitičku geometriju i za stereometriju gde često
              prvo moraš da pronađeš pravi ravan presek.
            </p>
          </SectionCard>
          <SectionCard title="Prijemna logika">
            <p>
              U planimetriji često dobijaš samo jedan broj i puno odnosa. Bez
              sličnosti i podudarnosti ne možeš da pretvoriš crtež u račun.
            </p>
          </SectionCard>
          <SectionCard title="Praktičan dobitak">
            <p>
              Kada savladaš ovu lekciju, mnogo brže vidiš šta je zaista
              &ldquo;dato&rdquo; u zadatku, a šta samo deluje važno. To štedi
              vreme i smanjuje greške pod pritiskom.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Šta je prava misaona promena?">
            <p>
              Učenici često geometriju uče kao spisak teorema. To nije dovoljno.
              Potreban je obrazac razmišljanja:{" "}
              <strong style={{ color: "var(--lesson-accent)" }}>nacrtaj</strong>,
              prepoznaj jednake uglove ili paralelnost, proceni da li imaš
              podudarnost ili sličnost, pa tek onda računaj duži i površine.
            </p>
          </SectionCard>
          <SectionCard title="Minimalni algoritam za početak svakog zadatka">
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Označi sve što je jednako ili paralelno">
                <p>
                  U geometriji se pola rešenja krije u dobro obeleženom crtežu.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Traži ugaoni ili proporcionalni razlog">
                <p>
                  Ako vidiš paralelu, misli na Talesa i sličnost. Ako vidiš
                  zajedničku stranicu i jednake uglove, misli na podudarnost.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Tek onda uvodi račun">
                <p>
                  Brojevi dolaze na kraju. Prvo moraš da opravdaš zašto neki
                  odnosi uopšte važe.
                </p>
              </WalkStep>
            </div>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ OSNOVE UGLOVA ═══════════ */}
      <LessonSection
        id="osnove"
        eyebrow="Temelj"
        title="Osnove uglova i trouglova koje stalno koriste svi kasniji dokazi"
        description="Iako je fokus lekcije na podudarnosti, sličnosti i značajnim tačkama, sve to počiva na nekoliko veoma jednostavnih istina o uglovima u trouglu. Ako njih vidiš odmah, zadatak postaje kraći."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Zbir unutrašnjih uglova"
            formula={"\\alpha+\\beta+\\gamma=180^\\circ"}
            note="Ovo je najbrža putanja do nepoznatog ugla kada znaš druga dva. U dokazima se koristi neprestano."
          />
          <FormulaCard
            title="Spoljašnji ugao"
            formula={"\\angle_{spol}=\\text{zbir dva nesusedna unutrašnja ugla}"}
            note="Ako produžiš jednu stranicu trougla, spoljašnji ugao je jednak zbiru dva udaljena unutrašnja ugla."
          />
          <FormulaCard
            title="Tipovi trougla"
            formula={"\\text{oštrougli},\\ \\text{pravougli},\\ \\text{tupougli}"}
            note="Položaj ortocentra i centra opisane kružnice zavisi baš od toga da li je trougao oštar, prav ili tup."
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Intuicija">
            <p>
              Kada rešavaš zadatak, uglovi su često &ldquo;najjeftinija
              informacija&rdquo;. Nije ti potreban broj da bi ugao bio koristan.
              Dovoljno je da dva ugla budu jednaka i već si vrlo blizu sličnosti.
            </p>
            <p style={{ marginTop: 12, color: "var(--lesson-muted)" }}>
              Posebno obrati pažnju na sledeće situacije: unakrsni uglovi,
              odgovarajući uglovi kod paralelnih pravih, uglovi uz pravu i zbir
              uglova u trouglu.
            </p>
          </SectionCard>
          <SectionCard title="Brzi ugaoni primer">
            <p>
              U trouglu <InlineMath>{"ABC"}</InlineMath> dati su{" "}
              <InlineMath>{"\\angle A=48^\\circ"}</InlineMath> i{" "}
              <InlineMath>{"\\angle B=67^\\circ"}</InlineMath>. Koliki je ugao{" "}
              <InlineMath>{"C"}</InlineMath>?
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Pozovi osnovnu relaciju">
                <p>
                  <InlineMath>
                    {"\\angle A+\\angle B+\\angle C=180^\\circ"}
                  </InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep number={2} title="Uvrsti brojeve">
                <p>
                  <InlineMath>
                    {"48^\\circ+67^\\circ+\\angle C=180^\\circ"}
                  </InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep number={3} title="Izračunaj">
                <p>
                  <InlineMath>
                    {"\\angle C=180^\\circ-115^\\circ=65^\\circ"}
                  </InlineMath>
                  .
                </p>
              </WalkStep>
            </div>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: ako je spoljašnji ugao kod temena C jednak 124°, a jedan udaljeni unutrašnji ugao 51°, koliki je drugi?"
          answer={
            <p>
              Po teoremi o spoljašnjem uglu važi{" "}
              <InlineMath>{"124^\\circ=51^\\circ+x"}</InlineMath>, pa je{" "}
              <InlineMath>{"x=73^\\circ"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ TALESOVA TEOREMA ═══════════ */}
      <LessonSection
        id="tales"
        eyebrow="Talesova teorema"
        title="Paralela u trouglu proizvodi proporcije"
        description="U okviru ove lekcije pod Talesovom teoremom mislimo na teoremu o proporcionalnim dužima: ako prava paralelna jednoj stranici trougla seče druge dve stranice, nastaju proporcionalni segmenti i manji trougao postaje sličan celom trouglu."
      >
        <div className={s.grid2}>
          <FormulaCard
            title="Osnovni oblik"
            formula={"DE \\parallel BC \\Rightarrow \\frac{AD}{AB}=\\frac{AE}{AC}=\\frac{DE}{BC}"}
            note={
              <>
                Ako su <InlineMath>{"D\\in AB"}</InlineMath> i{" "}
                <InlineMath>{"E\\in AC"}</InlineMath>, a{" "}
                <InlineMath>{"DE\\parallel BC"}</InlineMath>, tada je{" "}
                <InlineMath>{"\\triangle ADE \\sim \\triangle ABC"}</InlineMath>.
              </>
            }
          />
          <FormulaCard
            title="Podela stranica"
            formula={"\\frac{AD}{DB}=\\frac{AE}{EC}"}
            note={'Ovaj oblik je posebno koristan kada su dati \u201Edelovi\u201C stranica, a ne cele stranice.'}
          />
        </div>

        <InsightCard title="Važna napomena">
          <p>
            Talesovu teoremu ne smeš koristiti bez paralelnosti. U mnogim
            zadacima upravo treba prvo dokazati da su dve prave paralelne, pa tek
            onda uvoditi proporcije. Ako to preskočiš, dobijaš neosnovan račun.
          </p>
        </InsightCard>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Vođeni primer: duži u trouglu sa paralelom">
            <p>
              U trouglu <InlineMath>{"ABC"}</InlineMath> tačke{" "}
              <InlineMath>{"D\\in AB"}</InlineMath> i{" "}
              <InlineMath>{"E\\in AC"}</InlineMath> takve su da je{" "}
              <InlineMath>{"DE\\parallel BC"}</InlineMath>. Dato je{" "}
              <InlineMath>{"AD=6"}</InlineMath>,{" "}
              <InlineMath>{"DB=4"}</InlineMath>,{" "}
              <InlineMath>{"AC=15"}</InlineMath>. Nađi{" "}
              <InlineMath>{"AE"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Prepoznaj slične trouglove">
                <p>
                  Iz <InlineMath>{"DE\\parallel BC"}</InlineMath> sledi{" "}
                  <InlineMath>
                    {"\\triangle ADE \\sim \\triangle ABC"}
                  </InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep number={2} title="Izrazi celu stranicu">
                <p>
                  <InlineMath>{"AB=AD+DB=6+4=10"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Napiši odnos odgovarajućih stranica">
                <p>
                  <InlineMath>
                    {"\\frac{AD}{AB}=\\frac{AE}{AC}"}
                  </InlineMath>
                  , pa{" "}
                  <InlineMath>{"\\frac{6}{10}=\\frac{AE}{15}"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={4} title="Reši proporciju">
                <p>
                  <InlineMath>
                    {"AE=15\\cdot \\frac{6}{10}=9"}
                  </InlineMath>
                  .
                </p>
              </WalkStep>
            </div>
          </SectionCard>
          <SectionCard title="Pedagoška poenta">
            <p>
              Učenici često pamte formulu, ali promaše ideju. Suština nije u
              tome da mehanički pišeš razmere, nego da vidiš:{" "}
              <strong style={{ color: "var(--lesson-accent)" }}>
                paralela pravi jednake uglove
              </strong>
              , jednaki uglovi daju sličnost, a sličnost daje proporcije.
            </p>
            <p style={{ marginTop: 12, color: "var(--lesson-muted)" }}>
              Dakle redosled je: paralelnost{" "}
              <InlineMath>{"\\to"}</InlineMath> jednaki uglovi{" "}
              <InlineMath>{"\\to"}</InlineMath> sličnost{" "}
              <InlineMath>{"\\to"}</InlineMath> proporcije.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: u istom rasporedu ako su AD=3, DB=2 i EC=8, koliki je AE?"
          answer={
            <p>
              Po Talesovoj teoremi važi{" "}
              <InlineMath>
                {"\\frac{AD}{DB}=\\frac{AE}{EC}"}
              </InlineMath>
              , pa je{" "}
              <InlineMath>{"\\frac{3}{2}=\\frac{AE}{8}"}</InlineMath>.
              Odatle <InlineMath>{"AE=12"}</InlineMath>.
            </p>
          }
        />
        <MicroCheck
          question={'Napomena o drugoj \u201ETalesovoj teoremi\u201C koju mo\u017Eda zna\u0161 iz \u0161kole'}
          answer={
            <p>
              U geometriji kruga često se pod Talesovom teoremom misli i na
              tvrdnju da je ugao nad prečnikom pravi. Ta verzija je tačna i
              važna, ali u ovoj lekciji glavni fokus je na proporcionalnim dužima
              i sličnosti.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ PODUDARNOST ═══════════ */}
      <LessonSection
        id="podudarnost"
        eyebrow="Podudarnost trouglova"
        title="Podudarni trouglovi imaju isti oblik i istu veličinu"
        description="Dva trougla su podudarna ako se mogu poklopiti bez rastezanja. To znači da su im odgovarajuće stranice jednake i odgovarajući uglovi jednaki. U praksi ne proveravaš baš sve odjednom, nego koristiš dovoljne kriterijume."
      >
        {/* Criteria table */}
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              borderRadius: 20,
              overflow: "hidden",
              marginTop: 18,
              border: "1px solid var(--lesson-border)",
            }}
          >
            <thead>
              <tr>
                {["Kriterijum", "Šta mora da bude dato", "Kako da ga čitaš na zadatku"].map(
                  (h) => (
                    <th
                      key={h}
                      style={{
                        padding: "14px 16px",
                        textAlign: "left",
                        background: "var(--lesson-panel-soft)",
                        color: "var(--lesson-muted-strong)",
                        fontSize: "0.86rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                      }}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "SSS",
                  "Sve tri odgovarajuće stranice su jednake.",
                  "Ako su tri duži po parovima jednake, trouglovi su potpuno određeni.",
                ],
                [
                  "SUS",
                  "Dve stranice i njima zahvaćen ugao su jednaki.",
                  "Važno je da ugao bude između te dve stranice, ne bilo koji ugao.",
                ],
                [
                  "USU",
                  "Dva ugla i stranica između njih su jednaki.",
                  "Ovaj kriterijum je veoma čest u dokazima sa simetralama i jednakokrakim trouglovima.",
                ],
                [
                  "Pravougli HK",
                  "Kod pravouglih trouglova: hipotenuza i jedna kateta.",
                  "Poseban koristan slučaj kada na crtežu prepoznaš dva prava ugla.",
                ],
              ].map(([crit, what, how]) => (
                <tr key={crit}>
                  <td
                    style={{
                      padding: "14px 16px",
                      borderTop: "1px solid var(--lesson-border)",
                      color: "var(--lesson-accent)",
                      fontWeight: 800,
                      minWidth: 120,
                    }}
                  >
                    {crit}
                  </td>
                  <td
                    style={{
                      padding: "14px 16px",
                      borderTop: "1px solid var(--lesson-border)",
                      color: "var(--lesson-muted)",
                    }}
                  >
                    {what}
                  </td>
                  <td
                    style={{
                      padding: "14px 16px",
                      borderTop: "1px solid var(--lesson-border)",
                      color: "var(--lesson-muted)",
                    }}
                  >
                    {how}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <InsightCard title="Šta nije dovoljno?">
          <p>
            Tri jednaka ugla nisu kriterijum podudarnosti. Oni daju samo{" "}
            <strong style={{ color: "var(--lesson-accent)" }}>sličnost</strong>.
            Trouglovi mogu imati iste uglove, a da jedan bude samo uvećana
            kopija drugog.
          </p>
        </InsightCard>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Klasičan dokaz u jednakokrakom trouglu">
            <p>
              Neka je <InlineMath>{"AB=AC"}</InlineMath>, a{" "}
              <InlineMath>{"AD"}</InlineMath> simetrala ugla{" "}
              <InlineMath>{"\\angle A"}</InlineMath>. Dokaži da je{" "}
              <InlineMath>{"BD=DC"}</InlineMath> i da je{" "}
              <InlineMath>{"AD\\perp BC"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Posmatraj trouglove{" "}
                    <InlineMath>{"ABD"}</InlineMath> i{" "}
                    <InlineMath>{"ACD"}</InlineMath>
                  </>
                }
              >
                <p>
                  Imamo <InlineMath>{"AB=AC"}</InlineMath>,{" "}
                  <InlineMath>{"AD"}</InlineMath> je zajednička stranica i{" "}
                  <InlineMath>
                    {"\\angle BAD=\\angle DAC"}
                  </InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep number={2} title="Primeni kriterijum SUS">
                <p>
                  Pošto su dve stranice i zahvaćen ugao jednaki, trouglovi su
                  podudarni.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Izvuci posledice podudarnosti">
                <p>
                  Odmah sledi <InlineMath>{"BD=DC"}</InlineMath> i{" "}
                  <InlineMath>
                    {"\\angle ADB=\\angle CDA"}
                  </InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep number={4} title="Iskoristi linearni par uglova">
                <p>
                  Pošto su <InlineMath>{"\\angle ADB"}</InlineMath> i{" "}
                  <InlineMath>{"\\angle CDA"}</InlineMath> susedni uglovi na
                  pravoj <InlineMath>{"BC"}</InlineMath>, njihov zbir je{" "}
                  <InlineMath>{"180^\\circ"}</InlineMath>. Ako su još i jednaki,
                  svaki je <InlineMath>{"90^\\circ"}</InlineMath>. Zato je{" "}
                  <InlineMath>{"AD\\perp BC"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
          </SectionCard>
          <SectionCard title="Zašto je ovaj primer bitan">
            <p>
              Ovo je obrazac koji se pojavljuje stalno: pokažeš podudarnost, pa
              iz nje dobiješ mnogo više od onoga što je direktno dato. Jedna ista
              duž postaje i simetrala, i medijana, i visina. Na prijemnom se baš
              taj skok često očekuje.
            </p>
            <p style={{ marginTop: 12, color: "var(--lesson-muted)" }}>
              Drugim rečima: podudarnost nije cilj sama po sebi. Ona je alat za
              dalje zaključivanje.
            </p>
          </SectionCard>
        </div>

        <MicroCheck
          question={'Mikro-provera: za\u0161to kriterijum \u201Edve stranice i neki ugao\u201C nije uvek dovoljan za podudarnost?'}
          answer={
            <p>
              Zato što ugao mora biti zahvaćen između te dve stranice. Ako je
              ugao naspram jedne od njih, možeš dobiti više različitih trouglova
              sa istim podacima. To je poznata SSA zamka.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ SLIČNOST ═══════════ */}
      <LessonSection
        id="slicnost"
        eyebrow="Sličnost trouglova"
        title="Isti oblik, druga veličina"
        description={
          "Slični trouglovi imaju jednake odgovarajuće uglove, a odgovarajuće stranice su proporcionalne. Ako je odnos sličnosti k, onda se sve dužine množe sa k, obimi sa k, a površine sa k\u00B2."
        }
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Kriterijum UU"
            formula={"\\angle A=\\angle A',\\ \\angle B=\\angle B' \\Rightarrow \\triangle ABC\\sim \\triangle A'B'C'"}
            note="Dva ugla su dovoljna jer je treći ugao automatski određen zbirom 180°."
          />
          <FormulaCard
            title="Kriterijum SUS"
            formula={"\\frac{AB}{A'B'}=\\frac{AC}{A'C'},\\ \\angle A=\\angle A'"}
            note="Dve proporcionalne stranice i njima zahvaćen ugao daju sličnost."
          />
          <FormulaCard
            title="Kriterijum SSS"
            formula={"\\frac{AB}{A'B'}=\\frac{BC}{B'C'}=\\frac{CA}{C'A'}"}
            note="Ako su sve tri odgovarajuće stranice proporcionalne, trouglovi su slični."
          />
          <FormulaCard
            title="Obimi"
            formula={"\\frac{O_1}{O_2}=k"}
            note="Obimi sličnih trouglova menjaju se istim koeficijentom kao i stranice."
          />
          <FormulaCard
            title="Površine"
            formula={"\\frac{P_1}{P_2}=k^2"}
            note="Ovo je česta ispitna zamka: površine ne rastu sa k, nego sa kvadratom koeficijenta."
          />
          <FormulaCard
            title="Granica sa podudarnosti"
            formula={"k=1 \\Rightarrow \\text{podudarnost}"}
            note="Ako je odnos sličnosti jedan, svi odgovarajući delovi su jednaki, pa su trouglovi podudarni."
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Intuicija">
            <p>
              Sličnost treba da zamišljaš kao fotografiju istog trougla na
              različitim zumovima. Ugao ostaje isti, oblik ostaje isti, ali
              dužine rastu ili se smanjuju u istom odnosu.
            </p>
            <p style={{ marginTop: 12, color: "var(--lesson-muted)" }}>
              Zato je sličnost savršena za zadatke sa paralelama, visinama,
              senkama, razmerama i modelima &ldquo;mali trougao unutar velikog
              trougla&rdquo;.
            </p>
          </SectionCard>
          <SectionCard title="Vođeni primer: nađi dve nepoznate duži">
            <p>
              U trouglu <InlineMath>{"ABC"}</InlineMath> tačke{" "}
              <InlineMath>{"D\\in AB"}</InlineMath> i{" "}
              <InlineMath>{"E\\in AC"}</InlineMath> su takve da je{" "}
              <InlineMath>{"DE\\parallel BC"}</InlineMath>. Dato je{" "}
              <InlineMath>{"AB=12"}</InlineMath>,{" "}
              <InlineMath>{"AD=8"}</InlineMath>,{" "}
              <InlineMath>{"AC=15"}</InlineMath>,{" "}
              <InlineMath>{"BC=18"}</InlineMath>. Nađi{" "}
              <InlineMath>{"AE"}</InlineMath> i{" "}
              <InlineMath>{"DE"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Uoči sličnost">
                <p>
                  Pošto je <InlineMath>{"DE\\parallel BC"}</InlineMath>,
                  trouglovi <InlineMath>{"ADE"}</InlineMath> i{" "}
                  <InlineMath>{"ABC"}</InlineMath> su slični.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Nađi koeficijent sličnosti manjeg prema većem">
                <p>
                  <InlineMath>
                    {"k=\\frac{AD}{AB}=\\frac{8}{12}=\\frac{2}{3}"}
                  </InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep number={3} title="Primenjuj isti odnos na sve odgovarajuće stranice">
                <p>
                  <InlineMath>
                    {"AE=k\\cdot AC=\\frac{2}{3}\\cdot 15=10"}
                  </InlineMath>
                  , a{" "}
                  <InlineMath>
                    {"DE=k\\cdot BC=\\frac{2}{3}\\cdot 18=12"}
                  </InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep number={4} title="Tumačenje">
                <p>
                  Kada jednom znaš <InlineMath>{"k"}</InlineMath>, čitav zadatak
                  postaje linearan: svaka duž se množi istim koeficijentom.
                </p>
              </WalkStep>
            </div>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: ako je odnos sličnosti dva trougla k=3, kako se menjaju obim i površina?"
          answer={
            <p>
              Obim se menja tri puta, a površina devet puta, jer je{" "}
              <InlineMath>{"\\frac{P_1}{P_2}=k^2=9"}</InlineMath>.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ ZNAČAJNE TAČKE ═══════════ */}
      <LessonSection
        id="tacke"
        eyebrow="Značajne tačke trougla"
        title="Četiri centra koja moraš da razlikuješ bez kolebanja"
        description="U trouglu postoje posebne prave koje seku sve tri stranice ili sve tri uglovne oblasti na smislen način. Njihovi preseci daju težište, ortocentar, centar opisane i centar upisane kružnice. Svaka od ovih tačaka nastaje iz drugačije konstrukcije i nosi drugačije osobine."
      >
        {/* 4-column grid of significant points */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: 16,
            marginTop: 18,
          }}
        >
          <SectionCard title="Težište G — Presek medijana">
            <p>
              Medijana spaja teme sa sredinom naspramne stranice. Sve tri
              medijane seku se u jednoj tački.
            </p>
            <ul style={{ paddingLeft: 18, marginTop: 10 }}>
              <li style={{ color: "var(--lesson-muted)" }}>
                Uvek je unutar trougla.
              </li>
              <li style={{ color: "var(--lesson-muted)" }}>
                Deli svaku medijanu u odnosu{" "}
                <InlineMath>{"2:1"}</InlineMath>, računato od temena.
              </li>
              <li style={{ color: "var(--lesson-muted)" }}>
                Fizička interpretacija: težišna tačka tanke ploče trouglastog
                oblika.
              </li>
            </ul>
          </SectionCard>
          <SectionCard title="Ortocentar H — Presek visina">
            <p>
              Visina je prava kroz teme normalna na naspramnu stranicu ili njen
              produžetak.
            </p>
            <ul style={{ paddingLeft: 18, marginTop: 10 }}>
              <li style={{ color: "var(--lesson-muted)" }}>
                U oštrouglom trouglu je unutra.
              </li>
              <li style={{ color: "var(--lesson-muted)" }}>
                U pravouglom je u temenu pravog ugla.
              </li>
              <li style={{ color: "var(--lesson-muted)" }}>
                U tupouglom je van trougla.
              </li>
            </ul>
          </SectionCard>
          <SectionCard title="Centar opisane kružnice O — Presek simetrala stranica">
            <p>
              Simetrala stranice je prava normalna na stranicu kroz njenu
              sredinu.
            </p>
            <ul style={{ paddingLeft: 18, marginTop: 10 }}>
              <li style={{ color: "var(--lesson-muted)" }}>
                Jednako je udaljen od sva tri temena.
              </li>
              <li style={{ color: "var(--lesson-muted)" }}>
                U pravouglom trouglu je u sredini hipotenuze.
              </li>
              <li style={{ color: "var(--lesson-muted)" }}>
                U tupouglom trouglu leži van trougla.
              </li>
            </ul>
          </SectionCard>
          <SectionCard title="Centar upisane kružnice I — Presek simetrala uglova">
            <p>Simetrala ugla deli ugao na dva jednaka dela.</p>
            <ul style={{ paddingLeft: 18, marginTop: 10 }}>
              <li style={{ color: "var(--lesson-muted)" }}>
                Uvek je unutar trougla.
              </li>
              <li style={{ color: "var(--lesson-muted)" }}>
                Jednako je udaljen od sve tri stranice.
              </li>
              <li style={{ color: "var(--lesson-muted)" }}>
                To je centar kružnice koja dodiruje sve tri stranice trougla.
              </li>
            </ul>
          </SectionCard>
        </div>

        <div className={s.formulaGrid} style={{ marginTop: 18 }}>
          <FormulaCard
            title="Položaj u oštrouglom"
            formula={"G,\\ H,\\ O,\\ I \\text{ su unutar trougla}"}
            note="Oštrougli trougao je najmirniji slučaj: svi glavni centri ostaju u unutrašnjosti."
          />
          <FormulaCard
            title="Položaj u pravouglom"
            formula={"H \\text{ je u temenu pravog ugla},\\ O \\text{ je na hipotenuzi}"}
            note="Ovo je omiljena ispitna činjenica, jer brzo skraćuje mnoge konstrukcije."
          />
          <FormulaCard
            title="Ojlerova prava"
            formula={"O,\\ G,\\ H \\text{ su kolinearne},\\qquad OG:GH=1:2"}
            note="Ova relacija se uglavnom koristi u naprednijim zadacima i kao prepoznavanje dublje strukture trougla."
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Primer 1: odnos na medijani">
            <p>
              U trouglu <InlineMath>{"ABC"}</InlineMath> medijana{" "}
              <InlineMath>{"AM"}</InlineMath> ima dužinu{" "}
              <InlineMath>{"15"}</InlineMath>. Kolike su duži{" "}
              <InlineMath>{"AG"}</InlineMath> i{" "}
              <InlineMath>{"GM"}</InlineMath>, gde je{" "}
              <InlineMath>{"G"}</InlineMath> težište?
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Pozovi osnovnu osobinu">
                <p>
                  Težište deli medijanu u odnosu{" "}
                  <InlineMath>{"2:1"}</InlineMath>, pri čemu je duži deo uz
                  teme.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Razloži celu medijanu">
                <p>
                  <InlineMath>{"AM=AG+GM"}</InlineMath>, a odnos je{" "}
                  <InlineMath>{"AG:GM=2:1"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Izračunaj">
                <p>
                  Tri jednaka dela daju <InlineMath>{"15"}</InlineMath>, pa je
                  jedan deo <InlineMath>{"5"}</InlineMath>. Zato je{" "}
                  <InlineMath>{"AG=10"}</InlineMath>, a{" "}
                  <InlineMath>{"GM=5"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
          </SectionCard>
          <SectionCard title="Primer 2: pravougli trougao">
            <p>
              Gde se nalazi centar opisane kružnice pravouglog trougla?
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Seti se konstrukcije">
                <p>
                  Centar opisane kružnice je presek simetrala stranica.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Primeni poznatu činjenicu za pravougli trougao">
                <p>To je sredina hipotenuze.</p>
              </WalkStep>
              <WalkStep number={3} title="Zašto?">
                <p>
                  Sredina hipotenuze jednako je udaljena od sva tri temena
                  pravouglog trougla.
                </p>
              </WalkStep>
            </div>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: koje značajne tačke su uvek unutar trougla?"
          answer={
            <p>
              Težište <InlineMath>{"G"}</InlineMath> i centar upisane kružnice{" "}
              <InlineMath>{"I"}</InlineMath> su uvek unutar trougla. Ortocentar{" "}
              <InlineMath>{"H"}</InlineMath> i centar opisane kružnice{" "}
              <InlineMath>{"O"}</InlineMath> zavise od tipa trougla.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ INTERAKTIVNO ═══════════ */}
      <LessonSection
        id="interaktivno"
        eyebrow="Interaktivna laboratorija"
        title="Pomeri fokus: od crtanja ka razumevanju konstrukcije"
        description="Menjaj tip trougla i režim prikaza. U režimu značajnih tačaka vidi kako se centri pomeraju. U režimu sličnosti vidi kako isti oblik ostaje isti dok se veličina menja i kako se pri k=1 dobija podudarnost."
      >
        <TriangleLab />
      </LessonSection>

      {/* ═══════════ VOĐENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vođeni primeri"
        title="Tri tipa zadataka koja treba da umeš da prepoznaš odmah"
        description="Svaki od sledećih primera je konstruisan tako da oponaša tipičnu ispitnu situaciju: nije poenta u računu, nego u prepoznavanju pravog obrasca."
      >
        <div className={s.grid3}>
          <SectionCard title="Primer 1: podudarnost ili samo sličnost">
            <p>
              Za dva trougla znaš da imaju jednake uglove{" "}
              <InlineMath>{"\\alpha,\\beta,\\gamma"}</InlineMath>. Zaključak je:
              trouglovi su slični, ali nisu nužno podudarni. Potreban je još
              podatak o jednoj dužini ili koeficijentu sličnosti.
            </p>
          </SectionCard>
          <SectionCard title="Primer 2: paralela otkriva skriven odnos">
            <p>
              Kad se u trouglu pojavi prava paralelna jednoj stranici, ne kreći
              od Pitagore. Najpre napiši sličnost manjih i većih trouglova, pa
              zatim izvuci proporcije za duži.
            </p>
          </SectionCard>
          <SectionCard title="Primer 3: tip trougla određuje položaj centra">
            <p>
              Ako zadatak kaže da je trougao tupougli, to odmah daje informaciju
              da su ortocentar i centar opisane kružnice van trougla. To često
              skraćuje konstrukcioni deo rešenja.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Detaljan primer: površine sličnih trouglova">
            <p>
              Dva trougla su slična sa koeficijentom{" "}
              <InlineMath>{"k=\\frac{3}{2}"}</InlineMath>. Ako je površina
              manjeg trougla <InlineMath>{"24"}</InlineMath>, kolika je površina
              većeg?
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Seti se kako se menjaju površine">
                <p>
                  Površine se menjaju sa <InlineMath>{"k^2"}</InlineMath>, ne sa{" "}
                  <InlineMath>{"k"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Izračunaj kvadrat koeficijenta">
                <p>
                  <InlineMath>
                    {"k^2=\\left(\\frac{3}{2}\\right)^2=\\frac{9}{4}"}
                  </InlineMath>
                  .
                </p>
              </WalkStep>
              <WalkStep number={3} title="Pomnoži površinu manjeg trougla">
                <p>
                  <InlineMath>
                    {"24\\cdot \\frac{9}{4}=54"}
                  </InlineMath>
                  .
                </p>
              </WalkStep>
            </div>
          </SectionCard>
          <SectionCard title="Detaljan primer: prepoznaj centar po osobini">
            <p>
              Tačka u trouglu jednako je udaljena od sve tri stranice. Koja je
              to značajna tačka?
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Pravilno pročitaj šta je dato">
                <p>
                  Nije rečeno &ldquo;od temena&rdquo;, nego &ldquo;od
                  stranica&rdquo;. To odmah isključuje centar opisane kružnice.
                </p>
              </WalkStep>
              <WalkStep number={2} title="Poveži osobinu sa konstrukcijom">
                <p>
                  Tačka jednako udaljena od stranica dobija se presekom
                  simetrala uglova.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Zaključak">
                <p>
                  To je centar upisane kružnice{" "}
                  <InlineMath>{"I"}</InlineMath>.
                </p>
              </WalkStep>
            </div>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ KLJUČNE RELACIJE ═══════════ */}
      <LessonSection
        id="formule"
        eyebrow="Ključne formule i relacije"
        title={'Šta mora da ti bude \u201Eu ruci\u201C na prijemnom'}
        description="Ove relacije nisu za bubanje bez razumevanja. Njihova vrednost je u tome što ti pomažu da brzo prepoznaš pravi potez u zadatku."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Uglovi trougla"
            formula={"\\alpha+\\beta+\\gamma=180^\\circ"}
            note="Prva relacija koju proveravaš kada tražiš ugao."
          />
          <FormulaCard
            title="Spoljašnji ugao"
            formula={"\\angle_{spol}=\\angle_1+\\angle_2"}
            note="Koristan kada se u zadatku produžuje stranica trougla."
          />
          <FormulaCard
            title="Tales"
            formula={"\\frac{AD}{AB}=\\frac{AE}{AC}=\\frac{DE}{BC}"}
            note="Pišeš tek kada si proverio paralelnost."
          />
          <FormulaCard
            title="Sličnost"
            formula={"\\frac{a_1}{a_2}=\\frac{b_1}{b_2}=\\frac{c_1}{c_2}=k"}
            note="Sve odgovarajuće dužine menjaju se istim odnosom."
          />
          <FormulaCard
            title="Površine sličnih"
            formula={"\\frac{P_1}{P_2}=k^2"}
            note="Vrlo česta zamka u zadacima sa površinama i zapreminama."
          />
          <FormulaCard
            title="Težište"
            formula="AG:GM=2:1"
            note="Uvek računaj od temena ka sredini stranice."
          />
          <FormulaCard
            title="Centar opisane kružnice"
            formula="OA=OB=OC"
            note="Jednaka udaljenost od temena znači da je tačka na simetralama stranica."
          />
          <FormulaCard
            title="Centar upisane kružnice"
            formula="d(I,AB)=d(I,BC)=d(I,CA)"
            note="Jednaka udaljenost od stranica znači presek simetrala uglova."
          />
          <FormulaCard
            title="Ojlerova prava"
            formula={"O,\\ G,\\ H \\text{ su kolinearne}"}
            note="Napredna ali veoma lepa relacija koja povezuje više konstrukcija u jedan obrazac."
          />
        </div>
      </LessonSection>

      {/* ═══════════ ČESTE GREŠKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Česte greške"
        title="Greške koje ruše inače dobar zadatak"
        description={'Slede\u0107e gre\u0161ke se ne de\u0161avaju zato \u0161to u\u010Denik \u201Ene zna matematiku\u201C, nego zato \u0161to brzopleto zaklju\u010Di vi\u0161e nego \u0161to je dato. Upravo zato ih treba nau\u010Diti da prepoznaje\u0161 unapred.'}
      >
        <div className={s.grid3}>
          <SectionCard title="Greška 1: iz tri ugla zaključiti podudarnost">
            <p>
              Tri ugla daju isti oblik, ali ne i istu veličinu. To je kriterijum
              za sličnost, ne za podudarnost.
            </p>
          </SectionCard>
          <SectionCard title="Greška 2: koristiti Talesa bez paralelnosti">
            <p>
              Ako prava nije paralelna odgovarajućoj stranici, proporcionalne
              relacije nemaju pravo opravdanje.
            </p>
          </SectionCard>
          <SectionCard title="Greška 3: pomešati simetralu ugla i simetralu stranice">
            <p>
              Jedna radi sa uglovima i vodi do centra upisane kružnice. Druga
              radi sa stranicom i vodi do centra opisane.
            </p>
          </SectionCard>
          <SectionCard title="Greška 4: zaboraviti da su površine proporcionalne sa k²">
            <p>
              Ako koeficijent sličnosti udvostručiš, površina ne postaje
              dvostruka nego četvorostruka.
            </p>
          </SectionCard>
          <SectionCard title="Greška 5: misliti da je ortocentar uvek unutra">
            <p>
              U tupouglom trouglu ortocentar je van trougla. Ako ti ispadne
              &ldquo;napolju&rdquo;, to može biti potpuno tačno.
            </p>
          </SectionCard>
          <SectionCard title="Greška 6: zaboraviti korespondenciju stranica">
            <p>
              U proporcijama moraš paziti koje stranice odgovaraju kojim
              uglovima. Pogrešno uparivanje ruši ceo račun.
            </p>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Kako se ova tema realno pojavljuje na testu"
        description={'Na prijemnom retko pi\u0161e \u201Edokazati podudarnost\u201C. Obi\u010Dno dobije\u0161 jedan zadatak koji kombinuje vi\u0161e ideja: jednakokraki trougao, paralelu, jednu kru\u017Enicu ili neku povr\u0161inu. Tvoj zadatak je da vidi\u0161 skriveni mehanizam.'}
      >
        <div className={s.grid3}>
          <SectionCard title="Tip 1: skrivena sličnost">
            <p>
              Dva trougla nisu nacrtana jedan pored drugog nego jedan unutar
              drugog. Paralela ili zajednički ugao često su signal da treba
              tražiti sličnost.
            </p>
          </SectionCard>
          <SectionCard title="Tip 2: dokaz pa račun">
            <p>
              Najpre moraš da dokažeš da su neke duži jednake ili da je neka duž
              visina/medijana, pa tek onda dolazi numerički deo.
            </p>
          </SectionCard>
          <SectionCard title="Tip 3: prepoznavanje centra">
            <p>
              Zadatak može da sakrije centar opisane ili upisane kružnice kroz
              opis &ldquo;jednako udaljeno od temena&rdquo; ili &ldquo;jednako
              udaljeno od stranica&rdquo;.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Završni uvid">
          <p>
            U skoro svakom dobrom planimetrijskom zadatku postoji trenutak kada
            crtež &ldquo;klikne&rdquo;. Tada odjednom vidiš ili podudarnost, ili
            sličnost, ili konstrukciju centra. Vežbanje ove lekcije ne služi samo
            da znaš teoreme, nego da taj klik prepoznaš brže od drugih.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEŽBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vežbe na kraju"
        title="Proveri da li si stvarno usvojio lekciju"
        description="Pokušaj da uradiš zadatke bez gledanja u rešenja. Ako zapneš, ne gledaj odmah detaljno rešenje, već prvo pokušaj da odrediš kom delu lekcije zadatak pripada."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Zadatak 1"
            problem={
              <p>
                U trouglu <InlineMath>{"ABC"}</InlineMath> dati su uglovi{" "}
                <InlineMath>{"A=42^\\circ"}</InlineMath> i{" "}
                <InlineMath>{"B=71^\\circ"}</InlineMath>. Odredi ugao{" "}
                <InlineMath>{"C"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                Po zbiru uglova trougla:{" "}
                <InlineMath>
                  {"C=180^\\circ-42^\\circ-71^\\circ=67^\\circ"}
                </InlineMath>
                .
              </p>
            }
          />
          <ExerciseCard
            title="Zadatak 2"
            problem={
              <p>
                U trouglu <InlineMath>{"ABC"}</InlineMath> važi{" "}
                <InlineMath>{"DE\\parallel BC"}</InlineMath>,{" "}
                <InlineMath>{"D\\in AB"}</InlineMath>,{" "}
                <InlineMath>{"E\\in AC"}</InlineMath>. Ako je{" "}
                <InlineMath>{"AD=5"}</InlineMath>,{" "}
                <InlineMath>{"DB=3"}</InlineMath> i{" "}
                <InlineMath>{"EC=6"}</InlineMath>, odredi{" "}
                <InlineMath>{"AE"}</InlineMath>.
              </p>
            }
            solution={
              <p>
                Po Talesovoj teoremi{" "}
                <InlineMath>
                  {"\\frac{AD}{DB}=\\frac{AE}{EC}"}
                </InlineMath>
                , pa{" "}
                <InlineMath>{"\\frac{5}{3}=\\frac{AE}{6}"}</InlineMath>. Odatle{" "}
                <InlineMath>{"AE=10"}</InlineMath>.
              </p>
            }
          />
          <ExerciseCard
            title="Zadatak 3"
            problem={
              <p>
                Dva trougla su slična sa koeficijentom{" "}
                <InlineMath>{"k=2"}</InlineMath>. Ako je površina manjeg trougla{" "}
                <InlineMath>{"7"}</InlineMath>, kolika je površina većeg?
              </p>
            }
            solution={
              <p>
                Površine se menjaju sa <InlineMath>{"k^2"}</InlineMath>, pa je
                površina većeg{" "}
                <InlineMath>{"7\\cdot 2^2=28"}</InlineMath>.
              </p>
            }
          />
          <ExerciseCard
            title="Zadatak 4"
            problem={
              <p>
                Medijana jednog trougla ima dužinu{" "}
                <InlineMath>{"18"}</InlineMath>. Kolike delove te medijane
                određuje težište?
              </p>
            }
            solution={
              <p>
                Težište deli medijanu u odnosu{" "}
                <InlineMath>{"2:1"}</InlineMath>. Zbir delova je{" "}
                <InlineMath>{"18"}</InlineMath>, pa jedan deo iznosi{" "}
                <InlineMath>{"6"}</InlineMath>. Dakle, duži deo je{" "}
                <InlineMath>{"12"}</InlineMath>, a kraći{" "}
                <InlineMath>{"6"}</InlineMath>.
              </p>
            }
          />
          <ExerciseCard
            title="Zadatak 5"
            problem={
              <p>
                Koja značajna tačka pravouglog trougla leži u temenu pravog
                ugla, a koja u sredini hipotenuze?
              </p>
            }
            solution={
              <p>
                U temenu pravog ugla nalazi se ortocentar, a u sredini
                hipotenuze centar opisane kružnice.
              </p>
            }
          />
          <ExerciseCard
            title="Zadatak 6"
            problem={
              <p>
                Objasni zašto dva trougla sa jednakim uglovima od{" "}
                <InlineMath>{"40^\\circ"}</InlineMath>,{" "}
                <InlineMath>{"60^\\circ"}</InlineMath> i{" "}
                <InlineMath>{"80^\\circ"}</InlineMath> ne moraju biti podudarna.
              </p>
            }
            solution={
              <p>
                Jednaki uglovi daju samo isti oblik, dakle sličnost. Jedan trougao
                može biti uvećana verzija drugog. Da bi bili podudarni, morao bi
                još da važi koeficijent sličnosti{" "}
                <InlineMath>{"k=1"}</InlineMath>, odnosno da odgovarajuće
                stranice budu jednake.
              </p>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Završni rezime"
        title="Šta moraš da poneseš iz ove lekcije"
        description="Ako ove ideje nosiš stabilno, kasnije planimetrijske lekcije postaće mnogo lakše. Ako ih još mešaš, vrati se na vođene primere i laboratoriju pre nego što pređeš dalje."
      >
        <div className={s.summaryGrid}>
          <SectionCard title="Ugaoni odnosi">
            <p>
              Zbir uglova trougla i spoljašnji ugao često su prvi korak u svakom
              dokazu.
            </p>
          </SectionCard>
          <SectionCard title="Talesova teorema">
            <p>
              Paralelnost u trouglu daje sličnost, a sličnost daje proporcije.
            </p>
          </SectionCard>
          <SectionCard title="Podudarnost">
            <p>
              Koristi kriterijume SSS, SUS, USU i posebni pravougli HK. Tri
              jednaka ugla nisu dovoljna.
            </p>
          </SectionCard>
          <SectionCard title="Sličnost">
            <p>
              Isti oblik znači jednake uglove i proporcionalne stranice; obimi se
              menjaju sa <InlineMath>{"k"}</InlineMath>, površine sa{" "}
              <InlineMath>{"k^2"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Značajne tačke">
            <p>
              Težište je presek medijana, ortocentar presek visina, centar
              opisane kružnice presek simetrala stranica, a centar upisane
              kružnice presek simetrala uglova.
            </p>
          </SectionCard>
          <SectionCard title="Položaj centara">
            <p>
              <InlineMath>{"G"}</InlineMath> i{" "}
              <InlineMath>{"I"}</InlineMath> su uvek unutra;{" "}
              <InlineMath>{"H"}</InlineMath> i{" "}
              <InlineMath>{"O"}</InlineMath> zavise od toga da li je trougao
              oštrougli, pravougli ili tupougli.
            </p>
          </SectionCard>
          <SectionCard title="Sledeći logičan korak">
            <p>
              Primena trigonometrije u planimetriji, gde ove geometrijske
              relacije dobijaš zajedno sa sinusnom i kosinusnom teoremom.
            </p>
          </SectionCard>
        </div>
      </LessonSection>
    </LessonShell>
  );
}
