import React from 'react'
import {
  Calendar,
  Bed,
  Clock,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
const GuestStatsBadges = ({stats}) => {
  console.log(stats.last_stay)
  return (
    <div className="flex flex-wrap gap-3">
        <Badge variant="outline" className="text-muted-foreground px-1.5 py-1">
        <Bed className="h-4 w-4" />
        {stats.stays_count} Stays
        </Badge>
        <Badge variant="outline" className="text-muted-foreground px-1.5 py-1">
        <Calendar className="h-4 w-4" />
        Last Stay: {stats.last_stay ? stats.last_stay : "No previous stay"}
        </Badge>
        <Badge variant="outline" className="text-muted-foreground px-1.5 py-1">
        <Clock className="h-4 w-4" />
        {stats.total_nights} Total Nights
        </Badge>
        <Badge variant="outline" className="text-muted-foreground px-1.5 py-1">
        ${stats.total_spent} Spent
        </Badge>
    </div>
  )
}

export default GuestStatsBadges