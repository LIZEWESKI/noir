import React from 'react'
import { useMediaQuery } from 'react-responsive'
import MobileNav from '@/Components/Header/MobileNav'
import DesktopNav from '@/Components/Header/DesktopNav'
import { usePage } from '@inertiajs/react'

const Header = () => {
  const {auth} = usePage().props
  const isMobile = useMediaQuery({query:'(max-width: 800px)'});
  return (
    <header className={`sticky top-0 bg-background border-b-[1px] border-border ${isMobile ? "px-4" : "px-20"} py-2`}>
      {isMobile && <MobileNav user={auth.user}/>}
      {!isMobile && <DesktopNav user={auth.user}/>}
    </header>
  )
}

export default Header