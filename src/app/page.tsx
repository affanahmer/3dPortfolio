"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/layout/SmoothScroll";
import PageWrapper from "@/components/layout/PageWrapper";
import Navbar from "@/components/navigation/Navbar";
import SectionDots from "@/components/navigation/SectionDots";

// Dynamic imports for sections to reduce initial bundle
const Hero = dynamic(() => import("@/components/sections/Hero"), { ssr: false });
const About = dynamic(() => import("@/components/sections/About"), { ssr: false });
const Education = dynamic(() => import("@/components/sections/Education"), { ssr: false });
const TechStack = dynamic(() => import("@/components/sections/TechStack"), { ssr: false });
const Projects = dynamic(() => import("@/components/sections/Projects"), { ssr: false });
const Social = dynamic(() => import("@/components/sections/Social"), { ssr: false });
const Contact = dynamic(() => import("@/components/sections/Contact"), { ssr: false });


export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <SectionDots />
      <PageWrapper>
        <div className="relative z-10">
          <Hero />
          <About />
          <Education />
          <TechStack />
          <Projects />
          <Social />
          <Contact />
        </div>
      </PageWrapper>
    </SmoothScroll>
  );
}
