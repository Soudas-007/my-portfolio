import HeroSection from "@/components/HeroSection";
import CaseStudies from "@/components/CaseStudies";
import ExperienceSection from "@/components/ExperienceSection";
import AboutSection from "@/components/AboutSection";
import ToolboxSection from "@/components/ToolboxSection";
import AIToolboxSection from "@/components/AIToolboxSection";
import FooterSection from "@/components/FooterSection";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-background relative selection:bg-[var(--color-accent-blue)] selection:text-primary">
      <HeroSection />

      <ScrollReveal>
        <CaseStudies />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <ExperienceSection />
      </ScrollReveal>

      <ScrollReveal>
        <AboutSection />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <ToolboxSection />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <AIToolboxSection />
      </ScrollReveal>

      <FooterSection />
    </main>
  );
}
