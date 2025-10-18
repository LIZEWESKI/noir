import React from 'react'
import { Users } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from '@/components/ui/label'

const GuestSelect = ({
    guestCount,
    setGuestCount,
    selectedRoom
}) => {
  return (
    <div className="space-y-3">
        <Label className="text-base font-medium flex items-center gap-2">
        <Users className="h-4 w-4" />
        Number of Guests
        </Label>
        <Select
        value={guestCount.toString()}
        onValueChange={(value) => setGuestCount(Number.parseInt(value))}
        >
        <SelectTrigger className="h-12">
            <SelectValue />
        </SelectTrigger>
        <SelectContent>
            {[...Array(selectedRoom.guests)].map((_, i) => (
            <SelectItem key={i} value={(i + 1).toString()}>
                <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                {i + 1} {i === 0 ? "Guest" : "Guests"}
                </div>
            </SelectItem>
            ))}
        </SelectContent>
        </Select>
    </div>
  )
}

export default GuestSelect