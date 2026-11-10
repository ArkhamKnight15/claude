import type { DaySchedule } from '../types'

const ADDRESS_QUERY = 'Gama Distribuidora, CLS 404 Bloco D Loja 01, Asa Sul, Brasília - DF'

/**
 * Dados institucionais, centralizados para facilitar a manutenção.
 * Endereço, WhatsApp e Instagram vêm do perfil oficial da loja.
 */
export const store = {
  name: 'Gama Distribuidora',
  legalName: 'Gama Distribuidora de Bebidas e Tabacaria',
  tagline: 'Sua distribuidora na Asa Sul.',
  bio: 'Bebidas geladas • Tabacaria premium',
  whatsapp: {
    display: '(61) 99963-4341',
    /** Número no formato internacional, só dígitos (usado em wa.me). */
    number: '5561999634341',
  },
  instagram: {
    handle: '@gama.distribuidoradf',
    href: 'https://www.instagram.com/gama.distribuidoradf/',
  },
  address: {
    street: 'CLS 404, Bloco D, Loja 01',
    district: 'Asa Sul',
    city: 'Brasília',
    state: 'DF',
    mapsHref: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS_QUERY)}`,
    directionsHref: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS_QUERY)}`,
    wazeHref: `https://waze.com/ul?q=${encodeURIComponent('CLS 404 Bloco D Asa Sul Brasília')}&navigate=yes`,
    embedSrc: `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS_QUERY)}&z=17&output=embed`,
  },
  /**
   * ATENÇÃO: horários provisórios. Confirme com a loja antes de publicar,
   * pois eles alimentam o selo "Aberto agora" exibido no site.
   */
  schedule: [
    { day: 0, open: '10:00', close: '20:00' },
    { day: 1, open: '10:00', close: '22:00' },
    { day: 2, open: '10:00', close: '22:00' },
    { day: 3, open: '10:00', close: '22:00' },
    { day: 4, open: '10:00', close: '22:00' },
    { day: 5, open: '10:00', close: '23:00' },
    { day: 6, open: '10:00', close: '23:00' },
  ] satisfies DaySchedule[],
  /** Resumo exibido em listas de horário. */
  hours: [
    { days: 'Segunda a quinta', time: '10h às 22h' },
    { days: 'Sexta e sábado', time: '10h às 23h' },
    { days: 'Domingo e feriados', time: '10h às 20h' },
  ],
  timeZone: 'America/Sao_Paulo',
} as const

/** Mensagem padrão dos botões "Chamar no WhatsApp". */
export const DEFAULT_WHATSAPP_MESSAGE = 'Olá! Vim pelo site da Gama Distribuidora e gostaria de mais informações.'
