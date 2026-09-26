'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Text, Input, Textarea, type InputProps, type TextareaProps } from '../atoms';

/**
 * FormField Molecule
 * Combines label, input/textarea, and error/helper text
 * Reusable form field pattern
 */

interface BaseFormFieldProps {
  label?: string;
  labelFor?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
}

interface InputFormFieldProps extends BaseFormFieldProps {
  type: 'input';
  inputProps?: InputProps;
}

interface TextareaFormFieldProps extends BaseFormFieldProps {
  type: 'textarea';
  textareaProps?: TextareaProps;
}

type FormFieldProps = InputFormFieldProps | TextareaFormFieldProps;

export const FormField = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FormFieldProps
>(({ label, labelFor, required, error, helperText, className, ...props }, ref) => {
  const hasError = !!error;

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Text
          as="label"
          variant="label"
          htmlFor={labelFor}
          className="block"
        >
          {label}
          {required && (
            <span className="ml-1 text-red-500" aria-label="required">
              *
            </span>
          )}
        </Text>
      )}

      {props.type === 'input' ? (
        <Input
          ref={ref as React.Ref<HTMLInputElement>}
          id={labelFor}
          error={hasError}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? `${labelFor}-error` : helperText ? `${labelFor}-helper` : undefined
          }
          {...props.inputProps}
        />
      ) : (
        <Textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          id={labelFor}
          error={hasError}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? `${labelFor}-error` : helperText ? `${labelFor}-helper` : undefined
          }
          {...props.textareaProps}
        />
      )}

      {error && (
        <Text
          variant="caption"
          color="error"
          id={`${labelFor}-error`}
          role="alert"
        >
          {error}
        </Text>
      )}

      {helperText && !error && (
        <Text
          variant="caption"
          color="muted"
          id={`${labelFor}-helper`}
        >
          {helperText}
        </Text>
      )}
    </div>
  );
});

FormField.displayName = 'FormField';

// Form Group for organizing multiple fields
export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export const FormGroup = React.forwardRef<HTMLDivElement, FormGroupProps>(
  ({ className, title, description, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('space-y-4', className)}
        {...props}
      >
        {(title || description) && (
          <div className="space-y-1">
            {title && <Text variant="h5">{title}</Text>}
            {description && (
              <Text variant="body-sm" color="muted">
                {description}
              </Text>
            )}
          </div>
        )}
        {children}
      </div>
    );
  }
);

FormGroup.displayName = 'FormGroup';

// Form Section for larger forms
export interface FormSectionProps extends React.HTMLAttributes<HTMLFieldSetElement> {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export const FormSection = React.forwardRef<HTMLFieldSetElement, FormSectionProps>(
  ({ className, title, description, children, ...props }, ref) => {
    return (
      <fieldset
        ref={ref}
        className={cn('space-y-6 border-t border-border pt-6 first:border-0 first:pt-0', className)}
        {...props}
      >
        {title && (
          <legend className="text-lg font-semibold">
            {title}
          </legend>
        )}
        {description && (
          <Text variant="body-sm" color="muted" className="mt-1">
            {description}
          </Text>
        )}
        {children}
      </fieldset>
    );
  }
);

FormSection.displayName = 'FormSection';