"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { headingReveal, staggerContainer, fadeInUp } from "@/animations/variants";
import Button from "@/components/ui/Button";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactForm) => {
    setStatus("sending");
    // Stubbed — wire up EmailJS here
    console.log("Form data:", data);
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
    reset();
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section id="contact" className="section relative flex items-center py-24 md:py-0">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 0.08 }} viewport={{ once: true }}
          className="absolute top-8 right-8 text-[10rem] font-bold font-[family-name:var(--font-racing)] text-white leading-none select-none hidden md:block">07</motion.span>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Decorative */}
          <motion.div variants={headingReveal} initial="initial" whileInView="animate" viewport={{ once: true }}>
            <span className="text-sm font-mono text-[var(--color-accent-red)] tracking-[0.3em] uppercase mb-4 block">Get In Touch</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Let&apos;s <span className="text-gradient-gold">Build</span> Something
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] mb-8 leading-relaxed">
              Whether you have a project in mind, want to collaborate, or just want to talk code — I&apos;m always up for a conversation.
            </p>
            <div className="relative aspect-video rounded-2xl bg-[var(--color-bg-elevated)] carbon-fiber border border-[var(--color-border-subtle)] flex items-center justify-center overflow-hidden">
              <div className="text-[8rem] font-bold font-[family-name:var(--font-racing)] text-gradient-red opacity-10 select-none">GT3</div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-accent-red)] to-transparent" />
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
            {status === "success" ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="p-12 rounded-2xl bg-[var(--color-bg-elevated)] border border-[var(--color-accent-red)]/30 text-center">
                <div className="text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>Message Sent!</h3>
                <p className="text-[var(--color-text-secondary)]">I&apos;ll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {[
                  { name: "name" as const, label: "Name", type: "text" },
                  { name: "email" as const, label: "Email", type: "email" },
                  { name: "subject" as const, label: "Subject", type: "text" },
                ].map((field) => (
                  <motion.div key={field.name} variants={fadeInUp} className="relative">
                    <input {...register(field.name)} type={field.type} placeholder={field.label}
                      className="w-full px-5 py-4 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]/50 focus:border-[var(--color-accent-red)] focus:outline-none transition-colors font-medium" />
                    {errors[field.name] && <p className="text-xs text-[var(--color-accent-red)] mt-1 ml-1">{errors[field.name]?.message}</p>}
                  </motion.div>
                ))}
                <motion.div variants={fadeInUp}>
                  <textarea {...register("message")} rows={4} placeholder="Message"
                    className="w-full px-5 py-4 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]/50 focus:border-[var(--color-accent-red)] focus:outline-none transition-colors resize-none font-medium" />
                  {errors.message && <p className="text-xs text-[var(--color-accent-red)] mt-1 ml-1">{errors.message.message}</p>}
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <Button type="submit" variant="primary" size="lg" disabled={status === "sending"}
                    className="w-full font-[family-name:var(--font-racing)] text-lg tracking-[0.2em]">
                    {status === "sending" ? "Sending..." : "SEND IT"}
                  </Button>
                </motion.div>
              </form>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="mt-24 pt-8 border-t border-[var(--color-border-subtle)] text-center"
        >
          <p className="text-sm text-[var(--color-text-secondary)]">
            © {new Date().getFullYear()} — Built with precision. Powered by passion.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
