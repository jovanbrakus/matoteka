import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/about",
          "/primer",
          "/kako-se-pripremiti-za-prijemni-iz-matematike",
          "/privacy",
          "/terms",
          "/znanje",
        ],
        disallow: [
          "/admin",
          "/analitika",
          "/profil",
          "/prijava",
          "/simulacija",
          "/vezba",
          "/vezbe",
          "/zadaci",
          "/api/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
