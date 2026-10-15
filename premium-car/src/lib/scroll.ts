/** Rola até a seção (respeitando `scroll-padding-top`), atualiza a URL e move o foco para ela. */
export function scrollToSection(id: string): void {
  const target = document.getElementById(id)
  if (!target) return

  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  history.replaceState(null, '', `#${id}`)

  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
  target.focus({ preventScroll: true })
}
