import type { ReactNode, SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number | string; strokeWidth?: number | string }

/**
 * Ícones próprios desenhados no mesmo grid (24px) e estilo de traço do Lucide,
 * para cobrir o que a biblioteca não oferece (odontologia e redes sociais).
 */
function IconBase({ size = 24, strokeWidth = 1.75, children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export function ToothIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 5.5c-1.6-1.2-4-1.6-5.6-.4C4.7 6.4 4.8 9 5.6 11c.6 1.5.9 3 1.2 4.8.3 2 .8 3.7 2 3.7 1.3 0 1.5-1.7 1.8-3.4.2-1.1.6-1.9 1.4-1.9s1.2.8 1.4 1.9c.3 1.7.5 3.4 1.8 3.4 1.2 0 1.7-1.7 2-3.7.3-1.8.6-3.3 1.2-4.8.8-2 .9-4.6-.8-5.9-1.6-1.2-4-.8-5.6.4z" />
    </IconBase>
  )
}

export function ImplantIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M6.6 9c-.7-3 .9-5 3-5 1 0 1.6.4 2.4.4s1.4-.4 2.4-.4c2.1 0 3.7 2 3 5z" />
      <path d="M10.2 9v2.4M13.8 9v2.4" />
      <path d="M9 11.4h6" />
      <path d="m9.6 11.4.7 7.8a1.7 1.7 0 0 0 3.4 0l.7-7.8" />
      <path d="M9.9 14.4h4.2M10.2 17h3.6" />
    </IconBase>
  )
}

export function BracesIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 7.5A3.5 3.5 0 0 1 7.5 4 3.5 3.5 0 0 1 11 7.5v8a3.5 3.5 0 0 1-7 0z" />
      <path d="M13 7.5A3.5 3.5 0 0 1 16.5 4 3.5 3.5 0 0 1 20 7.5v8a3.5 3.5 0 0 1-7 0z" />
      <path d="M2 12h20" />
      <rect x="5.8" y="10" width="3.4" height="4" rx=".8" />
      <rect x="14.8" y="10" width="3.4" height="4" rx=".8" />
    </IconBase>
  )
}

export function InstagramIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <path d="M16 11.4A4 4 0 1 1 12.6 8a4 4 0 0 1 3.4 3.4z" />
      <path d="M17.5 6.5h.01" />
    </IconBase>
  )
}

export function FacebookIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M18 2.5h-3a5 5 0 0 0-5 5v3H7v4h3v7h4v-7h3l1-4h-4v-3a1 1 0 0 1 1-1h3z" />
    </IconBase>
  )
}

export function LinkedinIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </IconBase>
  )
}

export function YoutubeIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </IconBase>
  )
}
