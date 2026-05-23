"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import SmoothScroll from "@/components/layout/SmoothScroll";
import PageWrapper from "@/components/layout/PageWrapper";
import Navbar from "@/components/navigation/Navbar";
import SectionDots from "@/components/navigation/SectionDots";
import GlobalScrollCanvas from "@/components/layout/GlobalScrollCanvas";
import DashboardHUD from "@/components/layout/DashboardHUD";

// Import sections directly
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track global scroll progress through the entire 400vh container path
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <SmoothScroll>
      <Navbar />
      <SectionDots />
      <PageWrapper>
        
        {/* ─── SCROLL RUNWAY CONTAINER (400vh) ─── */}
        <div ref={containerRef} className="relative w-full h-[400vh] bg-transparent select-none">
          
          {/* Absolute Scroll Navigation Anchors */}
          <div id="launch-anchor" className="absolute top-0 left-0 h-px w-px pointer-events-none" />
          <div id="engineering-anchor" className="absolute top-[100vh] left-0 h-px w-px pointer-events-none" />
          <div id="garage-anchor" className="absolute top-[200vh] left-0 h-px w-px pointer-events-none" />
          <div id="outro-anchor" className="absolute top-[300vh] left-0 h-px w-px pointer-events-none" />

          {/* ─── PERSISTENT CANVAS BACKBONE ─── */}
          <GlobalScrollCanvas scrollYProgress={scrollYProgress} />

          {/* ─── PERSISTENT Cockpit HUD OVERLAY ─── */}
          <DashboardHUD scrollYProgress={scrollYProgress} />

          {/* ─── FIXED IMMERSIVE TEXT OVERLAYS LAYER (z:10) ─── */}
          <div className="fixed inset-0 w-full h-full pointer-events-none z-10 flex items-center justify-center">
            
            {/* SECTION 1: LAUNCH (Hero) — 0% - 20% Scroll */}
            <Hero scrollYProgress={scrollYProgress} />

            {/* SECTION 2: ENGINEERING (About) — 20% - 45% Scroll */}
            <About scrollYProgress={scrollYProgress} />

            {/* SECTION 3: GARAGE (Projects) — 45% - 75% Scroll */}
            <Projects scrollYProgress={scrollYProgress} />

            {/* SECTION 4: OUTRO (Contact) — 75% - 100% Scroll */}
            <Contact scrollYProgress={scrollYProgress} />

          </div>

        </div>
      </PageWrapper>
    </SmoothScroll>
  );
}
