import React, {useState, useEffect} from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { format, differenceInDays, addDays, startOfDay } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {Calendar} from "lucide-react"
import { useForm } from "@inertiajs/react"
const RoomForm = ({room}) => {
    // Calculate nights and total when dates change
    const [checkInDate, setCheckInDate] = useState(startOfDay(addDays(new Date(), 1)))
    const [checkOutDate, setCheckOutDate] = useState(startOfDay(addDays(new Date(), 4)))
    const { data, setData, post, processing, errors } = useForm({
        room_id: room.id,
        check_in: checkInDate?.toISOString().split('T')[0] || '',
        check_out: checkOutDate?.toISOString().split('T')[0] || '',
    })
    const [guestCount, setGuestCount] = useState(room.guests)
    const [nights, setNights] = useState(differenceInDays(checkOutDate, checkInDate))
    const roomPrice = Number.parseFloat(room.price)
    const cleaningFee = 25;
    const serviceFee = 15;
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
    const handleCheckIn = (checkIn) => {
        setCheckInDate(checkIn)
        setData({
            ...data,
            check_in: checkIn?.toISOString().split('T')[0] || "",
        })
    }
    const handleCheckOut = (checkOut) => {
        setCheckOutDate(checkOut)
        setData({
            ...data,
            check_out: checkOut?.toISOString().split('T')[0] || "",
        })
    }
    // Handle reservation
    const handleReservation = (e) => {
        e.preventDefault();
        post('/reservation');
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
                        onSelect={handleCheckIn}
                        disabled={(date) => date < new Date() || (checkOutDate && date >= checkOutDate)}
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
                {errors.check_in && <p className="text-sm text-red-500 ">{errors.check_in}</p>}
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
                        onSelect={handleCheckOut}
                        disabled={(date) => date <= new Date() || (checkInDate && date <= checkInDate)}
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
                {errors.check_out && <p className="text-sm text-red-500 ">{errors.check_out}</p>}
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

            <Button size="lg" className="w-full border-success border text-success font-bold" type="submit" disabled={nights <= 0 || processing}>
                Reserve Now
            </Button>
            <div className="text-center text-sm text-muted-foreground">You won't be charged yet</div>
        </CardContent>
        </Card>
    </form>
  )
}

export default RoomForm