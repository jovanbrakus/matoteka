import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/next";
import { absoluteUrl, createMetadata, serializeJsonLd, SITE_NAME, SITE_URL } from "@/lib/seo";
import { Inter, Fredoka, Space_Grotesk, Manrope, Public_Sans } from "next/font/google";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });
const fredoka = Fredoka({ subsets: ["latin", "latin-ext"], variable: "--font-fredoka", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin", "latin-ext"], variable: "--font-space-grotesk", display: "swap" });
const manrope = Manrope({ subsets: ["latin", "latin-ext"], variable: "--font-manrope", display: "swap" });
const publicSans = Public_Sans({ subsets: ["latin", "latin-ext"], variable: "--font-public-sans", display: "swap" });

export const metadata: Metadata = {
  ...createMetadata({
    title: "Matoteka — Prijemni ispit iz matematike | 4000+ zadataka",
    description:
      "Besplatna platforma za pripremu prijemnog ispita iz matematike. 4000+ rešenih zadataka, 59 interaktivnih lekcija i simulacije ispita za ETF, MATF, FON i druge fakultete Univerziteta u Beogradu.",
    path: "/",
    keywords: [
      "prijemni ispit",
      "prijemni ispit iz matematike",
      "prijemni ispit iz matematike za fakultete",
      "matematika",
      "ETF",
      "MATF",
      "FON",
      "RGF",
      "Univerzitet u Beogradu",
      "rešeni zadaci",
      "rešeni zadaci iz matematike",
      "zbirka zadataka sa rešenjima",
      "najveća zbirka zadataka",
      "zadaci sa rešenjima iz matematike",
      "gradivo za prijemni iz matematike",
      "lekcije iz matematike",
      "priprema za prijemni ispit",
      "simulacija prijemnog ispita",
      "matematika za fakultet",
      "algebra",
      "geometrija",
      "trigonometrija",
      "analiza",
      "jednačine",
      "Beograd",
      "tehnički fakulteti prijemni",
      "prijemni za tehničke fakultete",
    ],
  }),
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr" className={`dark ${inter.variable} ${fredoka.variable} ${spaceGrotesk.variable} ${manrope.variable} ${publicSans.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="light"){document.documentElement.classList.remove("dark");document.documentElement.classList.add("light")}}catch(e){}`,
          }}
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="m-0 p-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${SITE_URL}#organization`,
                  name: SITE_NAME,
                  url: SITE_URL,
                  logo: {
                    "@type": "ImageObject",
                    url: absoluteUrl("/logo-256.png"),
                    width: 256,
                    height: 256,
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}#website`,
                  name: SITE_NAME,
                  url: SITE_URL,
                  description:
                    "Besplatna platforma za pripremu prijemnog ispita iz matematike.",
                  inLanguage: "sr-RS",
                  publisher: { "@id": `${SITE_URL}#organization` },
                },
              ],
            }),
          }}
        />
        <SessionProvider>
          {children}
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  );
}
