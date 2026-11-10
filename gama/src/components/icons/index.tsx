import type { ReactNode, SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number | string; strokeWidth?: number | string }

/**
 * Ícones próprios desenhados no mesmo grid (24px) e estilo de traço do Lucide,
 * para cobrir o que a biblioteca não oferece (marcas, narguilé e taças de espumante).
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

export function WhatsAppIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M8.3 19.1A8.6 8.6 0 1 0 4.9 15.7L3.6 20.4z" />
      <path d="M9.1 8.2c-.4.4-.6 1-.4 1.8.6 2.2 2.2 3.9 4.4 4.6.8.2 1.4 0 1.8-.4l.6-.7-1.9-1.2-.9.6c-.9-.4-1.6-1.1-2-2l.6-.9-1.2-1.9z" />
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

export function HookahIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M9.6 2.5h4.8l-1 2.8h-2.8z" />
      <path d="M12 5.3v6.2" />
      <path d="M9 8h6" />
      <path d="M10 11.5h4c1.4 1.1 2.5 2.4 2.5 4.3a4.5 4.5 0 0 1-9 0c0-1.9 1.1-3.2 2.5-4.3z" />
      <path d="M16.3 14.4c2.3.1 3.7 1.4 3.7 3.4 0 1.9-1.3 3.2-3.2 3.2" />
      <path d="M9 21.5h6" />
    </IconBase>
  )
}

export function FlutesIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5.5 3.5h4l-.4 6.1a1.6 1.6 0 0 1-3.2 0z" />
      <path d="M7.5 11.3v8.2M5.3 20.5h4.4" />
      <path d="M14.5 3.5h4l-.4 6.1a1.6 1.6 0 0 1-3.2 0z" />
      <path d="M16.5 11.3v8.2M14.3 20.5h4.4" />
      <path d="M12 2v1.5M10.8 5.2l-.6.6M13.2 5.2l.6.6" />
    </IconBase>
  )
}
