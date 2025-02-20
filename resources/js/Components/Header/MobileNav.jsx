import React, {useState} from 'react'
import { Link } from '@inertiajs/react'
import { Button } from '@/components/ui/Button'
import AppLogo from '@/Components/AppLogo'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {ToggleMode} from '@/Components/ToggleMode'
import { Menu } from 'lucide-react'
import ProfileDropDown from '@/Components/Header/ProfileDropDown'
const MobileNav = ({user}) => {
    const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-between items-center">
        <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger>
            <Menu />
        </DrawerTrigger>
        <DrawerContent>
            <DrawerHeader className="text-start space-y-2">
            {/* <DrawerClose>
            </DrawerClose> */}
            <DrawerTitle><Link href="#" onClick={() => setOpen(false)}>Rooms</Link></DrawerTitle>
            <DrawerTitle><Link href="#" onClick={() => setOpen(false)}>My Cart</Link></DrawerTitle>
            <DrawerTitle><Link href="#" onClick={() => setOpen(false)}>Gallery</Link></DrawerTitle>
            <DrawerTitle><Link href="#" onClick={() => setOpen(false)}>Contact/About</Link></DrawerTitle>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerDescription>&copy; {new Date().getFullYear()} Noir. All rights reserved.</DrawerDescription>
            </DrawerFooter>
        </DrawerContent>
        </Drawer>
        <Link href='/'>
          <AppLogo/>
        </Link>
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

export default MobileNav