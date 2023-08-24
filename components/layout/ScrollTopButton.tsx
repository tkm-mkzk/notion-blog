import type { FC } from 'react'

import { useWindowScroll } from '@mantine/hooks'
import { Button, Group, Transition } from '@mantine/core'
import { ScrollUpIcon } from '../commons/icons'

export const ScrollTopButton: FC = () => {
  const [scroll, scrollTo] = useWindowScroll()

  return (
    <Transition transition="fade" mounted={scroll.y > 0}>
      {(transitionStyles) => (
        <Button
          className="shadow"
          color="cyan"
          leftIcon={<ScrollUpIcon size={24} />}
          onClick={() => scrollTo({ y: 0 })}
          style={transitionStyles}
        >
          Scroll to top
        </Button>
      )}
    </Transition>
  )
}
