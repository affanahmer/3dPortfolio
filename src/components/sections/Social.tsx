"use client";

import { motion } from "framer-motion";
import { socialLinks } from "@/data/social";

export default function Social() {
  return (
    <section
      id="social"
      className="relative min-h-screen w-full flex items-center justify-center py-[120px] px-6 md:px-20 max-w-[1280px] mx-auto bg-[#0D0D0D] border-x border-[#1A1A1A]/40 overflow-hidden"
    >
      {/* ─── SECTION NUMBER TAG ─── */}
      <span className="absolute top-6 left-6 md:left-20 font-racing text-[11px] text-[#A0A0A0] tracking-[0.2em]">
        06 / TRACK
      </span>

      <div className="w-full flex flex-col mt-8">
        {/* Section Heading */}
        <div className="relative">
          <motion.h2
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold text-[#F5F5F5] mb-4 leading-none"
          >
            FIND ME ON THE TRACK
          </motion.h2>
          
          {/* Red accent line under heading */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{ transformOrigin: "left" }}
            className="w-[60px] h-[3px] bg-[#E8000D] mb-[64px]"
          />
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {socialLinks.map((link) => (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                y: [0, -6, 0],
                borderColor: "#E8000D",
                boxShadow: "0 0 20px rgba(232,0,13,0.15)",
              }}
              transition={{
                duration: 3.5,
                ease: "easeInOut",
              }}
              className="bg-[#111111] border border-[#2A2A2A] rounded-[4px] p-8 flex flex-col justify-between h-[180px] transition-colors duration-300 relative group overflow-hidden select-none"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-[#F5F5F5] group-hover:text-[#E8000D] transition-colors duration-300">
                    {link.platform}
                  </h3>
                  <span className="font-mono text-xs text-[#A0A0A0] mt-1 block">
                    {link.handle}
                  </span>
                </div>

                {link.stat && (
                  <div className="text-right">
                    <span className="font-racing text-lg font-bold text-[#C0A060] block leading-none">
                      {link.stat}
                    </span>
                    <span className="font-racing text-[9px] text-[#A0A0A0] tracking-wider uppercase block mt-1">
                      {link.statLabel}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 font-racing text-xs text-[#A0A0A0] tracking-wider uppercase group-hover:text-[#E8000D] transition-colors duration-300">
                CONNECT TO STATION ↗
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
