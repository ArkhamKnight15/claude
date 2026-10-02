import type { TeamMember } from '../types'

/**
 * Equipe fictícia. Para usar fotos reais, adicione os arquivos em /public/images/equipe
 * e preencha `photo` (ex.: "/images/equipe/helena.webp"). Proporção recomendada: 4:5.
 */
export const team: TeamMember[] = [
  {
    id: 'helena',
    name: 'Dra. Helena Vasconcellos',
    role: 'Fundadora e diretora clínica',
    specialty: 'Implantodontia e Reabilitação Oral',
    bio: 'Mais de 20 anos dedicados a reabilitações complexas e cirurgia guiada. Lidera o planejamento integrado de cada caso da clínica.',
    credentials: ['Mestre em Implantodontia', 'Cirurgia guiada'],
  },
  {
    id: 'rafael',
    name: 'Dr. Rafael Moretti',
    role: 'Coordenador de ortodontia',
    specialty: 'Ortodontia e Alinhadores',
    bio: 'Especialista em ortodontia digital, com foco em tratamentos discretos, previsíveis e adaptados à rotina de cada paciente.',
    credentials: ['Especialista em Ortodontia', 'Alinhadores'],
  },
  {
    id: 'marina',
    name: 'Dra. Marina Albuquerque',
    role: 'Coordenadora de estética',
    specialty: 'Dentística e Harmonização Orofacial',
    bio: 'Referência em lentes de contato dental e harmonização, com um olhar artístico para resultados elegantes e naturais.',
    credentials: ['Especialista em Dentística', 'Harmonização orofacial'],
  },
]
