import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { format, differenceInDays, addDays, startOfDay, isWithinInterval, isSameDay } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Calendar, Info } from "lucide-react"
import { useForm } from "@inertiajs/react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useFormatDate } from "@/hooks/use-format-date"

const RoomForm = ({ room, unavailableDates = [] }) => {
  // Convert string dates to Date objects if they're not already
  const parsedUnavailableDates = unavailableDates.map((range) => ({
    checkIn: range.check_in instanceof Date ? range.checkIn : new Date(range.check_in),
    checkOut: range.check_out instanceof Date ? range.checkOut : new Date(range.check_out),
  }))
  const getFormatDate = useFormatDate();
  // in case you want to know what useFormatDate hook looks like
  
  // export function useFormatDate() {
  //     return useCallback((date) => {
  //         if (!date) return ""
  
  //         // Use local timezone formatting instead of UTC
  //         const year = date.getFullYear()
  //         const month = String(date.getMonth() + 1).padStart(2, "0")
  //         const day = String(date.getDate()).padStart(2, "0")
  //         return `${year}-${month}-${day}`
  //     }, []);
  // }
  
  
  // Calculate nights and total when dates change
  const [checkInDate, setCheckInDate] = useState()
  const [checkOutDate, setCheckOutDate] = useState()
  const { data, setData, post, processing, errors } = useForm({
    room_id: room.id,
    check_in: getFormatDate(checkInDate),
    check_out: getFormatDate(checkOutDate),
  })
  const [guestCount, setGuestCount] = useState(room.guests)
  const [nights, setNights] = useState(differenceInDays(checkOutDate, checkInDate))
  const roomPrice = Number.parseFloat(room.price)
  const cleaningFee = 25
  const serviceFee = 15
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
    // Reset the check-out date
    setCheckOutDate(null)
    setData({
      ...data,
      check_in: getFormatDate(checkIn),
      check_out: "", 
    })
  }

  const handleCheckOut = (checkOut) => {
    setCheckOutDate(checkOut)
    setData({
      ...data,
      check_out: getFormatDate(checkOut),
    })
  }

  // Handle reservation
  const handleReservation = (e) => {
    e.preventDefault()
    post("/reservation")
  }

  // Function to check if a date is unavailable (within any booked period)
  const isDateUnavailable = (date) => {
    // If there are no unavailable dates, return false
    if (!unavailableDates || unavailableDates.length === 0) {
      return false
    }

    return parsedUnavailableDates.some((range) => {
      // Make sure we have valid date objects
      if (!(range.checkIn instanceof Date) || !(range.checkOut instanceof Date)) {
        return false
      }

      // Check if the date is within the range or is the check-in/check-out date
      return (
        isWithinInterval(date, {
          start: range.checkIn,
          end: range.checkOut,
        }) ||
        isSameDay(date, range.checkIn) ||
        isSameDay(date, range.checkOut)
      )
    })
  }

  // Function to check if a checkout date would create an invalid booking
  const isCheckoutDateInvalid = (date) => {
    if (!checkInDate) return false

    // If there are no unavailable dates, just do basic validation
    if (!unavailableDates || unavailableDates.length === 0) {
      return false
    }

    // Check if any day between checkin and checkout is unavailable
    let currentDate = new Date(checkInDate)
    while (differenceInDays(date, currentDate) >= 0) {
      if (isDateUnavailable(currentDate)) {
        return true
      }
      currentDate = addDays(currentDate, 1)
    }

    return false
  }

  // Custom CSS for calendar days
  const dayClassNames = (date) => {
    if (isDateUnavailable(date)) {
      return "bg-red-100 text-red-800 opacity-70 line-through hover:bg-red-200"
    }
    return ""
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
                    {unavailableDates && unavailableDates.length > 0 && (
                      <div className="p-2 border-b border-border flex items-center justify-between">
                        <span className="text-sm font-medium">Select check-in date</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button type="button" className="h-4 w-4 text-muted-foreground focus:outline-none">
                                <Info className="h-4 w-4" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="space-y-2 w-60">
                                <p className="text-sm">Dates with red background are unavailable</p>
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 bg-red-100 rounded-sm"></div>
                                  <span className="text-xs">Unavailable</span>
                                </div>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    )}
                    <CalendarComponent
                      mode="single"
                      selected={checkInDate}
                      onSelect={handleCheckIn}
                      disabled={(date) =>
                        date < new Date() || (checkOutDate && date >= checkOutDate) || isDateUnavailable(date)
                      }
                      modifiers={{
                        unavailable: (date) => isDateUnavailable(date),
                      }}
                      modifiersClassNames={{
                        unavailable: "bg-[rgba(239,68,68,0.2)] text-red-800 line-through cursor-not-allowed hover:bg-[rgba(239,68,68,0.3)]",
                      }}
                      styles={{
                        day: (date) => ({
                          className: dayClassNames(date),
                        }),
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.check_in && <p className="text-sm text-destructive font-medium ">{errors.check_in}</p>}
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
                    {unavailableDates && unavailableDates.length > 0 && (
                      <div className="p-2 border-b border-border flex items-center justify-between">
                        <span className="text-sm font-medium">Select check-out date</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button type="button" className="h-4 w-4 text-muted-foreground focus:outline-none">
                                <Info className="h-4 w-4" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="space-y-2 w-60">
                                <p className="text-sm">Dates with red background are unavailable</p>
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 bg-red-100 rounded-sm"></div>
                                  <span className="text-xs">Unavailable</span>
                                </div>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    )}
                    <CalendarComponent
                      mode="single"
                      selected={checkOutDate}
                      onSelect={handleCheckOut}
                      disabled={(date) =>
                        date <= new Date() || (checkInDate && date <= checkInDate) || isCheckoutDateInvalid(date) || isDateUnavailable(date)
                      }
                      modifiers={{
                        unavailable: (date) => isDateUnavailable(date),
                      }}
                      modifiersClassNames={{
                        unavailable: "bg-[rgba(239,68,68,0.2)] text-red-800 line-through cursor-not-allowed hover:bg-[rgba(239,68,68,0.3)]",
                      }}
                      styles={{
                        day: (date) => ({
                          className: dayClassNames(date),
                        }),
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.check_out && <p className="text-sm text-destructive font-medium ">{errors.check_out}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Guests</label>
              <Select value={guestCount.toString()} onValueChange={(value) => setGuestCount(Number.parseInt(value))}>
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

          <Button
            size="lg"
            className="w-full bg-success text-white font-bold"
            type="submit"
            disabled={nights <= 0 || processing}
          >
            Reserve Now
          </Button>
          <div className="text-center text-sm text-muted-foreground">You won't be charged yet</div>
        </CardContent>
      </Card>
    </form>
  )
}

export default RoomForm

