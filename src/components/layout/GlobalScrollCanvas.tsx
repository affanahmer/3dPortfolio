"use client";

import React, { useEffect, useRef, useState } from "react";
import { MotionValue, useMotionValueEvent, useTransform } from "framer-motion";

interface GlobalScrollCanvasProps {
  scrollYProgress: MotionValue<number>;
  onLoadComplete?: () => void;
}

export default function GlobalScrollCanvas({ scrollYProgress, onLoadComplete }: GlobalScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const TOTAL_FRAMES = 240;

  // Preload images on mount
  useEffect(() => {
    let isMounted = true;
    const preloadedImages: HTMLImageElement[] = [];
    let count = 0;

    const handleImageLoad = () => {
      if (!isMounted) return;
      count++;
      setLoadedCount(count);
      if (count === TOTAL_FRAMES) {
        setIsLoaded(true);
        if (onLoadComplete) onLoadComplete();
        // Initial frame draw
        requestAnimationFrame(() => {
          renderFrame(0);
        });
      }
    };

    const handleImageError = (e: string | Event) => {
      console.error("Failed to load image frame", e);
      if (!isMounted) return;
      count++;
      setLoadedCount(count);
      if (count === TOTAL_FRAMES) {
        setIsLoaded(true);
        if (onLoadComplete) onLoadComplete();
      }
    };

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, "0");
      img.src = `/assets/porsche-sequence/frame_${paddedIndex}.jpg`;
      img.onload = handleImageLoad;
      img.onerror = handleImageError;
      preloadedImages.push(img);
    }

    imagesRef.current = preloadedImages;

    return () => {
      isMounted = false;
    };
  }, [onLoadComplete]);

  // Map scroll progress (0-1) to frame index (0-239)
  const frameIndexTransform = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    // Clamp current index to bounds
    const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.floor(index)));
    const image = imagesRef.current[clampedIndex];
    if (!image || !image.complete) return;

    const devicePixelRatio = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // Scale canvas buffer for high-DPI displays
    if (canvas.width !== width * devicePixelRatio || canvas.height !== height * devicePixelRatio) {
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      context.scale(devicePixelRatio, devicePixelRatio);
    }

    // Clear canvas
    context.clearRect(0, 0, width, height);

    // Contain scaling calculation
    const imgRatio = image.width / image.height;
    const canvasRatio = width / height;
    let drawWidth = width;
    let drawHeight = height;
    let x = 0;
    let y = 0;

    if (canvasRatio > imgRatio) {
      drawWidth = height * imgRatio;
      x = (width - drawWidth) / 2;
    } else {
      drawHeight = width / imgRatio;
      y = (height - drawHeight) / 2;
    }

    context.drawImage(image, x, y, drawWidth, drawHeight);
  };

  // Draw frame on scroll changes
  useMotionValueEvent(frameIndexTransform, "change", (latest) => {
    if (isLoaded) {
      renderFrame(latest);
    }
  });

  // Redraw current frame on window resize
  useEffect(() => {
    if (!isLoaded) return;
    const handleResize = () => {
      const currentIdx = frameIndexTransform.get();
      renderFrame(currentIdx);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded, frameIndexTransform]);

  if (!isLoaded) {
    const percentage = Math.floor((loadedCount / TOTAL_FRAMES) * 100);
    return (
      <div className="fixed inset-0 bg-[#000000] flex flex-col justify-center items-center select-none z-50 noise-overlay">
        {/* Sleek cyber-neon dashboard telemetry loader */}
        <div className="w-[320px] md:w-[450px] px-8 flex flex-col gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-racing text-accent-cyan tracking-[0.3em] uppercase">SYSTEM CALIBRATION</span>
            <h2 className="text-xl font-bold font-racing tracking-[0.15em] text-[#F5F5F5]">PREPARING COCKPIT</h2>
          </div>

          {/* Glowing neon loader bar (Cyan to Violet gradient) */}
          <div className="relative w-full h-[3px] bg-[#141418] rounded-[2px] overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-accent-cyan to-accent-violet transition-all duration-150 ease-out shadow-[0_0_12px_rgba(0,240,255,0.4)]" 
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-text-secondary">
            <span className="tracking-wider">SYS.PRSCH.911_GT3RS</span>
            <span className="text-accent-cyan font-bold font-racing text-[14px]">{percentage}%</span>
          </div>

          {/* Cyber telemetry logs */}
          <div className="h-6 overflow-hidden text-[9px] font-mono text-accent-violet/60 flex justify-center items-center">
            {percentage < 20 && <span>INIT_COCKPIT_HUD...</span>}
            {percentage >= 20 && percentage < 45 && <span>SYNC_RPM_SPEED_DIALS...</span>}
            {percentage >= 45 && percentage < 70 && <span>ESTABLISHING_G_FORCE_ACCEL_MATRIX...</span>}
            {percentage >= 70 && percentage < 95 && <span>RENDERING_3D_EXPLODED_BACKBONE...</span>}
            {percentage >= 95 && <span className="text-accent-cyan">CALIBRATION_SUCCESSFUL. READY.</span>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black -z-10 pointer-events-none">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block object-contain"
      />
      {/* Subtle radial studio gradient mask (fading to solid black at edges) */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: "radial-gradient(circle at center, transparent 15%, rgba(0, 0, 0, 0.8) 100%)"
        }}
      />
    </div>
  );
}
