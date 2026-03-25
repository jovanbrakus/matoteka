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

/* ────────────────────────────────────────────
   Interactive 2x2 System Lab
   ──────────────────────────────────────────── */

interface SystemResult {
  delta: number;
  type: "unique" | "infinite" | "none";
  x?: number;
  y?: number;
  geometry: string;
  hint: string;
}

function classifySystem(
  a1: number,
  b1: number,
  c1: number,
  a2: number,
  b2: number,
  c2: number
): SystemResult {
  const EPS = 1e-9;
  const delta = a1 * b2 - a2 * b1;

  const kind = (a: number, b: number, c: number) => {
    if (Math.abs(a) < EPS && Math.abs(b) < EPS) {
      return Math.abs(c) < EPS ? "all" : "none";
    }
    return "line";
  };

  const k1 = kind(a1, b1, c1);
  const k2 = kind(a2, b2, c2);

  if (k1 === "none" || k2 === "none") {
    return {
      delta,
      type: "none",
      geometry: "Bar jedna jednacina je kontradiktorna.",
      hint: "Sistem nema resenje.",
    };
  }

  if (k1 === "all" || k2 === "all") {
    return {
      delta,
      type: "infinite",
      geometry: "Jedna jednacina ne ogranicava; beskonacno mnogo resenja.",
      hint: "Sistem je zavisan.",
    };
  }

  if (Math.abs(delta) > EPS) {
    const deltaX = c1 * b2 - c2 * b1;
    const deltaY = a1 * c2 - a2 * c1;
    const x = deltaX / delta;
    const y = deltaY / delta;
    return {
      delta,
      type: "unique",
      x,
      y,
      geometry: `Prave se seku u tacki (${fmt(x)}, ${fmt(y)}).`,
      hint: "Jedinstveno resenje (Kramer).",
    };
  }

  // delta = 0 — check proportionality of free terms
  const prop = (u1: number, u2: number, v1: number, v2: number) =>
    Math.abs(u1 * v2 - u2 * v1) < EPS;
  const sameLeft = prop(a1, b1, a2, b2);
  const sameRight = prop(a1, c1, a2, c2) && prop(b1, c1, b2, c2);

  if (sameLeft && sameRight) {
    return {
      delta,
      type: "infinite",
      geometry: "Prave se poklapaju; beskonacno mnogo resenja.",
      hint: "Sistem je zavisan.",
    };
  }

  return {
    delta,
    type: "none",
    geometry: "Prave su paralelne i razlicite; nema resenja.",
    hint: "Sistem je nemoguci.",
  };
}

function fmt(v: number): string {
  const r = Math.round(v * 100) / 100;
  if (Number.isInteger(r)) return String(r);
  return r.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
}

