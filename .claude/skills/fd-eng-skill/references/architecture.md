# Frontend Architecture Patterns

## Component Architecture

### Atomic Design

```
atoms/        - Basic elements (Button, Input, Icon)
molecules/    - Simple combinations (SearchInput, FormField)
organisms/    - Complex sections (Header, ProductCard)
templates/    - Page layouts (DashboardLayout, AuthLayout)
pages/        - Full pages (HomePage, ProfilePage)
```

### Feature-Based Structure

```
features/
├── auth/
│   ├── components/
│   ├── hooks/
│   ├── api/
│   ├── store/
│   └── index.ts       # Public exports
├── users/
│   ├── components/
│   ├── hooks/
│   ├── api/
│   └── index.ts
└── shared/
    ├── components/
    ├── hooks/
    └── utils/
```

### Colocation Principle

Keep related code together:
```
UserProfile/
├── UserProfile.tsx
├── UserProfile.test.tsx
├── UserProfile.module.css
├── useUserProfile.ts
└── index.ts
```

---

## Component Patterns

### Container/Presentational

```tsx
// Container: handles logic
function UserListContainer() {
  const { data, isLoading } = useUsers();
  return <UserList users={data ?? []} loading={isLoading} />;
}

// Presentational: handles display
function UserList({ users, loading }: Props) {
  if (loading) return <Skeleton />;
  return <ul>{users.map(u => <UserItem key={u.id} user={u} />)}</ul>;
}
```

### Compound Components

```tsx
function Tabs({ children, defaultValue }: TabsProps) {
  const [active, setActive] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      {children}
    </TabsContext.Provider>
  );
}

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;

// Usage
<Tabs defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Content 1</Tabs.Content>
  <Tabs.Content value="tab2">Content 2</Tabs.Content>
</Tabs>
```

### Render Props

```tsx
function DataFetcher<T>({ url, children }: Props<T>) {
  const { data, loading, error } = useFetch<T>(url);
  return children({ data, loading, error });
}

// Usage
<DataFetcher url="/api/users">
  {({ data, loading }) => loading ? <Spinner /> : <UserList users={data} />}
</DataFetcher>
```

### Headless Components

```tsx
function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = () => setOn(v => !v);
  const handlers = {
    onClick: toggle,
    'aria-pressed': on,
  };
  return { on, toggle, handlers };
}

// Usage: bring your own UI
function CustomSwitch() {
  const { on, handlers } = useToggle();
  return <button {...handlers}>{on ? 'ON' : 'OFF'}</button>;
}
```

---

## State Architecture

### State Categories

| Type | Location | Examples |
|------|----------|----------|
| UI State | Component/Context | Modals, tabs, form inputs |
| Server State | TanStack Query/SWR | API data, cached responses |
| URL State | Router | Filters, pagination, search |
| Global State | Zustand/Redux | Auth, theme, notifications |

### State Colocation

Start local, elevate when needed:

1. Component state (`useState`)
2. Lifted state (pass to parent)
3. Context (subtree sharing)
4. Global store (app-wide)

### Zustand Store Pattern

```ts
interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (credentials) => {
    const user = await api.auth.login(credentials);
    set({ user, isAuthenticated: true });
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));

// Selectors for performance
const useUser = () => useUserStore(state => state.user);
const useIsAuth = () => useUserStore(state => state.isAuthenticated);
```

---

## Module Boundaries

### Public API Pattern

Each feature exports only its public interface:

```ts
// features/users/index.ts
export { UserList } from './components/UserList';
export { UserProfile } from './components/UserProfile';
export { useUser, useUsers } from './hooks';
export type { User, CreateUserInput } from './types';

// Internal components NOT exported
```

### Dependency Rules

```
pages/ → features/ → shared/
         ↓
       features/ (peer imports via index.ts only)
```

Prevent: `features/auth/` importing from `features/users/internal/`.

---

## Routing Architecture

### Route Organization

```ts
// Flat routes (Next.js App Router style)
app/
├── (auth)/
│   ├── login/page.tsx
│   └── register/page.tsx
├── (dashboard)/
│   ├── layout.tsx
│   ├── page.tsx
│   └── settings/page.tsx
└── api/
    └── users/route.ts
```

### Protected Routes

```tsx
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);
  
  if (isLoading) return <Loading />;
  if (!isAuthenticated) return null;
  
  return <>{children}</>;
}
```

---

## Error Boundaries

### Error Boundary Component

```tsx
class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    logErrorToService(error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <DefaultErrorUI error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

### Granular Boundaries

```tsx
<ErrorBoundary fallback={<AppCrashPage />}>
  <Header />
  <ErrorBoundary fallback={<SidebarError />}>
    <Sidebar />
  </ErrorBoundary>
  <ErrorBoundary fallback={<ContentError />}>
    <MainContent />
  </ErrorBoundary>
</ErrorBoundary>
```

---

## Performance Architecture

### Code Splitting

```tsx
// Route-level splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

// Component-level splitting
const HeavyChart = lazy(() => import('./components/HeavyChart'));

// Usage with Suspense
<Suspense fallback={<Loading />}>
  <Dashboard />
</Suspense>
```

### Render Optimization

```tsx
// Memoize expensive components
const ExpensiveList = memo(function ExpensiveList({ items }: Props) {
  return items.map(item => <ExpensiveItem key={item.id} item={item} />);
});

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// Memoize computed values
const sortedItems = useMemo(() => 
  items.sort((a, b) => a.name.localeCompare(b.name)),
  [items]
);
```
