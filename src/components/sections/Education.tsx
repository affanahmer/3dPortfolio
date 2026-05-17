"use client";

import { motion } from "framer-motion";
import {
  headingReveal,
  staggerContainer,
  fadeInUp,
  lineDrawY,
} from "@/animations/variants";
import { education } from "@/data/education";
import { skills } from "@/data/skills";
import SkillBar from "@/components/ui/SkillBar";
import { SkillCategory } from "@/types";

const categories: SkillCategory[] = [
  "Languages",
  "Frontend",
  "Backend",
  "DevOps",
  "Tools",
  "Design",
];

/**
 * Education + Skills Section (Page 3)
 * Left: Education timeline with SVG line draw
 * Right: Skills grouped by category with animated bars
 */
export default function Education() {
  return (
    <section
      id="education"
      className="section relative flex items-center py-24 md:py-0"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        {/* Section number */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.08 }}
          viewport={{ once: true }}
          className="absolute top-8 right-8 text-[10rem] font-bold font-[family-name:var(--font-racing)] text-white leading-none select-none hidden md:block"
        >
          03
        </motion.span>

        {/* Section heading */}
        <motion.div
          variants={headingReveal}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-sm font-mono text-[var(--color-accent-red)] tracking-[0.3em] uppercase mb-4 block">
            Credentials
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Education & <span className="text-gradient-gold">Skills</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* ─── LEFT: Education Timeline ──────────────────────────────── */}
          <div className="relative">
            {/* Vertical line */}
            <motion.div
              variants={lineDrawY}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="timeline-line absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-accent-red)] via-[var(--color-border-subtle)] to-transparent"
            />

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="space-y-10"
            >
              {education.map((item) => (
                <motion.div
                  key={item.id}
                  variants={fadeInUp}
                  className="relative pl-12"
                >
                  {/* Node dot */}
                  <div className="absolute left-2 top-1 w-4 h-4 rounded-full bg-[var(--color-bg-primary)] border-2 border-[var(--color-accent-red)] z-10">
                    <div className="absolute inset-1 rounded-full bg-[var(--color-accent-red)]" />
                  </div>

                  {/* Content */}
                  <div className="p-5 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] carbon-fiber">
                    <span className="text-xs font-mono text-[var(--color-accent-gold)] tracking-wider">
                      {item.year}
                    </span>
                    <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mt-1">
                      {item.degree}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                      {item.institution}
                    </p>
                    {item.description && (
                      <p className="text-xs text-[var(--color-text-secondary)] mt-2 opacity-70">
                        {item.description}
                      </p>
                    )}
                    {(item.gpa || item.honors) && (
                      <div className="flex gap-3 mt-3">
                        {item.gpa && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-accent-red)]/10 text-[var(--color-accent-red)] font-mono">
                            GPA: {item.gpa}
                          </span>
                        )}
                        {item.honors && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-accent-gold)]/10 text-[var(--color-accent-gold)] font-mono">
                            {item.honors}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ─── RIGHT: Skills ─────────────────────────────────────────── */}
          <div className="space-y-8">
            {categories.map((category) => {
              const categorySkills = skills.filter(
                (s) => s.category === category
              );
              if (categorySkills.length === 0) return null;

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="text-sm font-mono text-[var(--color-accent-gold)] tracking-[0.2em] uppercase mb-4">
                    {category}
                  </h3>
                  <div className="space-y-3">
                    {categorySkills.map((skill, i) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        icon={skill.icon}
                        proficiency={skill.proficiency}
                        delay={i * 0.1}
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
