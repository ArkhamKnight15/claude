import { useEffect, useState } from 'react'

const easeOutExpo = (progress: number) => (progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress))

/** Anima um número de 0 até `target` quando `active` se torna verdadeiro. */
export function useCountUp(target: number, active: boolean, duration = 1800): number {
  const [value, setValue] = useState(0)
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (!active || reducedMotion) return

    let frame = 0
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      setValue(target * easeOutExpo(progress))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, reducedMotion, target, duration])

  return active && reducedMotion ? target : value
}
