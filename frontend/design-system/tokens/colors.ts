/**
 * PrayerApp Design System - Color Tokens
 * Based on Vercel/Stripe aesthetic
 *
 * This is the single source of truth for all colors in the application.
 * Changes here will automatically propagate throughout the entire app.
 */

export const colors = {
  // Grayscale palette - 11 steps for nuanced UI
  gray: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b',
  },

  // Primary colors
  primary: {
    DEFAULT: '#000000',
    light: '#171717',
    dark: '#000000',
    foreground: '#ffffff',
  },

  // Secondary colors
  secondary: {
    DEFAULT: '#fafafa',
    light: '#ffffff',
    dark: '#f4f4f5',
    foreground: '#09090b',
  },

  // Status colors
  success: {
    DEFAULT: '#10b981',
    light: '#d1fae5',
    dark: '#047857',
    foreground: '#ffffff',
  },

  warning: {
    DEFAULT: '#f59e0b',
    light: '#fef3c7',
    dark: '#d97706',
    foreground: '#ffffff',
  },

  destructive: {
    DEFAULT: '#ef4444',
    light: '#fee2e2',
    dark: '#dc2626',
    foreground: '#ffffff',
  },

  info: {
    DEFAULT: '#3b82f6',
    light: '#dbeafe',
    dark: '#2563eb',
    foreground: '#ffffff',
  },

  // Semantic colors
  background: '#ffffff',
  foreground: '#09090b',
  card: '#ffffff',
  cardForeground: '#09090b',
  popover: '#ffffff',
  popoverForeground: '#09090b',
  muted: '#f4f4f5',
  mutedForeground: '#71717a',
  accent: '#f4f4f5',
  accentForeground: '#09090b',
  border: '#e4e4e7',
  input: '#e4e4e7',
  ring: '#09090b',

  // Dark mode variants
  dark: {
    background: '#000000',
    foreground: '#fafafa',
    card: '#09090b',
    cardForeground: '#fafafa',
    popover: '#09090b',
    popoverForeground: '#fafafa',
    muted: '#27272a',
    mutedForeground: '#a1a1aa',
    accent: '#27272a',
    accentForeground: '#fafafa',
    border: '#27272a',
    input: '#27272a',
    ring: '#d4d4d8',
  },
} as const;

export type Colors = typeof colors;
export type ColorKey = keyof Colors;