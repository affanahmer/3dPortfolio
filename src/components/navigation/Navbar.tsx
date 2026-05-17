"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "@/hooks/useLenis";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import ProgressBar from "./ProgressBar";

const NAV_ITEMS = [
  { id: "hero", label: "Home", href: "#hero" },
  { id: "about", label: "About", href: "#about" },
  { id: "education", label: "Skills", href: "#education" },
  { id: "techstack", label: "Tech", href: "#techstack" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "social", label: "Connect", href: "#social" },
  { id: "contact", label: "Contact", href: "#contact" },
];

/**
 * Fixed glass-morphism navigation bar
 * Features: smooth scroll via Lenis, mobile hamburger, active section tracking
 */
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
      <ProgressBar />
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[var(--z-nav)] glass rounded-full px-2 py-2 w-[90%] max-w-3xl"
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("#hero")}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full hover:bg-white/5 transition-colors"
          >
            <span className="text-[var(--color-accent-red)] font-bold text-lg font-[var(--font-racing)]">
              GT3
            </span>
            <span className="text-[var(--color-text-secondary)] text-sm hidden sm:block">
              Portfolio
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.href)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 ${
                  activeSection === index
                    ? "bg-[var(--color-accent-red)] text-white"
                    : "text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full hover:bg-white/5 transition-colors"
            aria-label="Toggle navigation menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <motion.span
                animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-full bg-white rounded-full origin-left"
              />
              <motion.span
                animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                className="block h-0.5 w-full bg-white rounded-full"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-full bg-white rounded-full origin-left"
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-1 pt-3 pb-2">
                {NAV_ITEMS.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.href)}
                    className={`px-4 py-2 rounded-lg text-sm text-left transition-all duration-200 ${
                      activeSection === index
                        ? "bg-[var(--color-accent-red)] text-white"
                        : "text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
