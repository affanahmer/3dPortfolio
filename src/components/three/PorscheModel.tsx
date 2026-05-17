"use client";

import { useRef, useMemo, useEffect, Component, ReactNode } from "react";
import type { ErrorInfo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

/* ═══════════════════════════════════════════════════════════════════════════
   PORSCHE 911 GT3 RS — High-Fidelity 3D Model Component
   
   Loads from /public/models/porsche.glb with realistic PBR materials.
   Falls back to a stylized placeholder if the model is unavailable.
   
   Features:
   - MeshPhysicalMaterial with clearcoat for car paint
   - Environment-mapped reflections
   - scrollProgress prop for GSAP-driven rotation/position
   - Anti-gravity float (Profile A — "GT Hover" per ANTIGRAVITY.md)
   ═══════════════════════════════════════════════════════════════════════════ */

// ─── MATERIAL CLASSIFICATION ──────────────────────────────────────────────────
// Classify mesh names from common Porsche GLB exports to apply correct materials
const BODY_KEYWORDS = ["body", "paint", "hood", "fender", "door", "bumper", "trunk", "quarter", "roof", "shell", "car", "main"];
const GLASS_KEYWORDS = ["glass", "window", "windshield", "windscreen", "visor"];
const WHEEL_KEYWORDS = ["wheel", "rim", "tire", "tyre", "brake", "caliper", "disc", "rotor"];
const CHROME_KEYWORDS = ["chrome", "metal", "exhaust", "pipe", "trim", "badge", "emblem", "handle"];
const LIGHT_KEYWORDS = ["light", "lamp", "headlight", "taillight", "signal", "led", "lens"];
const CARBON_KEYWORDS = ["carbon", "splitter", "diffuser", "wing", "spoiler", "intake", "vent", "skirt"];
const INTERIOR_KEYWORDS = ["interior", "seat", "dash", "steering", "console", "carpet"];
const RUBBER_KEYWORDS = ["rubber", "seal", "gasket", "weatherstrip"];

function classifyMesh(name: string): string {
  const lower = name.toLowerCase();
  if (GLASS_KEYWORDS.some((k) => lower.includes(k))) return "glass";
  if (LIGHT_KEYWORDS.some((k) => lower.includes(k))) return "light";
  if (WHEEL_KEYWORDS.some((k) => lower.includes(k))) return "wheel";
  if (CHROME_KEYWORDS.some((k) => lower.includes(k))) return "chrome";
  if (CARBON_KEYWORDS.some((k) => lower.includes(k))) return "carbon";
  if (INTERIOR_KEYWORDS.some((k) => lower.includes(k))) return "interior";
  if (RUBBER_KEYWORDS.some((k) => lower.includes(k))) return "rubber";
  if (BODY_KEYWORDS.some((k) => lower.includes(k))) return "body";
  return "default";
}

// ─── SCROLL KEYFRAMES ─────────────────────────────────────────────────────────
// Maps scrollProgress (0–1) to cinematic car transforms per section.
// positionZ controls depth (negative = towards camera = "zoom in")
// rotationX adds tilt for dramatic angles
interface Keyframe {
  progress: number;
  rotationY: number;
  rotationX: number;
  positionX: number;
  positionY: number;
  positionZ: number;
  scale: number;
}

const SCROLL_KEYFRAMES: Keyframe[] = [
  // S1: HERO — 3/4 front view, centered, hero scale
  { progress: 0.0,  rotationY: -0.4,   rotationX: 0,     positionX: 0,    positionY: 0,    positionZ: 0,    scale: 1.0  },
  // S2: INTRO/ABOUT — side profile, slide right to leave room for text on left
  { progress: 0.14, rotationY: -1.2,   rotationX: 0.02,  positionX: 1.2,  positionY: 0,    positionZ: 0,    scale: 0.85 },
  // S3: EDUCATION — zoom into interior (car moves forward + slightly up + tilts down)
  { progress: 0.28, rotationY: -1.8,   rotationX: 0.15,  positionX: 0.3,  positionY: 0.3,  positionZ: -1.5, scale: 1.2  },
  // S4: TECH STACK — rear 3/4 view, scaled down, centered for grid overlay
  { progress: 0.42, rotationY: -3.14,  rotationX: 0,     positionX: -0.5, positionY: 0,    positionZ: 0.5,  scale: 0.7  },
  // S5: PROJECTS — car drives off-screen to the right (cinematic exit)
  { progress: 0.52, rotationY: -4.0,   rotationX: 0,     positionX: 4.0,  positionY: -0.2, positionZ: -2.0, scale: 0.6  },
  // S5 mid: car is fully off-screen
  { progress: 0.57, rotationY: -4.2,   rotationX: 0,     positionX: 5.5,  positionY: 0,    positionZ: -2.0, scale: 0.5  },
  // S6: SOCIAL — car re-enters from left, profile view
  { progress: 0.65, rotationY: -5.0,   rotationX: 0,     positionX: -1.0, positionY: 0,    positionZ: 0,    scale: 0.8  },
  // S7: CONTACT — car returns to center, full rotation completed, hero pose
  { progress: 0.85, rotationY: -6.28,  rotationX: 0,     positionX: 0,    positionY: 0,    positionZ: 0,    scale: 1.0  },
  // END — hold final pose
  { progress: 1.0,  rotationY: -6.28,  rotationX: 0,     positionX: 0,    positionY: 0,    positionZ: 0,    scale: 1.0  },
];

function lerpKeyframes(progress: number): { rotationY: number; positionX: number; positionY: number; scale: number } {
  const clamped = Math.max(0, Math.min(1, progress));

  // Find surrounding keyframes
  let i = 0;
  while (i < SCROLL_KEYFRAMES.length - 1 && SCROLL_KEYFRAMES[i + 1].progress <= clamped) i++;
  
  if (i >= SCROLL_KEYFRAMES.length - 1) return SCROLL_KEYFRAMES[SCROLL_KEYFRAMES.length - 1];

  const a = SCROLL_KEYFRAMES[i];
  const b = SCROLL_KEYFRAMES[i + 1];
  const t = (clamped - a.progress) / (b.progress - a.progress);
  
  // Smooth step interpolation (not linear — feels more cinematic)
  const smoothT = t * t * (3 - 2 * t);

  return {
    rotationY: a.rotationY + (b.rotationY - a.rotationY) * smoothT,
    positionX: a.positionX + (b.positionX - a.positionX) * smoothT,
    positionY: a.positionY + (b.positionY - a.positionY) * smoothT,
    scale: a.scale + (b.scale - a.scale) * smoothT,
  };
}

// ─── PROPS ────────────────────────────────────────────────────────────────────
interface PorscheModelProps {
  /** Scroll progress from 0 (top) to 1 (bottom) — driven by GSAP ScrollTrigger */
  scrollProgress?: number;
  /** Override base color (default Guards Red #E8000D) */
  color?: string;
}

// ─── GLB MODEL COMPONENT ─────────────────────────────────────────────────────
function GLBModel({ scrollProgress = 0, color = "#E8000D" }: PorscheModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/porsche.glb");
  const { gl } = useThree();

  // ─── CREATE REALISTIC MATERIALS ──────────────────────────────────────────
  const materials = useMemo(() => {
    const envMapIntensity = 1.5;

    // Guards Red car paint — MeshPhysicalMaterial with clearcoat
    const bodyPaint = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(color),
      metalness: 0.4,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      envMapIntensity,
      reflectivity: 0.9,
    });

    // Automotive glass — transmission + slight tint
    const glass = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#111111"),
      metalness: 0,
      roughness: 0.0,
      transmission: 0.95,
      transparent: true,
      thickness: 0.5,
      ior: 1.5,
      envMapIntensity: 0.5,
      attenuationColor: new THREE.Color("#88aacc"),
      attenuationDistance: 0.5,
    });

    // Chrome/metal trim
    const chrome = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#cccccc"),
      metalness: 1.0,
      roughness: 0.05,
      envMapIntensity: 2.0,
      reflectivity: 1.0,
    });

    // Matte carbon fiber
    const carbon = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#1a1a1a"),
      metalness: 0.1,
      roughness: 0.6,
      clearcoat: 0.6,
      clearcoatRoughness: 0.3,
      envMapIntensity: 0.8,
    });

    // Wheels — dark alloy
    const wheel = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#2a2a2a"),
      metalness: 0.9,
      roughness: 0.25,
      envMapIntensity: 1.2,
    });

    // Interior — dark alcantara-like
    const interior = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#0f0f0f"),
      metalness: 0.0,
      roughness: 0.85,
    });

    // Rubber — tires, seals
    const rubber = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#111111"),
      metalness: 0.0,
      roughness: 0.95,
    });

    // Emissive headlights
    const lightMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#ffffff"),
      emissive: new THREE.Color("#ffffff"),
      emissiveIntensity: 1.5,
      metalness: 0.1,
      roughness: 0.1,
    });

    // Default fallback — treated as body paint
    const defaultMat = bodyPaint.clone();

    return { body: bodyPaint, glass, chrome, carbon, wheel, interior, rubber, light: lightMat, default: defaultMat };
  }, [color]);

  // ─── APPLY MATERIALS TO LOADED SCENE ─────────────────────────────────────
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        const classification = classifyMesh(child.name);
        const mat = materials[classification as keyof typeof materials] || materials.default;
        child.material = mat;

        // Ensure geometry has proper normals for clearcoat
        if (child.geometry && !child.geometry.getAttribute("normal")) {
          child.geometry.computeVertexNormals();
        }
      }
    });

    // Cleanup tone mapping
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.2;
  }, [scene, materials, gl]);

  // ─── ANIMATION LOOP ──────────────────────────────────────────────────────
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Scroll-driven keyframe interpolation
    const kf = lerpKeyframes(scrollProgress);

    // Apply scroll-driven rotation (GSAP-controlled via prop)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      kf.rotationY,
      0.05 // Smooth damping — not instant snap
    );

    // Apply scroll-driven position
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      kf.positionX,
      0.05
    );

    // Anti-gravity float (Profile A — GT Hover) layered on top of scroll position
    const floatY = Math.sin(t * 0.6) * 0.08;
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      kf.positionY + floatY,
      0.08
    );

    // Breathing scale layered on scroll scale
    const breathe = kf.scale + Math.sin(t * 0.8) * 0.003;
    const currentScale = groupRef.current.scale.x;
    const targetScale = THREE.MathUtils.lerp(currentScale, breathe, 0.05);
    groupRef.current.scale.setScalar(targetScale);

    // Subtle Z tilt — imperceptible rotation gives life
    groupRef.current.rotation.z = Math.sin(t * 0.4) * 0.005;

    // Very subtle X rock
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.003;
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      <primitive
        object={scene}
        scale={1.0}
        dispose={null}
      />
    </group>
  );
}

