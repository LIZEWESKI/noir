import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { Clock } from 'lucide-react'

const ShowTimeLine = ({createdDate,updatedDate,checkInDate}) => {
  return (
    <Card>
        <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Timeline
        </CardTitle>
        </CardHeader>
        <CardContent>
        <div className="space-y-3">
            <div className="flex gap-3">
            <div className="flex flex-col items-center">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <div className="w-px h-full bg-border" />
            </div>
            <div className="pb-4">
                <p className="text-sm font-medium">Reservation Created</p>
                <p className="text-xs text-muted-foreground">{format(createdDate, "MMM dd, yyyy 'at' h:mm a")}</p>
            </div>
            </div>

            <div className="flex gap-3">
            <div className="flex flex-col items-center">
                <div className="h-2 w-2 rounded-full bg-success" />
                <div className="w-px h-full bg-border" />
            </div>
            <div className="pb-4">
                <p className="text-sm font-medium">Confirmed</p>
                <p className="text-xs text-muted-foreground">{format(updatedDate, "MMM dd, yyyy 'at' h:mm a")}</p>
            </div>
            </div>

            <div className="flex gap-3">
            <div className="flex flex-col items-center">
                <div className="h-2 w-2 rounded-full bg-muted" />
            </div>
            <div>
                <p className="text-sm font-medium text-muted-foreground">Check-in</p>
                <p className="text-xs text-muted-foreground">{format(checkInDate, "MMM dd, yyyy")}</p>
            </div>
            </div>
        </div>
        </CardContent>
    </Card>
  )
}

export default ShowTimeLine