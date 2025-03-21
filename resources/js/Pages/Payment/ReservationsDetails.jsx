import React from 'react'
import {
  Calendar,
  Shield,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
const ReservationsDetails = ({reservations}) => {
    const subtotal = reservations.reduce((sum, item) => {
        const roomTotal = Number.parseFloat(item.room.price) * Number(item.nights)
        return sum + roomTotal
      }, 0)
    const cleaningFees = reservations.reduce((sum, item) => sum + Number(item.cleaning_fee), 0)
    const serviceFees = reservations.reduce((sum, item) => sum + Number(item.service_fee), 0)
    const finalTotal = subtotal + cleaningFees + serviceFees 
  return (
    <div className="lg:col-span-5 space-y-6">
        <Card className="overflow-hidden">
            <CardHeader className="bg-primary/5 pb-4">
            <CardTitle>Your Reservation</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
            {reservations.map((reservation) => (
                <div key={reservation.id} className="border-b last:border-b-0">
                <div className="flex flex-col md:flex-row">
                    {/* Room Image */}
                    <div className="md:w-1/4 h-1/4 aspect-video md:aspect-square relative">
                    <img
                        src={reservation.room.image_path_url || "/placeholder.svg?height=200&width=200"}
                        alt={reservation.room.name}
                        className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 left-2 bg-primary/90 hover:bg-primary">
                        {reservation.nights} {reservation.nights === 1 ? "Night" : "Nights"}
                    </Badge>
                    </div>

                    {/* Room Details */}
                    <div className="p-4 flex-1">
                    <h3 className="font-semibold text-lg line-clamp-1">{reservation.room.name}</h3>
                    <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                        <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                            <p className="font-medium">Check-in</p>
                            <p>{format(new Date(reservation.check_in), "EEE, MMM dd, yyyy")}</p>
                        </div>
                        </div>
                        <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                            <p className="font-medium">Check-out</p>
                            <p>{format(new Date(reservation.check_out), "EEE, MMM dd, yyyy")}</p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            ))}
            </CardContent>
        </Card>

        {/* Price Breakdown */}
        <Card>
            <CardHeader className="pb-3">
            <CardTitle>Price Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            {reservations.map((reservation) => (
                <div key={reservation.id} className="flex justify-between text-sm">
                <span>
                    {reservation.room.name} ({reservation.nights} {reservation.nights === 1 ? "night" : "nights"} × $
                    {Number.parseFloat(reservation.room.price).toFixed(2)})
                </span>
                <span>${(Number.parseFloat(reservation.room.price) * reservation.nights).toFixed(2)}</span>
                </div>
            ))}

            <Separator />

            <div className="flex justify-between text-sm">
                <span>Cleaning fee</span>
                <span>${cleaningFees.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm">
                <span>Service fee</span>
                <span>${serviceFees.toFixed(2)}</span>
            </div>

            <Separator />

            <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
            </div>
            </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
            <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-success mt-0.5" />
            <div>
                <h3 className="font-medium text-sm">Secure Booking</h3>
                <p className="text-xs text-muted-foreground mt-1">
                Your payment information is encrypted and securely processed. We never store your full card details.
                </p>
            </div>
            </div>
        </div>
    </div>
  )
}

export default ReservationsDetails