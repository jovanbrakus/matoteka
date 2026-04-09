import type { Metadata } from "next";

export const SITE_NAME = "Matoteka";
export const SITE_URL = "https://matoteka.com";

const DEFAULT_OG_IMAGE = {
  url: "/hero-3d.png",
  width: 512,
  height: 512,
  alt: "Matoteka — Prijemni ispit iz matematike",
};

type CreateMetadataInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: Metadata["keywords"];
  index?: boolean;
  openGraphType?: "website" | "article";
  images?: Array<{
    url: string;
    width?: number;
    height?: number;
    alt: string;
  }>;
};

export function getSiteUrl(): URL {
  return new URL(SITE_URL);
}

export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function createMetadata({
  title,
  description,
  path,
  keywords,
  index = true,
  openGraphType = "website",
  images,
}: CreateMetadataInput): Metadata {
  const metadataImages = images ?? [DEFAULT_OG_IMAGE];
  const robots = index
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large" as const,
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
    : {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
          "max-image-preview": "none" as const,
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      };

  return {
    title,
    description,
    keywords,
    metadataBase: getSiteUrl(),
    alternates: {
      canonical: path,
    },
    robots,
    openGraph: {
      type: openGraphType,
      locale: "sr_RS",
      siteName: SITE_NAME,
      title,
      description,
      url: path,
      images: metadataImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: metadataImages.map((image) => image.url),
    },
  };
}

export function createNoIndexMetadata(
  input: Omit<CreateMetadataInput, "index" | "path">
): Metadata {
  return createMetadata({ ...input, index: false });
}
