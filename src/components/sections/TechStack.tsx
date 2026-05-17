"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { headingReveal, staggerContainer, fadeInUp, scaleIn } from "@/animations/variants";
import { skills } from "@/data/skills";
import { SkillCategory } from "@/types";

const categories: (SkillCategory | "All")[] = ["All","Languages","Frontend","Backend","DevOps","Tools","Design"];

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | "All">("All");
  const filteredSkills = activeCategory === "All" ? skills : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="techstack" className="section relative flex items-center py-24 md:py-0">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 0.08 }} viewport={{ once: true }}
          className="absolute top-8 right-8 text-[10rem] font-bold font-[family-name:var(--font-racing)] text-white leading-none select-none hidden md:block">04</motion.span>

        <motion.div variants={headingReveal} initial="initial" whileInView="animate" viewport={{ once: true }} className="mb-12">
          <span className="text-sm font-mono text-[var(--color-accent-red)] tracking-[0.3em] uppercase mb-4 block">Technologies</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
            Tech <span className="text-gradient-gold">Arsenal</span>
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`relative px-4 py-2 text-sm rounded-lg font-mono tracking-wider transition-colors ${activeCategory === cat ? "text-white" : "text-[var(--color-text-secondary)] hover:text-white"}`}>
              {activeCategory === cat && (
                <motion.div layoutId="active-tab" className="absolute inset-0 bg-[var(--color-accent-red)] rounded-lg" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </motion.div>

        <LayoutGroup>
          <motion.div layout variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => (
                <motion.div key={skill.name} layout variants={scaleIn} initial="initial" animate="animate"
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                  whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
                  className="tech-icon group relative flex flex-col items-center gap-3 p-5 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] cursor-pointer transition-shadow hover:shadow-[0_0_30px_rgba(232,0,13,0.2)] hover:border-[rgba(232,0,13,0.3)]">
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[var(--color-bg-surface)] text-xl font-bold font-mono text-[var(--color-accent-gold)] group-hover:text-[var(--color-accent-red)] transition-colors">
                    {skill.icon}
                  </div>
                  <span className="text-xs text-[var(--color-text-secondary)] text-center font-medium group-hover:text-white transition-colors">{skill.name}</span>
                  <span className="text-[10px] font-mono text-[var(--color-accent-red)] opacity-0 group-hover:opacity-100 transition-opacity">{skill.proficiency}%</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}
