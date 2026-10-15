import { BadgeCheck, FlaskConical, Handshake, ScanSearch } from 'lucide-react'
import type { Differential } from '../types'

export const differentials: Differential[] = [
  {
    title: 'Atenção aos mínimos detalhes',
    description: 'Frisos, emblemas, rodas e acabamentos recebem o mesmo cuidado que a pintura.',
    icon: ScanSearch,
  },
  {
    title: 'Produtos e técnicas adequados',
    description: 'Cada superfície pede um tratamento próprio — e é assim que trabalhamos.',
    icon: FlaskConical,
  },
  {
    title: 'Atendimento personalizado',
    description: 'Avaliamos o seu veículo e indicamos o cuidado que faz sentido para ele.',
    icon: Handshake,
  },
  {
    title: 'Compromisso com o acabamento',
    description: 'O serviço só termina quando o resultado está à altura do seu carro.',
    icon: BadgeCheck,
  },
]
