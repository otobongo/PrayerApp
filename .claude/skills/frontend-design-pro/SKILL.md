---
name: frontend-design-pro
description: Create distinctive, production-grade frontend interfaces with exceptional visual design quality. Use this skill when building web components, pages, or applications requiring high design standards. Supports platform-specific guidelines (Google Material Design for Web/Android, Apple HIG for iOS), design philosophy frameworks, typography systems, color theory, motion patterns, accessibility compliance, and spatial composition. Generates creative, polished code that balances distinctive branding with platform-native experiences. Activates for queries about UI design, visual aesthetics, design systems, component styling, or frontend visual implementation.
---

# Frontend Design Pro

Create distinctive, production-grade frontend interfaces that balance creative vision with platform conventions. This skill provides comprehensive guidance for visual design across web, Android, and iOS platforms.

## Design Thinking Process

Before coding, establish context and commit to a clear aesthetic direction:

1. **Purpose**: What problem does this interface solve? Who uses it?
2. **Platform**: Web, Android (Material Design), or iOS (Apple HIG)?
3. **Project Type**: Content app (deference) or branded experience (bold)?
4. **Tone**: Select aesthetic direction matching context
5. **Differentiation**: What makes this memorable?

**Core Principle**: Choose a clear conceptual direction and execute with precision. Both bold maximalism and refined minimalism work; the key is intentionality.

## Platform Selection

| Platform | Design System | Grid | Reference |
|----------|---------------|------|-----------|
| Web | Material Design or Custom | 8px grid | `references/material-design.md` |
| Android | Material Design 3 | 8px grid | `references/material-design.md` |
| iOS/macOS | Apple HIG | Platform-native | `references/apple-hig.md` |

## Quick Reference: Core Principles

### For Content Apps (Deference)
- UI helps users focus on content
- Minimize visual clutter
- Subtle animations for state changes
- Content takes center stage

### For Branded Experiences (Bold)
- Commit to distinctive aesthetic
- Memorable visual identity
- Orchestrated reveals and transitions
- Strong design point-of-view

## Design Foundations

Load detailed guidance based on task:

| Task | Reference File |
|------|----------------|
| Typography system | `references/typography.md` |
| Color palettes & theming | `references/color-systems.md` |
| Animation & motion | `references/motion-patterns.md` |
| Layout & spatial composition | `references/spatial-composition.md` |
| Accessibility standards | `references/accessibility.md` |
| Material Design (Web/Android) | `references/material-design.md` |
| Apple HIG (iOS/macOS) | `references/apple-hig.md` |
| Design philosophy framework | `references/design-philosophy.md` |

## Universal Standards

### Touch Targets
- Minimum size: **44x44pt** (Apple standard, universally applicable)
- Ensures accessibility for all users including those with motor impairments

### Color Contrast
- Minimum ratio: **4.5:1** for standard text (WCAG AA)
- **3:1** for large text (18pt+ or 14pt+ bold)
- **7:1** for enhanced accessibility (WCAG AAA)

### Visual Hierarchy
Establish hierarchy through multiple techniques:
- **Size & Scale**: Larger elements draw attention first
- **Color & Contrast**: High contrast for primary elements
- **Depth & Elevation**: Shadows and layers (Material: dp values)
- **Spacing & Proximity**: Related items grouped together
- **Typography Weight**: Bold for emphasis, regular for body

## Anti-Patterns to Avoid

### Typography
- Avoid for distinctive branding: Inter, Roboto, Arial, system fonts
- Use platform fonts (Roboto, San Francisco) for platform-native compliance
- Never use more than 2-3 font families

### Color
- Avoid clichéd schemes (purple gradients on white)
- Avoid arbitrary gradients without purpose
- Never sacrifice contrast for aesthetics

### Layout
- Avoid excessive centered layouts
- Avoid uniform/identical border radius everywhere; vary contextually
- Avoid predictable, cookie-cutter patterns

### General
- Never converge on common AI-generated choices
- Avoid designs lacking context-specific character

## Implementation Output

Generate production-ready code that is:
- Functional and tested
- Visually striking and memorable
- Cohesive with clear aesthetic point-of-view
- Meticulously refined in every detail
- Accessible by default

## Assets Available

| Asset | Location | Purpose |
|-------|----------|---------|
| CSS Variables Template | `assets/css-variables/` | Theming structure |
| Theme Presets | `assets/theme-presets/` | Ready-to-use color/font combos |
| Font Stacks | `assets/font-stacks/` | Curated font combinations |

## Craftsmanship Standard

Every output should appear as though it took countless hours to create, was labored over with care, and comes from someone at the absolute top of their field. Double-check spacing, alignment, color choices, and typography. Create something that could be shown to demonstrate expertise.
