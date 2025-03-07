import React, {useState} from 'react'
import { Link } from '@inertiajs/react'
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
import { Menu } from 'lucide-react'
import { GuestDropdown } from './GuestDropDown'
import { UserDropdown } from './UserDropDown'
const MobileNav = ({user, url, navigation, className}) => {
    const [open, setOpen] = useState(false);
  return (
    <div className={`justify-between items-center ${className}`}>
        <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger>
            <Menu />
        </DrawerTrigger>
        <DrawerContent>
            <DrawerHeader className="text-start space-y-2">
            {/* <DrawerClose>
            </DrawerClose> */}
            <DrawerTitle className={`${url === "/" && "text-muted-foreground"}`}>
              <Link href="/" onClick={() => setOpen(false)}>Home</Link>
            </DrawerTitle>
            {navigation.map((item) => (          
            <DrawerTitle 
            key={item.href} 
            className={`${url === item.href && "text-muted-foreground"}`} >
              <Link href={item.href} onClick={() => setOpen(false)}>{item.name}</Link>
            </DrawerTitle>
            ))}
            </DrawerHeader>
            <DrawerFooter>
              <DrawerDescription>&copy; {new Date().getFullYear()} Noir. All rights reserved.</DrawerDescription>
            </DrawerFooter>
        </DrawerContent>
        </Drawer>
        <Link href="/" className="flex items-center space-x-2 transition-colors hover:opacity-90">
            <AppLogo />
            <span className="font-bold text-xl">
              Noir<span className="text-primary">.</span>
            </span>
          </Link>
        <div className='space-x-2 flex items-center'>
          {user ? <UserDropdown user={user}/>: <GuestDropdown/>}
        </div>
    </div>
  )
}

export default MobileNav