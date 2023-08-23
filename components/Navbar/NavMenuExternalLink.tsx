import type { FC, ReactNode } from 'react'

import Link from 'next/link'
import { ExternalLinkIcon } from '../commons/icons'

type Props = {
  href: string
  label: string
  icon?: ReactNode
}

export const NavMenuExternalLink: FC<Props> = ({ href, label, icon }) => {
  return (
    <Link
      className="flex w-fit items-center gap-2 font-source-serif text-xl text-regal-blue transition-transform duration-300 hover:scale-110 sp:text-2xl"
      href={href}
      target="_blank"
      rel="noopener"
    >
      {icon}
      {label}
      <ExternalLinkIcon />
    </Link>
  )
}
