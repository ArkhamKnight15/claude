import type { NavItem } from '../types'

export const navigation = [
  { id: 'inicio', label: 'Início' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'resultados', label: 'Resultados' },
  { id: 'sobre', label: 'Sobre nós' },
  { id: 'contato', label: 'Contato' },
] as const satisfies readonly NavItem[]

export const sectionIds = navigation.map((item) => item.id)
