import type { Photo } from '../types'

/**
 * Fotos do perfil oficial no Instagram, recortadas sem a interface do app.
 * Para mais nitidez, substitua os arquivos em /public/images/galeria pelos originais
 * (WebP ou AVIF, ~1600px no maior lado) mantendo os mesmos nomes; ajuste `width` e `height`.
 */
const photo = (file: string, alt: string, width: number, height: number): Photo => ({
  src: `/images/galeria/${file}.webp`,
  alt,
  width,
  height,
})

export const photos = {
  royalSalute: photo('royal-salute-21', 'Mão segurando uma miniatura do whisky Royal Salute 21 anos diante da adega', 708, 944),
  rosePiscine: photo('rose-piscine', 'Três garrafas de Rosé Piscine com listras azuis e brancas na prateleira', 708, 944),
  candleToast: photo('brinde-a-luz-de-velas', 'Duas taças de vinho tinto em um brinde à luz de velas', 708, 944),
  latitud: photo('latitud-33', 'Rótulo do vinho argentino Latitud 33 em destaque', 708, 760),
  miluna: photo('miluna-bianco-puglia', 'Garrafa do vinho branco italiano Miluna Bianco Puglia', 708, 944),
  glenlivet: photo('the-glenlivet-12', 'Garrafa de The Glenlivet 12 anos, single malt escocês, em frente às prateleiras', 708, 768),
  casillero: photo('casillero-del-diablo', 'Fileira de vinhos Casillero del Diablo na prateleira da loja', 708, 946),
  sparklingPour: photo('espumante-servido', 'Espumante sendo servido em taças sobre uma mesa de madeira', 708, 776),
  mioloGiuseppe: photo('miolo-giuseppe', 'Garrafas de vinho Miolo Giuseppe na adega', 708, 872),
  friendsToast: photo('brinde-entre-amigas', 'Duas amigas sorrindo e brindando com vinho tinto ao ar livre', 708, 872),
  chacChac: photo('chac-chac', 'Garrafas de vinho Chac Chac vistas de cima', 708, 774),
  rossoPiceno: photo('rosso-piceno', 'Garrafas de vinho tinto italiano Rosso Piceno na prateleira', 708, 942),
  meloncino: photo('meloncino-bottega', 'Garrafa do licor italiano de melão Meloncino Bottega', 708, 758),
  coronaToast: photo('brinde-com-corona', 'Amigos brindando com garrafas de cerveja Corona', 708, 946),
  frangelico: photo('frangelico', 'Garrafas do licor de avelã Frangelico', 708, 806),
  redWineToast: photo('brinde-com-vinho-tinto', 'Várias taças de vinho tinto se encontrando em um brinde', 708, 632),
  mioloLote43: photo('miolo-lote-43', 'Garrafa do vinho Miolo Lote 43 entre outros rótulos', 708, 946),
  casaPerini: photo('casa-perini', 'Espumantes Casa Perini alinhados na prateleira', 708, 946),
  heineken: photo('heineken-no-balde', 'Cervejas Heineken long neck geladas em um balde com gelo', 708, 946),
} satisfies Record<string, Photo>
