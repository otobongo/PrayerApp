/**
 * Generate CSS Variables from Design Tokens
 * This script converts the unified tokens to CSS custom properties
 */

const fs = require('fs');
const path = require('path');

// Import tokens (you may need to compile TypeScript first)
// For now, we'll define them here
const tokens = {
  colors: {
    gray: {
      50: 'hsl(0, 0%, 98%)',
      100: 'hsl(0, 0%, 96.1%)',
      200: 'hsl(0, 0%, 92.2%)',
      300: 'hsl(0, 0%, 87.8%)',
      400: 'hsl(0, 0%, 74.1%)',
      500: 'hsl(0, 0%, 62.7%)',
      600: 'hsl(0, 0%, 45.9%)',
      700: 'hsl(0, 0%, 32.2%)',
      800: 'hsl(0, 0%, 14.9%)',
      900: 'hsl(0, 0%, 9%)',
      950: 'hsl(0, 0%, 3.9%)',
    },
    brand: {
      primary: {
        50: 'hsl(216, 40%, 96%)',
        100: 'hsl(216, 40%, 92%)',
        200: 'hsl(216, 40%, 84%)',
        300: 'hsl(216, 40%, 74%)',
        400: 'hsl(216, 40%, 60%)',
        500: 'hsl(216, 40%, 45%)',
        600: 'hsl(216, 40%, 35%)',
        700: 'hsl(216, 40%, 28%)',
        800: 'hsl(216, 40%, 20%)',
        900: 'hsl(216, 40%, 14%)',
      },
      accent: {
        50: 'hsl(34, 60%, 96%)',
        100: 'hsl(34, 60%, 92%)',
        200: 'hsl(34, 60%, 84%)',
        300: 'hsl(34, 60%, 74%)',
        400: 'hsl(34, 60%, 60%)',
        500: 'hsl(34, 60%, 50%)',
        600: 'hsl(34, 60%, 40%)',
        700: 'hsl(34, 60%, 32%)',
        800: 'hsl(34, 60%, 24%)',
        900: 'hsl(34, 60%, 16%)',
      }
    },
    semantic: {
      success: {
        DEFAULT: 'hsl(142, 76%, 36%)',
        foreground: 'hsl(0, 0%, 100%)',
        light: 'hsl(142, 76%, 95%)',
        dark: 'hsl(142, 76%, 28%)',
      },
      warning: {
        DEFAULT: 'hsl(45, 93%, 47%)',
        foreground: 'hsl(0, 0%, 100%)',
        light: 'hsl(45, 93%, 95%)',
        dark: 'hsl(45, 93%, 35%)',
      },
      error: {
        DEFAULT: 'hsl(0, 84%, 60%)',
        foreground: 'hsl(0, 0%, 100%)',
        light: 'hsl(0, 84%, 95%)',
        dark: 'hsl(0, 84%, 45%)',
      },
      info: {
        DEFAULT: 'hsl(199, 89%, 48%)',
        foreground: 'hsl(0, 0%, 100%)',
        light: 'hsl(199, 89%, 95%)',
        dark: 'hsl(199, 89%, 38%)',
      },
    }
  },
  spacing: {
    px: '1px',
    0: '0',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
  },
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    DEFAULT: '0.375rem',
    md: '0.5rem',
    lg: '0.625rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
};

// Convert HSL string to HSL values only (for Tailwind compatibility)
function extractHSLValues(hslString) {
  const match = hslString.match(/hsl\(([\d.,\s%]+)\)/);
  if (match) {
    return match[1];
  }
  return hslString;
}

