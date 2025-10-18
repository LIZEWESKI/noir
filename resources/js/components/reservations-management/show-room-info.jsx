import React from 'react'
import { Bed, DollarSign, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const ShowRoomInfo = ({reservation}) => {
  return (
        <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Bed className="h-5 w-5" />
                Room Details
            </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            <div>
                <h3 className="text-xl font-semibold">{reservation.room.name}</h3>
                <p className="text-muted-foreground">{reservation.room.type}</p>
            </div>

            <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">${reservation.room.price}</span>
                <span className="text-muted-foreground">/ night</span>
                </div>
                <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{reservation.room.guests === 1 ? `${reservation.room.guests} Guest` : `Up to ${reservation.room.guests} guests`}</span>
                </div>
            </div>
            </CardContent>
        </Card>
  )
}

export default ShowRoomInfo