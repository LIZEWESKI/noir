import React from 'react'
import { useMediaQuery } from 'react-responsive'
import MobileNav from '@/Components/Header/MobileNav'
import DesktopNav from '@/Components/Header/DesktopNav'

const Header = () => {
  const isMobile = useMediaQuery({query:'(max-width: 800px)'});
  return (
    <header className={`sticky top-0 bg-background border-b-[1px] border-border ${isMobile ? "px-4" : "px-20"} py-2`}>
      {isMobile && <MobileNav/>}
      {!isMobile && <DesktopNav/>}
    </header>
  )
}

export default Header