"use client";

import { useState, useEffect } from "react";

/**
 * Track scroll progress (0–1) for the entire page
 * Used by ProgressBar and SectionDots
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(Math.min(1, Math.max(0, scrollProgress)));

      // Determine active section (7 sections)
      const sectionIndex = Math.floor(scrollProgress * 7);
      setActiveSection(Math.min(6, sectionIndex));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { progress, activeSection };
}
