"use client";

import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useLenis } from "@/hooks/useLenis";

const SECTIONS = [
  "hero",
  "about",
  "education",
  "techstack",
  "projects",
  "social",
  "contact",
];

export default function SectionDots() {
  const { activeSection } = useScrollProgress();
  const { scrollTo } = useLenis();

  return (
    <div 
      className="fixed right-[24px] top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 items-center select-none"
    >
      {SECTIONS.map((section, index) => {
        const isActive = activeSection === index;
        return (
          <button
            key={section}
            onClick={() => scrollTo(`#${section}`, { duration: 1.2 })}
            className="group relative flex items-center justify-center cursor-pointer w-[12px] h-[12px]"
            aria-label={`Scroll to ${section}`}
          >
            {/* Tooltip name displayed on hover */}
            <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[10px] font-racing text-[#A0A0A0] uppercase tracking-widest whitespace-nowrap">
              {section === "techstack" ? "arsenal" : section === "projects" ? "garage" : section === "social" ? "track" : section === "education" ? "skills" : section}
            </span>

            {/* Dot */}
            <motion.div
              animate={{
                scale: isActive ? 1.5 : 1,
                backgroundColor: isActive ? "#E8000D" : "#2A2A2A",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-[6px] h-[6px] rounded-full"
            />
          </button>
        );
      })}
    </div>
  );
}
