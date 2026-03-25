"use client";

import s from "@/styles/lesson-layout.module.css";

interface WalkStepProps {
  number: number;
  title: React.ReactNode;
  children?: React.ReactNode;
}

export default function WalkStep({ number, title, children }: WalkStepProps) {
  return (
    <div className={s.walkStep}>
      <div className={s.stepNumber}>{number}</div>
      <div>
        <strong>{title}</strong>
        {children}
      </div>
    </div>
  );
}
