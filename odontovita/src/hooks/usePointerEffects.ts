import { useEffect, type RefObject } from 'react'

const canHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

/**
 * Efeito "spotlight": elementos com `data-spotlight` recebem a posição do cursor
 * nas variáveis CSS `--spot-x` e `--spot-y` (um único listener para a página inteira).
 */
export function useSpotlight(): void {
  useEffect(() => {
    if (!canHover()) return

    let frame = 0
    const handleMove = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>('[data-spotlight]')
      if (!target) return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = target.getBoundingClientRect()
        target.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
        target.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
      })
    }

    document.addEventListener('pointermove', handleMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('pointermove', handleMove)
    }
  }, [])
}

/** Inclinação 3D sutil que acompanha o cursor (desativada em telas touch e com movimento reduzido). */
export function useTilt<T extends HTMLElement>(ref: RefObject<T | null>, maxDegrees = 5): void {
  useEffect(() => {
    const element = ref.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!element || reducedMotion || !canHover()) return

    let frame = 0
    const setTilt = (x: number, y: number) => {
      element.style.setProperty('--tilt-x', `${(-y * maxDegrees).toFixed(2)}deg`)
      element.style.setProperty('--tilt-y', `${(x * maxDegrees).toFixed(2)}deg`)
    }
    const handleMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect()
        setTilt((event.clientX - rect.left) / rect.width - 0.5, (event.clientY - rect.top) / rect.height - 0.5)
      })
    }
    const handleLeave = () => {
      cancelAnimationFrame(frame)
      setTilt(0, 0)
    }

    element.addEventListener('pointermove', handleMove)
    element.addEventListener('pointerleave', handleLeave)
    return () => {
      cancelAnimationFrame(frame)
      element.removeEventListener('pointermove', handleMove)
      element.removeEventListener('pointerleave', handleLeave)
    }
  }, [ref, maxDegrees])
}
