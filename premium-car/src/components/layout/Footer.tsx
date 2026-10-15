import { ArrowUp, ArrowUpRight, Clock, MapPin, MessageCircle, Phone } from 'lucide-react'
import type { ReactNode } from 'react'
import { whatsappMessages } from '../../config/messages'
import { site, type SocialNetwork } from '../../config/site'
import { navigation } from '../../data/navigation'
import { whatsappUrl } from '../../lib/whatsapp'
import { Logo } from '../brand/Logo'
import { socialIcons } from '../icons/socialIcons'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'

/** Informação ainda não fornecida pela empresa (editar em `src/config/site.ts`). */
function Pending() {
  return (
    <span className="text-silver-500 underline decoration-white/20 decoration-dashed underline-offset-4">
      A definir
    </span>
  )
}

function ContactItem({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-full border border-white/10 text-gold-300">
        {icon}
      </span>
      <div className="min-w-0">
        <dt className="text-[0.6875rem] font-semibold tracking-[0.2em] text-silver-500 uppercase">{label}</dt>
        <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-snow">{children}</dd>
      </div>
    </div>
  )
}

const socialNetworks = Object.keys(site.social) as SocialNetwork[]
const iconClass = 'size-[1.125rem]'
const year = new Date().getFullYear()

/** Telefone para ligação: o fixo, se houver; senão, o número do WhatsApp. */
const phone = site.phone
  ? { display: site.phone, tel: `+55${site.phone.replace(/\D/g, '')}` }
  : site.whatsapp.display
    ? { display: site.whatsapp.display, tel: `+${site.whatsapp.number.replace(/\D/g, '')}` }
    : null

/** Contato e rodapé (seção "Contato" da navegação). */
export function Footer() {
  return (
    <footer id="contato" aria-labelledby="contato-title" className="border-t border-white/[0.06] bg-ink-900">
      <Container className="py-20 sm:py-24 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <Logo />
            <h2 id="contato-title" className="sr-only">
              Contato
            </h2>
            <p className="mt-7 max-w-sm text-[0.9375rem] leading-relaxed text-silver-400">
              Estética automotiva com cuidado em cada detalhe. Fale com a gente e agende uma avaliação do seu
              veículo.
            </p>
            <Button
              href={whatsappUrl(whatsappMessages.schedule)}
              external
              icon={<ArrowUpRight className="size-4" />}
              className="mt-8"
            >
              Agendar pelo WhatsApp
            </Button>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-5">
            <dl className="grid gap-7 sm:grid-cols-2">
              <ContactItem icon={<MessageCircle className={iconClass} strokeWidth={1.5} />} label="WhatsApp">
                {site.whatsapp.display ? (
                  <a
                    href={whatsappUrl(whatsappMessages.schedule)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-gold-200"
                  >
                    {site.whatsapp.display}
                  </a>
                ) : (
                  <Pending />
                )}
              </ContactItem>
              <ContactItem icon={<Phone className={iconClass} strokeWidth={1.5} />} label="Telefone">
                {phone ? (
                  <a href={`tel:${phone.tel}`} className="transition-colors hover:text-gold-200">
                    {phone.display}
                  </a>
                ) : (
                  <Pending />
                )}
              </ContactItem>
              <ContactItem icon={<MapPin className={iconClass} strokeWidth={1.5} />} label="Endereço">
                {site.address.length > 0 ? (
                  <address className="not-italic">
                    {site.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                ) : (
                  <Pending />
                )}
              </ContactItem>
              <ContactItem icon={<Clock className={iconClass} strokeWidth={1.5} />} label="Horário">
                {site.hours.length > 0 ? (
                  site.hours.map((slot) => (
                    <span key={`${slot.days}-${slot.hours}`} className="block">
                      {slot.days ? (
                        <>
                          {slot.days}: <span className="text-silver-300">{slot.hours}</span>
                        </>
                      ) : (
                        slot.hours
                      )}
                    </span>
                  ))
                ) : (
                  <Pending />
                )}
              </ContactItem>
            </dl>
          </Reveal>

          <Reveal delay={160} className="grid grid-cols-2 gap-8 lg:col-span-3">
            <nav aria-label="Atalhos do rodapé">
              <p className="text-[0.6875rem] font-semibold tracking-[0.2em] text-silver-500 uppercase">Navegação</p>
              <ul className="mt-4 flex flex-col gap-1">
                {navigation.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="inline-block py-1 text-[0.9375rem] text-silver-300 transition-colors hover:text-gold-200"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="text-[0.6875rem] font-semibold tracking-[0.2em] text-silver-500 uppercase">Redes sociais</p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {socialNetworks.map((network) => {
                  const { label, Icon } = socialIcons[network]
                  const href = site.social[network]
                  const shared = 'grid size-10 place-items-center rounded-full border'
                  return (
                    <li key={network}>
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${label} da Premium Car`}
                          className={`${shared} border-white/15 text-snow transition-colors hover:border-gold-400/50 hover:text-gold-200`}
                        >
                          <Icon className={iconClass} />
                        </a>
                      ) : (
                        <span
                          role="img"
                          aria-label={`${label}: perfil a definir`}
                          title={`${label}: perfil a definir`}
                          className={`${shared} border-dashed border-white/15 text-silver-500`}
                        >
                          <Icon className={iconClass} />
                        </span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>

      <div className="border-t border-white/[0.06]">
        <Container className="flex flex-col gap-4 py-7 pb-24 text-xs text-silver-500 sm:flex-row sm:items-center sm:justify-between sm:pb-7">
          <p>
            © {year} {site.name}. Todos os direitos reservados.
          </p>
          <p>Fotografias meramente ilustrativas.</p>
          <a href="#inicio" className="inline-flex items-center gap-2 self-start transition-colors hover:text-snow sm:mr-20 sm:self-auto">
            Voltar ao topo
            <ArrowUp className="size-3.5" aria-hidden="true" />
          </a>
        </Container>
      </div>
    </footer>
  )
}
