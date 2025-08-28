import React, {useState} from 'react'
import { Link } from '@inertiajs/react'
import AppLogo from '@/components/app-logo'
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Menu} from "lucide-react"
import { GuestDropdown } from './guest-dropdown'
import { UserDropdown } from './user-dropdown'
const MobileNav = ({user, url, navigation, className, legalNavigation}) => {
    const [open, setOpen] = useState(false);
    const isLegalActive = url === "/legal" || url === "/terms-of-service" || url === "/privacy-policy" || url === "/about" || url === "/contact"

  return (
    <div className={`justify-between items-center ${className}`}>
      <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <Menu />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-start space-y-2">
          <DrawerTitle className={`${url === "/" && "text-muted-foreground"}`}>
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>
          </DrawerTitle>

          {navigation.map((item) => (
            <DrawerTitle key={item.href} className={`${url === item.href && "text-muted-foreground"}`}>
              <Link href={item.href} onClick={() => setOpen(false)}>
                {item.name}
              </Link>
            </DrawerTitle>
          ))}

          {/* Legal Accordion */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="legal" className="border-0">
              <AccordionTrigger className={`p-0 ${isLegalActive ? "text-muted-foreground" : ""}`}>
                <span className="text-lg font-semibold leading-none  ">Legal</span>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-0">
                <div className="flex flex-col space-y-2 pl-4">
                  {legalNavigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-sm ${url === item.href ? "text-muted-foreground" : ""}`}
                      onClick={() => setOpen(false)}
                    >
                     - { item.name}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </DrawerHeader>

        <DrawerFooter>
          <DrawerDescription>&copy; {new Date().getFullYear()} Noir. All rights reserved.</DrawerDescription>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
        <Link href="/" className="flex items-center space-x-2 transition-colors hover:opacity-90">
          <AppLogo />
          <span className="font-bold text-xl font-outfit tracking-wide">
            Noir<span className="text-primary ">.</span>
          </span>
        </Link>
        <div className='space-x-2 flex items-center'>
          {user ? <UserDropdown user={user}/>: <GuestDropdown/>}
        </div>
    </div>
  )
}

export default MobileNav