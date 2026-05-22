"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

// ─── CAR MODEL COMPONENT ───────────────────────────────────────────────────────
function CarModel() {
  const { scene } = useGLTF("/models/porsche-911-gt3rs.glb");
  const groupRef = useRef<THREE.Group>(null);

  // Traverse the model to enable shadows and realistic physical materials
  React.useMemo(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Upgrade materials to MeshPhysicalMaterial for clearcoat reflection
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mesh.material = new THREE.MeshPhysicalMaterial({
            color: mat.color,
            map: mat.map,
            normalMap: mat.normalMap,
            roughnessMap: mat.roughnessMap,
            metalnessMap: mat.metalnessMap,
            roughness: 0.15,
            metalness: 0.8,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            envMapIntensity: 1.5,
          });
        }
      }
    });
  }, [scene]);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      // Period 6.5s → freq = 2 * PI / 6.5 ≈ 0.966
      groupRef.current.position.y = Math.sin(t * 0.966) * 0.12;
      groupRef.current.rotation.y += 0.0015;
    }
  });

  // Scale and center the model
  return (
    <group ref={groupRef}>
      <primitive 
        object={scene} 
        scale={0.8} 
        position={[0, -0.6, 0]} 
        rotation={[0, -Math.PI / 4, 0]}
      />
    </group>
  );
}

// ─── POST PROCESSING COMPONENT ────────────────────────────────────────────────
// Defer loading to prevent any alpha null reference issues
function PostEffects() {
  return (
    <EffectComposer>
      <Bloom 
        luminanceThreshold={0.3} 
        intensity={1.5} 
      />
      <Vignette 
        offset={0.5} 
        darkness={0.6} 
      />
    </EffectComposer>
  );
}

// ─── RED SPINNER FALLBACK ─────────────────────────────────────────────────────
function RedSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#0A0A0A] z-0">
      <div className="w-12 h-12 border-4 border-white/10 border-t-[#E8000D] rounded-full animate-spin" />
    </div>
  );
}

// ─── MAIN PORSCHE SCENE ────────────────────────────────────────────────────────
export default function PorscheScene() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
      <Suspense fallback={<RedSpinner />}>
        <Canvas
          camera={{ position: [0, 1.2, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
          style={{ width: "100%", height: "100%" }}
        >
          <ambientLight intensity={0.5} />
          
          {/* Environment Night Preset */}
          <Environment preset="night" />

          {/* PointLights for red and blue highlights */}
          <pointLight 
            position={[3, 3, 3]} 
            color="#E8000D" 
            intensity={2} 
          />
          <pointLight 
            position={[-3, 2, -2]} 
            color="#00D4FF" 
            intensity={1.5} 
          />

          {/* Render 3D Model */}
          <CarModel />

          {/* Post Processing */}
          <PostEffects />
        </Canvas>
      </Suspense>
    </div>
  );
}

// Pre-preload the model
useGLTF.preload("/models/porsche-911-gt3rs.glb");
