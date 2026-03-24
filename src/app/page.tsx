import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { TrustStrip } from "@/components/trust-strip";
import { FeaturesGrid } from "@/components/features-grid";
import { HowItWorks } from "@/components/how-it-works";
import { SpeedComparison } from "@/components/speed-comparison";
import { FeatureShowcase } from "@/components/feature-showcase";
import { PrivacySection } from "@/components/privacy-section";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <FeaturesGrid />
        <HowItWorks />
        <SpeedComparison />
        <FeatureShowcase />
        <PrivacySection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
