import { Snowflake, Wine } from 'lucide-react'
import { HookahIcon, WhatsAppIcon } from '../components/icons'
import type { Highlight } from '../types'

export const highlights: Highlight[] = [
  {
    title: 'Geladas',
    label: 'Prontas para servir',
    description: 'Cervejas e espumantes direto da geladeira para o seu brinde.',
    icon: Snowflake,
  },
  {
    title: 'Rótulos',
    label: 'Adega selecionada',
    description: 'Vinhos do Brasil, Chile, Argentina, Itália e França.',
    icon: Wine,
  },
  {
    title: 'Premium',
    label: 'Tabacaria selecionada',
    description: 'Narguilé, sedas, isqueiros e acessórios.',
    icon: HookahIcon,
  },
  {
    title: 'WhatsApp',
    label: 'Atendimento direto',
    description: 'Tire dúvidas, peça indicações e faça seu pedido em uma conversa.',
    icon: WhatsAppIcon,
  },
]
