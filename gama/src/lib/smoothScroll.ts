import Lenis from 'lenis'

/** Navegação por âncoras: duração fixa e desaceleração exponencial, independente da distância. */
const ANCHOR_SCROLL = { duration: 1.2, easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)) }

let lenis: Lenis | null = null

export function getSmoothScroll(): Lenis | null {
  return lenis
}

/**
 * Rola suavemente até um elemento e move o foco para ele (acessibilidade de links internos).
 * O espaço da navbar vem do `scroll-padding-top` do CSS, respeitado tanto pelo Lenis quanto pelo navegador.
 */
export function scrollToElement(target: HTMLElement): void {
  if (lenis) lenis.scrollTo(target, { ...ANCHOR_SCROLL, force: true })
  else target.scrollIntoView({ behavior: 'smooth' })

  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
  target.focus({ preventScroll: true })
}

function handleAnchorClick(event: MouseEvent) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return

  const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]')
  const id = link?.getAttribute('href')?.slice(1)
  const target = id ? document.getElementById(decodeURIComponent(id)) : null
  if (!target) return

  event.preventDefault()
  scrollToElement(target)
}

/**
 * Ativa a rolagem suave com inércia (Lenis) e a navegação por âncoras.
 * Com `prefers-reduced-motion`, o Lenis desativa a suavização automaticamente.
 */
export function initSmoothScroll(): () => void {
  lenis = new Lenis({ autoRaf: true, lerp: 0.09, wheelMultiplier: 0.95 })
  document.addEventListener('click', handleAnchorClick)

  return () => {
    document.removeEventListener('click', handleAnchorClick)
    lenis?.destroy()
    lenis = null
  }
}
