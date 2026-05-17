import { Variants } from "framer-motion";
import { ease, duration } from "./transitions";

/* ═══════════════════════════════════════════════════════════════════════════
   FRAMER MOTION GLOBAL VARIANTS
   Per ANIMATION_RULES.md — Define once, import everywhere
   ═══════════════════════════════════════════════════════════════════════════ */

// ─── PAGE / SECTION ──────────────────────────────────────────────────────────
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 40, filter: "blur(10px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: duration.slow, ease: ease.gt },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(4px)",
    transition: { duration: duration.fast, ease: ease.brake },
  },
};

// ─── HEADINGS ────────────────────────────────────────────────────────────────
export const headingReveal: Variants = {
  initial: { opacity: 0, x: -60 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: ease.gt },
  },
};

// Split-text letter variants
export const letterVariants: Variants = {
  initial: { opacity: 0, y: -40, rotateX: -90 },
  animate: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: duration.medium, ease: ease.gt },
  },
};

export const wordStagger: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.04 },
  },
};

// ─── CONTAINERS ──────────────────────────────────────────────────────────────
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

export const staggerFast: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

// ─── CARDS ───────────────────────────────────────────────────────────────────
export const cardEntrance: Variants = {
  initial: { opacity: 0, y: 60, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: duration.medium, ease: ease.gt },
  },
};

export const cardHover: Variants = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -8,
    scale: 1.01,
    transition: { duration: duration.fast, ease: ease.gt },
  },
};

// ─── LINES & BARS ────────────────────────────────────────────────────────────
export const lineDrawX: Variants = {
  initial: { scaleX: 0, originX: 0 },
  animate: {
    scaleX: 1,
    transition: { duration: 0.8, ease: ease.gt, delay: 0.2 },
  },
};

export const lineDrawY: Variants = {
  initial: { scaleY: 0, originY: 0 },
  animate: {
    scaleY: 1,
    transition: { duration: 1.0, ease: ease.gt },
  },
};

// ─── MODAL ───────────────────────────────────────────────────────────────────
export const modalOverlay: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: duration.normal } },
  exit: { opacity: 0, transition: { duration: duration.fast } },
};

export const modalContent: Variants = {
  initial: { opacity: 0, scale: 0.92, y: 40 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: duration.medium, ease: ease.gt },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: duration.fast, ease: ease.brake },
  },
};

// ─── SOCIAL TILES ────────────────────────────────────────────────────────────
export const tileFromLeft: Variants = {
  initial: { opacity: 0, x: -80 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: ease.gt },
  },
};

export const tileFromRight: Variants = {
  initial: { opacity: 0, x: 80 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: ease.gt },
  },
};

// ─── FLOATING / ANTI-GRAVITY ─────────────────────────────────────────────────
export const floatVariants: Variants = {
  float: {
    y: [-8, 8, -8],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

// ─── FADE IN UP (generic utility) ────────────────────────────────────────────
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.medium, ease: ease.gt },
  },
};

// ─── SCALE IN ────────────────────────────────────────────────────────────────
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.medium, ease: ease.gt },
  },
};
