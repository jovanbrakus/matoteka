import type { Metadata } from "next";
import "./globals.css";
import { TopNav } from "@/components/nav/top-nav";
import AuthenticatedLayout from "@/components/layout/authenticated-layout";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";
import { Analytics } from "@vercel/analytics/next";
import { absoluteUrl, createMetadata, serializeJsonLd, SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  ...createMetadata({
    title: "Matoteka — Prijemni ispit iz matematike | 4000+ zadataka",
    description:
      "Besplatna platforma za pripremu prijemnog ispita iz matematike. 4000+ rešenih zadataka, 59 interaktivnih lekcija i simulacije ispita za ETF, MATF, FON i druge fakultete Univerziteta u Beogradu.",
    path: "/",
    keywords: [
      "prijemni ispit",
      "matematika",
      "ETF",
      "MATF",
      "FON",
      "rešeni zadaci",
      "Beograd",
      "simulacija ispita",
      "lekcije",
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const isAuthenticated = !!session?.user;
  const user = isAuthenticated ? session.user : null;

  return (
    <html lang="sr" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="light"){document.documentElement.classList.remove("dark");document.documentElement.classList.add("light")}}catch(e){}`,
          }}
        />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Fredoka:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&family=Public+Sans:wght@300;400;500;600;700;800;900&display=swap"
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
          {isAuthenticated ? (
            <AuthenticatedLayout
              user={{
                displayName:
                  user?.displayName || user?.name || "Korisnik",
                avatarUrl: user?.image || null,
              }}
            >
              {children}
            </AuthenticatedLayout>
          ) : (
            <>
              <TopNav />
              <main>{children}</main>
            </>
          )}
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  );
}
