# Accessibility Standards

Comprehensive accessibility guidelines for inclusive frontend design.

## Core Requirements

### Color Contrast

| Standard | Ratio | Application |
|----------|-------|-------------|
| **WCAG AA** | 4.5:1 | Normal text (< 18pt) |
| **WCAG AA** | 3:1 | Large text (18pt+, 14pt+ bold) |
| **WCAG AA** | 3:1 | UI components, graphical objects |
| **WCAG AAA** | 7:1 | Enhanced accessibility |

**Testing Tools**
- WebAIM Contrast Checker
- Chrome DevTools > Accessibility
- Stark (Figma/Sketch plugin)
- axe DevTools

### Touch Targets

**Minimum Size: 44x44pt** (Apple standard, universally applicable)

| Platform | Minimum | Recommended |
|----------|---------|-------------|
| iOS | 44x44pt | 44x44pt |
| Android | 48x48dp | 48x48dp |
| Web | 44x44px | 48x48px |

**Spacing Between Targets**
Minimum 8px between adjacent touch targets.

### Focus States

All interactive elements must have visible focus indicators:

```css
/* Custom focus ring */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Remove default, add custom */
button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
}
```

**Never remove focus styles without replacement.**

## Typography Accessibility

### Minimum Font Sizes
| Context | Minimum |
|---------|---------|
| Body text | 16px (1rem) |
| iOS minimum | 11pt |
| Secondary text | 14px |
| Captions | 12px |

### Line Height
- Body text: 1.5 minimum
- Headings: 1.2 minimum
- Avoid line heights below 1.2

### Font Weight
- Avoid weights below 400 for body text
- Light fonts (300) only for large display text
- Ensure sufficient contrast with background

### Dynamic Type (Apple)
Support user text size preferences:
```css
/* Respect iOS Dynamic Type */
body {
  font: -apple-system-body;
}
```

## Screen Reader Support

### Semantic HTML
```html
<!-- Use semantic elements -->
<header>, <nav>, <main>, <article>, <section>, <aside>, <footer>

<!-- Proper heading hierarchy -->
<h1>Page Title</h1>
  <h2>Section</h2>
    <h3>Subsection</h3>

<!-- Accessible buttons -->
<button type="button">Click me</button>
<!-- NOT: <div onclick="...">Click me</div> -->
```

### ARIA Labels
```html
<!-- Icon buttons need labels -->
<button aria-label="Close dialog">
  <svg>...</svg>
</button>

<!-- Describe dynamic content -->
<div aria-live="polite" aria-atomic="true">
  Status messages appear here
</div>

<!-- Link purpose -->
<a href="/docs" aria-label="View documentation">
  Learn more
</a>
```

### Image Alternatives
```html
<!-- Informative images -->
<img src="chart.png" alt="Q3 revenue increased 25% over Q2">

<!-- Decorative images -->
<img src="decoration.png" alt="" role="presentation">

<!-- Complex images -->
<figure>
  <img src="diagram.png" alt="System architecture overview">
  <figcaption>Detailed description of system components...</figcaption>
</figure>
```

## Motion Accessibility

### Reduced Motion Preference
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Safe Animation Practices
- Avoid flashing content (max 3 flashes/second)
- Provide pause/stop controls for auto-playing content
- Use subtle, purposeful animations
- Test with motion sensitivity users

## Keyboard Navigation

### Tab Order
Ensure logical tab order follows visual layout:
```html
<!-- Use tabindex sparingly -->
tabindex="0"   <!-- Add to tab order -->
tabindex="-1"  <!-- Programmatically focusable only -->
<!-- AVOID: tabindex > 0 -->
```

### Keyboard Shortcuts
```html
<!-- Document keyboard shortcuts -->
<button aria-keyshortcuts="Control+S">Save</button>
```

### Skip Links
```html
<a href="#main-content" class="skip-link">
  Skip to main content
</a>
```

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  padding: 8px;
  z-index: 100;
}
.skip-link:focus {
  top: 0;
}
```

## Form Accessibility

### Labels
```html
<!-- Associated labels -->
<label for="email">Email address</label>
<input type="email" id="email" name="email">

<!-- Or wrapped -->
<label>
  Email address
  <input type="email" name="email">
</label>
```

### Error Messages
```html
<input 
  type="email" 
  id="email"
  aria-describedby="email-error"
  aria-invalid="true"
>
<span id="email-error" role="alert">
  Please enter a valid email address
</span>
```

### Required Fields
```html
<label for="name">
  Name <span aria-hidden="true">*</span>
  <span class="sr-only">(required)</span>
</label>
<input type="text" id="name" required aria-required="true">
```

## Color Independence

Never rely on color alone to convey information:

```html
<!-- Add icons or text -->
<span class="status error">
  <svg><!-- error icon --></svg>
  Error: Upload failed
</span>

<!-- Use patterns in charts -->
<!-- Combine color with texture/pattern -->
```

## Platform-Specific

### Apple VoiceOver
- Test with VoiceOver on iOS/macOS
- Support VoiceOver gestures
- Provide proper labels for all controls

### Android TalkBack
- Test with TalkBack
- Follow Material accessibility guidelines
- Support Switch Access

## Testing Checklist

- [ ] Color contrast meets 4.5:1 (text) / 3:1 (UI)
- [ ] Touch targets are 44x44pt minimum
- [ ] All interactive elements have focus states
- [ ] Page is navigable via keyboard alone
- [ ] Screen reader announces content logically
- [ ] Forms have associated labels
- [ ] Error messages are announced
- [ ] Reduced motion is respected
- [ ] Images have appropriate alt text
- [ ] Heading hierarchy is logical
