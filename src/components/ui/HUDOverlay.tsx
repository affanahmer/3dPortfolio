"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * HUD (Heads-Up Display) overlay — fake telemetry data
 * Positioned in corners of the hero section
 * Profile D animation — "HUD Pulse"
 */
export default function HUDOverlay() {
  const [rpm, setRpm] = useState("0000");
  const [speed, setSpeed] = useState("000");
  const [lap, setLap] = useState("00:00.000");

  // Typewriter effect — simulate telemetry boot
  useEffect(() => {
    const rpmTarget = "8750";
    const speedTarget = "312";
    const lapTarget = "01:23.847";

    let rpmIndex = 0;
    let speedIndex = 0;
    let lapIndex = 0;

    const rpmInterval = setInterval(() => {
      if (rpmIndex <= rpmTarget.length) {
        setRpm(rpmTarget.slice(0, rpmIndex).padStart(4, "0"));
        rpmIndex++;
      } else clearInterval(rpmInterval);
    }, 150);

    const speedTimeout = setTimeout(() => {
      const speedInterval = setInterval(() => {
        if (speedIndex <= speedTarget.length) {
          setSpeed(speedTarget.slice(0, speedIndex).padStart(3, "0"));
          speedIndex++;
        } else clearInterval(speedInterval);
      }, 200);
    }, 800);

    const lapTimeout = setTimeout(() => {
      const lapInterval = setInterval(() => {
        if (lapIndex <= lapTarget.length) {
          setLap(lapTarget.slice(0, lapIndex).padEnd(9, "0"));
          lapIndex++;
        } else clearInterval(lapInterval);
      }, 100);
    }, 1200);

    return () => {
      clearInterval(rpmInterval);
      clearTimeout(speedTimeout);
      clearTimeout(lapTimeout);
    };
  }, []);

  return (
    <>
      {/* Top-left: RPM */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute top-8 left-8 z-[var(--z-content)]"
      >
        <motion.div
          animate={{ y: [0, -4, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
        >
          <p className="text-[10px] font-mono text-[var(--color-accent-blue)] tracking-[0.3em] uppercase opacity-60">
            RPM
          </p>
          <p className="text-2xl font-mono text-[var(--color-accent-blue)] font-bold tracking-wider">
            {rpm}
          </p>
        </motion.div>
      </motion.div>

      {/* Top-right: SPEED */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        className="absolute top-8 right-8 z-[var(--z-content)] text-right"
      >
        <motion.div
          animate={{ y: [0, -4, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.3, ease: "easeInOut", repeat: Infinity }}
        >
          <p className="text-[10px] font-mono text-[var(--color-accent-blue)] tracking-[0.3em] uppercase opacity-60">
            KM/H
          </p>
          <p className="text-2xl font-mono text-[var(--color-accent-blue)] font-bold tracking-wider">
            {speed}
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom-left: LAP */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.5 }}
        className="absolute bottom-8 left-8 z-[var(--z-content)]"
      >
        <motion.div
          animate={{ y: [0, -3, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
        >
          <p className="text-[10px] font-mono text-[var(--color-accent-blue)] tracking-[0.3em] uppercase opacity-60">
            LAP TIME
          </p>
          <p className="text-lg font-mono text-[var(--color-accent-blue)] font-bold tracking-wider">
            {lap}
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom-right: GEAR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
        className="absolute bottom-8 right-8 z-[var(--z-content)] text-right"
      >
        <motion.div
          animate={{ y: [0, -3, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
        >
          <p className="text-[10px] font-mono text-[var(--color-accent-blue)] tracking-[0.3em] uppercase opacity-60">
            GEAR
          </p>
          <p className="text-3xl font-mono text-[var(--color-accent-blue)] font-bold">7</p>
        </motion.div>
      </motion.div>
    </>
  );
}
