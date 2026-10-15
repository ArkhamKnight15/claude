/**
 * Catálogo de fotografias reais (Unsplash, licença gratuita — https://unsplash.com/license).
 * São imagens ILUSTRATIVAS de bancos de imagem, não trabalhos realizados pela Premium Car.
 *
 * `id` é o identificador da foto em https://unsplash.com/photos/{id}.
 * Para trocar uma foto, substitua o `id` e o `alt` e rode `npm run photos` (ver README).
 */
export const photoCatalog = {
  hero: { id: 'CsIcSVQlQmA', alt: 'Carro esportivo preto com pintura brilhante em ambiente escuro', author: 'Leiada Krözjhen' },
  cta: { id: '5ISiufGmaBw', alt: 'Carro esportivo preto sobre fundo escuro', author: 'Patrik Storm' },
  about: { id: '-mpuoxhLPQk', alt: 'Roda dourada polida em um carro preto', author: 'Lucas Clarysse' },
  differentials: { id: 'Df9XCGX9Y2U', alt: 'Pano de microfibra sobre o capô de um carro preto', author: 'GoGoNano' },

  serviceWash: { id: 'kQdY2pR-ic8', alt: 'Carro escuro coberto de espuma durante a lavagem', author: 'Clarence Tioh' },
  servicePolish: { id: 'q94A6k81lAQ', alt: 'Profissional polindo a pintura de um carro com politriz', author: 'Zac Nielson' },
  serviceCoating: { id: 'tZ9IOhbUNt8', alt: 'Gotas de água sobre uma pintura azul brilhante', author: 'Jimmy Blackwell' },
  serviceInterior: { id: 'OT475SplWgw', alt: 'Carro preto com a porta aberta mostrando o interior', author: 'Martin Katler' },
  serviceLeather: { id: 'aKTAKvDnPcc', alt: 'Interior de carro de luxo com bancos de couro matelassê', author: 'Vadym Kudriavtsev' },
  serviceHeadlights: { id: 'tl7smRHllQY', alt: 'Farol de um carro escuro em close', author: 'Haberdoedas' },

  galleryOne: { id: 'i34LTsTiUKE', alt: 'Carro preto brilhante estacionado à noite, com reflexos na pintura', author: 'Tymur Tsebrenko' },
  galleryTwo: { id: 'MaraDXSaTho', alt: 'Esportivo preto fosco estacionado em um cais', author: 'Flavien' },
  galleryThree: { id: 'IK7iOK-OUuU', alt: 'Roda de um carro de luxo em close', author: 'Ile Ristov' },
  galleryFour: { id: '0eGRcXpR2_g', alt: 'Carro esportivo em uma garagem com pouca luz', author: 'Komorebi Photo' },
  galleryFive: { id: 'YO636mdftR4', alt: 'Esportivo preto estacionado, com linhas da carroceria em destaque', author: 'Gleb Paniotov' },
  gallerySix: { id: 'c-NEiPIxpYI', alt: 'Carro esportivo branco em um estacionamento coberto', author: 'Ryan Spencer' },
} as const

export type PhotoKey = keyof typeof photoCatalog
