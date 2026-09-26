'use client';

import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

/**
 * Unified Button Component
 * Combines the best of both design-system and UI components
 *
 * Features:
 * - Full variant support with CVA
 * - Loading states
 * - Icon support (left/right)
 * - Accessibility built-in
 * - Slot pattern for composition
 * - Dark mode support
 * - Focus management
 */

const buttonVariants = cva(
  // Base styles - Mobile-first, accessible, performant
  [
    'inline-flex items-center justify-center',
    'font-medium transition-all duration-200 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:scale-[0.98]',
    'touch-manipulation select-none',
    'relative overflow-hidden',
  ].join(' '),
  {
    variants: {
      variant: {
        // Primary - Main CTAs, important actions
        primary: [
          'bg-gray-900 text-white',
          'hover:bg-gray-800 hover:shadow-md hover:-translate-y-px',
          'focus-visible:ring-gray-900',
          'dark:bg-white dark:text-gray-900',
          'dark:hover:bg-gray-100',
          'dark:focus-visible:ring-white',
        ].join(' '),

        // Secondary - Less prominent actions
        secondary: [
          'bg-gray-100 text-gray-900',
          'border border-gray-200',
          'hover:bg-gray-200 hover:border-gray-300',
          'focus-visible:ring-gray-500',
          'dark:bg-gray-800 dark:text-gray-100',
          'dark:border-gray-700',
          'dark:hover:bg-gray-700 dark:hover:border-gray-600',
        ].join(' '),

        // Destructive - Delete, remove, danger actions
        destructive: [
          'bg-red-500 text-white',
          'hover:bg-red-600 hover:shadow-md',
          'focus-visible:ring-red-500',
          'dark:bg-red-600 dark:hover:bg-red-700',
        ].join(' '),

        // Success - Positive actions, confirmations
        success: [
          'bg-green-500 text-white',
          'hover:bg-green-600 hover:shadow-md',
          'focus-visible:ring-green-500',
          'dark:bg-green-600 dark:hover:bg-green-700',
        ].join(' '),

        // Ghost - Minimal, text-only appearance
        ghost: [
          'hover:bg-gray-100 hover:text-gray-900',
          'focus-visible:ring-gray-500',
          'dark:hover:bg-gray-800 dark:hover:text-gray-100',
        ].join(' '),

        // Link - Styled as a hyperlink
        link: [
          'text-gray-900 underline-offset-4',
          'hover:underline hover:text-gray-700',
          'focus-visible:ring-gray-500',
          'dark:text-gray-100 dark:hover:text-gray-300',
        ].join(' '),

        // Outline - Border-only style
        outline: [
          'border-2 border-gray-300 bg-transparent',
          'hover:bg-gray-50 hover:border-gray-400',
          'focus-visible:ring-gray-500',
          'dark:border-gray-700',
          'dark:hover:bg-gray-900 dark:hover:border-gray-600',
        ].join(' '),
      },

      size: {
        xs: 'h-7 px-2.5 text-xs rounded-md gap-1.5',
        sm: 'h-9 px-3 text-sm rounded-md gap-2',
        md: 'h-10 px-4 text-sm rounded-md gap-2',
        lg: 'h-11 px-6 text-base rounded-lg gap-2.5',
        xl: 'h-12 px-8 text-base rounded-lg gap-3',
        // Icon sizes
        'icon-xs': 'h-7 w-7 rounded-md',
        'icon-sm': 'h-9 w-9 rounded-md',
        'icon-md': 'h-10 w-10 rounded-md',
        'icon-lg': 'h-11 w-11 rounded-lg',
        'icon-xl': 'h-12 w-12 rounded-lg',
      },

      fullWidth: {
        true: 'w-full',
        false: '',
      },

      // New: Animation intensity
      animationIntensity: {
        none: '',
        subtle: 'hover:scale-[1.02] active:scale-[0.98]',
        normal: 'hover:scale-[1.05] active:scale-[0.95]',
        bouncy: 'hover:scale-[1.08] active:scale-[0.92] transition-all duration-300 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]',
      },
    },

    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
      animationIntensity: 'none',
    },
  }
);

// Ripple effect styles
const rippleStyles = `
  @keyframes ripple {
    to {
      transform: translate(-50%, -50%) scale(4);
      opacity: 0;
    }
  }

  .button-ripple {
    position: absolute;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    animation: ripple 600ms ease-out;
    background-color: currentColor;
    opacity: 0.3;
  }
`;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  // Slot pattern for polymorphic components
  asChild?: boolean;
  // Loading state
  loading?: boolean;
  loadingText?: string;
  // Icons
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  // Ripple effect
  ripple?: boolean;
  // Accessibility
  'aria-label'?: string;
  'aria-pressed'?: boolean;
  'aria-expanded'?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      animationIntensity,
      asChild = false,
      loading = false,
      loadingText = 'Loading...',
      leftIcon,
      rightIcon,
      ripple = false,
      disabled,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const mergedRef = ref || buttonRef;

    // Handle ripple effect
    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (ripple && mergedRef && 'current' in mergedRef && mergedRef.current) {
          const button = mergedRef.current;
          const rect = button.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          // Create ripple element
          const rippleEl = document.createElement('span');
          rippleEl.className = 'button-ripple';
          rippleEl.style.width = rippleEl.style.height = `${size}px`;
          rippleEl.style.left = `${x}px`;
          rippleEl.style.top = `${y}px`;

          button.appendChild(rippleEl);

          // Remove ripple after animation
          setTimeout(() => {
            rippleEl.remove();
          }, 600);
        }

        onClick?.(e);
      },
      [onClick, ripple, mergedRef]
    );

    // Determine if button should be disabled
    const isDisabled = disabled || loading;

    // Build icon size based on button size
    const iconSize = React.useMemo(() => {
      const sizeMap = {
        xs: 'h-3 w-3',
        sm: 'h-3.5 w-3.5',
        md: 'h-4 w-4',
        lg: 'h-4 w-4',
        xl: 'h-5 w-5',
      };
      return size && !size.startsWith('icon') ? sizeMap[size as keyof typeof sizeMap] : 'h-4 w-4';
    }, [size]);

    return (
      <>
        {ripple && (
          <style dangerouslySetInnerHTML={{ __html: rippleStyles }} />
        )}
        <Comp
          className={cn(
            buttonVariants({ variant, size, fullWidth, animationIntensity, className })
          )}
          ref={mergedRef}
          disabled={isDisabled}
          onClick={handleClick}
          {...props}
        >
          {loading ? (
            <>
              <Loader2 className={cn(iconSize, 'animate-spin')} />
              {loadingText && <span>{loadingText}</span>}
            </>
          ) : (
            <>
              {leftIcon && (
                <span className={cn(iconSize, 'inline-flex items-center justify-center')}>
                  {leftIcon}
                </span>
              )}
              {children}
              {rightIcon && (
                <span className={cn(iconSize, 'inline-flex items-center justify-center')}>
                  {rightIcon}
                </span>
              )}
            </>
          )}
        </Comp>
      </>
    );
  }
);

Button.displayName = 'Button';

// Export variants for use in other components
export { Button, buttonVariants };