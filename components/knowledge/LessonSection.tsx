"use client";

import cs from "@/styles/lesson-common.module.css";
import s from "@/styles/lesson-layout.module.css";

interface LessonSectionProps {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function LessonSection({
  id,
  eyebrow,
  title,
  description,
  children,
}: LessonSectionProps) {
  return (
    <section className={s.section} id={id}>
      <div className={s.sectionHeading}>
        <div>
          <div className={cs.eyebrow}>{eyebrow}</div>
          <h2 className={cs.tSection}>{title}</h2>
        </div>
        {description && <p>{description}</p>}
      </div>
      {children}
    </section>
  );
}
