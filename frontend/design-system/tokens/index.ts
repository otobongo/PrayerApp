/**
 * PrayerApp Design System - Main Token Export
 * Single source of truth for all design tokens
 */

export * from './colors';
export * from './typography';
export * from './spacing';

// Aggregate all tokens for easy import
import { colors } from './colors';
import { typography } from './typography';
import { spacing, borderRadius, shadows, transitions, breakpoints, zIndex } from './spacing';

export const tokens = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  breakpoints,
  zIndex,
} as const;

export type Tokens = typeof tokens;