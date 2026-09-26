# Skills Usage Examples for PrayerApp

## Example 1: Building a Prayer Card Component (fd-eng-skill)

### Request:
"Create a React component for displaying prayer cards with TypeScript, including loading states and error handling"

### How fd-eng-skill Would Respond:

```typescript
// components/PrayerCard.tsx
import React, { useState, useEffect } from 'react';
import { Prayer } from '@/types/prayer';
import { formatDistanceToNow } from 'date-fns';

interface PrayerCardProps {
  prayerId: string;
  onUpdate?: (prayer: Prayer) => void;
  onDelete?: (id: string) => void;
}

interface PrayerCardState {
  prayer: Prayer | null;
  isLoading: boolean;
  error: Error | null;
}

export const PrayerCard: React.FC<PrayerCardProps> = ({
  prayerId,
  onUpdate,
  onDelete
}) => {
  const [state, setState] = useState<PrayerCardState>({
    prayer: null,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    fetchPrayer();
  }, [prayerId]);

  const fetchPrayer = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const response = await fetch(`/api/prayers/${prayerId}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch prayer: ${response.statusText}`);
      }

      const data = await response.json();
      setState({ prayer: data, isLoading: false, error: null });
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err : new Error('Unknown error')
      }));
    }
  };

  if (state.isLoading) {
    return (
      <div className="prayer-card prayer-card--loading" role="status">
        <div className="skeleton-loader" aria-label="Loading prayer..." />
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="prayer-card prayer-card--error" role="alert">
        <p className="error-message">Unable to load prayer</p>
        <button onClick={fetchPrayer} className="retry-button">
          Try Again
        </button>
      </div>
    );
  }

  if (!state.prayer) {
    return null;
  }

  const { title, content, author, createdAt, answered } = state.prayer;

  return (
    <article className="prayer-card" aria-label={`Prayer: ${title}`}>
      <header className="prayer-card__header">
        <h3 className="prayer-card__title">{title}</h3>
        {answered && (
          <span className="prayer-card__badge" aria-label="Prayer answered">
            Answered
          </span>
        )}
      </header>

      <div className="prayer-card__content">
        <p>{content}</p>
      </div>

      <footer className="prayer-card__footer">
        <span className="prayer-card__author">By {author}</span>
        <time className="prayer-card__time" dateTime={createdAt}>
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </time>
      </footer>

      {(onUpdate || onDelete) && (
        <div className="prayer-card__actions">
          {onUpdate && (
            <button
              onClick={() => onUpdate(state.prayer!)}
              aria-label={`Edit prayer: ${title}`}
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(prayerId)}
              aria-label={`Delete prayer: ${title}`}
            >
              Delete
            </button>
          )}
        </div>
      )}
    </article>
  );
};

// Usage Example:
// <PrayerCard
//   prayerId="123"
//   onUpdate={handleUpdate}
//   onDelete={handleDelete}
// />
```

**Key Features from fd-eng-skill:**
- ✅ TypeScript with proper typing
- ✅ Error boundary and loading states
- ✅ Accessibility attributes (ARIA labels, roles)
- ✅ Proper React patterns (hooks, effects)
- ✅ Edge case handling
- ✅ Clean component structure

---

## Example 2: Designing a Meditation Timer Interface (frontend-design-pro)

### Request:
"Design a beautiful meditation timer interface with calming aesthetics and smooth animations"

### How frontend-design-pro Would Respond:

