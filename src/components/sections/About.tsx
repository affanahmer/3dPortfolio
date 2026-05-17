"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  headingReveal,
  staggerContainer,
  fadeInUp,
  wordStagger,
  letterVariants,
} from "@/animations/variants";
import { numberRoll } from "@/animations/gsap-sequences";
import { StatCounter } from "@/types";

const stats: StatCounter[] = [
  { label: "Years Experience", value: 6, suffix: "+" },
  { label: "Projects Shipped", value: 40, suffix: "+" },
  { label: "Lines of Code", value: 500, suffix: "K+" },
  { label: "Coffees Consumed", value: 3000, suffix: "+" },
];

const aboutText =
  "I build digital experiences that feel engineered, not assembled. Every pixel, every interaction, every line of code — precision-crafted like a GT3 RS on the Nordschleife.";

/**
 * About / Intro Section (Page 2)
 * Personal story in punchy lines + stat counters
 * Two-column layout: text left, decorative right
 */
export default function About() {
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // GSAP number roll for stat counters
    counterRefs.current.forEach((el, i) => {
      if (el) {
        numberRoll(el, stats[i].value);
      }
    });
  }, []);

  return (
    <section
      id="about"
      className="section relative flex items-center py-24 md:py-0"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        {/* Section number */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.08 }}
          viewport={{ once: true }}
          className="absolute top-8 right-8 text-[10rem] font-bold font-[family-name:var(--font-racing)] text-white leading-none select-none hidden md:block"
        >
          02
        </motion.span>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left — Text */}
          <div>
            <motion.div
              variants={headingReveal}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <span className="text-sm font-mono text-[var(--color-accent-red)] tracking-[0.3em] uppercase mb-4 block">
                About Me
              </span>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Precision.
                <br />
                <span className="text-gradient-gold">Passion.</span>
                <br />
                Performance.
              </h2>
            </motion.div>

            {/* Word-by-word cascade */}
            <motion.p
              variants={wordStagger}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-12"
            >
              {aboutText.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  variants={fadeInUp}
                  className="inline-block mr-[0.3em]"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </div>

          {/* Right — Decorative card */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-[var(--color-bg-elevated)] carbon-fiber border border-[var(--color-border-subtle)] p-8 flex items-center justify-center">
              {/* Abstract racing number */}
              <div className="text-[12rem] font-bold font-[family-name:var(--font-racing)] text-gradient-red opacity-20 select-none leading-none">
                911
              </div>
            </div>
            {/* Red glow accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[var(--color-accent-red)] rounded-full blur-[80px] opacity-20" />
          </motion.div>
        </div>

        {/* Stat counters */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="text-center p-6 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)]"
            >
              <div className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-racing)] text-[var(--color-accent-red)] mb-2">
                {stat.prefix}
                <span
                  ref={(el) => {
                    counterRefs.current[index] = el;
                  }}
                >
                  0
                </span>
                {stat.suffix}
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
