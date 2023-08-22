import type { FC } from 'react'

import { clsx, Transition } from '@mantine/core'
import { useHover } from '@mantine/hooks'
import { CowIcon, HomeIcon } from '../commons/icons'
import { NavMenuLink } from './NavMenuLink'

export const NavMenu: FC = () => {
  const { hovered, ref } = useHover()

  return (
    <nav ref={ref} className="w-fit cursol-pointer p-3 sp:p-0 sp:pl-2">
      <div
        className={clsx(
          'flex flex-col items-center justify-center transition-colors duration-300',
          hovered && 'text-blue-700'
        )}
      >
        <CowIcon size={36} />
        <div className="font-bold sp:text-sm">MENU</div>
      </div>

      <Transition
        mounted={hovered}
        transition="slide-right"
        timingFunction="ease"
        duration={400}
      >
        {(styles) => (
          <div
            className="fixed top-0 left-0 -z-10 h-screen space-y-2 bg-slate-800 px-6 pt-28"
            style={styles}
          >
            <NavMenuLink leftIcon={<HomeIcon size={18} />} href="/" label="Home" />
          </div>
        )}
      </Transition>
    </nav>
  )
}
