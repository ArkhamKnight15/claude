import { useId } from 'react'
import type { SmilePreset } from '../../types'

/**
 * Ilustração paramétrica de uma arcada em vista frontal (estilo planejamento digital do sorriso).
 * Cada preset ajusta cor, posição e formato dos dentes para simular casos de antes/depois.
 */

type ToothType = 'incisor' | 'canine' | 'premolar' | 'molar'
type Side = 'L' | 'R'
type ShadeKey = 'bright' | 'natural' | 'stained' | 'worn'

interface ToothMod {
  dx?: number
  dy?: number
  rot?: number
  /** Encurta a borda incisal (em px), simulando desgaste. */
  shorten?: number
  chipped?: boolean
  /** Escurece o dente para sugerir posição recuada. */
  recess?: number
}

interface PresetConfig {
  shade: ShadeKey
  /** Espaço extra entre os incisivos centrais (diastema). */
  diastema?: number
  upper?: Partial<Record<`${Side}${number}`, ToothMod>>
  lower?: Partial<Record<`${Side}${number}`, ToothMod>>
}

const VIEW_WIDTH = 480
const VIEW_HEIGHT = 260
const CENTER_X = VIEW_WIDTH / 2

const TYPES: ToothType[] = ['incisor', 'incisor', 'canine', 'premolar', 'premolar', 'molar']

const UPPER = {
  widths: [46, 35, 28, 22, 18, 15],
  cervical: [60, 66, 57, 66, 71, 76],
  incisal: [140, 131, 135, 127, 122, 117],
}

const LOWER = {
  widths: [27, 28, 28, 24, 22, 22],
  cervical: [182, 181, 186, 181, 178, 175],
  incisal: [127, 127, 124, 123, 119, 116],
}

const DEPTH_SHADOW = [0, 0.03, 0.08, 0.16, 0.24, 0.32]

const SHADES: Record<ShadeKey, { stops: [string, string, string]; edge: string }> = {
  bright: { stops: ['#dfe7f0', '#fbfcfe', '#e8eff7'], edge: '#8fa3bb' },
  natural: { stops: ['#e2d9c6', '#f6f2ea', '#e6e9ec'], edge: '#ada18c' },
  stained: { stops: ['#c4a062', '#e0c991', '#d8caa6'], edge: '#9c7f4a' },
  worn: { stops: ['#c9b083', '#e3d4b0', '#d3cfc2'], edge: '#a08b62' },
}

const PRESETS: Record<SmilePreset, PresetConfig> = {
  'ideal-bright': { shade: 'bright' },
  'ideal-natural': { shade: 'natural' },
  stained: { shade: 'stained' },
  worn: {
    shade: 'worn',
    diastema: 7,
    upper: {
      L0: { shorten: 9, chipped: true },
      R0: { shorten: 6 },
      L1: { shorten: 5 },
      R1: { shorten: 9, chipped: true },
      L2: { shorten: 6 },
      R2: { shorten: 7 },
    },
    lower: { L0: { shorten: 4 }, R0: { shorten: 5 }, L1: { shorten: 3 } },
  },
  crowded: {
    shade: 'natural',
    upper: {
      L0: { rot: 4, dx: 2 },
      R0: { rot: -3, dx: -1 },
      L1: { rot: -13, dx: 5, dy: -3, recess: 0.14 },
      R1: { rot: 11, dx: -5, dy: 2 },
      R2: { dx: -4, dy: -11 },
      L2: { dx: 2, dy: -3 },
    },
    lower: {
      L0: { rot: 8, dx: 2 },
      R0: { rot: -10, dx: -3, recess: 0.12 },
      L1: { rot: -6, dx: 1 },
      R1: { rot: 5 },
    },
  },
}

interface ToothGeometry {
  key: string
  index: number
  type: ToothType
  x0: number
  width: number
  cervical: number
  incisal: number
  mod: ToothMod
}

function buildArch(
  arch: typeof UPPER,
  mods: PresetConfig['upper'] = {},
  diastema = 0,
  isUpper: boolean,
): ToothGeometry[] {
  const teeth: ToothGeometry[] = []
  for (const side of ['L', 'R'] as const) {
    let offset = isUpper ? diastema / 2 : 0
    arch.widths.forEach((width, index) => {
      const mod = mods[`${side}${index}`] ?? {}
      const x0 = side === 'R' ? CENTER_X + offset : CENTER_X - offset - width
      const direction = isUpper ? -1 : 1
      teeth.push({
        key: `${side}${index}`,
        index,
        type: TYPES[index],
        x0: x0 + (mod.dx ?? 0),
        width,
        cervical: arch.cervical[index] + (mod.dy ?? 0),
        incisal: arch.incisal[index] + (mod.dy ?? 0) + direction * (mod.shorten ?? 0),
        mod,
      })
      offset += width + 1
    })
  }
  return teeth
}

