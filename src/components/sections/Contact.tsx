"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, MotionValue, useTransform } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { socialLinks } from "@/data/social";

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
    text-white font-medium text-base
    placeholder-transparent
    ${error
      ? "border-red-500/60 focus:border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.3)]"
      : focused
        ? "border-accent-cyan/70 shadow-[0_0_0_1px_rgba(0,240,255,0.25),0_0_20px_rgba(0,240,255,0.08)]"
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
    ${error ? "text-red-400" : focused ? "text-accent-cyan" : "text-text-secondary"}
  `;

  const Tag = multiline ? "textarea" : "input";

  return (
    <div className="relative">
      <Tag
        id={id}
        type={multiline ? undefined : type}
        placeholder={label}
        rows={multiline ? 4 : undefined}
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
        className="absolute bottom-0 left-0 h-[2px] rounded-b-xl bg-accent-cyan"
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
            : status === "sending" ? "rgba(0,240,255,0.7)"
            : "#00F0FF",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Glow */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        animate={{
          boxShadow: status === "success"
            ? "0 0 30px rgba(16,185,129,0.4)"
            : status === "idle"
              ? "0 0 20px rgba(0,240,255,0.3)"
              : "none",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Content */}
      <div className={`relative z-10 flex items-center justify-center h-full font-bold tracking-[0.2em] uppercase font-racing ${status === "idle" ? "text-black" : "text-white"}`}>
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
              className="flex items-center gap-3 text-white"
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
              className="flex items-center gap-2 text-lg text-white"
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
              className="flex items-center gap-2 text-sm text-white"
            >
              ✕ Failed — Try Again
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}

// ─── MAIN CONTACT SECTION ─────────────────────────────────────────────────────
interface ContactProps {
  scrollYProgress: MotionValue<number>;
}

export default function Contact({ scrollYProgress }: ContactProps) {
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

  // Map scroll progress to Contact section visibility
  // Contact is active during 75% - 100% scroll.
  // Fades in from 75% -> 83%
  const opacity = useTransform(scrollYProgress, [0.75, 0.83], [0, 1]);
  const y = useTransform(scrollYProgress, [0.75, 0.83], [60, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 0.83], [0.97, 1]);

  // Handle pointer-events dynamically to let clicks pass through when faded out
  const pointerEvents = useTransform(scrollYProgress, (pos) => pos >= 0.75 ? "auto" : "none");

  return (
    <motion.div
      style={{ opacity, y, scale, pointerEvents }}
      className="absolute inset-0 flex items-center justify-center p-6 bg-transparent"
    >
      <div className="w-full max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        
        {/* ─── LEFT COLUMN — Info + Social Tracks (5 Cols) ─── */}
        <div className="lg:col-span-5 flex flex-col text-left">
          <span className="text-[10px] font-racing text-accent-cyan tracking-[0.25em] uppercase">04 / CONTACT</span>
          <h2 className="text-3xl font-extrabold text-white font-display mt-2 mb-4 leading-tight tracking-tight">
            LET&apos;S BUILD SOMETHING.
          </h2>
          
          {/* Neon accent bar */}
          <div className="w-[50px] h-[3px] bg-gradient-to-r from-accent-cyan to-accent-violet mb-6 rounded-[1px]" />
          
          <p className="text-[14px] text-text-secondary leading-relaxed mb-6">
            Whether you have a project in mind, want to collaborate, or just want to talk
            code — I&apos;m always up for a conversation.
          </p>

          {/* Contact details */}
          <div className="space-y-4 mb-8">
            {[
              { icon: "✉", label: "Email", value: "affan@example.com", href: "mailto:affan@example.com" },
              { icon: "⚡", label: "Response time", value: "Within 24 hours", href: null },
              { icon: "🌍", label: "Location", value: "Available Worldwide", href: null },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4 group">
                <div className="w-9 h-9 rounded-lg bg-accent-cyan/5 border border-accent-cyan/15 flex items-center justify-center text-sm flex-shrink-0 text-accent-cyan">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[9px] font-mono text-text-secondary/60 tracking-widest uppercase">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-[13px] font-medium text-white hover:text-accent-cyan transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-[13px] font-medium text-white">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Social platform badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#070708] border border-white/5 rounded-[2px] font-racing text-[10px] tracking-wider uppercase text-text-secondary hover:text-white hover:border-accent-cyan transition-all duration-300 flex items-center gap-2 glass"
              >
                <span>{link.platform}</span>
                <span className="text-[9px] text-accent-cyan font-mono lowercase">@{link.handle}</span>
              </a>
            ))}
          </div>
        </div>

        {/* ─── RIGHT COLUMN — Glassmorphism Form (7 Cols) ─── */}
        <div className="lg:col-span-7">
          <div
            className="relative rounded-2xl p-8 overflow-hidden glass"
            style={{
              boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* Shimmer top border line */}
            <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Violet corner glow */}
            <div 
              className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-10 pointer-events-none"
              style={{ background: "radial-gradient(circle at top right, var(--color-accent-violet), transparent 70%)" }} 
            />

            <form
              ref={formRef}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              {/* Row: Name + Email */}
              <div className="grid sm:grid-cols-2 gap-4">
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
              <p className="text-[10px] text-text-secondary/40 font-mono -mt-1 ml-1 text-left">
                Minimum 20 characters
              </p>

              {/* Submit */}
              <div className="pt-2">
                <SubmitButton status={status} />
              </div>

              {/* Privacy note */}
              <p className="text-[9px] text-center text-text-secondary/35 font-mono">
                Your data is never shared with third parties.
              </p>
            </form>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
