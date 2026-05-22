"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  headingReveal,
  staggerContainer,
  fadeInUp,
} from "@/animations/variants";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ui/ProjectCard";
import Button from "@/components/ui/Button";
import { Project } from "@/types";

/* ═══════════════════════════════════════════════════════════════════════════
   PROJECTS SECTION — Video Showcase Gallery
   
   Features:
   - 3D tilt hover cards with video-on-hover preview
   - AnimatePresence for smooth detail panel transitions
   - Category filter tabs
   - Expanded detail panel with video player and full project info
   - Staggered viewport entrance for all text elements
   ═══════════════════════════════════════════════════════════════════════════ */

// ─── CATEGORY FILTERS ─────────────────────────────────────────────────────────
const CATEGORIES = [
  { key: "all", label: "All Projects" },
  { key: "fullstack", label: "Full Stack" },
  { key: "frontend", label: "Frontend" },
  { key: "3d", label: "3D / WebGL" },
  { key: "ai", label: "AI / ML" },
  { key: "mobile", label: "Mobile" },
];

// ─── DETAIL PANEL VARIANTS ────────────────────────────────────────────────────
const detailOverlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 0.1 } },
};

const detailPanelVariants = {
  initial: { opacity: 0, y: 60, scale: 0.95, filter: "blur(8px)" },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    y: 30,
    scale: 0.97,
    filter: "blur(4px)",
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const detailChildVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
};

// ─── CATEGORY MAPS ───────────────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  frontend: "#00D4FF",
  fullstack: "#E8000D",
  mobile: "#8B5CF6",
  "3d": "#C9A84C",
  ai: "#10B981",
};

