import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { format, differenceInDays, addDays, isWithinInterval, isSameDay } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  User,
  MapPin,
  CreditCard,
  Clock,
  Bed,
  Users,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import AppLayout from "@/layouts/app-layout"
import { Head, useForm } from "@inertiajs/react"
import { getStatusColor } from "@/components/reservations-management/get-reservation-status"
import { useInitials } from "@/hooks/use-initials"

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
  console.log("reservation", reservation)
  console.log("unavailableDates", unavailable_dates)
  console.log("rooms", availableRooms)
  const getInitials = useInitials();
  const { data, setData, post, processing, errors } = useForm(reservation)
  const [unavailableDates, setUnavailableDates] = useState(() => unavailable_dates);
  // const availableRooms = [
  //   { id: 101, number: "101", type: "Standard Single Room", price: 85.0, maxGuests: 2 },
  //   { id: 102, number: "102", type: "Standard Single Room - Ocean View", price: 95.0, maxGuests: 2 },
  //   { id: 201, number: "201", type: "Deluxe Double Room", price: 120.0, maxGuests: 4 },
  // ]
  // Parse unavailable dates excluding current reservation
  const parsedUnavailableDates = unavailableDates.map((range) => ({
    checkIn: range.check_in instanceof Date ? range.checkIn : new Date(range.check_in),
    checkOut: range.check_out instanceof Date ? range.checkOut : new Date(range.check_out),
  }))

  const [nights, setNights] = useState(0)
  const [pricing, setPricing] = useState({
    roomPrice: 0,
    subtotal: 0,
    cleaningFee: 25,
    serviceFee: 15,
    total: 0,
  })

  // Get selected room details
  const selectedRoom = availableRooms.find((room) => room.id === data.room.id) || reservation.room

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
  }, [data.checkInDate, data.checkOutDate, selectedRoom.price, pricing.cleaningFee, pricing.serviceFee])

  // Date validation functions (similar to room-form)
  const isDateUnavailable = (date) => {
    if (!unavailable_dates || unavailable_dates.length === 0) return false

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
    if (!data.checkInDate) return false
    if (!unavailable_dates || unavailable_dates.length === 0) return false

    let currentDate = new Date(data.checkInDate)
    while (differenceInDays(date, currentDate) >= 0) {
      if (isDateUnavailable(currentDate)) return true
      currentDate = addDays(currentDate, 1)
    }
    return false
  }

  const handleInputChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCheckInChange = (date) => {
    setData((prev) => ({
      ...prev,
      checkInDate: date,
      checkOutDate: null, // Reset checkout when checkin changes
    }))
  }

  const handleCheckOutChange = (date) => {
    setData((prev) => ({ ...prev, checkOutDate: date }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("[v0] Updating reservation:", data)
    // Handle form submission
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs} >
      <Head title="Edit Reservation"/>
      <div className="p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <p className="text-muted-foreground mt-1">Modify booking details and preferences</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Reservation ID:</span>
              <code className="px-2 py-1 bg-muted rounded font-mono text-foreground">RSV-{reservation.id}</code>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge className={getStatusColor(data.status)} variant="outline">
              {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
            </Badge>
            <div className="text-xs text-muted-foreground">Last updated: {format(data.updated_at, "MMM dd, yyyy")}</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Guest Information */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">
                Guest Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 p-6 bg-background rounded-xl border border-border">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={reservation.user.profile_picture_url} />
                  <AvatarFallback className="font-semibold text-lg">
                    {getInitials(reservation.user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg">{reservation.user.name}</h3>
                    <p className="text-muted-foreground text-sm">Primary Guest</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-medium">{reservation.user.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
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
                value={data.room.id.toString()}
                onValueChange={(value) => handleInputChange("roomId", Number.parseInt(value))}
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
                          selected={data.check_in}
                          onSelect={handleCheckInChange}
                          disabled={(date) =>
                            date < new Date() ||
                            (data.check_out && date >= data.check_out) ||
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
                          selected={data.check_out}
                          onSelect={handleCheckOutChange}
                          disabled={(date) =>
                            date <= new Date() ||
                            (data.check_in && date <= data.check_in) ||
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
                    value={data.room.guests.toString()}
                    onValueChange={(value) => handleInputChange("guests", Number.parseInt(value))}
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
                  <Select value={data.status} onValueChange={(value) => handleInputChange("status", value)}>
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

                  {pricing.total !== reservation.total_price && (
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
                      {/* {reservation.paymentStatus.charAt(0).toUpperCase() + reservation.paymentStatus.slice(1)} */}
                    </Badge>
                  </div>
                </div>
              )}

              <div className="space-y-3 pt-4">
                <Button type="submit" className="w-full h-12 text-base font-medium" size="lg">
                  Update Reservation
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 bg-transparent border-primary/20 hover:border-primary/40"
                >
                  Cancel Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </AppLayout>
  )
}

export default EditReservationForm
