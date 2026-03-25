"use client";

import { useEffect, useState } from "react";
import DisciplineFilter from "@/components/knowledge/DisciplineFilter";
import LessonCard from "@/components/knowledge/LessonCard";

interface CategoryInfo {
  id: string;
  name: string;
  icon: string;
  count: number;
}

interface LessonData {
  id: string;
  lessonNumber: number;
  title: string;
  description: string;
  category: string;
  heroImage: string;
  readingTimeMin: number;
}

export default function ZnanjePage() {
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [lessons, setLessons] = useState<LessonData[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = activeCategory
      ? `/api/lessons?category=${activeCategory}`
      : "/api/lessons";

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        setCategories(data.categories);
        setLessons(data.lessons);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [activeCategory]);

  return (
    <div className="pt-8 pb-20 px-6 lg:px-12 max-w-[1400px]">
      {/* Hero section */}
      <section className="mb-12 max-w-4xl">
        <h2 className="text-4xl font-black tracking-tight text-heading lg:text-5xl">
          Centar <span className="text-[#ec5b13]">Znanja</span>
        </h2>
        <p className="mt-2 max-w-lg font-medium text-text-secondary">
          Ovladajte gradivom kroz interaktivne module. Izaberite lekciju i počnite sa istraživanjem.
        </p>
      </section>

      {/* Discipline filters */}
      <section className="mb-16">
        <DisciplineFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
      </section>

      {/* Lessons list */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-3 text-heading">
            <span className="w-2 h-8 bg-[#FF6B00] rounded-full" />
            {activeCategory
              ? categories.find((c) => c.id === activeCategory)?.name ||
                "Lekcije"
              : "Sve Lekcije"}
          </h2>
          {!loading && (
            <span className="text-sm text-text-secondary">
              {lessons.length}{" "}
              {lessons.length === 1
                ? "lekcija"
                : lessons.length < 5
                  ? "lekcije"
                  : "lekcija"}
            </span>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#FF6B00] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : lessons.length === 0 ? (
          <p className="text-center text-text-secondary py-20">
            Nema dostupnih lekcija u ovoj kategoriji.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {lessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
