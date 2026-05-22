"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Project } from "@/types";
import { cardEntrance } from "@/animations/variants";

/* ═══════════════════════════════════════════════════════════════════════════
   PROJECT CARD — 3D Hover Tilt + Video Preview
   
   Features:
   - useMotionValue tracks cursor position relative to card center
   - rotateX/rotateY transform creates a perspective 3D tilt effect
   - Video plays on hover, pauses on leave (preloaded, muted)
   - Glare/shine effect follows cursor for premium feel
   - Category badge in corner
   ═══════════════════════════════════════════════════════════════════════════ */

// ─── CATEGORY CONFIG ──────────────────────────────────────────────────────────
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

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index: number;
}

export default function ProjectCard({ project, onClick, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // ─── MOTION VALUES FOR 3D TILT ────────────────────────────────────────────
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring-damped rotation for smooth follow (not snappy)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 25,
  });

  // Glare position follows cursor
  const glareX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

  // ─── MOUSE HANDLERS ─────────────────────────────────────────────────────────
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    // Normalize to -0.5 to 0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Play video on hover
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked — silent fail
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    // Pause video
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const categoryColor = CATEGORY_COLORS[project.category] || "#E8000D";
  const categoryLabel = CATEGORY_LABELS[project.category] || project.category;

  return (
    <motion.div
      ref={cardRef}
      variants={cardEntrance}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className="group relative cursor-pointer"
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.02 : 1,
          y: isHovered ? -12 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] overflow-hidden transition-shadow duration-300"
        style={{
          boxShadow: isHovered
            ? `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${categoryColor}15`
            : "0 4px 20px rgba(0,0,0,0.3)",
          borderColor: isHovered ? `${categoryColor}40` : undefined,
        }}
      >
        {/* ─── VIDEO / IMAGE PREVIEW AREA ──────────────────────────────── */}
        <div className="relative h-52 overflow-hidden bg-[var(--color-bg-surface)]">
          {/* Static gradient background (always visible) */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${categoryColor}15 0%, transparent 60%)`,
            }}
          >
            <span className="text-6xl font-bold font-[family-name:var(--font-racing)] text-white/5 select-none">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Video preview — plays on hover */}
          {project.video && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <video
                ref={videoRef}
                src={project.video}
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
              {/* Video overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-elevated)] via-transparent to-transparent opacity-60" />
            </motion.div>
          )}

          {/* Glare / shine effect — follows cursor */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: useTransform(
                [glareX, glareY],
                ([x, y]) =>
                  `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.08) 0%, transparent 60%)`
              ),
            }}
          />

          {/* Category badge */}
          <div
            className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-mono font-medium tracking-wider uppercase backdrop-blur-sm"
            style={{
              backgroundColor: `${categoryColor}20`,
              color: categoryColor,
              border: `1px solid ${categoryColor}30`,
            }}
          >
            {categoryLabel}
          </div>

          {/* Play indicator on hover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isHovered && project.video ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm"
          >
            <div className="w-0 h-0 border-l-[6px] border-l-white border-y-[4px] border-y-transparent" />
            <span className="text-[10px] text-white/80 font-mono">PREVIEW</span>
          </motion.div>

          {/* Bottom accent line — draws on hover */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px]"
            style={{ backgroundColor: categoryColor, transformOrigin: "left" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* ─── CARD CONTENT ────────────────────────────────────────────── */}
        <div className="p-5" style={{ transform: "translateZ(20px)" }}>
          {/* Title with hover color shift */}
          <h3
            className="text-lg font-semibold mb-2 transition-colors duration-200"
            style={{ color: isHovered ? categoryColor : "var(--color-text-primary)" }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-[var(--color-text-secondary)] mb-4 line-clamp-2 leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Tech stack pills */}
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] font-mono border border-[var(--color-border-subtle)] transition-colors duration-200"
                style={{
                  borderColor: isHovered ? `${categoryColor}20` : undefined,
                }}
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span
                className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--color-bg-surface)] font-mono"
                style={{ color: categoryColor }}
              >
                +{project.techStack.length - 3}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