/** Gera o contorno de uma coroa. Funciona para as duas arcadas: a direção vem de cervical → incisal. */
function crownPath({ x0, width: w, cervical, incisal, type, mod }: ToothGeometry): string {
  const h = incisal - cervical
  const y = (k: number) => (cervical + h * k).toFixed(1)
  const x = (k: number) => (x0 + w * k).toFixed(1)
  const hidden = -16 / Math.abs(h)
  const neck = 0.07

  const start = `M${x(neck)} ${y(hidden)} L${x(neck)} ${y(0)} C${x(0)} ${y(0.16)} ${x(0)} ${y(0.4)} ${x(0)} ${y(0.72)}`
  const end = `C${x(1)} ${y(0.4)} ${x(1)} ${y(0.16)} ${x(1 - neck)} ${y(0)} L${x(1 - neck)} ${y(hidden)} Z`

  if (type === 'canine') {
    return `${start} Q${x(0.04)} ${y(0.93)} ${x(0.28)} ${y(0.97)} Q${x(0.44)} ${y(1.01)} ${x(0.52)} ${y(1.02)} Q${x(0.62)} ${y(1)} ${x(0.76)} ${y(0.96)} Q${x(0.97)} ${y(0.92)} ${x(1)} ${y(0.72)} ${end}`
  }

  const radius = type === 'incisor' ? 0.2 : type === 'premolar' ? 0.34 : 0.42
  const edge = mod.chipped
    ? `L${x(0.42)} ${y(1)} L${x(0.56)} ${y(0.955)} L${x(0.68)} ${y(0.99)} L${x(1 - radius)} ${y(1)}`
    : `L${x(1 - radius)} ${y(1)}`

  return `${start} Q${x(0)} ${y(1)} ${x(radius)} ${y(1)} ${edge} Q${x(1)} ${y(1)} ${x(1)} ${y(0.72)} ${end}`
}

/** Gengiva com recortes (zênites e papilas) acompanhando o colo de cada dente. */
function gumPath(teeth: ToothGeometry[], isUpper: boolean): string {
  const sorted = [...teeth].sort((a, b) => a.x0 - b.x0)
  const direction = isUpper ? 1 : -1
  const papillaDrop = isUpper ? 17 : 13
  const edgeY = isUpper ? 0 : VIEW_HEIGHT
  /** Altura em que as gengivas se encontram nas laterais (comissura). */
  const sideY = isUpper ? 116 : 124

  const papilla = (a?: ToothGeometry, b?: ToothGeometry) => {
    const cervicals = [a?.cervical, b?.cervical].filter((value): value is number => value !== undefined)
    const base = isUpper ? Math.max(...cervicals) : Math.min(...cervicals)
    return base + direction * papillaDrop
  }

  const first = sorted[0]
  let d = `M-20 ${edgeY} L-20 ${sideY} Q${first.x0 - 26} ${sideY} ${first.x0} ${papilla(first)}`

  sorted.forEach((tooth, i) => {
    const next = sorted[i + 1]
    const startY = papilla(sorted[i - 1] ?? tooth, tooth)
    const endY = papilla(tooth, next ?? tooth)
    const endX = next ? (tooth.x0 + tooth.width + next.x0) / 2 : tooth.x0 + tooth.width
    const zenith = tooth.cervical - direction * 3
    const controlY = 2 * zenith - (startY + endY) / 2
    const controlX = tooth.x0 + tooth.width / 2
    d += ` Q${controlX.toFixed(1)} ${controlY.toFixed(1)} ${endX.toFixed(1)} ${endY.toFixed(1)}`
  })

  const last = sorted[sorted.length - 1]
  const lastEdge = last.x0 + last.width
  d += ` Q${lastEdge + 26} ${sideY} ${VIEW_WIDTH + 20} ${sideY} L${VIEW_WIDTH + 20} ${edgeY} Z`
  return d
}

function drawOrder(teeth: ToothGeometry[]) {
  return [...teeth].sort((a, b) => b.index - a.index)
}

const UPPER_FDI = { L: 1, R: 2 } as const

interface SmileIllustrationProps {
  preset: SmilePreset
  /** Exibe as linhas-guia do planejamento digital (linha média, arco do sorriso, numeração). */
  showGuides?: boolean
  className?: string
  title?: string
  /** Use `xMidYMid slice` para preencher containers mais altos que 48:26, cortando as laterais. */
  preserveAspectRatio?: string
}

