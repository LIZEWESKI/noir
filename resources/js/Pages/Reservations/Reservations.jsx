import React from 'react'
import ReservationCard from "./ReservationCard"
import OrderSummary from "./OrderSummary"
import { Badge } from "@/components/ui/badge"
const Reservations = ({reservations}) => {
  return (
    <div className="py-12 md:py-24">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                <div className="w-full md:w-2/3 space-y-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold tracking-tight">Reservations</h1>
                        <Badge variant="outline" className="text-sm px-3 py-1">
                        {reservations.length} {reservations.length === 1 ? "Room" : "Rooms"}
                        </Badge>
                    </div>
                    <div className="space-y-6">
                        {reservations.map((reservation) => (
                        <ReservationCard key={reservation.id} reservation={reservation} />
                        ))}
                    </div>
                </div>
                <OrderSummary reservations={reservations}/>
            </div>
        </div>
    </div>
  )
}

export default Reservations