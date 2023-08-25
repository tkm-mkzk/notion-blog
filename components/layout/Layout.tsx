import React from 'react'
import Navbar from '@/components/Navbar/Navbar'
import { Footer } from './Footer'

function Layout({ children }: any) {
  return (
    <div>
      <div className="bg-default">
        <Navbar />
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
