import React from 'react'
import { Trash2, Calendar, Users, Bed } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { useForm, router } from '@inertiajs/react'

const ReservationCard = ({reservation}) => {
    const { data, setData, put, processing, errors, reset} = useForm({})
    function cancelReservation(e) {
        e.preventDefault();
        put(`/reservations/${reservation.id}/cancel`)
    }

  return (
    <Card className="overflow-hidden">
        <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row">
            {/* Room Image */}
            <div className="sm:w-1/3 h-1/3 sm:h-auto aspect-video sm:aspect-square relative">
                <img
                src={reservation.room.image_path_url || "/placeholder.svg"}
                alt={reservation.room.name}
                className="w-full h-full object-cover"
                />
            </div>

            {/* Room Details */}
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between">
                <div>
                    <h3 className="font-semibold text-lg">{reservation.room.name}</h3>
                    <p className="text-muted-foreground text-sm">
                    {reservation.room.bed} • {reservation.room.size}
                    </p>
                </div>
                <AlertDialog>
                    <AlertDialogTrigger>
                        <Trash2 className="h-5 w-5 text-danger" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to cancel this reservation?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. Your booking will be marked as canceled, 
                            and you may need to make a new reservation if you change your mind.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Close</AlertDialogCancel>
                        <AlertDialogAction 
                        className="bg-danger text-white transition-colors duration-300 hover:text-danger hover:bg-white" 
                        onClick={() => router.put(`/reservations/${reservation.id}/cancel`)}
                        >Confirm Cancellation</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                </div>

                <Separator className="my-4" />

                {/* Booking Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                    <p className="font-medium">Check-in</p>
                    <p>{format(reservation.check_in, "MMM dd, yyyy")}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                    <p className="font-medium">Check-out</p>
                    <p>{format(reservation.check_out, "MMM dd, yyyy")}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                    <p className="font-medium">Guests</p>
                    <p>
                        {reservation.room.guests} {reservation.room.guests === 1 ? "Guest" : "Guests"}
                    </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Bed className="h-4 w-4 text-muted-foreground" />
                    <div>
                    <p className="font-medium">Stay</p>
                    <p>
                        {reservation.nights} {reservation.nights === 1 ? "Night" : "Nights"}
                    </p>
                    </div>
                </div>
                </div>

                <div className="mt-auto pt-4 flex justify-between items-end">
                <div>
                    <p className="text-sm text-muted-foreground">
                    ${Number.parseFloat(reservation.room.price).toFixed(2)} × {reservation.nights} nights
                    </p>
                    <p className="text-sm text-muted-foreground">
                    + ${Number.parseFloat(reservation.cleaning_fee).toFixed(2)} cleaning fee
                    </p>
                    <p className="text-sm text-muted-foreground">+ ${Number.parseFloat(reservation.service_fee).toFixed(2)} service fee</p>
                </div>
                <div className="text-right">
                    <p className="font-semibold">${Number.parseFloat(reservation.total_price).toFixed(2)}</p>
                </div>
                </div>
            </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default ReservationCard