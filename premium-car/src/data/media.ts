import { photo } from '../lib/photo'
import { photoCatalog, type PhotoKey } from './photos'
import type { Photo } from '../types'

/** Todas as fotos do site, resolvidas a partir do catálogo em `data/photos.ts`. */
export const media = Object.fromEntries(
  (Object.keys(photoCatalog) as PhotoKey[]).map((key) => [key, photo(key)]),
) as Record<PhotoKey, Photo>
