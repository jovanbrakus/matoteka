"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

/* ────────────────────────────────────────────
   Presets: predefined scenarios for the lab
   ──────────────────────────────────────────── */
interface Arrow {
  from: string;
  to: string;
}

interface PresetBase {
  label: string;
  domain: string[];
  codomain: string[];
  formula: string;
  description: string;
}

interface RelationPreset extends PresetBase {
  type: "relation";
  arrows: [string, string][];
}

interface FunctionPreset extends PresetBase {
  type: "function";
  mapping: Record<string, string>;
}

type Preset = RelationPreset | FunctionPreset;

const PRESETS: Record<string, Preset> = {
  notFunction: {
    type: "relation",
    label: "Relacija koja nije funkcija",
    domain: ["1", "2", "3"],
    codomain: ["a", "b", "c"],
    formula: "R \\subseteq A \\times B",
    description:
      "Prvi element domena ima dve razlicite slike, a treci nema nijednu. Zato jos nismo ni stigli do pitanja injekcije ili surjekcije.",
    arrows: [
      ["1", "a"],
      ["1", "b"],
      ["2", "b"],
    ],
  },
  injection: {
    type: "function",
    label: "Funkcija koja je samo injektivna",
    domain: ["1", "2", "3"],
    codomain: ["a", "b", "c", "d"],
    formula: "f:\\{1,2,3\\}\\to\\{a,b,c,d\\}",
    description:
      "Svi ulazi idu u razlicite izlaze, ali element d ostaje nepogodjen, pa funkcija nije surjektivna.",
    mapping: { "1": "a", "2": "b", "3": "c" },
  },
  surjection: {
    type: "function",
    label: "Funkcija koja je samo surjektivna",
    domain: ["1", "2", "3", "4"],
    codomain: ["a", "b", "c"],
    formula: "f:\\{1,2,3,4\\}\\to\\{a,b,c\\}",
    description:
      "Svaki element kodomena dobija bar jednu strelicu, ali izlaz c ima dve pretslike, pa funkcija nije injektivna.",
    mapping: { "1": "a", "2": "b", "3": "c", "4": "c" },
  },
  bijection: {
    type: "function",
    label: "Bijektivna funkcija",
    domain: ["1", "2", "3"],
    codomain: ["x", "y", "z"],
    formula: "f:\\{1,2,3\\}\\to\\{x,y,z\\}",
    description:
      "Nema sudara i nema praznih mesta. Zato ova funkcija ima inverz.",
    mapping: { "1": "x", "2": "y", "3": "z" },
  },
  manual: {
    type: "function",
    label: "Rucno podesavanje funkcije",
    domain: ["1", "2", "3", "4"],
    codomain: ["p", "q", "r", "s"],
    formula: "f:A\\to B",
    description:
      "Promeni slike elemenata domena i posmatraj kako se menja klasifikacija funkcije.",
    mapping: { "1": "p", "2": "q", "3": "q", "4": "s" },
  },
};

const MODE_LABELS: Record<string, string> = {
  notFunction: "Nije funkcija",
  injection: "Samo injekcija",
  surjection: "Samo surjekcija",
  bijection: "Bijekcija",
  manual: "Rucno menjanje",
};

/* ────────────────────────────────────────────
   Analysis helper
   ──────────────────────────────────────────── */
interface Analysis {
  arrows: Arrow[];
  outgoing: Map<string, string[]>;
  incoming: Map<string, string[]>;
  missingDomain: string[];
  multiDomain: string[];
  isFunction: boolean;
  injective: boolean;
  surjective: boolean;
  bijective: boolean;
  image: string[];
  inversePairs: string[];
}

