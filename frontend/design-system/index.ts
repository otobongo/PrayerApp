/**
 * PrayerApp Design System
 * Single source of truth for all UI components and tokens
 *
 * Import everything from here to ensure consistency
 * Changes to components will automatically propagate throughout the app
 */

// Design Tokens - Foundation
export * from './tokens';

// Atomic Components
export * from './components/atoms';

// Molecular Components
export * from './components/molecules';

// Re-export commonly used combinations
export {
  // Tokens
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  breakpoints,
  zIndex,
  tokens,
} from './tokens';

export {
  // Atoms
  Button,
  Text,
  Container,
  Card,
  Input,
  Textarea,
  Badge,
  Avatar,
  AvatarGroup,
  // Text variants
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Body,
  Label,
  Caption,
  Lead,
  // Card sub-components
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  // Container variants
  Section,
  Article,
  Main,
  Aside,
  Nav,
  Header,
  Footer,
  // Badge variants
  StatusBadge,
  CountBadge,
} from './components/atoms';

export {
  // Molecules
  FormField,
  FormGroup,
  FormSection,
  FeatureCard,
  FeatureGrid,
} from './components/molecules';