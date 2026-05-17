"use client";

import { motion } from "framer-motion";

interface SkillBarProps {
  name: string;
  icon: string;
  proficiency: number;
  delay?: number;
}

/**
 * Animated skill bar — pit stop time bar aesthetic
 * Fill uses scaleX transform from left
 */
export default function SkillBar({ name, icon, proficiency, delay = 0 }: SkillBarProps) {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-mono text-[var(--color-accent-gold)]">{icon}</span>
          <span className="text-sm text-[var(--color-text-primary)] font-medium">{name}</span>
        </div>
        <span className="text-xs font-mono text-[var(--color-text-secondary)]">
          {proficiency}%
        </span>
      </div>

      {/* Bar track */}
      <div className="relative h-1.5 bg-[var(--color-border-subtle)] rounded-full overflow-hidden">
        {/* Fill */}
        <motion.div
          className="skill-bar-fill absolute inset-y-0 left-0 rounded-full"
          style={{
            width: "100%",
            transformOrigin: "left",
            background: `linear-gradient(90deg, var(--color-accent-red), #ff4444)`,
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: proficiency / 100 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
            delay: delay,
          }}
        />

        {/* Glow on complete */}
        {proficiency >= 90 && (
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full blur-sm opacity-40"
            style={{
              width: `${proficiency}%`,
              background: "var(--color-accent-red)",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.5 }}
          />
        )}
      </div>
    </div>
  );
}
