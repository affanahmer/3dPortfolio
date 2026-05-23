"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export default function ScrollSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll();
  // Map page scroll position (0 to 1) to frame index (0 to 239)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, 239]);

  // Pre-load all 240 images
  useEffect(() => {
    let active = true;
    const totalFrames = 240;
    let loadedCount = 0;
    const tempImages: HTMLImageElement[] = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, "0");
      img.src = `/assets/porsche-sequence/frame_${frameNum}.jpg`;
      img.onload = () => {
        if (!active) return;
        loadedCount++;
        const percent = Math.round((loadedCount / totalFrames) * 100);
        setProgress(percent);

        if (loadedCount === totalFrames) {
          setImages(tempImages);
          setLoaded(true);
        }
      };
      img.onerror = () => {
        if (!active) return;
        // Even if a frame fails to load, count it to prevent UI hanging
        loadedCount++;
        const percent = Math.round((loadedCount / totalFrames) * 100);
        setProgress(percent);
        if (loadedCount === totalFrames) {
          setImages(tempImages);
          setLoaded(true);
        }
      };
      tempImages.push(img);
    }

    return () => {
      active = false;
    };
  }, []);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];
    if (!img) return;

    // Handle high-DPI displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Contain centering aspect-ratio math
    const imgRatio = img.width / img.height;
    const canvasRatio = rect.width / rect.height;

    let drawWidth = rect.width;
    let drawHeight = rect.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      // Canvas is wider than image
      drawWidth = rect.height * imgRatio;
      drawHeight = rect.height;
      offsetX = (rect.width - drawWidth) / 2;
    } else {
      // Canvas is taller than image
      drawWidth = rect.width;
      drawHeight = rect.width / imgRatio;
      offsetY = (rect.height - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Draw frame on scroll progress change
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (loaded) {
      const index = Math.round(latest);
      drawFrame(index);
    }
  });

  // Re-draw on resize
  useEffect(() => {
    const handleResize = () => {
      if (loaded) {
        const index = Math.round(frameIndex.get());
        drawFrame(index);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [loaded, images]);

  // Initial draw
  useEffect(() => {
    if (loaded && images.length > 0) {
      drawFrame(0);
    }
  }, [loaded, images]);

  return (
    <>
      {/* Real-time Loader Overlay */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-[#F5F5F5] font-sans select-none pointer-events-auto"
          >
            <div className="flex flex-col items-center gap-6 max-w-[280px] w-full px-6">
              {/* Racing red spinner */}
              <motion.div
                className="w-16 h-16 border-2 border-white/10 border-t-[#E8000D] rounded-full shadow-[0_0_20px_rgba(232,0,13,0.3)]"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, ease: "linear", repeat: Infinity }}
              />

              <div className="text-center w-full">
                <h2 className="font-racing text-[14px] text-[#A0A0A0] tracking-[0.3em] uppercase mb-2">
                  TELEMETRY INIT
                </h2>
                <div className="w-full h-[1px] bg-white/10 relative overflow-hidden mb-3">
                  <motion.div 
                    className="absolute top-0 bottom-0 left-0 bg-[#E8000D] h-full" 
                    style={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut", duration: 0.1 }}
                  />
                </div>
                <p className="font-mono text-[11px] text-[#C0A060] tracking-wider uppercase">
                  LOADING STAGE: {progress}%
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Canvas Background */}
      <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#000000]">
          <canvas ref={canvasRef} className="w-full h-full block" />
          {/* Luxury studio radial gradient mask */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_30%,#000000_100%)] pointer-events-none" />
        </div>
      </div>
    </>
  );
}
