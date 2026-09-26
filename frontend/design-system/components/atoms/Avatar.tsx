'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import Image from 'next/image';

/**
 * Dynamic Avatar Component
 * User avatars with image, initials, or icon fallback
 */

const avatarVariants = cva(
  'relative inline-flex items-center justify-center overflow-hidden rounded-full bg-muted font-medium',
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-[10px]',
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
        xl: 'h-14 w-14 text-lg',
        '2xl': 'h-16 w-16 text-xl',
        '3xl': 'h-20 w-20 text-2xl',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-lg',
      },
      status: {
        none: '',
        online: 'ring-2 ring-green-500',
        offline: 'ring-2 ring-gray-400',
        away: 'ring-2 ring-yellow-500',
        busy: 'ring-2 ring-red-500',
      },
    },
    defaultVariants: {
      size: 'md',
      shape: 'circle',
      status: 'none',
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
  statusPosition?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, shape, status, src, alt, fallback, statusPosition = 'bottom-right', children, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);

    const getInitials = (name: string) => {
      const parts = name.trim().split(' ');
      if (parts.length === 0) return '?';
      if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
      return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    };

    const statusDotPositions = {
      'top-right': 'top-0 right-0',
      'bottom-right': 'bottom-0 right-0',
      'top-left': 'top-0 left-0',
      'bottom-left': 'bottom-0 left-0',
    };

    const sizeToPixels = {
      xs: 24,
      sm: 32,
      md: 40,
      lg: 48,
      xl: 56,
      '2xl': 64,
      '3xl': 80,
    };

    const pixelSize = sizeToPixels[size || 'md'];

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size, shape, status, className }))}
        {...props}
      >
        {src && !imageError ? (
          <Image
            src={src}
            alt={alt || 'Avatar'}
            fill
            className="object-cover"
            sizes={`${pixelSize}px`}
            onError={() => setImageError(true)}
          />
        ) : fallback ? (
          <span className="select-none">{getInitials(fallback)}</span>
        ) : (
          children || <span className="select-none">?</span>
        )}

        {status && status !== 'none' && (
          <span
            className={cn(
              'absolute h-3 w-3 rounded-full border-2 border-background',
              status === 'online' && 'bg-green-500',
              status === 'offline' && 'bg-gray-400',
              status === 'away' && 'bg-yellow-500',
              status === 'busy' && 'bg-red-500',
              statusDotPositions[statusPosition]
            )}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

// Avatar Group component
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  max?: number;
  size?: VariantProps<typeof avatarVariants>['size'];
  overlap?: 'sm' | 'md' | 'lg';
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, children, max = 3, size = 'md', overlap = 'md', ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const visibleChildren = max ? childrenArray.slice(0, max) : childrenArray;
    const remainingCount = childrenArray.length - visibleChildren.length;

    const overlapSpacing = {
      sm: '-space-x-2',
      md: '-space-x-3',
      lg: '-space-x-4',
    };

    return (
      <div
        ref={ref}
        className={cn('flex items-center', overlapSpacing[overlap], className)}
        {...props}
      >
        {visibleChildren.map((child, index) =>
          React.isValidElement(child) ? (
            React.cloneElement(child as any, {
              key: index,
              size,
              className: cn('ring-2 ring-background', (child as any).props?.className),
            })
          ) : null
        )}
        {remainingCount > 0 && (
          <Avatar
            size={size}
            className="ring-2 ring-background"
            fallback={`+${remainingCount}`}
          />
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';