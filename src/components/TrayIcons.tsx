import React from "react"
import { GithubMark, LinkedinMark } from "./BrandMarks"

export function TrayIcons() {
  return (
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 w-[80px] bg-[#F4F7FB] border-2 border-dark p-2 z-[60]">
      <div className="flex items-center justify-center gap-2">
        <TrayLink href="https://github.com/Capsradd" label="GitHub">
          <GithubMark size={12} />
        </TrayLink>
        <TrayLink href="https://www.linkedin.com/in/raddin-pr/" label="LinkedIn">
          <LinkedinMark size={12} />
        </TrayLink>
      </div>
    </div>
  )
}

function TrayLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={href}
      className="flex items-center justify-center w-7 h-7 text-dark transition-transform hover:scale-110"
    >
      {children}
    </a>
  )
}
