import type { GalleryItem } from '../types'
import { media } from './media'

/**
 * Galeria de resultados (a ordem define a composição editorial do grid).
 * As fotos atuais são ilustrativas (ver `data/photos.ts`).
 * Ao substituir por trabalhos reais, informe `before` para exibir o comparativo antes/depois.
 */
export const gallery: GalleryItem[] = [
  { id: 'brilho', title: 'Brilho profundo', category: 'Polimento técnico', image: media.galleryOne },
  { id: 'fosco', title: 'Acabamento fosco preservado', category: 'Lavagem detalhada', image: media.galleryTwo },
  { id: 'rodas', title: 'Rodas em evidência', category: 'Lavagem detalhada', image: media.galleryThree },
  { id: 'presenca', title: 'Presença marcante', category: 'Polimento técnico', image: media.galleryFour },
  { id: 'linhas', title: 'Cada linha em destaque', category: 'Vitrificação', image: media.galleryFive },
  { id: 'branco', title: 'Branco impecável', category: 'Vitrificação', image: media.gallerySix },
]
