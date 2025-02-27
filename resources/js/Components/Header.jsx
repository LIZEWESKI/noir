import React from 'react'
import { useMediaQuery } from 'react-responsive'
import MobileNav from '@/Components/Header/MobileNav'
import DesktopNav from '@/Components/Header/DesktopNav'
import { usePage } from '@inertiajs/react'

const Header = () => {
  const isMobile = useMediaQuery({query:'(max-width: 768px)'});
  const {auth} = usePage().props
  const {url} = usePage();
  const navigation = [
    { name: "Rooms", href: "/rooms" },
    { name: "My Cart", href: "/my-cart" },
    { name: "Gallery", href: "/gallery" },
    { name: "About us", href: "/about" },
  ]
  return (
    <header className={` bg-background border-b md:px-20 py-2 px-4 z-50`}>
      <MobileNav className="flex md:hidden" user={auth.user} url={url} navigation={navigation}/>
      <DesktopNav className="hidden md:flex" user={auth.user} url={url} navigation={navigation}/>
    </header>
  )
}

export default Header