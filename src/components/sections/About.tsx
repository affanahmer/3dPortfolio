"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { numberRoll } from "@/animations/gsap-sequences";
import { StatCounter } from "@/types";

const stats: StatCounter[] = [
  { label: "Years Experience", value: 6, suffix: "+" },
  { label: "Projects Shipped", value: 40, suffix: "+" },
  { label: "Lines of Code", value: 500, suffix: "K+" },
  { label: "Coffees Consumed", value: 3000, suffix: "+" },
];

const aboutText =
  "I build digital experiences that feel engineered, not assembled. Every pixel, every interaction, every line of code — precision-crafted like a GT3 RS on the Nordschleife.";

export default function About() {
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    counterRefs.current.forEach((el, i) => {
      if (el) {
        numberRoll(el, stats[i].value);
      }
    });
  }, []);

  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex items-center justify-center py-[120px] px-6 md:px-20 max-w-[1280px] mx-auto bg-[#0D0D0D] border-x border-[#1A1A1A]/40 overflow-hidden"
    >
      {/* ─── SECTION NUMBER TAG ─── */}
      <span className="absolute top-6 left-6 md:left-20 font-racing text-[11px] text-[#A0A0A0] tracking-[0.2em]">
        02 / ABOUT
      </span>

      <div className="w-full flex flex-col mt-8">
        {/* Heading */}
        <div className="relative">
          <motion.h2
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold text-[#F5F5F5] mb-4 leading-none"
          >
            PRECISION. PERFORMANCE.
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-[80px] items-center">
          {/* Left Column — Text */}
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-[#C0A060] tracking-wider mb-6">
              DRIVER PROFILE
            </h3>
            <p className="text-lg text-[#A0A0A0] leading-relaxed mb-8">
              {aboutText}
            </p>
            <p className="text-base text-[#A0A0A0]/75 leading-relaxed">
              With a background in mechanical engineering and a passion for design, I approach
              software development with an analytical mind and a creative soul. Reaching the apex of
              each project means ensuring perfect execution from core database queries up to visual layouts.
            </p>
          </div>

          {/* Right Column — Carbon Fiber Texture Card */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-[4px] bg-[#111111] carbon-fiber border border-[#2A2A2A] p-8 flex items-center justify-center overflow-hidden">
              <div className="text-[9rem] font-bold font-racing text-[#E8000D] opacity-10 select-none leading-none tracking-tighter">
                GT3
              </div>
            </div>
            {/* Red glow accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#E8000D] rounded-full blur-[80px] opacity-15 pointer-events-none" />
          </div>
        </div>

        {/* Stat Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-[64px]">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-[#111111] border border-[#2A2A2A] rounded-[4px] p-6 text-center shadow-lg hover:border-[#E8000D]/40 transition-colors duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold font-racing text-[#E8000D] mb-2">
                {stat.prefix}
                <span
                  ref={(el) => {
                    counterRefs.current[index] = el;
                  }}
                >
                  0
                </span>
                {stat.suffix}
              </div>
              <p className="text-xs text-[#A0A0A0] uppercase tracking-widest font-racing">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
