import { Armchair, Droplets, Lightbulb, ShieldCheck, Sparkles, SprayCan } from 'lucide-react'
import type { Service } from '../types'
import { media } from './media'

export const services: Service[] = [
  {
    id: 'lavagem',
    title: 'Lavagem detalhada',
    description: 'Limpeza cuidadosa da parte externa e interna do veículo, com atenção a cada acabamento.',
    icon: Droplets,
    image: media.serviceWash,
  },
  {
    id: 'polimento',
    title: 'Polimento técnico',
    description: 'Tratamento da pintura para realçar o brilho e reduzir imperfeições compatíveis com o processo.',
    icon: Sparkles,
    image: media.servicePolish,
  },
  {
    id: 'vitrificacao',
    title: 'Vitrificação de pintura',
    description: 'Camada de proteção para a superfície, que valoriza o acabamento e facilita a manutenção.',
    icon: ShieldCheck,
    image: media.serviceCoating,
  },
  {
    id: 'higienizacao',
    title: 'Higienização interna',
    description: 'Limpeza detalhada de bancos, carpetes, painéis e demais superfícies do interior.',
    icon: SprayCan,
    image: media.serviceInterior,
  },
  {
    id: 'couro',
    title: 'Limpeza e proteção de couro',
    description: 'Cuidado específico para preservar a aparência e o toque dos revestimentos em couro.',
    icon: Armchair,
    image: media.serviceLeather,
  },
  {
    id: 'farois',
    title: 'Restauração de faróis',
    description: 'Tratamento para melhorar a aparência e a transparência, conforme as condições da peça.',
    icon: Lightbulb,
    image: media.serviceHeadlights,
  },
]
