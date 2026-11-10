import { Beer, Gift, PartyPopper, Wine } from 'lucide-react'
import { HookahIcon } from '../components/icons'
import type { IconComponent } from '../types'

export interface QuickMessage {
  label: string
  message: string
  icon: IconComponent
}

/** Atalhos que abrem o WhatsApp com o assunto já escrito. */
export const quickMessages: QuickMessage[] = [
  { label: 'Quero uma indicação de vinho', message: 'Olá! Vim pelo site e gostaria de uma indicação de vinho.', icon: Wine },
  { label: 'Tem cerveja gelada?', message: 'Olá! Vim pelo site. Vocês têm cerveja gelada agora?', icon: Beer },
  { label: 'Procuro um presente', message: 'Olá! Vim pelo site e estou procurando uma bebida para presentear.', icon: Gift },
  { label: 'Bebidas para uma festa', message: 'Olá! Vim pelo site e gostaria de um orçamento de bebidas para uma festa.', icon: PartyPopper },
  { label: 'Itens de tabacaria', message: 'Olá! Vim pelo site e gostaria de saber quais itens de tabacaria vocês têm.', icon: HookahIcon },
]
