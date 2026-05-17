"use client";

import { createContext, useContext } from "react";
import Lenis from "lenis";

/** Lenis context — provides the smooth scroll instance to all children */
const LenisContext = createContext<Lenis | null>(null);

export const LenisProvider = LenisContext.Provider;

/**
 * Hook to access the Lenis smooth scroll instance
 * Provides scrollTo() helper for navigation
 */
export function useLenis() {
  const lenis = useContext(LenisContext);

  const scrollTo = (target: string | number | HTMLElement, options?: { offset?: number; duration?: number }) => {
    if (!lenis) return;
    lenis.scrollTo(target, {
      offset: options?.offset ?? 0,
      duration: options?.duration ?? 1.2,
    });
  };

  return { lenis, scrollTo };
}
