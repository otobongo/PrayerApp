# Custom Skills Documentation for PrayerApp

## Overview

Two custom skills have been properly set up in your Claude Code environment:

1. **fd-eng-skill** - Frontend Engineer Agent
2. **frontend-design-pro** - Frontend Design Pro

## Current Setup Status ✅

The skills have been correctly placed in:
```
.claude/skills/
├── fd-eng-skill/
│   ├── SKILL.md           # Main skill definition
│   ├── assets/            # Templates and configurations
│   └── references/        # Domain-specific guidance
└── frontend-design-pro/
    ├── SKILL.md           # Main skill definition
    ├── assets/            # Design templates
    └── references/        # Design guidelines

```

## Important Note: Skill Loading

**Skills need to be loaded when Claude Code starts a new conversation.** The skills are now properly structured and will be available in your next Claude Code session.

To activate the skills:
1. Start a new conversation in Claude Code
2. The skills will automatically be detected from `.claude/skills/`
3. They will appear in the available skills list

## Skill 1: fd-eng-skill (Frontend Engineer Agent)

### Purpose
Expert-level frontend engineering assistant for building, architecting, and optimizing frontend applications.

### When to Use
- Framework implementation (React, Vue, Angular, Svelte, Next.js, etc.)
- Component architecture design
- State management solutions
- API integration (REST, GraphQL, tRPC, WebSockets)
- Technical documentation (Storybook, JSDoc, OpenAPI)
- DevRel content creation
- Build configuration and optimization
- Testing strategies
- Performance optimization
- Accessibility compliance

### How It Works
1. **Context Detection**: Automatically identifies your framework from code patterns
2. **Approach Selection**: Chooses best practices for your stack
3. **Code Generation**: Produces production-ready, typed code
4. **Validation**: Ensures output follows best practices

### Example Triggers
- "Help me build a React component with TypeScript"
- "Create API integration for my Next.js app"
- "Write unit tests for this Vue component"
- "Optimize my webpack configuration"
- "Document this component with Storybook"

## Skill 2: frontend-design-pro (Frontend Design Pro)

### Purpose
Create distinctive, production-grade frontend interfaces with exceptional visual design quality.

### When to Use
- UI design implementation
- Design system creation
- Component styling
- Platform-specific design (Material Design, Apple HIG)
- Typography and color systems
- Motion patterns and animations
- Accessibility-first design
- Spatial composition and layout

### Design Philosophy
Balances creative vision with platform conventions:
- **Content Apps**: UI defers to content with minimal clutter
- **Branded Experiences**: Bold, distinctive aesthetic with memorable identity

### Platform Support
| Platform | Design System | Grid |
|----------|---------------|------|
| Web | Material Design or Custom | 8px grid |
| Android | Material Design 3 | 8px grid |
| iOS/macOS | Apple HIG | Platform-native |

### Example Triggers
- "Design a professional login page following Material Design"
- "Create a distinctive brand experience for our landing page"
- "Build an accessible navigation system"
- "Implement smooth animations for state changes"
- "Design a color system for dark and light modes"

## Using the Skills

### Method 1: Direct Invocation
Once loaded, you can directly ask for the skill:
```
"Use the fd-eng-skill to help me build a React dashboard"
"Apply frontend-design-pro to create a modern pricing page"
```

### Method 2: Automatic Activation
Skills activate automatically when your request matches their expertise:
```
"Build a TypeScript component with proper error handling" → fd-eng-skill activates
"Design a beautiful hero section with animations" → frontend-design-pro activates
```

### Method 3: Combined Usage
Both skills can work together:
```
"Create a React component with exceptional visual design"
→ fd-eng-skill handles the architecture
→ frontend-design-pro handles the aesthetics
```

## Best Practices

### For fd-eng-skill:
- Specify your framework if not obvious from context
- Mention if you need TypeScript (default) or JavaScript
- Indicate testing requirements upfront
- Specify any performance constraints

### For frontend-design-pro:
- Clarify platform (Web, iOS, Android)
- Specify if following Material Design or Apple HIG
- Mention brand requirements or color schemes
- Indicate accessibility requirements (WCAG AA/AAA)

## Troubleshooting

### Skills Not Available?
1. Ensure skills are in `.claude/skills/` directory ✅ (Already done)
2. Start a new Claude Code conversation
3. Skills should auto-load on conversation start

### Skills Not Activating?
- Use more specific language matching skill descriptions
- Directly request the skill by name
- Check that your request aligns with skill capabilities

## Project Integration

These skills are perfect for PrayerApp development:

### fd-eng-skill can help with:
- React/Next.js component architecture
- API integration with your backend
- State management for prayer data
- Testing your components
- Performance optimization

### frontend-design-pro can help with:
- Creating a distinctive spiritual aesthetic
- Designing meditation interfaces
- Building accessible prayer experiences
- Implementing calming animations
- Creating consistent design language

## Next Steps

1. **Start a new conversation** to load the skills
2. **Test with a simple request** like "Help me design a prayer card component"
3. **Iterate and refine** based on your needs

## Additional Resources

Each skill includes extensive reference materials:

### fd-eng-skill References:
- frameworks.md - Framework-specific patterns
- api-patterns.md - API integration best practices
- architecture.md - Component architecture
- testing.md - Testing strategies
- performance.md - Optimization techniques
- accessibility.md - A11y compliance
- documentation.md - Technical docs
- devrel.md - Developer content

### frontend-design-pro References:
- material-design.md - Material Design guidelines
- apple-hig.md - Apple Human Interface Guidelines
- typography.md - Typography systems
- color-systems.md - Color theory and palettes
- motion-patterns.md - Animation principles
- spatial-composition.md - Layout and spacing
- accessibility.md - Inclusive design
- design-philosophy.md - Design thinking

---

**Note**: Skills are loaded per conversation session. They provide specialized expertise beyond Claude's base capabilities, offering framework-specific code generation and professional design implementation.