```css
/* Meditation Timer Design System */
:root {
  /* Calming Color Palette - Inspired by nature */
  --meditation-primary: #6B8EAD;     /* Soft sky blue */
  --meditation-secondary: #87A96B;    /* Sage green */
  --meditation-accent: #D4A574;       /* Warm sand */
  --meditation-background: #F5F5F0;   /* Off-white */
  --meditation-surface: #FFFFFF;      /* Pure white */
  --meditation-text: #2C3E50;         /* Deep charcoal */
  --meditation-text-muted: #7F8C8D;   /* Muted gray */

  /* Spacing System - Breathing room */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2.5rem;
  --space-xl: 4rem;

  /* Typography - Calm and readable */
  --font-meditation: 'Tenor Sans', 'Georgia', serif;
  --font-ui: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  /* Animation Curves - Natural movement */
  --ease-breathe: cubic-bezier(0.4, 0.0, 0.2, 1);
  --duration-calm: 800ms;
  --duration-slow: 1200ms;
}

/* Meditation Timer Component */
.meditation-timer {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg,
    var(--meditation-background) 0%,
    color-mix(in srgb, var(--meditation-primary) 10%, white) 100%);
  padding: var(--space-lg);
}

/* Timer Circle - The focal point */
.timer-circle {
  position: relative;
  width: 280px;
  height: 280px;
  margin: var(--space-xl) auto;
}

.timer-circle__ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    var(--meditation-primary) var(--progress, 0%),
    transparent var(--progress, 0%)
  );
  mask: radial-gradient(
    circle at center,
    transparent 65%,
    black 65%
  );
  animation: rotateGentle 60s linear infinite;
}

.timer-circle__inner {
  position: absolute;
  inset: 20px;
  border-radius: 50%;
  background: var(--meditation-surface);
  box-shadow:
    0 10px 40px rgba(107, 142, 173, 0.1),
    inset 0 2px 10px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Timer Display */
.timer-display {
  font-family: var(--font-meditation);
  font-size: 3.5rem;
  font-weight: 300;
  color: var(--meditation-text);
  letter-spacing: 0.05em;
  animation: breatheText var(--duration-slow) ease-in-out infinite;
}

.timer-label {
  font-family: var(--font-ui);
  font-size: 0.875rem;
  color: var(--meditation-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: var(--space-xs);
}

/* Control Buttons - Minimal and intuitive */
.meditation-controls {
  display: flex;
  gap: var(--space-md);
  margin-top: var(--space-xl);
}

.meditation-button {
  position: relative;
  padding: var(--space-sm) var(--space-lg);
  border: none;
  border-radius: 50px;
  background: var(--meditation-surface);
  color: var(--meditation-text);
  font-family: var(--font-ui);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--duration-calm) var(--ease-breathe);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.meditation-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: var(--meditation-primary);
  opacity: 0.2;
  transform: translate(-50%, -50%);
  transition: width var(--duration-calm), height var(--duration-calm);
}

.meditation-button:hover::before {
  width: 200px;
  height: 200px;
}

.meditation-button--primary {
  background: var(--meditation-primary);
  color: white;
}

.meditation-button--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 30px rgba(107, 142, 173, 0.3);
}

/* Breathing Guide Animation */
.breathing-guide {
  position: absolute;
  top: -60px;
  width: 100%;
  text-align: center;
}

.breathing-text {
  font-family: var(--font-meditation);
  font-size: 1.125rem;
  color: var(--meditation-primary);
  opacity: 0;
  animation: fadeInOut 8s ease-in-out infinite;
}

.breathing-text--inhale {
  animation-delay: 0s;
}

.breathing-text--hold {
  animation-delay: 4s;
}

.breathing-text--exhale {
  animation-delay: 6s;
}

/* Animations */
@keyframes breatheText {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(0.98); }
}

@keyframes rotateGentle {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0; }
  10%, 25% { opacity: 1; }
  35% { opacity: 0; }
}

/* Sound Wave Visualizer */
.sound-waves {
  position: fixed;
  bottom: var(--space-xl);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
  height: 40px;
  align-items: flex-end;
}

.sound-wave {
  width: 3px;
  background: var(--meditation-primary);
  opacity: 0.3;
  border-radius: 3px;
  animation: wave 1.5s ease-in-out infinite;
}

.sound-wave:nth-child(1) { animation-delay: 0s; height: 20%; }
.sound-wave:nth-child(2) { animation-delay: 0.1s; height: 40%; }
.sound-wave:nth-child(3) { animation-delay: 0.2s; height: 60%; }
.sound-wave:nth-child(4) { animation-delay: 0.3s; height: 40%; }
.sound-wave:nth-child(5) { animation-delay: 0.4s; height: 20%; }

@keyframes wave {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(1.8); }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  :root {
    --meditation-background: #1a1f2e;
    --meditation-surface: #242938;
    --meditation-text: #e0e6ed;
    --meditation-text-muted: #8892a0;
  }

  .timer-circle__inner {
    box-shadow:
      0 10px 40px rgba(0, 0, 0, 0.3),
      inset 0 2px 10px rgba(255, 255, 255, 0.02);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .timer-circle {
    width: 220px;
    height: 220px;
  }

  .timer-display {
    font-size: 2.5rem;
  }

  .meditation-controls {
    flex-direction: column;
    width: 100%;
    max-width: 200px;
  }

  .meditation-button {
    width: 100%;
  }
}
```

