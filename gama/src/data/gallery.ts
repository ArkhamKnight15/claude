import type { GalleryCategory, GalleryPhoto, Photo } from '../types'
import { photos } from './media'

export const galleryCategories: { id: GalleryCategory | 'todos'; label: string }[] = [
  { id: 'todos', label: 'Todas' },
  { id: 'vinhos', label: 'Vinhos' },
  { id: 'espumantes', label: 'Espumantes' },
  { id: 'destilados', label: 'Destilados e licores' },
  { id: 'cervejas', label: 'Cervejas' },
  { id: 'brindes', label: 'Brindes' },
]

const item = (id: string, photo: Photo, category: GalleryCategory, caption: string): GalleryPhoto => ({
  id,
  category,
  caption,
  ...photo,
})

/** Ordem pensada para alternar categorias e proporções na grade. */
export const galleryPhotos: GalleryPhoto[] = [
  item('royal-salute', photos.royalSalute, 'destilados', 'Royal Salute 21 anos'),
  item('rose-piscine', photos.rosePiscine, 'vinhos', 'Rosé Piscine'),
  item('brinde-velas', photos.candleToast, 'brindes', 'Um jantar a dois'),
  item('miluna', photos.miluna, 'vinhos', 'Miluna Bianco Puglia'),
  item('corona', photos.coronaToast, 'cervejas', 'Cerveja gelada entre amigos'),
  item('frangelico', photos.frangelico, 'destilados', 'Licor Frangelico'),
  item('latitud', photos.latitud, 'vinhos', 'Latitud 33'),
  item('miolo-giuseppe', photos.mioloGiuseppe, 'vinhos', 'Miolo Giuseppe'),
  item('rosso-piceno', photos.rossoPiceno, 'vinhos', 'Tintos italianos'),
  item('meloncino', photos.meloncino, 'destilados', 'Licor Meloncino Bottega'),
  item('casa-perini', photos.casaPerini, 'espumantes', 'Espumantes Casa Perini'),
  item('brinde-amigas', photos.friendsToast, 'brindes', 'Brindes que viram memórias'),
  item('glenlivet', photos.glenlivet, 'destilados', 'The Glenlivet 12 anos'),
  item('miolo-lote-43', photos.mioloLote43, 'vinhos', 'Miolo Lote 43'),
  item('heineken', photos.heineken, 'cervejas', 'Heineken no balde de gelo'),
  item('casillero', photos.casillero, 'vinhos', 'Casillero del Diablo'),
  item('brinde-tinto', photos.redWineToast, 'brindes', 'Saúde!'),
  item('espumante-servido', photos.sparklingPour, 'espumantes', 'Espumante na taça'),
  item('chac-chac', photos.chacChac, 'vinhos', 'Chac Chac'),
]
