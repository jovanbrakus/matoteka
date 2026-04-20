"use client";

import { Suspense, useEffect } from "react";
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
  // MathJax typesetting is async. When the user navigates away mid-typeset,
  // the DOM ref becomes null and MathJax throws "Typesetting failed: null is
  // not an object (evaluating 't.contains')". Suppress it — if the user left
  // the page, the failed typeset is irrelevant.
  useEffect(() => {
    const handler = (e: PromiseRejectionEvent) => {
      if (e.reason?.message?.includes("Typesetting failed")) {
        e.preventDefault();
      }
    };
    window.addEventListener("unhandledrejection", handler);
    return () => window.removeEventListener("unhandledrejection", handler);
  }, []);
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
