import type { ResultCase } from '../types'

/** Casos ilustrativos: as imagens são simulações digitais, não fotos de pacientes. */
export const resultCases: ResultCase[] = [
  {
    id: 'clareamento',
    label: 'Clareamento',
    treatmentId: 'clareamento',
    title: 'Clareamento a laser com protocolo combinado',
    patient: 'Paciente de 34 anos',
    summary:
      'Dentes escurecidos por café e envelhecimento natural. Combinamos sessões em consultório com moldeiras personalizadas para uso em casa.',
    before: 'stained',
    after: 'ideal-bright',
    facts: [
      { label: 'Duração', value: '3 semanas' },
      { label: 'Consultório', value: '2 sessões' },
      { label: 'Cor', value: 'A3,5 → BL2' },
    ],
  },
  {
    id: 'lentes',
    label: 'Lentes',
    treatmentId: 'lentes',
    title: 'Lentes de contato em porcelana',
    patient: 'Paciente de 41 anos',
    summary:
      'Bordas desgastadas, espaço entre os dentes da frente e cor irregular. Oito laminados ultrafinos devolveram proporção e luminosidade.',
    before: 'worn',
    after: 'ideal-bright',
    facts: [
      { label: 'Duração', value: '4 semanas' },
      { label: 'Laminados', value: '8 em porcelana' },
      { label: 'Cor', value: 'A3 → BL1' },
    ],
  },
  {
    id: 'ortodontia',
    label: 'Alinhadores',
    treatmentId: 'ortodontia',
    title: 'Ortodontia com alinhadores transparentes',
    patient: 'Paciente de 28 anos',
    summary:
      'Apinhamento nos dentes anteriores. O tratamento com alinhadores corrigiu as rotações de forma discreta, sem bráquetes.',
    before: 'crowded',
    after: 'ideal-natural',
    facts: [
      { label: 'Duração', value: '11 meses' },
      { label: 'Alinhadores', value: '22 etapas' },
      { label: 'Consultas', value: 'A cada 8 semanas' },
    ],
  },
]