// Generate CSS variables
function generateCSSVariables() {
  let css = `/* Generated CSS Variables from Design Tokens */
/* Generated on ${new Date().toISOString()} */

@layer base {
  :root {
    /* ===== COLOR SYSTEM ===== */

    /* Grayscale */
`;

  // Add gray colors
  Object.entries(tokens.colors.gray).forEach(([key, value]) => {
    css += `    --gray-${key}: ${extractHSLValues(value)};\n`;
  });

  css += `
    /* Brand Primary */
`;

  // Add brand colors
  Object.entries(tokens.colors.brand.primary).forEach(([key, value]) => {
    css += `    --primary-${key}: ${extractHSLValues(value)};\n`;
  });

  css += `
    /* Brand Accent */
`;

  Object.entries(tokens.colors.brand.accent).forEach(([key, value]) => {
    css += `    --accent-${key}: ${extractHSLValues(value)};\n`;
  });

  css += `
    /* Semantic Colors */
`;

  // Add semantic colors
  Object.entries(tokens.colors.semantic).forEach(([colorName, colorValues]) => {
    Object.entries(colorValues).forEach(([key, value]) => {
      const varName = key === 'DEFAULT' ? colorName : `${colorName}-${key}`;
      css += `    --${varName}: ${extractHSLValues(value)};\n`;
    });
  });

  css += `
    /* ===== SPACING SYSTEM ===== */
`;

  // Add spacing
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    const varName = key.replace('.', '-');
    css += `    --space-${varName}: ${value};\n`;
  });

  css += `
    /* ===== BORDER RADIUS ===== */
`;

  // Add border radius
  Object.entries(tokens.borderRadius).forEach(([key, value]) => {
    const varName = key === 'DEFAULT' ? 'radius' : `radius-${key}`;
    css += `    --${varName}: ${value};\n`;
  });

  // Add application-specific variables
  css += `
    /* ===== APPLICATION TOKENS ===== */

    /* Core Colors */
    --background: var(--gray-50);
    --foreground: var(--gray-900);

    /* Component Colors */
    --card: 0 0% 100%;
    --card-foreground: var(--gray-900);
    --popover: 0 0% 100%;
    --popover-foreground: var(--gray-900);

    /* Primary */
    --primary: var(--gray-900);
    --primary-foreground: var(--gray-50);

    /* Secondary */
    --secondary: var(--gray-100);
    --secondary-foreground: var(--gray-900);

    /* Muted */
    --muted: var(--gray-100);
    --muted-foreground: var(--gray-600);

    /* Destructive */
    --destructive: var(--error);
    --destructive-foreground: var(--error-foreground);

    /* Borders */
    --border: var(--gray-200);
    --input: var(--gray-200);
    --ring: var(--gray-500);

    /* Chart Colors */
    --chart-1: var(--primary-500);
    --chart-2: var(--accent-500);
    --chart-3: var(--success);
    --chart-4: var(--warning);
    --chart-5: var(--info);
  }

  /* Dark Mode */
  .dark {
    /* Invert grayscale for dark mode */
    --gray-50: 0 0% 3.9%;
    --gray-100: 0 0% 7.8%;
    --gray-200: 0 0% 11.8%;
    --gray-300: 0 0% 16.1%;
    --gray-400: 0 0% 26.3%;
    --gray-500: 0 0% 38.8%;
    --gray-600: 0 0% 53.7%;
    --gray-700: 0 0% 68.6%;
    --gray-800: 0 0% 85.9%;
    --gray-900: 0 0% 93.3%;
    --gray-950: 0 0% 96.1%;

    /* Core Colors */
    --background: 0 0% 0%;
    --foreground: var(--gray-900);

    /* Component Colors */
    --card: var(--gray-100);
    --card-foreground: var(--gray-900);
    --popover: var(--gray-100);
    --popover-foreground: var(--gray-900);

    /* Primary */
    --primary: var(--gray-900);
    --primary-foreground: var(--gray-100);

    /* Secondary */
    --secondary: var(--gray-200);
    --secondary-foreground: var(--gray-900);

    /* Muted */
    --muted: var(--gray-200);
    --muted-foreground: var(--gray-600);

    /* Borders */
    --border: var(--gray-300);
    --input: var(--gray-300);
    --ring: var(--gray-600);
  }
}
`;

  return css;
}

// Generate and save CSS
const cssContent = generateCSSVariables();
const outputPath = path.join(__dirname, '../app/design-tokens.css');

fs.writeFileSync(outputPath, cssContent, 'utf8');

console.log(`✅ CSS variables generated successfully at ${outputPath}`);
console.log(`📝 Import this file in your globals.css or layout.tsx`);

// Also generate a JSON file for runtime access
const jsonPath = path.join(__dirname, '../design-system/tokens/generated.json');
fs.writeFileSync(jsonPath, JSON.stringify(tokens, null, 2), 'utf8');

console.log(`✅ JSON tokens saved at ${jsonPath}`);