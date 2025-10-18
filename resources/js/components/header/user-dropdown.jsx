import { LogOut, ChevronRight, LayoutGrid } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import { router, usePage } from "@inertiajs/react"
import { useInitials } from "@/hooks/use-initials"
export function UserDropdown({user}) {
  const {auth} = usePage().props;
  const getInitials = useInitials()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
            <span className="sr-only">Open user menu</span>
            <AvatarImage src={user.profile_picture_url} />
            <AvatarFallback>
              {getInitials(user.name)}
            </AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-64" align="end">
      <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.visit("/profile") }>Account Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Theme
          <div className="ml-auto flex items-center">
            <ThemeToggle/>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {auth.isAdmin && (
          <DropdownMenuItem onClick={() => router.visit("/admin/dashboard") }>
            Dashboard
          <LayoutGrid className="ml-auto h-4 w-4" />
        </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => router.visit("/") }>
          Home Page
          <ChevronRight className="ml-auto h-4 w-4" />
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => router.post(route("logout"))}>
          Log Out
          <LogOut className="ml-auto h-4 w-4" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full" onClick={() => router.visit("/reservations") }>
          <Button className="w-full" variant="default">
            Reservations
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

