"use client";

import { Suspense, ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  Preload,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════════════
   SCENE — R3F Canvas Wrapper with Studio Lighting
   
   Provides:
   - Environment map (studio preset) for realistic reflections
   - 3-point SpotLight rig (key, fill, rim)
   - ContactShadows for grounded realism
   - Post-processing: Bloom, ChromaticAberration, Vignette
   - Custom Loader3D fallback component
   ═══════════════════════════════════════════════════════════════════════════ */

interface SceneProps {
  children: ReactNode;
  className?: string;
  showPostProcessing?: boolean;
  showContactShadows?: boolean;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
}

/**
 * Custom 3D loading fallback
 * Racing-themed spinner displayed while Canvas/models load
 */
function Loader3D() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-bg-primary)]">
      <div className="flex flex-col items-center gap-4">
        {/* Spinning ring */}
        <motion.div
          className="w-16 h-16 border-2 border-[var(--color-border-subtle)] border-t-[var(--color-accent-red)] rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, ease: "linear", repeat: Infinity }}
        />
        {/* Loading text */}
        <motion.p
          className="text-sm font-mono text-[var(--color-text-secondary)] tracking-[0.3em] uppercase"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
        >
          Loading 3D Scene
        </motion.p>
      </div>
    </div>
  );
}

/**
 * Studio lighting rig — 3-point light setup for automotive showcase
 *
 * Key light:  Warm white from front-right, high angle — main illumination
 * Fill light: Cool blue from left, softer — prevents harsh shadows
 * Rim light:  Red accent from behind — silhouette edge, brand color accent
 * Ground bounce: Subtle upward ambient for underbody fill
 */
function StudioLights() {
  return (
    <>
      {/* Ambient base — very low to maintain contrast */}
      <ambientLight intensity={0.15} color="#ffffff" />

      {/* KEY LIGHT — Warm white, front-right, 45° elevation */}
      <spotLight
        position={[5, 6, 3]}
        angle={0.5}
        penumbra={0.8}
        intensity={2.5}
        color="#fff5e6"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />

      {/* FILL LIGHT — Cool blue, left side, lower angle */}
      <spotLight
        position={[-4, 3, -2]}
        angle={0.6}
        penumbra={1}
        intensity={1.2}
        color="#c8e0ff"
      />

      {/* RIM LIGHT — Guards Red accent from behind, creates silhouette edge */}
      <spotLight
        position={[0, 4, -5]}
        angle={0.4}
        penumbra={0.5}
        intensity={1.8}
        color="#E8000D"
      />

      {/* TOP FILL — Soft overhead for roof highlights */}
      <directionalLight
        position={[0, 8, 0]}
        intensity={0.6}
        color="#ffffff"
      />

      {/* GROUND BOUNCE — Subtle upward fill to illuminate underbody */}
      <pointLight
        position={[0, -1, 0]}
        intensity={0.3}
        color="#1a1a2e"
        distance={8}
        decay={2}
      />
    </>
  );
}

/**
 * R3F Canvas wrapper — standardized 3D scene setup
 * Includes studio lighting, Environment maps, ContactShadows, and post-processing
 */
export default function Scene({
  children,
  className = "",
  showPostProcessing = true,
  showContactShadows = true,
  cameraPosition = [0, 1.5, 5],
  cameraFov = 45,
}: SceneProps) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Suspense fallback={<Loader3D />}>
        <Canvas
          camera={{
            position: cameraPosition,
            fov: cameraFov,
            near: 0.1,
            far: 100,
          }}
          dpr={[1, 1.2]}
          shadows
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            toneMapping: 4, // ACESFilmicToneMapping
            toneMappingExposure: 1.1,
            failIfMajorPerformanceCaveat: false,
            preserveDrawingBuffer: true,
          }}
          onCreated={({ gl }) => {
            // Handle WebGL context loss gracefully
            const canvas = gl.domElement;
            canvas.addEventListener("webglcontextlost", (e) => {
              e.preventDefault();
              console.warn("[Scene] WebGL context lost — attempting recovery");
            });
            canvas.addEventListener("webglcontextrestored", () => {
              console.info("[Scene] WebGL context restored");
            });
          }}
          style={{ background: "transparent" }}
        >
          {/* Studio lighting rig */}
          <StudioLights />

          {/* Environment map for reflections — "studio" for clean automotive reflections */}
          <Environment
            preset="studio"
            environmentIntensity={0.8}
            backgroundBlurriness={1}
          />

          {/* Contact Shadows for grounded realism */}
          {showContactShadows && (
            <ContactShadows
              position={[0, -0.5, 0]}
              opacity={0.5}
              scale={12}
              blur={2.5}
              far={4}
              color="#E8000D"
              resolution={512}
            />
          )}

          {/* Scene content (PorscheModel, etc.) */}
          {children}

          {/* Post-processing pipeline */}
          {showPostProcessing && (
            <EffectComposer>
              <Bloom
                intensity={0.4}
                luminanceThreshold={0.85}
                luminanceSmoothing={0.9}
                blendFunction={BlendFunction.ADD}
              />
              <ChromaticAberration
                blendFunction={BlendFunction.NORMAL}
                offset={[0.0003, 0.0003]}
              />
              <Vignette
                offset={0.3}
                darkness={0.5}
                blendFunction={BlendFunction.NORMAL}
              />
            </EffectComposer>
          )}

          <Preload all />
        </Canvas>
      </Suspense>
    </div>
  );
}
