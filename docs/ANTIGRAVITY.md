# 🌌 ANTIGRAVITY.md
## Anti-Gravity Floating Animation Spec — 3D Portfolio

> The sensation of objects defying gravity is core to the portfolio's identity. Like a Porsche lifting off at Weissach — briefly untethered from the earth.

---

## What Is "Anti-Gravity" in This Context?

Anti-gravity animations are the **continuous, idle floating motions** applied to 3D objects and key UI elements throughout the site. They communicate:

- **Weightlessness** — technology elevated above the ordinary
- **Life** — the site breathes; nothing is static
- **Depth** — floating at different rates creates parallax, enhancing the 3D illusion

Anti-gravity effects are used on:
1. The Porsche 911 GT3 RS model (Hero section)
2. Tech stack icons (Page 4 — Three.js scene)
3. Project cards on hover
4. Decorative background particles
5. HUD corner elements in the Hero

---

## 1. Floating Motion Profiles

Each floating element belongs to one of four motion profiles. Mix profiles across elements in the same scene to avoid synchronization (the "marching" effect where everything bobs in unison).

### Profile A — "GT Hover" (Primary Car Float)

Used for: Porsche model in hero

```typescript
// react-three-fiber Float component
<Float
  speed={1.4}           // Animation cycles per second
  rotationIntensity={0.3}   // Subtle rotation adds life
  floatIntensity={0.8}      // Y-axis displacement (Three.js units)
  floatingRange={[-0.15, 0.15]}  // Y min/max bounds
>
  <PorscheModel />
</Float>
```

CSS/Framer Motion equivalent (for 2D elements):
```typescript
animate={{
  y: [0, -12, 0],
  rotateZ: [0, 0.5, 0],
}}
transition={{
  duration: 4.0,
  ease: "easeInOut",
  repeat: Infinity,
  repeatType: "loop",
}}
```

### Profile B — "Tech Orbit" (Icon Float)

Used for: Tech stack icons, small decorative elements

Each icon gets a randomized offset so they desynchronize naturally:

```typescript
// Generate per-icon float params
const getFloatProfile = (index: number) => ({
  yOffset:   [0, -(6 + (index % 4) * 2), 0],       // 6–12px range
  duration:  2.5 + (index % 5) * 0.4,               // 2.5s – 4.5s
  delay:     (index % 7) * 0.3,                      // 0 – 2.1s stagger
  rotateZ:   [0, (index % 2 === 0 ? 1.5 : -1.5), 0], // Alternating tilt
})

// Usage:
<motion.div
  animate={{
    y: profile.yOffset,
    rotateZ: profile.rotateZ,
  }}
  transition={{
    duration: profile.duration,
    delay: profile.delay,
    ease: "easeInOut",
    repeat: Infinity,
  }}
/>
```

### Profile C — "Particle Drift" (Background Elements)

Used for: Background particles, decorative dots, grid lines

```typescript
// Slow, barely perceptible drift
<motion.div
  animate={{
    y: [0, -20, 0],
    x: [0, 5, -5, 0],
    opacity: [0.2, 0.4, 0.2],
  }}
  transition={{
    duration: 8,
    ease: "easeInOut",
    repeat: Infinity,
    delay: Math.random() * 5,
  }}
/>
```

### Profile D — "HUD Pulse" (UI overlay elements)

Used for: RPM/SPEED telemetry corners, scroll indicator

```typescript
// Subtle vertical pulse with opacity breathe
<motion.div
  animate={{
    y: [0, -4, 0],
    opacity: [0.7, 1, 0.7],
  }}
  transition={{
    duration: 2,
    ease: "easeInOut",
    repeat: Infinity,
  }}
/>
```

---

## 2. Three.js Anti-Gravity Implementation

### Using @react-three/drei `Float`

```tsx
// src/components/three/FloatingIcon.tsx
import { Float } from "@react-three/drei"

interface FloatingIconProps {
  index: number
  children: React.ReactNode
}

export function FloatingIcon({ index, children }: FloatingIconProps) {
  // Desynchronize each icon by varying speed and phase
  const speed        = 1.0 + (index % 6) * 0.25       // 1.0 – 2.25
  const rotIntensity = 0.1 + (index % 4) * 0.08        // 0.1 – 0.34
  const floatIntens  = 0.3 + (index % 3) * 0.15        // 0.3 – 0.6

  return (
    <Float
      speed={speed}
      rotationIntensity={rotIntensity}
      floatIntensity={floatIntens}
      floatingRange={[-0.1, 0.1]}
    >
      {children}
    </Float>
  )
}
```

### Custom Sine Float (without drei)

```tsx
// src/components/three/PorscheModel.tsx
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

export function PorscheModel() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()

    // Y float: gentle sine wave
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.12

    // X sway: slower, subtler
    groupRef.current.position.x = Math.sin(t * 0.25) * 0.04

    // Z tilt: imperceptible rotation gives life
    groupRef.current.rotation.z = Math.sin(t * 0.4) * 0.008

    // Breathing scale
    const breathe = 1 + Math.sin(t * 0.8) * 0.004
    groupRef.current.scale.setScalar(breathe)
  })

  return (
    <group ref={groupRef}>
      {/* GLB model loaded here */}
    </group>
  )
}
```

---

## 3. Anti-Gravity Rules

### The Three Laws of Anti-Gravity Animation

**Law 1 — No Synchronization**
Elements floating in the same viewport must NEVER share identical duration, delay, or phase. Synchronization breaks the illusion of weightlessness and looks mechanical.

