/**
 * Design tokens — the canonical reference, mirrored in `globals.css` (@theme).
 *
 * CSS owns the runtime values (so Tailwind utilities like `bg-brand` work).
 * This file documents them for use in TS contexts: chart colors, OG images,
 * inline SVG, canvas, etc. Keep the two in sync.
 */

export const colors = {
  background: "#07080b",
  surface: "#0c0e13",
  elevated: "#111319",
  line: "#1c1f29",
  lineStrong: "#2a2e3b",

  foreground: "#f5f7fb",
  muted: "#99a1b3",
  faint: "#5b6273",

  brand: "#4f7dff",
  brandStrong: "#3a66f0",
  brandSoft: "#8aa6ff",

  success: "#34d399",
  warning: "#fbbf24",
  danger: "#f87171",
} as const;

/** Spacing rhythm (px) used for section padding and stack gaps. */
export const space = {
  section: 120,
  sectionTight: 80,
  gutter: 24,
} as const;

/** Type scale (rem) — tight and restrained. */
export const type = {
  display: "clamp(2.75rem, 6vw, 4.5rem)",
  h1: "clamp(2rem, 4vw, 3rem)",
  h2: "clamp(1.5rem, 3vw, 2rem)",
  body: "1rem",
  small: "0.875rem",
} as const;

export const radius = {
  xs: "0.375rem",
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.5rem",
} as const;

export type ColorToken = keyof typeof colors;