function analyze(scenario: Preset, manualMapping?: Record<string, string>): Analysis {
  const arrows: Arrow[] =
    scenario.type === "relation"
      ? scenario.arrows.map(([from, to]) => ({ from, to }))
      : Object.entries(
          scenario.type === "function" && manualMapping
            ? manualMapping
            : (scenario as FunctionPreset).mapping
        ).map(([from, to]) => ({ from, to }));

  const outgoing = new Map<string, string[]>();
  const incoming = new Map<string, string[]>();

  scenario.domain.forEach((item) => outgoing.set(item, []));
  scenario.codomain.forEach((item) => incoming.set(item, []));

  arrows.forEach((arrow) => {
    outgoing.get(arrow.from)?.push(arrow.to);
    incoming.get(arrow.to)?.push(arrow.from);
  });

  const missingDomain = scenario.domain.filter(
    (item) => (outgoing.get(item)?.length ?? 0) === 0
  );
  const multiDomain = scenario.domain.filter(
    (item) => (outgoing.get(item)?.length ?? 0) > 1
  );
  const isFunction = missingDomain.length === 0 && multiDomain.length === 0;

  let injective = false;
  let surjective = false;
  let bijective = false;
  let image: string[] = [];
  let inversePairs: string[] = [];

  if (isFunction) {
    const mappingValues = scenario.domain.map(
      (item) => outgoing.get(item)![0]
    );
    image = Array.from(new Set(mappingValues));
    injective = new Set(mappingValues).size === mappingValues.length;
    surjective = scenario.codomain.every(
      (item) => (incoming.get(item)?.length ?? 0) >= 1
    );
    bijective = injective && surjective;

    if (bijective) {
      inversePairs = scenario.codomain.map(
        (item) => `${item}\\mapsto ${incoming.get(item)![0]}`
      );
    }
  } else {
    image = Array.from(new Set(arrows.map((a) => a.to)));
  }

  return {
    arrows,
    outgoing,
    incoming,
    missingDomain,
    multiDomain,
    isFunction,
    injective,
    surjective,
    bijective,
    image,
    inversePairs,
  };
}

function describeScenario(analysis: Analysis): string {
  if (!analysis.isFunction) {
    const parts: string[] = [];
    if (analysis.multiDomain.length) {
      parts.push(
        `element(i) domena ${analysis.multiDomain.join(", ")} imaju vise od jedne slike`
      );
    }
    if (analysis.missingDomain.length) {
      parts.push(
        `element(i) domena ${analysis.missingDomain.join(", ")} nemaju nijednu sliku`
      );
    }
    return `Ova relacija nije funkcija zato sto ${parts.join(" i ")}. Dok to ne popravis, nema smisla govoriti o inverzu kao o funkciji.`;
  }
  if (analysis.bijective) {
    return "Ovo je idealan slucaj: funkcija je i injektivna i surjektivna, pa svaki izlaz iz kodomena vodi nazad do tacno jednog ulaza.";
  }
  if (analysis.injective) {
    return "Funkcija razlikuje sve ulaze, ali bar jedan element kodomena ostaje nepogodjen. Zato jos nema inverz na dati kodomen.";
  }
  if (analysis.surjective) {
    return "Svi elementi kodomena jesu pogodjeni, ali neki izlaz ima vise od jedne pretslike. Zato povratak unazad nije jednoznacan.";
  }
  return "Funkcija jeste pravilno definisana, ali nije ni injektivna ni surjektivna na dati kodomen.";
}

