import React from 'react'
import { Link } from '@inertiajs/react'
import { Button } from '@/Components//ui/button'
import {ToggleMode} from '@/Components/ToggleMode'
import AppLogo from '@/Components/AppLogo'
const DesktopNav = () => {
  return (
    <div className='flex justify-between text-muted-foreground font-semibold items-center'>
        <nav className='flex gap-3 items-center'>
        <Link href='/' className='flex justify-center items-center gap-1'>
            <AppLogo/>
            <h1 className='text-lg font-extrabold text-primary mr-2'>Noir</h1>
        </Link>
        <Link href="#" className='hover:text-primary hover:underline'>Rooms</Link>
        <Link href="#" className='hover:text-primary hover:underline'>My Cart</Link>
        <Link href="#" className='hover:text-primary hover:underline'>Gallery</Link>
        <Link href="#" className='hover:text-primary hover:underline'>Contact/About</Link>
        </nav>
        <div className='space-x-2 flex items-center'>
        <Link href="#" >
            <Button variant="default">Log in</Button>
        </Link>
        <ToggleMode/>
        </div>
    </div>
  )
}

export default DesktopNav