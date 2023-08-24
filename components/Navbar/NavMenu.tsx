import type { FC } from 'react'

import { Transition, clsx } from '@mantine/core'
import { useHover } from '@mantine/hooks'
import { BlogsIcon, HomeIcon, MenuIcon, TwitterIcon } from '../commons/icons'
import { NavMenuLink } from './NavMenuLink'
import { NavMenuExternalLink } from './NavMenuExternalLink'

export const NavMenu: FC = () => {
  const { hovered, ref } = useHover()

  return (
    <nav ref={ref} className="w-fit cursol-pointer p-3 sp:p-0 sp:pl-2">
      <div
        className={clsx(
          'flex flex-col items-center justify-center transition-colors duration-300',
          hovered && 'text-regal-blue'
        )}
      >
        <MenuIcon size={36} />
        <div className="font-bold sp:text-sm">MENU</div>
      </div>

      <Transition mounted={hovered} transition="slide-right" timingFunction="ease" duration={400}>
        {(styles) => (
          <div
            className="fixed top-0 left-0 -z-10 h-screen space-y-2 bg-skin px-6 pt-28"
            style={styles}
          >
            <NavMenuLink leftIcon={<HomeIcon size={18} />} href="/" label="Home" />
            <NavMenuLink leftIcon={<BlogsIcon size={18} />} href="/posts/page/1" label="Blogs" />

            <div className="pt-8" />

            {/* External */}
            <NavMenuExternalLink
              icon={<TwitterIcon size={20} />}
              href="https://twitter.com/tkm_mkzk"
              label="Twitter"
            />
          </div>
        )}
      </Transition>
    </nav>
  )
}
