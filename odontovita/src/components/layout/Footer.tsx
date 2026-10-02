import { ArrowUp, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { clinic } from '../../data/clinic'
import { navItems } from '../../data/navigation'
import { treatments } from '../../data/treatments'
import { Logo } from '../brand/Logo'
import { Container } from '../ui/Container'

const CURRENT_YEAR = new Date().getFullYear()

const linkClasses = 'text-[0.9375rem] text-body transition-colors duration-200 hover:text-ink'

function FooterHeading({ children }: { children: string }) {
  return <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-300">{children}</h2>
}

export function Footer() {
  const { address } = clinic

  return (
    <footer className="grain relative overflow-hidden border-t border-line bg-canvas-alt text-body">
      <div aria-hidden="true" className="absolute -top-40 left-1/2 h-80 w-[48rem] -translate-x-1/2 rounded-full bg-accent-500/10 blur-3xl" />
      <Container className="relative pt-20 pb-10 sm:pt-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <Logo />
            <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed">
              {clinic.tagline} Tecnologia digital e atendimento personalizado em cada etapa do seu tratamento.
            </p>
            <ul className="mt-8 flex gap-2.5" aria-label="Redes sociais">
              {clinic.socials.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${clinic.name} no ${label} (abre em nova aba)`}
                    className="flex size-11 items-center justify-center rounded-full text-body ring-1 ring-inset ring-white/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-300 hover:text-navy-950 hover:ring-accent-300"
                  >
                    <Icon className="size-[1.125rem]" />
                  </a>
                </li>
              ))}
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
                <li>
                  <a href="#equipe" className={linkClasses}>
                    Equipe
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <FooterHeading>Tratamentos</FooterHeading>
              <ul className="mt-5 space-y-3">
                {treatments.map((treatment) => (
                  <li key={treatment.id}>
                    <a href="#tratamentos" className={linkClasses}>
                      {treatment.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <FooterHeading>Horários</FooterHeading>
              <dl className="mt-5 space-y-3 text-[0.9375rem]">
                {clinic.hours.map((slot) => (
                  <div key={slot.days}>
                    <dt className="text-muted">{slot.days}</dt>
                    <dd className="font-medium text-ink">{slot.time}</dd>
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
                  <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-300" />
                  <span>
                    {address.street} — {address.district}
                    <br />
                    {address.city}, {address.state} · {address.zip}
                  </span>
                </a>
              </li>
              <li>
                <a href={clinic.phone.href} className={`flex gap-3 ${linkClasses}`}>
                  <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-300" />
                  {clinic.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${clinic.email}`} className={`flex gap-3 ${linkClasses}`}>
                  <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-300" />
                  {clinic.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent-300" />
                <span>Retorno em até {clinic.responseTime}</span>
              </li>
            </ul>
          </address>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-line pt-8 text-[0.8125rem] text-muted md:flex-row md:items-center md:justify-between">
          <div className="space-y-1.5">
            <p>
              © {CURRENT_YEAR} {clinic.legalName} · Responsável técnica: {clinic.technicalDirector} · {clinic.technicalDirectorRegistry}
            </p>
            <p>Clínica fictícia — projeto de demonstração. Imagens de resultados são ilustrativas.</p>
          </div>
          <a
            href="#inicio"
            className="group inline-flex items-center gap-2 self-start font-medium text-body transition-colors hover:text-ink md:self-auto"
          >
            Voltar ao topo
            <span className="flex size-9 items-center justify-center rounded-full ring-1 ring-inset ring-white/15 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-accent-300 group-hover:text-navy-950 group-hover:ring-accent-300">
              <ArrowUp aria-hidden="true" className="size-4" />
            </span>
          </a>
        </div>
      </Container>
    </footer>
  )
}
