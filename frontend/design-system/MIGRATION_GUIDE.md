# Design System Migration Guide

## Overview
This guide documents the migration from the dual component system to a unified design system.

## Component Migration Status

### ✅ Components to Keep (from design-system)
- **Button**: Uses CVA, better variant system
- **Text**: Complete typography system
- **Container**: Better layout variants
- **Card**: More flexible sub-components
- **Badge**: Better variant system
- **Avatar**: Group support included

### 🔄 Components to Merge
- **Input**: Merge Radix UI functionality with design system styling
- **Select**: Keep Radix UI for accessibility, apply design system styles
- **Dialog**: Keep Radix UI primitives, apply design system styles
- **Dropdown**: Keep Radix UI for functionality

### ❌ Components to Remove
- Duplicate `/components/ui/button.tsx` (use design-system version)
- Duplicate `/components/ui/card.tsx` (use design-system version)
- Duplicate `/components/ui/badge.tsx` (use design-system version)

## Migration Steps

### Step 1: Update Imports
```typescript
// OLD
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// NEW
import { Button, Card } from '@/design-system';
```

### Step 2: Update Props
```typescript
// OLD Button
<Button variant="default" size="default">

// NEW Button
<Button variant="primary" size="md">
```

### Step 3: Update Styling Classes
```typescript
// OLD
className="btn-primary"

// NEW
variant="primary"
```

## Component API Changes

### Button
| Old Prop | New Prop | Notes |
|----------|----------|-------|
| `variant="default"` | `variant="primary"` | Primary action |
| `variant="secondary"` | `variant="secondary"` | No change |
| `variant="destructive"` | `variant="destructive"` | No change |
| `variant="outline"` | `variant="outline"` | No change |
| `variant="ghost"` | `variant="ghost"` | No change |
| `variant="link"` | `variant="link"` | No change |
| `size="default"` | `size="md"` | Medium size |
| `size="sm"` | `size="sm"` | No change |
| `size="lg"` | `size="lg"` | No change |
| N/A | `leftIcon` | New feature |
| N/A | `rightIcon` | New feature |
| N/A | `loading` | New feature |

### Card
| Old Prop | New Prop | Notes |
|----------|----------|-------|
| N/A | `variant` | elevated, interactive, default |
| N/A | `padding` | Control internal spacing |

## Breaking Changes

1. **Button default variant**: Changed from "default" to "primary"
2. **Size prop values**: "default" → "md", added "xs" and "xl"
3. **Card composition**: Now uses CardHeader, CardContent, CardFooter

## Deprecation Schedule

- **Week 1**: Add deprecation warnings
- **Week 2**: Update all internal usage
- **Week 3**: Remove deprecated components

## Support

For questions or issues during migration:
1. Check this guide
2. Review component Storybook examples
3. Contact the design system team