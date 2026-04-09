import {
  getAdjacentLessons,
  getAllLessons,
  getLessonBySlug,
  getLessonCategoryName,
  getLessonsGeneratedAt,
} from "@/lib/lessons";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { LessonNavContext } from "@/components/knowledge/LessonNavContext";
import { absoluteUrl, createMetadata, serializeJsonLd, SITE_NAME, SITE_URL } from "@/lib/seo";

const Lesson1Page = dynamic(() => import("@/components/knowledge/lessons/Lesson1Page"));
const Lesson2Page = dynamic(() => import("@/components/knowledge/lessons/Lesson2Page"));
const Lesson3Page = dynamic(() => import("@/components/knowledge/lessons/Lesson3Page"));
const Lesson4Page = dynamic(() => import("@/components/knowledge/lessons/Lesson4Page"));
const Lesson5Page = dynamic(() => import("@/components/knowledge/lessons/Lesson5Page"));
const Lesson6Page = dynamic(() => import("@/components/knowledge/lessons/Lesson6Page"));
const Lesson7Page = dynamic(() => import("@/components/knowledge/lessons/Lesson7Page"));
const Lesson8Page = dynamic(() => import("@/components/knowledge/lessons/Lesson8Page"));
const Lesson9Page = dynamic(() => import("@/components/knowledge/lessons/Lesson9Page"));
const Lesson10Page = dynamic(() => import("@/components/knowledge/lessons/Lesson10Page"));
const Lesson11Page = dynamic(() => import("@/components/knowledge/lessons/Lesson11Page"));
const Lesson12Page = dynamic(() => import("@/components/knowledge/lessons/Lesson12Page"));
const Lesson13Page = dynamic(() => import("@/components/knowledge/lessons/Lesson13Page"));
const Lesson14Page = dynamic(() => import("@/components/knowledge/lessons/Lesson14Page"));
const Lesson15Page = dynamic(() => import("@/components/knowledge/lessons/Lesson15Page"));
const Lesson16Page = dynamic(() => import("@/components/knowledge/lessons/Lesson16Page"));
const Lesson17Page = dynamic(() => import("@/components/knowledge/lessons/Lesson17Page"));
const Lesson18Page = dynamic(() => import("@/components/knowledge/lessons/Lesson18Page"));
const Lesson19Page = dynamic(() => import("@/components/knowledge/lessons/Lesson19Page"));
const Lesson20Page = dynamic(() => import("@/components/knowledge/lessons/Lesson20Page"));
const Lesson21Page = dynamic(() => import("@/components/knowledge/lessons/Lesson21Page"));
const Lesson22Page = dynamic(() => import("@/components/knowledge/lessons/Lesson22Page"));
const Lesson23Page = dynamic(() => import("@/components/knowledge/lessons/Lesson23Page"));
const Lesson24Page = dynamic(() => import("@/components/knowledge/lessons/Lesson24Page"));
const Lesson25Page = dynamic(() => import("@/components/knowledge/lessons/Lesson25Page"));
const Lesson26Page = dynamic(() => import("@/components/knowledge/lessons/Lesson26Page"));
const Lesson27Page = dynamic(() => import("@/components/knowledge/lessons/Lesson27Page"));
const Lesson28Page = dynamic(() => import("@/components/knowledge/lessons/Lesson28Page"));
const Lesson29Page = dynamic(() => import("@/components/knowledge/lessons/Lesson29Page"));
const Lesson30Page = dynamic(() => import("@/components/knowledge/lessons/Lesson30Page"));
const Lesson31Page = dynamic(() => import("@/components/knowledge/lessons/Lesson31Page"));
const Lesson32Page = dynamic(() => import("@/components/knowledge/lessons/Lesson32Page"));
const Lesson33Page = dynamic(() => import("@/components/knowledge/lessons/Lesson33Page"));
const Lesson34Page = dynamic(() => import("@/components/knowledge/lessons/Lesson34Page"));
const Lesson35Page = dynamic(() => import("@/components/knowledge/lessons/Lesson35Page"));
const Lesson36Page = dynamic(() => import("@/components/knowledge/lessons/Lesson36Page"));
const Lesson37Page = dynamic(() => import("@/components/knowledge/lessons/Lesson37Page"));
const Lesson38Page = dynamic(() => import("@/components/knowledge/lessons/Lesson38Page"));
const Lesson39Page = dynamic(() => import("@/components/knowledge/lessons/Lesson39Page"));
const Lesson40Page = dynamic(() => import("@/components/knowledge/lessons/Lesson40Page"));
const Lesson41Page = dynamic(() => import("@/components/knowledge/lessons/Lesson41Page"));
const Lesson42Page = dynamic(() => import("@/components/knowledge/lessons/Lesson42Page"));
const Lesson43Page = dynamic(() => import("@/components/knowledge/lessons/Lesson43Page"));
const Lesson44Page = dynamic(() => import("@/components/knowledge/lessons/Lesson44Page"));
const Lesson45Page = dynamic(() => import("@/components/knowledge/lessons/Lesson45Page"));
const Lesson46Page = dynamic(() => import("@/components/knowledge/lessons/Lesson46Page"));
const Lesson47Page = dynamic(() => import("@/components/knowledge/lessons/Lesson47Page"));
const Lesson48Page = dynamic(() => import("@/components/knowledge/lessons/Lesson48Page"));
const Lesson49Page = dynamic(() => import("@/components/knowledge/lessons/Lesson49Page"));
const Lesson50Page = dynamic(() => import("@/components/knowledge/lessons/Lesson50Page"));
const Lesson51Page = dynamic(() => import("@/components/knowledge/lessons/Lesson51Page"));
const Lesson52Page = dynamic(() => import("@/components/knowledge/lessons/Lesson52Page"));
const Lesson53Page = dynamic(() => import("@/components/knowledge/lessons/Lesson53Page"));
const Lesson54Page = dynamic(() => import("@/components/knowledge/lessons/Lesson54Page"));
const Lesson55Page = dynamic(() => import("@/components/knowledge/lessons/Lesson55Page"));
const Lesson56Page = dynamic(() => import("@/components/knowledge/lessons/Lesson56Page"));
const Lesson57Page = dynamic(() => import("@/components/knowledge/lessons/Lesson57Page"));
const Lesson58Page = dynamic(() => import("@/components/knowledge/lessons/Lesson58Page"));
const Lesson59Page = dynamic(() => import("@/components/knowledge/lessons/Lesson59Page"));

