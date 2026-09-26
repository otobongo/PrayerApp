'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { typography } from '@/design-system/tokens/typography';

/**
 * Dynamic Text Component
 * Single source of truth for all typography in the app
 * Changes here will automatically update all text elements
 */

const textVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-5xl font-bold tracking-tight',
      h2: 'text-4xl font-semibold tracking-tight',
      h3: 'text-3xl font-semibold tracking-tight',
      h4: 'text-2xl font-semibold tracking-tight',
      h5: 'text-xl font-medium',
      h6: 'text-lg font-medium',
      body: 'text-base font-normal',
      'body-sm': 'text-sm font-normal',
      'body-lg': 'text-lg font-normal',
      label: 'text-sm font-medium',
      caption: 'text-xs font-normal',
      overline: 'text-xs font-semibold uppercase tracking-wider',
      lead: 'text-xl font-normal text-muted-foreground',
      code: 'font-mono text-sm bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded',
    },
    color: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      primary: 'text-primary dark:text-primary',
      secondary: 'text-secondary-foreground',
      success: 'text-green-600 dark:text-green-500',
      warning: 'text-yellow-600 dark:text-yellow-500',
      error: 'text-red-600 dark:text-red-500',
      info: 'text-blue-600 dark:text-blue-500',
      white: 'text-white',
      inherit: '',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    weight: {
      thin: 'font-thin',
      extralight: 'font-extralight',
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
      black: 'font-black',
    },
    lineClamp: {
      1: 'line-clamp-1',
      2: 'line-clamp-2',
      3: 'line-clamp-3',
      4: 'line-clamp-4',
      5: 'line-clamp-5',
      6: 'line-clamp-6',
      none: '',
    },
    truncate: {
      true: 'truncate',
      false: '',
    },
    italic: {
      true: 'italic',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'body',
    color: 'default',
    align: 'left',
    lineClamp: 'none',
    truncate: false,
    italic: false,
  },
});

const variantToElement = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'p',
  'body-sm': 'p',
  'body-lg': 'p',
  label: 'label',
  caption: 'p',
  overline: 'p',
  lead: 'p',
  code: 'code',
} as const;

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({
    className,
    variant = 'body',
    color,
    align,
    weight,
    lineClamp,
    truncate,
    italic,
    as,
    children,
    ...props
  }, ref) => {
    const Component = (as || variantToElement[variant as keyof typeof variantToElement] || 'span') as any;

    return (
      <Component
        ref={ref}
        className={cn(
          textVariants({
            variant,
            color,
            align,
            weight,
            lineClamp,
            truncate,
            italic,
            className
          })
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';

// Convenience components for common text types
export const H1 = (props: Omit<TextProps, 'variant'>) => <Text variant="h1" {...props} />;
export const H2 = (props: Omit<TextProps, 'variant'>) => <Text variant="h2" {...props} />;
export const H3 = (props: Omit<TextProps, 'variant'>) => <Text variant="h3" {...props} />;
export const H4 = (props: Omit<TextProps, 'variant'>) => <Text variant="h4" {...props} />;
export const H5 = (props: Omit<TextProps, 'variant'>) => <Text variant="h5" {...props} />;
export const H6 = (props: Omit<TextProps, 'variant'>) => <Text variant="h6" {...props} />;
export const Body = (props: Omit<TextProps, 'variant'>) => <Text variant="body" {...props} />;
export const Label = (props: Omit<TextProps, 'variant'>) => <Text variant="label" {...props} />;
export const Caption = (props: Omit<TextProps, 'variant'>) => <Text variant="caption" {...props} />;
export const Lead = (props: Omit<TextProps, 'variant'>) => <Text variant="lead" {...props} />;