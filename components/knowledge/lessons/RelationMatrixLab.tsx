"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

/* ── Relation definitions ── */

interface RelationDef {
  key: string;
  label: string;
  set: number[];
  formulaText: string;
  description: string;
  contains: (a: number, b: number) => boolean;
  explainPair: (a: number, b: number, inside: boolean) => string;
}

const RELATIONS: RelationDef[] = [
  {
    key: "mod3",
    label: "Isti ostatak mod 3",
    set: [0, 1, 2, 3, 4, 5],
    formulaText: "a R b  \\iff  a \\equiv b \\pmod{3}",
    description:
      "Relacija grupiše brojeve po ostatku pri deljenju sa 3. Ovo je klasičan primer relacije ekvivalencije.",
    contains: (a, b) => ((a - b) % 3 + 3) % 3 === 0,
    explainPair: (a, b, inside) =>
      inside
        ? `Par (${a},${b}) pripada relaciji jer brojevi ${a} i ${b} imaju isti ostatak pri deljenju sa 3.`
        : `Par (${a},${b}) ne pripada relaciji jer ${a} i ${b} ne daju isti ostatak pri deljenju sa 3.`,
  },
  {
    key: "divides",
    label: "Deljivost",
    set: [1, 2, 3, 6],
    formulaText: "a R b  \\iff  a \\mid b",
    description:
      "Ako prvi broj deli drugi, par je u relaciji. Dobija se parcijalni poredak jer nisu svi elementi međusobno uporedivi.",
    contains: (a, b) => b % a === 0,
    explainPair: (a, b, inside) =>
      inside
        ? `Par (${a},${b}) pripada relaciji zato što ${a} deli ${b}.`
        : `Par (${a},${b}) ne pripada relaciji zato što ${a} ne deli ${b}.`,
  },
  {
    key: "leq",
    label: "Manje ili jednako",
    set: [1, 2, 3, 4],
    formulaText: "a R b  \\iff  a \\le b",
    description:
      "Ovo je standardni model linearnog poretka: svaki element je uporediv sa svakim drugim elementom.",
    contains: (a, b) => a <= b,
    explainPair: (a, b, inside) =>
      inside
        ? `Par (${a},${b}) pripada relaciji jer je ${a} ≤ ${b}.`
        : `Par (${a},${b}) ne pripada relaciji jer nije tačno da je ${a} ≤ ${b}.`,
  },
  {
    key: "broken",
    label: "Bez tranzitivnosti",
    set: [1, 2, 3],
    formulaText: "R = \\{(1,1),(2,2),(3,3),(1,2),(2,3)\\}",
    description:
      "Namerno izabrana relacija koja izgleda uredno, ali ruši tranzitivnost jer iz (1,2) i (2,3) ne sledi (1,3).",
    contains: (a, b) =>
      (a === 1 && b === 1) ||
      (a === 2 && b === 2) ||
      (a === 3 && b === 3) ||
      (a === 1 && b === 2) ||
      (a === 2 && b === 3),
    explainPair: (a, b, inside) =>
      inside
        ? `Par (${a},${b}) je eksplicitno naveden u zadatoj relaciji.`
        : `Par (${a},${b}) nije naveden, pa ne pripada relaciji.`,
  },
];

/* ── Analysis ── */

interface Analysis {
  values: number[];
  reflexive: boolean;
  symmetric: boolean;
  antisymmetric: boolean;
  transitive: boolean;
  equivalence: boolean;
  partialOrder: boolean;
  totalOrder: boolean;
  missingDiag: number[];
  symWitness: [number, number] | null;
  antiWitness: [number, number] | null;
  transWitness: [number, number, number] | null;
  compWitness: [number, number] | null;
  classes: number[][];
  minimal: number[];
  maximal: number[];
}

