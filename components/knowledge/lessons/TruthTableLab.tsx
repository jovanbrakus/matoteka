"use client";

import { useState, useCallback } from "react";
import InlineMath from "@/components/knowledge/InlineMath";
import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

type Operator = "not" | "and" | "or" | "implies" | "equiv";

interface Row {
  p: boolean;
  q: boolean;
}

const ROWS: Row[] = [
  { p: true, q: true },
  { p: true, q: false },
  { p: false, q: true },
  { p: false, q: false },
];

function computeResult(op: Operator, row: Row): boolean {
  switch (op) {
    case "not":
      return !row.p;
    case "and":
      return row.p && row.q;
    case "or":
      return row.p || row.q;
    case "implies":
      return !row.p || row.q;
    case "equiv":
      return row.p === row.q;
  }
}

function explain(op: Operator, row: Row): string {
  switch (op) {
    case "not":
      return row.p
        ? "U izabranom redu iskaz p je tačan, zato negacija \u00ACp mora biti netačna."
        : "U izabranom redu iskaz p je netačan, zato negacija \u00ACp postaje tačna.";
    case "and":
      if (row.p && row.q)
        return "Ovde su i p i q tačni, zato je p \u2227 q tačno.";
      if (!row.p && !row.q)
        return "Ovde su i p i q netačni, pa konjunkcija sigurno nije tačna.";
      return "Jedan deo je netačan, a konjunkcija traži da oba dela budu tačna. Zato je rezultat netačan.";
    case "or":
      if (!row.p && !row.q)
        return "Oba dela su netačna, a to je jedini slučaj kada je p \u2228 q netačno.";
      return "Bar jedan deo je tačan, zato je disjunkcija p \u2228 q tačna.";
    case "implies":
      if (row.p && !row.q)
        return "Ovo je jedini zabranjeni slučaj: p je tačno, a q netačno, pa je p \u21D2 q netačno.";
      if (!row.p)
        return 'Pošto je p netačno, nije se desio slučaj "tačno pa netačno". Zato implikacija ostaje tačna.';
      return "Ovde su p i q tačni, pa je uslov \"ako p, onda q\" ispunjen i implikacija je tačna.";
    case "equiv":
      if (row.p === row.q)
        return "Ovde p i q imaju istu istinitosnu vrednost, zato je p \u21D4 q tačno.";
      return "Ovde p i q nemaju istu istinitosnu vrednost, pa ekvivalencija mora biti netačna.";
  }
}

const OPERATOR_META: Record<
  Operator,
  { label: string; formula: string; rules: string[] }
> = {
  not: {
    label: "Negacija",
    formula: "\\neg p",
    rules: [
      "Negacija menja tačno u netačno i netačno u tačno.",
      "Kolona q se ovde ne koristi.",
      "Ako je p tačno, rezultat mora biti netačan.",
    ],
  },
  and: {
    label: "Konjunkcija",
    formula: "p \\land q",
    rules: [
      "Konjunkcija traži da oba dela budu tačna.",
      "Dovoljan je jedan netačan deo da formula padne.",
      'To je logičko "i".',
    ],
  },
  or: {
    label: "Disjunkcija",
    formula: "p \\lor q",
    rules: [
      "Disjunkcija je tačna kada je bar jedan deo tačan.",
      "Netačna je samo kada su oba dela netačna.",
      'Ovde "ili" znači uključivo ili.',
    ],
  },
  implies: {
    label: "Implikacija",
    formula: "p \\Rightarrow q",
    rules: [
      "Implikacija je netačna samo kada je p tačno, a q netačno.",
      "U svim drugim redovima ostaje tačna.",
      "Ovo nije isto što i ekvivalencija.",
    ],
  },
  equiv: {
    label: "Ekvivalencija",
    formula: "p \\Leftrightarrow q",
    rules: [
      "Ekvivalencija je tačna kada p i q imaju istu vrednost.",
      "Ako se vrednosti razlikuju, ekvivalencija je netačna.",
      "To je mnogo stroža veza od implikacije.",
    ],
  },
};

function BoolBadge({ value }: { value: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 42,
        padding: "4px 12px",
        borderRadius: 999,
        fontWeight: 700,
        fontSize: "0.88rem",
        background: value
          ? "rgba(103, 215, 173, 0.14)"
          : "rgba(255, 180, 136, 0.14)",
        border: `1px solid ${
          value ? "rgba(103, 215, 173, 0.34)" : "rgba(255, 180, 136, 0.34)"
        }`,
        color: value ? "#67d7ad" : "#ffb488",
      }}
    >
      {value ? "T" : "N"}
    </span>
  );
}

