import type { MediaAsset } from '../types'

/**
 * Imagens do site. Enquanto `src` estiver vazio, cada espaço exibe um placeholder ilustrado.
 * Para usar fotos reais: salve os arquivos em /public/images (WebP ou AVIF, ~1600px no maior lado)
 * e informe o caminho em `src`, junto com `width` e `height` originais.
 */
export const media = {
  aboutMain: {
    alt: 'Recepção da OdontoVita, com luz natural, arcos em madeira clara e poltronas confortáveis',
  },
  aboutDetail: {
    alt: 'Consultório da OdontoVita equipado com scanner intraoral e cadeira odontológica',
  },
} satisfies Record<string, MediaAsset>
