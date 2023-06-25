import React from 'react'
import Navbar from '@/components/Navbar/Navbar'

function Layout({ children }: any) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default Layout
