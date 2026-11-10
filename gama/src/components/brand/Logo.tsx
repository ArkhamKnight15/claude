import { cn } from '../../lib/cn'
import { emblem, fullLogo, wordmark } from './logoPaths'

interface MarkProps {
  className?: string
}

/** Taça com ramos de louro — símbolo da marca. Herda a cor do texto (`currentColor`). */
export function LogoEmblem({ className }: MarkProps) {
  return (
    <svg viewBox={emblem.viewBox} aria-hidden="true" className={cn('h-9 w-auto shrink-0', className)}>
      <path d={emblem.d} fill="currentColor" />
    </svg>
  )
}

/** Logotipo completo empilhado (símbolo + "Distribuidora Gama"), como no perfil oficial. */
export function LogoStacked({ className, title }: MarkProps & { title?: string }) {
  return (
    <svg
      viewBox={fullLogo.viewBox}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={cn('h-auto w-40', className)}
    >
      <path d={fullLogo.d} fill="currentColor" />
    </svg>
  )
}

interface LogoProps {
  tone?: 'dark' | 'light'
  className?: string
}

/** Assinatura horizontal (símbolo à esquerda), a mesma usada nas artes do Instagram. */
export function Logo({ tone = 'dark', className }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', tone === 'dark' ? 'text-ink-950' : 'text-white', className)}>
      <LogoEmblem className="h-9 sm:h-10" />
      <svg viewBox={wordmark.viewBox} aria-hidden="true" className="h-7 w-auto shrink-0 sm:h-8">
        <path d={wordmark.d} fill="currentColor" />
      </svg>
    </span>
  )
}
