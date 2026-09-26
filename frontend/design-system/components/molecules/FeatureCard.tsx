'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Text,
  Badge,
  Button,
} from '../atoms';
import { ArrowRight } from 'lucide-react';

/**
 * FeatureCard Molecule
 * Reusable card for showcasing features, goals, or content
 * Combines multiple atoms into a cohesive component
 */

export interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  image?: {
    src: string;
    alt?: string;
  };
  badge?: {
    text: string;
    variant?: React.ComponentProps<typeof Badge>['variant'];
  };
  tags?: string[];
  footer?: {
    text: string;
    actionText?: string;
    onAction?: () => void;
  };
  variant?: 'default' | 'compact' | 'horizontal';
  interactive?: boolean;
  onClick?: () => void;
}

export const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({
    className,
    title,
    description,
    image,
    badge,
    tags,
    footer,
    variant = 'default',
    interactive = false,
    onClick,
    children,
    ...props
  }, ref) => {
    const isHorizontal = variant === 'horizontal';

    const cardContent = (
      <>
        {/* Image Section */}
        {image && !isHorizontal && (
          <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
            <Image
              src={image.src}
              alt={image.alt || title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {badge && (
              <div className="absolute top-3 left-3">
                <Badge variant={badge.variant}>
                  {badge.text}
                </Badge>
              </div>
            )}
          </div>
        )}

        <div className={cn(
          'flex',
          isHorizontal ? 'gap-4' : 'flex-col'
        )}>
          {/* Horizontal Image */}
          {image && isHorizontal && (
            <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg">
              <Image
                src={image.src}
                alt={image.alt || title}
                fill
                className="object-cover"
                sizes="128px"
              />
            </div>
          )}

          <div className="flex-1">
            <CardHeader className={variant === 'compact' ? 'pb-3' : undefined}>
              {badge && !image && (
                <Badge variant={badge.variant} className="mb-2 w-fit">
                  {badge.text}
                </Badge>
              )}
              <CardTitle className={variant === 'compact' ? 'text-lg' : undefined}>
                {title}
              </CardTitle>
              <CardDescription
                className={cn(
                  variant === 'compact' ? 'line-clamp-2' : 'line-clamp-3'
                )}
              >
                {description}
              </CardDescription>
            </CardHeader>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      size="xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            )}

            {/* Custom content */}
            {children && <CardContent>{children}</CardContent>}

            {/* Footer */}
            {footer && (
              <CardFooter className="justify-between">
                <Text variant="caption" color="muted">
                  {footer.text}
                </Text>
                {footer.actionText && (
                  <Button
                    size="sm"
                    variant={interactive ? 'primary' : 'ghost'}
                    onClick={(e) => {
                      e.stopPropagation();
                      footer.onAction?.();
                    }}
                    rightIcon={<ArrowRight className="h-3 w-3" />}
                  >
                    {footer.actionText}
                  </Button>
                )}
              </CardFooter>
            )}
          </div>
        </div>
      </>
    );

    return (
      <Card
        ref={ref}
        className={cn(
          variant === 'horizontal' && 'flex',
          className
        )}
        interactive={interactive || !!onClick}
        onClick={onClick}
        {...props}
      >
        {cardContent}
      </Card>
    );
  }
);

FeatureCard.displayName = 'FeatureCard';

// Feature Grid for displaying multiple cards
export interface FeatureGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}

export const FeatureGrid = React.forwardRef<HTMLDivElement, FeatureGridProps>(
  ({ className, children, columns = 3, gap = 'md', ...props }, ref) => {
    const columnClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    };

    const gapClasses = {
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          columnClasses[columns],
          gapClasses[gap],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

FeatureGrid.displayName = 'FeatureGrid';