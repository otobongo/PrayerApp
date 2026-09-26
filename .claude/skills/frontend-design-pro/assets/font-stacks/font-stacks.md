# Font Stacks

Curated font combinations for distinctive, readable interfaces.

## Platform-Native Stacks

### Apple System
```css
--font-apple: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif;
```

### Android/Material
```css
--font-android: 'Roboto', 'Noto Sans', sans-serif;
```

### Cross-Platform System
```css
--font-system: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
```

---

## Distinctive Pairings

### Modern Tech
Clean, contemporary for tech products.
```css
--font-display: 'Inter', -apple-system, sans-serif;
--font-body: 'Inter', -apple-system, sans-serif;
```
**Import**: `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700`

---

### Editorial Classic
Sophisticated for publishing/content.
```css
--font-display: 'Playfair Display', Georgia, serif;
--font-body: 'Source Sans Pro', -apple-system, sans-serif;
```
**Import**: `https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+Pro:wght@400;600`

---

### Geometric Modern
Bold, contemporary for branding.
```css
--font-display: 'Space Grotesk', sans-serif;
--font-body: 'Work Sans', sans-serif;
```
**Import**: `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Work+Sans:wght@400;500`

---

### Humanist Warmth
Friendly, approachable.
```css
--font-display: 'Nunito', sans-serif;
--font-body: 'Nunito', sans-serif;
```
**Import**: `https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700`

---

### Luxury Serif
Premium, refined aesthetic.
```css
--font-display: 'Cormorant Garamond', Georgia, serif;
--font-body: 'Lato', sans-serif;
```
**Import**: `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Lato:wght@400;700`

---

### Neo-Grotesque
Clean, professional Swiss style.
```css
--font-display: 'Helvetica Neue', Arial, sans-serif;
--font-body: 'Helvetica Neue', Arial, sans-serif;
```
**Note**: System font, no import needed

---

### Slab Industrial
Strong, industrial character.
```css
--font-display: 'Zilla Slab', serif;
--font-body: 'Fira Sans', sans-serif;
```
**Import**: `https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@400;600;700&family=Fira+Sans:wght@400;500`

---

### Variable Modern
Single variable font for performance.
```css
--font-display: 'Outfit', sans-serif;
--font-body: 'Outfit', sans-serif;
```
**Import**: `https://fonts.googleapis.com/css2?family=Outfit:wght@300..700`

---

### Creative Expression
Distinctive, characterful.
```css
--font-display: 'Clash Display', sans-serif;
--font-body: 'Satoshi', sans-serif;
```
**Note**: Available from fontshare.com (free)

---

### Documentation
Clear, technical documentation.
```css
--font-display: 'IBM Plex Sans', sans-serif;
--font-body: 'IBM Plex Sans', sans-serif;
--font-mono: 'IBM Plex Mono', monospace;
```
**Import**: `https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600`

---

## Monospace Stacks

### Code/Development
```css
--font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, monospace;
```

### Tabular Data
```css
--font-tabular: 'IBM Plex Mono', 'SF Mono', Consolas, monospace;
```

---

## Usage Guidelines

### Weight Recommendations
| Use Case | Weight |
|----------|--------|
| Body text | 400 (Regular) |
| UI labels | 500 (Medium) |
| Subheadings | 600 (Semibold) |
| Headings | 700 (Bold) |
| Display | 700-900 |

### Loading Strategy
```html
<!-- Preconnect for performance -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Font loading with display swap -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Subset for Performance
For single-language sites, use subset parameter:
```
&subset=latin
&subset=latin-ext
```

---

## Anti-Pattern Reminders

**Avoid for distinctive branding:**
- Inter (overused in AI/tech)
- Roboto (use only for Android-native)
- Arial (generic fallback only)
- System fonts (unless platform-native is goal)

**Use platform fonts when:**
- Building native mobile apps
- Platform compliance is priority
- Performance is critical
- Brand distinction is secondary