```typescript
// ❌ BAD — all icons bob together
icons.map((icon) => (
  <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} />
))

// ✅ GOOD — each has its own timing
icons.map((icon, i) => (
  <motion.div
    animate={{ y: [0, -(8 + i * 1.5), 0] }}
    transition={{ duration: 2.8 + i * 0.3, delay: i * 0.25, repeat: Infinity }}
  />
))
```

**Law 2 — No Jitter**
Float amplitude must be smooth. Use `easeInOut` or sine curves only. Never use `linear` for float — it looks robotic.

```typescript
// ❌ BAD
transition={{ ease: "linear" }}

// ✅ GOOD
transition={{ ease: "easeInOut" }}
// or
// Framer Motion keyframes with custom cubic-bezier:
transition={{ ease: [0.45, 0, 0.55, 1] }}
```

**Law 3 — Hierarchy of Float**
Larger/more important elements float slower and further. Smaller elements float faster and subtler. This creates natural depth:

| Element | Amplitude | Duration |
|---------|-----------|----------|
| Porsche Model (hero) | ±12px / ±0.15 units | 4.0s |
| Large tech icons | ±8–10px | 3.0–3.5s |
| Medium icons | ±5–8px | 2.5–3.0s |
| Small badges | ±3–5px | 2.0–2.5s |
| Particles | ±15–25px (slow drift) | 6–10s |
| HUD elements | ±3–4px | 2.0s |

---

## 4. Interaction — Anti-Gravity on Hover

When a user hovers over a floating element, the float pauses and the element responds to cursor:

```typescript
// Magnetic hover — element is attracted toward cursor
const useMagneticFloat = (ref: RefObject<HTMLElement>, strength = 0.3) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * strength)
    y.set((e.clientY - centerY) * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return { x, y, handleMouseMove, handleMouseLeave }
}

// Component usage:
const { x, y, handleMouseMove, handleMouseLeave } = useMagneticFloat(cardRef, 0.25)

<motion.div
  ref={cardRef}
  style={{ x, y }}
  onMouseMove={handleMouseMove}
  onMouseLeave={handleMouseLeave}
  whileHover={{ scale: 1.05, z: 20 }}
  // Pause the float loop on hover:
  animate={isHovered ? { y: 0 } : floatAnimation}
/>
```

---

## 5. Performance Rules for Anti-Gravity

| Rule | Why |
|------|-----|
| Use `transform: translateY()` only | No layout recalculation |
| Pause off-screen floats via `IntersectionObserver` | Saves GPU cycles |
| Use `will-change: transform` only while animating | Add on mount, remove on unmount |
| For Three.js floats, use `useFrame` not `setInterval` | Syncs with render loop |
| Cap simultaneous floating elements to 20 on screen | Beyond that: imperceptible, wasteful |
| On mobile: halve amplitude, simplify to Y-only | Touch devices less powerful |

```typescript
// Pause float when off-screen
const { ref, inView } = useInView({ threshold: 0.1 })

<motion.div
  ref={ref}
  animate={inView ? floatAnimation : { y: 0 }}
/>
```

---

## 6. Spline Anti-Gravity

When using Spline scenes, configure anti-gravity directly in the Spline editor:

1. Select the 3D object
2. Add **Motion Path** → Sine wave Y-axis
3. Set: Amplitude = 0.1–0.2, Frequency = 0.3–0.5, Phase = unique per object
4. For secondary objects: increase phase offset by 1.0 per object
5. Export: use `@splinetool/react-spline` with `onLoad` to access scene graph if needed

```tsx
import Spline from "@splinetool/react-spline"

<Spline
  scene="https://prod.spline.design/[YOUR-SCENE-ID]/scene.splinecode"
  onLoad={(spline) => {
    // Access specific objects if needed
    const car = spline.findObjectByName("Porsche911")
    // Spline handles its own float internally via the editor settings
  }}
/>
```

---

## 7. Anti-Gravity in Context

### Scene-Level Float Map (Hero Section)

```
Z-depth      Element              Float Profile   Duration
────────────────────────────────────────────────────────
Far back     Particle field       C (Drift)       8–12s
             Grid lines           D (Pulse)       Static
Mid          Background text      B (Orbit)       6s
             Decorative circles   B               4.5s
Foreground   Porsche 911 model    A (GT Hover)    4.0s
             HUD corners          D               2.0s
Closest      Cursor glow          Cursor-follow   Instant
```

### Depth Simulation via Float Rate

Objects that are "further away" in Z should float more slowly. This mimics how distant objects appear to move less in the real world — enhancing the sense of 3D depth even on a 2D screen.

```typescript
const depthToSpeed = (zDepth: number): number => {
  // zDepth: 0 = closest, 1 = furthest
  // Speed: 1.8 = fastest (close), 0.5 = slowest (far)
  return 1.8 - zDepth * 1.3
}
```

---

## Checklist

Before shipping any section with floating elements:

- [ ] No two elements have identical `duration` + `delay` combination
- [ ] All floats use `easeInOut` (not `linear`)
- [ ] Off-screen float pauses implemented
- [ ] Mobile: amplitude ≤ 50% of desktop value
- [ ] Hover state: float pauses, magnetic response activates
- [ ] Reduced motion: all floats set to `y: 0`, no animation
- [ ] `will-change: transform` added, then removed after animation stabilizes
- [ ] Verified 60fps in Chrome DevTools Performance panel
