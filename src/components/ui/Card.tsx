"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cardEntrance } from "@/animations/variants";

interface CardProps {
  children: ReactNode;
  className?: string;
  glowOnHover?: boolean;
  onClick?: () => void;
  layoutId?: string;
}

/**
 * Premium card component with carbon fiber texture
 * Features hover lift effect and optional red glow
 */
export default function Card({
  children,
  className = "",
  glowOnHover = true,
  onClick,
  layoutId,
}: CardProps) {
  return (
    <motion.div
      variants={cardEntrance}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{
        y: -8,
        scale: 1.01,
        transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
      }}
      onClick={onClick}
      layoutId={layoutId}
      className={`
        relative overflow-hidden rounded-xl
        bg-[var(--color-bg-elevated)] carbon-fiber
        border border-[var(--color-border-subtle)]
        shadow-[var(--shadow-card)]
        transition-shadow duration-300
        ${glowOnHover ? "hover:shadow-[var(--shadow-card-hover)] hover:border-[rgba(232,0,13,0.3)]" : ""}
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
    >
      {/* Red accent line at bottom on hover */}
      {glowOnHover && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-accent-red)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      )}
      {children}
    </motion.div>
  );
}
