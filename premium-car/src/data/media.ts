import { unsplash } from '../lib/unsplash'
import type { Photo } from '../types'

/**
 * Fotografias do site — imagens ILUSTRATIVAS de bancos de imagem (Unsplash), não trabalhos da Premium Car.
 *
 * Para usar fotos reais: salve os arquivos em /public/images (WebP, ~1920px no maior lado) e troque o
 * item por `{ src: '/images/arquivo.webp', alt, width, height }`. Se uma imagem não carregar,
 * o componente <Picture /> exibe um fundo grafite neutro no lugar.
 */
const photo = (id: string, alt: string, width = 1920, height = 1280): Photo => ({
  ...unsplash(id),
  alt,
  width,
  height,
})

export const media = {
  hero: photo('1503376780353-7e6692767b70', 'Carro esportivo com pintura brilhante sob iluminação dramática'),
  differentials: photo(
    '1601362840469-51e4d8d58785',
    'Profissional realizando a limpeza cuidadosa da carroceria de um veículo',
    1280,
    1600,
  ),
  about: photo('1544636331-e26879cd4d9b', 'Esportivo de luxo com acabamento impecável e reflexos controlados', 1280, 1600),
  cta: photo('1618843479313-40f8afb4b4d8', 'Detalhe de um veículo premium em ambiente escuro'),

  serviceWash: photo('1520340356584-f9917d1eea6f', 'Veículo coberto de espuma durante a lavagem detalhada', 1080, 810),
  servicePolish: photo('1607860108855-64acf2078ed9', 'Politriz em uso sobre a pintura de um carro', 1080, 810),
  serviceCoating: photo('1552519507-da3b142c6e3d', 'Pintura automotiva com brilho profundo e reflexos nítidos', 1080, 810),
  serviceInterior: photo('1489824904134-891ab64532f1', 'Interior de veículo com painel e bancos limpos', 1080, 810),
  serviceLeather: photo('1549399542-7e3f8b79c341', 'Bancos de couro de um carro de alto padrão', 1080, 810),
  serviceHeadlights: photo('1580274455191-1c62238fa333', 'Farol dianteiro de um carro esportivo', 1080, 810),

  galleryOne: photo('1494976388531-d1058494cdd8', 'Esportivo com pintura brilhante estacionado ao ar livre'),
  galleryTwo: photo('1583121274602-3e2820c69888', 'Superesportivo com carroceria polida', 1280, 1600),
  galleryThree: photo('1492144534655-ae79c964c9d7', 'Carro de luxo fotografado em ângulo baixo', 1440, 1440),
  galleryFour: photo('1542362567-b07e54358753', 'Esportivo com reflexos marcantes na lateral'),
  galleryFive: photo('1605559424843-9e4c228bf1c2', 'Sedã premium com acabamento de pintura uniforme', 1440, 1440),
  gallerySix: photo('1617814076367-b759c7d7e738', 'Veículo de alto padrão em fundo escuro', 1280, 1600),
} satisfies Record<string, Photo>
