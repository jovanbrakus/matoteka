import {
  getAdjacentLessons,
  getAllLessons,
  getLessonBySlug,
  getLessonCategoryName,
  getLessonsGeneratedAt,
} from "@/lib/lessons";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LessonNavContext } from "@/components/knowledge/LessonNavContext";
import { absoluteUrl, createMetadata, serializeJsonLd, SITE_NAME, SITE_URL } from "@/lib/seo";

interface Props {
  params: Promise<{ lessonSlug: string }>;
}

const VALID_IDS = new Set(Array.from({ length: 59 }, (_, i) => String(i + 1)));

async function getLessonComponent(id: string): Promise<React.ComponentType | null> {
  if (!VALID_IDS.has(id)) return null;
  const mod = await import(`@/components/knowledge/lessons/Lesson${id}Page`);
  return mod.default;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllLessons().map((lesson) => ({
    lessonSlug: lesson.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lessonSlug } = await params;
  const meta = getLessonBySlug(lessonSlug);
  if (!meta) return {};
  return createMetadata({
    title: `${meta.title} — Matoteka Znanje`,
    description: meta.description,
    path: `/znanje/${meta.slug}`,
    keywords: meta.topicTags,
    openGraphType: "article",
    images: [
      {
        url: `/images/og/lesson${meta.lessonNumber}.jpg`,
        width: 1200,
        height: 630,
        alt: meta.title,
      },
    ],
  });
}

export default async function LessonPage({ params }: Props) {
  const { lessonSlug } = await params;
  const meta = getLessonBySlug(lessonSlug);
  if (!meta) notFound();

  const LessonComponent = await getLessonComponent(meta.id);
  if (!LessonComponent) {
    notFound();
  }

  const { prev, next } = getAdjacentLessons(meta.id);
  const lessonUrl = absoluteUrl(`/znanje/${meta.slug}`);
  const lessonHubUrl = absoluteUrl("/znanje");
  const homeUrl = absoluteUrl("/");
  const heroImageUrl = absoluteUrl(`/images/lessons/lesson${meta.id}_hero.png`);
  const logoUrl = absoluteUrl("/logo-256.png");
  const categoryName = getLessonCategoryName(meta.category) ?? meta.category;
  const lessonsGeneratedAt = getLessonsGeneratedAt();

  const organization = {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: logoUrl,
      width: 256,
      height: 256,
    },
  };

  const lessonStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${lessonUrl}#webpage`,
        url: lessonUrl,
        name: meta.title,
        description: meta.description,
        inLanguage: "sr-RS",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}#website`,
          name: SITE_NAME,
          url: SITE_URL,
        },
        breadcrumb: {
          "@id": `${lessonUrl}#breadcrumb`,
        },
        primaryImageOfPage: {
          "@id": `${lessonUrl}#primaryimage`,
        },
        mainEntity: {
          "@id": `${lessonUrl}#lesson`,
        },
      },
      {
        "@type": "ImageObject",
        "@id": `${lessonUrl}#primaryimage`,
        url: heroImageUrl,
        contentUrl: heroImageUrl,
        caption: meta.title,
      },
      {
        "@type": "LearningResource",
        "@id": `${lessonUrl}#lesson`,
        url: lessonUrl,
        name: meta.title,
        headline: meta.title,
        description: meta.description,
        inLanguage: "sr-RS",
        isAccessibleForFree: true,
        educationalUse: "self-study",
        learningResourceType: "Interactive mathematics lesson",
        audience: {
          "@type": "EducationalAudience",
          educationalRole: "student",
        },
        educationalLevel: "High school",
        teaches: meta.topicTags,
        keywords: meta.topicTags.join(", "),
        timeRequired: `PT${meta.readingTimeMin}M`,
        image: {
          "@id": `${lessonUrl}#primaryimage`,
        },
        about: meta.topicTags.map((tag) => ({
          "@type": "Thing",
          name: tag,
        })),
        mainEntityOfPage: {
          "@id": `${lessonUrl}#webpage`,
        },
        author: organization,
        publisher: organization,
        provider: organization,
        isPartOf: {
          "@type": "CollectionPage",
          name: "Centar Znanja",
          url: lessonHubUrl,
        },
        articleSection: categoryName,
        position: meta.lessonNumber,
        datePublished: lessonsGeneratedAt ?? undefined,
        dateModified: lessonsGeneratedAt ?? undefined,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${lessonUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Matoteka",
            item: homeUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Znanje",
            item: lessonHubUrl,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: meta.title,
            item: lessonUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(lessonStructuredData),
        }}
      />
      <LessonNavContext
        lessonNumber={meta.lessonNumber}
        lessonTitle={meta.title}
        prevLesson={prev}
        nextLesson={next}
      >
        <LessonComponent />
      </LessonNavContext>
    </>
  );
}
