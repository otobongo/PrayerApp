'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Dynamic Container Component
 * Responsive container with consistent max-widths and padding
 */

const containerVariants = cva(
  'mx-auto w-full',
  {
    variants: {
      size: {
        xs: 'max-w-xs',     // 20rem - 320px
        sm: 'max-w-sm',     // 24rem - 384px
        md: 'max-w-md',     // 28rem - 448px
        lg: 'max-w-lg',     // 32rem - 512px
        xl: 'max-w-xl',     // 36rem - 576px
        '2xl': 'max-w-2xl', // 42rem - 672px
        '3xl': 'max-w-3xl', // 48rem - 768px
        '4xl': 'max-w-4xl', // 56rem - 896px
        '5xl': 'max-w-5xl', // 64rem - 1024px
        '6xl': 'max-w-6xl', // 72rem - 1152px
        '7xl': 'max-w-7xl', // 80rem - 1280px
        full: 'max-w-full',
        screen: 'max-w-screen-2xl',
      },
      padding: {
        none: '',
        xs: 'px-2',
        sm: 'px-4',
        md: 'px-6',
        lg: 'px-8',
        xl: 'px-12',
      },
      center: {
        true: 'mx-auto',
        false: '',
      },
    },
    defaultVariants: {
      size: '7xl',
      padding: 'md',
      center: true,
    },
  }
);

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: 'div' | 'section' | 'article' | 'main' | 'aside' | 'nav' | 'header' | 'footer';
  children?: React.ReactNode;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, center, as = 'div', children, ...props }, ref) => {
    const Component = as;

    return (
      <Component
        ref={ref}
        className={cn(containerVariants({ size, padding, center, className }))}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = 'Container';

// Semantic container components
export const Section = (props: Omit<ContainerProps, 'as'>) => <Container as="section" {...props} />;
export const Article = (props: Omit<ContainerProps, 'as'>) => <Container as="article" {...props} />;
export const Main = (props: Omit<ContainerProps, 'as'>) => <Container as="main" {...props} />;
export const Aside = (props: Omit<ContainerProps, 'as'>) => <Container as="aside" {...props} />;
export const Nav = (props: Omit<ContainerProps, 'as'>) => <Container as="nav" {...props} />;
export const Header = (props: Omit<ContainerProps, 'as'>) => <Container as="header" {...props} />;
export const Footer = (props: Omit<ContainerProps, 'as'>) => <Container as="footer" {...props} />;