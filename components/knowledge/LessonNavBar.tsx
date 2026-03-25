"use client";

import Link from "next/link";
import s from "@/styles/lesson-layout.module.css";

interface AdjacentLesson {
  id: string;
  title: string;
}

interface LessonNavBarProps {
  lessonNumber: number;
  lessonTitle: string;
  prevLesson?: AdjacentLesson | null;
  nextLesson?: AdjacentLesson | null;
}

export function LessonBreadcrumb({ lessonNumber, lessonTitle }: LessonNavBarProps) {
  return (
    <nav className={s.lessonBreadcrumb}>
      <Link href="/znanje" className={s.breadcrumbBack}>
        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
          arrow_back
        </span>
        Centar Znanja
      </Link>
      <span className={s.breadcrumbSep}>/</span>
      <span className={s.breadcrumbCurrent}>
        Lekcija {lessonNumber}: {lessonTitle}
      </span>
    </nav>
  );
}

export function LessonFooterNav({ prevLesson, nextLesson }: LessonNavBarProps) {
  return (
    <nav className={s.lessonFooterNav}>
      {prevLesson ? (
        <Link href={`/znanje/${prevLesson.id}`} className={s.footerNavCard}>
          <span className={s.footerNavDirection}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
              arrow_back
            </span>
            Prethodna lekcija
          </span>
          <span className={s.footerNavTitle}>{prevLesson.title}</span>
        </Link>
      ) : (
        <div />
      )}

      <Link href="/znanje" className={s.footerNavCenter}>
        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
          auto_stories
        </span>
        Centar Znanja
      </Link>

      {nextLesson ? (
        <Link href={`/znanje/${nextLesson.id}`} className={`${s.footerNavCard} ${s.footerNavCardRight}`}>
          <span className={s.footerNavDirection}>
            Sledeća lekcija
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
              arrow_forward
            </span>
          </span>
          <span className={s.footerNavTitle}>{nextLesson.title}</span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
