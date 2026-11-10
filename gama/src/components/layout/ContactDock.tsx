import { Navigation } from 'lucide-react'
import { useEffect, useState } from 'react'
import { store } from '../../data/store'
import { cn } from '../../lib/cn'
import { whatsappLinkProps } from '../../lib/whatsapp'
import { WhatsAppIcon } from '../icons'
import { ButtonLink } from '../ui/Button'

/**
 * Atalhos fixos de contato: barra inferior no mobile e botão flutuante no desktop.
 * Aparecem depois do hero e somem ao chegar na chamada final (que já tem os mesmos botões).
 */
export function ContactDock() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const hero = document.getElementById('inicio')
        const finalCta = document.getElementById('fale-conosco')
        const pastHero = hero ? hero.getBoundingClientRect().bottom < 0 : window.scrollY > 600
        const beforeFinalCta = finalCta ? finalCta.getBoundingClientRect().top > window.innerHeight * 0.85 : true
        setVisible(pastHero && beforeFinalCta)
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const motion = cn(
    'transition-[transform,opacity] duration-500 ease-out-expo',
    visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-[120%] opacity-0',
  )

  return (
    <aside aria-label="Atalhos de contato">
      <div
        inert={!visible}
        className={cn('fixed inset-x-0 bottom-0 z-30 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden', motion)}
      >
        <div className="flex items-center gap-1.5 rounded-full bg-white/90 p-1.5 shadow-elevated ring-1 ring-ink-950/5 backdrop-blur-xl">
          <ButtonLink
            href={store.address.directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            className="w-12 shrink-0 px-0"
            aria-label="Como chegar à loja (abre o mapa em nova aba)"
            leadingIcon={<Navigation aria-hidden="true" className="size-[1.125rem] text-wine-700" />}
          />
          <ButtonLink
            {...whatsappLinkProps()}
            variant="whatsapp"
            className="flex-1"
            leadingIcon={<WhatsAppIcon className="size-5" />}
          >
            Chamar no WhatsApp
          </ButtonLink>
        </div>
      </div>

      <a
        {...whatsappLinkProps()}
        inert={!visible}
        aria-label={`Chamar no WhatsApp ${store.whatsapp.display} (abre em nova aba)`}
        className={cn(
          'group fixed right-6 bottom-6 z-30 hidden items-center gap-3 rounded-full bg-whatsapp py-3 pr-3 pl-5 text-white shadow-elevated ring-1 ring-white/10 transition-colors hover:bg-whatsapp-hover md:flex',
          motion,
        )}
      >
        <span className="text-sm font-semibold">Fale com a gente</span>
        <span className="relative flex size-10 items-center justify-center rounded-full bg-white/15">
          <span aria-hidden="true" className="absolute inset-0 animate-pulse-ring rounded-full bg-white/25" />
          <WhatsAppIcon className="relative size-5 transition-transform duration-300 ease-out-expo group-hover:scale-110" />
        </span>
      </a>
    </aside>
  )
}
