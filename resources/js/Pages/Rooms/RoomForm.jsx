import React, {useState, useEffect} from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { format, differenceInDays, addDays } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {Calendar} from "lucide-react"
const RoomForm = ({room}) => {
// Calculate nights and total when dates change
  const [checkInDate, setCheckInDate] = useState(addDays(new Date(), 1))
  const [checkOutDate, setCheckOutDate] = useState(addDays(new Date(), 4))
  const [guestCount, setGuestCount] = useState(room.guests)
  const [nights, setNights] = useState(3)
  const [roomPrice, setRoomPrice] = useState(Number.parseFloat(room.price))
  const [cleaningFee, setCleaningFee] = useState(25)
  const [serviceFee, setServiceFee] = useState(15)
  const [total, setTotal] = useState(0)
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const nightsCount = differenceInDays(checkOutDate, checkInDate)
      setNights(nightsCount > 0 ? nightsCount : 0)
    }
  }, [checkInDate, checkOutDate])

  // Calculate total price
  useEffect(() => {
    const subtotal = roomPrice * nights
    setTotal(subtotal + cleaningFee + serviceFee)
  }, [roomPrice, nights, cleaningFee, serviceFee])

  // Handle reservation
  const handleReservation = () => {
    const reservationData = {
      roomId: room.id,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: guestCount,
      totalPrice: total,
    }
    console.log("Reservation data:", reservationData)
    // Here you would typically send this data to your API
    alert("Reservation submitted! Check console for details.")
  }
  return (
    <form className="lg:col-span-1" onSubmit={handleReservation}>
        <Card className="sticky top-8">
        <CardContent className="p-6 space-y-6">
            <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">${Number.parseFloat(room.price).toFixed(2)}</div>
            <div className="text-muted-foreground">per night</div>
            </div>

            <Separator />

            <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                <label className="text-sm font-medium">Check-in</label>
                <Popover>
                    <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                        <Calendar className="mr-2 h-4 w-4" />
                        {checkInDate ? format(checkInDate, "MMM dd, yyyy") : "Select date"}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                        mode="single"
                        selected={checkInDate}
                        onSelect={setCheckInDate}
                        disabled={(date) => date < new Date() || (checkOutDate && date >= checkOutDate)}
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
                </div>
                <div className="space-y-2">
                <label className="text-sm font-medium">Check-out</label>
                <Popover>
                    <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                        <Calendar className="mr-2 h-4 w-4" />
                        {checkOutDate ? format(checkOutDate, "MMM dd, yyyy") : "Select date"}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                        mode="single"
                        selected={checkOutDate}
                        onSelect={setCheckOutDate}
                        disabled={(date) => date <= new Date() || (checkInDate && date <= checkInDate)}
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Guests</label>
                <Select
                value={guestCount.toString()}
                onValueChange={(value) => setGuestCount(Number.parseInt(value))}
                >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select number of guests" />
                </SelectTrigger>
                <SelectContent>
                    {[...Array(room.guests)].map((_, i) => (
                    <SelectItem key={i} value={(i + 1).toString()}>
                        {i + 1} {i === 0 ? "Guest" : "Guests"}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
            </div>

            {nights > 0 && (
            <div className="space-y-4 pt-4">
                <div className="flex justify-between">
                <span>
                    ${Number.parseFloat(room.price).toFixed(2)} x {nights} {nights === 1 ? "night" : "nights"}
                </span>
                <span>${(Number.parseFloat(room.price) * nights).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                <span>Cleaning fee</span>
                <span>${cleaningFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                <span>Service fee</span>
                <span>${serviceFee.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
                </div>
            </div>
            )}

            <Button size="lg" className="w-full border-success border text-success font-bold" type="submit" disabled={nights <= 0}>
            Reserve Now
            </Button>
            <div className="text-center text-sm text-muted-foreground">You won't be charged yet</div>
        </CardContent>
        </Card>
    </form>
  )
}

export default RoomForm