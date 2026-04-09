import fs from "fs";
import path from "path";

export interface LessonMeta {
  id: string;
  slug: string;
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

const EMPTY_INDEX: LessonsIndex = {
  generatedAt: "",
  totalLessons: 0,
  lessons: {},
  categories: [],
};

function getIndex(): LessonsIndex {
  if (!_index || process.env.NODE_ENV === "development") {
    const indexPath = path.join(process.cwd(), "database", "lessons-index.json");
    if (!fs.existsSync(indexPath)) {
      _index = EMPTY_INDEX;
      _allLessons = null;
      return _index;
    }
    _index = JSON.parse(fs.readFileSync(indexPath, "utf-8"));
    _allLessons = null;
  }
  return _index!;
}

export function getLessonMeta(id: string): LessonMeta | null {
  return getIndex().lessons[id] ?? null;
}

export function getLessonBySlug(slug: string): LessonMeta | null {
  return getAllLessons().find((l) => l.slug === slug) ?? null;
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

export function getLessonCategoryName(categoryId: string): string | null {
  const category = getIndex().categories.find((entry) => entry.id === categoryId);
  return category?.name ?? null;
}

export function getTotalLessons(): number {
  return getIndex().totalLessons;
}

export function getLessonsGeneratedAt(): string | null {
  return getIndex().generatedAt || null;
}

export function getAdjacentLessons(id: string): {
  prev: { id: string; title: string; slug: string } | null;
  next: { id: string; title: string; slug: string } | null;
} {
  const all = getAllLessons();
  const idx = all.findIndex((l) => l.id === id);
  return {
    prev: idx > 0 ? { id: all[idx - 1].id, title: all[idx - 1].title, slug: all[idx - 1].slug } : null,
    next: idx < all.length - 1 ? { id: all[idx + 1].id, title: all[idx + 1].title, slug: all[idx + 1].slug } : null,
  };
}

export function getLessonHeroPath(id: string): string | null {
  const heroPath = path.join(process.cwd(), "public", "images", "lessons", `lesson${id}_hero.png`);
  if (!fs.existsSync(heroPath)) return null;
  return heroPath;
}
