import { Phone } from 'lucide-react'
import { useEffect, useState } from 'react'
import { clinic } from '../../data/clinic'
import { cn } from '../../lib/cn'
import { useBooking } from '../booking/context'
import { Button, ButtonLink } from '../ui/Button'

/** Atalho fixo de agendamento no mobile: aparece após o hero e some ao chegar no formulário final. */
export function MobileBookingBar() {
  const { openBooking } = useBooking()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const hero = document.getElementById('inicio')
        const finalCta = document.getElementById('agendar')
        const pastHero = hero ? hero.getBoundingClientRect().bottom < 0 : window.scrollY > 600
        const beforeFinalCta = finalCta ? finalCta.getBoundingClientRect().top > window.innerHeight : true
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

  return (
    <div
      inert={!visible}
      className={cn(
        'fixed inset-x-0 bottom-0 z-30 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] transition-[transform,opacity] duration-500 ease-out-expo md:hidden',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-[120%] opacity-0',
      )}
    >
      <div className="flex items-center gap-1.5 rounded-full bg-white/90 p-1.5 shadow-elevated ring-1 ring-navy-950/5 backdrop-blur-xl">
        <ButtonLink
          href={clinic.phone.href}
          variant="ghost"
          className="w-12 shrink-0 px-0"
          aria-label={`Ligar para ${clinic.phone.display}`}
          leadingIcon={<Phone aria-hidden="true" className="size-[1.125rem] text-accent-600" />}
        />
        <Button arrow className="flex-1" onClick={() => openBooking()}>
          Agendar consulta
        </Button>
      </div>
    </div>
  )
}
