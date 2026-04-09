import type { MetadataRoute } from "next";
import { getAllLessons, getLessonsGeneratedAt } from "@/lib/lessons";
import { absoluteUrl } from "@/lib/seo";

const STATIC_ROUTES = [
  { path: "/", changeFrequency: "daily", priority: 1 },
  { path: "/znanje", changeFrequency: "weekly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/primer", changeFrequency: "monthly", priority: 0.5 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = process.env.VERCEL_GIT_COMMIT_SHA
    ? new Date()
    : new Date("2026-04-09");
  const lessonsLastModified = getLessonsGeneratedAt()
    ? new Date(getLessonsGeneratedAt()!)
    : buildDate;

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: buildDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const lessonEntries: MetadataRoute.Sitemap = getAllLessons().map((lesson) => ({
    url: absoluteUrl(`/znanje/${lesson.slug}`),
    lastModified: lessonsLastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticEntries, ...lessonEntries];
}
