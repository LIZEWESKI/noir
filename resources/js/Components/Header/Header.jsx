import React from 'react'
import MobileNav from '@/Components/Header/MobileNav'
import DesktopNav from '@/Components/Header/DesktopNav'
import { usePage } from '@inertiajs/react'

const Header = () => {
  const {auth} = usePage().props
  const {url} = usePage();
  const navigation = [
    { name: "Rooms", href: "/rooms" },
    { name: "Reservations", href: "/reservations" },
    { name: "Gallery", href: "/gallery" },
  ]
  const legalNavigation = [
    { name: "Legal Information", href: "/legal" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Contact Legal Team", href: "/contact" },
    { name: "About us", href: "/about" },
  ]
  return (
    <header className={`fixed top-0 right-0 left-0 bg-background border-b md:px-20 py-2 px-4 z-50`}>
      <MobileNav className="flex md:hidden" user={auth.user} url={url} navigation={navigation} legalNavigation={legalNavigation}/>
      <DesktopNav className="hidden md:flex" user={auth.user} url={url} navigation={navigation} legalNavigation={legalNavigation}/>
    </header>
  )
}

export default Header