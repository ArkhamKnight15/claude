import type { SVGProps } from 'react'

/** Contorno do monograma "PC" da Premium Car, vetorizado a partir do logotipo oficial (viewBox 356 × 139). */
export const MONOGRAM_PATH =
  'M30 0H160L154 32H0Z M154 37 146 81H81L70 139 42 112 52 50H118L121 37Z M179 0H263L257 32H173Z M174 37 166 81H326L356 50H207L205 37Z'

/** Monograma "PC" isolado, na cor atual do texto. */
export function Monogram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 356 139" fill="currentColor" aria-hidden="true" {...props}>
      <path d={MONOGRAM_PATH} />
    </svg>
  )
}
