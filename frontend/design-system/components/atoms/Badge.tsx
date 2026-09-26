'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Dynamic Badge Component
 * Small labels for status, tags, and counts
 * Changes here automatically update all badges
 */

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        outline: 'border border-current bg-transparent',
        ghost: 'bg-transparent hover:bg-accent',
      },
      size: {
        xs: 'px-1.5 py-0.5 text-[10px]',
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-sm',
        lg: 'px-3 py-1 text-base',
      },
      rounded: {
        full: 'rounded-full',
        md: 'rounded-md',
        sm: 'rounded-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
      rounded: 'full',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  children?: React.ReactNode;
  dot?: boolean;
  count?: number;
  max?: number;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, rounded, dot, count, max = 99, children, ...props }, ref) => {
    const displayContent = () => {
      if (dot) {
        return <span className="h-1.5 w-1.5 rounded-full bg-current" />;
      }
      if (count !== undefined) {
        return count > max ? `${max}+` : count;
      }
      return children;
    };

    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size, rounded, className }))}
        {...props}
      >
        {displayContent()}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

// Status badge with dot indicator
export const StatusBadge = ({
  status,
  children,
  ...props
}: {
  status: 'online' | 'offline' | 'away' | 'busy';
  children?: React.ReactNode;
} & Omit<BadgeProps, 'variant' | 'dot'>) => {
  const statusVariants = {
    online: 'success',
    offline: 'secondary',
    away: 'warning',
    busy: 'error',
  } as const;

  return (
    <Badge variant={statusVariants[status]} {...props}>
      <span className="mr-1 h-2 w-2 rounded-full bg-current" />
      {children || status}
    </Badge>
  );
};

// Count badge for notifications, etc
export const CountBadge = ({
  count,
  ...props
}: {
  count: number;
} & Omit<BadgeProps, 'count'>) => {
  if (count <= 0) return null;
  return <Badge count={count} {...props} />;
};