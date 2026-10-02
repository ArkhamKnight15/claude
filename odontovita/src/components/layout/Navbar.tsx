import { Phone } from 'lucide-react'
import { useCallback, useState } from 'react'
import { clinic } from '../../data/clinic'
import { navItems } from '../../data/navigation'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrolled } from '../../hooks/useScrolled'
import { cn } from '../../lib/cn'
import { useBooking } from '../booking/context'
import { Logo } from '../brand/Logo'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { MobileMenu } from './MobileMenu'

const sectionIds = navItems.map((item) => item.id)

export function Navbar() {
  const scrolled = useScrolled(24)
  const activeId = useActiveSection(sectionIds)
  const { openBooking } = useBooking()
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const elevated = scrolled || menuOpen

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500',
          elevated
            ? 'bg-ivory/85 shadow-[0_1px_0_rgb(10_22_40/0.07)] backdrop-blur-xl backdrop-saturate-150'
            : 'bg-transparent',
          menuOpen && 'bg-ivory shadow-none',
        )}
      >
        <Container
          className={cn(
            'flex items-center justify-between gap-6 transition-[height] duration-500 ease-out-expo',
            scrolled ? 'h-16' : 'h-20',
          )}
        >
          <a href="#inicio" aria-label={`${clinic.name} — voltar ao início`} onClick={closeMenu} className="rounded-lg">
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
                        isActive ? 'text-navy-950' : 'text-navy-700 hover:text-navy-950',
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute inset-x-3.5 bottom-1 h-px origin-left bg-navy-950 transition-transform duration-500 ease-out-expo',
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-hover:bg-navy-300',
                        )}
                      />
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <a
              href={clinic.phone.href}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-navy-800 transition-colors hover:text-navy-950 xl:inline-flex"
            >
              <Phone aria-hidden="true" className="size-4 text-accent-600" />
              {clinic.phone.display}
            </a>
            <Button size="sm" arrow className="hidden sm:inline-flex" onClick={() => openBooking()}>
              Agendar consulta
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              className="-mr-2 flex size-11 items-center justify-center rounded-full text-navy-950 transition-colors hover:bg-navy-950/5 lg:hidden"
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
      </header>
      <MobileMenu open={menuOpen} onClose={closeMenu} activeId={activeId} />
    </>
  )
}
