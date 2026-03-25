import fs from "fs";
import path from "path";

export interface LessonMeta {
  id: string;
  lessonNumber: number;
  title: string;
  description: string;
  category: string;
  topicTags: string[];
  heroImage: string;
  sourceFile: string;
  heroFile: string;
  readingTimeMin: number;
}

export interface LessonCategory {
  id: string;
  name: string;
  icon: string;
  lessonIds: string[];
}

interface LessonsIndex {
  generatedAt: string;
  totalLessons: number;
  lessons: Record<string, LessonMeta>;
  categories: LessonCategory[];
}

// Singleton index
let _index: LessonsIndex | null = null;
let _allLessons: LessonMeta[] | null = null;

function getIndex(): LessonsIndex {
  if (!_index || process.env.NODE_ENV === "development") {
    const indexPath = path.join(process.cwd(), "database", "lessons-index.json");
    _index = JSON.parse(fs.readFileSync(indexPath, "utf-8"));
    _allLessons = null;
  }
  return _index!;
}

export function getLessonMeta(id: string): LessonMeta | null {
  return getIndex().lessons[id] ?? null;
}

export function getAllLessons(): LessonMeta[] {
  if (!_allLessons) {
    _allLessons = Object.values(getIndex().lessons).sort(
      (a, b) => a.lessonNumber - b.lessonNumber
    );
  }
  return _allLessons;
}

export function getLessonsByCategory(categoryId: string): LessonMeta[] {
  const index = getIndex();
  const cat = index.categories.find((c) => c.id === categoryId);
  if (!cat) return [];
  return cat.lessonIds
    .map((id) => index.lessons[id])
    .filter(Boolean)
    .sort((a, b) => a.lessonNumber - b.lessonNumber);
}

export function getLessonCategories(): Array<{ id: string; name: string; icon: string; count: number }> {
  return getIndex().categories.map((c) => ({
    id: c.id,
    name: c.name,
    icon: c.icon,
    count: c.lessonIds.length,
  }));
}

export function getTotalLessons(): number {
  return getIndex().totalLessons;
}

export function getAdjacentLessons(id: string): {
  prev: { id: string; title: string } | null;
  next: { id: string; title: string } | null;
} {
  const all = getAllLessons();
  const idx = all.findIndex((l) => l.id === id);
  return {
    prev: idx > 0 ? { id: all[idx - 1].id, title: all[idx - 1].title } : null,
    next: idx < all.length - 1 ? { id: all[idx + 1].id, title: all[idx + 1].title } : null,
  };
}

export function getLessonHeroPath(id: string): string | null {
  const heroPath = path.join(process.cwd(), "knowledge", `lesson${id}_hero.png`);
  if (!fs.existsSync(heroPath)) return null;
  return heroPath;
}

