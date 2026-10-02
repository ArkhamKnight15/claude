import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from '../components/icons'

/** Dados institucionais fictícios — centralizados para facilitar a troca por dados reais. */
export const clinic = {
  name: 'OdontoVita',
  legalName: 'OdontoVita Odontologia Ltda.',
  tagline: 'Odontologia de alto padrão nos Jardins, em São Paulo.',
  foundedYear: 2010,
  technicalDirector: 'Dra. Helena Vasconcellos',
  technicalDirectorRegistry: 'CRO-SP 00.000',
  phone: {
    display: '(11) 3456-7890',
    href: 'tel:+551134567890',
  },
  whatsapp: {
    display: '(11) 98765-4321',
  },
  email: 'contato@odontovita.com.br',
  address: {
    street: 'Rua das Acácias, 480',
    district: 'Jardim Europa',
    city: 'São Paulo',
    state: 'SP',
    zip: '01449-000',
    mapsHref: 'https://www.google.com/maps/search/?api=1&query=Jardim+Europa+S%C3%A3o+Paulo',
  },
  hours: [
    { days: 'Segunda a sexta', time: '8h às 20h' },
    { days: 'Sábado', time: '8h às 14h' },
    { days: 'Domingo e feriados', time: 'Fechado' },
  ],
  rating: {
    score: 4.9,
    reviews: 600,
  },
  responseTime: '2 horas úteis',
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/', icon: InstagramIcon },
    { label: 'Facebook', href: 'https://www.facebook.com/', icon: FacebookIcon },
    { label: 'YouTube', href: 'https://www.youtube.com/', icon: YoutubeIcon },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: LinkedinIcon },
  ],
} as const