function analyzeRelation(def: RelationDef): Analysis {
  const vals = def.set;
  const c = def.contains;

  const missingDiag = vals.filter((a) => !c(a, a));

  let symWitness: [number, number] | null = null;
  let antiWitness: [number, number] | null = null;
  let transWitness: [number, number, number] | null = null;
  let compWitness: [number, number] | null = null;

  for (const a of vals) {
    for (const b of vals) {
      if (!symWitness && c(a, b) && !c(b, a)) symWitness = [a, b];
      if (!antiWitness && a !== b && c(a, b) && c(b, a)) antiWitness = [a, b];
    }
  }

  for (const a of vals) {
    for (const b of vals) {
      for (const cc of vals) {
        if (!transWitness && c(a, b) && c(b, cc) && !c(a, cc))
          transWitness = [a, b, cc];
      }
    }
  }

  for (const a of vals) {
    for (const b of vals) {
      if (!compWitness && a !== b && !c(a, b) && !c(b, a))
        compWitness = [a, b];
    }
  }

  const reflexive = missingDiag.length === 0;
  const symmetric = !symWitness;
  const antisymmetric = !antiWitness;
  const transitive = !transWitness;
  const equivalence = reflexive && symmetric && transitive;
  const partialOrder = reflexive && antisymmetric && transitive;
  const totalOrder = partialOrder && !compWitness;

  const classes: number[][] = [];
  if (equivalence) {
    const seen = new Set<number>();
    vals.forEach((a) => {
      if (seen.has(a)) return;
      const group = vals.filter((x) => c(x, a));
      group.forEach((item) => seen.add(item));
      classes.push(group);
    });
  }

  const minimal = partialOrder
    ? vals.filter((a) => !vals.some((b) => a !== b && c(b, a)))
    : [];
  const maximal = partialOrder
    ? vals.filter((a) => !vals.some((b) => a !== b && c(a, b)))
    : [];

  return {
    values: vals,
    reflexive,
    symmetric,
    antisymmetric,
    transitive,
    equivalence,
    partialOrder,
    totalOrder,
    missingDiag,
    symWitness,
    antiWitness,
    transWitness,
    compWitness,
    classes,
    minimal,
    maximal,
  };
}

/* ── Property pill ── */

function StatusPill({ ok }: { ok: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 56,
        padding: "6px 10px",
        borderRadius: 999,
        fontSize: "0.8rem",
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: "0.07em",
        background: ok
          ? "rgba(103, 215, 173, 0.14)"
          : "rgba(255, 143, 143, 0.14)",
        color: ok ? "var(--lesson-success)" : "var(--lesson-danger)",
      }}
    >
      {ok ? "da" : "ne"}
    </span>
  );
}

/* ── Property explanations ── */

function propMsg(
  type: "reflexive" | "symmetric" | "antisymmetric" | "transitive",
  a: Analysis
): string {
  if (type === "reflexive") {
    return a.reflexive
      ? `Da. Prisutan je svaki diagonalni par ${a.values.map((v) => `(${v},${v})`).join(", ")}.`
      : `Ne. Nedostaju diagonalni parovi: ${a.missingDiag.map((v) => `(${v},${v})`).join(", ")}.`;
  }
  if (type === "symmetric") {
    return a.symmetric
      ? "Da. Svaki prisutan par ima i svoj obrnuti par."
      : `Ne. Postoji (${a.symWitness![0]},${a.symWitness![1]}), ali ne i (${a.symWitness![1]},${a.symWitness![0]}).`;
  }
  if (type === "antisymmetric") {
    return a.antisymmetric
      ? "Da. Nema dvosmernog para sa različitim elementima."
      : `Ne. Istovremeno važe (${a.antiWitness![0]},${a.antiWitness![1]}) i (${a.antiWitness![1]},${a.antiWitness![0]}) za različite elemente.`;
  }
  // transitive
  return a.transitive
    ? "Da. Svaki dvokorak se zatvara direktnim parom."
    : `Ne. Važe (${a.transWitness![0]},${a.transWitness![1]}) i (${a.transWitness![1]},${a.transWitness![2]}), ali ne i (${a.transWitness![0]},${a.transWitness![2]}).`;
}

function classificationMsg(def: RelationDef, a: Analysis): string {
  if (a.equivalence) {
    const clsStr = a.classes
      .map((g) => `{${g.join(",")}}`)
      .join(", ");
    return `Ova relacija je ekvivalencija. Na skupu {${a.values.join(",")}} daje klase: ${clsStr}.`;
  }
  if (a.totalOrder) {
    return `Ova relacija je linearni poredak. Svi elementi su uporedivi. Minimalni: {${a.minimal.join(",")}}. Maksimalni: {${a.maximal.join(",")}}.`;
  }
  if (a.partialOrder) {
    const extra = a.compWitness
      ? ` Na primer, ${a.compWitness[0]} i ${a.compWitness[1]} nisu uporedivi.`
      : "";
    return `Ova relacija je parcijalni poredak, ali nije linearni. Minimalni: {${a.minimal.join(",")}}. Maksimalni: {${a.maximal.join(",")}}.${extra}`;
  }
  return `Relacija "${def.label}" nije ni ekvivalencija ni parcijalni poredak.`;
}

