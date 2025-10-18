import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Moon, Users } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"

const ShowStayInfo = ({reservation,checkInDate,checkOutDate}) => {
  return (
    <Card>
        <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Stay Details
        </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Check-in</p>
            <p className="text-lg font-semibold">{format(checkInDate, "MMM dd, yyyy")}</p>
            <p className="text-sm text-muted-foreground">After 3:00 PM</p>
            </div>
            <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Check-out</p>
            <p className="text-lg font-semibold">{format(checkOutDate, "MMM dd, yyyy")}</p>
            <p className="text-sm text-muted-foreground">Before 11:00 AM</p>
            </div>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
            <Moon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
                <span className="font-semibold">{reservation.nights}</span> nights
            </span>
            </div>
            <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
                <span className="font-semibold">{reservation.room.guests}</span> {reservation.room.guests === 1 ? "guest" : "guests"}
            </span>
            </div>
        </div>
        </CardContent>
    </Card>
  )
}

export default ShowStayInfo