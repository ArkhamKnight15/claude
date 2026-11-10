import { Beer, GlassWater, PartyPopper, Wine } from 'lucide-react'
import { FlutesIcon, HookahIcon } from '../components/icons'
import type { Service } from '../types'
import { photos } from './media'

export const services: Service[] = [
  {
    id: 'vinhos',
    title: 'Vinhos',
    description:
      'Tintos, brancos e rosés do Brasil, Chile, Argentina, Itália e França. Do rótulo para o dia a dia ao vinho para uma ocasião especial.',
    highlights: ['Tintos, brancos e rosés', 'Nacionais e importados'],
    icon: Wine,
    message: 'Olá! Vim pelo site e gostaria de uma indicação de vinho.',
    photo: photos.casillero,
  },
  {
    id: 'espumantes',
    title: 'Espumantes',
    description:
      'Brut, moscatel e rosé para brindar aniversários, conquistas e datas especiais, com opções geladas na hora.',
    highlights: ['Brut e moscatel', 'Gelados para o brinde'],
    icon: FlutesIcon,
    message: 'Olá! Vim pelo site e gostaria de saber quais espumantes vocês têm.',
    photo: photos.casaPerini,
  },
  {
    id: 'destilados',
    title: 'Destilados e licores',
    description:
      'Whiskies, gins, vodcas e licores, de clássicos do bar de casa a garrafas que viram presente.',
    highlights: ['Whisky e gin', 'Licores importados'],
    icon: GlassWater,
    message: 'Olá! Vim pelo site e gostaria de saber quais whiskies, gins e licores vocês têm.',
    photo: photos.glenlivet,
  },
  {
    id: 'cervejas',
    title: 'Cervejas geladas',
    description:
      'Long necks, latas e garrafas prontas para servir. Para o happy hour, o futebol ou o churrasco de fim de semana.',
    highlights: ['Sempre geladas', 'Long neck e lata'],
    icon: Beer,
    message: 'Olá! Vim pelo site e gostaria de saber quais cervejas geladas vocês têm.',
    photo: photos.heineken,
  },
  {
    id: 'tabacaria',
    title: 'Tabacaria premium',
    description:
      'Itens selecionados para narguilé, sedas, isqueiros e acessórios. Consulte a disponibilidade pelo WhatsApp.',
    highlights: ['Narguilé e acessórios', 'Sedas e isqueiros'],
    icon: HookahIcon,
    message: 'Olá! Vim pelo site e gostaria de saber quais itens de tabacaria vocês têm.',
  },
  {
    id: 'festas',
    title: 'Festas e presentes',
    description:
      'Vai receber em casa ou procura um presente? Conte a ocasião e o orçamento e montamos a seleção ideal para você.',
    highlights: ['Pedidos em quantidade', 'Indicação de presente'],
    icon: PartyPopper,
    message: 'Olá! Vim pelo site e gostaria de ajuda com bebidas para uma festa (ou um presente).',
    photo: photos.friendsToast,
  },
]
