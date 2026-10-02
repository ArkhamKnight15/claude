import { Armchair, Award, Cpu, HeartHandshake, Microscope, ScanLine, Zap } from 'lucide-react'
import { ToothIcon } from '../components/icons'
import type { Differential, Equipment } from '../types'

export const differentials: Differential[] = [
  {
    id: 'tecnologia',
    title: 'Tecnologia de última geração',
    description:
      'Equipamentos de referência mundial integrados em um único fluxo digital: mais precisão no diagnóstico, menos tempo na cadeira e resultados previsíveis.',
    icon: Cpu,
  },
  {
    id: 'atendimento',
    title: 'Atendimento personalizado',
    description:
      'Consultas sem pressa, com um coordenador dedicado ao seu caso do primeiro contato ao pós-tratamento.',
    icon: HeartHandshake,
    detail: 'Consultas de 60 minutos',
  },
  {
    id: 'profissionais',
    title: 'Profissionais especializados',
    description:
      'Equipe formada por especialistas, mestres e doutores que atuam de forma integrada em cada plano de tratamento.',
    icon: Award,
    detail: '12 especialistas',
  },
  {
    id: 'ambiente',
    title: 'Ambiente confortável',
    description:
      'Salas privativas, iluminação natural, música ambiente e sedação consciente para quem sente ansiedade.',
    icon: Armchair,
    detail: 'Salas privativas',
  },
  {
    id: 'diagnostico',
    title: 'Diagnóstico digital',
    description:
      'Escaneamento 3D sem moldagens desconfortáveis. Você visualiza o novo sorriso antes mesmo de começar.',
    icon: ScanLine,
    detail: 'Sem moldagem',
  },
]

export const equipment: Equipment[] = [
  {
    name: 'Scanner intraoral 3D',
    description: 'Modelos digitais em minutos, sem massa de moldagem',
    icon: ScanLine,
  },
  {
    name: 'Tomografia cone beam',
    description: 'Imagens tridimensionais com baixa dose de radiação',
    icon: ToothIcon,
  },
  {
    name: 'Microscópio operatório',
    description: 'Ampliação de até 25× para procedimentos de precisão',
    icon: Microscope,
  },
  {
    name: 'Laser de alta potência',
    description: 'Procedimentos menos invasivos e recuperação mais rápida',
    icon: Zap,
  },
]
