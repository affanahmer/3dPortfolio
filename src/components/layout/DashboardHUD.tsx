"use client";

import React, { useEffect, useRef } from "react";
import { MotionValue, motion, useMotionValue, useMotionValueEvent, useSpring, useTransform, useVelocity } from "framer-motion";

interface DashboardHUDProps {
  scrollYProgress: MotionValue<number>;
}

export default function DashboardHUD({ scrollYProgress }: DashboardHUDProps) {
  const rpmRef = useRef<HTMLSpanElement>(null);
  const speedRef = useRef<HTMLSpanElement>(null);
  const gearRef = useRef<HTMLSpanElement>(null);
  const rpmBarRef = useRef<HTMLDivElement>(null);

  // Motion values for G-force radar
  const mouseXMotion = useMotionValue(0);
  const scrollVelocity = useVelocity(scrollYProgress);
  
  // Spring configurations for ultra-smooth cockpit gauge updates
  const smoothVelocity = useSpring(scrollVelocity, { damping: 45, stiffness: 200 });
  const smoothMouseX = useSpring(mouseXMotion, { damping: 30, stiffness: 150 });

  // Map scroll progress to RPM and SPEED
  const rpmValue = useTransform(scrollYProgress, [0, 1], [800, 9000]);
  const speedValue = useTransform(scrollYProgress, [0, 1], [0, 296]);

  // Map G-Force displacements
  // Scrolling down (accel) -> Y shifts down. Scrolling up (braking) -> Y shifts up.
  const gForceY = useTransform(smoothVelocity, [-1.2, 1.2], [-22, 22], { clamp: true });
  // Mouse lateral moves -> X shifts
  const gForceX = useTransform(smoothMouseX, [-1, 1], [-22, 22], { clamp: true });

  // Mouse move listener to capture lateral G-force wobble
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized X mouse coordinate relative to screen center (-1 to 1)
      const normX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouseXMotion.set(normX);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseXMotion]);

  // Perform direct DOM manipulation to bypass React 60fps renders for HUD metrics
  useMotionValueEvent(rpmValue, "change", (latest) => {
    if (rpmRef.current) {
      rpmRef.current.textContent = Math.floor(latest).toLocaleString();
    }
    if (rpmBarRef.current) {
      const percent = ((latest - 800) / (9000 - 800)) * 100;
      rpmBarRef.current.style.width = `${Math.min(100, Math.max(0, percent))}%`;
      // Violet redline alert on top rpm
      if (percent > 85) {
        rpmBarRef.current.style.background = "#AD00FF";
        rpmBarRef.current.style.boxShadow = "0 0 16px #AD00FF";
      } else {
        rpmBarRef.current.style.background = "linear-gradient(90deg, #00F0FF, #AD00FF)";
        rpmBarRef.current.style.boxShadow = "0 0 12px rgba(0, 240, 255, 0.4)";
      }
    }
  });

  useMotionValueEvent(speedValue, "change", (latest) => {
    if (speedRef.current) {
      speedRef.current.textContent = String(Math.floor(latest));
    }
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let gear = "G1";
    if (latest > 0.90) gear = "G7";
    else if (latest > 0.75) gear = "G6";
    else if (latest > 0.60) gear = "G5";
    else if (latest > 0.45) gear = "G4";
    else if (latest > 0.30) gear = "G3";
    else if (latest > 0.15) gear = "G2";

    if (gearRef.current) {
      gearRef.current.textContent = gear;
    }
  });

  return (
    <div className="fixed inset-0 w-screen h-screen pointer-events-none z-20 select-none">
      
      {/* ─── TOP TACHOMETER REV BAR ─── */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-black/40">
        <div 
          ref={rpmBarRef} 
          className="h-full bg-gradient-to-r from-accent-cyan to-accent-violet shadow-[0_0_12px_rgba(0,240,255,0.4)] transition-all duration-100 ease-out"
          style={{ width: "0%" }}
        />
      </div>

      {/* ─── TOP-LEFT COCKPIT CORNER ─── */}
      <div className="absolute top-6 left-6 font-racing text-[13px] text-text-secondary tracking-[0.2em]">
        <span>911 GT3 RS / </span>
        <span className="text-accent-cyan font-bold">COCKPIT_SYS</span>
      </div>

      {/* ─── TOP-RIGHT TACO CORNER ─── */}
      <div className="absolute top-6 right-6 font-racing text-[13px] text-text-secondary tracking-[0.15em] flex items-center gap-2">
        <span>RPM:</span>
        <span ref={rpmRef} className="font-mono text-white font-bold text-[14px]">800</span>
      </div>

      {/* ─── BOTTOM-LEFT: G-FORCE VECTOR RADAR ─── */}
      <div className="absolute bottom-6 left-6 flex items-center gap-4">
        {/* Vector Target Crosshair */}
        <div className="relative w-[70px] h-[70px] rounded-full border border-accent-cyan/15 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
          {/* Axis lines */}
          <div className="absolute w-full h-[1px] bg-accent-cyan/10" />
          <div className="absolute h-full w-[1px] bg-accent-cyan/10" />
          
          {/* Outer circle rings */}
          <div className="absolute w-[44px] h-[44px] rounded-full border border-accent-cyan/10 border-dashed" />
          
          {/* Dynamic G-Force Dot */}
          <motion.div 
            style={{ x: gForceX, y: gForceY }}
            className="w-[8px] h-[8px] rounded-full bg-accent-cyan shadow-[0_0_10px_#00F0FF]"
          />
        </div>
        
        {/* Telemetry info */}
        <div className="flex flex-col font-racing text-[11px] text-text-secondary tracking-[0.15em]">
          <span className="text-accent-cyan font-bold">G-FORCE MONITOR</span>
          <span>SYS.LAT: OK</span>
          <span>SYS.LON: ACTIVE</span>
        </div>
      </div>

      {/* ─── BOTTOM-RIGHT: DIGITAL SPEEDOMETER & GEAR SHIFTER ─── */}
      <div className="absolute bottom-6 right-6 flex items-end gap-4">
        {/* Gear Box */}
        <div className="flex flex-col items-center">
          <span className="text-[9px] font-racing text-accent-cyan tracking-widest uppercase mb-1">GEAR</span>
          <div className="w-[45px] h-[45px] bg-black/50 glass border-glow-cyan flex items-center justify-center rounded-[2px]">
            <span ref={gearRef} className="font-racing text-2xl font-bold text-white leading-none">G1</span>
          </div>
        </div>

        {/* Speed panel */}
        <div className="flex flex-col items-end leading-none">
          <div className="flex items-baseline gap-1">
            <span ref={speedRef} className="font-mono text-4xl font-extrabold text-white">0</span>
            <span className="font-racing text-xs text-accent-violet font-bold tracking-wider">KM/H</span>
          </div>
          <span className="text-[9px] font-racing text-text-secondary tracking-widest mt-1 uppercase">CURRENT VELOCITY</span>
        </div>
      </div>

    </div>
  );
}
