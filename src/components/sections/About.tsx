"use client";

import React, { useState, useEffect } from "react";
import { motion, MotionValue, useTransform, AnimatePresence } from "framer-motion";
import { education } from "@/data/education";
import { skills } from "@/data/skills";

interface AboutProps {
  scrollYProgress: MotionValue<number>;
}

interface StatCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  trigger: boolean;
}

function Counter({ value, suffix = "", duration = 1.5, trigger }: StatCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) {
      setCount(0);
      return;
    }
    let start = 0;
    const end = value;
    const totalMilliseconds = duration * 1000;
    const stepTime = Math.max(Math.floor(totalMilliseconds / end), 12);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / 80); // Step increment
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, duration, trigger]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function About({ scrollYProgress }: AboutProps) {
  const [activeTab, setActiveTab] = useState<"arsenal" | "logbook">("arsenal");

  // About is active from 20% to 45% scroll
  // Fades in from 20% -> 28%, stays till 40%, fades out 40% -> 45%
  const opacity = useTransform(scrollYProgress, [0.20, 0.28, 0.40, 0.45], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.20, 0.28, 0.40, 0.45], [60, 0, 0, -60]);
  const scale = useTransform(scrollYProgress, [0.20, 0.28, 0.40, 0.45], [0.97, 1, 1, 0.97]);

  // Handle pointer-events dynamically to let clicks pass through when faded out
  const pointerEvents = useTransform(scrollYProgress, (pos) => pos >= 0.20 && pos <= 0.45 ? "auto" : "none");

  // Trigger counters when section is visible
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  
  useTransform(scrollYProgress, (pos) => {
    const visible = pos >= 0.24 && pos <= 0.43;
    if (visible !== isSectionVisible) {
      setIsSectionVisible(visible);
    }
    return pos;
  });

  const stats = [
    { label: "Years Experience", value: 6, suffix: "+" },
    { label: "Projects Shipped", value: 40, suffix: "+" },
    { label: "Lines of Code", value: 500, suffix: "K+" },
    { label: "Coffees Consumed", value: 3000, suffix: "+" },
  ];

  const aboutText =
    "I build digital experiences that feel engineered, not assembled. Every pixel, every interaction, every line of code — precision-crafted like a GT3 RS on the Nordschleife.";

  return (
    <motion.div
      style={{ opacity, y, scale, pointerEvents }}
      className="absolute inset-0 flex items-center justify-center p-6 bg-transparent"
    >
      <div className="w-full max-w-[1180px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
        
        {/* ─── LEFT COLUMN: DRIVER PROFILE (5 Cols) ─── */}
        <div className="md:col-span-5 flex flex-col text-left">
          <span className="text-[10px] font-racing text-accent-cyan tracking-[0.25em] uppercase">01 / DRIVER PROFILE</span>
          <h2 className="text-3xl font-extrabold text-[#F5F5F5] font-display mt-2 mb-4 leading-tight tracking-tight">
            PRECISION ENGINEERING.
          </h2>
          
          {/* Neon accent bar */}
          <div className="w-[50px] h-[3px] bg-gradient-to-r from-accent-cyan to-accent-violet mb-6 rounded-[1px]" />
          
          <p className="text-[14px] text-text-secondary leading-relaxed mb-6">
            {aboutText}
          </p>
          <p className="text-[13px] text-text-secondary/70 leading-relaxed mb-8">
            With a background in mechanical engineering and a passion for design, I approach
            software development with an analytical mind and a creative soul. Reaching the apex of
            each project means ensuring perfect execution from core queries up to visual layouts.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div 
                key={stat.label}
                className="bg-[#070708] border border-white/5 rounded-[2px] p-4 text-left glass hover:border-accent-cyan/35 transition-colors duration-300"
              >
                <div className="text-xl md:text-2xl font-bold font-racing text-accent-cyan mb-1">
                  <Counter value={stat.value} suffix={stat.suffix} trigger={isSectionVisible} />
                </div>
                <span className="text-[9px] text-text-secondary uppercase tracking-widest font-racing leading-none">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── RIGHT COLUMN: INTERACTIVE COCKPIT TAB (7 Cols) ─── */}
        <div className="md:col-span-7 flex flex-col h-[400px] md:h-[480px] justify-start">
          
          {/* Tab Selection Headers */}
          <div className="flex gap-4 border-b border-white/5 pb-3 mb-6">
            <button
              onClick={() => setActiveTab("arsenal")}
              className={`font-racing font-bold text-xs tracking-[0.2em] uppercase pb-1 border-b-2 transition-all duration-300 cursor-pointer ${
                activeTab === "arsenal" ? "border-accent-cyan text-white" : "border-transparent text-text-secondary hover:text-white"
              }`}
            >
              TECHNICAL ARSENAL
            </button>
            <button
              onClick={() => setActiveTab("logbook")}
              className={`font-racing font-bold text-xs tracking-[0.2em] uppercase pb-1 border-b-2 transition-all duration-300 cursor-pointer ${
                activeTab === "logbook" ? "border-accent-violet text-white" : "border-transparent text-text-secondary hover:text-white"
              }`}
            >
              LOGBOOK TIMELINE
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence mode="wait">
              {activeTab === "arsenal" ? (
                <motion.div
                  key="arsenal"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-3 md:grid-cols-4 gap-3"
                >
                  {skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="bg-[#070708] border border-white/5 rounded-[2px] p-3 flex flex-col items-center justify-center gap-2 glass hover:border-accent-cyan/40 hover:shadow-[0_0_12px_rgba(0,240,255,0.1)] transition-all duration-300 group"
                    >
                      <div className="w-8 h-8 flex items-center justify-center text-[18px] text-accent-cyan/85 group-hover:text-accent-cyan transition-colors">
                        {typeof skill.icon === "string" ? skill.icon : "◆"}
                      </div>
                      <span className="font-racing font-semibold text-[10px] text-text-secondary tracking-[0.1em] text-center px-1 leading-tight group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="logbook"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                  className="relative pl-6 flex flex-col gap-8 border-l border-white/10"
                >
                  {education.map((item) => (
                    <div key={item.id} className="relative text-left">
                      
                      {/* Glowing Node Marker */}
                      <div className="absolute left-[-29px] top-[4px] w-[9px] h-[9px] rounded-full bg-accent-violet border border-black shadow-[0_0_8px_rgba(173,0,255,0.7)]" />
                      
                      <span className="font-racing text-[11px] text-accent-cyan/80 uppercase tracking-widest block leading-none">
                        {item.year}
                      </span>
                      <h4 className="text-[15px] font-bold text-white mt-1.5 leading-snug">
                        {item.institution}
                      </h4>
                      <p className="text-[13px] text-text-secondary mt-0.5">
                        {item.degree}
                      </p>
                      {item.description && (
                        <p className="text-[11px] text-text-secondary/50 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                      
                      {(item.gpa || item.honors) && (
                        <div className="flex gap-2 mt-2">
                          {item.gpa && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-[2px] bg-accent-cyan/5 text-accent-cyan border border-accent-cyan/15">
                              GPA: {item.gpa}
                            </span>
                          )}
                          {item.honors && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-[2px] bg-accent-violet/5 text-accent-violet border border-accent-violet/15">
                              {item.honors}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
