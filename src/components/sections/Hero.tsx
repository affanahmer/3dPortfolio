"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const nameChars = "AFFAN AHMER".split("");

  // Animation variants for reveal
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const charVariants = {
    initial: { opacity: 0, y: -60, rotateX: -90 },
    animate: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const hudPulse = {
    animate: {
      y: [0, -4, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  const chevronAnim = {
    animate: {
      y: [0, 8, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-transparent select-none"
    >
      {/* ─── RED DIAGONAL HUD LINE ─── */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25 z-1">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="#E8000D" strokeWidth="1" />
      </svg>

      {/* ─── HUD LAYER (z:5) ─── */}
      <motion.div
        variants={hudPulse}
        animate="animate"
        className="absolute top-6 left-6 z-5 font-racing text-[13px] text-[#A0A0A0] tracking-[0.15em]"
      >
        0759
      </motion.div>
      <motion.div
        variants={hudPulse}
        animate="animate"
        className="absolute top-6 right-6 z-5 font-racing text-[13px] text-[#E8000D] tracking-[0.15em]"
      >
        312
      </motion.div>
      <motion.div
        variants={hudPulse}
        animate="animate"
        className="absolute bottom-6 left-6 z-5 font-racing text-[13px] text-[#A0A0A0] tracking-[0.15em]"
      >
        TO: INT
      </motion.div>
      <motion.div
        variants={hudPulse}
        animate="animate"
        className="absolute bottom-6 right-6 z-5 font-racing text-[13px] text-[#A0A0A0] tracking-[0.15em] flex items-center gap-1.5"
      >
        LAP 01
      </motion.div>

      {/* ─── CONTENT LAYER (z:10) ─── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-[12vh]">
        {/* Name — Split into individual chars */}
        <motion.h1
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="text-[clamp(3.5rem,9vw,8rem)] font-black tracking-[-0.02em] text-[#F5F5F5] leading-none select-none flex flex-wrap justify-center"
        >
          {nameChars.map((char, index) => (
            <motion.span
              key={index}
              variants={charVariants}
              className="inline-block origin-bottom transform-gpu"
              style={{ whiteSpace: char === " " ? "pre" : "normal" }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Role — Fade in with blur */}
        <motion.p
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-[13px] font-bold text-[#C0A060] tracking-[0.25em] mt-4"
        >
          CREATIVE DEVELOPER & ENGINEER
        </motion.p>

        {/* CTA Row */}
        <div className="flex flex-row gap-4 mt-10">
          <motion.button
            onClick={() => scrollToSection("projects")}
            whileHover={{ scale: 1.04, boxShadow: "0 0 50px rgba(232,0,13,0.7)" }}
            className="bg-[#E8000D] text-white px-[36px] py-[14px] font-bold text-[13px] font-racing tracking-[0.15em] rounded-[2px] shadow-[0_0_30px_rgba(232,0,13,0.5)] transition-shadow duration-300 cursor-pointer"
          >
            VIEW WORK
          </motion.button>
          <button
            onClick={() => scrollToSection("contact")}
            className="border border-[rgba(245,245,245,0.3)] text-[#F5F5F5] bg-transparent px-[36px] py-[14px] font-bold text-[13px] font-racing tracking-[0.15em] rounded-[2px] hover:border-[#F5F5F5] hover:bg-white/5 transition-all duration-300 cursor-pointer"
          >
            CONTACT
          </button>
        </div>
      </div>

      {/* ─── SCROLL INDICATOR (z:10) ─── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 cursor-pointer" onClick={() => scrollToSection("about")}>
        <span className="text-[11px] font-racing text-[#A0A0A0] tracking-[0.2em] font-medium">SCROLL</span>
        <motion.div variants={chevronAnim} animate="animate" className="text-[#A0A0A0] flex justify-center items-center">
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" className="stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 1L7 7L13 1" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
