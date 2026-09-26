# API Integration Patterns

## REST API

### Fetch Wrapper

```ts
class ApiClient {
  constructor(private baseUrl: string) {}

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new ApiError(response.status, await response.text());
    }

    return response.json();
  }

  get<T>(endpoint: string) {
    return this.request<T>(endpoint);
  }

  post<T>(endpoint: string, data: unknown) {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put<T>(endpoint: string, data: unknown) {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}
```

### Error Handling

```ts
class ApiError extends Error {
  constructor(
    public status: number,
    public body: string
  ) {
    super(`API Error ${status}: ${body}`);
    this.name = 'ApiError';
  }

  get isNotFound() { return this.status === 404; }
  get isUnauthorized() { return this.status === 401; }
  get isServerError() { return this.status >= 500; }
}
```

---

## GraphQL

### Client Setup (urql)

```ts
import { Client, cacheExchange, fetchExchange } from 'urql';

const client = new Client({
  url: '/graphql',
  exchanges: [cacheExchange, fetchExchange],
});
```

### Typed Queries (with codegen)

```ts
// Generated types from schema
import { useQuery } from 'urql';
import { GetUsersDocument } from './generated/graphql';

function UserList() {
  const [{ data, fetching, error }] = useQuery({ query: GetUsersDocument });
  
  if (fetching) return <Loading />;
  if (error) return <Error message={error.message} />;
  
  return <ul>{data?.users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

### Mutations

```ts
import { useMutation } from 'urql';
import { CreateUserDocument } from './generated/graphql';

function CreateUser() {
  const [result, createUser] = useMutation(CreateUserDocument);
  
  const handleSubmit = async (data: CreateUserInput) => {
    const result = await createUser({ input: data });
    if (result.error) {
      // Handle error
    }
  };
}
```

---

## tRPC

### Server Router

```ts
import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();

export const appRouter = t.router({
  users: t.router({
    list: t.procedure.query(async () => {
      return db.users.findMany();
    }),
    create: t.procedure
      .input(z.object({ name: z.string(), email: z.string().email() }))
      .mutation(async ({ input }) => {
        return db.users.create({ data: input });
      }),
  }),
});

export type AppRouter = typeof appRouter;
```

### Client Usage

```ts
import { trpc } from './utils/trpc';

function UserList() {
  const { data, isLoading } = trpc.users.list.useQuery();
  const createUser = trpc.users.create.useMutation();
  
  const handleCreate = async () => {
    await createUser.mutateAsync({ name: 'John', email: 'john@example.com' });
  };
}
```

---

## WebSockets

### Connection Manager

```ts
class WebSocketManager {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnects = 5;
  private listeners = new Map<string, Set<(data: unknown) => void>>();

  connect(url: string) {
    this.ws = new WebSocket(url);
    
    this.ws.onopen = () => {
      this.reconnectAttempts = 0;
    };
    
    this.ws.onmessage = (event) => {
      const { type, payload } = JSON.parse(event.data);
      this.listeners.get(type)?.forEach(cb => cb(payload));
    };
    
    this.ws.onclose = () => {
      if (this.reconnectAttempts < this.maxReconnects) {
        setTimeout(() => {
          this.reconnectAttempts++;
          this.connect(url);
        }, Math.pow(2, this.reconnectAttempts) * 1000);
      }
    };
  }

  subscribe<T>(type: string, callback: (data: T) => void) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)!.add(callback as (data: unknown) => void);
    
    return () => {
      this.listeners.get(type)?.delete(callback as (data: unknown) => void);
    };
  }

  send(type: string, payload: unknown) {
    this.ws?.send(JSON.stringify({ type, payload }));
  }
}
```

### React Hook

```ts
function useWebSocket<T>(type: string) {
  const [data, setData] = useState<T | null>(null);
  
  useEffect(() => {
    return wsManager.subscribe<T>(type, setData);
  }, [type]);
  
  return data;
}
```

---

## Data Fetching Patterns

### TanStack Query (React Query)

```ts
// Query with dependencies
const { data: user } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => api.users.get(userId),
  enabled: !!userId,
});

// Mutation with optimistic update
const mutation = useMutation({
  mutationFn: api.users.update,
  onMutate: async (newUser) => {
    await queryClient.cancelQueries({ queryKey: ['user', newUser.id] });
    const previous = queryClient.getQueryData(['user', newUser.id]);
    queryClient.setQueryData(['user', newUser.id], newUser);
    return { previous };
  },
  onError: (err, newUser, context) => {
    queryClient.setQueryData(['user', newUser.id], context?.previous);
  },
  onSettled: (data, error, variables) => {
    queryClient.invalidateQueries({ queryKey: ['user', variables.id] });
  },
});
```

### SWR

```ts
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

function UserProfile({ id }: { id: string }) {
  const { data, error, isLoading, mutate } = useSWR(`/api/users/${id}`, fetcher);
  
  // Revalidate
  const refresh = () => mutate();
  
  // Optimistic update
  const update = async (newData: User) => {
    mutate(newData, false);
    await api.users.update(id, newData);
    mutate();
  };
}
```

---

## Authentication Patterns

### Token Management

```ts
class AuthManager {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  async getAccessToken(): Promise<string | null> {
    if (this.accessToken && !this.isExpired(this.accessToken)) {
      return this.accessToken;
    }
    
    if (this.refreshToken) {
      return this.refresh();
    }
    
    return null;
  }

  private async refresh(): Promise<string | null> {
    try {
      const { accessToken, refreshToken } = await api.auth.refresh(this.refreshToken!);
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      return accessToken;
    } catch {
      this.logout();
      return null;
    }
  }

  private isExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  }

  logout() {
    this.accessToken = null;
    this.refreshToken = null;
  }
}
```

### Fetch Interceptor

```ts
async function authFetch(url: string, options?: RequestInit) {
  const token = await authManager.getAccessToken();
  
  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
}
```
