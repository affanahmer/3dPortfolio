"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { education } from "@/data/education";
import { skills } from "@/data/skills";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const categories = [
  "Languages",
  "Frontend",
  "Backend",
  "DevOps",
  "Tools",
  "Design",
];

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  const verticalLineRef = useRef<HTMLDivElement>(null);
  const timelineNodesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP ScrollTrigger Animations
    const ctx = gsap.context(() => {
      // 1. Timeline vertical line scaleY: 0 -> 1
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 80%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        verticalLineRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 1.2, ease: "power2.out" }
      );

      // 2. Timeline nodes reveal sequentially
      if (timelineNodesRef.current) {
        const nodes = timelineNodesRef.current.querySelectorAll(".timeline-node-container");
        tl.to(
          nodes,
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.5, ease: "power2.out" },
          "-=0.8"
        );
      }

      // 3. Skill bars fill scaleX: 0 -> 1
      const skillRows = containerRef.current?.querySelectorAll(".skill-row");
      if (skillRows && skillRows.length > 0) {
        skillRows.forEach((row) => {
          const fill = row.querySelector(".skill-bar-fill");
          const targetVal = row.getAttribute("data-proficiency");
          
          gsap.fromTo(
            fill,
            { scaleX: 0 },
            {
              scaleX: Number(targetVal) / 100,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: row,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      id="education"
      className="relative min-h-screen w-full flex items-center justify-center py-[120px] px-6 md:px-20 max-w-[1280px] mx-auto bg-[#0A0A0A] overflow-hidden"
    >
      {/* ─── SECTION NUMBER TAG ─── */}
      <span className="absolute top-6 left-6 md:left-20 font-racing text-[11px] text-[#A0A0A0] tracking-[0.2em]">
        03 / CREDENTIALS
      </span>

      <div ref={containerRef} className="w-full flex flex-col mt-8">
        {/* Section Heading */}
        <div className="relative">
          <motion.h2
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold text-[#F5F5F5] mb-4 leading-none"
          >
            EDUCATION & SKILLS
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

        {/* Two-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-[80px] items-start">
          {/* ─── LEFT COLUMN: Education Timeline ─── */}
          <div className="relative min-h-[500px]">
            {/* Vertical timeline line */}
            <div
              ref={verticalLineRef}
              className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#2A2A2A] origin-top"
            />

            <div ref={timelineNodesRef} className="flex flex-col gap-12">
              {education.map((item) => (
                <div
                  key={item.id}
                  className="relative timeline-node-container opacity-0 translate-y-4 pl-8"
                >
                  {/* Node Dot centered exactly on the 2px line */}
                  <div className="absolute left-[-5px] top-[6px] w-[10px] h-[10px] rounded-full bg-[#E8000D] border border-black shadow-[0_0_8px_rgba(232,0,13,0.8)]" style={{ left: "-5px" }} />
                  
                  {/* Content */}
                  <div>
                    <span className="font-racing text-[12px] text-[#C0A060] uppercase tracking-wider block">
                      {item.year}
                    </span>
                    <h4 className="text-[16px] font-bold text-[#F5F5F5] mt-1 leading-tight">
                      {item.institution}
                    </h4>
                    <p className="text-[14px] text-[#A0A0A0] mt-1">
                      {item.degree}
                    </p>
                    {item.description && (
                      <p className="text-xs text-[#A0A0A0]/60 mt-1.5 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                    {(item.gpa || item.honors) && (
                      <div className="flex gap-2.5 mt-2.5">
                        {item.gpa && (
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded-[2px] bg-[#E8000D]/10 text-[#E8000D] border border-[#E8000D]/20">
                            GPA: {item.gpa}
                          </span>
                        )}
                        {item.honors && (
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded-[2px] bg-[#C0A060]/10 text-[#C0A060] border border-[#C0A060]/20">
                            {item.honors}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── RIGHT COLUMN: Skills ─── */}
          <div className="w-full overflow-hidden flex flex-col gap-10">
            {categories.map((category) => {
              const categorySkills = skills.filter(
                (s) => s.category === category
              );
              if (categorySkills.length === 0) return null;

              return (
                <div key={category} className="flex flex-col">
                  {/* Category label */}
                  <h3 className="text-[11px] font-bold text-[#C0A060] tracking-[0.15em] uppercase mb-4">
                    {category}
                  </h3>

                  {/* Skills rows */}
                  <div className="flex flex-col gap-5">
                    {categorySkills.map((skill) => (
                      <div
                        key={skill.name}
                        className="skill-row flex flex-row items-center w-full"
                        data-proficiency={skill.proficiency}
                      >
                        {/* Name left */}
                        <span className="text-[13px] font-medium text-[#F5F5F5] w-32 shrink-0">
                          {skill.name}
                        </span>

                        {/* Bar container */}
                        <div className="flex-1 h-[2px] bg-[#1A1A1A] rounded-[1px] overflow-hidden mx-4 relative">
                          <div
                            className="skill-bar-fill h-full bg-[#E8000D] rounded-[1px] origin-left"
                            style={{ transform: "scaleX(0)" }}
                          />
                        </div>

                        {/* Percentage right */}
                        <span className="text-[12px] font-mono text-[#A0A0A0] w-12 text-right shrink-0">
                          {skill.proficiency}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
