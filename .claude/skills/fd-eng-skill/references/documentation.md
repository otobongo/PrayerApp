# Technical Documentation Standards

## Documentation Types

| Type | Purpose | Format |
|------|---------|--------|
| README | Project overview, quick start | Markdown |
| API Reference | Endpoint/function documentation | OpenAPI, JSDoc |
| Guides | Step-by-step tutorials | MDX, Markdown |
| ADRs | Architecture decisions | Markdown |
| Storybook | Component documentation | MDX + Stories |
| Changelogs | Version history | Markdown |

---

## README Structure

```markdown
# Project Name

Brief description (1-2 sentences).

## Features

- Key feature 1
- Key feature 2

## Quick Start

\`\`\`bash
npm install project-name
\`\`\`

\`\`\`tsx
import { Component } from 'project-name';

<Component />
\`\`\`

## Documentation

- [Installation](./docs/installation.md)
- [API Reference](./docs/api.md)
- [Examples](./examples)

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)

## License

MIT
```

---

## JSDoc

### Function Documentation

```ts
/**
 * Formats a date relative to now (e.g., "2 hours ago").
 *
 * @param date - The date to format
 * @param options - Formatting options
 * @returns Formatted relative time string
 *
 * @example
 * ```ts
 * formatRelativeTime(new Date(Date.now() - 3600000))
 * // => "1 hour ago"
 * ```
 */
export function formatRelativeTime(
  date: Date,
  options?: RelativeTimeOptions
): string {
  // implementation
}
```

### Component Documentation

```tsx
/**
 * A button component with multiple variants.
 *
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */
export interface ButtonProps {
  /** The visual style variant */
  variant?: 'primary' | 'secondary' | 'ghost';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Disables the button */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Button content */
  children: React.ReactNode;
}
```

### Type Documentation

```ts
/**
 * User account information.
 */
export interface User {
  /** Unique identifier */
  id: string;
  /** Display name */
  name: string;
  /** Email address (unique) */
  email: string;
  /** Account creation timestamp */
  createdAt: Date;
  /** User role for permissions */
  role: 'admin' | 'user' | 'guest';
}
```

---

## OpenAPI / Swagger

### Endpoint Documentation

```yaml
openapi: 3.0.3
info:
  title: Users API
  version: 1.0.0
  
paths:
  /users:
    get:
      summary: List all users
      description: Returns a paginated list of users
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            default: 20
            maximum: 100
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserList'
                
    post:
      summary: Create a user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateUser'
      responses:
        '201':
          description: User created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '400':
          description: Validation error
          
components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: string
          format: uuid
        name:
          type: string
        email:
          type: string
          format: email
      required:
        - id
        - name
        - email
```

---

## Storybook

### Component Story

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};
```

### MDX Documentation

```mdx
import { Meta, Canvas, Controls } from '@storybook/blocks';
import * as ButtonStories from './Button.stories';

<Meta of={ButtonStories} />

# Button

Buttons trigger actions when clicked.

## Usage

```tsx
import { Button } from '@/components/Button';

<Button variant="primary" onClick={handleClick}>
  Click me
</Button>
```

## Variants

<Canvas of={ButtonStories.AllVariants} />

## Props

<Controls />

## Accessibility

- Uses native `<button>` element
- Supports keyboard navigation
- Includes focus indicators
- Disabled state communicated to screen readers
```

---

## Architecture Decision Records (ADR)

### ADR Template

```markdown
# ADR-001: Use React Query for Server State

## Status

Accepted

## Context

We need a solution for managing server state (API data) that handles caching, 
background updates, and loading/error states consistently across the application.

## Decision

Use TanStack Query (React Query) for all server state management.

## Consequences

### Positive
- Automatic caching and deduplication
- Built-in loading and error states
- Optimistic updates support
- DevTools for debugging

### Negative
- Additional dependency (~12kb gzipped)
- Learning curve for team members new to the library
- Need to distinguish server state from client state

## Alternatives Considered

1. **SWR**: Lighter weight but fewer features for mutations
2. **Redux Toolkit Query**: More boilerplate, team already comfortable with React Query
3. **Custom hooks**: Too much maintenance overhead
```

---

## Changelog

### Format (Keep a Changelog)

```markdown
# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- New feature description

## [1.2.0] - 2024-01-15

### Added
- User profile avatars (#123)
- Dark mode support (#145)

### Changed
- Improved loading states for data tables
- Updated to React 18

### Fixed
- Form validation not showing errors on blur (#156)
- Memory leak in useSubscription hook (#162)

### Deprecated
- `useOldHook` - use `useNewHook` instead

## [1.1.0] - 2024-01-01

### Added
- Initial public release
```

---

## Writing Guidelines

### Principles

1. **Audience-first**: Know who you're writing for
2. **Scannable**: Headers, lists, code blocks
3. **Examples**: Show, don't just tell
4. **Accurate**: Test all code samples
5. **Maintained**: Update with code changes

### Style

- Use active voice
- Be concise
- Use second person ("you")
- Define acronyms on first use
- Link to related docs

### Code Examples

- Include imports
- Show complete, runnable code
- Add comments for non-obvious parts
- Test all examples
- Keep examples minimal but complete
