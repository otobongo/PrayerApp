# Google Material Design

Comprehensive Material Design 3 guidelines for Web and Android platforms.

## Core Principles

| Principle | Description |
|-----------|-------------|
| **Material as Metaphor** | Interface elements resemble physical materials with tactile, intuitive experience |
| **Bold, Graphic, Intentional** | Bold colors, typography, and imagery create clear, engaging design |
| **Motion Provides Meaning** | Animation and transitions guide user understanding |
| **User as Initiator** | Interfaces respond consistently and predictably to user actions |

## Material 3 (Material You)

### Dynamic Color System
Material 3 introduces personalized color through Dynamic Color:

- Colors generated from user's wallpaper
- System-wide palette adaptation
- Maintains accessibility while personalizing
- Harmonious tones improve visual comfort

### Tonal Palettes
Each color generates 13 tones (0-100):
```
Primary:         Brand color, primary actions
Secondary:       Supporting elements
Tertiary:        Contrast, accents
Neutral:         Surfaces, backgrounds
Neutral Variant: Outlines, subtle elements
Error:           Error states
```

### Color Roles
```css
/* Surface colors */
--md-sys-color-surface
--md-sys-color-surface-variant
--md-sys-color-surface-container
--md-sys-color-surface-container-high
--md-sys-color-surface-container-highest

/* Primary */
--md-sys-color-primary
--md-sys-color-on-primary
--md-sys-color-primary-container
--md-sys-color-on-primary-container

/* Secondary, Tertiary, Error follow same pattern */
```

## 8px Grid System

All spacing and sizing based on 8px increments:

| Token | Value | Use Case |
|-------|-------|----------|
| `--space-1` | 4px | Icon padding, tight spacing |
| `--space-2` | 8px | Base unit |
| `--space-3` | 12px | Compact spacing |
| `--space-4` | 16px | Standard spacing |
| `--space-5` | 20px | - |
| `--space-6` | 24px | Section spacing |
| `--space-8` | 32px | Large spacing |
| `--space-10` | 40px | - |
| `--space-12` | 48px | Container padding |
| `--space-16` | 64px | Hero spacing |

## Typography

### Type Scale
```
Display Large:   57sp / 64 line-height
Display Medium:  45sp / 52 line-height
Display Small:   36sp / 44 line-height

Headline Large:  32sp / 40 line-height
Headline Medium: 28sp / 36 line-height
Headline Small:  24sp / 32 line-height

Title Large:     22sp / 28 line-height
Title Medium:    16sp / 24 line-height / Medium weight
Title Small:     14sp / 20 line-height / Medium weight

Body Large:      16sp / 24 line-height
Body Medium:     14sp / 20 line-height
Body Small:      12sp / 16 line-height

Label Large:     14sp / 20 line-height / Medium weight
Label Medium:    12sp / 16 line-height / Medium weight
Label Small:     11sp / 16 line-height / Medium weight
```

### Font Recommendations
- **Primary**: Roboto (Android/Web)
- **Multi-language**: Noto Sans/Serif

## Elevation System

Material uses elevation (dp) to convey hierarchy:

| Level | dp | Shadow | Use Case |
|-------|----|---------|-|
| Level 0 | 0dp | None | Flat surfaces |
| Level 1 | 1dp | Subtle | Cards, list items |
| Level 2 | 3dp | Light | Raised buttons |
| Level 3 | 6dp | Medium | FAB, app bar |
| Level 4 | 8dp | Pronounced | Menus, dialogs |
| Level 5 | 12dp | Heavy | Navigation drawer |

### Dark Theme Elevation
In dark mode, elevation is shown through surface tint (lighter = higher):
```css
/* Dark theme surfaces */
--surface-level-0: #121212;
--surface-level-1: #1E1E1E;
--surface-level-2: #232323;
--surface-level-3: #282828;
--surface-level-4: #2C2C2C;
--surface-level-5: #333333;
```

## Motion

### Transition Durations
| Type | Duration |
|------|----------|
| Small (icons, buttons) | 100ms |
| Medium (cards, panels) | 250ms |
| Large (page, complex) | 300ms |
| Extra Large (route) | 400ms |

### Easing Curves
```css
--md-sys-motion-easing-standard: cubic-bezier(0.2, 0, 0, 1);
--md-sys-motion-easing-standard-decelerate: cubic-bezier(0, 0, 0, 1);
--md-sys-motion-easing-standard-accelerate: cubic-bezier(0.3, 0, 1, 1);
--md-sys-motion-easing-emphasized: cubic-bezier(0.2, 0, 0, 1);
--md-sys-motion-easing-emphasized-decelerate: cubic-bezier(0.05, 0.7, 0.1, 1);
--md-sys-motion-easing-emphasized-accelerate: cubic-bezier(0.3, 0, 0.8, 0.15);
```

### Motion Principles
1. **Informative**: Clarifies relationships and results
2. **Focused**: Directs attention without distraction
3. **Expressive**: Celebrates moments, adds personality

## Component Specifications

### Buttons
| Type | Height | Padding | Radius |
|------|--------|---------|--------|
| Filled | 40dp | 24dp | 20dp (pill) |
| Outlined | 40dp | 24dp | 20dp |
| Text | 40dp | 12dp | 20dp |
| FAB | 56dp | 16dp | 16dp |
| Extended FAB | 56dp | 16dp | 16dp |

### Cards
- Minimum touch target: 48x48dp
- Corner radius: 12dp (default)
- Padding: 16dp

### Navigation
- Bottom nav height: 80dp
- Navigation rail width: 80dp
- Navigation drawer width: 360dp max

## Material 3 Expressive (2025)

Latest evolution with enhanced expressiveness:
- Increased animation
- More colorful interfaces
- Larger, bolder buttons
- Users locate elements up to 4x faster
- Equal visual detection across age groups

## Implementation Resources

### Web Components
```html
<!-- Material Web -->
<script type="module" src="@material/web/all.js"></script>

<md-filled-button>Click me</md-filled-button>
<md-outlined-text-field label="Name"></md-outlined-text-field>
```

### Design Tokens
Use Material Theme Builder to generate tokens:
https://m3.material.io/theme-builder

### Official Documentation
- Material Design: https://m3.material.io
- Material Web: https://material-web.dev
- Android Material: https://developer.android.com/develop/ui/compose/designsystems/material3
