import type { ComponentType, SVGProps } from 'react'

export type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string; strokeWidth?: number | string }>

export interface NavItem {
  id: string
  label: string
}

export type TreatmentId =
  | 'implantes'
  | 'clareamento'
  | 'lentes'
  | 'ortodontia'
  | 'harmonizacao'
  | 'preventiva'

export interface Treatment {
  id: TreatmentId
  title: string
  description: string
  highlights: string[]
  icon: IconComponent
}

export interface Stat {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  label: string
  description: string
}

export interface Differential {
  id: string
  title: string
  description: string
  icon: IconComponent
  detail?: string
}

export interface Equipment {
  name: string
  description: string
  icon: IconComponent
}

export type SmilePreset = 'ideal-bright' | 'ideal-natural' | 'stained' | 'worn' | 'crowded'

export interface ResultCase {
  id: string
  label: string
  treatmentId: TreatmentId
  title: string
  patient: string
  summary: string
  before: SmilePreset
  after: SmilePreset
  facts: { label: string; value: string }[]
}

export interface Testimonial {
  id: string
  name: string
  treatment: string
  since: string
  quote: string
  rating: number
}

export interface TeamMember {
  id: string
  name: string
  role: string
  specialty: string
  bio: string
  credentials: string[]
  photo?: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface MediaAsset {
  /** Caminho em /public (ex.: "/images/clinica.webp"). Sem `src`, um placeholder ilustrado é exibido. */
  src?: string
  alt: string
  width?: number
  height?: number
}
