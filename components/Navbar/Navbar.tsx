import React from 'react'
import { useRouter } from 'next/navigation'
import { clsx } from '@mantine/core'
import { NavMenu } from './NavMenu'
import { Login } from '../Login'

function Navbar() {
  const router = useRouter()

  return (
    <>
      <div className="fixed z-50 flex w-fit items-start justify-between">
        <NavMenu />
      </div>
      <div className="fixed right-2 top-2 z-50 hidden w-fit md:block">
        <Login />
      </div>

      <header className="py-1">
        <div
          className={clsx(
            'mx-auto w-fit cursor-pointer',
            'hover:title-drop-shadow transition duration-1000 ease-in text-regal-blue hover:text-white'
          )}
          onClick={() => router.push('/')}
        >
          <h1 className="font-baloo text-[48px] leading-none font-bold">notion-blog</h1>
        </div>
      </header>
    </>
  )
}

export default Navbar
