import type { Metadata } from "next";
import "./globals.css";
import { TopNav } from "@/components/nav/top-nav";
import AuthenticatedLayout from "@/components/layout/authenticated-layout";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Matoteka — Prijemni ispit iz matematike | 4000+ zadataka",
  description:
    "Besplatna platforma za pripremu prijemnog ispita iz matematike. 4000+ rešenih zadataka, 59 interaktivnih lekcija i simulacije ispita za ETF, MATF, FON i druge fakultete Univerziteta u Beogradu.",
  keywords: "prijemni ispit, matematika, ETF, MATF, FON, rešeni zadaci, Beograd, simulacija ispita, lekcije",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const isAuthenticated = !!session?.user;
  const user = isAuthenticated ? (session.user as any) : null;

  return (
    <html lang="sr" className="dark">
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
      </body>
    </html>
  );
}