**Key Design Features from frontend-design-pro:**
- 🎨 Calming, nature-inspired color palette
- ✨ Smooth, breathing-like animations
- 📐 8px grid system alignment
- 🌓 Dark mode support
- 📱 Mobile-responsive design
- ♿ WCAG AA compliant contrast ratios
- 🎭 Subtle depth through shadows
- 🌊 Sound wave visualizer for ambiance

---

## Example 3: Combined Usage - Prayer Journal with Beautiful UI

### Request:
"Build a prayer journal component with excellent architecture and stunning visual design"

### Both Skills Working Together:

**fd-eng-skill provides the architecture:**

```typescript
// components/PrayerJournal/PrayerJournal.tsx
import React, { useReducer, useCallback, useEffect } from 'react';
import { JournalEntry, JournalState } from '@/types/journal';
import { useDebounce } from '@/hooks/useDebounce';
import { journalReducer, JournalActions } from './journalReducer';
import { JournalEditor } from './JournalEditor';
import { JournalList } from './JournalList';
import { JournalSearch } from './JournalSearch';
import './PrayerJournal.css';

const initialState: JournalState = {
  entries: [],
  filteredEntries: [],
  searchTerm: '',
  selectedEntry: null,
  isLoading: false,
  error: null,
  view: 'list'
};

export const PrayerJournal: React.FC = () => {
  const [state, dispatch] = useReducer(journalReducer, initialState);
  const debouncedSearch = useDebounce(state.searchTerm, 300);

  // Load entries on mount
  useEffect(() => {
    loadEntries();
  }, []);

  // Filter entries when search changes
  useEffect(() => {
    dispatch({
      type: JournalActions.FILTER_ENTRIES,
      payload: debouncedSearch
    });
  }, [debouncedSearch]);

  const loadEntries = async () => {
    dispatch({ type: JournalActions.SET_LOADING, payload: true });
    try {
      const response = await fetch('/api/journal/entries');
      const data = await response.json();
      dispatch({ type: JournalActions.SET_ENTRIES, payload: data });
    } catch (error) {
      dispatch({
        type: JournalActions.SET_ERROR,
        payload: 'Failed to load journal entries'
      });
    }
  };

  const handleSaveEntry = useCallback(async (entry: JournalEntry) => {
    try {
      const response = await fetch('/api/journal/entries', {
        method: entry.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      });

      if (!response.ok) throw new Error('Failed to save');

      const savedEntry = await response.json();
      dispatch({
        type: entry.id ? JournalActions.UPDATE_ENTRY : JournalActions.ADD_ENTRY,
        payload: savedEntry
      });
      dispatch({ type: JournalActions.SET_VIEW, payload: 'list' });
    } catch (error) {
      dispatch({
        type: JournalActions.SET_ERROR,
        payload: 'Failed to save entry'
      });
    }
  }, []);

  return (
    <div className="prayer-journal">
      <header className="prayer-journal__header">
        <h1 className="prayer-journal__title">My Prayer Journal</h1>
        <JournalSearch
          value={state.searchTerm}
          onChange={(term) => dispatch({
            type: JournalActions.SET_SEARCH,
            payload: term
          })}
        />
      </header>

      <main className="prayer-journal__content">
        {state.view === 'list' ? (
          <JournalList
            entries={state.filteredEntries}
            onSelect={(entry) => dispatch({
              type: JournalActions.SELECT_ENTRY,
              payload: entry
            })}
            onNewEntry={() => dispatch({
              type: JournalActions.SET_VIEW,
              payload: 'editor'
            })}
          />
        ) : (
          <JournalEditor
            entry={state.selectedEntry}
            onSave={handleSaveEntry}
            onCancel={() => dispatch({
              type: JournalActions.SET_VIEW,
              payload: 'list'
            })}
          />
        )}
      </main>
    </div>
  );
};
```

**frontend-design-pro provides the visual design:**

