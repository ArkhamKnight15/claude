import type { GalleryItem } from '../types'
import { media } from './media'

/**
 * Galeria de resultados (a ordem define a composição editorial do grid). As fotos atuais são ilustrativas (ver `data/media.ts`).
 * Ao substituir por trabalhos reais, informe `before` para exibir o comparativo antes/depois.
 */
export const gallery: GalleryItem[] = [
  { id: 'brilho', title: 'Brilho profundo', category: 'Polimento técnico', image: media.galleryOne },
  { id: 'protecao', title: 'Superfície protegida', category: 'Vitrificação', image: media.galleryTwo },
  { id: 'reflexos', title: 'Reflexos nítidos', category: 'Polimento técnico', image: media.galleryThree },
  { id: 'detalhe', title: 'Cada linha em evidência', category: 'Lavagem detalhada', image: media.galleryFour },
  { id: 'acabamento', title: 'Acabamento uniforme', category: 'Vitrificação', image: media.galleryFive },
  { id: 'presenca', title: 'Presença marcante', category: 'Lavagem detalhada', image: media.gallerySix },
]
