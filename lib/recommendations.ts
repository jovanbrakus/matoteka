import { getLessonsByCategory, type LessonMeta } from "./lessons";

export interface Recommendation {
  type: "practice" | "simulation" | "lesson";
  title: string;
  subtitle: string;
  href: string;
  icon: string;
  badge: string;
}

interface GroupInput {
  id: string;
  name: string;
  readinessScore: number;
}

const GROUP_TO_LESSON_CATEGORIES: Record<string, string[]> = {
  algebra: ["algebra", "jednacine"],
  trigonometry: ["trigonometrija"],
  geometry: ["geometrija"],
  analysis: ["analiza"],
  combinatorics_and_probability: [],
};

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

function getLessonsForGroup(groupId: string): LessonMeta[] {
  const lessonCats = GROUP_TO_LESSON_CATEGORIES[groupId] ?? [];
  const lessons: LessonMeta[] = [];
  for (const cat of lessonCats) {
    lessons.push(...getLessonsByCategory(cat));
  }
  return lessons;
}

function makePracticeRec(group: GroupInput): Recommendation {
  const score = group.readinessScore;
  const subtitle =
    score >= 80
      ? `Spremnost ${score}/100. Odrzavaj formu u ovoj oblasti.`
      : `Tvoja spremnost je ${score}/100. Fokusiraj se na ovu oblast.`;

  return {
    type: "practice",
    title: `Uvežbaj: ${group.name}`,
    subtitle,
    href: `/vezba?group=${group.id}`,
    icon: "fitness_center",
    badge: "01",
  };
}

function makeSimulationRec(readinessScore: number, examCount: number): Recommendation {
  let testSize: "full" | "medium" | "quick";
  let mode: "timed" | "untimed";

  if (readinessScore < 20) {
    testSize = "quick";
    mode = "untimed";
  } else if (readinessScore < 40) {
    testSize = "quick";
    mode = "timed";
  } else if (readinessScore < 60) {
    testSize = "medium";
    mode = "timed";
  } else if (readinessScore < 80) {
    testSize = "full";
    mode = "untimed";
  } else {
    testSize = "full";
    mode = "timed";
  }

  // New users who haven't tried a simulation: nudge toward smaller test
  if (examCount === 0 && testSize === "full") {
    testSize = "medium";
    mode = "timed";
  }

  const sizeLabels: Record<string, string> = {
    quick: "brzi test (8 zadataka)",
    medium: "srednji test (14 zadataka)",
    full: "kompletan test (20 zadataka)",
  };
  const modeLabels: Record<string, string> = {
    timed: "sa tajmerom",
    untimed: "bez tajmera",
  };

  let subtitle: string;
  if (examCount === 0) {
    subtitle = `Još nisi probao/la simulaciju. Počni sa: ${sizeLabels[testSize]}, ${modeLabels[mode]}.`;
  } else if (readinessScore >= 80) {
    subtitle = `Spremnost ${readinessScore}/100. Simuliraj prave uslove: ${sizeLabels[testSize]}, ${modeLabels[mode]}.`;
  } else {
    subtitle = `Pokušaj ${sizeLabels[testSize]}, ${modeLabels[mode]}. Spremnost: ${readinessScore}/100.`;
  }

  return {
    type: "simulation",
    title: "Probaj simulaciju",
    subtitle,
    href: "/simulacija",
    icon: "assignment",
    badge: "02",
  };
}

function makeLessonRec(
  sortedGroups: GroupInput[],
  practiceGroupId: string,
): Recommendation {
  const day = getDayOfYear();

  // Try to pick a different group than practice, with available lessons
  for (const group of sortedGroups) {
    if (group.id === practiceGroupId) continue;
    const lessons = getLessonsForGroup(group.id);
    if (lessons.length > 0) {
      const lesson = lessons[day % lessons.length];
      return {
        type: "lesson",
        title: `Prouči: ${lesson.title}`,
        subtitle: `Lekcija iz oblasti ${group.name.toLowerCase()}. Vreme čitanja: ~${lesson.readingTimeMin} min.`,
        href: `/znanje/${lesson.slug}`,
        icon: "menu_book",
        badge: "03",
      };
    }
  }

  // Fallback: use practice group's lessons if available
  const fallbackLessons = getLessonsForGroup(practiceGroupId);
  if (fallbackLessons.length > 0) {
    const lesson = fallbackLessons[day % fallbackLessons.length];
    const group = sortedGroups.find((g) => g.id === practiceGroupId)!;
    return {
      type: "lesson",
      title: `Prouči: ${lesson.title}`,
      subtitle: `Lekcija iz oblasti ${group.name.toLowerCase()}. Vreme čitanja: ~${lesson.readingTimeMin} min.`,
      href: `/znanje/${lesson.slug}`,
      icon: "menu_book",
      badge: "03",
    };
  }

  // Ultimate fallback: first available lesson from any group
  for (const group of sortedGroups) {
    const lessons = getLessonsForGroup(group.id);
    if (lessons.length > 0) {
      const lesson = lessons[day % lessons.length];
      return {
        type: "lesson",
        title: `Prouči: ${lesson.title}`,
        subtitle: `Lekcija iz oblasti ${group.name.toLowerCase()}. Vreme čitanja: ~${lesson.readingTimeMin} min.`,
        href: `/znanje/${lesson.slug}`,
        icon: "menu_book",
        badge: "03",
      };
    }
  }

  // No lessons at all (shouldn't happen with 59 lessons)
  return {
    type: "lesson",
    title: "Prouči lekciju",
    subtitle: "Pogledaj centar znanja za dostupne lekcije.",
    href: "/znanje",
    icon: "menu_book",
    badge: "03",
  };
}

export function generateRecommendations(params: {
  categoryGroups: GroupInput[];
  readinessScore: number;
  examCount: number;
}): Recommendation[] {
  const { categoryGroups, readinessScore, examCount } = params;

  // Sort by readiness score ascending (weakest first)
  const sorted = [...categoryGroups].sort(
    (a, b) => a.readinessScore - b.readinessScore,
  );

  // Default to algebra if no groups
  const practiceGroup = sorted[0] ?? { id: "algebra", name: "Algebra", readinessScore: 0 };

  return [
    makePracticeRec(practiceGroup),
    makeSimulationRec(readinessScore, examCount),
    makeLessonRec(sorted, practiceGroup.id),
  ];
}
