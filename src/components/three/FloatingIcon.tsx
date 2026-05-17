"use client";

import { ReactNode } from "react";
import { Float } from "@react-three/drei";

interface FloatingIconProps {
  index: number;
  children: ReactNode;
  position?: [number, number, number];
}

/**
 * Floating icon wrapper using drei's Float component
 * Per ANTIGRAVITY.md Profile B — "Tech Orbit"
 * Each icon gets desynchronized timing to avoid the "marching" effect
 */
export default function FloatingIcon({
  index,
  children,
  position = [0, 0, 0],
}: FloatingIconProps) {
  // Desynchronize each icon by varying speed and phase
  const speed = 1.0 + (index % 6) * 0.25; // 1.0 – 2.25
  const rotIntensity = 0.1 + (index % 4) * 0.08; // 0.1 – 0.34
  const floatIntens = 0.3 + (index % 3) * 0.15; // 0.3 – 0.6

  return (
    <group position={position}>
      <Float
        speed={speed}
        rotationIntensity={rotIntensity}
        floatIntensity={floatIntens}
        floatingRange={[-0.1, 0.1]}
      >
        {children}
      </Float>
    </group>
  );
}
