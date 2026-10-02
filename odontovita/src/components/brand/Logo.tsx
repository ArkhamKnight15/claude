import { cn } from '../../lib/cn'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={cn('size-9 shrink-0', className)}>
      <rect width="40" height="40" rx="12" fill="#ffffff" />
      <path
        d="M20 11.4c-2.2-1.6-5.4-2.2-7.6-.5-2.3 1.8-2.2 5.3-1.1 8 .8 2 1.2 4.1 1.6 6.5.4 2.7 1.1 5 2.7 5 1.8 0 2-2.3 2.4-4.6.3-1.5.8-2.6 2-2.6s1.7 1.1 2 2.6c.4 2.3.6 4.6 2.4 4.6 1.6 0 2.3-2.3 2.7-5 .4-2.4.8-4.5 1.6-6.5 1.1-2.7 1.2-6.2-1.1-8-2.2-1.7-5.4-1.1-7.6.5z"
        fill="none"
        stroke="#0a1628"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M31 6.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" fill="#4f93d4" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark />
      <span className="flex items-baseline text-[1.3125rem] leading-none tracking-[-0.03em] text-ink">
        <span className="font-semibold">Odonto</span>
        <span className="ml-px font-serif text-[1.5rem] italic tracking-[-0.01em]">Vita</span>
      </span>
    </span>
  )
}
