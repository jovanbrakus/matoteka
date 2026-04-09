import KnowledgeHubPage from "@/components/knowledge/KnowledgeHubPage";
import { getAllLessons, getLessonCategories } from "@/lib/lessons";
import { absoluteUrl, serializeJsonLd, SITE_NAME, SITE_URL } from "@/lib/seo";

export const revalidate = 3600;

export default function ZnanjePage() {
  const lessons = getAllLessons();
  const categories = getLessonCategories();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/znanje#webpage`,
        url: absoluteUrl("/znanje"),
        name: "Centar Znanja — Matoteka",
        description:
          "Interaktivne lekcije iz matematike za pripremu prijemnog ispita. Teorija, primeri i objašnjenja.",
        inLanguage: "sr-RS",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}#website`,
          name: SITE_NAME,
          url: SITE_URL,
        },
        mainEntity: {
          "@id": `${SITE_URL}/znanje#lessonlist`,
        },
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/znanje#lessonlist`,
        name: "Sve lekcije",
        numberOfItems: lessons.length,
        itemListElement: lessons.map((lesson, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: absoluteUrl(`/znanje/${lesson.slug}`),
          name: lesson.title,
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />
      <KnowledgeHubPage initialCategories={categories} initialLessons={lessons} />
    </>
  );
}
