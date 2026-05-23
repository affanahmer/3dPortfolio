"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatedSection, AnimatedItem } from "@/components/animations";

/* ═══════════════════════════════════════════════════════════════════════════
   CONTACT FORM — Glassmorphism + Animated Submit
   ═══════════════════════════════════════════════════════════════════════════ */

// ─── SCHEMA ───────────────────────────────────────────────────────────────────
const contactSchema = z.object({
  name:    z.string().min(2,  "Name must be at least 2 characters"),
  email:   z.string().email( "Please enter a valid email address"),
  subject: z.string().min(3,  "Subject must be at least 3 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

// ─── PLACEHOLDER EMAIL SENDER ─────────────────────────────────────────────────
async function sendEmail(data: ContactForm): Promise<void> {
  console.log("[sendEmail] payload →", data);
  await new Promise((r) => setTimeout(r, 1600));
}

// ─── FORM FIELD ───────────────────────────────────────────────────────────────
interface FieldProps {
  id: string;
  label: string;
  type?: string;
  error?: string;
  multiline?: boolean;
  registration: ReturnType<ReturnType<typeof useForm<ContactForm>>["register"]>;
}

function FormField({ id, label, type = "text", error, multiline, registration }: FieldProps) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const inputClasses = `
    peer w-full px-5 pt-6 pb-3 rounded-xl
    bg-white/5 border transition-all duration-300 outline-none
    text-[#F5F5F5] font-medium text-base
    placeholder-transparent
    ${error
      ? "border-red-500/60 focus:border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.3)]"
      : focused
        ? "border-[#E8000D]/70 shadow-[0_0_0_1px_rgba(232,0,13,0.25),0_0_20px_rgba(232,0,13,0.08)]"
        : "border-white/10 hover:border-white/20"
    }
    ${multiline ? "resize-none" : ""}
  `;

  const labelClasses = `
    absolute left-5 transition-all duration-200 pointer-events-none font-medium
    ${focused || hasValue
      ? "top-2 text-[10px] tracking-widest uppercase"
      : "top-1/2 -translate-y-1/2 text-sm"
    }
    ${error ? "text-red-400" : focused ? "text-[#E8000D]" : "text-[#A0A0A0]"}
  `;

  const Tag = multiline ? "textarea" : "input";

  return (
    <div className="relative">
      <Tag
        id={id}
        type={multiline ? undefined : type}
        placeholder={label}
        rows={multiline ? 5 : undefined}
        {...registration}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          setHasValue(e.target.value.length > 0);
          registration.onBlur?.(e as never);
        }}
        onChange={(e) => {
          setHasValue((e.target as HTMLInputElement).value.length > 0);
          registration.onChange?.(e as never);
        }}
        className={inputClasses}
      />
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>

      {/* Focus glow line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] rounded-b-xl bg-[#E8000D]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "left" }}
      />

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="mt-1.5 ml-1 text-xs text-red-400 flex items-center gap-1"
          >
            <span className="text-[8px]">●</span> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── ANIMATED SUBMIT BUTTON ──────────────────────────────────────────────────
type SubmitStatus = "idle" | "sending" | "success" | "error";

function SubmitButton({ status }: { status: SubmitStatus }) {
  return (
    <motion.button
      type="submit"
      disabled={status === "sending" || status === "success"}
      className="relative w-full h-14 rounded-xl overflow-hidden disabled:cursor-not-allowed"
      whileHover={status === "idle" ? { scale: 1.01, y: -2 } : {}}
      whileTap={status === "idle" ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2 }}
    >
      {/* Background layer */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        animate={{
          backgroundColor:
            status === "success" ? "#10B981"
            : status === "error"  ? "#EF4444"
            : status === "sending" ? "rgba(232,0,13,0.7)"
            : "#E8000D",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Red glow */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        animate={{
          boxShadow: status === "success"
            ? "0 0 30px rgba(16,185,129,0.4)"
            : status === "idle"
              ? "0 0 20px rgba(232,0,13,0.3)"
              : "none",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-white font-bold tracking-[0.2em] uppercase font-racing">
        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.span
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 text-lg"
            >
              Send It
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </motion.span>
          )}

          {status === "sending" && (
            <motion.span
              key="sending"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-3"
            >
              <motion.div
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              />
              <span className="text-sm tracking-widest">Sending...</span>
            </motion.span>
          )}

          {status === "success" && (
            <motion.span
              key="success"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="flex items-center gap-2 text-lg"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <motion.path
                  d="M5 13l4 4L19 7"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                />
              </svg>
              Message Sent!
            </motion.span>
          )}

          {status === "error" && (
            <motion.span
              key="error"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-sm"
            >
              ✕ Failed — Try Again
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────
export default function Contact() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactForm) => {
    setStatus("sending");
    try {
      await sendEmail(data);
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full flex items-center justify-center py-[120px] px-6 md:px-20 max-w-[1280px] mx-auto bg-[#0A0A0A] border-x border-[#1A1A1A]/40 overflow-hidden"
    >
      {/* ─── SECTION NUMBER TAG ─── */}
      <span className="absolute top-6 left-6 md:left-20 font-racing text-[11px] text-[#A0A0A0] tracking-[0.2em]">
        07 / CONTACT
      </span>

      <AnimatedSection className="w-full flex flex-col mt-8">
        {/* Section Heading */}
        <AnimatedItem className="relative">
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold text-[#F5F5F5] mb-4 leading-none">
            LET&apos;S BUILD SOMETHING
          </h2>
          
          {/* Red accent line under heading */}
          <div className="w-[60px] h-[3px] bg-[#E8000D] mb-[64px]" />
        </AnimatedItem>

        {/* Two-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-[80px] items-start">
          {/* ─── LEFT COLUMN — Copy + Visual ─── */}
          <div className="flex flex-col">
            <AnimatedItem>
              <p className="text-lg text-[#A0A0A0] mb-10 leading-relaxed">
                Whether you have a project in mind, want to collaborate, or just want to talk
                code — I&apos;m always up for a conversation.
              </p>
            </AnimatedItem>

            {/* Contact details */}
            <div className="space-y-4 mb-10">
              {[
                { icon: "✉", label: "Email", value: "affan@example.com", href: "mailto:affan@example.com" },
                { icon: "⚡", label: "Response time", value: "Within 24 hours", href: null },
                { icon: "🌍", label: "Location", value: "Available Worldwide", href: null },
              ].map((item) => (
                <AnimatedItem key={item.label}>
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-lg bg-[#E8000D]/10 border border-[#E8000D]/20 flex items-center justify-center text-base flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-[#A0A0A0] tracking-widest uppercase">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm font-medium text-[#F5F5F5] hover:text-[#E8000D] transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-[#F5F5F5]">{item.value}</p>
                      )}
                    </div>
                  </div>
                </AnimatedItem>
              ))}
            </div>

            {/* GT3 decorative card - replaced with frame_240.jpg */}
            <AnimatedItem>
              <div
                className="relative rounded-[4px] border border-white/5 overflow-hidden flex items-center justify-center bg-[#111111] carbon-fiber"
                style={{ height: "180px" }}
              >
                <img 
                  src="/assets/porsche-sequence/frame_240.jpg"
                  alt="Porsche Rear Wing Profile Frame 240" 
                  className="w-full h-full object-cover opacity-60 mix-blend-lighten"
                />
                <div className="absolute bottom-3 left-3 font-mono text-[9px] text-[#A0A0A0] tracking-wider uppercase bg-black/60 px-2 py-0.5 border border-white/5 rounded-[2px] glass">
                  FRAME_240 / AERODYNAMIC STABILITY
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E8000D]/40 to-transparent" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              </div>
            </AnimatedItem>
          </div>

          {/* ─── RIGHT — Glassmorphism Form ───────────────────────────── */}
          <AnimatedItem>
            {/* Glass container */}
            <div
              className="relative rounded-2xl p-8 md:p-10 overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 25px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              {/* Glass shimmer top edge */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              {/* Red corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-5"
                style={{ background: "radial-gradient(circle at top right, #E8000D, transparent)" }} />

              <form
                ref={formRef}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* Row: Name + Email */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField
                    id="name"
                    label="Your Name"
                    error={errors.name?.message}
                    registration={register("name")}
                  />
                  <FormField
                    id="email"
                    label="Email Address"
                    type="email"
                    error={errors.email?.message}
                    registration={register("email")}
                  />
                </div>

                <FormField
                  id="subject"
                  label="Subject"
                  error={errors.subject?.message}
                  registration={register("subject")}
                />

                <FormField
                  id="message"
                  label="Your Message"
                  multiline
                  error={errors.message?.message}
                  registration={register("message")}
                />

                {/* Character count hint */}
                <p className="text-[10px] text-[#A0A0A0]/50 font-mono -mt-2 ml-1">
                  Minimum 20 characters
                </p>

                {/* Submit */}
                <div className="pt-2">
                  <SubmitButton status={status} />
                </div>

                {/* Privacy note */}
                <p className="text-[10px] text-center text-[#A0A0A0]/40 font-mono">
                  Your data is never shared with third parties.
                </p>
              </form>
            </div>
          </AnimatedItem>
        </div>

        {/* Footer */}
        <AnimatedItem>
          <div className="mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#A0A0A0]">
              © {new Date().getFullYear()} Affan Ahmer — Built with precision.
            </p>
            <p className="text-xs font-mono text-[#A0A0A0]/40 tracking-widest uppercase">
              Powered by Next.js · R3F · Framer Motion
            </p>
          </div>
        </AnimatedItem>
      </AnimatedSection>
    </section>
  );
}
