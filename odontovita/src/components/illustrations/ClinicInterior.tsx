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
          <stop offset="0" stopColor="#15233a" />
          <stop offset="1" stopColor="#0e1a2c" />
        </linearGradient>
        <linearGradient id={id('sky')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b355a" />
          <stop offset="0.55" stopColor="#4f7fae" />
          <stop offset="1" stopColor="#c2def5" />
        </linearGradient>
        <linearGradient id={id('niche')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0d182a" />
          <stop offset="1" stopColor="#17263e" />
        </linearGradient>
        <linearGradient id={id('floor')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#101c2e" />
          <stop offset="1" stopColor="#0a1322" />
        </linearGradient>
        <linearGradient id={id('light')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9bc9ee" stopOpacity="0.32" />
          <stop offset="1" stopColor="#9bc9ee" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={id('shadow')}>
          <stop offset="0" stopColor="#000000" stopOpacity="0.45" />
          <stop offset="1" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id('vase')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2b5d93" />
          <stop offset="0.45" stopColor="#9bc9ee" />
          <stop offset="1" stopColor="#305f96" />
        </linearGradient>
        <linearGradient id={id('wood')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5b4a37" />
          <stop offset="1" stopColor="#463829" />
        </linearGradient>
      </defs>

      <rect width="400" height="500" fill={`url(#${id('wall')})`} />

      {/* Nichos laterais */}
      <path d="M22 430V196a44 44 0 0 1 88 0v234z" fill={`url(#${id('niche')})`} />
      <path d="M290 430V196a44 44 0 0 1 88 0v234z" fill={`url(#${id('niche')})`} />

      {/* Arco central com vista para o jardim */}
      <path d="M126 430V184a74 74 0 0 1 148 0v246z" fill="#1c2c45" />
      <path d="M136 430V186a64 64 0 0 1 128 0v244z" fill={`url(#${id('sky')})`} />
      <ellipse cx="170" cy="330" rx="46" ry="38" fill="#0e1a2c" opacity="0.6" />
      <ellipse cx="236" cy="316" rx="40" ry="46" fill="#0e1a2c" opacity="0.5" />
      <rect x="136" y="352" width="128" height="78" fill="#1a2c47" />
      <line x1="136" y1="352" x2="264" y2="352" stroke="#2a4064" strokeWidth="1" />

      {/* Piso e luz natural */}
      <rect y="430" width="400" height="70" fill={`url(#${id('floor')})`} />
      <line x1="0" y1="430" x2="400" y2="430" stroke="#1f2f48" strokeWidth="1" />
      <path d="M136 430h128l60 70H124z" fill={`url(#${id('light')})`} />

      {/* Banco em madeira */}
      <ellipse cx="74" cy="452" rx="62" ry="8" fill={`url(#${id('shadow')})`} />
      <rect x="22" y="404" width="104" height="18" rx="9" fill={`url(#${id('wood')})`} />
      <rect x="34" y="420" width="6" height="28" rx="2" fill="#3d3124" />
      <rect x="108" y="420" width="6" height="28" rx="2" fill="#3d3124" />

      {/* Pedestal, vaso e galhos */}
      <ellipse cx="334" cy="452" rx="44" ry="7" fill={`url(#${id('shadow')})`} />
      <rect x="306" y="372" width="56" height="78" rx="4" fill="#1a2a42" />
      <rect x="306" y="372" width="18" height="78" fill="#142238" />
      <path
        d="M334 372c-13 0-20-9-20-22 0-12 7-20 13-25v-8h14v8c6 5 13 13 13 25 0 13-7 22-20 22z"
        fill={`url(#${id('vase')})`}
      />
      <g fill="none" stroke="#9aaecb" strokeWidth="1.4" strokeLinecap="round">
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
