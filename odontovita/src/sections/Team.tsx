import { PortraitPlaceholder } from '../components/illustrations/PortraitPlaceholder'
import { Container } from '../components/ui/Container'
import { MediaFrame } from '../components/ui/MediaFrame'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/ui/SectionHeader'
import { team } from '../data/team'
import type { TeamMember } from '../types'

const zoomOnHover = 'transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]'

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <article className="group">
      <MediaFrame
        asset={{ src: member.photo, alt: `Retrato de ${member.name}` }}
        className="aspect-[4/5] rounded-[1.5rem] ring-1 ring-white/10"
        imageClassName={zoomOnHover}
        fallback={<PortraitPlaceholder name={member.name} index={index} className={zoomOnHover} />}
      />
      <div className="mt-6">
        <p className="text-xs font-semibold tracking-[0.16em] text-accent-300 uppercase">{member.role}</p>
        <h3 className="mt-2 text-xl font-semibold tracking-[-0.01em]">{member.name}</h3>
        <p className="mt-1 text-[0.9375rem] font-medium text-body">{member.specialty}</p>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{member.bio}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Formação">
          {member.credentials.map((credential) => (
            <li
              key={credential}
              className="rounded-full bg-white/[0.04] px-3 py-1 text-xs font-medium text-body ring-1 ring-line-strong ring-inset"
            >
              {credential}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export function Team() {
  return (
    <section id="equipe" aria-labelledby="equipe-titulo" className="overflow-x-clip py-24 sm:py-32">
      <Container>
        <SectionHeader
          id="equipe-titulo"
          layout="split"
          eyebrow="Equipe"
          title={
            <>
              Especialistas que unem técnica e <em className="text-accent-300">sensibilidade</em>.
            </>
          }
          description="Um corpo clínico formado por mestres e especialistas que discutem cada caso em conjunto para chegar ao plano de tratamento ideal."
        />

        <ul
          tabIndex={0}
          aria-label="Corpo clínico"
          className="-mx-5 mt-14 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:mt-16 sm:scroll-px-8 sm:gap-6 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:px-0 focus-visible:outline-offset-[-2px]">
          {team.map((member, index) => (
            <Reveal as="li" key={member.id} delay={index * 100} className="w-[80%] shrink-0 snap-start sm:w-[44%] lg:w-auto">
              <TeamCard member={member} index={index} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
