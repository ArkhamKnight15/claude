import { ScanFace, ShieldCheck, Sparkles, Gem } from 'lucide-react'
import { BracesIcon, ImplantIcon } from '../components/icons'
import type { Treatment, TreatmentId } from '../types'

export const treatments: Treatment[] = [
  {
    id: 'implantes',
    title: 'Implantes dentários',
    description:
      'Reposição de dentes com implantes de titânio e cirurgia guiada por tomografia 3D, para resultados estáveis, naturais e duradouros.',
    highlights: ['Cirurgia guiada', 'Planejamento 3D'],
    icon: ImplantIcon,
  },
  {
    id: 'clareamento',
    title: 'Clareamento dental',
    description:
      'Protocolos de consultório e caseiro supervisionado que clareiam com segurança, preservando o esmalte e controlando a sensibilidade.',
    highlights: ['Consultório + caseiro', 'Baixa sensibilidade'],
    icon: Sparkles,
  },
  {
    id: 'lentes',
    title: 'Lentes de contato dental',
    description:
      'Laminados ultrafinos de porcelana, desenhados digitalmente para harmonizar forma, cor e proporção com o seu rosto.',
    highlights: ['Porcelana', 'Mínimo desgaste'],
    icon: Gem,
  },
  {
    id: 'ortodontia',
    title: 'Ortodontia',
    description:
      'Alinhadores transparentes e aparelhos estéticos, com simulação digital do resultado e acompanhamento de cada etapa.',
    highlights: ['Alinhadores invisíveis', 'Simulação 3D'],
    icon: BracesIcon,
  },
  {
    id: 'harmonizacao',
    title: 'Harmonização facial',
    description:
      'Procedimentos minimamente invasivos que equilibram proporções e valorizam seus traços, sempre com uma abordagem natural.',
    highlights: ['Toxina botulínica', 'Preenchedores'],
    icon: ScanFace,
  },
  {
    id: 'preventiva',
    title: 'Odontologia preventiva',
    description:
      'Check-ups digitais, profilaxia e acompanhamento contínuo para manter sua saúde bucal em dia e evitar tratamentos complexos.',
    highlights: ['Check-up digital', 'Profilaxia'],
    icon: ShieldCheck,
  },
]

/** Opções do formulário de agendamento: tratamentos + avaliação geral. */
export const bookingTreatmentOptions: { value: TreatmentId | 'avaliacao'; label: string }[] = [
  { value: 'avaliacao', label: 'Avaliação geral — ainda não sei' },
  ...treatments.map((treatment) => ({ value: treatment.id, label: treatment.title })),
]

export function getTreatmentLabel(value: string): string {
  return bookingTreatmentOptions.find((option) => option.value === value)?.label ?? value
}