export default function TruthTableLab() {
  const [activeOp, setActiveOp] = useState<Operator>("not");
  const [activeRow, setActiveRow] = useState(0);

  const meta = OPERATOR_META[activeOp];

  const handleSelectOp = useCallback((op: Operator) => {
    setActiveOp(op);
    setActiveRow(0);
  }, []);

  return (
    <div>
      {/* Operator buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 18 }}>
        {(Object.keys(OPERATOR_META) as Operator[]).map((op) => (
          <button
            key={op}
            className={s.presetBtn}
            onClick={() => handleSelectOp(op)}
            style={
              activeOp === op
                ? {
                    background: "rgba(236, 91, 19, 0.18)",
                    borderColor: "rgba(255, 154, 106, 0.40)",
                  }
                : undefined
            }
          >
            <InlineMath>{OPERATOR_META[op].formula}</InlineMath>
          </button>
        ))}
      </div>

      {/* Truth table */}
      <div
        style={{
          background: "rgba(5, 3, 2, 0.66)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: 24,
          padding: 18,
          overflowX: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 18,
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: 800,
                color: "var(--lesson-text)",
                marginBottom: 4,
              }}
            >
              Laboratorija istinitosnih tabela
            </h3>
            <p style={{ fontSize: "0.88rem", color: "var(--lesson-muted)" }}>
              {meta.label} &middot; klikni red koji želiš da protumačiš
            </p>
          </div>
          <span className={s.miniLabel}>{meta.label}</span>
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>Red</th>
              <th style={thStyle}>p</th>
              {activeOp !== "not" && <th style={thStyle}>q</th>}
              <th style={thStyle}>Rezultat</th>
              <th style={{ ...thStyle, textAlign: "left" }}>Tumačenje</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => {
              const result = computeResult(activeOp, row);
              const selected = activeRow === i;
              return (
                <tr
                  key={i}
                  onClick={() => setActiveRow(i)}
                  style={{
                    cursor: "pointer",
                    background: selected
                      ? "rgba(236, 91, 19, 0.16)"
                      : "transparent",
                    borderTop: "1px solid rgba(236, 91, 19, 0.08)",
                    transition:
                      "background 0.15s ease",
                  }}
                >
                  <td style={tdStyle}>{i + 1}</td>
                  <td style={tdStyle}>
                    <BoolBadge value={row.p} />
                  </td>
                  {activeOp !== "not" && (
                    <td style={tdStyle}>
                      <BoolBadge value={row.q} />
                    </td>
                  )}
                  <td style={tdStyle}>
                    <BoolBadge value={result} />
                  </td>
                  <td
                    style={{
                      ...tdStyle,
                      textAlign: "left",
                      color: selected
                        ? "var(--lesson-text)"
                        : "var(--lesson-muted)",
                      fontSize: "0.88rem",
                    }}
                  >
                    {selected ? "Ovaj red je aktivan \u2193" : "Klikni za objašnjenje"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p
          style={{
            marginTop: 12,
            fontSize: "0.84rem",
            color: "var(--lesson-muted)",
            textAlign: "center",
          }}
        >
          T = tačno, N = netačno
        </p>
      </div>

      {/* Reading / explanation area */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 16,
          marginTop: 16,
        }}
      >
        <article className={s.resultCard} style={{ minHeight: "auto", padding: 18 }}>
          <strong>
            Aktivna formula:{" "}
            <InlineMath>{meta.formula}</InlineMath>
          </strong>
          <p
            style={{
              color: "var(--lesson-muted-strong)",
              marginTop: 8,
              fontSize: "0.95rem",
            }}
          >
            {explain(activeOp, ROWS[activeRow])}
          </p>
        </article>
        <article className={s.resultCard} style={{ minHeight: "auto", padding: 18 }}>
          <strong>Brza pravila za pamćenje</strong>
          <ul
            style={{
              marginTop: 10,
              paddingLeft: 18,
              display: "grid",
              gap: 6,
            }}
          >
            {meta.rules.map((rule, i) => (
              <li
                key={i}
                style={{ color: "var(--lesson-muted-strong)", fontSize: "0.92rem" }}
              >
                {rule}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: "12px 14px",
  fontWeight: 700,
  fontSize: "0.82rem",
  color: "#ffb488",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  background: "rgba(236, 91, 19, 0.10)",
  borderBottom: "1px solid rgba(236, 91, 19, 0.12)",
};

const tdStyle: React.CSSProperties = {
  padding: "14px 14px",
  fontWeight: 700,
  fontSize: "0.95rem",
  color: "var(--lesson-text)",
  verticalAlign: "middle",
};
