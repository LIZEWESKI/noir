import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { format, differenceInDays, addDays, isWithinInterval, isSameDay } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  AlertCircle,
  LoaderCircle,
} from "lucide-react"
import AppLayout from "@/layouts/app-layout"
import { Head, router, useForm, usePage } from "@inertiajs/react"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { useFormatDate } from "@/hooks/use-format-date"
import GuestInfo from "@/components/reservations-management/guest-info"
import Heading from "@/components/reservations-management/heading"

const breadcrumbs= [
    {
      title: 'Reservations Management',
      href: '/admin/reservations-management',
    },
    {
      title: 'Edit Reservation',
      href: '/admin/reservations-management/edit/{:id}',
    },
];

const EditReservationForm = ({reservation, unavailable_dates, rooms: availableRooms }) => {

  const getFormatDate = useFormatDate();

  const [unavailableDates, setUnavailableDates] = useState(() => unavailable_dates);
  // Parse unavailable dates excluding current reservation
  const parsedUnavailableDates = unavailableDates.map((range) => ({
    checkIn: range.check_in instanceof Date ? range.checkIn : new Date(range.check_in),
    checkOut: range.check_out instanceof Date ? range.checkOut : new Date(range.check_out),
  }))

  // Parse CheckIn and CheckOut dates for formatting and validating
  const [checkInDate, setCheckInDate] = useState(reservation.check_in ? new Date(reservation.check_in) : null)
  const [checkOutDate, setCheckOutDate] = useState(reservation.check_out ? new Date(reservation.check_out) : null)

  const { data, setData, put, processing, errors } = useForm({
    room_id: reservation.room_id,
    check_in: reservation.check_in,
    check_out: reservation.check_out,
    status: reservation.status
  })



  const [selectedRoom, setSelectedRoom] = useState(reservation.room);
  const [guestCount, setGuestCount] = useState(selectedRoom.guests)

  const [nights, setNights] = useState(0)
  const [pricing, setPricing] = useState({
    roomPrice: selectedRoom.price,
    subtotal: 0,
    cleaningFee: 25,
    serviceFee: 15,
    total: 0,
  })
  const handleSelectedRoom = (roomId) => {
    const room = availableRooms.find((room) => room.id === roomId)
    setSelectedRoom(room)
    // set unavailable dates that corresponds with this new room
    setUnavailableDates(room.unavailable_dates)
    // Reset checkin & checkout when room changes
    // update the room id
    setData((prev) => ({
      ...prev,
      check_in: null,
      check_out: null,
      room_id: room.id
    }))
  }

  const {errors : exceptionErrors} = usePage().props;
  useEffect(() => {
    exceptionErrors.date && toast.error(exceptionErrors.date, {
      descriptionClassName: "text-white/90", 
      duration: 5000,
      position: "top-center",
      style: {
        backgroundColor: "hsl(var(--destructive))",
        color: "#fff",
      }
    })
  }, [exceptionErrors]);

  // Calculate nights and pricing
  useEffect(() => {
    if (data.check_in && data.check_out) {
      const nightsCount = differenceInDays(data.check_out, data.check_in)
      setNights(nightsCount > 0 ? nightsCount : 0)

      const roomPrice = selectedRoom.price
      const subtotal = roomPrice * nightsCount
      const total = subtotal + pricing.cleaningFee + pricing.serviceFee

      setPricing((prev) => ({
        ...prev,
        roomPrice,
        subtotal,
        total,
      }))
    }
  }, [data.check_in, data.check_out, selectedRoom.price, pricing.cleaningFee, pricing.serviceFee])

  // Date validation functions (similar to room-form)
  const isDateUnavailable = (date) => {
    if (!unavailableDates || unavailableDates.length === 0) return false

    return parsedUnavailableDates.some((range) => {
      if (!(range.checkIn instanceof Date) || !(range.checkOut instanceof Date)) return false

      return (
        isWithinInterval(date, { start: range.checkIn, end: range.checkOut }) ||
        isSameDay(date, range.checkIn) ||
        isSameDay(date, range.checkOut)
      )
    })
  }

  const isCheckoutDateInvalid = (date) => {
    if (!checkInDate) return false
    if (!unavailableDates || unavailableDates.length === 0) return false

    let currentDate = checkInDate
    while (differenceInDays(date, currentDate) >= 0) {
      if (isDateUnavailable(currentDate)) return true
      currentDate = addDays(currentDate, 1)
    }
    return false
  }

  const handleCheckIn = (date) => {
    // Making sure to always resetting check out date 
    setCheckInDate(date)
    setCheckOutDate(null)
    setData((prev) => ({
      ...prev,
      check_in: date ? getFormatDate(date) : null,
      check_out: "",
    }))
  }

  const handleCheckOut = (date) => {
    setCheckOutDate(date)
    setData((prev) => ({
      ...prev,
      check_out: date ? getFormatDate(date) : null,
    }))
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    put(`/admin/reservations-management/${reservation.id}`)
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs} >
      <Head title="Edit Reservation"/>
      <div className="p-6 space-y-6">

        <Heading data={data} reservation={reservation} />
        <GuestInfo user={reservation.user} />
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <Card className="lg:col-span-2 ">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">
                Reservation Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
            {/* Room Selection */}
            <div className="space-y-2">
              <Label>Room Assignment</Label>
              <Select
                value={selectedRoom.id.toString()}
                onValueChange={(value) => handleSelectedRoom(Number.parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableRooms.map((room) => (
                    <SelectItem key={room.id} value={room.id.toString()}>
                      <div className="flex items-center justify-between w-full">
                        <span>
                          Room {room.room_number} - {room.name}
                        </span>
                        <span className="text-muted-foreground ml-2">${room.price}/night</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.room_id && <p className="text-sm text-destructive font-medium ">{errors.room_id}</p>}
            </div>

              <div className="space-y-4">
                <Label className="text-base font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Stay Duration
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-muted-foreground">Check-in Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start h-12 bg-transparent border-primary/20 hover:border-primary/40"
                        >
                          <Calendar className="mr-3 h-4 w-4 text-primary" />
                          <div className="text-left">
                            <div className="font-medium">
                              {data.check_in ? format(data.check_in, "MMM dd, yyyy") : "Select date"}
                            </div>
                            {data.check_in && (
                              <div className="text-xs text-muted-foreground">{format(data.check_in, "EEEE")}</div>
                            )}
                          </div>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={checkInDate}
                          onSelect={handleCheckIn}
                          disabled={(date) =>
                            date < new Date() ||
                            (checkOutDate && date >= checkOutDate) ||
                            isDateUnavailable(date)
                          }
                          modifiers={{ unavailable: (date) => isDateUnavailable(date) }}
                          modifiersClassNames={{
                            unavailable:
                              "bg-[rgba(239,68,68,0.2)] text-red-800 line-through cursor-not-allowed hover:bg-[rgba(239,68,68,0.3)]",
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.check_in && <p className="text-sm text-destructive font-medium ">{errors.check_in}</p>}
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-muted-foreground">Check-out Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start h-12 bg-transparent border-primary/20 hover:border-primary/40"
                        >
                          <Calendar className="mr-3 h-4 w-4 text-primary" />
                          <div className="text-left">
                            <div className="font-medium">
                              {data.check_out ? format(data.check_out, "MMM dd, yyyy") : "Select date"}
                            </div>
                            {data.check_out && (
                              <div className="text-xs text-muted-foreground">{format(data.check_out, "EEEE")}</div>
                            )}
                          </div>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={checkOutDate}
                          onSelect={handleCheckOut}
                          disabled={(date) =>
                            date <= new Date() ||
                            (checkInDate && date <= checkInDate) ||
                            isCheckoutDateInvalid(date) ||
                            isDateUnavailable(date)
                          }
                          modifiers={{ unavailable: (date) => isDateUnavailable(date) }}
                          modifiersClassNames={{
                            unavailable:
                              "bg-[rgba(239,68,68,0.2)] text-red-800 line-through cursor-not-allowed hover:bg-[rgba(239,68,68,0.3)]",
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {errors.check_out && <p className="text-sm text-destructive font-medium ">{errors.check_out}</p>}
                  </div>
                </div>

                {data.check_in && data.check_out && nights > 0 && (
                  <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="font-medium">{format(data.check_in, "MMM dd")}</span>
                    </div>
                    <div className="flex-1 flex items-center gap-2">
                      <div className="flex-1 h-0.5 bg-primary/30"></div>
                      <div className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
                        {nights} {nights === 1 ? "night" : "nights"}
                      </div>
                      <div className="flex-1 h-0.5 bg-primary/30"></div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">{format(data.check_out, "MMM dd")}</span>
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-base font-medium flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Number of Guests
                  </Label>
                  <Select
                    value={guestCount.toString()}
                    onValueChange={(value) => setGuestCount(Number.parseInt(value))}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(selectedRoom.guests)].map((_, i) => (
                        <SelectItem key={i} value={(i + 1).toString()}>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            {i + 1} {i === 0 ? "Guest" : "Guests"}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-medium flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Reservation Status
                  </Label>
                  <Select value={data.status} onValueChange={(value) => setData("status", value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          Pending
                        </div>
                      </SelectItem>
                      <SelectItem value="completed">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          Completed
                        </div>
                      </SelectItem>
                      <SelectItem value="cancelled">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          Cancelled
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.status && <p className="text-sm text-destructive font-medium ">{errors.status}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:row-span-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">
                Pricing Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-muted/30 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Selected Room</span>
                  <Badge variant="outline" className="text-xs">
                    Room {selectedRoom.room_number}
                  </Badge>
                </div>
                <div className="font-medium">{selectedRoom.name}</div>
              </div>

              {nights > 0 && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Room rate</span>
                      <span className="font-medium">${Number(pricing.roomPrice).toFixed(2)} / night</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">
                        {nights} {nights === 1 ? "night" : "nights"}
                      </span>
                      <span className="font-medium">${pricing.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Cleaning fee</span>
                      <span className="font-medium">${pricing.cleaningFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Service fee</span>
                      <span className="font-medium">${pricing.serviceFee.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                    <span className="font-bold text-lg">Total Amount</span>
                    <span className="font-bold text-xl text-primary">${pricing.total.toFixed(2)}</span>
                  </div>

                  {Number(pricing.total) !== Number(reservation.total_price) && (
                    <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <span className="font-medium text-sm">Price Change Detected</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Original Total:</span>
                          <span>${Number(reservation.total_price).toFixed(2)}</span>
                        </div>
                        <div className="flex items-center justify-between font-medium">
                          <span>Difference:</span>
                          <span className={pricing.total > reservation.total_price ? "text-red-600" : "text-green-600"}>
                            {pricing.total > reservation.total_price ? "+" : ""}$
                            {(pricing.total - reservation.total_price).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <Separator />
              {data.status === "completed" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Payment Status</span>
                    <Badge
                      className="flex items-center gap-1"
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      Paid
                    </Badge>
                  </div>
                  <small className="text-muted-foreground">Payment method will be set to cash</small>
                </div>
              )}

              <div className="space-y-3 pt-4">
                <Button 
                type="submit" 
                className="w-full h-12 text-base font-medium" 
                size="lg"
                disabled={processing}
                >
                  {processing && <LoaderCircle className="animate-spin"/>} Update Reservation
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 bg-transparent border-primary/20 hover:border-primary/40"
                  onClick={() => router.visit(route('admin.reservations_management.index'))}
                >
                  Cancel Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
      <Toaster/>
    </AppLayout>
  )
}

export default EditReservationForm
