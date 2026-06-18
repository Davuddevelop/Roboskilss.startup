import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { Hero } from "@/components/site/hero";
import { HowItWorks } from "@/components/site/how-it-works";
import { RobotsSection } from "@/components/site/robots-section";
import { CtaSection } from "@/components/site/cta-section";

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <RobotsSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
