# Motion Patterns

Animation and motion guidelines combining Apple HIG and Material Design principles.

## Core Motion Principles

### Material Design Motion

| Principle | Description |
|-----------|-------------|
| **Informative** | Motion clarifies relationships between elements, indicates available actions, illustrates results |
| **Focused** | Directs attention to key elements without introducing distractions |
| **Expressive** | Celebrates key moments, adds personality, reflects brand style |

### Apple HIG Motion

| Principle | Description |
|-----------|-------------|
| **Subtle** | Animations should be smooth and not distracting |
| **Purposeful** | Every animation should have a reason |
| **Continuity** | Maintain connection between interface states |
| **Feedback** | Provide clear response to user actions |

## Animation Categories

### 1. Micro-interactions
Small feedback animations for user actions.

```css
/* Button hover */
.button {
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

/* Button press */
.button:active {
  transform: translateY(0);
  transition-duration: 0.05s;
}
```

### 2. State Transitions
Changes between UI states (loading, success, error).

```css
/* Fade transition */
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  opacity: 1;
  transition: opacity 0.2s ease;
}
```

### 3. Page Transitions
Navigation between views/pages.

```css
/* Slide in from right */
.page-enter {
  transform: translateX(100%);
}
.page-enter-active {
  transform: translateX(0);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 4. Orchestrated Reveals
Staggered animations for page load or content appearance.

```css
/* Staggered fade-up */
.stagger-item {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.5s ease forwards;
}

.stagger-item:nth-child(1) { animation-delay: 0.1s; }
.stagger-item:nth-child(2) { animation-delay: 0.2s; }
.stagger-item:nth-child(3) { animation-delay: 0.3s; }

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## Timing & Easing

### Duration Guidelines

| Animation Type | Duration |
|----------------|----------|
| Micro-interactions | 100-200ms |
| Simple transitions | 200-300ms |
| Complex transitions | 300-500ms |
| Page transitions | 300-400ms |
| Orchestrated sequences | 500-1000ms total |

### Easing Functions

| Easing | CSS Value | Use Case |
|--------|-----------|----------|
| **Standard** | `cubic-bezier(0.4, 0, 0.2, 1)` | Most transitions |
| **Decelerate** | `cubic-bezier(0, 0, 0.2, 1)` | Enter/appear |
| **Accelerate** | `cubic-bezier(0.4, 0, 1, 1)` | Exit/disappear |
| **Sharp** | `cubic-bezier(0.4, 0, 0.6, 1)` | Quick responses |

### CSS Preset Easings
```css
:root {
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-decelerate: cubic-bezier(0, 0, 0.2, 1);
  --ease-accelerate: cubic-bezier(0.4, 0, 1, 1);
  --ease-sharp: cubic-bezier(0.4, 0, 0.6, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

## Material Design Specific

### Touch Feedback (Ripple)
```css
.ripple {
  position: relative;
  overflow: hidden;
}

.ripple::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  transform: scale(0);
  animation: ripple 0.6s linear;
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
```

### Elevation Transitions
```css
.card {
  transition: box-shadow 0.2s var(--ease-standard);
}
.card:hover {
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}
```

## Apple HIG Specific

### Fluid Motion
- Use spring-based animations where possible
- Respect reduced motion preferences
- Maintain 60fps performance

### Circular Reveal
```css
@keyframes circularReveal {
  from {
    clip-path: circle(0% at center);
  }
  to {
    clip-path: circle(100% at center);
  }
}
```

## Scroll-Triggered Animations

### Intersection Observer Pattern
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});
```

## Accessibility: Reduced Motion

Always respect user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Performance Guidelines

### GPU-Accelerated Properties
Prefer transforms and opacity:
- `transform` (translate, scale, rotate)
- `opacity`

Avoid animating:
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`

### Will-Change Hint
```css
.will-animate {
  will-change: transform, opacity;
}
```

## Libraries & Tools

| Platform | Library |
|----------|---------|
| React | Framer Motion, React Spring |
| Vue | Vue Transitions, Motion One |
| Vanilla | GSAP, Anime.js, Motion One |
| CSS-only | CSS Transitions, @keyframes |
