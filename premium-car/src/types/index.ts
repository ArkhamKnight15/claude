import type { LucideIcon } from 'lucide-react'

export interface Photo {
  src: string
  srcSet?: string
  alt: string
  width: number
  height: number
}

export interface NavItem {
  id: string
  label: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: LucideIcon
  image: Photo
}

export interface Differential {
  title: string
  description: string
  icon: LucideIcon
}

export interface GalleryItem {
  id: string
  title: string
  category: string
  image: Photo
  /** Foto do "antes" — informe quando houver registros reais do serviço. */
  before?: Photo
}
