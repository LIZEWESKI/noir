import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function GuestSelector({guests,setGuests}) {
  return (
    <Select
      value={guests.toString()}
      onValueChange={(value) => setGuests("guests",Number.parseInt(value))}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select number of guests" />
      </SelectTrigger>
      <SelectContent>
        {[...Array(5)].map((_, i) => (
          <SelectItem key={i} value={(i + 1).toString()}>
            {i + 1} {i === 0 ? "Guest" : "Guests"}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

