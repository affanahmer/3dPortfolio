"use client";

import { useRef, useEffect } from "react";
import { numberRoll } from "@/animations/gsap-sequences";
import { StatCounter } from "@/types";
import { AnimatedSection, AnimatedItem } from "@/components/animations";

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

      <AnimatedSection className="w-full flex flex-col mt-8">
        {/* Heading */}
        <AnimatedItem className="relative">
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold text-[#F5F5F5] mb-4 leading-none">
            PRECISION. PERFORMANCE.
          </h2>
          {/* Red accent line under heading */}
          <div className="w-[60px] h-[3px] bg-[#E8000D] mb-[64px]" />
        </AnimatedItem>

        {/* Two-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-[80px] items-center">
          {/* Left Column — Text */}
          <AnimatedItem className="flex flex-col">
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
          </AnimatedItem>

          {/* Right Column — Carbon Fiber Texture Card with frame_040.jpg */}
          <AnimatedItem className="relative">
            <div className="aspect-[4/3] rounded-[4px] bg-[#111111] carbon-fiber border border-[#2A2A2A] flex items-center justify-center overflow-hidden relative">
              <img 
                src="/assets/porsche-sequence/frame_040.jpg"
                alt="Porsche Front Profile Frame 040" 
                className="w-full h-full object-cover opacity-60 mix-blend-lighten"
              />
              <div className="absolute bottom-4 left-4 font-mono text-[10px] text-[#A0A0A0] tracking-wider uppercase bg-black/60 px-2 py-1 border border-white/5 rounded-[2px] glass">
                FRAME_040 / ENGINE COMPONENT
              </div>
            </div>
            {/* Red glow accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#E8000D] rounded-full blur-[80px] opacity-15 pointer-events-none" />
          </AnimatedItem>
        </div>

        {/* Stat Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-[64px]">
          {stats.map((stat, index) => (
            <AnimatedItem key={stat.label}>
              <div className="bg-[#111111] border border-[#2A2A2A] rounded-[4px] p-6 text-center shadow-lg hover:border-[#E8000D]/40 transition-colors duration-300">
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
            </AnimatedItem>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
