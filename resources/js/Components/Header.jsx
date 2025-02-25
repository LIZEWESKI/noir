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
    <header className={`sticky top-0 bg-background border-b ${isMobile ? "px-4" : "px-20"} py-2`}>
      {isMobile ? 
      <MobileNav user={auth.user} url={url} navigation={navigation}/> : 
      <DesktopNav user={auth.user} url={url} navigation={navigation}/>}
    </header>
  )
}

export default Header