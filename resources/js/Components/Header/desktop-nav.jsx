import React from 'react'
import { Link } from '@inertiajs/react'
import AppLogo from '@/components/app-logo'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

import { UserDropdown } from './user-dropdown'
import { GuestDropdown } from './guest-dropdown'
const DesktopNav = ({user, url, navigation, className, legalNavigation}) => {

  return (
    <div className={`justify-between items-center ${className}`}>
        <nav className='flex gap-3 items-center'>
          <Link href="/" className="flex items-center space-x-2 transition-colors hover:opacity-90">
            <AppLogo />
            <span className="font-extrabold text-xl font-outfit tracking-wide">
              Noir<span className="text-primary">.</span>
            </span>
          </Link>
        </nav>
          <nav className="flex gap-4 items-center">
          {navigation.map((item) =>
            <Link
              key={item.href}
              href={item.href}
              className={` font-medium transition-colors hover:text-primary 
                ${url === item.href ? "text-foreground" : "text-muted-foreground"}`}
            >
              {item.name}
            </Link> 
          )}
          
            <DropdownMenu >
                <DropdownMenuTrigger asChild>
                  <button
                    className={`font-medium transition-colors hover:text-primary flex items-center gap-1
                    ${
                      url.startsWith("/legal") || url === "/terms-of-service" || url === "/privacy-policy" || url === "/about" || url === "/contact"
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    Legal
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {legalNavigation.map((subItem) => (
                    <DropdownMenuItem key={subItem.href} asChild>
                      <Link href={subItem.href} className={`w-full ${url === subItem.href ? "font-medium" : ""}`}>
                        {subItem.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
            </DropdownMenu>
          
          </nav>
        <div className='space-x-2 flex items-center'>
          {user ? <UserDropdown user={user}/>: <GuestDropdown/>}
        </div>
    </div>
  )
}

export default DesktopNav