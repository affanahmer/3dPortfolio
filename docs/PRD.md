# 🏎️ Product Requirements Document
## 3D Porsche 911 GT3 RS — Developer Portfolio Website

**Version:** 1.0.0  
**Status:** Draft  
**Author:** Portfolio Owner  
**Date:** 2026-05-13  
**Theme:** Porsche 911 GT3 RS Motorsport Aesthetic  

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Product Vision](#product-vision)
3. [Design Language](#design-language)
4. [Tech Stack](#tech-stack)
5. [Page Architecture](#page-architecture)
6. [Animation System](#animation-system)
7. [Component Specifications](#component-specifications)
8. [Performance Requirements](#performance-requirements)
9. [Accessibility](#accessibility)
10. [File Structure](#file-structure)

---

## 1. Executive Summary

A high-performance, visually stunning developer portfolio website inspired by the Porsche 911 GT3 RS — one of the most precise and aggressive naturally aspirated sports cars ever built. Every interaction, transition, and animation must feel engineered, deliberate, and fast — just like the car itself.

The site uses a full-page scroll architecture with 7 distinct sections, each transitioning with cinematic Framer Motion animations. Three.js and Spline power the 3D visuals. GSAP handles scroll-triggered sequences.

---

## 2. Product Vision

### Mission
To present the developer's work with the same precision, passion, and engineering excellence that Porsche puts into the 911 GT3 RS.

### Core Pillars

| Pillar | Description |
|--------|-------------|
| **Speed** | Sub-2s load. 60fps animations. No jank. |
| **Precision** | Every pixel, every timing curve intentional. |
| **Depth** | 3D layers, parallax, spatial design. |
| **Identity** | Unmistakably Porsche — GT sport aesthetic throughout. |

### Design Inspiration
- Porsche 911 GT3 RS (992.2 generation)
- GT sport livery: Guards Red / Shark Blue / Python Green accents
- Carbon fiber texture motifs
- Racing HUD overlays
- Motorsport telemetry data visualizations

---

## 3. Design Language

### Color Palette

```
Primary Background:   #0A0A0A  (Matte Black — hood finish)
Surface:              #111111  (Dark Charcoal)
Surface Elevated:     #1A1A1A  (Carbon overlay)
Accent Primary:       #E8000D  (Guards Red)
Accent Secondary:     #C0A060  (GT Gold / Racing stripe)
Accent Tertiary:      #00D4FF  (Telemetry Blue — HUD elements)
Text Primary:         #F5F5F5  (Pure White)
Text Secondary:       #A0A0A0  (Matte Gray)
Border Subtle:        #2A2A2A  (Carbon weave line)
Glow Red:             rgba(232,0,13,0.4)
Glow Blue:            rgba(0,212,255,0.3)
```

### Typography

```
Display Font:    "Neue Haas Grotesk Display" / fallback: "Inter"
Heading Font:    "GT Walsheim" / fallback: "Space Grotesk"
Body Font:       "Söhne" / fallback: "DM Sans"
Mono Font:       "JetBrains Mono" (tech stack, code snippets)
Racing Numbers:  "Barlow Condensed" (section numbers, counters)

Scale:
  --text-xs:    0.75rem
  --text-sm:    0.875rem
  --text-base:  1rem
  --text-lg:    1.125rem
  --text-xl:    1.25rem
  --text-2xl:   1.5rem
  --text-3xl:   1.875rem
  --text-4xl:   2.25rem
  --text-5xl:   3rem
  --text-6xl:   3.75rem
  --text-7xl:   4.5rem
  --text-8xl:   6rem
  --text-9xl:   8rem
```

### Texture & Material System

- **Carbon Fiber Pattern**: `repeating-linear-gradient` weave at 45° — used on cards and section backgrounds
- **Brushed Metal**: Subtle noise texture on nav and footer
- **Glass Morphism**: `backdrop-filter: blur(20px)` on overlays — like the GT3 RS windshield
- **HUD Lines**: Thin `1px` lines with `opacity: 0.2` grid — telemetry aesthetic
- **Red Glow**: `box-shadow: 0 0 40px rgba(232,0,13,0.4)` on primary CTAs

### Spacing System (GT Grid)

```
Base unit: 8px
--space-1:   8px
--space-2:   16px
--space-3:   24px
--space-4:   32px
--space-5:   40px
--space-6:   48px
--space-8:   64px
--space-10:  80px
--space-12:  96px
--space-16:  128px
--space-20:  160px
--space-24:  192px
```

---

## 4. Tech Stack

### Core Framework
- **React 18** with Vite (HMR, fast builds)
- **TypeScript** (strict mode)

### 3D & Visual
- **Three.js r167** — custom WebGL scene, 911 model rendering
- **@react-three/fiber** — React renderer for Three.js
- **@react-three/drei** — helpers: Environment, OrbitControls, Float, Sparkles
- **Spline** (`@splinetool/react-spline`) — interactive 3D scenes embedded per section
- **@react-three/postprocessing** — bloom, chromatic aberration, vignette

### Animation
- **Framer Motion 11** — page transitions, component entrances, scroll-linked animations
- **GSAP 3** + ScrollTrigger — timeline-based scroll sequences
- **Lenis** — smooth scroll library (inertia, momentum)

### Styling
- **Tailwind CSS v4** — utility classes
- **CSS Custom Properties** — design tokens
- **PostCSS** — transforms

### Communication
- **EmailJS** — contact form email delivery (no backend needed)
- **React Hook Form** + Zod — form validation

### Performance
- **@vercel/analytics** — real user monitoring
- **Lighthouse CI** — automated performance audits
- **Vite Bundle Analyzer** — chunk optimization

---

## 5. Page Architecture

The site is a **full-page vertical scroll** experience. Each section = 100vh minimum. Lenis provides smooth inertia scroll. GSAP ScrollTrigger pins sections for parallax depth.

```
┌─────────────────────────────────┐
│  PAGE 1: HERO                   │  ← Spline 911 GT3 RS model, cinematic intro
├─────────────────────────────────┤
│  PAGE 2: INTRO / ABOUT          │  ← Driver profile, personal story
├─────────────────────────────────┤
│  PAGE 3: EDUCATION + SKILLS     │  ← Timeline + skill bars, racing cert style
├─────────────────────────────────┤
│  PAGE 4: TECH STACK             │  ← 3D rotating icons, category clusters
├─────────────────────────────────┤
│  PAGE 5: PROJECTS               │  ← Card grid with modals, video embeds
├─────────────────────────────────┤
│  PAGE 6: SOCIAL / LINKS         │  ← Connect section, social icons
├─────────────────────────────────┤
│  PAGE 7: CONTACT FORM           │  ← EmailJS form, garage door close animation
└─────────────────────────────────┘
```

### Navigation
- Fixed floating nav bar (glass morphism)
- Section indicator: vertical dots (right edge) — like Porsche instrument cluster
- Progress bar: thin red line at top (lap timer aesthetic)
- Hamburger menu for mobile

---

## 6. Animation System

### Philosophy: "Motorsport Motion"

Every animation must feel like precision engineering — not decoration. Timing curves are tight and intentional. Entrances are fast. Exits are clean.

### Framer Motion — Global Variants

```typescript
// Page transition
export const pageVariants = {
  initial: { opacity: 0, y: 40, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { opacity: 0, y: -20, filter: "blur(4px)",
    transition: { duration: 0.3, ease: "easeIn" }
  }
}

// Section heading reveal
export const headingVariants = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
}

// Stagger children
export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
}

// Card entrance
export const cardVariants = {
  initial: { opacity: 0, y: 60, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
}

// Red line draw (skill bars, progress)
export const lineDrawVariants = {
  initial: { scaleX: 0, originX: 0 },
  animate: { scaleX: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }
  }
}
```

### GSAP ScrollTrigger Sequences

```typescript
// Hero: Car drives in from right on load
gsap.from(".gt3-model", {
  x: "120vw", opacity: 0, duration: 1.8,
  ease: "power4.out", delay: 0.5
})

// Section number counter (racing lap style)
gsap.to(".section-number", {
  innerText: targetNumber,
  snap: { innerText: 1 },
  scrollTrigger: { trigger: section, start: "top 80%" }
})

// Skill bars fill on scroll
gsap.from(".skill-bar-fill", {
  scaleX: 0,
  transformOrigin: "left",
  duration: 1,
  ease: "power3.out",
  stagger: 0.1,
  scrollTrigger: { trigger: ".skills-section", start: "top 70%" }
})
```

### Lenis Smooth Scroll Config

```typescript
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  smooth: true,
  smoothTouch: false,
  touchMultiplier: 2,
})
```

---

## 7. Component Specifications

### 7.1 Hero Section (Page 1)

**Purpose**: Cinematic first impression. Show the car, establish identity.

**Elements:**
- Full-viewport Spline scene: Porsche 911 GT3 RS, interactive rotation on cursor
- Name in massive typography (`clamp(4rem, 10vw, 9rem)`), letter-by-letter stagger entrance
- Subtitle: role/tagline in GT Gold
- Two CTAs: "View Work" (red, glow) + "Contact" (ghost/outlined)
- Racing stripe diagonal: thin red line cutting across hero
- Background: Dark with subtle noise + faint grid (telemetry HUD)
- Corner HUD elements: fake telemetry data (RPM, SPEED, LAP)
- Scroll indicator: animated chevron with "SCROLL" in Barlow Condensed

**Animations:**
- On mount: name splits into chars → each falls from above with spring
- Subtitle fades in with blur → sharp, 600ms delay
- CTAs slide up, staggered 100ms apart
- Spline car: float animation loop (subtle Y oscillation, 3s ease-in-out)
- HUD elements: typewriter effect

---

### 7.2 Intro / About Section (Page 2)

**Purpose**: Who is this person? Tell the story in 3–5 punchy lines.

**Elements:**
- Large quote or personal statement (centered, 3xl–5xl)
- Two-column layout: text left, 3D avatar / portrait right
- 3–4 stat counters: years experience, projects shipped, coffees, etc.
- Decorative: carbon fiber texture card background

**Animations:**
- Section enter: text slides in from left, image from right
- Stat counters: number roll (0 → target) on scroll-in-view
- Quote: word-by-word opacity cascade (Framer Motion stagger)

---

### 7.3 Education + Skills Section (Page 3)

**Purpose**: Credentials and capabilities.

**Layout:**
- Left half: Education timeline (vertical line, nodes for each institution)
- Right half: Skills grouped by category (Languages, Frameworks, Tools, Soft Skills)

**Education Timeline Node:**
```
[Year] ──●── [Degree / Certification]
              [Institution Name]
              [GPA / Honors — optional]
```

**Skills Display:**
- Category label in GT Gold
- Each skill: icon + name + animated fill bar (0–100%)
- Bar uses `scaleX` transform from left — like a pit stop time bar

**Animations:**
- Timeline line draws downward (SVG `stroke-dashoffset`)
- Each node pops in with spring as line reaches it
- Skill bars fill on scroll with staggered delay

---

### 7.4 Tech Stack Section (Page 4)

**Purpose**: Visual showcase of technologies.

**Layout:**
- Title + subtitle
- 3D floating icon grid using @react-three/fiber `Float` component
- Categories: Frontend / Backend / DevOps / Design / Tools
- Tab or filter buttons to switch category
- Each icon: glowing card with name below, hover = scale + glow intensify

**3D Icons:**
- React, Next.js, TypeScript, Three.js, Node, Python, Docker, AWS, Figma, etc.
- Use `@react-three/drei` `Float` for gentle anti-gravity bob
- Icons rendered as textured planes in Three.js scene

**Animations:**
- Section enter: icons rain down from top with stagger
- Tab switch: icons scatter → reassemble (Framer Motion layout animation)
- Hover: scale 1.1, red glow ring appears

---

### 7.5 Projects Section (Page 5)

**Purpose**: Showcase work. Each project = a car in the garage.

**Layout:**
- Horizontal scroll OR grid (3 columns desktop, 1 mobile)
- Each project = card with:
  - Cover image / thumbnail
  - Project title + one-liner
  - Tech badges
  - Two buttons: "Details" (opens modal) + "Live" (external link)

**Project Modal:**
- Full-screen overlay (dark, blur backdrop)
- Left: video embed (auto-play muted loop) OR image gallery
- Right: project description, features list, tech stack, links
- Close with `Escape` key or ✕ button

**Animations:**
- Cards: stagger entrance from bottom
- Card hover: slight Y lift (-8px), shadow deepens, red accent line appears at bottom
- Modal open: scale from card position (shared layout animation with Framer Motion)
- Modal close: reverse scale back to card

---

### 7.6 Social / Links Section (Page 6)

**Purpose**: Connect the visitor to all developer presences.

**Layout:**
- Full-width section, dark with red accent
- Large heading: "FIND ME ON THE TRACK"
- Social links as large interactive tiles:
  - GitHub / LinkedIn / Twitter(X) / Instagram / YouTube / Dev.to
- Each tile: icon + platform name + handle + subtle stat (followers, repos)

**Animations:**
- Tiles slide in from alternating sides (even: left, odd: right)
- Hover: tile lifts, glows, border turns red

---

### 7.7 Contact Form Section (Page 7)

**Purpose**: Let anyone reach out via email (EmailJS).

**Layout:**
- Split: left = "GT Garage" illustration (Spline or Three.js), right = form
- Form fields:
  - Name (text)
  - Email (email)
  - Subject (text)
  - Message (textarea, min 4 rows)
  - Submit button: "SEND IT" in Barlow Condensed, red, full-width

**Form Behavior:**
- React Hook Form + Zod validation
- Inline error states (red border + message)
- Submit: loading state (spinner), success state (checkmark + "Message sent!"), error state
- EmailJS integration via `emailjs.sendForm()`

**Animations:**
- Garage door animation: section reveal = door slides up revealing form
- Input focus: label floats up (floating label pattern)
- Submit button: pulse glow on hover
- Success: form fades → success card slides in

---

## 8. Performance Requirements

| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥ 90 |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Total Blocking Time | < 200ms |
| Cumulative Layout Shift | < 0.1 |
| Bundle Size (gzip) | < 500KB (excl. 3D assets) |
| 3D Model Load | < 3s on 4G |
| Frame Rate Target | 60fps |

### Optimization Strategies
- Lazy-load Three.js / Spline scenes (React Suspense + dynamic import)
- Use `canvas` for 3D, fallback static image if WebGL unavailable
- Compress GLTF models with Draco/MeshOpt
- Use `will-change: transform` only on actively animating elements
- Framer Motion `LazyMotion` with feature bundle splitting
- Intersection Observer to pause animations when off-screen

---

## 9. Accessibility

- All interactive elements keyboard-navigable (Tab, Enter, Space, Escape)
- ARIA labels on all icon buttons and social links
- Reduced motion: wrap all Framer Motion animations in `useReducedMotion()` hook — provide static fallback
- Color contrast: all text meets WCAG 2.1 AA (4.5:1 minimum)
- Form labels properly associated with inputs
- Focus indicators: visible red outline (custom, not default browser ring)
- Alt text on all images

---

## 10. File Structure

```
portfolio/
├── public/
│   ├── models/
│   │   └── porsche-911-gt3rs.glb
│   ├── textures/
│   │   ├── carbon-fiber.png
│   │   └── brushed-metal.png
│   └── videos/
│       └── [project-demo-videos]
├── src/
│   ├── components/
│   │   ├── navigation/
│   │   │   ├── Navbar.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── SectionDots.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Education.tsx
│   │   │   ├── TechStack.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Social.tsx
│   │   │   └── Contact.tsx
│   │   ├── three/
│   │   │   ├── PorscheModel.tsx
│   │   │   ├── TechStackScene.tsx
│   │   │   └── FloatingIcon.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── SkillBar.tsx
│   │   │   └── HUDOverlay.tsx
│   │   └── layout/
│   │       ├── PageWrapper.tsx
│   │       └── SmoothScroll.tsx
│   ├── animations/
│   │   ├── variants.ts
│   │   ├── transitions.ts
│   │   └── gsap-sequences.ts
│   ├── hooks/
│   │   ├── useScrollProgress.ts
│   │   ├── useReducedMotion.ts
│   │   └── useLenis.ts
│   ├── styles/
│   │   ├── globals.css
│   │   ├── tokens.css
│   │   └── animations.css
│   ├── data/
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   ├── education.ts
│   │   └── social.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── emailjs.ts
│   ├── App.tsx
│   └── main.tsx
├── docs/
│   ├── PRD.md              ← this file
│   ├── ANIMATION_RULES.md
│   ├── ANTIGRAVITY.md
│   ├── DESIGN_TOKENS.md
│   ├── COMPONENT_GUIDE.md
│   └── SETUP.md
├── .cursorrules            ← AI editor rules
├── .eslintrc.json
├── tailwind.config.ts
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Appendix: Design Decisions Log

| Decision | Rationale |
|----------|-----------|
| Full-page scroll vs. multi-page routing | Single continuous experience feels like a car journey |
| Spline for hero, Three.js for tech stack | Spline = fast beautiful 3D; Three.js = programmatic control for icons |
| Framer Motion layout animations for modals | `layoutId` allows cinematic card-to-modal expansion |
| Lenis over native scroll | Superior inertia feel; required for GSAP ScrollTrigger precision |
| EmailJS over backend | Zero-server-cost; sufficient for portfolio contact volume |
| Barlow Condensed for racing numbers | Authentic motorsport typography; evokes timing displays |
