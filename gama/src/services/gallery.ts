import { galleryPhotos } from '../data/gallery'
import type { GalleryPhoto } from '../types'

const API_URL = import.meta.env.VITE_GALLERY_API_URL
const MOCK_LATENCY_MS = 350

let cache: Promise<GalleryPhoto[]> | null = null

/**
 * Fotos da galeria.
 * Com `VITE_GALLERY_API_URL` definido (ex.: um endpoint que espelha o feed do Instagram),
 * busca a lista na API; caso contrário, usa as fotos locais com a mesma interface.
 * O resultado fica em cache durante a visita.
 */
export function fetchGalleryPhotos(): Promise<GalleryPhoto[]> {
  cache ??= load().catch((error: unknown) => {
    cache = null
    throw error
  })
  return cache
}

async function load(): Promise<GalleryPhoto[]> {
  if (API_URL) {
    const response = await fetch(API_URL)
    if (!response.ok) throw new Error(`Falha ao carregar a galeria (${response.status})`)
    return (await response.json()) as GalleryPhoto[]
  }

  await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS))
  return galleryPhotos
}
