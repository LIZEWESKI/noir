import React from 'react'
import { format } from "date-fns"

const DateTracker = ({checkInDate,checkOutDate, nights}) => {
  return (
        <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="font-medium">{format(checkInDate, "MMM dd")}</span>
            </div>
            <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 h-0.5 bg-primary/30"></div>
                <div className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
                {nights} {nights === 1 ? "night" : "nights"}
                </div>
                <div className="flex-1 h-0.5 bg-primary/30"></div>
            </div>
            <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">{format(checkOutDate, "MMM dd")}</span>
                <div className="w-3 h-3 bg-primary rounded-full"></div>
            </div>
        </div>
  )
}

export default DateTracker