function SystemLab() {
  const [a1, setA1] = useState(1);
  const [b1, setB1] = useState(1);
  const [c1, setC1] = useState(2);
  const [a2, setA2] = useState(1);
  const [b2, setB2] = useState(-1);
  const [c2, setC2] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ratio = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.round(rect.width * ratio);
    canvas.height = Math.round(rect.height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    const W = rect.width;
    const H = rect.height;
    const PAD = 40;
    const xMin = -8,
      xMax = 8,
      yMin = -8,
      yMax = 8;

    const toX = (x: number) =>
      PAD + ((x - xMin) / (xMax - xMin)) * (W - 2 * PAD);
    const toY = (y: number) =>
      H - PAD - ((y - yMin) / (yMax - yMin)) * (H - 2 * PAD);

    // Background
    ctx.fillStyle = "rgba(11, 7, 5, 0.94)";
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    for (let x = xMin; x <= xMax; x++) {
      ctx.beginPath();
      ctx.moveTo(toX(x), PAD);
      ctx.lineTo(toX(x), H - PAD);
      ctx.stroke();
    }
    for (let y = yMin; y <= yMax; y++) {
      ctx.beginPath();
      ctx.moveTo(PAD, toY(y));
      ctx.lineTo(W - PAD, toY(y));
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = "rgba(255, 215, 185, 0.55)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(toX(xMin), toY(0));
    ctx.lineTo(toX(xMax), toY(0));
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(toX(0), toY(yMin));
    ctx.lineTo(toX(0), toY(yMax));
    ctx.stroke();
    ctx.fillStyle = "rgba(255, 215, 185, 0.8)";
    ctx.font = "12px Inter, sans-serif";
    ctx.fillText("x", W - PAD + 10, toY(0) + 4);
    ctx.fillText("y", toX(0) + 8, PAD - 8);

    // Draw a line ax + by = c
    const drawLine = (
      la: number,
      lb: number,
      lc: number,
      color: string
    ) => {
      const EPS = 1e-9;
      const pts: { x: number; y: number }[] = [];
      if (Math.abs(lb) > EPS) {
        const yL = (lc - la * xMin) / lb;
        const yR = (lc - la * xMax) / lb;
        if (yL >= yMin - 1 && yL <= yMax + 1) pts.push({ x: xMin, y: yL });
        if (yR >= yMin - 1 && yR <= yMax + 1) pts.push({ x: xMax, y: yR });
      }
      if (Math.abs(la) > EPS) {
        const xB = (lc - lb * yMin) / la;
        const xT = (lc - lb * yMax) / la;
        if (xB >= xMin - 1 && xB <= xMax + 1) pts.push({ x: xB, y: yMin });
        if (xT >= xMin - 1 && xT <= xMax + 1) pts.push({ x: xT, y: yMax });
      }
      // Deduplicate
      const uniq: { x: number; y: number }[] = [];
      for (const p of pts) {
        if (!uniq.some((q) => Math.abs(q.x - p.x) < 0.001 && Math.abs(q.y - p.y) < 0.001)) {
          uniq.push(p);
        }
      }
      if (uniq.length >= 2) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(toX(uniq[0].x), toY(uniq[0].y));
        ctx.lineTo(toX(uniq[1].x), toY(uniq[1].y));
        ctx.stroke();
      }
    };

    drawLine(a1, b1, c1, "rgba(236, 91, 19, 0.9)");
    drawLine(a2, b2, c2, "rgba(136, 216, 255, 0.9)");

    // Intersection point
    const result = classifySystem(a1, b1, c1, a2, b2, c2);
    if (result.type === "unique" && result.x !== undefined && result.y !== undefined) {
      ctx.beginPath();
      ctx.arc(toX(result.x), toY(result.y), 6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(107, 223, 183, 0.9)";
      ctx.fill();
      ctx.strokeStyle = "rgba(107, 223, 183, 0.4)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }, [a1, b1, c1, a2, b2, c2]);

  useEffect(() => {
    draw();
    const handleResize = () => draw();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [draw]);

  const result = classifySystem(a1, b1, c1, a2, b2, c2);

  const presets = [
    { label: "Jedno resenje", vals: [1, 1, 2, 1, -1, 0] },
    { label: "Beskonacno mnogo", vals: [1, 1, 2, 2, 2, 4] },
    { label: "Nema resenja", vals: [1, 1, 2, 2, 2, 5] },
    { label: "Mesoviti koef.", vals: [2, 1, 5, -1, 2, 1] },
  ];

  const setPreset = (vals: number[]) => {
    setA1(vals[0]);
    setB1(vals[1]);
    setC1(vals[2]);
    setA2(vals[3]);
    setB2(vals[4]);
    setC2(vals[5]);
  };

  const slider = (
    label: string,
    value: number,
    setter: (v: number) => void,
    hint: string
  ) => (
    <div style={{ display: "grid", gap: 4 }}>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontWeight: 600,
          color: "var(--muted-strong, #e8d5c4)",
        }}
      >
        <InlineMath>{label}</InlineMath>
        <span
          style={{
            display: "inline-flex",
            minWidth: 44,
            justifyContent: "center",
            padding: "4px 8px",
            borderRadius: 999,
            background: "rgba(236, 91, 19, 0.12)",
            color: "var(--primary-soft, #ec5b13)",
            border: "1px solid rgba(236, 91, 19, 0.18)",
            fontWeight: 700,
          }}
        >
          {value}
        </span>
      </label>
      <input
        type="range"
        min={-4}
        max={4}
        step={1}
        value={value}
        onChange={(e) => setter(Number(e.target.value))}
        style={{ width: "100%", accentColor: "var(--primary, #ec5b13)" }}
      />
      <span style={{ color: "var(--muted, #a68a72)", fontSize: "0.93rem" }}>
        {hint}
      </span>
    </div>
  );

  return (
    <>
      <div className={s.grid2}>
        {/* Controls panel */}
        <SectionCard title="Kontrole">
          <div style={{ display: "grid", gap: 14 }}>
            {slider("a_1", a1, setA1, "Prva jednacina: a_1 x + b_1 y = c_1")}
            {slider("b_1", b1, setB1, "")}
            {slider("c_1", c1, setC1, "Slobodan clan pomera pravu.")}
            {slider("a_2", a2, setA2, "Druga jednacina: a_2 x + b_2 y = c_2")}
            {slider("b_2", b2, setB2, "")}
            {slider("c_2", c2, setC2, "")}

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {presets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setPreset(p.vals)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.04)",
                    color: "var(--muted-strong, #e8d5c4)",
                    border: "1px solid rgba(255,154,106,0.16)",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div
              style={{
                padding: "14px 16px",
                borderRadius: 16,
                background: "rgba(9,4,3,0.54)",
                border: "1px solid rgba(255,154,106,0.12)",
              }}
            >
              <p style={{ color: "var(--muted, #a68a72)", fontSize: "0.93rem" }}>
                Pokusaj da pre pomeranja klizaca prvo napamet predvidis da li ce
                sistem imati jedno, nijedno ili beskonacno mnogo resenja. Zatim
                proveri grafik.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* Canvas */}
        <div
          style={{
            position: "relative",
            minHeight: 400,
            borderRadius: "var(--radius-lg, 24px)",
            overflow: "hidden",
            border: "1px solid rgba(255,154,106,0.18)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0)), rgba(11,7,5,0.94)",
          }}
        >
          <canvas
            ref={canvasRef}
            style={{ display: "block", width: "100%", height: "100%" }}
          />
        </div>
      </div>

      {/* Readout cards */}
      <div className={s.grid3} style={{ marginTop: 16 }}>
        <SectionCard title="Determinanta">
          <p>
            <InlineMath>{`\\Delta = ${result.delta}`}</InlineMath>
          </p>
        </SectionCard>
        <SectionCard title="Tip sistema">
          <p>
            {result.type === "unique" && "Jedinstveno resenje."}
            {result.type === "infinite" && "Beskonacno mnogo resenja."}
            {result.type === "none" && "Nema resenja."}
          </p>
        </SectionCard>
        <SectionCard title="Geometrija">
          <p>{result.geometry}</p>
        </SectionCard>
      </div>
      {result.type === "unique" &&
        result.x !== undefined &&
        result.y !== undefined && (
          <div style={{ marginTop: 12 }}>
            <SectionCard title="Kramerov ishod">
              <p>
                <InlineMath>{`x = ${fmt(result.x)},\\quad y = ${fmt(result.y)}`}</InlineMath>
              </p>
            </SectionCard>
          </div>
        )}
    </>
  );
}

/* ────────────────────────────────────────────
   NAV LINKS
   ──────────────────────────────────────────── */

const NAV_LINKS = [
  { href: "#zasto", label: "Zasto je vazno" },
  { href: "#osnovna-ideja", label: "Osnovna ideja" },
  { href: "#metode-2x2", label: "Metode za 2x2" },
  { href: "#kramer", label: "Kramerovo pravilo" },
  { href: "#gaus", label: "Gausov algoritam" },
  { href: "#parametar", label: "Parametar i broj resenja" },
  { href: "#interaktivno", label: "Interaktivni deo" },
  { href: "#primeri", label: "Vodjeni primeri" },
  { href: "#formule", label: "Kljucne formule" },
  { href: "#greske", label: "Ceste greske" },
  { href: "#prijemni", label: "Prijemni fokus" },
  { href: "#vezbe", label: "Vezbe" },
  { href: "#rezime", label: "Rezime" },
];

/* ────────────────────────────────────────────
   LESSON 17 PAGE
   ──────────────────────────────────────────── */

export default function Lesson17Page() {
  return (
    <LessonShell>
      {/* ═══════════ HERO ═══════════ */}
      <LessonHero
        eyebrow="Matoteka znanje · Lekcija 17"
        title={
          <>
            Sistemi linearnih jednacina{" "}
            <span className={cs.tHeroAccent}>
              Kramerovo pravilo i Gausov algoritam
            </span>
          </>
        }
        description="Kada vidis sistem jednacina, ne gledas dve ili tri zasebne formule, vec trazis zajednicko resenje. Upravo ta promena perspektive cini ovu lekciju vaznom. Za prijemni nije dovoljno da znas da racunas: moras da prepoznas koji metod je najbrzi, kada determinant pomaze, a kada moras da predjes na pazljivu diskusiju slucajeva."
        heroImageSrc="/api/lessons/17/hero"
        heroImageAlt="Ilustracija sistema linearnih jednacina, Kramerovog pravila i Gausovog algoritma"
        cards={[
          {
            label: "Sta ces nauciti",
            description:
              "Kako da resavas sisteme 2x2 i 3x3, kako da biras metod i kako da procenis broj resenja.",
          },
          {
            label: "Najveca zamka",
            description:
              "Zakljucak da iz Δ = 0 automatski sledi da sistem nema resenje. To nikako nije dovoljno.",
          },
          {
            label: "Prijemni fokus",
            description:
              "Parametarski sistemi, mali aritmeticki detalji u determinantama i pravilna upotreba Gausove eliminacije.",
          },
        ]}
        stats={[
          {
            label: "Trajanje",
            description:
              "Oko 75 minuta za teoriju, vodjene primere i interaktivni deo.",
          },
          {
            label: "Predznanje",
            description:
              "Linearne jednacine, determinante drugog i treceg reda i rad sa razlomcima.",
          },
          {
            label: "Glavna vestina",
            description:
              "Da za svaki sistem brzo odaberes odgovarajuci metod i sigurno proveris broj resenja.",
          },
          {
            label: "Interaktivni deo",
            description:
              "Canvas laboratorija za sistem 2x2 sa trenutnim prikazom pravih, determinante i tipa sistema.",
          },
        ]}
      />

      {/* ═══════════ NAV ═══════════ */}
      <LessonNav links={NAV_LINKS} />

      {/* ═══════════ ZASTO JE VAZNO ═══════════ */}
      <LessonSection
        id="zasto"
        eyebrow="Zasto je ova lekcija vazna"
        title="Sistem jednacina se pojavljuje svuda"
        description="Sistemi linearnih jednacina se pojavljuju kao prirodan nastavak linearne funkcije: vise uslova odjednom treba zadovoljiti istim nepoznatim velicinama."
      >
        <div className={s.grid3}>
          <SectionCard title="Na prijemnom proverava vise stvari odjednom">
            <p>
              Jedan zadatak moze istovremeno da proveri racunanje, logiku,
              geometrijsku interpretaciju, paznju na parametar i organizaciju
              resenja.
            </p>
          </SectionCard>
          <SectionCard title="Uci te da biras metod, ne samo da racunas">
            <p>
              Nije poenta da svaki sistem resavas istom tehnikom. Nekad je zamena
              najkraca, nekad suprotni koeficijenti, nekad determinant, a nekad
              Gausov algoritam.
            </p>
          </SectionCard>
          <SectionCard title="Priprema za slozenije oblasti">
            <p>
              Matrice, vektori, analiticka geometrija i linearna algebra kasnije
              se oslanjaju upravo na ideje koje ovde prvi put sreces:
              kompatibilnost uslova, rang, eliminaciju i tumacenje broja resenja.
            </p>
          </SectionCard>
        </div>
        <MicroCheck
          question="Mikro-provera: Sta je glavna mentalna promena u odnosu na jednu jednacinu?"
          answer={
            <p>
              Kod sistema ne trazis broj koji zadovoljava jednu relaciju, vec
              uredjeni par ili trojku koja istovremeno zadovoljava sve relacije. To
              znaci da svaka transformacija mora da sacuva bas taj zajednicki skup
              resenja.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ OSNOVNA IDEJA ═══════════ */}
      <LessonSection
        id="osnovna-ideja"
        eyebrow="Osnovna ideja"
        title="Sta zapravo predstavlja sistem"
        description="Sistem linearnih jednacina je skup linearnih jednacina koje imaju iste nepoznate. Resenje sistema je svaka vrednost nepoznatih koja sve jednacine cini tacnim u isto vreme."
      >
        <div className={s.grid3}>
          <SectionCard title="Opsti oblik sistema 2x2">
            <MathBlock>
              {
                "\\begin{cases} a_1x+b_1y=c_1 \\\\ a_2x+b_2y=c_2 \\end{cases}"
              }
            </MathBlock>
            <p>
              Ovde su <InlineMath>{"x"}</InlineMath> i{" "}
              <InlineMath>{"y"}</InlineMath> nepoznate, a koeficijenti{" "}
              <InlineMath>{"a_1,b_1,c_1,a_2,b_2,c_2"}</InlineMath> zadati
              brojevi.
            </p>
          </SectionCard>

          <SectionCard title="Geometrijska slika">
            <p>
              Svaka linearna jednacina sa dve nepoznate predstavlja pravu u ravni.
              Zato sistem <InlineMath>{"2\\times2"}</InlineMath> znaci: trazimo
              tacku koja pripada i prvoj i drugoj pravoj.
            </p>
            <p style={{ marginTop: 8 }}>
              Jedno resenje &harr; prave se seku u jednoj tacki
              <br />
              Nema resenja &harr; prave su paralelne i razlicite
              <br />
              Beskonacno mnogo resenja &harr; prave se poklapaju
            </p>
          </SectionCard>

          <SectionCard title="Sistem 3x3">
            <MathBlock>
              {
                "\\begin{cases} a_1x+b_1y+c_1z=d_1 \\\\ a_2x+b_2y+c_2z=d_2 \\\\ a_3x+b_3y+c_3z=d_3 \\end{cases}"
              }
            </MathBlock>
            <p>
              Geometrijska slika je sada slozenija jer svaka jednacina predstavlja
              ravan u prostoru. Zato se u praksi cesce oslanjamo na algoritam i
              racun nego na cisto vizuelnu interpretaciju.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Najvaznija poruka">
          <p>
            Sistem nije zbir odvojenih jednacina. Uvek razmisljaj o{" "}
            <strong>zajednickom resenju</strong>, odnosno o preseku svih uslova.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: Da li sistem moze imati tacno dva resenja?"
          answer={
            <p>
              Za linearni sistem <InlineMath>{"2\\times2"}</InlineMath> ne moze.
              Dve prave mogu da seku u jednoj tacki, da se ne seku ili da se
              poklapaju. Dakle: jedno, nijedno ili beskonacno mnogo resenja.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ METODE ZA 2x2 ═══════════ */}
      <LessonSection
        id="metode-2x2"
        eyebrow="Metode za sisteme 2x2"
        title="Zamena i suprotni koeficijenti"
        description="U srednjoskolskim zadacima za sistem sa dve nepoznate najcesce koristis metodu zamene ili metodu suprotnih koeficijenata. Obe su tacne; razlika je u tome koja je zgodnija za konkretne brojeve."
      >
        <div className={s.grid2}>
          <SectionCard title="Metoda zamene">
            <p>
              Iz jedne jednacine izdvojis jednu nepoznatu, a zatim taj izraz
              uvrstis u drugu jednacinu. Ova metoda je odlicna kada se jedna
              nepoznata lako izoluje, na primer kada joj je koeficijent{" "}
              <InlineMath>{"1"}</InlineMath> ili <InlineMath>{"-1"}</InlineMath>.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Izaberi jednacinu iz koje se nepoznata najlakse izdvaja." />
              <WalkStep
                number={2}
                title={
                  <>
                    Izrazi, na primer, <InlineMath>{"x"}</InlineMath> preko{" "}
                    <InlineMath>{"y"}</InlineMath>.
                  </>
                }
              />
              <WalkStep number={3} title="Taj izraz zameni u drugoj jednacini." />
              <WalkStep number={4} title="Resi dobijenu jednacinu sa jednom nepoznatom." />
              <WalkStep number={5} title="Vracanjem izracunaj drugu nepoznatu." />
            </div>
          </SectionCard>

          <SectionCard title="Metoda suprotnih koeficijenata">
            <p>
              Jednacine mnozis pogodnim brojevima tako da koeficijenti uz jednu
              nepoznatu postanu suprotni, pa se sabiranjem ta nepoznata eliminise.
              Ovo je cesto najbrzi put kada su koeficijenti celi brojevi.
            </p>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Odaberi koju nepoznatu eliminises." />
              <WalkStep number={2} title="Pomnozi jednacine tako da koeficijenti uz tu nepoznatu budu suprotni." />
              <WalkStep number={3} title="Saberi jednacine i dobijas novu jednacinu sa jednom nepoznatom." />
              <WalkStep number={4} title="Izracunaj prvu nepoznatu." />
              <WalkStep number={5} title="Uvrsti nazad i nadji drugu." />
            </div>
          </SectionCard>
        </div>

        <div className={s.formulaGrid} style={{ marginTop: 16 }}>
          <FormulaCard
            title="Kada biras zamenu"
            formula={"x = \\ldots \\text{ ili koeficijent } \\pm 1"}
            note="Ako u jednacini vec imas oblik gde je jedna nepoznata lako izdvojiva, ne komplikuj: zamena je tada prirodna."
          />
          <FormulaCard
            title="Kada biras eliminaciju"
            formula={"\\text{NZS koeficijenata je pregledan}"}
            note="Ako su koeficijenti mali i lepo se uskladjuju, eliminacija je cesto brza od uvrstanja razlomaka."
          />
          <FormulaCard
            title="Ne zaboravi proveru"
            formula={"(x_0, y_0) \\text{ mora zadovoljiti obe jednacine}"}
            note="Posebno kod prijemnog, brza provera na kraju otkriva gresku u znaku pre nego sto predas zadatak."
          />
        </div>

        <InsightCard title="Brz ispitni izbor">
          <p>
            Ako vidis da ce zamena odmah stvoriti razlomke, probaj eliminaciju.
            Ako eliminacija trazi velika mnozenja, proveri da li je zamena
            elegantnija.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: Za koji sistem je zamena prirodnija od eliminacije?"
          answer={
            <>
              <p>Za sistem</p>
              <MathBlock>
                {"\\begin{cases} x=2y+1\\\\ 3x-y=11 \\end{cases}"}
              </MathBlock>
              <p>
                zamena je prirodna jer je <InlineMath>{"x"}</InlineMath> vec
                izdvojen. Nema smisla dodatno preuredivati jednacine.
              </p>
            </>
          }
        />
      </LessonSection>

      {/* ═══════════ KRAMEROVO PRAVILO ═══════════ */}
      <LessonSection
        id="kramer"
        eyebrow="Kramerovo pravilo"
        title="Determinante u sluzbi sistema"
        description="Kramerovo pravilo koristi determinante da direktno izrazi nepoznate. To je elegantna metoda, ali vazi samo kada je determinant koeficijenata razlicit od nule."
      >
        <div className={s.grid3}>
          <SectionCard title="Ideja za sistem 2x2">
            <MathBlock>
              {
                "\\begin{cases} a_1x+b_1y=c_1\\\\ a_2x+b_2y=c_2 \\end{cases}"
              }
            </MathBlock>
            <MathBlock>
              {
                "\\Delta = \\begin{vmatrix} a_1 & b_1\\\\ a_2 & b_2 \\end{vmatrix} = a_1b_2 - a_2b_1"
              }
            </MathBlock>
            <p>
              Ako je <InlineMath>{"\\Delta \\neq 0"}</InlineMath>, postoji
              jedinstveno resenje:
            </p>
            <MathBlock>
              {"x=\\frac{\\Delta_x}{\\Delta},\\qquad y=\\frac{\\Delta_y}{\\Delta}"}
            </MathBlock>
          </SectionCard>

          <SectionCard title="Ideja za sistem 3x3">
            <p>
              Za tri nepoznate zamenjujes odgovarajucu kolonu koeficijenata
              kolonom slobodnih clanova:
            </p>
            <MathBlock>
              {
                "\\Delta = \\begin{vmatrix} a_1 & b_1 & c_1\\\\ a_2 & b_2 & c_2\\\\ a_3 & b_3 & c_3 \\end{vmatrix}"
              }
            </MathBlock>
            <MathBlock>
              {
                "x=\\frac{\\Delta_x}{\\Delta},\\quad y=\\frac{\\Delta_y}{\\Delta},\\quad z=\\frac{\\Delta_z}{\\Delta}"
              }
            </MathBlock>
            <p>
              Opet je uslov isti: <InlineMath>{"\\Delta \\neq 0"}</InlineMath>.
            </p>
          </SectionCard>

          <SectionCard title="Kada je metoda dobra, a kada nije">
            <p>
              Kramer je zgodan kada su brojevi mali, determinant se lako racuna i
              kada zelis jasan kriterijum za jedinstveno resenje. Ako su brojevi
              veliki ili sistem ima parametar koji komplikuje manje determinante,
              Gausov algoritam cesto bude pregledniji.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Kako racunas determinantu 3. reda">
            <p>
              U skolskim zadacima najcesce koristis Sarrusovo pravilo:
            </p>
            <MathBlock>
              {
                "\\begin{vmatrix} a & b & c\\\\ d & e & f\\\\ g & h & i \\end{vmatrix} = aei+bfg+cdh-ceg-bdi-afh"
              }
            </MathBlock>
            <p>
              Vazno je da tri &ldquo;pozitivna&rdquo; i tri &ldquo;negativna&rdquo;
              proizvoda racunas pazljivo. Najvise gresaka nastaje upravo u poslednjem
              znaku.
            </p>
          </SectionCard>

          <SectionCard title="Pedagoski trik za pamcenje">
            <p>
              Nemoj pokusavati da mehanicki pamtis sest clanova. Nacrtaj dve
              dodatne kolone i prati tri dijagonale nanize i tri dijagonale navise.
              Vizuelni obrazac je mnogo pouzdaniji od suvog pamcenja.
            </p>
            <InsightCard title="Ali oprez">
              <p>
                Sarrusovo pravilo vazi samo za determinantu treceg reda, ne i za
                vece determinante.
              </p>
            </InsightCard>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: Da li smes primeniti Kramerovo pravilo kada je Δ=0?"
          answer={
            <p>
              Ne za racunanje jedinstvenog resenja. Kada je{" "}
              <InlineMath>{"\\Delta=0"}</InlineMath>, Kramerovo pravilo u
              standardnom obliku ne odlucuje da li sistem nema resenje ili ih ima
              beskonacno mnogo. Tada radis dodatnu diskusiju.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ GAUSOV ALGORITAM ═══════════ */}
      <LessonSection
        id="gaus"
        eyebrow="Gausov algoritam"
        title="Najuniverzalniji alat za resavanje sistema"
        description="Gausov algoritam je najuniverzalniji alat za resavanje sistema. Ideja je da nizom dozvoljenih transformacija postepeno pojednostavis sistem dok ne dobijes trougaoni ili gotovo dijagonalni oblik."
      >
        <div className={s.grid3}>
          <SectionCard title="Prosirena matrica">
            <p>Sistem zapisujes u obliku prosirene matrice:</p>
            <MathBlock>
              {
                "\\left[\\begin{array}{ccc|c} a_1 & b_1 & c_1 & d_1\\\\ a_2 & b_2 & c_2 & d_2\\\\ a_3 & b_3 & c_3 & d_3 \\end{array}\\right]"
              }
            </MathBlock>
            <p>
              Tako jasnije vidis koje operacije primenjujes istovremeno na
              koeficijente i slobodne clanove.
            </p>
          </SectionCard>

          <SectionCard title="Dozvoljene operacije">
            <ul>
              <li>Zamena mesta dva reda.</li>
              <li>Mnozenje reda nenultim brojem.</li>
              <li>Dodavanje jednom redu nekog visekratnika drugog reda.</li>
            </ul>
            <p>
              Ove operacije ne menjaju skup resenja sistema. To je razlog zasto
              smes da ih koristis.
            </p>
          </SectionCard>

          <SectionCard title="Sta je cilj eliminacije">
            <p>
              Prvo ponistvas clanove ispod vodeceg koeficijenta u prvoj koloni,
              zatim u drugoj, pa po potrebi i dalje. Kada dobijes trougaoni
              sistem, poslednja jednacina obicno sadrzi jednu nepoznatu, pa mozes
              da krenes unazad.
            </p>
          </SectionCard>
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Zasto je Gaus posebno vazan">
            <p>
              Za razliku od Kramera, Gaus radi i kada sistem nema jedinstveno
              resenje. Upravo zato je odlican za zadatke sa parametrom, za proveru
              kompatibilnosti i za sisteme sa vise jednacina ili vise nepoznatih.
            </p>
            <MathBlock>{"0x + 0y + 0z = 5"}</MathBlock>
            <p>
              Ako tokom eliminacije dobijes ovakvu jednacinu, sistem je nemoguc.
              Ako dobijes <InlineMath>{"0x+0y+0z=0"}</InlineMath>, jedan red je
              suvisan i sistem moze imati beskonacno mnogo resenja.
            </p>
          </SectionCard>

          <SectionCard title="Pedagoski savet za racun">
            <p>
              Ne juri odmah lepe brojeve. Ponekad je korisnije prvo zameniti
              redove da bi vodeci koeficijent bio{" "}
              <InlineMath>{"1"}</InlineMath> ili <InlineMath>{"-1"}</InlineMath>,
              jer time kasnije smanjujes opasnost od velikih razlomaka.
            </p>
            <InsightCard title="Prakticno pravilo">
              <p>
                Kada biras pivot, gledaj da bude broj sa kojim ce eliminacija
                biti najcistija.
              </p>
            </InsightCard>
          </SectionCard>
        </div>

        <MicroCheck
          question="Mikro-provera: Zasto u Gausu moras da transformises i slobodne clanove?"
          answer={
            <p>
              Zato sto menjas celu jednacinu, ne samo njen levi deo. Ako bi
              transformisao samo koeficijente uz nepoznate, dobio bi sasvim
              drugi sistem i izgubio ekvivalentnost.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ PARAMETAR I BROJ RESENJA ═══════════ */}
      <LessonSection
        id="parametar"
        eyebrow="Parametar i broj resenja"
        title="Diskusija slucajeva"
        description="Parametarski zadaci su veoma cesti jer proveravaju da li razumes mehanizam sistema, a ne samo jedan konkretan racun. Najvaznije je da sistematski razdvojis slucaj Δ ≠ 0 od slucaja Δ = 0."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Ako je Δ ≠ 0"
            formula={"\\Delta \\neq 0 \\Longrightarrow \\text{jedinstveno resenje}"}
            note="Tu je prica zavrsena: sistem ima jedinstveno resenje. Dalje mozes racunati Kramerom ili nekom drugom metodom."
          />
          <FormulaCard
            title="Ako je Δ = 0"
            formula={"\\Delta = 0 \\Longrightarrow \\text{dodatna provera}"}
            note="Ne donosis jos zakljucak. Tada proveriavas da li su jednacine medjusobno saglasne ili protivreCne."
          />
          <FormulaCard
            title="Iste prave ili paralelne prave"
            formula={"\\frac{a_1}{a_2}=\\frac{b_1}{b_2}=\\frac{c_1}{c_2}\\ ?"}
            note="Kada su koeficijenti proporcionalni, odlucujes prema slobodnim clanovima: ako su i oni proporcionalni, prave se poklapaju; ako nisu, prave su paralelne."
          />
        </div>

        {/* Classification table */}
        <div style={{ marginTop: 18, overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: 680,
              background: "rgba(13,7,5,0.72)",
              border: "1px solid rgba(255,154,106,0.14)",
              borderRadius: 18,
              overflow: "hidden",
            }}
          >
            <thead>
              <tr>
                {["Situacija", "Algebarski signal", "Geometrijsko znacenje", "Broj resenja"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "14px 16px",
                      textAlign: "left",
                      color: "var(--accent, #ff9a6a)",
                      fontSize: "0.84rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      borderBottom: "1px solid rgba(255,154,106,0.08)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Jedinstveno resenje",
                  <InlineMath key="d1">{"\\Delta \\neq 0"}</InlineMath>,
                  "Dve prave seku se u jednoj tacki",
                  "1",
                ],
                [
                  "Beskonacno mnogo resenja",
                  <span key="d2">
                    <InlineMath>{"\\Delta=0"}</InlineMath> i sve proporcije
                    odgovaraju
                  </span>,
                  "Prave se poklapaju",
                  <InlineMath key="inf">{"\\infty"}</InlineMath>,
                ],
                [
                  "Nema resenja",
                  <span key="d3">
                    <InlineMath>{"\\Delta=0"}</InlineMath>, ali slobodni clanovi
                    kvare proporciju
                  </span>,
                  "Prave su paralelne i razlicite",
                  "0",
                ],
              ].map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      style={{
                        padding: "14px 16px",
                        textAlign: "left",
                        borderBottom:
                          i < 2
                            ? "1px solid rgba(255,154,106,0.08)"
                            : "none",
                        color: "var(--muted-strong, #e8d5c4)",
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <InsightCard title="Najcesca prijemna zamka">
          <p>
            Kandidat izracuna <InlineMath>{"\\Delta=0"}</InlineMath> i odmah
            napise &ldquo;nema resenja&rdquo;. To je pogresno. Prvo proveri da li
            je sistem mozda zavisan, odnosno da li ima beskonacno mnogo resenja.
          </p>
        </InsightCard>

        <MicroCheck
          question="Mikro-provera: Sta se dogadja sa sistemom x+y=2, 2x+2y=4?"
          answer={
            <p>
              Druga jednacina je samo dvostruka prve. To znaci da obe opisuju
              istu pravu, pa sistem ima beskonacno mnogo resenja.
            </p>
          }
        />
      </LessonSection>

      {/* ═══════════ INTERAKTIVNI DEO ═══════════ */}
      <LessonSection
        id="interaktivno"
        eyebrow="Interaktivni deo"
        title="Interaktivna laboratorija: sistem 2x2 uzivo"
        description="Menjaj koeficijente sistema i posmatraj kako se u isto vreme menja geometrijska slika, determinant i broj resenja. Ovo je najbrzi nacin da osetis vezu izmedju racuna i grafika."
      >
        <SystemLab />

        <MicroCheck
          question="Kako da koristis laboratoriju pametno?"
          answer={
            <div>
              <p>Za svaku novu postavku uradi kratki mentalni redosled:</p>
              <ul style={{ marginLeft: 18 }}>
                <li>
                  izracunaj ili proceni{" "}
                  <InlineMath>{"\\Delta=a_1b_2-a_2b_1"}</InlineMath>,
                </li>
                <li>predvidi broj resenja,</li>
                <li>
                  zamisli geometriju: seku li se prave, poklapaju ili su
                  paralelne,
                </li>
                <li>tek onda proveri na canvas prikazu.</li>
              </ul>
            </div>
          }
        />
      </LessonSection>

      {/* ═══════════ VODJENI PRIMERI ═══════════ */}
      <LessonSection
        id="primeri"
        eyebrow="Vodjeni primeri"
        title="Primeri koji grade rutinu za prijemni"
        description="Ovde vidis kako teorija prelazi u konkretan racun. Pokusaj da svaki primer prvo sam zapocnes, makar prvih nekoliko koraka, pa tek onda pogledaj kompletno vodjenje."
      >
        <div className={s.exampleGrid}>
          {/* Primer 1 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>Primer 1: metoda zamene</h3>
            <p>Resi sistem</p>
            <MathBlock>
              {"\\begin{cases} x=2y+1\\\\ 3x-y=14 \\end{cases}"}
            </MathBlock>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Posto je <InlineMath>{"x"}</InlineMath> vec izdvojen, odmah
                    ga menjamo u drugoj jednacini.
                  </>
                }
              />
              <WalkStep number={2} title="Dobijamo 3(2y+1)-y=14.">
                <MathBlock>{"6y+3-y=14,\\quad 5y=11"}</MathBlock>
              </WalkStep>
              <WalkStep
                number={3}
                title={
                  <>
                    Odatle je <InlineMath>{"y=\\frac{11}{5}"}</InlineMath>.
                  </>
                }
              />
              <WalkStep
                number={4}
                title={
                  <>
                    Vracamo u <InlineMath>{"x=2y+1"}</InlineMath>:
                  </>
                }
              >
                <MathBlock>
                  {"x=2\\cdot\\frac{11}{5}+1=\\frac{27}{5}"}
                </MathBlock>
              </WalkStep>
            </div>
            <MathBlock>
              {"(x,y)=\\left(\\frac{27}{5},\\frac{11}{5}\\right)"}
            </MathBlock>
          </article>

          {/* Primer 2 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 2: metoda suprotnih koeficijenata
            </h3>
            <p>Resi sistem</p>
            <MathBlock>
              {"\\begin{cases} 2x+3y=7\\\\ 4x-3y=5 \\end{cases}"}
            </MathBlock>
            <div className={s.walkthrough}>
              <WalkStep
                number={1}
                title={
                  <>
                    Koeficijenti uz <InlineMath>{"y"}</InlineMath> su vec
                    suprotni: <InlineMath>{"3"}</InlineMath> i{" "}
                    <InlineMath>{"-3"}</InlineMath>.
                  </>
                }
              />
              <WalkStep number={2} title="Sabiranjem jednacina dobijamo 6x=12.">
                <p>
                  Pa je <InlineMath>{"x=2"}</InlineMath>.
                </p>
              </WalkStep>
              <WalkStep number={3} title="Uvrstimo u prvu jednacinu.">
                <MathBlock>
                  {"2\\cdot 2+3y=7,\\quad 3y=3,\\quad y=1"}
                </MathBlock>
              </WalkStep>
            </div>
            <MathBlock>{"(x,y)=(2,1)"}</MathBlock>
          </article>

          {/* Primer 3 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 3: sistem 3x3 Kramerovim pravilom
            </h3>
            <p>Resi sistem</p>
            <MathBlock>
              {
                "\\begin{cases} x+y+z=6\\\\ x-y+z=2\\\\ 2x+y-z=1 \\end{cases}"
              }
            </MathBlock>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Racunamo glavni determinant.">
                <MathBlock>
                  {
                    "\\Delta = \\begin{vmatrix} 1&1&1\\\\ 1&-1&1\\\\ 2&1&-1 \\end{vmatrix} = 6 \\neq 0"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Posto je Δ ≠ 0, postoji jedinstveno resenje." />
              <WalkStep number={3} title="Racunamo pomoćne determinante.">
                <MathBlock>
                  {
                    "\\Delta_x=6,\\qquad \\Delta_y=12,\\qquad \\Delta_z=18"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={4} title="Delimo sa Δ.">
                <MathBlock>
                  {
                    "x=\\frac{6}{6}=1,\\qquad y=\\frac{12}{6}=2,\\qquad z=\\frac{18}{6}=3"
                  }
                </MathBlock>
              </WalkStep>
            </div>
          </article>

          {/* Primer 4 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 4: sistem 3x3 Gausovim algoritmom
            </h3>
            <p>Resi sistem</p>
            <MathBlock>
              {
                "\\begin{cases} x+y+z=4\\\\ 2x-y+z=1\\\\ 3x+y-z=2 \\end{cases}"
              }
            </MathBlock>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Zapisujemo prosirenu matricu.">
                <MathBlock>
                  {
                    "\\left[\\begin{array}{ccc|c} 1&1&1&4\\\\ 2&-1&1&1\\\\ 3&1&-1&2 \\end{array}\\right]"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={2} title="Poništavamo prvu kolonu ispod pivota.">
                <MathBlock>
                  {"R_2 \\leftarrow R_2-2R_1,\\qquad R_3 \\leftarrow R_3-3R_1"}
                </MathBlock>
                <MathBlock>
                  {
                    "\\left[\\begin{array}{ccc|c} 1&1&1&4\\\\ 0&-3&-1&-7\\\\ 0&-2&-4&-10 \\end{array}\\right]"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={3} title="Eliminisemo drugu kolonu.">
                <MathBlock>{"R_3 \\leftarrow 3R_3-2R_2"}</MathBlock>
                <MathBlock>
                  {
                    "\\left[\\begin{array}{ccc|c} 1&1&1&4\\\\ 0&-3&-1&-7\\\\ 0&0&-10&-16 \\end{array}\\right]"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep number={4} title="Odredjujemo nepoznate unazad.">
                <MathBlock>
                  {
                    "z=\\frac{8}{5},\\qquad y=\\frac{9}{5},\\qquad x=\\frac{3}{5}"
                  }
                </MathBlock>
              </WalkStep>
            </div>
            <MathBlock>
              {
                "(x,y,z)=\\left(\\frac{3}{5},\\frac{9}{5},\\frac{8}{5}\\right)"
              }
            </MathBlock>
          </article>

          {/* Primer 5 */}
          <article className={s.exampleCard}>
            <h3 className={cs.tCardTitle}>
              Primer 5: diskusija sistema sa parametrom
            </h3>
            <p>
              Odredi broj resenja sistema u zavisnosti od parametra{" "}
              <InlineMath>{"m"}</InlineMath>:
            </p>
            <MathBlock>
              {"\\begin{cases} x+y=2\\\\ mx+2y=3 \\end{cases}"}
            </MathBlock>
            <div className={s.walkthrough}>
              <WalkStep number={1} title="Racunamo determinantu.">
                <MathBlock>
                  {
                    "\\Delta = \\begin{vmatrix} 1 & 1\\\\ m & 2 \\end{vmatrix} = 2-m"
                  }
                </MathBlock>
              </WalkStep>
              <WalkStep
                number={2}
                title={
                  <>
                    Ako je <InlineMath>{"m \\neq 2"}</InlineMath>, determinant
                    nije nula i sistem ima jedinstveno resenje.
                  </>
                }
              />
              <WalkStep
                number={3}
                title={
                  <>
                    Ako je <InlineMath>{"m=2"}</InlineMath>, sistem postaje:
                  </>
                }
              >
                <MathBlock>
                  {
                    "\\begin{cases} x+y=2\\\\ 2x+2y=3 \\end{cases}"
                  }
                </MathBlock>
                <p>
                  Druga jednacina nije dvostruka prve, pa su prave paralelne i
                  razlicite.
                </p>
              </WalkStep>
            </div>
            <InsightCard title="Zakljucak">
              <p>
                Za <InlineMath>{"m \\neq 2"}</InlineMath> sistem ima jedno
                resenje, a za <InlineMath>{"m=2"}</InlineMath> nema resenja.
              </p>
            </InsightCard>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ KLJUCNE FORMULE ═══════════ */}
      <LessonSection
        id="formule"
        eyebrow="Kljucne formule"
        title="Ovo mora da iskoci cim vidis zadatak"
        description="Ovu sekciju posmatraj kao brzi pregled pred kontrolni ili prijemni: sta treba da zapamtis, ali i kada to treba da upotrebis."
      >
        <div className={s.formulaGrid}>
          <FormulaCard
            title="Glavni determinant (2x2)"
            formula={"\\Delta = a_1b_2 - a_2b_1"}
            note={
              <>
                Ako je <InlineMath>{"\\Delta \\neq 0"}</InlineMath>, sistem ima
                jedinstveno resenje.
              </>
            }
          />
          <FormulaCard
            title="Kramer (2x2)"
            formula={"x=\\frac{\\Delta_x}{\\Delta},\\qquad y=\\frac{\\Delta_y}{\\Delta}"}
            note="Dobre su kada su koeficijenti mali i kada zelis brz kriterijum."
          />
          <FormulaCard
            title="Sarrus (determinanta 3. reda)"
            formula="aei+bfg+cdh-ceg-bdi-afh"
            note={
              <>
                Koristi ga za <InlineMath>{"\\Delta"}</InlineMath>,{" "}
                <InlineMath>{"\\Delta_x"}</InlineMath>,{" "}
                <InlineMath>{"\\Delta_y"}</InlineMath> i{" "}
                <InlineMath>{"\\Delta_z"}</InlineMath>, ali pazljivo prati
                znakove.
              </>
            }
          />
          <FormulaCard
            title="Elementarne transformacije (Gaus)"
            formula={"R_i \\leftrightarrow R_j,\\qquad R_i \\leftarrow \\lambda R_i,\\qquad R_i \\leftarrow R_i + \\lambda R_j"}
            note="Ovo je univerzalni metod, narocito koristan kada treba da otkrijes i nemoguc ili zavisan sistem."
          />
        </div>

        <div className={s.grid2} style={{ marginTop: 16 }}>
          <SectionCard title="Kako da biras metod na prijemnom">
            <ul>
              <li>
                Ako je jedna nepoznata lako izdvojiva, kreni metodom zamene.
              </li>
              <li>
                Ako su koeficijenti mali i lako se ponistaju, uzmi suprotne
                koeficijente.
              </li>
              <li>
                Ako je zadatak napravljen oko determinanti, prirodno je probati
                Kramera.
              </li>
              <li>
                Ako sistem ima tri nepoznate ili parametar pravi vise slucajeva,
                Gaus je cesto najsigurniji.
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Sta nikako da ne preskocis">
            <ul>
              <li>
                Proveru da li je <InlineMath>{"\\Delta=0"}</InlineMath>.
              </li>
              <li>Kontrolu znakova u determinantama.</li>
              <li>Transformaciju i slobodnih clanova u Gausu.</li>
              <li>
                Razdvajanje slucajeva kada parametar ponisti neki koeficijent ili
                determinant.
              </li>
            </ul>
          </SectionCard>
        </div>
      </LessonSection>

      {/* ═══════════ CESTE GRESKE ═══════════ */}
      <LessonSection
        id="greske"
        eyebrow="Ceste greske"
        title="Ovde se gube laki poeni"
        description="U ovoj lekciji greske retko dolaze iz neznanja formule. Cesce dolaze iz brzine, loseg izbora metode ili preuranjenog zakljucivanja."
      >
        <div className={s.tipGrid}>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              <InlineMath>{"\\Delta=0"}</InlineMath> znaci &ldquo;nema
              resenja&rdquo;
            </h3>
            <p>
              Ne. To samo znaci da nemas jedinstveno resenje preko Kramera. Tek
              dodatna provera govori da li je sistem nemoguc ili zavisan.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>Los znak u determinanti</h3>
            <p>
              Jedan pogresan minus menja celo resenje. Posebno kod Sarrusa
              prati tri negativna proizvoda do kraja.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              U Gausu se menja samo leva strana
            </h3>
            <p>
              Slobodni clanovi moraju da prolaze kroz iste transformacije kao i
              koeficijenti. U suprotnom resavas drugi sistem.
            </p>
          </article>
          <article className={s.tipCard}>
            <h3 className={cs.tCardTitle}>
              Deljenje izrazom sa parametrom bez provere
            </h3>
            <p>
              Ako delis izrazom koji moze biti nula, moras izdvojiti poseban
              slucaj. U suprotnom gubis moguca resenja ili uvodis nedozvoljen
              korak.
            </p>
          </article>
        </div>
      </LessonSection>

      {/* ═══════════ PRIJEMNI FOKUS ═══════════ */}
      <LessonSection
        id="prijemni"
        eyebrow="Veza sa prijemnim zadacima"
        title="Sta se najcesce trazi na testu"
        description="Na prijemnim ispitima sistemi linearnih jednacina se javljaju u cistom obliku, ali i kao sakriveni deo veceg problema: u zadacima sa parametrima, analitickom geometrijom, presekom grafika ili rekonstrukcijom koeficijenata."
      >
        <div className={s.grid3}>
          <SectionCard title="Sta se cesto trazi">
            <p>
              Resavanje sistema <InlineMath>{"2\\times2"}</InlineMath>,
              razmatranje sistema sa parametrom, izbor metode ili utvrdivanje
              broja resenja.
            </p>
          </SectionCard>
          <SectionCard title="Gde nastaju zamke">
            <p>
              U pogresnom mnozenju pri eliminaciji, u brzom racunanju
              determinanti i u preskakanju specijalnog slucaja{" "}
              <InlineMath>{"\\Delta=0"}</InlineMath>.
            </p>
          </SectionCard>
          <SectionCard title="Sta proveriavas pod pritiskom vremena">
            <p>
              Da li postoji laksa metoda, da li si transformisao i desnu stranu,
              i da li zakljucak o broju resenja zaista prati iz racuna.
            </p>
          </SectionCard>
        </div>

        <InsightCard title="Brz ispitni redosled">
          <p>
            Procitaj sistem, proceni najkraci metod, proveri da li postoji
            parametar ili determinant, uradi racun smireno i na kraju proveri da
            li dobijeno resenje zadovoljava originalni sistem.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ VEZBE ═══════════ */}
      <LessonSection
        id="vezbe"
        eyebrow="Vezbe za samostalni rad"
        title="Samostalna provera razumevanja"
        description="Prvo pokusaj bez pomoci. Ako zapnes, otvori resenje i uporedi svoj tok razmisljanja sa ponudjenim koracima."
      >
        <div className={s.exerciseGrid}>
          <ExerciseCard
            title="Zadatak 1"
            problem={
              <>
                <p>Resi sistem metodom zamene:</p>
                <MathBlock>
                  {"\\begin{cases} y=3x-2\\\\ 2x+y=8 \\end{cases}"}
                </MathBlock>
              </>
            }
            solution={
              <>
                <p>
                  Uvrsti <InlineMath>{"y=3x-2"}</InlineMath> u drugu jednacinu:
                </p>
                <MathBlock>
                  {"2x+(3x-2)=8 \\Rightarrow 5x=10 \\Rightarrow x=2"}
                </MathBlock>
                <p>Zatim je</p>
                <MathBlock>{"y=3\\cdot 2-2=4"}</MathBlock>
                <p>
                  Resenje je <InlineMath>{"(2,4)"}</InlineMath>.
                </p>
              </>
            }
          />

          <ExerciseCard
            title="Zadatak 2"
            problem={
              <>
                <p>Resi sistem metodom suprotnih koeficijenata:</p>
                <MathBlock>
                  {"\\begin{cases} 3x+2y=11\\\\ 5x-2y=9 \\end{cases}"}
                </MathBlock>
              </>
            }
            solution={
              <>
                <p>
                  Sabiranjem jednacina eliminise se{" "}
                  <InlineMath>{"y"}</InlineMath>:
                </p>
                <MathBlock>
                  {"8x=20 \\Rightarrow x=\\frac{5}{2}"}
                </MathBlock>
                <p>Uvrstimo u prvu jednacinu:</p>
                <MathBlock>
                  {
                    "3\\cdot\\frac{5}{2}+2y=11 \\Rightarrow 2y=\\frac{7}{2} \\Rightarrow y=\\frac{7}{4}"
                  }
                </MathBlock>
                <p>
                  Resenje je{" "}
                  <InlineMath>
                    {"\\left(\\frac{5}{2},\\frac{7}{4}\\right)"}
                  </InlineMath>
                  .
                </p>
              </>
            }
          />

          <ExerciseCard
            title="Zadatak 3"
            problem={
              <>
                <p>Resi sistem Gausovim algoritmom:</p>
                <MathBlock>
                  {
                    "\\begin{cases} x+y+z=5\\\\ 2x-y+z=2\\\\ x+2y-z=1 \\end{cases}"
                  }
                </MathBlock>
              </>
            }
            solution={
              <>
                <p>
                  Oduzmi dva puta prvi red od drugog i prvi red od treceg:
                </p>
                <MathBlock>
                  {
                    "\\left[\\begin{array}{ccc|c} 1&1&1&5\\\\ 0&-3&-1&-8\\\\ 0&1&-2&-4 \\end{array}\\right]"
                  }
                </MathBlock>
                <p>
                  Zatim ponisti clan u drugoj koloni treceg reda, na primer
                  operacijom <InlineMath>{"R_3 \\leftarrow 3R_3+R_2"}</InlineMath>
                  :
                </p>
                <MathBlock>
                  {
                    "\\left[\\begin{array}{ccc|c} 1&1&1&5\\\\ 0&-3&-1&-8\\\\ 0&0&-7&-20 \\end{array}\\right]"
                  }
                </MathBlock>
                <p>
                  Odavde je <InlineMath>{"z=\\frac{20}{7}"}</InlineMath>, zatim{" "}
                  <InlineMath>{"y=\\frac{12}{7}"}</InlineMath>, pa{" "}
                  <InlineMath>{"x=\\frac{3}{7}"}</InlineMath>.
                </p>
              </>
            }
          />

          <ExerciseCard
            title="Zadatak 4"
            problem={
              <>
                <p>
                  Odredi broj resenja sistema u zavisnosti od parametra{" "}
                  <InlineMath>{"p"}</InlineMath>:
                </p>
                <MathBlock>
                  {"\\begin{cases} x-y=1\\\\ 2x-2y=p \\end{cases}"}
                </MathBlock>
              </>
            }
            solution={
              <>
                <p>
                  Druga leva strana je dvostruka prve, pa proveravamo i desnu
                  stranu.
                </p>
                <ul style={{ marginLeft: 18 }}>
                  <li>
                    Ako je <InlineMath>{"p=2"}</InlineMath>, druga jednacina je
                    tacno dvostruka prve i sistem ima beskonacno mnogo resenja.
                  </li>
                  <li>
                    Ako je <InlineMath>{"p \\neq 2"}</InlineMath>, leve strane
                    su proporcionalne, a desne nisu, pa sistem nema resenje.
                  </li>
                </ul>
              </>
            }
          />

          <ExerciseCard
            title="Zadatak 5"
            problem={
              <>
                <p>Resi sistem Kramerovim pravilom:</p>
                <MathBlock>
                  {
                    "\\begin{cases} x+y+z=3\\\\ x-y+z=1\\\\ 2x+y-z=2 \\end{cases}"
                  }
                </MathBlock>
              </>
            }
            solution={
              <>
                <p>Glavni determinant je</p>
                <MathBlock>
                  {
                    "\\Delta = \\begin{vmatrix} 1&1&1\\\\ 1&-1&1\\\\ 2&1&-1 \\end{vmatrix} = 6"
                  }
                </MathBlock>
                <p>
                  Dalje dobijes{" "}
                  <InlineMath>{"\\Delta_x=6"}</InlineMath>,{" "}
                  <InlineMath>{"\\Delta_y=6"}</InlineMath> i{" "}
                  <InlineMath>{"\\Delta_z=6"}</InlineMath>.
                </p>
                <MathBlock>{"x=1,\\qquad y=1,\\qquad z=1"}</MathBlock>
              </>
            }
          />
        </div>
      </LessonSection>

      {/* ═══════════ ZAVRSNI UVID ═══════════ */}
      <LessonSection
        eyebrow="Zavrsni uvid"
        title="Glavna poruka ove teme"
        description="U sustini, cela lekcija moze da se sazme ovako: sistem linearnih jednacina je pitanje kompatibilnosti vise uslova."
      >
        <InsightCard title="Najvazniji princip">
          <p>
            Kada to razumes, vise ne biras metod naslepo. Zamena, eliminacija,
            Kramer i Gaus postaju samo razliciti alati za isti cilj: da otkrijes
            da li zajednicko resenje postoji i kako se najbrze nalazi.
          </p>
        </InsightCard>
      </LessonSection>

      {/* ═══════════ REZIME ═══════════ */}
      <LessonSection
        id="rezime"
        eyebrow="Zavrsni rezime"
        title="Sta moras da poneses iz ove lekcije"
        description="Ovo je lista ideja koje zaista treba da ostanu u glavi nakon lekcije."
      >
        <div className={s.summaryGrid}>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>1. Osnovna slika</h3>
            <p>
              Sistem trazi zajednicko resenje. Kod{" "}
              <InlineMath>{"2\\times2"}</InlineMath> to je presek dve prave.
              Zato sistem moze imati <strong>jedno</strong>,{" "}
              <strong>nijedno</strong> ili{" "}
              <strong>beskonacno mnogo</strong> resenja.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>2. Metode</h3>
            <p>
              Biraj prema strukturi zadatka. Zamena i eliminacija su prirodne za{" "}
              <InlineMath>{"2\\times2"}</InlineMath>. Kramer je dobar kada je
              racun sa determinantama pregledan. Gaus je univerzalniji i posebno
              koristan za <InlineMath>{"3\\times3"}</InlineMath> i parametarske
              sisteme.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>3. Kljucna opomena</h3>
            <p>
              <InlineMath>{"\\Delta=0"}</InlineMath> nije kraj price. Tada
              dodatno proveriavas da li sistem postaje nemoguc ili zavisan. Ovo
              je jedna od najvaznijih prijemnih zamki.
            </p>
          </article>
          <article className={s.summaryCard}>
            <h3 className={cs.tCardTitle}>4. Sledeci korak</h3>
            <p>
              Najvise koristi imaces ako sada samostalno resavas zadatke sa
              parametrom i vezbas prepoznavanje najkraceg metoda.
            </p>
          </article>
        </div>

        <p className={cs.footerNote}>
          Lekcija 17 zatvara temu o sistemima linearnih jednacina: od osnovne
          geometrijske slike do Kramera, Gausa i diskusije sa parametrom.
        </p>
      </LessonSection>
    </LessonShell>
  );
}
