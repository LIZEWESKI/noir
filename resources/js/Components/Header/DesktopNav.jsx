import React from 'react'
import { Link } from '@inertiajs/react'
import AppLogo from '@/Components/AppLogo'
import { UserDropdown } from './UserDropDown'
import { GuestDropdown } from './GuestDropDown'
const DesktopNav = ({user, url, navigation}) => {

  return (
    <div className='flex justify-between items-center'>
        <nav className='flex gap-3 items-center'>
          <Link href="/" className="flex items-center space-x-2 transition-colors hover:opacity-90">
            <AppLogo />
            <span className="font-bold text-xl">
              Noir<span className="text-primary">.</span>
            </span>
          </Link>
          <nav className="flex gap-4 items-center">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={
                      `text-sm font-medium transition-colors hover:text-primary 
                      ${url === item.href ? "text-foreground" : "text-muted-foreground"}`
                    }
                  >
                    {item.name}
                  </Link>
                ))}
          </nav>
        </nav>
        <div className='space-x-2 flex items-center'>
          {user ? <UserDropdown user={user}/>: <GuestDropdown/>}
        </div>
    </div>
  )
}

export default DesktopNav