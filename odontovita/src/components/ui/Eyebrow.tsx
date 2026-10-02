import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface EyebrowProps {
  children: ReactNode
  tone?: 'dark' | 'light'
  className?: string
}

export function Eyebrow({ children, tone = 'dark', className }: EyebrowProps) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em]',
        tone === 'dark' ? 'text-accent-700' : 'text-accent-300',
        className,
      )}
    >
      <span aria-hidden="true" className={cn('h-px w-7', tone === 'dark' ? 'bg-accent-500/70' : 'bg-accent-300/70')} />
      {children}
    </p>
  )
}
