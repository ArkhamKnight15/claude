import { photoCatalog, type PhotoKey } from '../data/photos'
import type { Photo } from '../types'

/** Larguras geradas pelo script `npm run photos` e usadas no `srcSet`. */
export const PHOTO_WIDTHS = [640, 1080, 1600, 2400] as const

interface ManifestEntry {
  width: number
  height: number
}

/** Fotos baixadas localmente (src/assets/photos), se o script já tiver sido executado. */
const localFiles = import.meta.glob<string>('../assets/photos/*.webp', { eager: true, import: 'default' })
const manifest =
  Object.values(
    import.meta.glob<Record<string, ManifestEntry>>('../assets/photos/manifest.json', { eager: true, import: 'default' }),
  )[0] ?? {}

const localUrl = (key: string, width: number) => localFiles[`../assets/photos/${key}-${width}.webp`]

/** Link oficial de download do Unsplash (redireciona para a imagem no tamanho pedido). */
const remoteUrl = (id: string, width: number) => `https://unsplash.com/photos/${id}/download?force=true&w=${width}`

/**
 * Resolve uma foto do catálogo: arquivos WebP locais quando existirem (rápido e sem dependência externa);
 * caso contrário, a imagem remota do Unsplash.
 */
export function photo(key: PhotoKey): Photo {
  const { id, alt } = photoCatalog[key]
  const local = manifest[key]

  if (local && localUrl(key, PHOTO_WIDTHS[0])) {
    const widths = PHOTO_WIDTHS.filter((width) => localUrl(key, width))
    return {
      src: localUrl(key, widths.at(-1)!),
      srcSet: widths.map((width) => `${localUrl(key, width)} ${width}w`).join(', '),
      alt,
      width: local.width,
      height: local.height,
    }
  }

  return {
    src: remoteUrl(id, 1600),
    srcSet: PHOTO_WIDTHS.map((width) => `${remoteUrl(id, width)} ${width}w`).join(', '),
    alt,
    width: 1600,
    height: 1067,
  }
}
