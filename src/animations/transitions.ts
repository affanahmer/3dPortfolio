/* ═══════════════════════════════════════════════════════════════════════════
   EASING CURVES & DURATION SCALE — "The GT Curves"
   Per ANIMATION_RULES.md
   ═══════════════════════════════════════════════════════════════════════════ */

// GT Standard — fast in, smooth settle (most transitions)
export const ease = {
  gt: [0.22, 1, 0.36, 1] as const,
  // Pit Stop — extremely fast entrance (under 300ms elements)
  pit: [0.0, 0.0, 0.2, 1] as const,
  // Apex — overshoots slightly, snaps back (hover states, badges)
  apex: [0.34, 1.56, 0.64, 1] as const,
  // Brake — fast deceleration into position (exit animations)
  brake: [0.4, 0, 1, 1] as const,
  // Telemetry — linear (data lines, progress bars)
  telemetry: "linear" as const,
};

export const duration = {
  instant: 0.1,    // Micro-feedback: button press, hover border
  fast: 0.2,       // Quick transitions: tab switch, icon hover
  normal: 0.35,    // Standard: chip entrance, label float
  medium: 0.5,     // Card entrance, modal backdrop
  slow: 0.7,       // Section headline, hero reveal
  cinematic: 1.2,  // Car drive-in, page-level transitions
  epic: 2.0,       // Opening sequence only
};
