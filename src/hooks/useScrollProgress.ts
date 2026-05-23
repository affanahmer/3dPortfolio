"use client";

import { useState, useEffect } from "react";

/**
 * Track scroll progress (0–1) and determine active section index from progress thresholds
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0;
      const clampedProgress = Math.min(1, Math.max(0, scrollProgress));
      setProgress(clampedProgress);

      // Determine active section index using the scroll progress thresholds:
      // Section 0 (LAUNCH):    0.00 - 0.20
      // Section 1 (ENGINEERING):0.20 - 0.45
      // Section 2 (GARAGE):     0.45 - 0.75
      // Section 3 (OUTRO):      0.75 - 1.00
      let active = 0;
      if (clampedProgress >= 0.75) {
        active = 3;
      } else if (clampedProgress >= 0.45) {
        active = 2;
      } else if (clampedProgress >= 0.20) {
        active = 1;
      } else {
        active = 0;
      }

      setActiveSection(active);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Run immediately

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { progress, activeSection };
}
