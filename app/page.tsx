"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { AwardsSection } from "@/components/AwardsSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "hsl(var(--background))", color: "hsl(var(--foreground))", overflowX: "hidden" }}>
      <Header />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <AwardsSection />
      <Footer />
    </main>
  );
}
