"use client";

import s from "@/styles/lesson-layout.module.css";
import cs from "@/styles/lesson-common.module.css";

interface InsightCardProps {
  title: string;
  children: React.ReactNode;
}

export default function InsightCard({ title, children }: InsightCardProps) {
  return (
    <div className={s.insightCard}>
      <h3 className={cs.tCardTitle}>{title}</h3>
      {children}
    </div>
  );
}
