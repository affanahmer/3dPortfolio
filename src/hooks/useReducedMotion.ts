"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";
import { Variants } from "framer-motion";

/**
 * Safe motion hook that respects prefers-reduced-motion
 * Per ANIMATION_RULES.md §6
 */
export function useSafeMotion() {
  const prefersReduced = useFramerReducedMotion();

  const safeVariants = (
    full: Variants,
    reduced: Variants = { initial: {}, animate: {} }
  ): Variants => (prefersReduced ? reduced : full);

  return { prefersReduced, safeVariants };
}
