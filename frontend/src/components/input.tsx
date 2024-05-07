import * as React from 'react'

import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

export interface InputProps extends ComponentProps<'input'> {
  error?: string
}

export function Input({
  className,
  type,
  error,
  hidden,
  ...props
}: InputProps) {
  return (
    <>
      <input
        type={type}
        className={cn(
          'flex w-full rounded border border-input bg-transparent px-3 py-2 text-base shadow transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          error &&
            `border-destructive after:content-['*'] after:mt-0.5 after:text-destructive`,
          { hidden },
          className,
        )}
        {...props}
      />
      {error && <p className="text-destructive text-xs mt-2">{error}</p>}
    </>
  )
}
