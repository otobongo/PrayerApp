# Color Systems

Unified color system combining Material Design, Apple HIG, and brand design principles.

## Semantic Color Roles

### Unified Role System

| Role | Purpose | Material Term | Apple Term |
|------|---------|---------------|------------|
| **Primary** | Main brand color, primary actions | Primary | Tint/Accent |
| **Secondary** | Supporting brand color | Secondary | - |
| **Surface** | Background for cards/sheets | Surface | Background |
| **Background** | App/page background | Background | systemBackground |
| **Error** | Error states, destructive actions | Error | systemRed |
| **On-Primary** | Text/icons on primary color | On-Primary | - |
| **On-Surface** | Text/icons on surface | On-Surface | Label |
| **Outline** | Borders, dividers | Outline | Separator |

### Extended Roles

| Role | Purpose |
|------|---------|
| **Success** | Positive feedback, completion |
| **Warning** | Caution states, alerts |
| **Info** | Informational messages |
| **Muted** | De-emphasized content |
| **Accent** | Highlight, emphasis |

## Color Strategy

### Dominant + Sharp Accent

Most effective palette structure:
- **1 dominant color** (60-70% of UI)
- **1-2 sharp accents** (10-20%)
- **Neutral base** (remaining)

This outperforms evenly-distributed palettes.

### Neutral Foundation

Build on solid neutrals:
```
Warm neutrals: #FAF9F5, #E8E6DC, #B0AEA5, #141413
Cool neutrals: #F8FAFC, #E2E8F0, #94A3B8, #1E293B
Pure neutrals: #FAFAFA, #E5E5E5, #A3A3A3, #171717
```

## Material Design Dynamic Color

Material 3 generates palettes from source color:

### Tonal Palettes
- **Primary**: 13 tones (0-100)
- **Secondary**: 13 tones
- **Tertiary**: 13 tones
- **Neutral**: 13 tones
- **Neutral Variant**: 13 tones

### Color Scheme Generation
```
Source color → Algorithm → Full palette

Light scheme: Higher tones for surfaces, lower for text
Dark scheme: Lower tones for surfaces, higher for text
```

## Apple HIG System Colors

### Semantic Colors (Adapt to Light/Dark)
```
systemBlue    - Interactive elements
systemGreen   - Success, positive
systemRed     - Error, destructive
systemOrange  - Warning
systemYellow  - Caution
systemPurple  - Special/Premium
systemPink    - Affection/Social
systemTeal    - Secondary actions
```

### Background Colors
```
systemBackground        - Primary background
secondarySystemBackground - Grouped content
tertiarySystemBackground  - Nested content
```

## Theme Structure

### CSS Variables Template
```css
:root {
  /* Primary */
  --color-primary: #2563EB;
  --color-primary-hover: #1D4ED8;
  --color-primary-active: #1E40AF;
  --color-on-primary: #FFFFFF;
  
  /* Secondary */
  --color-secondary: #64748B;
  --color-secondary-hover: #475569;
  --color-on-secondary: #FFFFFF;
  
  /* Surface */
  --color-surface: #FFFFFF;
  --color-surface-variant: #F1F5F9;
  --color-on-surface: #0F172A;
  --color-on-surface-muted: #64748B;
  
  /* Background */
  --color-background: #F8FAFC;
  --color-on-background: #0F172A;
  
  /* Feedback */
  --color-error: #DC2626;
  --color-success: #16A34A;
  --color-warning: #D97706;
  --color-info: #0284C7;
  
  /* Outline */
  --color-outline: #E2E8F0;
  --color-outline-variant: #CBD5E1;
}
```

### Dark Theme Considerations
- Reduce saturation slightly for dark backgrounds
- Use lighter tones for surfaces (not pure black)
- Increase contrast for text on dark surfaces
- Flip elevation model (lighter = higher in dark mode)

## Contrast Requirements

### WCAG Standards
| Level | Ratio | Use Case |
|-------|-------|----------|
| AA | 4.5:1 | Normal text |
| AA | 3:1 | Large text (18pt+, 14pt+ bold) |
| AAA | 7:1 | Enhanced accessibility |
| AA | 3:1 | UI components, graphical objects |

### Testing Tools
- WebAIM Contrast Checker
- Stark (Figma plugin)
- Chrome DevTools Accessibility

## Anti-Patterns

- Purple gradients on white (overused AI aesthetic)
- Arbitrary gradients without purpose
- Equal distribution of colors (no hierarchy)
- Low contrast for aesthetics
- Too many accent colors competing
- Ignoring dark mode considerations
