import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('inline-flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-accent-300 uppercase', className)}>
      <span aria-hidden="true" className="h-px w-7 bg-accent-300/60" />
      {children}
    </p>
  )
}
