"use client";

import { motion } from "framer-motion";
import { headingReveal, staggerContainer, tileFromLeft, tileFromRight } from "@/animations/variants";
import { socialLinks } from "@/data/social";

export default function Social() {
  return (
    <section id="social" className="section relative flex items-center py-24 md:py-0">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 0.08 }} viewport={{ once: true }}
          className="absolute top-8 right-8 text-[10rem] font-bold font-[family-name:var(--font-racing)] text-white leading-none select-none hidden md:block">06</motion.span>

        <motion.div variants={headingReveal} initial="initial" whileInView="animate" viewport={{ once: true }} className="mb-12 text-center">
          <span className="text-sm font-mono text-[var(--color-accent-red)] tracking-[0.3em] uppercase mb-4 block">Connect</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
            Find Me On The <span className="text-gradient-gold">Track</span>
          </h2>
        </motion.div>

        <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {socialLinks.map((link, index) => (
            <motion.a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer"
              variants={index % 2 === 0 ? tileFromLeft : tileFromRight}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
              className="group relative p-6 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] transition-all hover:border-[var(--color-accent-red)] hover:shadow-[0_0_30px_rgba(232,0,13,0.15)]">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold group-hover:text-[var(--color-accent-red)] transition-colors">{link.platform}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">{link.handle}</p>
                </div>
                {link.stat && (
                  <div className="text-right">
                    <p className="text-lg font-bold font-[family-name:var(--font-racing)] text-[var(--color-accent-gold)]">{link.stat}</p>
                    <p className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-wider">{link.statLabel}</p>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent-red)] transition-colors">
                <span>Visit →</span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
