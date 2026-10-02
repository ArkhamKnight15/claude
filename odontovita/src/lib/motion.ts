import type { CSSProperties } from 'react'

/** Atraso para a animação de entrada `.enter` (primeira dobra). */
export function enterDelay(ms: number): CSSProperties {
  return { '--enter-delay': `${ms}ms` } as CSSProperties
}
