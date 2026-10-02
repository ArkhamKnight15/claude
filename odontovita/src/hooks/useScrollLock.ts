import { useEffect } from 'react'

let activeLocks = 0

/** Bloqueia o scroll da página enquanto `locked` for verdadeiro (suporta bloqueios simultâneos). */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return

    activeLocks += 1
    document.documentElement.style.overflow = 'hidden'

    return () => {
      activeLocks -= 1
      if (activeLocks === 0) document.documentElement.style.overflow = ''
    }
  }, [locked])
}
