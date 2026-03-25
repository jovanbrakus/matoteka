"use client";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

interface SectionCardProps {
  title?: string;
  children: React.ReactNode;
}

export default function SectionCard({ title, children }: SectionCardProps) {
  return (
    <article className={s.sectionCard}>
      {title && <h3 className={cs.tCardTitle}>{title}</h3>}
      {children}
    </article>
  );
}
