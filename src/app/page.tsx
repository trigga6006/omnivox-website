import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { AppsIntegrations } from "@/components/AppsIntegrations";
import { SpeedSection } from "@/components/SpeedSection";
import { UseCasesSection } from "@/components/UseCasesSection";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CTASection } from "@/components/CTASection";
import { AskAISection } from "@/components/AskAISection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-cream">
      <AnnouncementBar />
      <Navigation />
      <HeroSection />
      <AppsIntegrations />
      <SpeedSection />
      <UseCasesSection />
      <FeaturesGrid />
      <TestimonialsSection />
      <CTASection />
      <AskAISection />
      <Footer />
    </main>
  );
}
