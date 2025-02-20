import React from 'react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useForm, Link } from '@inertiajs/react'
const ProfileDropDown = ({user}) => {
  const initials = user.name.substring(0, 2).toUpperCase();
    const {post} = useForm()
    function logout(e) {
        e.preventDefault();
        post("logout");
    }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
            <AvatarImage src="#" />
            <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem >
          <Link href="#">{user.name}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <form onSubmit={logout}>
            <button type='submit'>Log out</button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileDropDown