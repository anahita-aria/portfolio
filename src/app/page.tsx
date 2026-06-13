import { Hero } from "@/components/hero";
import { WhyMeSection } from "@/components/why-me-section";
import { WorkGrid } from "@/components/work-grid";
import { ExperienceSection } from "@/components/experience-section";
import { SkillsSection } from "@/components/skills-section";
import { FoundationSection } from "@/components/foundation-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyMeSection />
      <SkillsSection />
      <WorkGrid />
      <ExperienceSection />
      <FoundationSection />
      <ContactSection />
    </>
  );
}
