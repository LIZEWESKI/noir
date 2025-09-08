import React from 'react'
import { getStatusColor } from "@/components/reservations-management/get-reservation-status"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"


const Heading = ({status,reservation, isEdit = false}) => {
  return (
    <div className="flex items-start justify-between">
        <div className="space-y-3">
        <p className="text-muted-foreground mt-1"> {isEdit ? "Modify" : "Create "} booking details and preferences</p>
        {reservation && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Reservation ID:</span>
              <code className="px-2 py-1 bg-muted rounded font-mono text-foreground">RSV-{reservation.id}</code>
          </div>
        )}
        </div>
        <div className="flex flex-col items-end gap-2">
        <Badge className={getStatusColor(status)} variant="outline">
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
        {reservation && (
          <div className="text-xs text-muted-foreground">Last updated: {format(reservation.updated_at, "MMM dd, yyyy")}</div>
        )}
        </div>
    </div> 
  )
}

export default Heading