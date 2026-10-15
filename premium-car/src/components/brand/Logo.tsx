import { cn } from '../../lib/cn'
import { MONOGRAM_PATH } from './Monogram'

interface LogoProps {
  className?: string
}

/**
 * Logotipo oficial da Premium Car (monograma laranja + nome + "Estética automotiva"), na mesma composição
 * do original. Versão para fundo escuro: o nome, preto no original, aparece em branco.
 * O texto usa a fonte do site com largura fixa (`textLength`) para manter as proporções do desenho.
 */
export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 508 158"
      role="img"
      aria-label="Premium Car — Estética automotiva"
      className={cn('h-11 w-auto', className)}
    >
      <path d={MONOGRAM_PATH} className="fill-brand-400" />
      <text
        x="95"
        y="131"
        textLength="411"
        lengthAdjust="spacingAndGlyphs"
        className="fill-snow font-display text-[43px] font-extrabold [font-stretch:125%]"
      >
        PREMIUM CAR
      </text>
      <text
        x="96"
        y="156"
        textLength="242"
        lengthAdjust="spacingAndGlyphs"
        className="fill-silver-300 font-display text-[20px] font-medium [font-stretch:110%]"
      >
        ESTÉTICA AUTOMOTIVA
      </text>
    </svg>
  )
}
