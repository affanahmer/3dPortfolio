"use client";

import { motion, useScroll } from "framer-motion";

/**
 * Scroll-linked cyber-neon progress line at top of viewport
 * Racing cockpit telemetry aesthetic
 */
export default function ProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ 
        scaleX: scrollYProgress,
        transformOrigin: "left",
        boxShadow: "0 0 10px rgba(0, 240, 255, 0.4)" 
      }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-cyan to-accent-violet z-[100]"
    />
  );
}
