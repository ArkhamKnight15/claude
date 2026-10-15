const WIDTHS = [480, 768, 1080, 1440, 1920] as const

/** Monta `src` e `srcSet` otimizados (formato automático, qualidade 70) para uma foto do Unsplash. */
export function unsplash(id: string, maxWidth = 1920) {
  const url = (width: number) =>
    `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=70&w=${width}`
  const widths = WIDTHS.filter((width) => width <= maxWidth)

  return {
    src: url(widths.at(-1) ?? maxWidth),
    srcSet: widths.map((width) => `${url(width)} ${width}w`).join(', '),
  }
}
