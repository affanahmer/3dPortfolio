"use client";

import React, { useEffect, useRef, useState } from "react";
import { MotionValue, useMotionValueEvent, useTransform } from "framer-motion";

interface ScrollSequenceProps {
  scrollYProgress: MotionValue<number>;
  onLoadComplete?: () => void;
}

export default function ScrollSequence({ scrollYProgress, onLoadComplete }: ScrollSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const TOTAL_FRAMES = 240;

  // Preload images
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
        // Trigger first render
        requestAnimationFrame(() => {
          renderFrame(0);
        });
      }
    };

    const handleImageError = (e: string | Event) => {
      console.error("Failed to load image frame", e);
      if (!isMounted) return;
      // Continue loading others so we don't get stuck forever
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

    // Get current image (ensure clamp to index bounds)
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

    // Clean canvas
    context.clearRect(0, 0, width, height);

    // Contain scale calculation
    const imgRatio = image.width / image.height;
    const canvasRatio = width / height;
    let drawWidth = width;
    let drawHeight = height;
    let x = 0;
    let y = 0;

    if (canvasRatio > imgRatio) {
      // Screen is wider than image aspect ratio -> fit height
      drawWidth = height * imgRatio;
      x = (width - drawWidth) / 2;
    } else {
      // Screen is taller than image aspect ratio -> fit width
      drawHeight = width / imgRatio;
      y = (height - drawHeight) / 2;
    }

    context.drawImage(image, x, y, drawWidth, drawHeight);
  };

  // Draw frame on scroll progress changes
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
      <div className="absolute inset-0 bg-[#000000] flex flex-col justify-center items-center select-none z-50">
        {/* Sleek dashboard telemetry UI */}
        <div className="w-[320px] md:w-[450px] px-8 flex flex-col gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-racing text-[#C0A060] tracking-[0.3em] uppercase">SYSTEM SYSTEM-CHECK</span>
            <h2 className="text-xl font-bold font-racing tracking-[0.15em] text-[#F5F5F5]">CALIBRATING TELEMETRY</h2>
          </div>

          {/* Glowing loader bar */}
          <div className="relative w-full h-[3px] bg-[#1a1a1a] rounded-[2px] overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-[#E8000D] transition-all duration-150 ease-out shadow-[0_0_12px_#E8000D]" 
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] font-mono text-[#A0A0A0]">
            <span className="tracking-wider">SYS.PRSCH.911_GT3RS</span>
            <span className="text-[#E8000D] font-bold font-racing text-[14px]">{percentage}%</span>
          </div>

          {/* Micro telemetry text details changing */}
          <div className="h-6 overflow-hidden text-[9px] font-mono text-[#A0A0A0]/40 flex justify-center items-center">
            {percentage < 20 && <span>INITIALIZING SENSORS...</span>}
            {percentage >= 20 && percentage < 45 && <span>SYNCHRONIZING EXHAUST VALVES...</span>}
            {percentage >= 45 && percentage < 70 && <span>ALIGNING AERODYNAMIC SPOILER FLAPS...</span>}
            {percentage >= 70 && percentage < 95 && <span>CHARGING SUSPENSION HYDRAULICS...</span>}
            {percentage >= 95 && <span>READY TO START.</span>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full bg-black">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block object-contain"
      />
      {/* Subtle radial gradient overlay for a premium studio look */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: "radial-gradient(circle, transparent 20%, rgba(0, 0, 0, 0.75) 100%)"
        }}
      />
    </div>
  );
}
