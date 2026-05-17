"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

/**
 * Premium button component
 * Primary: Guards Red with glow effect
 * Ghost: Outlined with subtle hover fill
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary: `
      bg-[var(--color-accent-red)] text-white
      shadow-[0_0_20px_rgba(232,0,13,0.3)]
      hover:shadow-[0_0_40px_rgba(232,0,13,0.5)]
      border border-transparent
    `,
    ghost: `
      bg-transparent text-[var(--color-text-primary)]
      border border-[var(--color-border-subtle)]
      hover:border-[var(--color-accent-red)]
      hover:text-[var(--color-accent-red)]
    `,
  };

  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-semibold tracking-wider uppercase
    rounded-lg transition-all duration-300
    disabled:opacity-50 disabled:cursor-not-allowed
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;

  const MotionComponent = href ? motion.a : motion.button;

  return (
    <MotionComponent
      {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : { type, onClick })}
      disabled={disabled}
      className={baseClasses}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionComponent>
  );
}
