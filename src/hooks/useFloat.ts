import { useReducedMotion, useInView } from "framer-motion";
import { useEffect, useState, useRef, RefObject } from "react";

/**
 * Anti-gravity floating animation hook
 * Pauses when not in view, adapts amplitude for mobile, and disables for reduced motion.
 */
export const useFloat = (index = 0, ref?: RefObject<Element | null>) => {
  const prefersReduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  
  // Create a local ref fallback to ensure useInView hook is called unconditionally
  const localRef = useRef<Element | null>(null);
  const targetRef = ref || localRef;
  const inView = useInView(targetRef as RefObject<Element>, { once: false, margin: "100px" });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 1. Reduced motion: set to static y:0
  if (prefersReduced) {
    return {
      animate: { y: 0, rotateZ: 0 },
      transition: { duration: 0 }
    };
  }

  // 2. Pause float when section not visible (Performance optimization)
  if (ref && !inView) {
    return {
      animate: { y: 0, rotateZ: 0 },
      transition: { duration: 0 }
    };
  }

  // 3. Mobile: halve all amplitudes, remove rotateZ
  const baseAmp = 6 + (index % 4) * 2.5;
  const ampY = isMobile ? baseAmp / 2 : baseAmp;
  const rotateVal = isMobile ? 0 : (index % 2 === 0 ? 1.2 : -1.2);

  // 4. No two adjacent elements share the same duration/delay combination
  const duration = 2.8 + (index % 5) * 0.35;
  const delay = (index % 7) * 0.28;

  return {
    animate: {
      y: [0, -ampY, 0],
      rotateZ: [0, rotateVal, 0],
    },
    transition: {
      duration,
      delay,
      ease: "easeInOut" as const,
      repeat: Infinity,
    }
  };
};
