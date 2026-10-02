import type { Stat } from '../types'

export const stats: Stat[] = [
  {
    value: 5000,
    prefix: '+',
    label: 'pacientes atendidos',
    description: 'Tratamentos concluídos desde a fundação',
  },
  {
    value: 15,
    suffix: '+',
    label: 'anos de experiência',
    description: 'Em reabilitação oral e estética',
  },
  {
    value: 98,
    suffix: '%',
    label: 'de satisfação',
    description: 'Em pesquisas após o tratamento',
  },
  {
    value: 4.9,
    decimals: 1,
    label: 'nota média',
    description: 'Em mais de 600 avaliações no Google',
  },
]
