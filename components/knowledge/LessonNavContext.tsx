"use client";

import { createContext, useContext } from "react";

interface AdjacentLesson {
  id: string;
  slug: string;
  title: string;
}

interface LessonNavData {
  lessonNumber: number;
  lessonTitle: string;
  prevLesson: AdjacentLesson | null;
  nextLesson: AdjacentLesson | null;
}

const NavContext = createContext<LessonNavData | null>(null);

export function useLessonNav(): LessonNavData | null {
  return useContext(NavContext);
}

export function LessonNavContext({
  lessonNumber,
  lessonTitle,
  prevLesson,
  nextLesson,
  children,
}: LessonNavData & { children: React.ReactNode }) {
  return (
    <NavContext.Provider value={{ lessonNumber, lessonTitle, prevLesson, nextLesson }}>
      {children}
    </NavContext.Provider>
  );
}