// ─── PLACEHOLDER FALLBACK ─────────────────────────────────────────────────────
// Used when /models/porsche.glb is not yet available
function PlaceholderModel({ scrollProgress = 0, color = "#E8000D" }: PorscheModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color),
        metalness: 0.4,
        roughness: 0.15,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        envMapIntensity: 1.5,
        reflectivity: 0.9,
      }),
    [color]
  );

  const darkMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#1A1A1A"),
        metalness: 0.1,
        roughness: 0.6,
        clearcoat: 0.6,
        clearcoatRoughness: 0.3,
      }),
    []
  );

  const glassMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#111111"),
        metalness: 0,
        roughness: 0,
        transmission: 0.92,
        transparent: true,
        thickness: 0.3,
        ior: 1.5,
      }),
    []
  );

  const wheelMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#2a2a2a"),
        metalness: 0.9,
        roughness: 0.25,
        envMapIntensity: 1.2,
      }),
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const kf = lerpKeyframes(scrollProgress);

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, kf.rotationY, 0.05);
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, kf.positionX, 0.05);

    const floatY = Math.sin(t * 0.6) * 0.12;
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, kf.positionY + floatY, 0.08);

    const breathe = kf.scale + Math.sin(t * 0.8) * 0.004;
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, breathe, 0.05));

    groupRef.current.rotation.z = Math.sin(t * 0.4) * 0.008;
  });

  return (
    <group ref={groupRef} scale={1.5} position={[0, -0.3, 0]} rotation={[0, -0.4, 0]}>
      {/* Lower body */}
      <mesh material={bodyMaterial} position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[2.8, 0.45, 1.2]} />
      </mesh>
      {/* Upper cabin */}
      <mesh material={bodyMaterial} position={[0.15, 0.55, 0]} castShadow>
        <boxGeometry args={[1.6, 0.35, 1.1]} />
      </mesh>
      {/* Front slope */}
      <mesh material={bodyMaterial} position={[-0.55, 0.5, 0]} castShadow>
        <boxGeometry args={[0.4, 0.25, 1.05]} />
      </mesh>
      {/* Windshield */}
      <mesh material={glassMaterial} position={[-0.35, 0.62, 0]}>
        <boxGeometry args={[0.6, 0.25, 0.95]} />
      </mesh>
      {/* Rear glass */}
      <mesh material={glassMaterial} position={[0.65, 0.6, 0]}>
        <boxGeometry args={[0.35, 0.22, 0.9]} />
      </mesh>
      {/* GT3 RS Wing */}
      <mesh material={darkMaterial} position={[1.2, 0.7, 0.35]} castShadow>
        <boxGeometry args={[0.06, 0.35, 0.06]} />
      </mesh>
      <mesh material={darkMaterial} position={[1.2, 0.7, -0.35]} castShadow>
        <boxGeometry args={[0.06, 0.35, 0.06]} />
      </mesh>
      <mesh material={darkMaterial} position={[1.2, 0.9, 0]} castShadow>
        <boxGeometry args={[0.35, 0.04, 1.0]} />
      </mesh>
      {/* Front splitter */}
      <mesh material={darkMaterial} position={[-1.45, 0.08, 0]} castShadow>
        <boxGeometry args={[0.15, 0.06, 1.3]} />
      </mesh>
      {/* Rear diffuser */}
      <mesh material={darkMaterial} position={[1.4, 0.08, 0]} castShadow>
        <boxGeometry args={[0.1, 0.1, 1.2]} />
      </mesh>
      {/* Side intakes */}
      <mesh material={darkMaterial} position={[0.3, 0.25, 0.63]} castShadow>
        <boxGeometry args={[0.6, 0.15, 0.05]} />
      </mesh>
      <mesh material={darkMaterial} position={[0.3, 0.25, -0.63]} castShadow>
        <boxGeometry args={[0.6, 0.15, 0.05]} />
      </mesh>
      {/* Wheels */}
      <mesh material={wheelMaterial} position={[-0.85, 0, 0.65]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.12, 16]} />
      </mesh>
      <mesh material={wheelMaterial} position={[-0.85, 0, -0.65]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.12, 16]} />
      </mesh>
      <mesh material={wheelMaterial} position={[0.85, 0, 0.65]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.14, 16]} />
      </mesh>
      <mesh material={wheelMaterial} position={[0.85, 0, -0.65]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.14, 16]} />
      </mesh>
      {/* Headlights */}
      <mesh position={[-1.38, 0.3, 0.38]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[-1.38, 0.3, -0.38]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
      </mesh>
      {/* Taillights */}
      <mesh position={[1.38, 0.3, 0.35]}>
        <boxGeometry args={[0.03, 0.06, 0.2]} />
        <meshStandardMaterial color="#E8000D" emissive="#E8000D" emissiveIntensity={2} />
      </mesh>
      <mesh position={[1.38, 0.3, -0.35]}>
        <boxGeometry args={[0.03, 0.06, 0.2]} />
        <meshStandardMaterial color="#E8000D" emissive="#E8000D" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

// ─── ERROR BOUNDARY FOR GLB LOADING ───────────────────────────────────────────
// React Error Boundary catches the useGLTF 404 and renders placeholder fallback

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ModelErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn("[PorscheModel] GLB load failed, using placeholder:", error.message, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
// Wraps GLBModel in Error Boundary — falls back to PlaceholderModel on 404
export default function PorscheModel(props: PorscheModelProps) {
  return (
    <ModelErrorBoundary fallback={<PlaceholderModel {...props} />}>
      <GLBModel {...props} />
    </ModelErrorBoundary>
  );
}
