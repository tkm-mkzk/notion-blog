import React from 'react'
import { useRouter } from 'next/navigation'
import { clsx } from '@mantine/core'
import { NavMenu } from './NavMenu'

function Navbar() {
  const router = useRouter()

  return (
    <>
      <div className="fixed z-50 flex w-fit items-start justify-between">
        <NavMenu />
      </div>
      <header className="py-1">
        <div
          className={clsx(
            'mx-auto w-fit cursor-pointer py-4',
            'hover:title-drop-shadow transition duration-1000 ease-in hover:text-regal-blue'
          )}
          onClick={() => router.push('/')}
        >
          <h1 className="font-montserrat text-[42px] leading-none font-bold">notion-blog</h1>
        </div>
      </header>
    </>
  )
}

export default Navbar
