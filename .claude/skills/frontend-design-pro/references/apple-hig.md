# Apple Human Interface Guidelines

Comprehensive Apple HIG principles for iOS, macOS, watchOS, and visionOS.

## Core Principles

| Principle | Description |
|-----------|-------------|
| **Clarity** | Text is legible, icons are precise, adornments are subtle. Nothing is ambiguous. |
| **Deference** | UI helps users focus on content without competing with it. Content takes center stage. |
| **Depth** | Visual layers and realistic motion convey hierarchy and facilitate understanding. |
| **Consistency** | Familiar interface patterns reduce learning curve and build user trust. |

## Design Philosophy

### Content-First Design
- UI should never compete with content
- Minimize distractions
- Use subtle, supportive visual elements
- Let the user's content shine

### Feedback & Response
- Provide clear response to every action
- Use haptics to reinforce interactions
- Visual feedback for state changes
- Audio cues where appropriate

## Typography

### San Francisco Font Family

| Variant | Use Case |
|---------|----------|
| SF Pro Display | UI components, larger sizes |
| SF Pro Text | Body text, extended reading |
| SF Pro Rounded | Friendly, approachable contexts |
| SF Mono | Code, tabular data |
| SF Compact | watchOS, space-constrained |

### Type Sizes

| Style | Size | Weight | Leading |
|-------|------|--------|---------|
| Large Title | 34pt | Regular | 41pt |
| Title 1 | 28pt | Regular | 34pt |
| Title 2 | 22pt | Regular | 28pt |
| Title 3 | 20pt | Regular | 25pt |
| Headline | 17pt | Semibold | 22pt |
| Body | 17pt | Regular | 22pt |
| Callout | 16pt | Regular | 21pt |
| Subhead | 15pt | Regular | 20pt |
| Footnote | 13pt | Regular | 18pt |
| Caption 1 | 12pt | Regular | 16pt |
| Caption 2 | 11pt | Regular | 13pt |

### Dynamic Type
Support user text size preferences:
- Always test with largest accessibility sizes
- Use system fonts for automatic scaling
- Minimum readable size: 11pt

## Color System

### System Colors (Semantic)
```swift
// Adapt to light/dark mode automatically
.systemBlue      // Interactive elements
.systemGreen     // Success, positive
.systemRed       // Error, destructive
.systemOrange    // Warning
.systemYellow    // Caution
.systemPurple    // Special/Premium
.systemPink      // Affection/Social
.systemTeal      // Secondary actions
.systemIndigo    // Alternative accent
```

### Background Colors
```swift
.systemBackground           // Primary background
.secondarySystemBackground  // Grouped content
.tertiarySystemBackground   // Nested content
```

### Label Colors
```swift
.label            // Primary text
.secondaryLabel   // Secondary text
.tertiaryLabel    // Tertiary text
.quaternaryLabel  // Placeholder text
```

### Color Usage
- Use color sparingly, primarily for interactivity
- Rely on semantic colors for consistency
- Never use color alone to convey information
- Test in both light and dark modes

## Layout & Spacing

### Safe Areas
Always respect safe areas:
- Status bar region
- Home indicator
- Notch/Dynamic Island
- Rounded corners

### Margins by Device

| Device | Margin |
|--------|--------|
| iPhone SE | 16pt |
| iPhone Standard | 16pt |
| iPhone Pro Max | 20pt |
| iPad | 20pt minimum |

### Readable Content Width
Maximum width for optimal reading: ~672pt

### Layout Guides
```swift
// Use system layout guides
layoutMarginsGuide
readableContentGuide
safeAreaLayoutGuide
```

## Touch Targets

**Minimum: 44x44pt**

- Primary actions: 44pt minimum
- Spacing between targets: 8pt minimum
- Thumb-reachable zones: Bottom of screen preferred

## Navigation Patterns

### Hierarchical Navigation
- Drill down into content
- Back button for return
- Clear title showing current location

### Flat Navigation
- Tab bar for main sections
- Maximum 5 tabs
- Each tab maintains its own state

### Modal Presentation
- Sheets for focused tasks
- Full screen for immersive content
- Dismiss via gesture or button

### Tab Bar
- Height: 49pt (iPhone), 50pt (iPad)
- Maximum 5 items
- Use SF Symbols for icons
- Labels optional but recommended

## Animation & Motion

### Principles
- Subtle and smooth
- Purposeful, never distracting
- Maintain continuity between states
- Provide meaningful feedback

### Timing
- Quick feedback: 100-200ms
- Standard transitions: 250-350ms
- Complex transitions: 350-500ms

### Spring Animations
Prefer spring-based animations for natural feel:
```swift
.spring(response: 0.3, dampingFraction: 0.7)
```

## Depth & Layering

### Visual Layers
- Use subtle shadows for elevation
- Translucency (vibrancy) for overlays
- Blur effects for depth perception
- Clear z-axis hierarchy

### Materials
```swift
.ultraThinMaterial
.thinMaterial
.regularMaterial
.thickMaterial
.ultraThickMaterial
```

## Components

### Buttons
| Style | Use Case |
|-------|----------|
| Filled | Primary actions |
| Gray | Secondary actions |
| Tinted | Alternative primary |
| Plain | Tertiary actions |
| Borderless | Inline actions |

### Controls
- Toggles: 51x31pt
- Sliders: 34pt track height
- Steppers: 94x32pt
- Segmented controls: 32pt height

## Accessibility

### VoiceOver
- Label all interactive elements
- Provide hints for complex interactions
- Group related elements
- Test with VoiceOver regularly

### Dynamic Type
- Support all text sizes
- Test with accessibility sizes
- Use scalable layouts

### Reduce Motion
```swift
@Environment(\.accessibilityReduceMotion) var reduceMotion
```

### Color Considerations
- Support Increase Contrast
- Don't rely on color alone
- Maintain 4.5:1 contrast minimum

## Dark Mode

### Automatic Adaptation
- Use semantic colors
- Test both appearances
- Consider elevated surfaces
- Adjust image assets if needed

### Elevated Surfaces
In dark mode, elevated surfaces are lighter:
```swift
.systemBackground      // Base
.secondarySystemBackground  // +8% white
.tertiarySystemBackground   // +16% white
```

## Platform Variations

### iOS
- Touch-first interface
- Bottom navigation preferred
- Swipe gestures expected

### iPadOS
- Pointer/keyboard support
- Sidebar navigation
- Multi-column layouts

### macOS
- Menu bar integration
- Window management
- Keyboard shortcuts essential

### watchOS
- Minimal UI
- Glanceable information
- Crown and gesture input

### visionOS
- Spatial interfaces
- Eye tracking input
- 3D depth consideration

## Official Resources

- HIG: https://developer.apple.com/design/human-interface-guidelines
- SF Symbols: https://developer.apple.com/sf-symbols/
- Design Resources: https://developer.apple.com/design/resources/
