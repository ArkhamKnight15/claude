/**
 * Dados da empresa — ÚNICO lugar para editar contato, endereço e redes sociais.
 *
 * Campos marcados como PLACEHOLDER ainda não foram informados pela Premium Car.
 * Enquanto estiverem vazios (`''` ou `null`), o site exibe "A definir" no lugar da informação,
 * sem simular um contato que não existe.
 */
export type SocialNetwork = 'instagram' | 'facebook' | 'youtube'

interface SiteConfig {
  name: string
  tagline: string
  whatsapp: { number: string; display: string }
  phone: string
  address: string[]
  hours: { days: string; hours: string }[]
  social: Record<SocialNetwork, string>
}

export const site: SiteConfig = {
  name: 'Premium Car',
  tagline: 'Estética automotiva',

  whatsapp: {
    /**
     * PLACEHOLDER — número do WhatsApp em formato internacional, apenas dígitos:
     * código do país + DDD + número. Exemplo: '5511987654321'.
     */
    number: '',
    /** Exibição amigável do número. PLACEHOLDER — exemplo: '(11) 98765-4321'. */
    display: '',
  },

  /** PLACEHOLDER — telefone fixo para exibição. Exemplo: '(11) 3456-7890'. */
  phone: '',
  /** PLACEHOLDER — endereço completo, uma linha por item. */
  address: [],
  /** PLACEHOLDER — horários de atendimento. Exemplo: { days: 'Seg. a sex.', hours: '8h às 18h' }. */
  hours: [],

  /** PLACEHOLDER — informe a URL completa de cada perfil (ex.: 'https://instagram.com/seuperfil'). */
  social: {
    instagram: '',
    facebook: '',
    youtube: '',
  },
}
