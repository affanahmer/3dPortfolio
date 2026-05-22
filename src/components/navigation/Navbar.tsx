"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "@/hooks/useLenis";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import ProgressBar from "./ProgressBar";

const NAV_LINKS = [
  { label: "INTRO", href: "#about", index: 1 },
  { label: "SKILLS", href: "#education", index: 2 },
  { label: "ARSENAL", href: "#techstack", index: 3 },
  { label: "GARAGE", href: "#projects", index: 4 },
  { label: "TRACK", href: "#social", index: 5 },
  { label: "BUILD", href: "#contact", index: 6 },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollTo } = useLenis();
  const { activeSection } = useScrollProgress();

  const handleNavClick = (href: string) => {
    scrollTo(href, { duration: 1.2 });
    setIsOpen(false);
  };

  return (
    <>
      {/* Fixed progress bar at the very top */}
      <ProgressBar />

      <nav className="fixed top-0 left-0 w-full h-[56px] bg-[#0A0A0A]/80 backdrop-blur-[20px] border-b border-white/6 z-50 px-6 md:px-12 flex items-center justify-between select-none">
        {/* Left: Monogram */}
        <button
          onClick={() => handleNavClick("#hero")}
          className="font-racing font-bold text-[20px] text-[#E8000D] tracking-wider cursor-pointer"
        >
          AK
        </button>

        {/* Center: Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.index;
            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className={`font-racing font-medium text-[11px] tracking-[0.15em] transition-colors duration-300 cursor-pointer ${
                  isActive ? "text-[#F5F5F5]" : "text-[#A0A0A0] hover:text-[#F5F5F5]"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Right: Available For Hire Pill */}
        <div className="hidden md:block">
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="border border-[#E8000D] text-[#E8000D] font-racing text-[11px] font-bold py-[6px] px-[12px] tracking-[0.1em] rounded-[2px]"
          >
            AVAILABLE FOR HIRE
          </motion.div>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center p-2 cursor-pointer text-[#A0A0A0] hover:text-white"
        >
          <svg
            className="w-6 h-6 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>

        {/* Mobile Dropdown Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-[56px] left-0 w-full bg-[#0A0A0A]/95 border-b border-white/6 flex flex-col items-center gap-4 py-6 md:hidden z-40"
            >
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.index;
                return (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className={`font-racing font-medium text-[12px] tracking-[0.15em] py-2 cursor-pointer transition-colors duration-300 ${
                      isActive ? "text-[#F5F5F5]" : "text-[#A0A0A0] hover:text-[#F5F5F5]"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
              <div className="mt-2">
                <motion.div
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="border border-[#E8000D] text-[#E8000D] font-racing text-[10px] font-bold py-[6px] px-[12px] tracking-[0.1em] rounded-[2px]"
                >
                  AVAILABLE FOR HIRE
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
