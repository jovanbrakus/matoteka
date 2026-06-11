import LandingHero from "@/components/landing/landing-hero";
import { TopNav } from "@/components/nav/top-nav";

// Statically rendered and served from the CDN — anonymous visitors and bots
// never invoke a function. Logged-in visitors are rewritten to /pocetna by
// proxy.ts before this page is reached.
export default function HomePage() {
  return (
    <>
      <TopNav />
      <main><LandingHero /></main>
    </>
  );
}
