import { AlertCircle } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export const controlClasses =
  'block w-full rounded-xl bg-white/[0.03] px-4 text-[0.9375rem] text-ink ring-1 ring-inset ring-line-strong transition-[box-shadow,background-color] duration-200 placeholder:text-muted hover:ring-navy-500 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-accent-300 aria-[invalid=true]:ring-danger/70 aria-[invalid=true]:focus:ring-danger'

interface FormFieldProps {
  id: string
  label: string
  optional?: boolean
  error?: string
  hint?: ReactNode
  className?: string
  children: ReactNode
}

export function FormField({ id, label, optional, error, hint, className, children }: FormFieldProps) {
  return (
    <div className={className}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold text-ink">
          {label}
          {optional && <span className="ml-1.5 font-normal text-muted">(opcional)</span>}
        </label>
        {hint}
      </div>
      {children}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  )
}

export function FieldError({ id, message, className }: { id: string; message?: string; className?: string }) {
  if (!message) return null
  return (
    <p id={id} className={cn('mt-2 flex items-center gap-1.5 text-[0.8125rem] font-medium text-danger', className)}>
      <AlertCircle aria-hidden="true" className="size-3.5 shrink-0" />
      {message}
    </p>
  )
}
