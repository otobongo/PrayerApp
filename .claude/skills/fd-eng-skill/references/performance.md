# Performance Optimization

## Core Web Vitals

| Metric | Target | Measures |
|--------|--------|----------|
| LCP (Largest Contentful Paint) | < 2.5s | Loading performance |
| INP (Interaction to Next Paint) | < 200ms | Responsiveness |
| CLS (Cumulative Layout Shift) | < 0.1 | Visual stability |

---

## Loading Performance

### Code Splitting

```tsx
// Route-level (automatic with Next.js/Remix)
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Component-level
const HeavyComponent = lazy(() => 
  import('./components/HeavyComponent')
);

// Named export
const Chart = lazy(() => 
  import('./components/Charts').then(m => ({ default: m.Chart }))
);

// Preload on hover/focus
const preloadDashboard = () => import('./pages/Dashboard');

<Link 
  to="/dashboard" 
  onMouseEnter={preloadDashboard}
  onFocus={preloadDashboard}
>
  Dashboard
</Link>
```

### Resource Hints

```html
<!-- Preconnect to origins -->
<link rel="preconnect" href="https://api.example.com" />
<link rel="preconnect" href="https://fonts.googleapis.com" />

<!-- Prefetch likely navigation -->
<link rel="prefetch" href="/dashboard" />

<!-- Preload critical resources -->
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/hero.webp" as="image" />
```

### Image Optimization

```tsx
// Next.js Image
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority  // Above fold
  placeholder="blur"
  blurDataURL={blurUrl}
/>

// Lazy loading (native)
<img src="photo.jpg" alt="Photo" loading="lazy" decoding="async" />

// Responsive images
<picture>
  <source srcset="hero.avif" type="image/avif" />
  <source srcset="hero.webp" type="image/webp" />
  <img src="hero.jpg" alt="Hero" />
</picture>
```

---

## Runtime Performance

### React Optimization

```tsx
// Memoize components
const ExpensiveList = memo(function ExpensiveList({ items }: Props) {
  return items.map(item => <Item key={item.id} item={item} />);
});

// Memoize callbacks (stable references)
const handleClick = useCallback((id: string) => {
  setSelected(id);
}, []);

// Memoize computed values
const sortedItems = useMemo(() => 
  [...items].sort((a, b) => a.name.localeCompare(b.name)),
  [items]
);

// Avoid inline objects in JSX
// Bad: creates new object every render
<Component style={{ color: 'red' }} />

// Good: stable reference
const style = useMemo(() => ({ color: 'red' }), []);
<Component style={style} />
```

### List Virtualization

```tsx
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualList({ items }: { items: Item[] }) {
  const parentRef = useRef<HTMLDivElement>(null);
  
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });

  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      <div style={{ height: `${virtualizer.getTotalSize()}px`, position: 'relative' }}>
        {virtualizer.getVirtualItems().map(virtualItem => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              transform: `translateY(${virtualItem.start}px)`,
              height: `${virtualItem.size}px`,
            }}
          >
            {items[virtualItem.index].name}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Debounce & Throttle

```ts
// Debounce: wait until user stops
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debounced;
}

// Throttle: limit frequency
function useThrottle<T>(value: T, interval: number): T {
  const [throttled, setThrottled] = useState(value);
  const lastUpdated = useRef(Date.now());
  
  useEffect(() => {
    const now = Date.now();
    if (now >= lastUpdated.current + interval) {
      lastUpdated.current = now;
      setThrottled(value);
    } else {
      const timer = setTimeout(() => {
        lastUpdated.current = Date.now();
        setThrottled(value);
      }, interval - (now - lastUpdated.current));
      return () => clearTimeout(timer);
    }
  }, [value, interval]);
  
  return throttled;
}
```

---

## Bundle Optimization

### Tree Shaking

```ts
// Bad: imports entire library
import _ from 'lodash';
_.debounce(fn, 300);

// Good: imports only needed function
import debounce from 'lodash/debounce';
debounce(fn, 300);

// Better: use native or smaller alternatives
const debounce = (fn: Function, ms: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
};
```

### Analyzing Bundle

```bash
# Next.js
ANALYZE=true npm run build

# Vite
npx vite-bundle-visualizer

# General
npx source-map-explorer dist/**/*.js
```

### Dynamic Imports

```ts
// Load heavy libraries on demand
async function exportToPDF() {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF();
  // ...
}
```

---

## Caching Strategies

### HTTP Caching

```ts
// Next.js API route
export async function GET() {
  return Response.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}
```

| Strategy | Header | Use Case |
|----------|--------|----------|
| No cache | `no-store` | Sensitive data |
| Revalidate | `max-age=0, must-revalidate` | Fresh data needed |
| Stale-while-revalidate | `s-maxage=60, stale-while-revalidate=300` | Balance freshness/speed |
| Long-term | `max-age=31536000, immutable` | Static assets with hashes |

### Service Worker

```ts
// Basic caching strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).then((response) => {
        const clone = response.clone();
        caches.open('v1').then((cache) => cache.put(event.request, clone));
        return response;
      });
    })
  );
});
```

---

## Measurement

### Performance API

```ts
// Measure custom operations
performance.mark('fetch-start');
await fetchData();
performance.mark('fetch-end');
performance.measure('data-fetch', 'fetch-start', 'fetch-end');

// Get measurement
const [measure] = performance.getEntriesByName('data-fetch');
console.log(`Fetch took ${measure.duration}ms`);
```

### Web Vitals

```ts
import { onLCP, onINP, onCLS } from 'web-vitals';

onLCP(console.log);
onINP(console.log);
onCLS(console.log);

// Send to analytics
function sendToAnalytics(metric: Metric) {
  fetch('/api/vitals', {
    method: 'POST',
    body: JSON.stringify(metric),
  });
}

onLCP(sendToAnalytics);
```

### React Profiler

```tsx
<Profiler id="UserList" onRender={onRenderCallback}>
  <UserList users={users} />
</Profiler>

function onRenderCallback(
  id: string,
  phase: 'mount' | 'update',
  actualDuration: number
) {
  console.log(`${id} ${phase}: ${actualDuration}ms`);
}
```
