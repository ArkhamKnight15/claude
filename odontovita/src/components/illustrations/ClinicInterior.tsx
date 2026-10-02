import { useId } from 'react'

/**
 * Ilustração arquitetônica usada como placeholder da foto principal da clínica.
 * Substitua por uma foto real em `src/data/media.ts`.
 */
export function ClinicInterior({ className }: { className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const id = (name: string) => `${uid}-${name}`

  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id('wall')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3efe8" />
          <stop offset="1" stopColor="#e8e1d5" />
        </linearGradient>
        <linearGradient id={id('sky')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9dff2" />
          <stop offset="0.6" stopColor="#eef5fb" />
          <stop offset="1" stopColor="#fbfcfd" />
        </linearGradient>
        <linearGradient id={id('niche')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ddd4c5" />
          <stop offset="1" stopColor="#e9e2d6" />
        </linearGradient>
        <linearGradient id={id('floor')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ddd3c3" />
          <stop offset="1" stopColor="#cfc3ae" />
        </linearGradient>
        <linearGradient id={id('light')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.75" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={id('shadow')}>
          <stop offset="0" stopColor="#0a1628" stopOpacity="0.22" />
          <stop offset="1" stopColor="#0a1628" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id('vase')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#182b47" />
          <stop offset="0.45" stopColor="#364d6f" />
          <stop offset="1" stopColor="#0f1f37" />
        </linearGradient>
        <linearGradient id={id('wood')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d8c4a3" />
          <stop offset="1" stopColor="#c2ab86" />
        </linearGradient>
      </defs>

      <rect width="400" height="500" fill={`url(#${id('wall')})`} />

      {/* Nichos laterais */}
      <path d="M22 430V196a44 44 0 0 1 88 0v234z" fill={`url(#${id('niche')})`} />
      <path d="M290 430V196a44 44 0 0 1 88 0v234z" fill={`url(#${id('niche')})`} />

      {/* Arco central com vista para o jardim */}
      <path d="M126 430V184a74 74 0 0 1 148 0v246z" fill="#d9cfbe" />
      <path d="M136 430V186a64 64 0 0 1 128 0v244z" fill={`url(#${id('sky')})`} />
      <ellipse cx="170" cy="330" rx="46" ry="38" fill="#a9c3dc" opacity="0.35" />
      <ellipse cx="236" cy="316" rx="40" ry="46" fill="#9bb8d4" opacity="0.3" />
      <rect x="136" y="352" width="128" height="78" fill="#e4ecf3" />
      <line x1="136" y1="352" x2="264" y2="352" stroke="#c9d6e2" strokeWidth="1" />

      {/* Piso e luz natural */}
      <rect y="430" width="400" height="70" fill={`url(#${id('floor')})`} />
      <line x1="0" y1="430" x2="400" y2="430" stroke="#c9bca6" strokeWidth="1" />
      <path d="M136 430h128l60 70H124z" fill={`url(#${id('light')})`} />

      {/* Banco em madeira */}
      <ellipse cx="74" cy="452" rx="62" ry="8" fill={`url(#${id('shadow')})`} />
      <rect x="22" y="404" width="104" height="18" rx="9" fill={`url(#${id('wood')})`} />
      <rect x="34" y="420" width="6" height="28" rx="2" fill="#b39a74" />
      <rect x="108" y="420" width="6" height="28" rx="2" fill="#b39a74" />

      {/* Pedestal, vaso e galhos */}
      <ellipse cx="334" cy="452" rx="44" ry="7" fill={`url(#${id('shadow')})`} />
      <rect x="306" y="372" width="56" height="78" rx="4" fill="#efe9df" />
      <rect x="306" y="372" width="18" height="78" fill="#e3dbcd" />
      <path
        d="M334 372c-13 0-20-9-20-22 0-12 7-20 13-25v-8h14v8c6 5 13 13 13 25 0 13-7 22-20 22z"
        fill={`url(#${id('vase')})`}
      />
      <g fill="none" stroke="#263b5a" strokeWidth="1.4" strokeLinecap="round">
        <path d="M332 318c-6-30-22-52-44-70" />
        <path d="M312 270c-8-4-14-12-16-22" />
        <path d="M336 318c2-36 14-64 34-84" />
        <path d="M356 256c6-2 12-8 14-16" />
        <path d="M334 318c-1-26-4-50-12-74" />
      </g>
      <g fill="#9bc9ee">
        <circle cx="288" cy="248" r="3" />
        <circle cx="296" cy="248" r="2.2" />
        <circle cx="370" cy="234" r="3" />
        <circle cx="322" cy="244" r="2.4" />
      </g>
    </svg>
  )
}
