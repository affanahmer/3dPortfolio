"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { headingReveal, staggerContainer, cardEntrance } from "@/animations/variants";
import { projects } from "@/data/projects";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { Project } from "@/types";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="section relative flex items-center py-24 md:py-0">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 0.08 }} viewport={{ once: true }}
          className="absolute top-8 right-8 text-[10rem] font-bold font-[family-name:var(--font-racing)] text-white leading-none select-none hidden md:block">05</motion.span>

        <motion.div variants={headingReveal} initial="initial" whileInView="animate" viewport={{ once: true }} className="mb-12">
          <span className="text-sm font-mono text-[var(--color-accent-red)] tracking-[0.3em] uppercase mb-4 block">Portfolio</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
            The <span className="text-gradient-gold">Garage</span>
          </h2>
        </motion.div>

        <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div key={project.id} variants={cardEntrance}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] overflow-hidden transition-shadow hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] hover:border-[rgba(232,0,13,0.3)]">
              {/* Image placeholder */}
              <div className="relative h-48 bg-[var(--color-bg-surface)] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-red)]/20 to-[var(--color-accent-blue)]/10 flex items-center justify-center">
                  <span className="text-4xl font-bold font-[family-name:var(--font-racing)] text-white/10">{project.title[0]}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--color-accent-red)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-4 line-clamp-2">{project.shortDescription}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span key={tech} className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] font-mono">{tech}</span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-bg-surface)] text-[var(--color-accent-red)] font-mono">+{project.techStack.length - 3}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Modal */}
      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
        {selectedProject && (
          <div className="p-8">
            <div className="h-48 bg-[var(--color-bg-surface)] rounded-xl mb-6 flex items-center justify-center">
              <span className="text-6xl font-bold font-[family-name:var(--font-racing)] text-white/10">{selectedProject.title[0]}</span>
            </div>
            <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "var(--font-display)" }}>{selectedProject.title}</h3>
            <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">{selectedProject.description}</p>
            <div className="mb-6">
              <h4 className="text-sm font-mono text-[var(--color-accent-gold)] tracking-wider mb-3 uppercase">Features</h4>
              <ul className="space-y-2">
                {selectedProject.features.map((f, i) => (
                  <li key={i} className="text-sm text-[var(--color-text-secondary)] flex items-start gap-2">
                    <span className="text-[var(--color-accent-red)] mt-1">▸</span>{f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-8">
              <h4 className="text-sm font-mono text-[var(--color-accent-gold)] tracking-wider mb-3 uppercase">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map((tech) => (
                  <span key={tech} className="text-xs px-3 py-1 rounded-full bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] font-mono border border-[var(--color-border-subtle)]">{tech}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              {selectedProject.liveUrl && <Button variant="primary" href={selectedProject.liveUrl}>Live Demo</Button>}
              {selectedProject.githubUrl && <Button variant="ghost" href={selectedProject.githubUrl}>GitHub</Button>}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
