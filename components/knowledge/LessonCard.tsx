"use client";

import Link from "next/link";

interface LessonMeta {
  id: string;
  lessonNumber: number;
  title: string;
  description: string;
  category: string;
  heroImage: string;
  readingTimeMin: number;
}

const CATEGORY_LABELS: Record<string, string> = {
  algebra: "Algebra",
  jednacine: "Jednačine",
  trigonometrija: "Trigonometrija",
  geometrija: "Geometrija",
  analiza: "Analiza",
};

export default function LessonCard({ lesson }: { lesson: LessonMeta }) {
  const categoryLabel = CATEGORY_LABELS[lesson.category] || lesson.category;

  return (
    <Link href={`/znanje/${lesson.id}`} className="block">
      <div
        className="group flex flex-col md:flex-row items-center gap-6 p-6 rounded-xl border border-[var(--glass-border)] hover:border-[#FF6B00]/30 transition-all cursor-pointer glass-card"
      >
        {/* Hero image */}
        <div className="w-full md:w-64 h-36 rounded-lg overflow-hidden shrink-0 relative bg-black">
          {lesson.id ? (
            <img
              alt={lesson.title}
              className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
              src={`/api/lessons/${lesson.id}/hero`}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#FF6B00]/20 to-[#FE9D00]/10" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#FF6B00] text-xs">
              article
            </span>
            <span className="text-[10px] font-bold uppercase tracking-tighter text-white">
              Interaktivni Tekst
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="px-3 py-1 bg-[#FF6B00]/20 text-[#FF6B00] text-[10px] font-bold uppercase tracking-widest rounded-full border border-[#FF6B00]/30">
              {categoryLabel}
            </span>
            <span className="px-3 py-1 bg-[var(--tint-strong)] text-text-secondary text-[10px] font-bold uppercase tracking-widest rounded-full">
              Lekcija {lesson.lessonNumber}
            </span>
          </div>
          <h4 className="text-xl font-bold mb-2 text-heading group-hover:text-[#FF6B00] transition-colors">
            {lesson.title}
          </h4>
          <p className="text-text-secondary text-sm line-clamp-2 max-w-3xl">
            {lesson.description}
          </p>
        </div>

        {/* Right side */}
        <div className="flex flex-col items-end gap-4 shrink-0">
          <span className="text-sm text-text-secondary flex items-center gap-2">
            <span className="material-symbols-outlined text-base">
              schedule
            </span>
            {lesson.readingTimeMin} min
          </span>
          <span className="bg-[#FF6B00] text-black px-6 py-3 rounded-lg font-bold uppercase tracking-widest text-xs transition-all group-hover:bg-[#ff7524] shadow-lg shadow-[#FF6B00]/10"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Otvori
          </span>
        </div>
      </div>
    </Link>
  );
}
