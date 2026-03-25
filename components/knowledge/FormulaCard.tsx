"use client";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";
import MathBlock from "./MathBlock";

interface FormulaCardProps {
  title: string;
  formula: string;
  note?: React.ReactNode;
}

export default function FormulaCard({ title, formula, note }: FormulaCardProps) {
  return (
    <article className={s.formulaCard}>
      <h3 className={cs.tCardTitle}>{title}</h3>
      <MathBlock>{formula}</MathBlock>
      {note && <p>{note}</p>}
    </article>
  );
}
