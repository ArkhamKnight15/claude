import type { ComponentType, SVGProps } from 'react'

export type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string; strokeWidth?: number | string }>

export interface NavItem {
  id: string
  label: string
}

/** Linhas de produto apresentadas no site. */
export type CategoryId = 'vinhos' | 'espumantes' | 'destilados' | 'cervejas' | 'tabacaria' | 'festas'

export interface Photo {
  /** Caminho em /public (ex.: "/images/galeria/casa-perini.webp"). */
  src: string
  alt: string
  width: number
  height: number
}

export interface Service {
  id: CategoryId
  title: string
  description: string
  highlights: string[]
  icon: IconComponent
  /** Mensagem já preenchida ao abrir o WhatsApp a partir do card. */
  message: string
  /** Sem foto, o card usa uma composição gráfica escura. */
  photo?: Photo
}

export type GalleryCategory = 'vinhos' | 'espumantes' | 'destilados' | 'cervejas' | 'brindes'

export interface GalleryPhoto extends Photo {
  id: string
  category: GalleryCategory
  caption: string
}

export interface Highlight {
  title: string
  label: string
  description: string
  icon: IconComponent
}

export interface Differential {
  id: string
  title: string
  description: string
  icon: IconComponent
  detail?: string
}

export interface ServiceStep {
  title: string
  description: string
  icon: IconComponent
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

/** Horário de um dia da semana (0 = domingo). `close` menor que `open` indica fechamento após a meia-noite. */
export interface DaySchedule {
  day: number
  open: string
  close: string
}
