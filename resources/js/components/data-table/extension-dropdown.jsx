import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown, FileUp } from 'lucide-react'

const ExtensionDropdown = ({extensions}) => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
            <FileUp />
            <span className="lg:inline">Export As</span>
            <ChevronDown />
        </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
            {extensions.map((extension) => {
                const {name,url,label,action} = extension
                return (
                    <DropdownMenuItem
                        className="uppercase"
                        key={name}
                        onClick={() => action(url,label)}
                    >
                        {name}
                    </DropdownMenuItem>
                )
            }) }
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ExtensionDropdown