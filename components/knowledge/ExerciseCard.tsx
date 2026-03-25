"use client";

import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

interface ExerciseCardProps {
  title: string;
  problem: React.ReactNode;
  solution: React.ReactNode;
}

export default function ExerciseCard({
  title,
  problem,
  solution,
}: ExerciseCardProps) {
  return (
    <article className={s.exerciseCard}>
      <h3 className={cs.tCardTitle}>{title}</h3>
      {problem}
      <details className={s.exerciseSolution}>
        <summary className={s.detailsSummary}>Rešenje</summary>
        <div className={s.detailsBody}>{solution}</div>
      </details>
    </article>
  );
}