interface Props {
  params: Promise<{ lessonSlug: string }>;
}

const LESSON_COMPONENTS: Record<string, React.ComponentType> = {
  "1": Lesson1Page,
  "2": Lesson2Page,
  "3": Lesson3Page,
  "4": Lesson4Page,
  "5": Lesson5Page,
  "6": Lesson6Page,
  "7": Lesson7Page,
  "8": Lesson8Page,
  "9": Lesson9Page,
  "10": Lesson10Page,
  "11": Lesson11Page,
  "12": Lesson12Page,
  "13": Lesson13Page,
  "14": Lesson14Page,
  "15": Lesson15Page,
  "16": Lesson16Page,
  "17": Lesson17Page,
  "18": Lesson18Page,
  "19": Lesson19Page,
  "20": Lesson20Page,
  "21": Lesson21Page,
  "22": Lesson22Page,
  "23": Lesson23Page,
  "24": Lesson24Page,
  "25": Lesson25Page,
  "26": Lesson26Page,
  "27": Lesson27Page,
  "28": Lesson28Page,
  "29": Lesson29Page,
  "30": Lesson30Page,
  "31": Lesson31Page,
  "32": Lesson32Page,
  "33": Lesson33Page,
  "34": Lesson34Page,
  "35": Lesson35Page,
  "36": Lesson36Page,
  "37": Lesson37Page,
  "38": Lesson38Page,
  "39": Lesson39Page,
  "40": Lesson40Page,
  "41": Lesson41Page,
  "42": Lesson42Page,
  "43": Lesson43Page,
  "44": Lesson44Page,
  "45": Lesson45Page,
  "46": Lesson46Page,
  "47": Lesson47Page,
  "48": Lesson48Page,
  "49": Lesson49Page,
  "50": Lesson50Page,
  "51": Lesson51Page,
  "52": Lesson52Page,
  "53": Lesson53Page,
  "54": Lesson54Page,
  "55": Lesson55Page,
  "56": Lesson56Page,
  "57": Lesson57Page,
  "58": Lesson58Page,
  "59": Lesson59Page,
};

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
        url: `/api/lessons/${meta.id}/hero`,
        width: 896,
        height: 1200,
        alt: meta.title,
      },
    ],
  });
}

export default async function LessonPage({ params }: Props) {
  const { lessonSlug } = await params;
  const meta = getLessonBySlug(lessonSlug);
  if (!meta) notFound();

  const LessonComponent = LESSON_COMPONENTS[meta.id];
  if (!LessonComponent) {
    notFound();
  }

  const { prev, next } = getAdjacentLessons(meta.id);
  const lessonUrl = absoluteUrl(`/znanje/${meta.slug}`);
  const lessonHubUrl = absoluteUrl("/znanje");
  const homeUrl = absoluteUrl("/");
  const heroImageUrl = absoluteUrl(`/api/lessons/${meta.id}/hero`);
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
