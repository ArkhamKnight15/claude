import { useEffect } from 'react'
import { initSmoothScroll } from '../lib/smoothScroll'

/** Liga a rolagem suave (Lenis) enquanto o app estiver montado. */
export function useSmoothScroll(): void {
  useEffect(() => initSmoothScroll(), [])
}
