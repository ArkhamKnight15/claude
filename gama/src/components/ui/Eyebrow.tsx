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
        'inline-flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.14em]',
        tone === 'dark' ? 'text-wine-700' : 'text-gold-300',
        className,
      )}
    >
      <span aria-hidden="true" className={cn('h-px w-7', tone === 'dark' ? 'bg-wine-600/60' : 'bg-gold-300/70')} />
      {children}
    </p>
  )
}
