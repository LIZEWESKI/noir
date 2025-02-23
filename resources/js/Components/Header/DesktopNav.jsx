import React from 'react'
import { Link } from '@inertiajs/react'
import { Button } from '@/Components//ui/button'
import {ToggleMode} from '@/Components/ToggleMode'
import AppLogo from '@/Components/AppLogo'
import ProfileDropDown from '@/Components/Header/ProfileDropDown'
const DesktopNav = ({user}) => {
  return (
    <div className='flex justify-between items-center'>
        <nav className='flex gap-3 items-center'>
        <Link href='/' className='flex justify-center items-center gap-1'>
            <AppLogo/>
            <h1 className='text-lg font-extrabold text-primary mr-2'>Noir.</h1>
        </Link>
        <Link href="#" className='transition-colors hover:text-foreground/80 text-foreground/80'>Rooms</Link>
        <Link href="#" className='transition-colors hover:text-foreground/80 text-foreground/80'>My Cart</Link>
        <Link href="#" className='transition-colors hover:text-foreground/80 text-foreground/80'>Gallery</Link>
        <Link href="#" className='transition-colors hover:text-foreground/80 text-foreground/80'>Contact/About</Link>
        </nav>
        <div className='space-x-2 flex items-center'>
          {user ? 
          <ProfileDropDown user={user}/>
          : 
          <Link href={route("login")} >
            <Button variant="default">Log in</Button>
          </Link> 
          }
        <ToggleMode/>
        </div>
    </div>
  )
}

export default DesktopNav