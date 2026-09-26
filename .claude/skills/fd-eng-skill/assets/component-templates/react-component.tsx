import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ComponentNameProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Primary content */
  children: React.ReactNode;
  /** Visual variant */
  variant?: 'default' | 'primary' | 'secondary';
  /** Size preset */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * ComponentName description.
 *
 * @example
 * ```tsx
 * <ComponentName variant="primary">Content</ComponentName>
 * ```
 */
export const ComponentName = forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ className, children, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'base-styles',
          {
            'variant-default': variant === 'default',
            'variant-primary': variant === 'primary',
            'variant-secondary': variant === 'secondary',
            'size-sm': size === 'sm',
            'size-md': size === 'md',
            'size-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ComponentName.displayName = 'ComponentName';
