import type { SVGProps } from 'react'

/** Monograma da Premium Car: escudo facetado com um "P" em traço contínuo. */
export function Emblem(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <path d="M16 2.5 28 8.75v14.5L16 29.5 4 23.25V8.75L16 2.5Z" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 22.5V10h5.25a4.25 4.25 0 0 1 0 8.5H12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  )
}
