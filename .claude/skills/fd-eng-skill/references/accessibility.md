# Accessibility Reference

## WCAG Levels

| Level | Description |
|-------|-------------|
| A | Minimum accessibility |
| AA | Standard target (legal requirement in many jurisdictions) |
| AAA | Enhanced accessibility |

---

## Semantic HTML

### Document Structure

```html
<header>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Page Title</h1>
    <section aria-labelledby="section-heading">
      <h2 id="section-heading">Section Title</h2>
      <p>Content...</p>
    </section>
  </article>
</main>

<aside aria-label="Related content">
  <!-- Sidebar -->
</aside>

<footer>
  <!-- Footer content -->
</footer>
```

### Heading Hierarchy

```html
<!-- Correct: Sequential levels -->
<h1>Main Title</h1>
  <h2>Section</h2>
    <h3>Subsection</h3>
  <h2>Another Section</h2>

<!-- Wrong: Skipped levels -->
<h1>Main Title</h1>
  <h3>Subsection</h3>  <!-- Skipped h2 -->
```

---

## Interactive Elements

### Buttons

```tsx
// Good: Native button
<button onClick={handleClick}>Submit</button>

// Good: Button with icon needs label
<button aria-label="Close dialog" onClick={onClose}>
  <CloseIcon aria-hidden="true" />
</button>

// Bad: Div as button (don't do this)
<div onClick={handleClick}>Submit</div>

// If you must use non-button, add all attributes:
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  Submit
</div>
```

### Links

```tsx
// Good: Descriptive link text
<a href="/pricing">View pricing plans</a>

// Bad: Non-descriptive
<a href="/pricing">Click here</a>

// Good: External link indication
<a href="https://external.com" target="_blank" rel="noopener noreferrer">
  External site
  <span className="sr-only">(opens in new tab)</span>
</a>
```

### Forms

```tsx
<form>
  {/* Explicit label association */}
  <label htmlFor="email">Email address</label>
  <input 
    id="email" 
    type="email" 
    aria-describedby="email-hint email-error"
    aria-invalid={!!error}
    required 
  />
  <p id="email-hint">We'll never share your email</p>
  {error && <p id="email-error" role="alert">{error}</p>}

  {/* Required field indication */}
  <label htmlFor="name">
    Name <span aria-hidden="true">*</span>
    <span className="sr-only">(required)</span>
  </label>
  <input id="name" required aria-required="true" />

  {/* Group related inputs */}
  <fieldset>
    <legend>Shipping Address</legend>
    {/* Address fields */}
  </fieldset>
</form>
```

---

## ARIA Patterns

### Live Regions

```tsx
// Announce dynamic content
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>

// Urgent announcements
<div role="alert">
  {errorMessage}
</div>

// Status updates (less intrusive)
<div role="status">
  {loadingMessage}
</div>
```

### Modal Dialog

```tsx
function Modal({ isOpen, onClose, title, children }) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.focus();
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="dialog-title">{title}</h2>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
```

### Tabs

```tsx
function Tabs({ tabs }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleKeyDown = (e: KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      setActiveIndex((index + 1) % tabs.length);
    } else if (e.key === 'ArrowLeft') {
      setActiveIndex((index - 1 + tabs.length) % tabs.length);
    }
  };

  return (
    <div>
      <div role="tablist">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={index === activeIndex}
            aria-controls={`panel-${tab.id}`}
            tabIndex={index === activeIndex ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={index !== activeIndex}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
```

---

## Focus Management

### Skip Links

```tsx
// First element in body
<a href="#main-content" className="skip-link">
  Skip to main content
</a>

// CSS
.skip-link {
  position: absolute;
  left: -9999px;
}
.skip-link:focus {
  left: 0;
  z-index: 9999;
}
```

### Focus Trap (Modal)

```tsx
function useFocusTrap(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const focusable = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0] as HTMLElement;
    const last = focusable[focusable.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    return () => element.removeEventListener('keydown', handleKeyDown);
  }, [ref]);
}
```

### Focus Visible

```css
/* Only show focus ring for keyboard navigation */
:focus {
  outline: none;
}

:focus-visible {
  outline: 2px solid var(--focus-color);
  outline-offset: 2px;
}
```

---

## Color & Contrast

### Contrast Ratios

| Text Size | AA | AAA |
|-----------|-----|-----|
| Normal (< 18px) | 4.5:1 | 7:1 |
| Large (≥ 18px or 14px bold) | 3:1 | 4.5:1 |
| UI Components | 3:1 | - |

### Don't Rely on Color Alone

```tsx
// Bad: Color only indicates error
<input style={{ borderColor: error ? 'red' : 'gray' }} />

// Good: Color + icon + text
<input 
  style={{ borderColor: error ? 'red' : 'gray' }}
  aria-invalid={!!error}
  aria-describedby="error-message"
/>
{error && (
  <p id="error-message" role="alert">
    <ErrorIcon aria-hidden="true" /> {error}
  </p>
)}
```

---

## Screen Reader Utilities

```css
/* Visually hidden but accessible */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Visible on focus (skip links) */
.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

---

## Testing

### Automated

```bash
# axe-core (via Testing Library)
npm install @axe-core/react

# Lighthouse
npx lighthouse https://example.com --only-categories=accessibility

# eslint-plugin-jsx-a11y
npm install eslint-plugin-jsx-a11y
```

### Manual Testing

1. **Keyboard**: Navigate entire site using only keyboard
2. **Screen reader**: Test with NVDA (Windows), VoiceOver (Mac), or JAWS
3. **Zoom**: Test at 200% and 400% zoom
4. **Color**: Use grayscale filter to check color dependence
5. **Motion**: Test with reduced motion preference

### Testing Library

```tsx
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('has no accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```
