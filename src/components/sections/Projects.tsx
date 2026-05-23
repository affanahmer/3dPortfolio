"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, MotionValue, useTransform } from "framer-motion";
import { projects } from "@/data/projects";
import { Project } from "@/types";
import Image from "next/image";

interface ProjectsProps {
  scrollYProgress: MotionValue<number>;
}

export default function Projects({ scrollYProgress }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Map scroll progress to Projects section visibility
  // Projects is active during 45% - 75% scroll.
  // Fades in from 45% -> 53%, stays till 70%, fades out 70% -> 75%
  const opacity = useTransform(scrollYProgress, [0.45, 0.53, 0.70, 0.75], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.45, 0.53, 0.70, 0.75], [60, 0, 0, -60]);
  const scale = useTransform(scrollYProgress, [0.45, 0.53, 0.70, 0.75], [0.97, 1, 1, 0.97]);

  // Handle pointer-events dynamically to let clicks pass through when faded out
  const pointerEvents = useTransform(scrollYProgress, (pos) => pos >= 0.45 && pos <= 0.75 ? "auto" : "none");

  return (
    <motion.div
      style={{ opacity, y, scale, pointerEvents }}
      className="absolute inset-0 flex items-center justify-center p-6 bg-transparent"
    >
      <div className="w-full max-w-[1180px] mx-auto flex flex-col justify-center max-h-[85vh]">
        
        {/* ─── SECTION NUMBER TAG ─── */}
        <span className="text-[10px] font-racing text-accent-cyan tracking-[0.25em] uppercase text-left">
          02 / GARAGE
        </span>

        <div className="w-full flex flex-col mt-4">
          {/* Section Heading */}
          <div className="relative text-left">
            <h2 className="text-3xl font-extrabold text-[#F5F5F5] font-display mb-3 leading-none">
              THE GARAGE.
            </h2>
            
            {/* Gradient accent line under heading */}
            <div className="w-[50px] h-[3px] bg-gradient-to-r from-accent-cyan to-accent-violet mb-6 rounded-[1px]" />
          </div>

          {/* Categories Tab Row */}
          <div className="flex flex-row flex-wrap gap-2 mb-8">
            {["all", "fullstack", "frontend", "3d", "ai", "mobile"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 border rounded-[2px] font-racing font-medium text-[11px] tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? "border-accent-cyan text-white bg-accent-cyan/5"
                    : "border-white/5 text-text-secondary hover:text-white hover:border-white/20"
                }`}
              >
                {cat === "all" ? "All Projects" : cat === "3d" ? "3D / WebGL" : cat === "ai" ? "AI / ML" : cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full overflow-y-auto pr-1 max-h-[50vh] custom-scrollbar">
            {filteredProjects.map((project, idx) => {
              const formattedIdx = String(idx + 1).padStart(2, "0");
              return (
                <motion.div
                  key={project.id}
                  layoutId={`card-container-${project.id}`}
                  whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.2 } }}
                  className="bg-[#070708] border border-white/5 rounded-[2px] overflow-hidden flex flex-col group glass hover:border-accent-cyan/30"
                >
                  {/* Image Area */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/40">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      unoptimized
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-300 z-10">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="bg-accent-cyan text-black px-5 py-2 font-racing font-bold text-xs tracking-wider rounded-[2px] cursor-pointer hover:bg-white transition-colors"
                      >
                        DETAILS
                      </button>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border border-white/10 text-white px-5 py-2 font-racing font-bold text-xs tracking-wider rounded-[2px] hover:border-accent-cyan hover:bg-accent-cyan/5 transition-all"
                        >
                          LIVE ↗
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Info Panel */}
                  <div className="p-5 bg-[#070708] flex flex-col flex-1 border-t border-white/5">
                    <span className="font-racing text-[10px] text-accent-cyan font-bold tracking-widest block">
                      {formattedIdx}
                    </span>
                    <h3 className="text-[16px] font-semibold text-white mt-1 leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-[12px] text-text-secondary mt-1.5 leading-relaxed flex-1">
                      {project.shortDescription || project.description}
                    </p>
                    
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1 mt-4">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 bg-[#0f0f12] border border-white/5 rounded-[2px] font-racing font-medium text-[9px] text-text-secondary tracking-wider"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ─── DETAIL MODAL ─── */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              {/* Dark blur overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-[10px]"
              />

              {/* Modal Box */}
              <motion.div
                layoutId={`card-container-${selectedProject.id}`}
                className="relative w-full max-w-[850px] bg-[#070708] border border-white/10 rounded-[2px] overflow-hidden flex flex-col md:flex-row z-10 shadow-2xl glass"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-50 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 hover:bg-accent-violet text-white transition-colors cursor-pointer"
                >
                  ×
                </button>

                {/* Left 50% — Video / Image Showcase */}
                <div className="w-full md:w-1/2 aspect-video md:aspect-auto bg-black flex items-center justify-center relative overflow-hidden">
                  {selectedProject.video ? (
                    <video
                      src={selectedProject.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  ) : null}
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="absolute inset-0 w-full h-full object-cover -z-1"
                    unoptimized
                  />
                </div>

                {/* Right 50% — Info details */}
                <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center bg-[#070708] border-t md:border-t-0 md:border-l border-white/5">
                  <span className="font-racing text-[10px] text-accent-cyan font-bold tracking-widest mb-1">
                    PROJECT SPECIFICATION
                  </span>
                  <h3 className="text-xl font-bold text-white leading-tight mb-4">
                    {selectedProject.title}
                  </h3>
                  <p className="text-[12px] text-text-secondary leading-relaxed mb-6">
                    {selectedProject.description}
                  </p>

                  {/* Features List */}
                  <div className="mb-6">
                    <h4 className="font-racing text-[10px] text-accent-violet font-bold tracking-wider mb-2 uppercase">
                      KEY PERFORMANCE FEATURES
                    </h4>
                    <ul className="flex flex-col gap-1.5">
                      {selectedProject.features?.map((feature, i) => (
                        <li
                          key={i}
                          className="text-[11px] text-text-secondary flex items-start gap-2"
                        >
                          <span className="text-accent-cyan font-bold mt-0.5">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1 mb-6">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-[#0f0f12] border border-white/5 rounded-[2px] font-racing font-medium text-[9px] text-text-secondary tracking-wider uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex flex-row gap-3">
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-accent-cyan text-black px-5 py-2.5 font-racing font-bold text-xs tracking-wider rounded-[2px] text-center hover:bg-white transition-colors"
                      >
                        LIVE DEPLOY ↗
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-white/10 text-white px-5 py-2.5 font-racing font-bold text-xs tracking-wider rounded-[2px] text-center hover:border-accent-cyan hover:bg-accent-cyan/5 transition-all"
                      >
                        SOURCE CODE
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
