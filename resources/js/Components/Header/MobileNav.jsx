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
const MobileNav = ({user, url, navigation}) => {
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
        <Link href='/'>
          <AppLogo/>
        </Link>
        <div className='space-x-2 flex items-center'>
          {user ? <UserDropdown user={user}/>: <GuestDropdown/>}
        </div>
    </div>
  )
}

export default MobileNav