import { ArrowUpRight, Menu } from 'lucide-react'
import { useState } from 'react'
import { whatsappMessages } from '../../config/messages'
import { navigation, sectionIds } from '../../data/navigation'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrolled } from '../../hooks/useScrolled'
import { cn } from '../../lib/cn'
import { whatsappUrl } from '../../lib/whatsapp'
import { Logo } from '../brand/Logo'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { MobileMenu } from './MobileMenu'

/** Cabeçalho fixo: transparente sobre o hero, escuro e translúcido após a rolagem. */
export function Header() {
  const scrolled = useScrolled()
  const active = useActiveSection(sectionIds)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-500',
        scrolled
          ? 'border-white/[0.07] bg-ink-950/80 backdrop-blur-xl backdrop-saturate-150'
          : 'border-transparent bg-transparent',
      )}
    >
      <Container
        className={cn(
          'flex items-center justify-between gap-6 transition-[height] duration-500',
          scrolled ? 'h-[4.25rem]' : 'h-20 lg:h-24',
        )}
      >
        <a href="#inicio" aria-label="Premium Car — voltar ao início" className="rounded-sm">
          <Logo />
        </a>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => {
              const current = active === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={current ? 'location' : undefined}
                    className={cn(
                      'relative block rounded-full px-4 py-2 text-[0.8125rem] font-medium tracking-wide transition-colors duration-300',
                      'after:absolute after:inset-x-4 after:-bottom-0.5 after:h-px after:origin-left after:bg-gold-300 after:transition-transform after:duration-500 after:ease-[var(--ease-out-expo)]',
                      current
                        ? 'text-snow after:scale-x-100'
                        : 'text-silver-300 after:scale-x-0 hover:text-snow hover:after:scale-x-100',
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            href={whatsappUrl(whatsappMessages.schedule)}
            external
            icon={<ArrowUpRight className="size-4" />}
            className="hidden sm:inline-flex"
          >
            Agendar pelo WhatsApp
          </Button>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            className="grid size-11 place-items-center rounded-full border border-white/15 text-snow transition-colors hover:border-white/35 hover:bg-white/[0.06] lg:hidden"
          >
            <Menu className="size-5" strokeWidth={1.6} />
          </button>
        </div>
      </Container>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} active={active} />
    </header>
  )
}
