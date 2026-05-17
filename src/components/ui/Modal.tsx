"use client";

import { useEffect, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { modalOverlay, modalContent } from "@/animations/variants";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  layoutId?: string;
}

/**
 * Full-screen modal overlay
 * Features: Escape key close, click-outside close, Framer Motion shared layout animation
 */
export default function Modal({ isOpen, onClose, children, layoutId }: ModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={modalOverlay}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={onClose}
          className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4 md:p-8 bg-black/70 backdrop-blur-md"
        >
          <motion.div
            variants={modalContent}
            initial="initial"
            animate="animate"
            exit="exit"
            layoutId={layoutId}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-[var(--color-accent-red)] transition-colors text-[var(--color-text-secondary)] hover:text-white"
              aria-label="Close modal"
            >
              ✕
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
