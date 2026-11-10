import { useCallback, useState } from 'react'
import { navItems } from '../../data/navigation'
import { store } from '../../data/store'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrolled } from '../../hooks/useScrolled'
import { cn } from '../../lib/cn'
import { whatsappLinkProps } from '../../lib/whatsapp'
import { Logo } from '../brand/Logo'
import { WhatsAppIcon } from '../icons'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'
import { OpenBadge } from '../ui/OpenBadge'
import { MobileMenu } from './MobileMenu'

/** O hero entra na lista para que nenhum item fique destacado no topo da página. */
const sectionIds = ['inicio', ...navItems.map((item) => item.id)]

export function Navbar() {
  const scrolled = useScrolled(24)
  const activeId = useActiveSection(sectionIds)
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const elevated = scrolled || menuOpen

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500',
          elevated
            ? 'bg-cream/85 shadow-[0_1px_0_rgb(16_14_13/0.08)] backdrop-blur-xl backdrop-saturate-150'
            : 'bg-transparent',
          menuOpen && 'bg-cream shadow-none',
        )}
      >
        <Container
          className={cn(
            'flex items-center justify-between gap-6 transition-[height] duration-500 ease-out-expo',
            scrolled ? 'h-16' : 'h-20',
          )}
        >
          <a href="#inicio" aria-label={`${store.legalName} — voltar ao início`} onClick={closeMenu} className="rounded-lg">
            <Logo />
          </a>

          <nav aria-label="Navegação principal" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {navItems.map((item) => {
                const isActive = activeId === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? 'location' : undefined}
                      className={cn(
                        'group relative block rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300',
                        isActive ? 'text-ink-950' : 'text-ink-700 hover:text-ink-950',
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute inset-x-3.5 bottom-1 h-px origin-left bg-wine-700 transition-transform duration-500 ease-out-expo',
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-hover:bg-ink-300',
                        )}
                      />
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <OpenBadge compact className="hidden text-sm font-medium text-ink-700 xl:inline-flex" />
            <ButtonLink
              {...whatsappLinkProps()}
              variant="whatsapp"
              size="sm"
              className="hidden sm:inline-flex"
              leadingIcon={<WhatsAppIcon className="size-[1.125rem]" />}
              aria-label={`Chamar no WhatsApp ${store.whatsapp.display} (abre em nova aba)`}
            >
              WhatsApp
            </ButtonLink>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              className="-mr-2 flex size-11 items-center justify-center rounded-full text-ink-950 transition-colors hover:bg-ink-950/5 lg:hidden"
            >
              <span aria-hidden="true" className="relative block h-3 w-5">
                <span
                  className={cn(
                    'absolute top-0 left-0 h-[1.5px] w-full rounded-full bg-current transition-transform duration-500 ease-out-expo',
                    menuOpen && 'translate-y-[5.25px] rotate-45',
                  )}
                />
                <span
                  className={cn(
                    'absolute bottom-0 left-0 h-[1.5px] w-full rounded-full bg-current transition-transform duration-500 ease-out-expo',
                    menuOpen && '-translate-y-[5.25px] -rotate-45',
                  )}
                />
              </span>
            </button>
          </div>
        </Container>
        <div
          aria-hidden="true"
          className="scroll-progress absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-wine-700 via-wine-500 to-gold-400"
        />
      </header>
      <MobileMenu open={menuOpen} onClose={closeMenu} activeId={activeId} />
    </>
  )
}
