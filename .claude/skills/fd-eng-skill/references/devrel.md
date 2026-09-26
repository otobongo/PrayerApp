# DevRel Content Patterns

## Content Types

| Type | Purpose | Length |
|------|---------|--------|
| Quickstart | Get running in 5 minutes | ~500 words |
| Tutorial | Learn specific feature | 1000-2000 words |
| Guide | Deep dive on topic | 2000-4000 words |
| Reference | Complete API docs | Comprehensive |
| Example | Working code sample | Minimal viable |
| Blog post | Announce/educate | 800-1500 words |

---

## Quickstart Template

```markdown
# Quickstart: [Product Name]

Get [product] running in your [framework] app in 5 minutes.

## Prerequisites

- Node.js 18+
- A [product] account ([sign up free](link))

## 1. Install

\`\`\`bash
npm install @product/sdk
\`\`\`

## 2. Configure

\`\`\`ts
// lib/product.ts
import { ProductClient } from '@product/sdk';

export const client = new ProductClient({
  apiKey: process.env.PRODUCT_API_KEY,
});
\`\`\`

## 3. Use

\`\`\`tsx
import { client } from '@/lib/product';

const data = await client.getData();
```

## Next Steps

- [Full tutorial](/docs/tutorial)
- [API reference](/docs/api)
- [Examples](/examples)
```

---

## Tutorial Structure

### Anatomy

1. **Title**: Action-oriented ("Build a...", "Add ... to your app")
2. **Intro**: What you'll build, what you'll learn (2-3 sentences)
3. **Prerequisites**: What reader needs before starting
4. **Steps**: Numbered, progressive sections
5. **Checkpoints**: Verify progress between sections
6. **Conclusion**: Summary, next steps, related content

### Writing Pattern

```markdown
# Build a Real-time Dashboard with [Product]

Learn how to create a live-updating dashboard using [Product]'s 
streaming API and React.

**What you'll build:**
[Screenshot or diagram of final result]

**What you'll learn:**
- Setting up streaming connections
- Handling real-time updates
- Optimizing for performance

## Prerequisites

- Basic React knowledge
- Node.js 18+ installed
- [Product] account with API key

## Step 1: Project Setup

Start by creating a new React project:

\`\`\`bash
npx create-vite my-dashboard --template react-ts
cd my-dashboard
npm install @product/sdk
\`\`\`

[Explanation of what this does]

## Step 2: [Next Step]

[Content]

### Checkpoint

At this point, you should see [expected result]. 
If not, check [common issues].

## Conclusion

You've built a real-time dashboard that:
- Connects to streaming API
- Updates automatically
- Handles disconnections gracefully

### Next Steps

- [Add authentication](/tutorials/auth)
- [Deploy to production](/guides/deployment)
- [Explore the API reference](/api)
```

---

## SDK Design Principles

### API Design

```ts
// Good: Intuitive, minimal config
const client = new ProductClient({ apiKey: 'xxx' });
const users = await client.users.list();

// Bad: Verbose, confusing
const client = new ProductClient();
client.setConfig({ apiKey: 'xxx', version: 'v1' });
const response = await client.request('GET', '/users', {});
const users = response.data.users;
```

### Error Handling

```ts
// Typed errors with helpful messages
class ProductError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number,
    public requestId: string
  ) {
    super(message);
    this.name = 'ProductError';
  }
}

// Usage produces clear errors
try {
  await client.users.get('invalid-id');
} catch (error) {
  if (error instanceof ProductError) {
    console.log(error.code);      // 'USER_NOT_FOUND'
    console.log(error.message);   // 'User with ID invalid-id not found'
    console.log(error.requestId); // For support tickets
  }
}
```

### TypeScript First

```ts
// Full type inference
const user = await client.users.get('123');
// user is typed as User

// Autocomplete for options
await client.users.list({
  limit: 10,     // TypeScript suggests valid options
  orderBy: 'createdAt',
});
```

### Framework Integrations

```ts
// React hook
function useUser(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => client.users.get(id),
  });
}

// Next.js server action
async function createUser(formData: FormData) {
  'use server';
  return client.users.create({
    name: formData.get('name') as string,
  });
}
```

---

## Code Examples

### Structure

```
examples/
├── quickstart/
│   ├── README.md
│   ├── package.json
│   └── src/
├── with-nextjs/
│   ├── README.md
│   ├── package.json
│   └── app/
├── with-remix/
└── with-vue/
```

### Example README

```markdown
# [Product] + Next.js Example

This example shows how to use [Product] with Next.js App Router.

## Features

- Server-side data fetching
- Client-side mutations
- Real-time updates
- Error handling

## Deploy

[![Deploy with Vercel](button)](deploy-link)

## Local Development

1. Clone and install:
   \`\`\`bash
   git clone [repo]
   cd examples/with-nextjs
   npm install
   \`\`\`

2. Add environment variables:
   \`\`\`bash
   cp .env.example .env.local
   # Edit .env.local with your API key
   \`\`\`

3. Run:
   \`\`\`bash
   npm run dev
   \`\`\`

## Learn More

- [Documentation](link)
- [API Reference](link)
```

---

## Blog Post Template

```markdown
# [Action Verb] [Topic]: [Benefit/Result]

*[One sentence summary of what reader will learn]*

[Hook paragraph: problem, trend, or interesting fact]

## The Challenge

[Describe the problem or need this addresses]

## The Solution

[Introduce your approach/product/feature]

### How It Works

[Technical explanation with code samples]

\`\`\`ts
// Key code example
\`\`\`

### Key Benefits

1. **[Benefit 1]**: [Explanation]
2. **[Benefit 2]**: [Explanation]
3. **[Benefit 3]**: [Explanation]

## Getting Started

[Quick steps to try it]

## What's Next

[Future developments, related features]

---

*[Call to action: try it, give feedback, read more]*
```

---

## Developer Experience Checklist

### Onboarding
- [ ] Working quickstart (< 5 minutes)
- [ ] Clear prerequisites
- [ ] Copy-paste code examples
- [ ] Immediate visible result

### Documentation
- [ ] Searchable
- [ ] Code examples for all features
- [ ] Versioned docs
- [ ] API reference with types

### SDK
- [ ] TypeScript types
- [ ] Intuitive API design
- [ ] Helpful error messages
- [ ] Framework integrations

### Support
- [ ] Discord/Slack community
- [ ] GitHub issues template
- [ ] Status page
- [ ] Changelog

### Examples
- [ ] Framework-specific examples
- [ ] Deploy buttons
- [ ] Runnable in browser (StackBlitz/CodeSandbox)
