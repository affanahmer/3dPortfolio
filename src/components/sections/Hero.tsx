"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { useLenis } from "@/hooks/useLenis";

interface HeroProps {
  scrollYProgress: MotionValue<number>;
}

export default function Hero({ scrollYProgress }: HeroProps) {
  const { scrollTo } = useLenis();
  const nameChars = "AFFAN AHMER".split("");

  // Map scroll progress to Hero opacity, vertical displacement, scale, and pointer-events
  // Hero is active during 0% - 20% scroll. Fades out between 12% and 20%.
  const opacity = useTransform(scrollYProgress, [0.12, 0.20], [1, 0]);
  const y = useTransform(scrollYProgress, [0.12, 0.20], [0, -60]);
  const scale = useTransform(scrollYProgress, [0.12, 0.20], [1, 0.96]);

  // Disable pointer interactions when faded out to let underlying components receive events
  const pointerEvents = useTransform(scrollYProgress, (pos) => pos <= 0.20 ? "auto" : "none");

  // Grid line fading out
  const lineOpacity = useTransform(scrollYProgress, [0, 0.10], [0.2, 0]);

  // Scroll indicator at the bottom (fades out very quickly)
  const chevronOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

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

  return (
    <motion.div 
      style={{ opacity, y, scale, pointerEvents }}
      className="absolute inset-0 flex flex-col justify-center items-center overflow-hidden p-6 bg-transparent"
    >
      
      {/* ─── CYBER DIAGONAL GRID ACCENT ─── */}
      <motion.svg 
        style={{ opacity: lineOpacity }}
        className="absolute inset-0 w-full h-full pointer-events-none z-1"
      >
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="#00F0FF" strokeWidth="1" />
      </motion.svg>

      {/* ─── CONTENT CONTAINER ─── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center pt-[8vh]">
        {/* Name — Split into individual characters */}
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

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-[12px] font-bold text-accent-cyan tracking-[0.3em] mt-4 uppercase"
        >
          CREATIVE DEVELOPER & ENGINEER
        </motion.p>

        {/* CTA Buttons */}
        <div className="flex flex-row gap-4 mt-10">
          <motion.button
            onClick={() => scrollTo("#garage-anchor")}
            whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(0,240,255,0.6)" }}
            className="bg-accent-cyan text-black px-[36px] py-[14px] font-bold text-[13px] font-racing tracking-[0.15em] rounded-[2px] transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.3)]"
          >
            VIEW GARAGE
          </motion.button>
          <button
            onClick={() => scrollTo("#outro-anchor")}
            className="border border-white/20 text-[#F5F5F5] bg-transparent px-[36px] py-[14px] font-bold text-[13px] font-racing tracking-[0.15em] rounded-[2px] hover:border-accent-cyan hover:bg-accent-cyan/5 transition-all duration-300 cursor-pointer"
          >
            CONTACT
          </button>
        </div>
      </div>

      {/* ─── SCROLL INDICATOR ─── */}
      <motion.div 
        style={{ opacity: chevronOpacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 cursor-pointer" 
        onClick={() => scrollTo("#engineering-anchor")}
      >
        <span className="text-[11px] font-racing text-text-secondary tracking-[0.2em] font-medium">SCROLL START</span>
        <motion.div variants={chevronAnim} animate="animate" className="text-text-secondary flex justify-center items-center">
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" className="stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 1L7 7L13 1" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
