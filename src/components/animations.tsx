"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

/**
 * Scroll-triggered animation wrapper for sections.
 * Animates in once when the section enters the viewport focal area.
 */
export function AnimatedSection({
  children,
  className = "",
  id,
  delay = 0,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  // once: true so animations only play on first scroll-into-view
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        staggerChildren: 0.1, // Stagger children with 0.1s delay
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      id={id}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedItemProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Animated child item that inherits and responds to parent staggerChildren delay.
 */
export function AnimatedItem({ children, className = "" }: AnimatedItemProps) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
