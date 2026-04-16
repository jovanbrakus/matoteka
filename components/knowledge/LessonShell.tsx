"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MathJaxContext } from "better-react-mathjax";
import { MATHJAX_CONFIG, MATHJAX_SRC } from "@/lib/mathjax-config";
import { useLessonNav } from "./LessonNavContext";
import { LessonFooterNav } from "./LessonNavBar";
import s from "@/styles/lesson-common.module.css";

interface LessonShellProps {
  children: React.ReactNode;
}

function LessonShellInner({ children }: LessonShellProps) {
  const nav = useLessonNav();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const hubHref = category ? `/znanje?category=${category}` : "/znanje";

  return (
    <MathJaxContext config={MATHJAX_CONFIG} src={MATHJAX_SRC}>
      <div className={s.lessonRoot}>
        <div className={`${s.ambientOrb} ${s.ambientOrbOne}`} />
        <div className={`${s.ambientOrb} ${s.ambientOrbTwo}`} />
        <div className={`${s.ambientOrb} ${s.ambientOrbThree}`} />
        <main className={s.page}>
          <Link href={hubHref} className={s.backToHub}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
              arrow_back
            </span>
            Centar znanja
          </Link>
          {children}
          {nav && (
            <LessonFooterNav
              lessonNumber={nav.lessonNumber}
              lessonTitle={nav.lessonTitle}
              prevLesson={nav.prevLesson}
              nextLesson={nav.nextLesson}
              hubHref={hubHref}
              categoryParam={category}
            />
          )}
        </main>
      </div>
    </MathJaxContext>
  );
}

export default function LessonShell({ children }: LessonShellProps) {
  return (
    <Suspense>
      <LessonShellInner>{children}</LessonShellInner>
    </Suspense>
  );
}
