import { useOpenStatus } from '../../hooks/useOpenStatus'
import { cn } from '../../lib/cn'

interface OpenBadgeProps {
  tone?: 'dark' | 'light'
  /** Usa o texto compacto ("Aberto até 22h"). */
  compact?: boolean
  className?: string
}

/** Indicador de funcionamento: ponto pulsante verde quando aberto; texto sempre presente (não depende só da cor). */
export function OpenBadge({ tone = 'dark', compact = false, className }: OpenBadgeProps) {
  const status = useOpenStatus()
  const dot = status.open ? 'bg-success-500' : tone === 'dark' ? 'bg-ink-400' : 'bg-ink-300'

  return (
    <span className={cn('inline-flex items-baseline gap-2', className)}>
      <span aria-hidden="true" className="relative flex size-2 shrink-0 self-center">
        {status.open && <span className={cn('absolute inset-0 animate-pulse-ring rounded-full', dot)} />}
        <span className={cn('relative size-2 rounded-full', dot)} />
      </span>
      {compact ? status.short : status.label}
    </span>
  )
}