/* ────────────────────────────────────────────
   Canvas drawing
   ──────────────────────────────────────────── */
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number
) {
  const r = Math.min(radius, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawArrow(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string,
  dashed: boolean,
  bend: number
) {
  const midX = (x1 + x2) / 2;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2.4;
  if (dashed) ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.bezierCurveTo(midX + bend, y1, midX - bend, y2, x2, y2);
  ctx.stroke();
  ctx.setLineDash([]);

  const angle = Math.atan2(y2 - y1, x2 - x1);
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(
    x2 - 12 * Math.cos(angle - Math.PI / 6),
    y2 - 12 * Math.sin(angle - Math.PI / 6)
  );
  ctx.lineTo(
    x2 - 12 * Math.cos(angle + Math.PI / 6),
    y2 - 12 * Math.sin(angle + Math.PI / 6)
  );
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawNode(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  label: string,
  tone: string,
  dimmed: boolean
) {
  const fillMap: Record<string, string> = {
    default: "rgba(255,255,255,0.06)",
    success: "rgba(103, 215, 173, 0.18)",
    warning: "rgba(255, 180, 136, 0.18)",
    danger: "rgba(255, 143, 143, 0.18)",
    sky: "rgba(127, 214, 255, 0.16)",
  };
  const strokeMap: Record<string, string> = {
    default: "rgba(255, 154, 106, 0.22)",
    success: "rgba(103, 215, 173, 0.42)",
    warning: "rgba(255, 180, 136, 0.42)",
    danger: "rgba(255, 143, 143, 0.42)",
    sky: "rgba(127, 214, 255, 0.42)",
  };

  ctx.save();
  ctx.globalAlpha = dimmed ? 0.55 : 1;
  ctx.fillStyle = fillMap[tone] || fillMap.default;
  ctx.strokeStyle = strokeMap[tone] || strokeMap.default;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, 25, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#f6eee9";
  ctx.font = "700 18px Public Sans, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, x, y + 1);
  ctx.restore();
}

function renderCanvas(
  canvas: HTMLCanvasElement,
  scenario: Preset,
  analysis: Analysis,
  showInverse: boolean
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const cssWidth = canvas.clientWidth || canvas.parentElement?.clientWidth || 800;
  const cssHeight = Math.max(360, Math.round(cssWidth * 0.52));
  const ratio = window.devicePixelRatio || 1;

  canvas.width = Math.round(cssWidth * ratio);
  canvas.height = Math.round(cssHeight * ratio);
  canvas.style.height = `${cssHeight}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const width = cssWidth;
  const height = cssHeight;

  ctx.clearRect(0, 0, width, height);

  const leftX = Math.max(80, width * 0.19);
  const rightX = width - Math.max(80, width * 0.19);
  const panelTop = 34;
  const panelHeight = height - 68;
  const panelWidth = Math.min(200, width * 0.25);

  ctx.fillStyle = "rgba(255,255,255,0.02)";
  ctx.strokeStyle = "rgba(255,154,106,0.12)";
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, leftX - panelWidth / 2, panelTop, panelWidth, panelHeight, 24);
  ctx.fill();
  ctx.stroke();

  drawRoundedRect(ctx, rightX - panelWidth / 2, panelTop, panelWidth, panelHeight, 24);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#ffb488";
  ctx.font = "700 16px Public Sans, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("DOMEN", leftX, 56);
  ctx.fillText("KODOMEN", rightX, 56);

  const domainPositions = new Map<string, { x: number; y: number }>();
  const codomainPositions = new Map<string, { x: number; y: number }>();
  const topOffset = 110;

  scenario.domain.forEach((label, index) => {
    const y =
      topOffset +
      (index + 0.5) *
        ((height - topOffset - 46) / scenario.domain.length);
    domainPositions.set(label, { x: leftX, y });
  });

  scenario.codomain.forEach((label, index) => {
    const y =
      topOffset +
      (index + 0.5) *
        ((height - topOffset - 46) / scenario.codomain.length);
    codomainPositions.set(label, { x: rightX, y });
  });

  // Draw arrows
  analysis.arrows.forEach((arrow, index) => {
    const start = domainPositions.get(arrow.from);
    const end = codomainPositions.get(arrow.to);
    if (!start || !end) return;
    const isInvalid =
      analysis.multiDomain.includes(arrow.from) || !analysis.isFunction;
    const color = isInvalid
      ? "rgba(255,143,143,0.88)"
      : analysis.bijective
        ? "rgba(103,215,173,0.88)"
        : "rgba(255,180,136,0.9)";
    const bend = (index % 2 === 0 ? 1 : -1) * 18;
    drawArrow(ctx, start.x + 26, start.y, end.x - 26, end.y, color, false, bend);
  });

  // Draw inverse arrows if bijective
  if (analysis.isFunction && analysis.bijective && showInverse) {
    scenario.codomain.forEach((item, index) => {
      const from = codomainPositions.get(item);
      const incoming = analysis.incoming.get(item);
      if (!from || !incoming?.[0]) return;
      const to = domainPositions.get(incoming[0]);
      if (!to) return;
      drawArrow(
        ctx,
        from.x - 26,
        from.y,
        to.x + 26,
        to.y,
        "rgba(127,214,255,0.75)",
        true,
        (index % 2 === 0 ? 1 : -1) * 22
      );
    });
  }

  // Draw domain nodes
  scenario.domain.forEach((label) => {
    const position = domainPositions.get(label);
    if (!position) return;
    const tone = analysis.multiDomain.includes(label)
      ? "danger"
      : analysis.missingDomain.includes(label)
        ? "warning"
        : analysis.isFunction
          ? "success"
          : "default";
    drawNode(ctx, position.x, position.y, label, tone, false);
  });

  // Draw codomain nodes
  scenario.codomain.forEach((label) => {
    const position = codomainPositions.get(label);
    if (!position) return;
    const hasIncoming = (analysis.incoming.get(label)?.length ?? 0) > 0;
    const tone = !hasIncoming
      ? "warning"
      : analysis.bijective
        ? "sky"
        : "default";
    drawNode(
      ctx,
      position.x,
      position.y,
      label,
      tone,
      !hasIncoming && analysis.isFunction
    );
  });

  // Center note
  ctx.fillStyle = "rgba(246,238,233,0.75)";
  ctx.font = "500 14px Public Sans, system-ui, sans-serif";
  ctx.textAlign = "center";
  const centerNote = analysis.isFunction
    ? analysis.bijective
      ? "Bijekcija: svaki izlaz ima tacno jednu pretsliku."
      : "Funkcija postoji. Sada proveravaj da li ima sudara i praznih mesta."
    : "Najpre popravi relaciju tako da svaki ulaz ima tacno jednu sliku.";
  ctx.fillText(centerNote, width / 2, height - 22);
}

/* ────────────────────────────────────────────
   StatusCard sub-component
   ──────────────────────────────────────────── */
function StatusCard({
  title,
  stateLabel,
  tone,
  note,
}: {
  title: string;
  stateLabel: string;
  tone: "ok" | "warn" | "bad";
  note: string;
}) {
  const toneColors: Record<string, React.CSSProperties> = {
    ok: {
      color: "#d8fff1",
      borderColor: "rgba(103, 215, 173, 0.28)",
      background: "rgba(103, 215, 173, 0.12)",
    },
    warn: {
      color: "#fff1e4",
      borderColor: "rgba(255, 180, 136, 0.28)",
      background: "rgba(255, 180, 136, 0.12)",
    },
    bad: {
      color: "#ffe4e4",
      borderColor: "rgba(255, 143, 143, 0.28)",
      background: "rgba(255, 143, 143, 0.12)",
    },
  };

  return (
    <article className={s.sectionCard}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 12px",
          borderRadius: 999,
          fontWeight: 600,
          fontSize: "0.9rem",
          marginBottom: 10,
          border: `1px solid ${toneColors[tone]?.borderColor}`,
          ...toneColors[tone],
        }}
      >
        {stateLabel}
      </div>
      <strong style={{ display: "block", marginBottom: 10 }}>{title}</strong>
      <p style={{ color: "var(--lesson-muted)" }}>{note}</p>
    </article>
  );
}

/* ────────────────────────────────────────────
   MappingLab component
   ──────────────────────────────────────────── */
export default function MappingLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<string>("notFunction");
  const [manualMapping, setManualMapping] = useState<Record<string, string>>({
    ...((PRESETS.manual as FunctionPreset).mapping),
  });
  const [showInverse, setShowInverse] = useState(false);

  const getScenario = useCallback((): Preset => {
    if (mode !== "manual") return PRESETS[mode];
    return {
      ...PRESETS.manual,
      mapping: { ...manualMapping },
    } as FunctionPreset;
  }, [mode, manualMapping]);

  const currentAnalysis = analyze(
    getScenario(),
    mode === "manual" ? manualMapping : undefined
  );

  const doRender = useCallback(() => {
    if (!canvasRef.current) return;
    const scenario = mode !== "manual" ? PRESETS[mode] : {
      ...PRESETS.manual,
      mapping: { ...manualMapping },
    } as FunctionPreset;
    const a = analyze(scenario, mode === "manual" ? manualMapping : undefined);
    renderCanvas(canvasRef.current, scenario, a, showInverse);
  }, [mode, manualMapping, showInverse]);

  useEffect(() => {
    doRender();
    const handler = () => doRender();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [doRender]);

  const scenario = getScenario();

  return (
    <>
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          marginBottom: 18,
        }}
      >
        {Object.keys(PRESETS).map((key) => (
          <button
            key={key}
            onClick={() => {
              setMode(key);
              setShowInverse(false);
            }}
            className={s.presetBtn}
            style={{
              background:
                mode === key
                  ? "rgba(236, 91, 19, 0.22)"
                  : "rgba(236, 91, 19, 0.08)",
              borderColor:
                mode === key
                  ? "rgba(236, 91, 19, 0.44)"
                  : "rgba(236, 91, 19, 0.16)",
            }}
          >
            {MODE_LABELS[key]}
          </button>
        ))}
      </div>

      {/* Manual controls */}
      {mode === "manual" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 12,
            marginBottom: 20,
          }}
        >
          {(PRESETS.manual as FunctionPreset).domain.map((domVal) => (
            <div
              key={domVal}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                padding: "14px 16px",
                borderRadius: 16,
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 154, 106, 0.10)",
              }}
            >
              <span
                style={{ color: "var(--lesson-muted-strong)", fontWeight: 600 }}
              >
                f({domVal}) =
              </span>
              <select
                value={manualMapping[domVal]}
                onChange={(e) =>
                  setManualMapping((prev) => ({
                    ...prev,
                    [domVal]: e.target.value,
                  }))
                }
                style={{
                  minWidth: 120,
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: "1px solid rgba(255, 154, 106, 0.18)",
                  background: "rgba(12, 5, 4, 0.85)",
                  color: "var(--lesson-text)",
                  font: "inherit",
                }}
              >
                {(PRESETS.manual as FunctionPreset).codomain.map((codVal) => (
                  <option key={codVal} value={codVal}>
                    {codVal}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              color: "var(--lesson-muted-strong)",
              fontWeight: 600,
              gridColumn: "1 / -1",
            }}
          >
            <input
              type="checkbox"
              checked={showInverse}
              onChange={(e) => setShowInverse(e.target.checked)}
              disabled={!currentAnalysis.bijective}
              style={{ accentColor: "var(--lesson-primary)" }}
            />
            Prikazi obrnute strelice ako funkcija postane bijektivna
          </label>
        </div>
      )}

      {mode !== "manual" && currentAnalysis.bijective && (
        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            color: "var(--lesson-muted-strong)",
            fontWeight: 600,
            marginBottom: 14,
          }}
        >
          <input
            type="checkbox"
            checked={showInverse}
            onChange={(e) => setShowInverse(e.target.checked)}
            style={{ accentColor: "var(--lesson-primary)" }}
          />
          Prikazi obrnute strelice (inverz)
        </label>
      )}

      {/* Canvas */}
      <div className={s.canvasWrap}>
        <canvas
          ref={canvasRef}
          style={{
            display: "block",
            width: "100%",
            borderRadius: 20,
            background: "rgba(8, 4, 3, 0.92)",
            border: "1px solid rgba(255, 154, 106, 0.14)",
          }}
        />
        <p
          style={{
            color: "var(--lesson-muted)",
            marginTop: 12,
            fontSize: "0.95rem",
          }}
        >
          Levo je domen, desno kodomen. Crvene situacije znace da relacija jos
          nije funkcija; zelene i narandzaste prikazuju funkcije razlicitih
          tipova.
        </p>
      </div>

      {/* Analysis panel */}
      <div className={s.grid2} style={{ marginTop: 16 }}>
        <article className={s.sectionCard}>
          <h3 className={cs.tCardTitle}>Aktivni scenario</h3>
          <p style={{ color: "var(--lesson-muted-strong)", fontWeight: 600 }}>
            {scenario.label}
          </p>
          <p style={{ color: "var(--lesson-muted)", marginTop: 8 }}>
            {scenario.description}
          </p>

          <div className={s.grid2} style={{ marginTop: 14 }}>
            <StatusCard
              title="Da li je ovo funkcija?"
              stateLabel={currentAnalysis.isFunction ? "Da" : "Ne"}
              tone={currentAnalysis.isFunction ? "ok" : "bad"}
              note={
                currentAnalysis.isFunction
                  ? "Svaki element domena ima tacno jednu sliku."
                  : "Bar jedan element domena nema sliku ili ima vise razlicitih slika."
              }
            />
            <StatusCard
              title="Injekcija"
              stateLabel={
                currentAnalysis.isFunction && currentAnalysis.injective
                  ? "Da"
                  : "Ne"
              }
              tone={
                currentAnalysis.isFunction && currentAnalysis.injective
                  ? "ok"
                  : currentAnalysis.isFunction
                    ? "warn"
                    : "bad"
              }
              note={
                currentAnalysis.isFunction
                  ? currentAnalysis.injective
                    ? "Razliciti ulazi ne dele istu sliku."
                    : "Postoje bar dva razlicita ulaza sa istom slikom."
                  : "Najpre moras imati funkciju da bi proveravao injekciju."
              }
            />
            <StatusCard
              title="Surjekcija"
              stateLabel={
                currentAnalysis.isFunction && currentAnalysis.surjective
                  ? "Da"
                  : "Ne"
              }
              tone={
                currentAnalysis.isFunction && currentAnalysis.surjective
                  ? "ok"
                  : currentAnalysis.isFunction
                    ? "warn"
                    : "bad"
              }
              note={
                currentAnalysis.isFunction
                  ? currentAnalysis.surjective
                    ? "Svaki element kodomena ima bar jednu pretsliku."
                    : "Bar jedan element kodomena ostaje nepogodjen."
                  : "Najpre moras imati funkciju da bi proveravao surjekciju."
              }
            />
            <StatusCard
              title="Bijekcija i inverz"
              stateLabel={
                currentAnalysis.isFunction && currentAnalysis.bijective
                  ? "Da"
                  : "Ne"
              }
              tone={
                currentAnalysis.isFunction && currentAnalysis.bijective
                  ? "ok"
                  : currentAnalysis.isFunction
                    ? "warn"
                    : "bad"
              }
              note={
                currentAnalysis.isFunction
                  ? currentAnalysis.bijective
                    ? "Funkcija je bijektivna, pa inverz postoji kao funkcija."
                    : "Bar jedan od uslova za bijekciju nije ispunjen."
                  : "Bez funkcije nema ni govora o inverznoj funkciji."
              }
            />
          </div>
        </article>

        <article className={s.sectionCard}>
          <h3 className={cs.tCardTitle}>Analiza</h3>
          <p style={{ color: "var(--lesson-muted)" }}>
            Slika relacije/funkcije je skup{" "}
            {"{"}
            {currentAnalysis.image.join(", ")}
            {"}"}. Kodomen je{" "}
            {"{"}
            {scenario.codomain.join(", ")}
            {"}"}.
          </p>
          <p style={{ color: "var(--lesson-muted)", marginTop: 8 }}>
            {describeScenario(currentAnalysis)}
          </p>
          <div
            style={{
              marginTop: 18,
              padding: "18px 20px",
              borderRadius: 20,
              background:
                "linear-gradient(180deg, rgba(236, 91, 19, 0.12), rgba(236, 91, 19, 0.06))",
              border: "1px solid rgba(255, 154, 106, 0.16)",
            }}
          >
            <strong style={{ color: "var(--lesson-accent)" }}>
              Kako da citas sliku:
            </strong>
            <p style={{ color: "var(--lesson-muted)" }}>
              Prvo proveri da li svaki element domena ima tacno jednu izlaznu
              strelicu. Tek onda ima smisla pricati o injekciji, surjekciji i
              bijekciji.
            </p>
          </div>
        </article>
      </div>
    </>
  );
}
