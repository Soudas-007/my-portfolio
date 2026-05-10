import HeroSection from "@/components/HeroSection";
// import ScrollytellingCanvas from "@/components/ScrollytellingCanvas";
import CaseStudies from "@/components/CaseStudies";
import ExperienceSection from "@/components/ExperienceSection";
import AboutSection from "@/components/AboutSection";
import ToolboxSection from "@/components/ToolboxSection";
import ContactSection from "@/components/ContactSection";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-background relative selection:bg-[var(--color-accent-blue)] selection:text-primary">
      {/* Hero doesn't need ScrollReveal as it has its own entrance animations */}
      <HeroSection />

      {/* <ScrollytellingCanvas /> */}

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

      <ScrollReveal>
        <ContactSection />
      </ScrollReveal>
    </main>
  );
}
