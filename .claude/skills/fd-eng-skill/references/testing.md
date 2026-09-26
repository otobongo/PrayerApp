# Frontend Testing Strategies

## Testing Pyramid

```
        E2E (few)
       /         \
   Integration (some)
  /                   \
    Unit Tests (many)
```

| Level | Tools | Speed | Confidence |
|-------|-------|-------|------------|
| Unit | Vitest, Jest | Fast | Component logic |
| Integration | Testing Library | Medium | Component interaction |
| E2E | Playwright, Cypress | Slow | Full user flows |
| Visual | Chromatic, Percy | Medium | UI regression |

---

## Unit Testing

### Component Testing (Testing Library)

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Counter } from './Counter';

describe('Counter', () => {
  it('renders initial count', () => {
    render(<Counter initialCount={5} />);
    expect(screen.getByText('Count: 5')).toBeInTheDocument();
  });

  it('increments on click', async () => {
    render(<Counter initialCount={0} />);
    await fireEvent.click(screen.getByRole('button', { name: /increment/i }));
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });
});
```

### Hook Testing

```tsx
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('increments counter', () => {
    const { result } = renderHook(() => useCounter(0));
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });

  it('respects max value', () => {
    const { result } = renderHook(() => useCounter(9, { max: 10 }));
    
    act(() => {
      result.current.increment();
      result.current.increment();
    });
    
    expect(result.current.count).toBe(10);
  });
});
```

### Mocking

```tsx
// Mock module
vi.mock('./api', () => ({
  fetchUsers: vi.fn(),
}));

// Mock implementation per test
import { fetchUsers } from './api';

beforeEach(() => {
  vi.mocked(fetchUsers).mockResolvedValue([{ id: 1, name: 'John' }]);
});

// Mock fetch
global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve({ data: 'test' }),
});
```

---

## Integration Testing

### Testing with Providers

```tsx
function renderWithProviders(ui: React.ReactElement, options?: RenderOptions) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider>
          <RouterProvider>
            {children}
          </RouterProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );
  }
  return render(ui, { wrapper: Wrapper, ...options });
}
```

### API Mocking (MSW)

```ts
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ]);
  }),
  http.post('/api/users', async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ id: 3, ...body }, { status: 201 });
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### Form Testing

```tsx
import userEvent from '@testing-library/user-event';

it('submits form with valid data', async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  
  render(<ContactForm onSubmit={onSubmit} />);
  
  await user.type(screen.getByLabelText(/name/i), 'John Doe');
  await user.type(screen.getByLabelText(/email/i), 'john@example.com');
  await user.click(screen.getByRole('button', { name: /submit/i }));
  
  expect(onSubmit).toHaveBeenCalledWith({
    name: 'John Doe',
    email: 'john@example.com',
  });
});
```

---

## E2E Testing (Playwright)

### Basic Test

```ts
import { test, expect } from '@playwright/test';

test('user can log in', async ({ page }) => {
  await page.goto('/login');
  
  await page.fill('[name="email"]', 'user@example.com');
  await page.fill('[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  
  await expect(page).toHaveURL('/dashboard');
  await expect(page.getByText('Welcome back')).toBeVisible();
});
```

### Page Object Model

```ts
// pages/LoginPage.ts
export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.page.fill('[name="email"]', email);
    await this.page.fill('[name="password"]', password);
    await this.page.click('button[type="submit"]');
  }
}

// tests/auth.spec.ts
test('login flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('user@example.com', 'password');
  await expect(page).toHaveURL('/dashboard');
});
```

### Visual Comparison

```ts
test('homepage visual', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage.png');
});
```

---

## Testing Patterns

### Arrange-Act-Assert

```tsx
it('filters users by search term', async () => {
  // Arrange
  const users = [{ name: 'John' }, { name: 'Jane' }, { name: 'Bob' }];
  render(<UserList users={users} />);
  
  // Act
  await userEvent.type(screen.getByRole('searchbox'), 'J');
  
  // Assert
  expect(screen.getByText('John')).toBeInTheDocument();
  expect(screen.getByText('Jane')).toBeInTheDocument();
  expect(screen.queryByText('Bob')).not.toBeInTheDocument();
});
```

### Test IDs

```tsx
// Component
<button data-testid="submit-btn">Submit</button>

// Test
screen.getByTestId('submit-btn');
```

Use sparingly; prefer accessible queries:
1. `getByRole`
2. `getByLabelText`
3. `getByPlaceholderText`
4. `getByText`
5. `getByTestId` (last resort)

### Async Testing

```tsx
// Wait for element
await screen.findByText('Loaded content');

// Wait for removal
await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));

// Custom wait
await waitFor(() => {
  expect(screen.getByText('Success')).toBeInTheDocument();
});
```

---

## Test Configuration

### Vitest Config

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['node_modules', 'src/test'],
    },
  },
});
```

### Setup File

```ts
// src/test/setup.ts
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});
```

---

## Coverage Goals

| Type | Target | Notes |
|------|--------|-------|
| Statements | 80% | Overall code |
| Branches | 75% | Conditionals |
| Functions | 80% | All functions |
| Lines | 80% | Executable lines |

Focus on critical paths over arbitrary coverage numbers.
