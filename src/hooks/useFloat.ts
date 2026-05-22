import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export const useFloat = (index = 0) => {
  const prefersReduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (prefersReduced) {
    return {
      animate: { y: 0, rotateZ: 0 },
      transition: { duration: 0 }
    };
  }

  const amp = 6 + (index % 4) * 2.5;
  const targetY = isMobile ? -(amp / 2) : -amp;
  const targetRotate = isMobile ? 0 : (index % 2 === 0 ? 1.2 : -1.2);

  return {
    animate: {
      y: [0, targetY, 0],
      rotateZ: [0, targetRotate, 0],
    },
    transition: {
      duration: 2.8 + (index % 5) * 0.35,
      delay: (index % 7) * 0.28,
      ease: "easeInOut" as const,
      repeat: Infinity,
    }
  };
};
