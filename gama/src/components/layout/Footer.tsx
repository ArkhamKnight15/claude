import { ArrowUp, Clock, MapPin } from 'lucide-react'
import { navItems } from '../../data/navigation'
import { services } from '../../data/services'
import { store } from '../../data/store'
import { whatsappLinkProps } from '../../lib/whatsapp'
import { LogoStacked } from '../brand/Logo'
import { InstagramIcon, WhatsAppIcon } from '../icons'
import { Container } from '../ui/Container'
import { OpenBadge } from '../ui/OpenBadge'

const CURRENT_YEAR = new Date().getFullYear()

const linkClasses = 'text-[0.9375rem] text-ink-200 transition-colors duration-200 hover:text-white'
const socialClasses =
  'flex size-11 items-center justify-center rounded-full text-ink-100 ring-1 ring-inset ring-white/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-ink-950 hover:ring-white'

function FooterHeading({ children }: { children: string }) {
  return <h2 className="font-mono text-xs font-medium tracking-[0.14em] text-gold-300 uppercase">{children}</h2>
}

export function Footer() {
  const { address } = store

  return (
    <footer className="grain relative overflow-hidden bg-ink-950 text-ink-200">
      <div aria-hidden="true" className="absolute -top-40 left-1/2 h-80 w-[48rem] -translate-x-1/2 rounded-full bg-wine-700/20 blur-3xl" />
      <Container className="relative pt-20 pb-10 sm:pt-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <LogoStacked className="w-32 text-white" title={store.legalName} />
            <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed">
              {store.tagline} {store.bio}.
            </p>
            <ul className="mt-8 flex gap-2.5" aria-label="Redes sociais">
              <li>
                <a
                  href={store.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${store.name} no Instagram (abre em nova aba)`}
                  className={socialClasses}
                >
                  <InstagramIcon className="size-[1.125rem]" />
                </a>
              </li>
              <li>
                <a
                  {...whatsappLinkProps()}
                  aria-label={`${store.name} no WhatsApp (abre em nova aba)`}
                  className={socialClasses}
                >
                  <WhatsAppIcon className="size-[1.125rem]" />
                </a>
              </li>
            </ul>
          </div>

          <nav aria-label="Rodapé" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6 lg:pl-8">
            <div>
              <FooterHeading>Navegação</FooterHeading>
              <ul className="mt-5 space-y-3">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className={linkClasses}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <FooterHeading>O que temos</FooterHeading>
              <ul className="mt-5 space-y-3">
                {services.map((service) => (
                  <li key={service.id}>
                    <a href="#servicos" className={linkClasses}>
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <FooterHeading>Horários</FooterHeading>
              <dl className="mt-5 space-y-3 text-[0.9375rem]">
                {store.hours.map((slot) => (
                  <div key={slot.days}>
                    <dt className="text-ink-300">{slot.days}</dt>
                    <dd className="font-medium text-white">{slot.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </nav>

          <address className="not-italic lg:col-span-3">
            <FooterHeading>Contato</FooterHeading>
            <ul className="mt-5 space-y-4 text-[0.9375rem]">
              <li>
                <a href={address.mapsHref} target="_blank" rel="noopener noreferrer" className={`flex gap-3 ${linkClasses}`}>
                  <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-300" />
                  <span>
                    {address.street}
                    <br />
                    {address.district}, {address.city} – {address.state}
                  </span>
                </a>
              </li>
              <li>
                <a {...whatsappLinkProps()} className={`flex gap-3 ${linkClasses}`}>
                  <WhatsAppIcon className="mt-0.5 size-4 shrink-0 text-gold-300" />
                  {store.whatsapp.display}
                </a>
              </li>
              <li>
                <a href={store.instagram.href} target="_blank" rel="noopener noreferrer" className={`flex gap-3 ${linkClasses}`}>
                  <InstagramIcon className="mt-0.5 size-4 shrink-0 text-gold-300" />
                  {store.instagram.handle}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-300" />
                <OpenBadge tone="light" className="whitespace-normal" />
              </li>
            </ul>
          </address>
        </div>

        <div className="mt-16 rounded-2xl bg-white/[0.04] px-5 py-4 text-[0.8125rem] leading-relaxed text-ink-200 ring-1 ring-white/10 ring-inset">
          <p>
            <strong className="font-semibold text-white">Venda proibida para menores de 18 anos.</strong> Beba com moderação.
            Se beber, não dirija.
          </p>
          <p className="mt-1">O Ministério da Saúde adverte: fumar causa câncer de pulmão.</p>
        </div>

        <div className="mt-8 flex flex-col gap-6 border-t border-white/10 pt-8 text-[0.8125rem] text-ink-300 md:flex-row md:items-center md:justify-between">
          <p>
            © {CURRENT_YEAR} {store.legalName} · {address.street}, {address.district}, {address.city} – {address.state}
          </p>
          <a
            href="#inicio"
            className="group inline-flex items-center gap-2 self-start font-medium text-ink-100 transition-colors hover:text-white md:self-auto"
          >
            Voltar ao topo
            <span className="flex size-9 items-center justify-center rounded-full ring-1 ring-inset ring-white/15 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-white group-hover:text-ink-950">
              <ArrowUp aria-hidden="true" className="size-4" />
            </span>
          </a>
        </div>
      </Container>
    </footer>
  )
}
