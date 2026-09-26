/**
 * Unified Design Tokens
 * Single source of truth for all design decisions
 *
 * These tokens are used to generate:
 * 1. CSS custom properties
 * 2. Tailwind config
 * 3. Component styles
 */

// ============================================
// COLOR SYSTEM
// ============================================

// Grayscale - 11 steps for maximum flexibility
export const gray = {
  50: 'hsl(0, 0%, 98%)',     // #FAFAFA - Backgrounds
  100: 'hsl(0, 0%, 96.1%)',  // #F5F5F5 - Subtle backgrounds
  200: 'hsl(0, 0%, 92.2%)',  // #EBEBEB - Borders
  300: 'hsl(0, 0%, 87.8%)',  // #E0E0E0 - Hover borders
  400: 'hsl(0, 0%, 74.1%)',  // #BDBDBD - Disabled text
  500: 'hsl(0, 0%, 62.7%)',  // #9E9E9E - Muted text
  600: 'hsl(0, 0%, 45.9%)',  // #757575 - Secondary text
  700: 'hsl(0, 0%, 32.2%)',  // #525252 - Body text
  800: 'hsl(0, 0%, 14.9%)',  // #262626 - Headings
  900: 'hsl(0, 0%, 9%)',     // #171717 - Primary text
  950: 'hsl(0, 0%, 3.9%)',   // #0A0A0A - True black
} as const;

// Brand colors - Prayer app specific
export const brand = {
  primary: {
    50: 'hsl(216, 40%, 96%)',
    100: 'hsl(216, 40%, 92%)',
    200: 'hsl(216, 40%, 84%)',
    300: 'hsl(216, 40%, 74%)',
    400: 'hsl(216, 40%, 60%)',
    500: 'hsl(216, 40%, 45%)',  // Main brand color
    600: 'hsl(216, 40%, 35%)',
    700: 'hsl(216, 40%, 28%)',
    800: 'hsl(216, 40%, 20%)',
    900: 'hsl(216, 40%, 14%)',
  },
  accent: {
    // Warm accent for prayer moments
    50: 'hsl(34, 60%, 96%)',
    100: 'hsl(34, 60%, 92%)',
    200: 'hsl(34, 60%, 84%)',
    300: 'hsl(34, 60%, 74%)',
    400: 'hsl(34, 60%, 60%)',
    500: 'hsl(34, 60%, 50%)',  // Golden accent
    600: 'hsl(34, 60%, 40%)',
    700: 'hsl(34, 60%, 32%)',
    800: 'hsl(34, 60%, 24%)',
    900: 'hsl(34, 60%, 16%)',
  }
} as const;

// Semantic colors
export const semantic = {
  success: {
    DEFAULT: 'hsl(142, 76%, 36%)',  // Green
    foreground: 'hsl(0, 0%, 100%)',
    light: 'hsl(142, 76%, 95%)',
    dark: 'hsl(142, 76%, 28%)',
  },
  warning: {
    DEFAULT: 'hsl(45, 93%, 47%)',   // Amber
    foreground: 'hsl(0, 0%, 100%)',
    light: 'hsl(45, 93%, 95%)',
    dark: 'hsl(45, 93%, 35%)',
  },
  error: {
    DEFAULT: 'hsl(0, 84%, 60%)',    // Red
    foreground: 'hsl(0, 0%, 100%)',
    light: 'hsl(0, 84%, 95%)',
    dark: 'hsl(0, 84%, 45%)',
  },
  info: {
    DEFAULT: 'hsl(199, 89%, 48%)',  // Blue
    foreground: 'hsl(0, 0%, 100%)',
    light: 'hsl(199, 89%, 95%)',
    dark: 'hsl(199, 89%, 38%)',
  },
} as const;

// ============================================
// TYPOGRAPHY SYSTEM
// ============================================

export const typography = {
  // Font families
  fonts: {
    sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'].join(', '),
    serif: ['Crimson Text', 'Georgia', 'serif'].join(', '),
    mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'monospace'].join(', '),
  },

  // Font sizes - Using clamp for fluid typography
  sizes: {
    '2xs': 'clamp(0.625rem, 0.5rem + 0.5vw, 0.75rem)',    // 10-12px
    xs: 'clamp(0.75rem, 0.675rem + 0.5vw, 0.875rem)',     // 12-14px
    sm: 'clamp(0.875rem, 0.825rem + 0.5vw, 1rem)',        // 14-16px
    base: 'clamp(1rem, 0.95rem + 0.5vw, 1.125rem)',       // 16-18px
    lg: 'clamp(1.125rem, 1.05rem + 0.75vw, 1.25rem)',     // 18-20px
    xl: 'clamp(1.25rem, 1.15rem + 1vw, 1.5rem)',          // 20-24px
    '2xl': 'clamp(1.5rem, 1.35rem + 1.5vw, 1.875rem)',    // 24-30px
    '3xl': 'clamp(1.875rem, 1.65rem + 2vw, 2.25rem)',     // 30-36px
    '4xl': 'clamp(2.25rem, 2rem + 2.5vw, 3rem)',          // 36-48px
    '5xl': 'clamp(3rem, 2.5rem + 3vw, 4rem)',             // 48-64px
    '6xl': 'clamp(3.75rem, 3rem + 4vw, 5rem)',            // 60-80px
  },

  // Font weights
  weights: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  // Line heights
  lineHeights: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

