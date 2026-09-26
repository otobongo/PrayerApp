# Spatial Composition

Layout principles and spatial design guidance for web, Android, and iOS.

## Platform-Specific Grid Systems

### Material Design (Web/Android)

**8px Grid System**
All spacing and sizing based on 8px increments:
```
4px   - Micro spacing (icons, tight elements)
8px   - Base unit
16px  - Standard spacing
24px  - Section spacing
32px  - Large spacing
48px  - Extra large
64px  - Container padding
```

**Responsive Breakpoints (Material)**
```css
/* Compact */   < 600px
/* Medium */    600px - 839px
/* Expanded */  840px - 1199px
/* Large */     1200px - 1599px
/* Extra Large */ >= 1600px
```

### Apple HIG (iOS/macOS)

**Platform-Native Spacing**
iOS uses context-appropriate spacing:
- Standard margins: 16pt (compact), 20pt (regular)
- Safe areas: Respect notches and home indicators
- Readable content width: Max ~672pt for text

**Layout Margins by Device**
| Device | Margin |
|--------|--------|
| iPhone (compact) | 16pt |
| iPhone (regular) | 20pt |
| iPad | 20pt minimum |
| Mac | Context-dependent |

## Composition Principles

### Visual Balance

**Symmetrical Balance**
- Centered layouts
- Equal weight distribution
- Formal, stable feel
- Best for: Dashboards, landing heroes

**Asymmetrical Balance**
- Off-center focal points
- Varied element weights
- Dynamic, modern feel
- Best for: Editorial, creative sites

### Spatial Relationships

**Proximity**
Group related items; separate unrelated:
```
Related items:    8-16px apart
Grouped sections: 24-48px apart
Major sections:   48-96px apart
```

**Alignment**
Create invisible lines connecting elements:
- Left-align body text (LTR languages)
- Align form labels consistently
- Use grid lines for multi-column layouts

### Negative Space

**Generous Whitespace**
- Creates breathing room
- Improves comprehension
- Signals premium quality
- Minimum 10-15% of layout area

**Controlled Density**
Alternative approach for data-rich UIs:
- Compact but organized
- Clear visual hierarchy
- Consistent micro-spacing

## Layout Patterns

### Content-Width Containers
```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.container-narrow {
  max-width: 720px; /* For reading */
}

.container-wide {
  max-width: 1440px; /* For dashboards */
}
```

### Responsive Grid
```css
.grid {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
```

### Card Layouts
```css
.card-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}
```

## Depth & Layering

### Material Design Elevation (dp)

| Component | Elevation |
|-----------|-----------|
| Card (resting) | 1dp |
| Card (raised) | 8dp |
| App bar | 4dp |
| FAB (resting) | 6dp |
| FAB (pressed) | 12dp |
| Modal | 24dp |
| Navigation drawer | 16dp |

**Shadow Implementation**
```css
/* 1dp */ box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
/* 4dp */ box-shadow: 0 4px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
/* 8dp */ box-shadow: 0 8px 17px rgba(0,0,0,0.2), 0 6px 20px rgba(0,0,0,0.19);
/* 16dp */ box-shadow: 0 16px 24px rgba(0,0,0,0.22), 0 6px 30px rgba(0,0,0,0.25);
/* 24dp */ box-shadow: 0 24px 38px rgba(0,0,0,0.24), 0 9px 46px rgba(0,0,0,0.28);
```

### Apple HIG Depth
- Use subtle shadows for cards
- Translucency for overlays (vibrancy)
- Blur effects for depth perception
- Layered sheets and modals

## Border Radius

**Contextual Application** (Avoid uniform radius everywhere)

| Element | Radius |
|---------|--------|
| Buttons | 4-8px (subtle) or 9999px (pill) |
| Cards | 8-16px |
| Modals | 12-24px |
| Inputs | 4-8px |
| Images | 4-16px or 50% (circular) |
| Containers | 16-32px |

**Nested Radius Rule**
Inner radius = Outer radius - padding
```css
.outer { border-radius: 16px; padding: 8px; }
.inner { border-radius: 8px; } /* 16 - 8 = 8 */
```

## Visual Textures & Backgrounds

### Background Techniques
- **Gradient meshes**: Organic, flowing backgrounds
- **Noise textures**: Subtle grain for depth
- **Geometric patterns**: Structured, technical feel
- **Layered transparencies**: Depth without heaviness

### Implementation
```css
/* Subtle noise overlay */
.textured {
  background-image: url("data:image/svg+xml,...");
  background-size: 200px;
}

/* Gradient mesh */
.mesh-gradient {
  background: 
    radial-gradient(at 40% 20%, #ff6b6b 0px, transparent 50%),
    radial-gradient(at 80% 0%, #4ecdc4 0px, transparent 50%),
    radial-gradient(at 0% 50%, #ffe66d 0px, transparent 50%);
}
```

## Anti-Patterns

- Excessive centered layouts for all content
- Uniform border radius on every element
- Ignoring platform-specific spacing conventions
- No clear visual hierarchy
- Overcrowded layouts without breathing room
- Inconsistent spacing values
