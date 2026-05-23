"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "@/data/skills";
import { SkillCategory } from "@/types";
import { useFloat } from "@/hooks/useFloat";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const categories: (SkillCategory | "All")[] = [
  "All",
  "Languages",
  "Frontend",
  "Backend",
  "DevOps",
  "Tools",
  "Design",
];

// Helper wrapper to apply useFloat inside map
// Helper wrapper to apply useFloat inside map
function FloatingCardWrapper({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const floatAnim = useFloat(index, cardRef);
  return (
    <motion.div
      ref={cardRef}
      animate={floatAnim.animate}
      transition={floatAnim.transition}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | "All">("All");
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  // GSAP scroll trigger rain-in effect on active tab filter change
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".tech-icon-container");
      if (cards && cards.length > 0) {
        gsap.killTweensOf(cards);
        gsap.fromTo(
          cards,
          { y: -100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: {
              each: 0.06,
              from: "random",
            },
            ease: "power3.out",
            overwrite: "auto",
          }
        );
      }
    }, gridRef);

    return () => ctx.revert();
  }, [activeCategory]);

  // Initial scroll-enter GSAP trigger
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".tech-icon-container");
      if (cards && cards.length > 0) {
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.fromTo(
              cards,
              { y: -100, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: {
                  each: 0.06,
                  from: "random",
                },
                ease: "power3.out",
                overwrite: "auto",
              }
            );
          },
        });
      }
    }, gridRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="techstack"
      className="relative min-h-screen w-full flex items-center justify-center py-[120px] px-6 md:px-20 max-w-[1280px] mx-auto bg-[#0D0D0D] border-x border-[#1A1A1A]/40 overflow-hidden"
    >
      {/* ─── SECTION NUMBER TAG ─── */}
      <span className="absolute top-6 left-6 md:left-20 font-racing text-[11px] text-[#A0A0A0] tracking-[0.2em]">
        04 / ARSENAL
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
            TECH ARSENAL
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

        {/* Category Filter Tabs */}
        <div className="flex flex-row flex-wrap gap-2 mb-10 max-w-[900px] mx-auto w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-5 py-2 border rounded-[2px] font-racing font-medium text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? "border-[#E8000D] text-[#F5F5F5] bg-[#E8000D]/5"
                  : "border-[#2A2A2A] text-[#A0A0A0] hover:text-[#F5F5F5] hover:border-[#F5F5F5]/30"
              }`}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="active-tech-tab"
                  className="absolute inset-0 bg-[#E8000D]/10 rounded-[2px] -z-1"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {cat}
            </button>
          ))}
        </div>

        {/* Tech Grid (Max-width 900px, Centered, Auto-fill) */}
        <LayoutGroup>
          <div
            ref={gridRef}
            className="w-full max-w-[900px] mx-auto grid gap-4 justify-items-center"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))" }}
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="tech-icon-container w-[100px] h-[100px]"
                >
                  <FloatingCardWrapper index={index}>
                    <motion.div
                      layout
                      whileHover={{
                        borderColor: "#E8000D",
                        boxShadow: "0 0 20px rgba(232,0,13,0.25)",
                        scale: 1.08,
                      }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="w-[100px] h-[100px] bg-[#111111] border border-[#2A2A2A] rounded-[4px] flex flex-col items-center justify-center gap-2 cursor-pointer select-none group"
                    >
                      {/* Icon Container */}
                      <div className="w-9 h-9 flex items-center justify-center text-[22px] text-[#C0A060] group-hover:text-[#E8000D] transition-colors duration-300">
                        {skill.icon}
                      </div>
                      {/* Label */}
                      <span className="font-racing font-semibold text-[11px] text-[#A0A0A0] tracking-[0.1em] text-center px-1 leading-tight group-hover:text-[#F5F5F5] transition-colors duration-300">
                        {skill.name}
                      </span>
                    </motion.div>
                  </FloatingCardWrapper>
                </div>
              ))}
            </AnimatePresence>
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
}