const CATEGORY_LABELS: Record<string, string> = {
  frontend: "Frontend",
  fullstack: "Full Stack",
  mobile: "Mobile",
  "3d": "3D / WebGL",
  ai: "AI / ML",
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedProject(null);
  }, []);

  // ESC key closes the detail panel
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleClose]);

  return (
    <section id="projects" className="section relative flex items-center py-24 md:py-0">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        {/* Section number — background */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.08 }}
          viewport={{ once: true }}
          className="absolute top-8 right-8 text-[10rem] font-bold font-[family-name:var(--font-racing)] text-white leading-none select-none hidden md:block"
        >
          05
        </motion.span>

        {/* ─── HEADING ────────────────────────────────────────────────── */}
        <motion.div
          variants={headingReveal}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-8"
        >
          <motion.span
            variants={fadeInUp}
            className="text-sm font-mono text-[var(--color-accent-red)] tracking-[0.3em] uppercase mb-4 block"
          >
            Portfolio
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The <span className="text-gradient-gold">Garage</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-4 text-lg text-[var(--color-text-secondary)] max-w-2xl"
          >
            Each project engineered with the precision of a GT3 RS. Hover to preview, click to explore.
          </motion.p>
        </motion.div>

        {/* ─── CATEGORY FILTER TABS ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`
                relative px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300
                ${
                  activeCategory === cat.key
                    ? "text-white"
                    : "text-[var(--color-text-secondary)] hover:text-white"
                }
              `}
              style={{
                backgroundColor:
                  activeCategory === cat.key
                    ? `${CATEGORY_COLORS[cat.key] || "#E8000D"}30`
                    : "var(--color-bg-elevated)",
                border: `1px solid ${
                  activeCategory === cat.key
                    ? `${CATEGORY_COLORS[cat.key] || "#E8000D"}50`
                    : "var(--color-border-subtle)"
                }`,
              }}
            >
              {cat.label}
              {/* Active indicator dot */}
              {activeCategory === cat.key && (
                <motion.div
                  layoutId="category-indicator"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ backgroundColor: CATEGORY_COLORS[cat.key] || "#E8000D" }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* ─── PROJECT GRID ───────────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <ProjectCard
                  project={project}
                  onClick={() => handleProjectClick(project)}
                  index={i}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ═══ DETAIL PANEL — AnimatePresence overlay ═══════════════════ */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key="detail-overlay"
            variants={detailOverlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            style={{ backgroundColor: "rgba(5, 5, 15, 0.85)", backdropFilter: "blur(12px)" }}
          >
            <motion.div
              key={`detail-${selectedProject.id}`}
              variants={detailPanelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] shadow-2xl"
              style={{
                borderColor: `${CATEGORY_COLORS[selectedProject.category] || "#E8000D"}30`,
                boxShadow: `0 0 80px ${CATEGORY_COLORS[selectedProject.category] || "#E8000D"}10`,
              }}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-white hover:border-[var(--color-accent-red)] transition-all duration-200"
              >
                ✕
              </button>

              {/* ─── VIDEO / HERO AREA ──────────────────────────────── */}
              <motion.div variants={detailChildVariants} className="relative">
                <div
                  className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${CATEGORY_COLORS[selectedProject.category] || "#E8000D"}15 0%, var(--color-bg-surface) 100%)`,
                  }}
                >
                  {selectedProject.video ? (
                    <>
                      <video
                        src={selectedProject.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-elevated)] via-transparent to-transparent" />
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-8xl font-bold font-[family-name:var(--font-racing)] text-white/5">
                        {selectedProject.title[0]}
                      </span>
                    </div>
                  )}

                  {/* Project index + category overlay */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span
                      className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs font-mono font-bold"
                      style={{ color: CATEGORY_COLORS[selectedProject.category] || "#E8000D" }}
                    >
                      #{String(projects.indexOf(selectedProject) + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="px-3 py-1 rounded-full backdrop-blur-sm text-xs font-mono tracking-wider uppercase"
                      style={{
                        backgroundColor: `${CATEGORY_COLORS[selectedProject.category] || "#E8000D"}20`,
                        color: CATEGORY_COLORS[selectedProject.category] || "#E8000D",
                        border: `1px solid ${CATEGORY_COLORS[selectedProject.category] || "#E8000D"}30`,
                      }}
                    >
                      {CATEGORY_LABELS[selectedProject.category] || selectedProject.category}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* ─── CONTENT ─────────────────────────────────────────── */}
              <div className="p-8 md:p-10">
                {/* Category & Title */}
                <motion.div variants={detailChildVariants}>
                  <span
                    className="text-xs font-mono tracking-[0.3em] uppercase mb-3 block"
                    style={{ color: CATEGORY_COLORS[selectedProject.category] || "#E8000D" }}
                  >
                    {CATEGORY_LABELS[selectedProject.category] || selectedProject.category}
                  </span>
                  <h3
                    className="text-3xl md:text-4xl font-bold mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {selectedProject.title}
                  </h3>
                </motion.div>

                {/* Description */}
                <motion.p
                  variants={detailChildVariants}
                  className="text-[var(--color-text-secondary)] mb-8 leading-relaxed text-base md:text-lg"
                >
                  {selectedProject.description}
                </motion.p>

                {/* Two-column layout for features & tech */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Features */}
                  <motion.div variants={detailChildVariants}>
                    <h4
                      className="text-sm font-mono tracking-wider mb-4 uppercase flex items-center gap-2"
                      style={{ color: CATEGORY_COLORS[selectedProject.category] || "#C9A84C" }}
                    >
                      <span className="w-6 h-[1px]" style={{ backgroundColor: CATEGORY_COLORS[selectedProject.category] || "#C9A84C" }} />
                      Key Features
                    </h4>
                    <ul className="space-y-3">
                      {selectedProject.features.map((f, i) => (
                        <motion.li
                          key={i}
                          variants={detailChildVariants}
                          className="text-sm text-[var(--color-text-secondary)] flex items-start gap-3"
                        >
                          <span
                            className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: CATEGORY_COLORS[selectedProject.category] || "#E8000D" }}
                          />
                          {f}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Tech Stack */}
                  <motion.div variants={detailChildVariants}>
                    <h4
                      className="text-sm font-mono tracking-wider mb-4 uppercase flex items-center gap-2"
                      style={{ color: CATEGORY_COLORS[selectedProject.category] || "#C9A84C" }}
                    >
                      <span className="w-6 h-[1px]" style={{ backgroundColor: CATEGORY_COLORS[selectedProject.category] || "#C9A84C" }} />
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-3 py-1.5 rounded-lg font-mono border transition-colors"
                          style={{
                            backgroundColor: "var(--color-bg-surface)",
                            borderColor: `${CATEGORY_COLORS[selectedProject.category] || "#E8000D"}20`,
                            color: "var(--color-text-secondary)",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Action buttons */}
                <motion.div variants={detailChildVariants} className="flex gap-3 pt-4 border-t border-[var(--color-border-subtle)]">
                  {selectedProject.liveUrl && (
                    <Button variant="primary" href={selectedProject.liveUrl}>
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        Live Demo
                      </span>
                    </Button>
                  )}
                  {selectedProject.githubUrl && (
                    <Button variant="ghost" href={selectedProject.githubUrl}>
                      GitHub →
                    </Button>
                  )}
                  <button
                    onClick={handleClose}
                    className="ml-auto text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors font-mono"
                  >
                    Close [ESC]
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
