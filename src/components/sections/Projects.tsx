"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import { Project } from "@/types";
import Image from "next/image";

export default function Projects() {
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

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full flex items-center justify-center py-[120px] px-6 md:px-20 max-w-[1280px] mx-auto bg-[#0A0A0A] overflow-hidden"
    >
      {/* ─── SECTION NUMBER TAG ─── */}
      <span className="absolute top-6 left-6 md:left-20 font-racing text-[11px] text-[#A0A0A0] tracking-[0.2em]">
        05 / GARAGE
      </span>

      <div className="w-full flex flex-col mt-8">
        {/* Section Heading */}
        <div className="relative">
          <motion.h2
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold text-[#F5F5F5] mb-4 leading-none"
          >
            THE GARAGE
          </motion.h2>
          
          {/* Red accent line under heading */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{ transformOrigin: "left" }}
            className="w-[60px] h-[3px] bg-[#E8000D] mb-[64px]"
          />
        </div>

        {/* Categories Tab Row */}
        <div className="flex flex-row flex-wrap gap-2 mb-10">
          {["all", "fullstack", "frontend", "3d", "ai", "mobile"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 border rounded-[2px] font-racing font-medium text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? "border-[#E8000D] text-[#F5F5F5] bg-[#E8000D]/5"
                  : "border-[#2A2A2A] text-[#A0A0A0] hover:text-[#F5F5F5] hover:border-[#F5F5F5]/30"
              }`}
            >
              {cat === "all" ? "All Projects" : cat === "3d" ? "3D / WebGL" : cat === "ai" ? "AI / ML" : cat}
            </button>
          ))}
        </div>

        {/* Projects Grid (3 cols on desktop, 1 col on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {filteredProjects.map((project, idx) => {
            const formattedIdx = String(idx + 1).padStart(2, "0");
            return (
              <motion.div
                key={project.id}
                layoutId={`card-container-${project.id}`}
                whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
                className="bg-[#111111] border border-[#2A2A2A] rounded-[4px] overflow-hidden flex flex-col group"
              >
                {/* Image Area with 16/10 aspect ratio */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/40">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                    onError={(e) => {
                      // Fallback visual if image doesn't exist
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-[#0A0A0A]/85 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-300 z-10">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="bg-[#E8000D] text-white px-5 py-2 font-racing font-bold text-xs tracking-wider rounded-[2px] cursor-pointer hover:bg-[#ff1a1a] transition-colors"
                    >
                      DETAILS
                    </button>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-[#2A2A2A] text-[#F5F5F5] px-5 py-2 font-racing font-bold text-xs tracking-wider rounded-[2px] hover:border-[#F5F5F5] hover:bg-white/5 transition-all"
                      >
                        LIVE ↗
                      </a>
                    )}
                  </div>
                </div>

                {/* Info Panel */}
                <div className="p-[20px] md:p-[24px] bg-[#111111] flex flex-col flex-1 border-t border-[#2A2A2A]/40">
                  <span className="font-racing text-[11px] text-[#E8000D] font-bold tracking-widest block">
                    {formattedIdx}
                  </span>
                  <h3 className="text-[18px] font-semibold text-[#F5F5F5] mt-1 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-[13px] text-[#A0A0A0] mt-1.5 leading-relaxed flex-1">
                    {project.shortDescription || project.description}
                  </p>
                  
                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-[2px] font-racing font-medium text-[10px] text-[#A0A0A0] tracking-wider"
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

      {/* ─── DETAIL MODAL (AnimatePresence) ─── */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Dark blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-[8px]"
            />

            {/* Modal Box */}
            <motion.div
              layoutId={`card-container-${selectedProject.id}`}
              className="relative w-full max-w-[900px] bg-[#111111] border border-[#2A2A2A] rounded-[4px] overflow-hidden flex flex-col md:flex-row z-10 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 hover:bg-[#E8000D] text-white hover:text-white transition-colors cursor-pointer"
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
                      // If video fails, fallback to image
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
              <div className="w-full md:w-1/2 p-[40px] flex flex-col justify-center bg-[#111111]">
                <span className="font-racing text-[11px] text-[#E8000D] font-bold tracking-widest mb-1.5">
                  PROJECT SPECIFICATION
                </span>
                <h3 className="text-2xl font-bold text-[#F5F5F5] leading-tight mb-4">
                  {selectedProject.title}
                </h3>
                <p className="text-[13px] text-[#A0A0A0] leading-relaxed mb-6">
                  {selectedProject.description}
                </p>

                {/* Features List */}
                <div className="mb-6">
                  <h4 className="font-racing text-[11px] text-[#C0A060] font-bold tracking-wider mb-2">
                    KEY PERFORMANCE FEATURES
                  </h4>
                  <ul className="flex flex-col gap-1.5">
                    {selectedProject.features?.map((feature, i) => (
                      <li
                        key={i}
                        className="text-[12px] text-[#A0A0A0] flex items-start gap-2"
                      >
                        <span className="text-[#E8000D] font-bold mt-0.5">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-[2px] font-racing font-medium text-[10px] text-[#A0A0A0] tracking-wider uppercase"
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
                      className="bg-[#E8000D] text-white px-6 py-2.5 font-racing font-bold text-xs tracking-wider rounded-[2px] text-center hover:bg-[#ff1a1a] transition-colors"
                    >
                      LIVE DEPLOY ↗
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-[#2A2A2A] text-[#F5F5F5] px-6 py-2.5 font-racing font-bold text-xs tracking-wider rounded-[2px] text-center hover:border-[#F5F5F5] hover:bg-white/5 transition-all"
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
    </section>
  );
}
