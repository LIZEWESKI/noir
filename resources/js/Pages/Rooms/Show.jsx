import React, {useState, useEffect} from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { format, differenceInDays, addDays } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Bed,
  Users,
  Bath,
  Maximize2,
  Wifi,
  Coffee,
  Wind,
  Tv,
  Utensils,
  Check,
  Calendar,
  ChevronRight,
} from "lucide-react"
import Layout from "@/Layouts/Layout"
import RelatedRoomsCarousel from "./RelatedRoomsCarousel"

const Show = ({room, related_rooms}) => {
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
  // This Should be actually coming from the back-end but we're hardcoding it for now
  const additionalData = {
    longDescription:
      "Experience comfort and convenience in our Standard Single Room. This thoughtfully designed space offers everything a solo traveler needs for a pleasant stay. The room features a comfortable single bed with premium linens, a modern bathroom with shower, and a work desk. Enjoy amenities including free WiFi, flat-screen TV, and climate control. The large windows provide natural light and beautiful views, creating a bright and welcoming atmosphere. Perfect for business travelers or those exploring the city on their own.",
    amenities: [
      { name: "Free WiFi", icon: <Wifi className="h-5 w-5" /> },
      { name: "Breakfast Available", icon: <Coffee className="h-5 w-5" /> },
      { name: "Air Conditioning", icon: <Wind className="h-5 w-5" /> },
      { name: "Flat-screen TV", icon: <Tv className="h-5 w-5" /> },
      { name: "Work Desk", icon: <Utensils className="h-5 w-5" /> },
      { name: "Daily Housekeeping", icon: <Utensils className="h-5 w-5" /> },
    ],
    policies: [
      "Check-in: 3:00 PM",
      "Check-out: 11:00 AM",
      "No smoking",
      "No pets allowed",
      "Cancellation: 24 hours before arrival for full refund",
    ]
  }

  return (
    <div className=" py-3">
      {/* Gallery Section */}
      <div className="mb-12">
        <div className="aspect-[16/9] overflow-hidden rounded-lg max-w-4xl mx-auto">
          <img
            src={room.image_path_url}
            alt={room.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Room Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column - Room Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Room Header */}
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {room.features.map((feature) => (
                <Badge key={feature.id} variant="secondary" className="rounded-full">
                  {feature.name}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{room.name}</h1>
            <div className="flex flex-wrap gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Maximize2 className="h-5 w-5" />
                <span>{room.size}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>
                  {room.guests} {room.guests === 1 ? "Guest" : "Guests"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Bed className="h-5 w-5" />
                <span>{room.bed}</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-5 w-5" />
                <span>
                  {room.bathrooms} {room.bathrooms === 1 ? "Bathroom" : "Bathrooms"}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Room Description */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">About This Room</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{room.description}</p>
            <p className="text-muted-foreground leading-relaxed">{additionalData.longDescription}</p>
          </div>

          {/* Tabs for Details */}
          <Tabs defaultValue="amenities" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="policies">Policies</TabsTrigger>
            </TabsList>
            <TabsContent value="amenities" className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {additionalData.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="text-primary">{amenity.icon}</div>
                    <span>{amenity.name}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="policies" className="pt-6">
              <ul className="space-y-2">
                {additionalData.policies.map((policy, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>{policy}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column - Booking */}
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
      </div>

      {/* Related Rooms */}
        <RelatedRoomsCarousel relatedRooms={related_rooms}/>
    </div>
  )
}
Show.layout = (page) => <Layout children={page} />;
export default Show;

