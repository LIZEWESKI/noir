import React from 'react'
import { Calendar, Users, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

const Summary = () => {
    const searchParams = new URLSearchParams(window.location.search)
    // Parse search parameters
    const checkIn = searchParams.get("check_in") ? new Date(searchParams.get("check_in")) : null
    const checkOut = searchParams.get("check_out") ? new Date(searchParams.get("check_out")) : null
    const guests = searchParams.get("guests") ? Number.parseInt(searchParams.get("guests")) : 0
  
    // Format dates for display
    const formattedCheckIn = checkIn ? format(checkIn, "MMM dd, yyyy") : "Not specified"
    const formattedCheckOut = checkOut ? format(checkOut, "MMM dd, yyyy") : "Not specified"
  
    // Calculate number of nights
    const nights = checkIn && checkOut ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) : 0
  return (
    <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Search Results</h1>
        <Card className="bg-background border-border text-primary">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Check-in</p>
                  <p className="text-sm text-muted-foreground">{formattedCheckIn}</p>
                </div>
              </div>

              <ArrowRight className="hidden md:block h-5 w-5 text-muted-foreground" />

              <div className="flex items-center gap-4">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Check-out</p>
                  <p className="text-sm text-muted-foreground">{formattedCheckOut}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Guests</p>
                  <p className="text-sm text-muted-foreground">
                    {guests} {guests === 1 ? "guest" : "guests"}
                  </p>
                </div>
              </div>
              {nights > 0 && (
                <Badge variant="outline" className="ml-auto border-border text-primary">
                  {nights} {nights === 1 ? "night" : "nights"}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
    </div>
  )
}

export default Summary