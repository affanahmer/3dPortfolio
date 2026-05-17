"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pageVariants } from "@/animations/variants";
import { useSafeMotion } from "@/hooks/useReducedMotion";

interface PageWrapperProps {
  children: ReactNode;
}

/**
 * Page-level animation wrapper
 * Wraps content in Framer Motion page transition with reduced-motion support
 */
export default function PageWrapper({ children }: PageWrapperProps) {
  const { safeVariants } = useSafeMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        variants={safeVariants(pageVariants)}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