/* ── Canvas drawing ── */

function drawMatrix(
  canvas: HTMLCanvasElement,
  def: RelationDef,
  analysis: Analysis,
  activePair: { a: number; b: number },
  hitCellsRef: React.MutableRefObject<
    { x: number; y: number; w: number; h: number; a: number; b: number }[]
  >
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const dpr = window.devicePixelRatio || 1;
  const isLight = document.documentElement.classList.contains("light");

  // Theme-aware palette
  const T = {
    bg1: isLight ? "#f5f0eb" : "#160906",
    bg2: isLight ? "#ebe5df" : "#0a0403",
    text: isLight ? "#2a2420" : "#f6eee9",
    muted: isLight ? "#7a6f68" : "#cdb8aa",
    accent: isLight ? "#d94e0a" : "#ffb488",
    pillBg: isLight ? "rgba(236,91,19,0.12)" : "rgba(236, 91, 19, 0.14)",
    pillBorder: isLight ? "rgba(236,91,19,0.20)" : "rgba(255, 154, 106, 0.28)",
    gridBg: isLight ? "rgba(0,0,0,0.02)" : "rgba(255, 255, 255, 0.02)",
    gridBorder: isLight ? "rgba(0,0,0,0.06)" : "rgba(255, 154, 106, 0.12)",
    insideFill: isLight ? "rgba(26,158,110,0.14)" : "rgba(103, 215, 173, 0.18)",
    outsideFill: isLight ? "rgba(236,91,19,0.05)" : "rgba(236, 91, 19, 0.05)",
    selectedStroke: isLight ? "#2a2420" : "#f6eee9",
    insideStroke: isLight ? "rgba(26,158,110,0.30)" : "rgba(103, 215, 173, 0.34)",
    diagStroke: isLight ? "rgba(180,120,80,0.26)" : "rgba(255, 154, 106, 0.30)",
    outsideStroke: isLight ? "rgba(180,120,80,0.10)" : "rgba(255, 154, 106, 0.10)",
    insideText: isLight ? "#1a9e6e" : "#67d7ad",
    outsideText: isLight ? "#d94e0a" : "#ffb488",
  };

  const rect = canvas.getBoundingClientRect();
  const W = Math.max(320, Math.floor(rect.width));
  const H = W < 560 ? 440 : 560;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  canvas.style.height = H + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const vals = analysis.values;
  const n = vals.length;
  hitCellsRef.current = [];

  /* background */
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, T.bg1);
  bg.addColorStop(1, T.bg2);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  /* title */
  ctx.fillStyle = T.text;
  ctx.font = '800 24px "Public Sans", system-ui, sans-serif';
  ctx.textAlign = "left";
  ctx.fillText("Laboratorijum relacija", 24, 40);

  ctx.fillStyle = T.muted;
  ctx.font = '400 14px "Public Sans", system-ui, sans-serif';
  ctx.fillText(
    "Matrica prikazuje koje uređene parove relacija prihvata.",
    24,
    63
  );

  /* pill */
  const pillWidth = Math.min(260, W - 48);
  ctx.beginPath();
  ctx.roundRect(W - pillWidth - 24, 22, pillWidth, 34, 999);
  ctx.fillStyle = T.pillBg;
  ctx.fill();
  ctx.strokeStyle = T.pillBorder;
  ctx.lineWidth = 1.2;
  ctx.stroke();
  ctx.fillStyle = T.text;
  ctx.font = '700 13px "Public Sans", system-ui, sans-serif';
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(def.label, W - pillWidth / 2 - 24, 39);

  /* grid metrics */
  const sidePadding = W < 520 ? 26 : 38;
  const labelSpace = W < 520 ? 26 : 34;
  const topSpace = 112;
  const bottomSpace = 78;
  const availW = W - sidePadding * 2 - labelSpace;
  const availH = H - topSpace - bottomSpace;
  const cellSize = Math.floor(Math.min(availW / n, availH / n));
  const gridWidth = cellSize * n;
  const gridHeight = cellSize * n;
  const gridX = Math.round((W - gridWidth) / 2 + labelSpace / 2);
  const gridY = Math.max(110, Math.round((H - gridHeight) / 2));

  /* grid bg */
  ctx.beginPath();
  ctx.roundRect(
    gridX - labelSpace,
    gridY - 52,
    gridWidth + labelSpace + 18,
    gridHeight + 66,
    24
  );
  ctx.fillStyle = T.gridBg;
  ctx.fill();
  ctx.strokeStyle = T.gridBorder;
  ctx.lineWidth = 1.2;
  ctx.stroke();

  /* labels */
  ctx.textBaseline = "middle";
  ctx.font = '700 14px "Public Sans", system-ui, sans-serif';
  vals.forEach((v, idx) => {
    const x = gridX + idx * cellSize + cellSize / 2;
    const y = gridY + idx * cellSize + cellSize / 2;
    ctx.fillStyle = T.accent;
    ctx.textAlign = "center";
    ctx.fillText(String(v), x, gridY - 24);
    ctx.fillText(String(v), gridX - 22, y);
  });

  /* axis labels */
  ctx.save();
  ctx.translate(gridX - 48, gridY + gridHeight / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = T.muted;
  ctx.font = '700 12px "Public Sans", system-ui, sans-serif';
  ctx.textAlign = "center";
  ctx.fillText("prvi član para", 0, 0);
  ctx.restore();

  ctx.fillStyle = T.muted;
  ctx.font = '700 12px "Public Sans", system-ui, sans-serif';
  ctx.textAlign = "center";
  ctx.fillText("drugi član para", gridX + gridWidth / 2, gridY - 48);

  /* cells */
  vals.forEach((a, row) => {
    vals.forEach((b, col) => {
      const x = gridX + col * cellSize;
      const y = gridY + row * cellSize;
      const inside = def.contains(a, b);
      const selected = activePair.a === a && activePair.b === b;
      const diagonal = row === col;

      const fill = inside ? T.insideFill : T.outsideFill;
      const stroke = selected
        ? T.selectedStroke
        : inside
          ? T.insideStroke
          : diagonal
            ? T.diagStroke
            : T.outsideStroke;

      ctx.beginPath();
      ctx.roundRect(x + 2, y + 2, cellSize - 4, cellSize - 4, 12);
      ctx.fillStyle = fill;
      ctx.fill();
      ctx.strokeStyle = stroke;
      ctx.lineWidth = selected ? 2 : 1.2;
      ctx.stroke();

      ctx.fillStyle = inside ? T.insideText : T.outsideText;
      ctx.font =
        (selected ? "800 " : "700 ") +
        Math.max(14, cellSize * 0.32) +
        'px "Public Sans", system-ui, sans-serif';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(inside ? "\u2713" : "\u00B7", x + cellSize / 2, y + cellSize / 2 + 1);

      hitCellsRef.current.push({ x, y, w: cellSize, h: cellSize, a, b });
    });
  });

  /* footer */
  ctx.textAlign = "left";
  ctx.fillStyle = T.muted;
  ctx.font = '400 13px "Public Sans", system-ui, sans-serif';
  ctx.fillText(
    "Zelena ćelija znači da par pripada relaciji. Bela ivica pokazuje izabrani par.",
    24,
    H - 24
  );
}

