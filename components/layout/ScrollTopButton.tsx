import type { FC } from 'react'

import { useWindowScroll } from '@mantine/hooks'
import { Button, Group } from '@mantine/core'
import { ScrollUpIcon } from '../commons/icons'

export const ScrollTopButton: FC = () => {
  const [scroll, scrollTo] = useWindowScroll()

  return (
    <Group position="right">
      <Button
        className="shadow"
        color="cyan"
        leftIcon={<ScrollUpIcon size={24} />}
        onClick={() => scrollTo({ y: 0 })}
      >
        Scroll to top
      </Button>
    </Group>
  )
}
