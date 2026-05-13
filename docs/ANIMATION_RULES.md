# 🎬 ANIMATION_RULES.md
## Framer Motion + GSAP Animation System — Porsche GT3 RS Portfolio

> "Precision is not the enemy of passion. It IS the passion."

---

## Core Philosophy

Every animation in this portfolio must answer: **"Would Porsche sign off on this?"**

That means:
- **No bounce** on serious elements. Springs only for playful micro-interactions.
- **Fast in, clean out.** Entrances impress; exits don't linger.
- **Purposeful.** If an animation doesn't guide attention or reward interaction — cut it.
- **60fps or bust.** Only animate `transform` and `opacity`. Never `width`, `height`, `top`, `left`.

---

## 1. Easing Curves — "The GT Curves"

```typescript
// ─── STANDARD EASES ─────────────────────────────────────────────────────────

export const ease = {
  // GT Standard — fast in, smooth settle (most transitions)
  gt:        [0.22, 1, 0.36, 1],

  // Pit Stop — extremely fast entrance (under 300ms elements)
  pit:       [0.0, 0.0, 0.2, 1],

  // Apex — overshoots slightly, snaps back (hover states, badges)
  apex:      [0.34, 1.56, 0.64, 1],

  // Brake — fast deceleration into position (exit animations)
  brake:     [0.4, 0, 1, 1],

  // Telemetry — linear (data lines, progress bars)
  telemetry: "linear",
}
```

---

## 2. Duration Scale

```typescript
export const duration = {
  instant:  0.1,   // Micro-feedback: button press, hover border
  fast:     0.2,   // Quick transitions: tab switch, icon hover
  normal:   0.35,  // Standard: chip entrance, label float
  medium:   0.5,   // Card entrance, modal backdrop
  slow:     0.7,   // Section headline, hero reveal
  cinematic: 1.2,  // Car drive-in, page-level transitions
  epic:     2.0,   // Opening sequence only
}
```

---

## 3. Framer Motion Global Variants

Define once in `src/animations/variants.ts`. Import everywhere.

```typescript
import { Variants } from "framer-motion"
import { ease, duration } from "./transitions"

// ─── PAGE / SECTION ──────────────────────────────────────────────────────────

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 40, filter: "blur(10px)" },
  animate: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: duration.slow, ease: ease.gt }
  },
  exit: {
    opacity: 0, y: -20, filter: "blur(4px)",
    transition: { duration: duration.fast, ease: ease.brake }
  }
}

// ─── HEADINGS ────────────────────────────────────────────────────────────────

export const headingReveal: Variants = {
  initial: { opacity: 0, x: -60 },
  animate: {
    opacity: 1, x: 0,
    transition: { duration: duration.slow, ease: ease.gt }
  }
}

// Split-text letter variants
export const letterVariants: Variants = {
  initial: { opacity: 0, y: -40, rotateX: -90 },
  animate: {
    opacity: 1, y: 0, rotateX: 0,
    transition: { duration: duration.medium, ease: ease.gt }
  }
}

export const wordStagger: Variants = {
  animate: {
    transition: { staggerChildren: 0.04 }
  }
}

// ─── CONTAINERS ──────────────────────────────────────────────────────────────

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 }
  }
}

export const staggerFast: Variants = {
  animate: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
  }
}

// ─── CARDS ───────────────────────────────────────────────────────────────────

export const cardEntrance: Variants = {
  initial: { opacity: 0, y: 60, scale: 0.95 },
  animate: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: duration.medium, ease: ease.gt }
  }
}

export const cardHover: Variants = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -8, scale: 1.01,
    transition: { duration: duration.fast, ease: ease.gt }
  }
}

// ─── LINES & BARS ────────────────────────────────────────────────────────────

export const lineDrawX: Variants = {
  initial: { scaleX: 0, originX: 0 },
  animate: {
    scaleX: 1,
    transition: { duration: 0.8, ease: ease.gt, delay: 0.2 }
  }
}

export const lineDrawY: Variants = {
  initial: { scaleY: 0, originY: 0 },
  animate: {
    scaleY: 1,
    transition: { duration: 1.0, ease: ease.gt }
  }
}

// ─── MODAL ───────────────────────────────────────────────────────────────────

export const modalOverlay: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: duration.normal } },
  exit: { opacity: 0, transition: { duration: duration.fast } }
}

export const modalContent: Variants = {
  initial: { opacity: 0, scale: 0.92, y: 40 },
  animate: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: duration.medium, ease: ease.gt }
  },
  exit: {
    opacity: 0, scale: 0.95, y: 20,
    transition: { duration: duration.fast, ease: ease.brake }
  }
}

// ─── SOCIAL TILES ────────────────────────────────────────────────────────────

export const tileFromLeft: Variants = {
  initial: { opacity: 0, x: -80 },
  animate: {
    opacity: 1, x: 0,
    transition: { duration: duration.slow, ease: ease.gt }
  }
}

export const tileFromRight: Variants = {
  initial: { opacity: 0, x: 80 },
  animate: {
    opacity: 1, x: 0,
    transition: { duration: duration.slow, ease: ease.gt }
  }
}

// ─── FLOATING / ANTI-GRAVITY ─────────────────────────────────────────────────

// See ANTIGRAVITY.md for full spec
export const floatVariants: Variants = {
  float: {
    y: [-8, 8, -8],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
    }
  }
}
```

---

## 4. GSAP Scroll Sequences

Defined in `src/animations/gsap-sequences.ts`. Call inside `useGSAP()` hooks.

