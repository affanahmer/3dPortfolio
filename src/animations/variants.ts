import { Variants } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════════════
   FRAMER MOTION GLOBAL VARIANTS
   Must export exact variants: pageVariants, headingReveal, staggerContainer,
   cardEntrance, lineDrawX.
   ═══════════════════════════════════════════════════════════════════════════ */

export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 40,
    filter: "blur(10px)"
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(4px)"
  }
};

export const headingReveal: Variants = {
  initial: {
    opacity: 0,
    x: -60
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15
    }
  }
};

export const cardEntrance: Variants = {
  initial: {
    opacity: 0,
    y: 60,
    scale: 0.95
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const lineDrawX: Variants = {
  initial: {
    scaleX: 0,
    originX: 0
  },
  animate: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Auxiliary variants needed by other components to compile cleanly
export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 30
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const tileFromLeft: Variants = {
  initial: { opacity: 0, x: -80 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const tileFromRight: Variants = {
  initial: { opacity: 0, x: 80 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const wordStagger: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.04 },
  },
};

export const letterVariants: Variants = {
  initial: { opacity: 0, y: -60, rotateX: -90 },
  animate: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const modalOverlay: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const modalContent: Variants = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } },
};

