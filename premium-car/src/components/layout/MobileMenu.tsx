import { ArrowUpRight, X } from 'lucide-react'
import type { MouseEvent } from 'react'
import { whatsappMessages } from '../../config/messages'
import { navigation } from '../../data/navigation'
import { useModalDialog } from '../../hooks/useModalDialog'
import { cn } from '../../lib/cn'
import { enterDelay } from '../../lib/motion'
import { scrollToSection } from '../../lib/scroll'
import { whatsappUrl } from '../../lib/whatsapp'
import { Logo } from '../brand/Logo'
import { Button } from '../ui/Button'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  active: string
}

/** Menu em tela cheia para celulares e tablets (diálogo nativo: Esc, foco preso e retorno de foco). */
export function MobileMenu({ open, onClose, active }: MobileMenuProps) {
  const ref = useModalDialog(open, onClose)

  const handleNavigate = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    onClose()
    // Aguarda o diálogo fechar e o scroll da página ser liberado.
    requestAnimationFrame(() => scrollToSection(id))
  }

  return (
    <dialog ref={ref} aria-label="Menu" className="dialog lg:hidden">
      {open && (
        <div className="grain relative flex h-full flex-col bg-ink-950 px-5 pt-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8">
          <div className="flex items-center justify-between">
            <Logo className="h-14" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar menu"
              className="grid size-11 place-items-center rounded-full border border-white/15 text-snow transition-colors hover:border-white/35 hover:bg-white/[0.06]"
            >
              <X className="size-5" strokeWidth={1.6} />
            </button>
          </div>

          <nav aria-label="Navegação principal" className="my-auto py-10">
            <ul className="flex flex-col">
              {navigation.map((item, index) => (
                <li
                  key={item.id}
                  className="enter border-b border-white/[0.07]"
                  style={enterDelay(80 + index * 55)}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => handleNavigate(event, item.id)}
                    aria-current={active === item.id ? 'location' : undefined}
                    className={cn(
                      'group flex items-baseline gap-5 py-5 transition-colors',
                      active === item.id ? 'text-brand-200' : 'text-snow hover:text-brand-200',
                    )}
                  >
                    <span className="font-display text-xs tracking-[0.2em] text-silver-500 tabular-nums">
                      0{index + 1}
                    </span>
                    <span className="display text-[clamp(1.75rem,7vw,2.75rem)] transition-transform duration-300 group-hover:translate-x-1">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="enter flex flex-col gap-4" style={enterDelay(380)}>
            <Button
              href={whatsappUrl(whatsappMessages.schedule)}
              external
              size="lg"
              icon={<ArrowUpRight className="size-4" />}
              className="w-full"
              onClick={onClose}
            >
              Agendar pelo WhatsApp
            </Button>
            <p className="text-center text-xs text-silver-500">Atendimento com avaliação personalizada do veículo.</p>
          </div>
        </div>
      )}
    </dialog>
  )
}
