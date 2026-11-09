import type { ReactNode } from "react"

/** Adapted from Skiper UI's free CssLink (skiper40): https://skiper-ui.com/v1/skiper40 */
type AnimatedLinkProps = {
  children: ReactNode
  href: string
  className?: string
  external?: boolean
  arrow?: boolean
}

export function AnimatedLink({ children, href, className = "", external = false, arrow = false }: AnimatedLinkProps) {
  return (
    <a
      href={href}
      className={`skiper-link ${arrow ? "skiper-link-arrow" : ""} ${className}`.trim()}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
      {arrow && (
        <svg className="skiper-link-icon" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <path d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </a>
  )
}
