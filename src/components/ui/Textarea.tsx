import React from 'react';
import { cn } from '../../lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  charCount?: number;
  maxChars?: number;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, charCount, maxChars, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        <div className="flex items-center justify-between">
          {label && (
            <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              {label}
            </label>
          )}
          {typeof charCount === 'number' && typeof maxChars === 'number' && (
            <span
              className={cn(
                'text-xs font-mono',
                charCount > maxChars ? 'text-rose-400 font-bold' : 'text-slate-400',
              )}
            >
              {charCount} / {maxChars}
            </span>
          )}
        </div>
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            'w-full min-h-[120px] rounded-lg border bg-slate-900/90 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 resize-y',
            error
              ? 'border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/50'
              : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500/40',
            className,
          )}
          {...props}
        />
        {error ? (
          <p className="text-xs text-rose-400 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-slate-400">{helperText}</p>
        ) : null}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
