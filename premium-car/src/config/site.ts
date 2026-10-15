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
  whatsapp: { number: string; display: string }
  phone: string
  address: string[]
  /** `days` é opcional: sem ele, exibe apenas o horário. */
  hours: { days?: string; hours: string }[]
  social: Record<SocialNetwork, string>
}

export const site: SiteConfig = {
  name: 'Premium Car',

  whatsapp: {
    /** Formato internacional, apenas dígitos: código do país + DDD + número. */
    number: '5521967283192',
    /** Exibição amigável do número. */
    display: '(21) 96728-3192',
  },

  /**
   * PLACEHOLDER — telefone fixo, se houver. Exemplo: '(21) 3456-7890'.
   * Vazio: o rodapé exibe o número do WhatsApp, que também recebe ligações.
   */
  phone: '',
  /** Endereço, uma linha por item. PLACEHOLDER: bairro, cidade e CEP ainda não informados. */
  address: ['Rua Doutor Crespo, 579'],
  /** Horários de atendimento. PLACEHOLDER: dias da semana ainda não informados. */
  hours: [{ hours: '8h às 18h' }],

  /** PLACEHOLDER — informe a URL completa de cada perfil (ex.: 'https://instagram.com/seuperfil'). */
  social: {
    instagram: '',
    facebook: '',
    youtube: '',
  },
}
