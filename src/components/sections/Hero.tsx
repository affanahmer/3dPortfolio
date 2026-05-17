"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  wordStagger,
  letterVariants,
  staggerContainer,
  fadeInUp,
} from "@/animations/variants";
import Scene from "@/components/three/Scene";
import PorscheModel from "@/components/three/PorscheModel";
import HUDOverlay from "@/components/ui/HUDOverlay";
import Button from "@/components/ui/Button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hero Section (Page 1)
 * Cinematic first impression — Porsche 911 GT3 RS + massive typography
 * Full-viewport with R3F canvas, HUD telemetry, and racing stripe
 *
 * The scrollProgress state is driven by GSAP ScrollTrigger:
 * - Tracks the entire document scroll (0 = top, 1 = bottom)
 * - Passed to PorscheModel for scroll-driven rotation/position keyframes
 */

const heroName = "AFFAN KHAN";

export default function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // GSAP ScrollTrigger — drives the car's rotation/position through sections
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      scrollTriggerRef.current?.kill();
    };
  }, []);

  return (
    <section
      id="hero"
      className="section relative flex items-center justify-center overflow-hidden noise-overlay hud-grid"
    >
      {/* Racing stripe diagonal */}
      <div className="racing-stripe top-1/3 -left-1/4 pointer-events-none" />

      {/* HUD Overlay */}
      <HUDOverlay />

      {/* 3D Canvas — Porsche Model with scroll-driven animation */}
      <div className="absolute inset-0 z-[var(--z-canvas)]">
        <Scene
          cameraPosition={[3, 1.5, 5]}
          cameraFov={40}
          showPostProcessing={true}
          showContactShadows={true}
        >
          <PorscheModel scrollProgress={scrollProgress} />
        </Scene>
      </div>

      {/* Content overlay */}
      <div className="relative z-[var(--z-content)] flex flex-col items-center text-center px-6 pointer-events-none">
        {/* Section number */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ delay: 0.3 }}
          className="absolute -top-16 text-[12rem] font-bold font-[family-name:var(--font-racing)] text-white leading-none select-none"
        >
          01
        </motion.span>

        {/* Name — letter by letter stagger */}
        <motion.h1
          variants={wordStagger}
          initial="initial"
          animate="animate"
          className="text-[clamp(3rem,10vw,9rem)] font-bold leading-[0.9] tracking-tight mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {heroName.split("").map((char, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              className="inline-block"
              style={{ display: char === " " ? "inline" : "inline-block" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-xl md:text-2xl text-gradient-gold font-medium tracking-wider mb-10"
          style={{ fontFamily: "var(--font-racing)" }}
        >
          CREATIVE DEVELOPER & ENGINEER
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex flex-wrap gap-4 pointer-events-auto"
        >
          <motion.div variants={fadeInUp}>
            <Button variant="primary" size="lg" onClick={() => {
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }}>
              View Work
            </Button>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Button variant="ghost" size="lg" onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}>
              Contact
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[var(--z-content)] flex flex-col items-center gap-2"
      >
        <motion.p
          className="text-[10px] font-mono text-[var(--color-text-secondary)] tracking-[0.4em] uppercase"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll
        </motion.p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
          className="w-4 h-6 border border-[var(--color-text-secondary)] rounded-full flex items-start justify-center p-1"
        >
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
            className="w-1 h-1 bg-[var(--color-accent-red)] rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