/* ── Main Component ── */

export default function RelationMatrixLab() {
  const [relIdx, setRelIdx] = useState(0);
  const [pair, setPair] = useState({ a: 0, b: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hitCells = useRef<
    { x: number; y: number; w: number; h: number; a: number; b: number }[]
  >([]);

  const def = RELATIONS[relIdx];
  const analysis = analyzeRelation(def);

  /* Ensure pair valid when relation changes */
  const validPair =
    def.set.includes(pair.a) && def.set.includes(pair.b)
      ? pair
      : { a: def.set[0], b: def.set[0] };

  const paint = useCallback(() => {
    if (!canvasRef.current) return;
    drawMatrix(canvasRef.current, def, analysis, validPair, hitCells);
  }, [def, analysis, validPair]);

  useEffect(() => {
    paint();
    const onResize = () => paint();
    window.addEventListener("resize", onResize);
    const observer = new MutationObserver(() => paint());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => { window.removeEventListener("resize", onResize); observer.disconnect(); };
  }, [paint]);

  function handleCanvasClick(e: React.MouseEvent<HTMLCanvasElement>) {
    const rect = canvasRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const hit = hitCells.current.find(
      (c) => x >= c.x && x <= c.x + c.w && y >= c.y && y <= c.y + c.h
    );
    if (hit) setPair({ a: hit.a, b: hit.b });
  }

  function selectRelation(idx: number) {
    setRelIdx(idx);
    setPair({ a: RELATIONS[idx].set[0], b: RELATIONS[idx].set[0] });
  }

  const pairInside = def.contains(validPair.a, validPair.b);

  return (
    <>
      {/* Relation selector buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 18 }}>
        {RELATIONS.map((r, i) => (
          <button
            key={r.key}
            onClick={() => selectRelation(i)}
            className={s.presetBtn}
            style={{
              background:
                i === relIdx
                  ? "rgba(236, 91, 19, 0.22)"
                  : "rgba(236, 91, 19, 0.08)",
              borderColor:
                i === relIdx
                  ? "rgba(255, 154, 106, 0.4)"
                  : "rgba(236, 91, 19, 0.18)",
            }}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Canvas */}
      <div className={s.canvasWrap}>
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          style={{ width: "100%", display: "block", borderRadius: 18, cursor: "pointer" }}
        />
      </div>

      {/* Reading cards */}
      <div className={s.grid2} style={{ marginTop: 16 }}>
        <article className={s.sectionCard}>
          <h3 className={cs.tCardTitle}>Aktivna relacija</h3>
          <p style={{ color: "var(--lesson-muted)" }}>
            Relacija na skupu {"{"}{analysis.values.join(",")}{"}"}
          </p>
          <p style={{ color: "var(--lesson-muted)", marginTop: 8 }}>
            {def.description}
          </p>
        </article>

        <article className={s.sectionCard}>
          <h3 className={cs.tCardTitle}>Izabrani uređeni par</h3>
          <p style={{ color: "var(--lesson-muted)" }}>
            Izabrani par je ({validPair.a},{validPair.b}).
          </p>
          <p style={{ color: "var(--lesson-muted)", marginTop: 6 }}>
            {def.explainPair(validPair.a, validPair.b, pairInside)}
          </p>
        </article>
      </div>

      {/* Property cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 14,
          marginTop: 16,
        }}
      >
        {(
          [
            ["Refleksivnost", "reflexive"],
            ["Simetričnost", "symmetric"],
            ["Antisimetričnost", "antisymmetric"],
            ["Tranzitivnost", "transitive"],
          ] as const
        ).map(([title, key]) => {
          const ok = analysis[key];
          return (
            <article
              key={key}
              className={s.sectionCard}
              style={{
                borderColor: ok
                  ? "rgba(103, 215, 173, 0.26)"
                  : "rgba(255, 143, 143, 0.22)",
                minHeight: 140,
              }}
            >
              <h3
                className={cs.tCardTitle}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                {title} <StatusPill ok={ok} />
              </h3>
              <p style={{ color: "var(--lesson-muted)", fontSize: "0.92rem" }}>
                {propMsg(key, analysis)}
              </p>
            </article>
          );
        })}
      </div>

      {/* Classification + guide */}
      <div className={s.grid2} style={{ marginTop: 16 }}>
        <article className={s.sectionCard}>
          <h3 className={cs.tCardTitle}>Klasifikacija</h3>
          <p style={{ color: "var(--lesson-muted)" }}>
            {classificationMsg(def, analysis)}
          </p>
        </article>
        <article className={s.sectionCard}>
          <h3 className={cs.tCardTitle}>Kako da čitaš matricu</h3>
          <ul style={{ color: "var(--lesson-muted)", paddingLeft: 18 }}>
            <li>dijagonala ti odmah govori nešto o refleksivnosti</li>
            <li>ogledalo preko dijagonale proverava simetričnost</li>
            <li>dvosmerni parovi van dijagonale ruše antisimetričnost</li>
            <li>dva uzastopna koraka treba da daju i direktan treći korak</li>
          </ul>
        </article>
      </div>
    </>
  );
}
