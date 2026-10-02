import { ArrowUpRight, Phone } from 'lucide-react'
import { useEffect } from 'react'
import { clinic } from '../../data/clinic'
import { navItems } from '../../data/navigation'
import { useScrollLock } from '../../hooks/useScrollLock'
import { cn } from '../../lib/cn'
import { useBooking } from '../booking/context'
import { Button, ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  activeId: string
}

export function MobileMenu({ open, onClose, activeId }: MobileMenuProps) {
  const { openBooking } = useBooking()
  useScrollLock(open)

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    const desktop = window.matchMedia('(min-width: 1024px)')
    const handleResize = () => desktop.matches && onClose()

    window.addEventListener('keydown', handleKeyDown)
    desktop.addEventListener('change', handleResize)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      desktop.removeEventListener('change', handleResize)
    }
  }, [open, onClose])

  const itemMotion = (index: number) => ({
    className: cn(
      'transition-[opacity,transform] duration-700 ease-out-expo',
      open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
    ),
    style: { transitionDelay: open ? `${90 + index * 50}ms` : '0ms' },
  })

  return (
    <div
      id="menu-mobile"
      inert={!open}
      className={cn(
        'fixed inset-0 z-40 bg-canvas transition-[opacity,visibility] duration-500 ease-out-expo lg:hidden',
        open ? 'visible opacity-100' : 'invisible opacity-0',
      )}
    >
      <Container className="flex h-full flex-col overflow-y-auto pt-24 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <nav aria-label="Menu">
          <ul className="border-t border-line">
            {navItems.map((item, index) => (
              <li key={item.id} {...itemMotion(index)}>
                <a
                  href={`#${item.id}`}
                  onClick={onClose}
                  aria-current={activeId === item.id ? 'location' : undefined}
                  className="group flex items-center justify-between border-b border-line py-4 font-serif text-[2rem] leading-none text-ink"
                >
                  <span className="flex items-center gap-3">
                    {item.label}
                    {activeId === item.id && <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-300" />}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-5 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div {...itemMotion(navItems.length)} className={cn(itemMotion(navItems.length).className, 'mt-auto space-y-3 pt-10')}>
          <Button
            size="lg"
            arrow
            className="w-full"
            onClick={() => {
              onClose()
              openBooking()
            }}
          >
            Agendar consulta
          </Button>
          <ButtonLink
            href={clinic.phone.href}
            variant="secondary"
            size="lg"
            className="w-full"
            leadingIcon={<Phone aria-hidden="true" className="size-4 text-accent-300" />}
          >
            {clinic.phone.display}
          </ButtonLink>
          <p className="pt-2 text-center text-sm text-muted">Seg. a sex. 8h–20h · Sáb. 8h–14h</p>
        </div>
      </Container>
    </div>
  )
}
