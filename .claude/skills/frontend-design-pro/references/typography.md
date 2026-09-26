# Typography System

Comprehensive typography guidance for distinctive, readable interfaces.

## Platform-Specific Fonts

### For Platform-Native Compliance

| Platform | Primary Font | Purpose |
|----------|--------------|---------|
| Android/Web | Roboto | System consistency |
| iOS/macOS | San Francisco (SF Pro) | Native experience |
| Multi-language | Noto | Universal coverage |

**Note**: Use platform fonts when building native apps requiring system integration. Avoid for distinctive branding where differentiation matters.

### For Distinctive Branding

Choose fonts that are beautiful, unique, and interesting. Pair a distinctive display font with a refined body font.

#### Display Font Categories
- **Geometric Sans**: Futura, Avenir, Proxima Nova, Gilroy
- **Humanist Sans**: Fira Sans, Source Sans Pro, Open Sans
- **Neo-Grotesque**: Helvetica Neue, Univers, Aktiv Grotesk
- **Serif Display**: Playfair Display, Cormorant, Libre Baskerville
- **Slab Serif**: Rockwell, Roboto Slab, Zilla Slab
- **Expressive**: Space Grotesk, Clash Display, Cabinet Grotesk

#### Body Font Categories
- **Readable Sans**: Work Sans, Lato, Nunito
- **Readable Serif**: Lora, Merriweather, Source Serif Pro
- **Monospace** (code/data): JetBrains Mono, Fira Code, IBM Plex Mono

## Font Pairing Principles

### Contrast-Based Pairing
Combine fonts with distinct characteristics:
- Serif display + Sans body
- Geometric display + Humanist body
- Bold display + Light body

### Superfamily Pairing
Use fonts from same family for harmony:
- IBM Plex Sans + IBM Plex Serif
- Source Sans Pro + Source Serif Pro

## Typography Scale

Use consistent scale based on ratio (1.25 recommended for web):

```
Base: 16px
Scale ratio: 1.25

xs:    10px (0.625rem)
sm:    13px (0.813rem)
base:  16px (1rem)
lg:    20px (1.25rem)
xl:    25px (1.563rem)
2xl:   31px (1.953rem)
3xl:   39px (2.441rem)
4xl:   49px (3.052rem)
5xl:   61px (3.815rem)
```

## Line Height Guidelines

| Text Type | Line Height |
|-----------|-------------|
| Body text | 1.5 - 1.7 |
| Headings | 1.1 - 1.3 |
| UI labels | 1.2 - 1.4 |
| Large display | 1.0 - 1.1 |

## Letter Spacing

| Text Type | Letter Spacing |
|-----------|----------------|
| Body text | 0 (default) |
| Uppercase | +0.05em to +0.1em |
| Large headings | -0.01em to -0.02em |
| Small text | +0.01em |

## Platform-Specific Guidelines

### Apple HIG Typography
- SF Pro Display: UI components, larger sizes
- SF Pro Text: Body text, extended reading (wider spacing)
- Minimum: 11pt for readability
- Maximum 2 font families per app
- Dynamic Type support required

### Material Design Typography
- Roboto: Primary typeface
- Noto: Multi-language support
- Scalable type system across screen sizes
- Clear information hierarchy through size/weight

## Best Practices

1. **Limit font families**: Maximum 2-3 per project
2. **Establish hierarchy**: Use size, weight, and color consistently
3. **Ensure readability**: Test at various sizes and on different screens
4. **Consider loading**: Web fonts impact performance
5. **Fallback stacks**: Always include system fallbacks

## Anti-Patterns

- Using Inter, Roboto, or Arial for distinctive branding
- More than 3 font families
- Inconsistent sizing across similar elements
- Light font weights for body text (below 400)
- Decorative fonts for body copy
