"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Scroll-linked red progress line at top of viewport
 * Racing lap-timer aesthetic
 */
export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--color-accent-red)] origin-left z-[calc(var(--z-nav)+1)]"
    />
  );
}
