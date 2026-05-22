"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, MotionValue, useMotionValueEvent } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "@/components/layout/SmoothScroll";
import PageWrapper from "@/components/layout/PageWrapper";
import Navbar from "@/components/navigation/Navbar";
import SectionDots from "@/components/navigation/SectionDots";
import Scene from "@/components/three/Scene";
import PorscheModel from "@/components/three/PorscheModel";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Dynamic imports for sections to reduce initial bundle
const Hero = dynamic(() => import("@/components/sections/Hero"), { ssr: false });
const About = dynamic(() => import("@/components/sections/About"), { ssr: false });
const Education = dynamic(() => import("@/components/sections/Education"), { ssr: false });
const TechStack = dynamic(() => import("@/components/sections/TechStack"), { ssr: false });
const Projects = dynamic(() => import("@/components/sections/Projects"), { ssr: false });
const Social = dynamic(() => import("@/components/sections/Social"), { ssr: false });
const Contact = dynamic(() => import("@/components/sections/Contact"), { ssr: false });

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PAGE — 7-Section Scroll Architecture
   
   Key architecture change: The 3D canvas is now a PERSISTENT fixed layer
   behind all sections (not embedded in Hero). This enables:
   
   1. Framer Motion useScroll → tracks global scroll progress (0–1)
   2. useTransform maps scroll to a MotionValue consumed by PorscheModel
   3. GSAP camera keyframes animate the car through cinematic poses
      per section (zoom interior @ Education, drive-off @ Projects)
   4. Each section's text uses staggered motion.div entrances
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Persistent 3D background layer — renders the Porsche model
 * Fixed position behind all content, receives scrollProgress
 */
function PersistentCanvas({ scrollProgress }: { scrollProgress: number }) {
  return (
    <div className="fixed inset-0 z-[var(--z-canvas)] pointer-events-none">
      <Scene
        cameraPosition={[3, 1.5, 5]}
        cameraFov={40}
        showPostProcessing={true}
        showContactShadows={true}
      >
        <PorscheModel scrollProgress={scrollProgress} />
      </Scene>
    </div>
  );
}

/**
 * Scroll tracker — uses Framer Motion useScroll at the page level
 * Maps scrollYProgress (0–1) to state consumed by the 3D layer
 */
function ScrollDriven3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Framer Motion useScroll — tracks entire page progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map the MotionValue to a plain number for the 3D model
  // We sample the MotionValue in a motion component and pass it down
  const scrollProgressTransformed = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative">
      {/* Persistent 3D background — fixed behind all sections */}
      <motion.div
        style={{ opacity: 1 }}
        className="contents"
      >
        <PersistentCanvasWithMotion scrollProgress={scrollProgressTransformed} />
      </motion.div>

      {/* 7-section content layer */}
      <div className="relative z-[var(--z-content)]">
        <Hero />
        <About />
        <Education />
        <TechStack />
        <Projects />
        <Social />
        <Contact />
      </div>
    </div>
  );
}

/**
 * Bridge component — reads the MotionValue and passes as plain number
 * useTransform creates a MotionValue; we need to read it inside useFrame
 */

function PersistentCanvasWithMotion({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollProgress, "change", (latest) => {
    setProgress(latest);
  });

  return <PersistentCanvas scrollProgress={progress} />;
}

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <SectionDots />
      <PageWrapper>
        <ScrollDriven3DCanvas />
      </PageWrapper>
    </SmoothScroll>
  );
}
