"use client";

import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useLenis } from "@/hooks/useLenis";

const SECTIONS = [
  "hero",
  "about",
  "education",
  "techstack",
  "projects",
  "social",
  "contact",
];

/**
 * Vertical dot indicator on right edge
 * Porsche instrument cluster aesthetic
 * Active section highlighted in Guards Red
 */
export default function SectionDots() {
  const { activeSection } = useScrollProgress();
  const { scrollTo } = useLenis();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-[var(--z-nav)] hidden lg:flex flex-col items-center gap-3"
    >
      {SECTIONS.map((section, index) => (
        <button
          key={section}
          onClick={() => scrollTo(`#${section}`, { duration: 1.2 })}
          className="group relative flex items-center"
          aria-label={`Go to ${section} section`}
        >
          {/* Tooltip */}
          <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-[var(--color-text-secondary)] capitalize whitespace-nowrap font-mono tracking-wider">
            {section}
          </span>

          {/* Dot */}
          <motion.div
            animate={{
              scale: activeSection === index ? 1 : 0.6,
              backgroundColor:
                activeSection === index ? "#E8000D" : "rgba(160, 160, 160, 0.4)",
            }}
            transition={{ duration: 0.3 }}
            className="w-2.5 h-2.5 rounded-full"
          />

          {/* Active glow */}
          {activeSection === index && (
            <motion.div
              layoutId="active-dot-glow"
              className="absolute w-2.5 h-2.5 rounded-full bg-[var(--color-accent-red)] blur-[6px]"
            />
          )}
        </button>
      ))}

      {/* Connecting line */}
      <div className="absolute top-1 bottom-1 w-px bg-[var(--color-border-subtle)] -z-10" />
    </motion.div>
  );
}
