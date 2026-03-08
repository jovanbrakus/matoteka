import type { Metadata } from "next";
import "./globals.css";
import { TopNav } from "@/components/nav/top-nav";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "TataMata — 1000+ rešenih zadataka za prijemni ispit",
  description:
    "Besplatna platforma za pripremu prijemnog ispita iz matematike. 1000+ rešenih zadataka sa ETF, MATF, FON i drugih fakulteta Univerziteta u Beogradu.",
  keywords: "prijemni ispit, matematika, ETF, MATF, FON, rešeni zadaci, Beograd",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr" className="dark">
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="min-h-screen">
        <SessionProvider>
          <TopNav />
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
