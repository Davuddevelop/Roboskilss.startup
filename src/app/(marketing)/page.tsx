import { Hero } from "@/components/site/hero";
import { HowItWorks } from "@/components/site/how-it-works";
import { RobotsSection } from "@/components/site/robots-section";
import { CtaSection } from "@/components/site/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <RobotsSection />
      <CtaSection />
    </>
  );
}