// ============================================
// SPACING SYSTEM
// ============================================

// Base unit: 4px (0.25rem)
export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
  36: '9rem',       // 144px
  40: '10rem',      // 160px
  44: '11rem',      // 176px
  48: '12rem',      // 192px
  52: '13rem',      // 208px
  56: '14rem',      // 224px
  60: '15rem',      // 240px
  64: '16rem',      // 256px
  72: '18rem',      // 288px
  80: '20rem',      // 320px
  96: '24rem',      // 384px
} as const;

// ============================================
// BORDER RADIUS SYSTEM
// ============================================

export const borderRadius = {
  none: '0',
  sm: '0.25rem',    // 4px
  DEFAULT: '0.375rem', // 6px
  md: '0.5rem',     // 8px
  lg: '0.625rem',   // 10px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
} as const;

// ============================================
// SHADOW SYSTEM
// ============================================

export const shadows = {
  // Elevation levels
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.08)',
  DEFAULT: '0 2px 8px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.08)',
  md: '0 4px 12px 0 rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.08)',
  lg: '0 8px 16px 0 rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.08)',
  xl: '0 12px 24px 0 rgba(0, 0, 0, 0.1), 0 8px 8px -4px rgba(0, 0, 0, 0.08)',
  '2xl': '0 24px 48px 0 rgba(0, 0, 0, 0.12), 0 12px 16px -8px rgba(0, 0, 0, 0.08)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
  none: 'none',

  // Special effects
  glow: {
    sm: '0 0 16px rgba(255, 255, 255, 0.03)',
    DEFAULT: '0 0 24px rgba(255, 255, 255, 0.05)',
    lg: '0 0 32px rgba(255, 255, 255, 0.08)',
  },
} as const;

// ============================================
// TRANSITION SYSTEM
// ============================================

export const transitions = {
  // Durations
  durations: {
    75: '75ms',
    100: '100ms',
    150: '150ms',
    200: '200ms',
    300: '300ms',
    500: '500ms',
    700: '700ms',
    1000: '1000ms',
  },

  // Timing functions
  timingFunctions: {
    DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    // Spring animations
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    'spring-soft': 'cubic-bezier(0.155, 1.105, 0.295, 1.12)',
    // Smooth animations
    smooth: 'cubic-bezier(0.37, 0, 0.63, 1)',
  },
} as const;

// ============================================
// BREAKPOINTS SYSTEM
// ============================================

export const breakpoints = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ============================================
// Z-INDEX SYSTEM
// ============================================

export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
  toast: 1700,
  maximum: 9999,
} as const;

// ============================================
// ANIMATION KEYFRAMES
// ============================================

export const keyframes = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  fadeOut: {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },
  scaleIn: {
    from: { transform: 'scale(0.95)', opacity: 0 },
    to: { transform: 'scale(1)', opacity: 1 },
  },
  scaleOut: {
    from: { transform: 'scale(1)', opacity: 1 },
    to: { transform: 'scale(0.95)', opacity: 0 },
  },
  slideInFromTop: {
    from: { transform: 'translateY(-100%)' },
    to: { transform: 'translateY(0)' },
  },
  slideInFromBottom: {
    from: { transform: 'translateY(100%)' },
    to: { transform: 'translateY(0)' },
  },
  slideInFromLeft: {
    from: { transform: 'translateX(-100%)' },
    to: { transform: 'translateX(0)' },
  },
  slideInFromRight: {
    from: { transform: 'translateX(100%)' },
    to: { transform: 'translateX(0)' },
  },
  spin: {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
  pulse: {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.5 },
  },
  bounce: {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-25%)' },
  },
  shimmer: {
    '100%': { transform: 'translateX(100%)' },
  },
} as const;

// ============================================
// EXPORTED TOKENS OBJECT
// ============================================

export const tokens = {
  colors: {
    gray,
    brand,
    semantic,
  },
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  breakpoints,
  zIndex,
  keyframes,
} as const;

// Type exports for TypeScript support
export type ColorToken = typeof tokens.colors;
export type TypographyToken = typeof tokens.typography;
export type SpacingToken = typeof tokens.spacing;
export type BorderRadiusToken = typeof tokens.borderRadius;
export type ShadowToken = typeof tokens.shadows;
export type TransitionToken = typeof tokens.transitions;
export type BreakpointToken = typeof tokens.breakpoints;
export type ZIndexToken = typeof tokens.zIndex;
export type AnimationToken = typeof tokens.keyframes;

export default tokens;