import { useEffect, useState } from 'react'

/** Retorna `true` quando a página foi rolada além de `offset` pixels. */
export function useScrolled(offset = 16): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > offset)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [offset])

  return scrolled
}
