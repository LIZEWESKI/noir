import React from 'react'
import { getStatusColor } from "@/components/reservations-management/get-reservation-status"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"


const Heading = ({data,reservation}) => {
  return (
    <div className="flex items-start justify-between">
        <div className="space-y-3">
        <p className="text-muted-foreground mt-1">Modify booking details and preferences</p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Reservation ID:</span>
            <code className="px-2 py-1 bg-muted rounded font-mono text-foreground">RSV-{reservation.id}</code>
        </div>
        </div>
        <div className="flex flex-col items-end gap-2">
        <Badge className={getStatusColor(data.status)} variant="outline">
            {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
        </Badge>
        <div className="text-xs text-muted-foreground">Last updated: {format(reservation.updated_at, "MMM dd, yyyy")}</div>
        </div>
    </div> 
  )
}

export default Heading