export function SmileIllustration({
  preset,
  showGuides = false,
  className,
  title,
  preserveAspectRatio = 'xMidYMid meet',
}: SmileIllustrationProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const config = PRESETS[preset]
  const shade = SHADES[config.shade]
  const upper = buildArch(UPPER, config.upper, config.diastema, true)
  const lower = buildArch(LOWER, config.lower, 0, false)

  const ids = {
    toothUpper: `${uid}-tu`,
    toothLower: `${uid}-tl`,
    gloss: `${uid}-gl`,
    gumUpper: `${uid}-gu`,
    gumLower: `${uid}-gd`,
    vignette: `${uid}-vg`,
    mask: `${uid}-mk`,
  }

  const renderTooth = (tooth: ToothGeometry, isUpper: boolean) => {
    const path = crownPath(tooth)
    const centerX = tooth.x0 + tooth.width / 2
    const shadow = DEPTH_SHADOW[tooth.index] + (tooth.mod.recess ?? 0)
    const height = tooth.incisal - tooth.cervical
    const showGloss = isUpper && tooth.index <= 2

    return (
      <g key={tooth.key} transform={tooth.mod.rot ? `rotate(${tooth.mod.rot} ${centerX} ${tooth.cervical})` : undefined}>
        <path d={path} fill={`url(#${isUpper ? ids.toothUpper : ids.toothLower})`} stroke={shade.edge} strokeOpacity={0.55} strokeWidth={0.9} />
        {shadow > 0 && <path d={path} fill="#0a1628" opacity={shadow} />}
        {showGloss && (
          <ellipse
            cx={tooth.x0 + tooth.width * 0.36}
            cy={tooth.cervical + height * 0.46}
            rx={tooth.width * 0.13}
            ry={Math.abs(height) * 0.24}
            fill={`url(#${ids.gloss})`}
          />
        )}
      </g>
    )
  }

  return (
    <svg
      viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
      preserveAspectRatio={preserveAspectRatio}
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <linearGradient id={ids.toothUpper} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={shade.stops[0]} />
          <stop offset="0.45" stopColor={shade.stops[1]} />
          <stop offset="1" stopColor={shade.stops[2]} />
        </linearGradient>
        <linearGradient id={ids.toothLower} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={shade.stops[0]} />
          <stop offset="0.5" stopColor={shade.stops[1]} />
          <stop offset="1" stopColor={shade.stops[2]} />
        </linearGradient>
        <radialGradient id={ids.gloss}>
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={ids.gumUpper} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4d2633" />
          <stop offset="0.75" stopColor="#a8697a" />
          <stop offset="1" stopColor="#c28c99" />
        </linearGradient>
        <linearGradient id={ids.gumLower} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#4d2633" />
          <stop offset="0.75" stopColor="#a8697a" />
          <stop offset="1" stopColor="#c28c99" />
        </linearGradient>
        <radialGradient id={ids.vignette} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.6" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <mask id={ids.mask}>
          <rect width={VIEW_WIDTH} height={VIEW_HEIGHT} fill={`url(#${ids.vignette})`} />
        </mask>
      </defs>

      <g mask={`url(#${ids.mask})`}>
        <ellipse cx={CENTER_X} cy={128} rx={200} ry={56} fill="#12080c" />
        {drawOrder(lower).map((tooth) => renderTooth(tooth, false))}
        <path d={gumPath(lower, false)} fill={`url(#${ids.gumLower})`} />
        {drawOrder(upper).map((tooth) => renderTooth(tooth, true))}
        <path d={gumPath(upper, true)} fill={`url(#${ids.gumUpper})`} />
      </g>

      {showGuides && (
        <g fill="none" stroke="#9bc9ee" strokeWidth={1}>
          <line x1={CENTER_X} y1={22} x2={CENTER_X} y2={238} strokeDasharray="3 5" opacity={0.75} />
          <path d="M76 118 Q240 162 404 118" strokeDasharray="2 4" opacity={0.7} />
          <line x1={64} y1={52} x2={416} y2={52} opacity={0.25} />
          {upper.map((tooth) => {
            const side = tooth.key[0] as Side
            const label = `${UPPER_FDI[side]}${tooth.index + 1}`
            const center = tooth.x0 + tooth.width / 2
            return (
              <g key={tooth.key}>
                <line x1={tooth.x0} y1={48} x2={tooth.x0} y2={56} opacity={0.5} />
                {tooth.index < 4 && (
                  <text
                    x={center}
                    y={42}
                    textAnchor="middle"
                    fill="#c2def5"
                    stroke="none"
                    fontSize={8.5}
                    fontWeight={500}
                    fontFamily="DM Mono, ui-monospace, monospace"
                    opacity={0.8}
                  >
                    {label}
                  </text>
                )}
              </g>
            )
          })}
          <circle cx={CENTER_X} cy={140} r={3} fill="#9bc9ee" stroke="none" />
          <circle cx={CENTER_X} cy={140} r={7} opacity={0.5} />
        </g>
      )}
    </svg>
  )
}
