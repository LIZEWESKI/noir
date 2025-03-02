"use client"

import * as React from "react"
import { Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function GuestSelector() {
  const [guests, setGuests] = React.useState({ adults: 2, children: 0 })
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start h-10">
          <Users className="mr-2 h-4 w-4" />
          {guests.adults + guests.children} Guest{guests.adults + guests.children !== 1 ? "s" : ""}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Guests</h4>
            <p className="text-sm text-muted-foreground">Select the number of guests</p>
          </div>
          <div className="grid gap-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="adults">Adults</Label>
              <Input
                id="adults"
                type="number"
                className="col-span-2 h-8"
                value={guests.adults}
                onChange={(e) => setGuests({ ...guests, adults: Number.parseInt(e.target.value) || 0 })}
                min={1}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="children">Children</Label>
              <Input
                id="children"
                type="number"
                className="col-span-2 h-8"
                value={guests.children}
                onChange={(e) => setGuests({ ...guests, children: Number.parseInt(e.target.value) || 0 })}
                min={0}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

