import { ArrowUpRight } from 'lucide-react'
import { useEffect } from 'react'
import { navItems } from '../../data/navigation'
import { store } from '../../data/store'
import { useScrollLock } from '../../hooks/useScrollLock'
import { cn } from '../../lib/cn'
import { whatsappLinkProps } from '../../lib/whatsapp'
import { InstagramIcon, WhatsAppIcon } from '../icons'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'
import { OpenBadge } from '../ui/OpenBadge'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  activeId: string
}

export function MobileMenu({ open, onClose, activeId }: MobileMenuProps) {
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

  const footerMotion = itemMotion(navItems.length)

  return (
    <div
      id="menu-mobile"
      inert={!open}
      className={cn(
        'fixed inset-0 z-40 bg-cream transition-[opacity,visibility] duration-500 ease-out-expo lg:hidden',
        open ? 'visible opacity-100' : 'invisible opacity-0',
      )}
    >
      <Container data-lenis-prevent className="flex h-full flex-col overflow-y-auto pt-24 pb-[max(2rem,env(safe-area-inset-bottom))]">
        <nav aria-label="Menu">
          <ul className="border-t border-line">
            {navItems.map((item, index) => (
              <li key={item.id} {...itemMotion(index)}>
                <a
                  href={`#${item.id}`}
                  onClick={onClose}
                  aria-current={activeId === item.id ? 'location' : undefined}
                  className="group flex items-center justify-between border-b border-line py-4 font-display text-[1.75rem] leading-none font-medium text-ink-950"
                >
                  <span className="flex items-center gap-3">
                    {item.label}
                    {activeId === item.id && <span aria-hidden="true" className="size-1.5 rounded-full bg-wine-600" />}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-5 text-ink-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink-950"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={cn(footerMotion.className, 'mt-auto space-y-3 pt-10')} style={footerMotion.style}>
          <ButtonLink
            {...whatsappLinkProps()}
            onClick={onClose}
            variant="whatsapp"
            size="lg"
            className="w-full"
            leadingIcon={<WhatsAppIcon className="size-5" />}
          >
            Chamar no WhatsApp
          </ButtonLink>
          <ButtonLink
            href={store.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="lg"
            className="w-full"
            leadingIcon={<InstagramIcon className="size-[1.125rem] text-wine-700" />}
          >
            {store.instagram.handle}
          </ButtonLink>
          <p className="flex justify-center pt-2 text-sm text-muted">
            <OpenBadge />
          </p>
        </div>
      </Container>
    </div>
  )
}