```css
/* Prayer Journal - Elegant Spiritual Design */
.prayer-journal {
  --journal-ink: #2C3E50;
  --journal-paper: #FDFBF7;
  --journal-accent: #8B7355;
  --journal-highlight: #D4AF37;
  --journal-shadow: rgba(44, 62, 80, 0.1);

  min-height: 100vh;
  background: linear-gradient(
    to bottom,
    var(--journal-paper),
    color-mix(in srgb, var(--journal-accent) 5%, var(--journal-paper))
  );
  font-family: 'Crimson Text', 'Georgia', serif;
}

/* Header with elegant typography */
.prayer-journal__header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 2rem 3rem;
  background: var(--journal-paper);
  border-bottom: 1px solid color-mix(in srgb, var(--journal-accent) 20%, transparent);
  backdrop-filter: blur(10px);
}

.prayer-journal__title {
  font-size: 2.5rem;
  font-weight: 300;
  color: var(--journal-ink);
  letter-spacing: -0.02em;
  margin-bottom: 1.5rem;
  position: relative;
}

.prayer-journal__title::after {
  content: '✦';
  position: absolute;
  right: -2rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--journal-highlight);
  font-size: 1rem;
  animation: shimmer 3s ease-in-out infinite;
}

/* Journal entries with paper texture */
.journal-entry {
  margin: 1.5rem auto;
  max-width: 700px;
  padding: 2rem;
  background:
    linear-gradient(
      to right,
      transparent 2.5rem,
      var(--journal-paper) 2.5rem
    ),
    repeating-linear-gradient(
      to bottom,
      transparent,
      transparent 1.5rem,
      color-mix(in srgb, var(--journal-accent) 10%, transparent) 1.5rem,
      color-mix(in srgb, var(--journal-accent) 10%, transparent) calc(1.5rem + 1px)
    );
  position: relative;
  box-shadow:
    0 4px 20px var(--journal-shadow),
    inset 3rem 0 0 0 color-mix(in srgb, red 30%, var(--journal-paper));
  border-radius: 4px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.journal-entry:hover {
  transform: translateY(-2px);
  box-shadow:
    0 6px 30px var(--journal-shadow),
    inset 3rem 0 0 0 color-mix(in srgb, red 30%, var(--journal-paper));
}

/* Beautiful date stamps */
.journal-entry__date {
  position: absolute;
  left: -1rem;
  top: 2rem;
  transform: rotate(-90deg);
  transform-origin: center;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--journal-accent);
}

/* Illuminated first letter */
.journal-entry__content p:first-child::first-letter {
  float: left;
  font-size: 4rem;
  line-height: 1;
  font-weight: 700;
  margin-right: 0.5rem;
  color: var(--journal-highlight);
  text-shadow:
    1px 1px 0 var(--journal-accent),
    2px 2px 4px var(--journal-shadow);
}

@keyframes shimmer {
  0%, 100% { opacity: 0.5; transform: translateY(-50%) scale(1); }
  50% { opacity: 1; transform: translateY(-50%) scale(1.2); }
}
```

**Result:** A prayer journal that combines solid engineering practices with beautiful, thoughtful design that creates a spiritual, contemplative experience.

---

## Tips for Effective Skill Usage

1. **Be Specific**: The more specific your request, the better the skill output
2. **Mention Constraints**: Include performance, accessibility, or browser requirements
3. **Provide Context**: Share existing code patterns or design systems
4. **Iterate**: Use the skills iteratively to refine outputs
5. **Combine Skills**: Use both together for complete solutions

## Common Patterns

### Pattern 1: Component Development Flow
1. Use fd-eng-skill to architect the component
2. Use frontend-design-pro to style it beautifully
3. Use fd-eng-skill to add tests
4. Use frontend-design-pro to add micro-interactions

### Pattern 2: Page Design Flow
1. Use frontend-design-pro to create the visual concept
2. Use fd-eng-skill to implement with proper structure
3. Use fd-eng-skill to optimize performance
4. Use frontend-design-pro to polish animations

### Pattern 3: Refactoring Flow
1. Use fd-eng-skill to analyze current architecture
2. Use fd-eng-skill to refactor for better patterns
3. Use frontend-design-pro to modernize the UI
4. Use fd-eng-skill to ensure backwards compatibility

---

These examples demonstrate how the skills enhance Claude Code's capabilities with specialized frontend engineering and design expertise, perfect for building a professional PrayerApp experience.