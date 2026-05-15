import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { WorkflowSection } from "@/components/WorkflowSection";
import { AppsIntegrations } from "@/components/AppsIntegrations";
import { SpeedSection } from "@/components/SpeedSection";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { AgenticSection } from "@/components/AgenticSection";
import { ComparisonStrip } from "@/components/ComparisonStrip";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="bg-background text-foreground transition-colors duration-300">
      <AnnouncementBar />
      <Navigation />
      <HeroSection />
      <WorkflowSection />
      <AppsIntegrations />
      <SpeedSection />
      <FeaturesGrid />
      <AgenticSection />
      <ComparisonStrip />
      <FAQSection />
      <CTASection />
      <Footer />
      <ThemeToggle />
    </main>
  );
}
