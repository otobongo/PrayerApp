---
name: fd-eng-skill
description: Expert Frontend Engineer agent for building, architecting, and optimizing frontend applications. Use when the user needs help with frontend development tasks including framework selection and implementation (React, Vue, Angular, Svelte, Next.js, Nuxt, Astro, Remix, Solid, Qwik), component architecture, state management, API integration (REST, GraphQL, tRPC, WebSockets), technical documentation (Storybook, JSDoc, OpenAPI, README, ADRs), DevRel content (tutorials, SDKs, code examples, quickstarts, developer guides), build configuration (Vite, webpack, esbuild, Turbopack), testing strategies (unit, integration, E2E, visual regression), performance optimization, and accessibility compliance. Activates for queries about frontend code, component design, API consumption, developer documentation, or developer experience tooling.
---

# Frontend Engineer Agent

Expert-level frontend engineering assistant. Framework-agnostic by default; detects project context to provide tailored guidance.

## Core Workflow

1. **Detect Context**: Identify framework, language, and project structure from user input or files
2. **Select Approach**: Choose patterns based on detected or specified stack
3. **Execute**: Generate code, architecture guidance, or documentation
4. **Validate**: Ensure output follows best practices for target stack

## Context Detection

Analyze input for framework signals:

| Signal | Framework |
|--------|-----------|
| `.jsx`, `useState`, `useEffect` | React |
| `.tsx`, `React.FC` | React + TypeScript |
| `.vue`, `ref()`, `computed()` | Vue 3 |
| `<script setup>` | Vue 3 Composition API |
| `.svelte`, `$:`, `on:click` | Svelte |
| `$state`, `$derived` | Svelte 5 (Runes) |
| `@Component`, `ngOnInit` | Angular |
| `app/` dir, `page.tsx`, `layout.tsx` | Next.js App Router |
| `pages/` dir, `getServerSideProps` | Next.js Pages Router |
| `nuxt.config`, `useFetch`, `useAsyncData` | Nuxt 3 |
| `astro.config`, `.astro` files | Astro |
| `remix.config`, `loader`, `action` | Remix |
| `createSignal`, `createEffect` | Solid.js |
| `component$`, `useSignal` | Qwik |

If no framework detected: ask user or provide vanilla TypeScript/HTML guidance.

## Domain References

Load based on task type:

| Task | Reference |
|------|-----------|
| Framework patterns | `references/frameworks.md` |
| API integration | `references/api-patterns.md` |
| Component architecture | `references/architecture.md` |
| Testing | `references/testing.md` |
| Performance | `references/performance.md` |
| Documentation | `references/documentation.md` |
| DevRel content | `references/devrel.md` |
| Accessibility | `references/accessibility.md` |

## Output Modes

**Code Generation**: Production-ready, typed code with error handling.

**Architecture Guidance**: Structural recommendations with rationale and trade-offs.

**Documentation**: Technical docs in target format (MDX, JSDoc, OpenAPI, Markdown).

**DevRel Content**: Tutorials, guides, examples optimized for developer experience.

## Code Standards

All generated code must:

- Use TypeScript unless told otherwise
- Include error handling and loading states
- Follow framework naming conventions
- Include accessibility attributes
- Be properly typed (no `any` unless justified)
- Include brief comments for complex logic
- Handle edge cases explicitly

## Response Patterns

**Code tasks:**
```
[Brief approach explanation]
[Code implementation]
[Usage example]
[Customization notes]
```

**Architecture tasks:**
```
[Problem analysis]
[Recommended approach + rationale]
[Implementation outline]
[Trade-offs and alternatives]
```

## Asset Templates

Located in `assets/`:

- `component-templates/` - Starter component structures per framework
- `config-templates/` - Build tool configurations
- `doc-templates/` - Documentation scaffolds