```typescript
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// ─── HERO: CAR DRIVE-IN ───────────────────────────────────────────────────────
export const carDriveIn = (target: string) => {
  gsap.fromTo(target,
    { x: "110vw", opacity: 0, rotateY: -15 },
    {
      x: "0vw", opacity: 1, rotateY: 0,
      duration: 1.8, ease: "power4.out", delay: 0.4
    }
  )
}

// ─── SECTION: PARALLAX BACKGROUND ───────────────────────────────────────────
export const parallaxBg = (trigger: string, target: string) => {
  gsap.to(target, {
    yPercent: -30,
    ease: "none",
    scrollTrigger: {
      trigger,
      start: "top bottom",
      end: "bottom top",
      scrub: 1
    }
  })
}

// ─── SKILLS: BAR FILL ────────────────────────────────────────────────────────
export const skillBarFill = (trigger: string) => {
  gsap.from(".skill-bar-fill", {
    scaleX: 0,
    transformOrigin: "left center",
    duration: 1,
    ease: "power3.out",
    stagger: 0.1,
    scrollTrigger: {
      trigger,
      start: "top 70%",
    }
  })
}

// ─── TIMELINE: LINE DRAW ─────────────────────────────────────────────────────
export const timelineDraw = (trigger: string) => {
  gsap.from(".timeline-line", {
    scaleY: 0,
    transformOrigin: "top center",
    duration: 1.4,
    ease: "power2.out",
    scrollTrigger: {
      trigger,
      start: "top 60%",
    }
  })
}

// ─── COUNTER: NUMBER ROLL ────────────────────────────────────────────────────
export const numberRoll = (element: Element, target: number) => {
  const counter = { val: 0 }
  gsap.to(counter, {
    val: target,
    duration: 1.5,
    ease: "power2.out",
    snap: { val: 1 },
    onUpdate: () => {
      element.textContent = Math.round(counter.val).toString()
    },
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
    }
  })
}

// ─── TECH ICONS: RAIN IN ─────────────────────────────────────────────────────
export const iconRainIn = (trigger: string) => {
  gsap.from(".tech-icon", {
    y: -120, opacity: 0,
    duration: 0.6,
    ease: "bounce.out",
    stagger: { each: 0.06, from: "random" },
    scrollTrigger: {
      trigger,
      start: "top 70%",
    }
  })
}

// ─── PROJECTS: HORIZONTAL SCROLL ─────────────────────────────────────────────
export const projectsHorizontalScroll = (container: string) => {
  const panels = gsap.utils.toArray<Element>(".project-card")
  gsap.to(panels, {
    xPercent: -100 * (panels.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1,
      snap: 1 / (panels.length - 1),
      end: () => "+=" + (document.querySelector(container) as HTMLElement)?.offsetWidth
    }
  })
}

// ─── CONTACT: GARAGE DOOR ────────────────────────────────────────────────────
export const garageDoorReveal = (door: string, content: string) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: content,
      start: "top 80%",
    }
  })
  tl.to(door, { scaleY: 0, transformOrigin: "top center", duration: 0.8, ease: "power3.in" })
    .from(content, { opacity: 0, y: 40, duration: 0.6, ease: "power3.out" }, "-=0.2")
}
```

---

## 5. Animation Rules — DOs & DON'Ts

### ✅ DO

- Animate only `transform` and `opacity`
- Use `will-change: transform` on elements animated with GSAP (add/remove dynamically)
- Wrap every Framer Motion consumer in `<AnimatePresence>` when unmounting
- Use `useReducedMotion()` and provide static fallback for all animations
- Use `layoutId` for card → modal shared element transitions
- Throttle scroll-based state updates with `useThrottle(16)` (1 frame)
- Kill GSAP ScrollTriggers in cleanup functions (`ScrollTrigger.kill()`)

### ❌ DON'T

- Never animate `width`, `height`, `top`, `left`, `margin`, `padding`
- Never use `useEffect` for Framer Motion animations — use `whileInView` or variants
- Never stack Framer Motion AND GSAP on the same element
- Never leave `repeat: Infinity` animations running on off-screen elements
- Never use `transition: all` in CSS
- Never trigger layout animations inside scroll handlers (read → write batching)

---

## 6. Reduced Motion Fallbacks

```typescript
// src/hooks/useReducedMotion.ts
import { useReducedMotion as useFramerReducedMotion } from "framer-motion"

export const useSafeMotion = () => {
  const prefersReduced = useFramerReducedMotion()

  const safeVariants = (full: Variants, reduced: Variants = {}) =>
    prefersReduced ? reduced : full

  return { prefersReduced, safeVariants }
}

// Usage:
const { safeVariants } = useSafeMotion()
<motion.div variants={safeVariants(cardEntrance, { initial: {}, animate: {} })} />
```

---

## 7. Animation Checklist per Section

| Section | Framer Motion | GSAP | Notes |
|---------|--------------|------|-------|
| Hero | Letter stagger, CTA slide-up | Car drive-in, HUD typewriter | Cinematic — no rush |
| About | Paragraph word cascade, stat counters via FM | Number roll | FM handles layout, GSAP for numbers |
| Education | Timeline node spring, skill bars | SVG line draw | Line draw = GSAP, nodes = FM |
| Tech Stack | Icon grid stagger, tab layout | Icon rain-in | Use FM `layout` for filter reorder |
| Projects | Card stagger, modal `layoutId` | Horizontal scroll pin | Shared layout animation for modal |
| Social | Alternating tile entrance | None needed | Pure Framer Motion |
| Contact | Form field stagger, success transition | Garage door reveal | GSAP for theatrical door, FM for form |
