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
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="bg-background text-foreground transition-colors duration-300">
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
      <ThemeToggle />
    </main>
  );
}
