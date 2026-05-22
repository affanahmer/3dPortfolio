"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Scroll-linked red progress line at top of viewport
 * Racing lap-timer aesthetic
 */
export default function ProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ 
        scaleX: scrollYProgress,
        transformOrigin: "left",
        boxShadow: "0 0 8px #E8000D" 
      }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#E8000D] z-[100]"
    />
  );
}
