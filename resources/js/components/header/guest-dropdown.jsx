import { BookOpen, HelpCircle, Languages, LogIn, UserPlus, User } from "lucide-react"
import { ThemeToggle } from "@/components/header/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { router } from "@inertiajs/react"

export function GuestDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
          <User className="h-4 w-4" />
          <span className="sr-only">Open guest menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Welcome!</p>
            <p className="text-xs leading-none text-muted-foreground">Sign in to access all features</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.get(route("login"))}>
            <LogIn className="mr-2 h-4 w-4" />
            <span>Log In</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.get(route("register"))}>
            <UserPlus className="mr-2 h-4 w-4" />
            <span>Create Account</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.visit("/gallery") }>
            <BookOpen className="mr-2 h-4 w-4" />
            <span>Gallery</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.visit("/about") }>
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>About Us</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex justify-between">
          Theme
          <ThemeToggle />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full" onClick={() => router.visit("/rooms") }>
            <Button className="w-full" variant="default">
                Rooms
            </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

