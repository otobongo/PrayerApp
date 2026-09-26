# Framework Patterns Reference

## React

### Component Patterns

**Functional Components (Standard)**
```tsx
interface Props {
  title: string;
  onAction?: () => void;
}

export function Component({ title, onAction }: Props) {
  return <div onClick={onAction}>{title}</div>;
}
```

**Compound Components**
```tsx
const Card = ({ children }: { children: React.ReactNode }) => <div className="card">{children}</div>;
Card.Header = ({ children }: { children: React.ReactNode }) => <header>{children}</header>;
Card.Body = ({ children }: { children: React.ReactNode }) => <main>{children}</main>;
```

### State Management

| Scale | Solution |
|-------|----------|
| Component | `useState`, `useReducer` |
| Shared (small) | Context + `useReducer` |
| Shared (medium) | Zustand, Jotai |
| Complex/large | Redux Toolkit, TanStack Query |

### Data Fetching

Prefer TanStack Query for server state:
```tsx
const { data, isLoading, error } = useQuery({
  queryKey: ['users', userId],
  queryFn: () => fetchUser(userId),
});
```

---

## Vue 3

### Composition API (Preferred)

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';

const count = ref(0);
const doubled = computed(() => count.value * 2);
</script>

<template>
  <button @click="count++">{{ doubled }}</button>
</template>
```

### State Management

| Scale | Solution |
|-------|----------|
| Component | `ref`, `reactive` |
| Shared | Pinia (official) |
| Server state | TanStack Query Vue |

### Composables Pattern

```ts
// useCounter.ts
export function useCounter(initial = 0) {
  const count = ref(initial);
  const increment = () => count.value++;
  return { count, increment };
}
```

---

## Next.js

### App Router (v13+)

**Server Components (default)**
```tsx
// app/users/page.tsx
async function UsersPage() {
  const users = await db.users.findMany(); // Direct DB access
  return <UserList users={users} />;
}
```

**Client Components**
```tsx
'use client';
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### Data Patterns

| Pattern | Use Case |
|---------|----------|
| Server Component fetch | Static/SSG data |
| `fetch` with revalidate | ISR |
| Route Handlers | API endpoints |
| Server Actions | Form mutations |

---

## Svelte 5 (Runes)

### Reactive State

```svelte
<script lang="ts">
  let count = $state(0);
  let doubled = $derived(count * 2);
  
  $effect(() => {
    console.log('Count changed:', count);
  });
</script>

<button onclick={() => count++}>{doubled}</button>
```

### Props

```svelte
<script lang="ts">
  interface Props {
    title: string;
    onSave?: () => void;
  }
  
  let { title, onSave }: Props = $props();
</script>
```

---

## Angular

### Standalone Components (v14+)

```ts
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  template: `<div>{{ user().name }}</div>`,
})
export class UserComponent {
  user = input.required<User>();
}
```

### Signals (v16+)

```ts
count = signal(0);
doubled = computed(() => this.count() * 2);

increment() {
  this.count.update(c => c + 1);
}
```

---

## Astro

### Component Islands

```astro
---
// Static by default
import Counter from './Counter.tsx';
const title = "My Page";
---

<h1>{title}</h1>
<Counter client:visible /> <!-- Hydrates on visibility -->
```

### Client Directives

| Directive | Behavior |
|-----------|----------|
| `client:load` | Hydrate on page load |
| `client:visible` | Hydrate when visible |
| `client:idle` | Hydrate on idle |
| `client:only="react"` | Skip SSR, client only |

---

## Solid.js

### Reactive Primitives

```tsx
import { createSignal, createEffect } from 'solid-js';

function Counter() {
  const [count, setCount] = createSignal(0);
  
  createEffect(() => {
    console.log('Count:', count());
  });
  
  return <button onClick={() => setCount(c => c + 1)}>{count()}</button>;
}
```

---

## Framework Selection Guide

| Requirement | Recommendation |
|-------------|----------------|
| SEO + Performance | Next.js, Astro, Nuxt |
| Interactive SPA | React, Vue, Solid |
| Content-heavy sites | Astro, Next.js |
| Enterprise/large team | Angular, Next.js |
| Maximum performance | Solid, Svelte, Qwik |
| Gradual adoption | Astro (islands), Vue |
