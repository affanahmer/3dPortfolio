import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ═══════════════════════════════════════════════════════════════════════════
   GSAP SCROLL SEQUENCES
   Per ANIMATION_RULES.md — Call inside useGSAP() hooks
   ═══════════════════════════════════════════════════════════════════════════ */

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── HERO: CAR DRIVE-IN ───────────────────────────────────────────────────────
export const carDriveIn = (target: string | Element) => {
  gsap.fromTo(
    target,
    { x: "110vw", opacity: 0, rotateY: -15 },
    {
      x: "0vw",
      opacity: 1,
      rotateY: 0,
      duration: 1.8,
      ease: "power4.out",
      delay: 0.4,
    }
  );
};

// ─── SECTION: PARALLAX BACKGROUND ───────────────────────────────────────────
export const parallaxBg = (trigger: string | Element, target: string | Element) => {
  gsap.to(target, {
    yPercent: -30,
    ease: "none",
    scrollTrigger: {
      trigger,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });
};

// ─── SKILLS: BAR FILL ────────────────────────────────────────────────────────
export const skillBarFill = (trigger: string | Element) => {
  gsap.from(".skill-bar-fill", {
    scaleX: 0,
    transformOrigin: "left center",
    duration: 1,
    ease: "power3.out",
    stagger: 0.1,
    scrollTrigger: {
      trigger,
      start: "top 70%",
    },
  });
};

// ─── TIMELINE: LINE DRAW ─────────────────────────────────────────────────────
export const timelineDraw = (trigger: string | Element) => {
  gsap.from(".timeline-line", {
    scaleY: 0,
    transformOrigin: "top center",
    duration: 1.4,
    ease: "power2.out",
    scrollTrigger: {
      trigger,
      start: "top 60%",
    },
  });
};

// ─── COUNTER: NUMBER ROLL ────────────────────────────────────────────────────
export const numberRoll = (element: Element, target: number) => {
  const counter = { val: 0 };
  gsap.to(counter, {
    val: target,
    duration: 1.5,
    ease: "power2.out",
    snap: { val: 1 },
    onUpdate: () => {
      element.textContent = Math.round(counter.val).toString();
    },
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
    },
  });
};

// ─── TECH ICONS: RAIN IN ─────────────────────────────────────────────────────
export const iconRainIn = (trigger: string | Element) => {
  gsap.from(".tech-icon", {
    y: -120,
    opacity: 0,
    duration: 0.6,
    ease: "bounce.out",
    stagger: { each: 0.06, from: "random" },
    scrollTrigger: {
      trigger,
      start: "top 70%",
    },
  });
};

// ─── CONTACT: GARAGE DOOR REVEAL ─────────────────────────────────────────────
export const garageDoorReveal = (door: string | Element, content: string | Element) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: content,
      start: "top 80%",
    },
  });
  tl.to(door, {
    scaleY: 0,
    transformOrigin: "top center",
    duration: 0.8,
    ease: "power3.in",
  }).from(
    content,
    { opacity: 0, y: 40, duration: 0.6, ease: "power3.out" },
    "-=0.2"
  );
};

// ─── CAMERA TIMELINE (3D scene camera movement on scroll) ─────────────────────
export const cameraScrollTimeline = (
  trigger: string | Element,
  onUpdate: (progress: number) => void
) => {
  gsap.to(
    {},
    {
      scrollTrigger: {
        trigger,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => onUpdate(self.progress),
      },
    }
  );
};
