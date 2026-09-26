# Theme Presets

Ready-to-use color and typography combinations for rapid design implementation.

## Professional Themes

### Ocean Depths
Professional, calming maritime theme.

```css
:root {
  --color-primary: #0077B6;
  --color-primary-hover: #005F8A;
  --color-secondary: #90E0EF;
  --color-background: #CAF0F8;
  --color-surface: #FFFFFF;
  --color-on-surface: #03045E;
  --font-display: 'Poppins', sans-serif;
  --font-body: 'Lora', serif;
}
```
**Best For**: Healthcare, finance, corporate, consulting

---

### Modern Minimalist
Clean, contemporary grayscale.

```css
:root {
  --color-primary: #18181B;
  --color-primary-hover: #27272A;
  --color-secondary: #71717A;
  --color-background: #FAFAFA;
  --color-surface: #FFFFFF;
  --color-on-surface: #18181B;
  --font-display: 'Inter', sans-serif;
  --font-body: 'Inter', sans-serif;
}
```
**Best For**: Tech, SaaS, portfolios, agencies

---

### Tech Innovation
Bold, modern tech aesthetic.

```css
:root {
  --color-primary: #6366F1;
  --color-primary-hover: #4F46E5;
  --color-secondary: #22D3EE;
  --color-background: #0F172A;
  --color-surface: #1E293B;
  --color-on-surface: #F1F5F9;
  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
}
```
**Best For**: Developer tools, AI products, startups

---

## Nature-Inspired Themes

### Forest Canopy
Natural, grounded earth tones.

```css
:root {
  --color-primary: #2D5016;
  --color-primary-hover: #1E3A0E;
  --color-secondary: #84CC16;
  --color-background: #F7FEE7;
  --color-surface: #FFFFFF;
  --color-on-surface: #1A2E05;
  --font-display: 'Playfair Display', serif;
  --font-body: 'Source Sans Pro', sans-serif;
}
```
**Best For**: Sustainability, organic products, wellness

---

### Botanical Garden
Fresh, organic garden colors.

```css
:root {
  --color-primary: #059669;
  --color-primary-hover: #047857;
  --color-secondary: #FCD34D;
  --color-background: #ECFDF5;
  --color-surface: #FFFFFF;
  --color-on-surface: #064E3B;
  --font-display: 'DM Serif Display', serif;
  --font-body: 'Nunito', sans-serif;
}
```
**Best For**: Gardening, eco-friendly, natural products

---

### Desert Rose
Soft, sophisticated dusty tones.

```css
:root {
  --color-primary: #BE185D;
  --color-primary-hover: #9D174D;
  --color-secondary: #FCA5A5;
  --color-background: #FFF1F2;
  --color-surface: #FFFFFF;
  --color-on-surface: #4C0519;
  --font-display: 'Cormorant Garamond', serif;
  --font-body: 'Lato', sans-serif;
}
```
**Best For**: Beauty, fashion, lifestyle, weddings

---

## Warm Themes

### Sunset Boulevard
Warm, vibrant sunset colors.

```css
:root {
  --color-primary: #EA580C;
  --color-primary-hover: #C2410C;
  --color-secondary: #FBBF24;
  --color-background: #FFFBEB;
  --color-surface: #FFFFFF;
  --color-on-surface: #431407;
  --font-display: 'Outfit', sans-serif;
  --font-body: 'Work Sans', sans-serif;
}
```
**Best For**: Food & beverage, travel, entertainment

---

### Golden Hour
Rich, warm autumnal palette.

```css
:root {
  --color-primary: #B45309;
  --color-primary-hover: #92400E;
  --color-secondary: #FCD34D;
  --color-background: #FFFBEB;
  --color-surface: #FFFFFF;
  --color-on-surface: #451A03;
  --font-display: 'Fraunces', serif;
  --font-body: 'Commissioner', sans-serif;
}
```
**Best For**: Artisan goods, coffee, luxury crafts

---

## Cool Themes

### Arctic Frost
Cool, crisp winter-inspired theme.

```css
:root {
  --color-primary: #0EA5E9;
  --color-primary-hover: #0284C7;
  --color-secondary: #E0F2FE;
  --color-background: #F0F9FF;
  --color-surface: #FFFFFF;
  --color-on-surface: #0C4A6E;
  --font-display: 'Urbanist', sans-serif;
  --font-body: 'Source Sans Pro', sans-serif;
}
```
**Best For**: Healthcare, science, clean tech

---

### Midnight Galaxy
Dramatic, cosmic deep tones.

```css
:root {
  --color-primary: #8B5CF6;
  --color-primary-hover: #7C3AED;
  --color-secondary: #C4B5FD;
  --color-background: #1E1B4B;
  --color-surface: #312E81;
  --color-on-surface: #EDE9FE;
  --font-display: 'Sora', sans-serif;
  --font-body: 'Inter', sans-serif;
}
```
**Best For**: Gaming, entertainment, nightlife, creative agencies

---

## Anthropic Brand Theme

Official Anthropic styling.

```css
:root {
  /* Main Colors */
  --color-dark: #141413;
  --color-light: #FAF9F5;
  --color-mid-gray: #B0AEA5;
  --color-light-gray: #E8E6DC;
  
  /* Accent Colors */
  --color-primary: #D97757;      /* Orange */
  --color-secondary: #6A9BCC;    /* Blue */
  --color-tertiary: #788C5D;     /* Green */
  
  /* Semantic mapping */
  --color-background: #FAF9F5;
  --color-surface: #FFFFFF;
  --color-on-surface: #141413;
  
  --font-display: 'Poppins', sans-serif;
  --font-body: 'Lora', serif;
}
```
**Best For**: Anthropic-branded content, AI tools, documentation

---

## Usage

1. Copy the desired theme variables
2. Paste into your CSS `:root` block
3. Override individual values as needed
4. Add dark mode variants using `@media (prefers-color-scheme: dark)`
