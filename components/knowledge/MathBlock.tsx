"use client";

import { MathJax } from "better-react-mathjax";
import s from "@/styles/lesson-layout.module.css";

interface MathBlockProps {
  children: string;
  dynamic?: boolean;
}

export default function MathBlock({ children, dynamic }: MathBlockProps) {
  return (
    <div className={s.mathBlock}>
      <MathJax dynamic={dynamic}>{`\\[${children}\\]`}</MathJax>
    </div>
  );
}
