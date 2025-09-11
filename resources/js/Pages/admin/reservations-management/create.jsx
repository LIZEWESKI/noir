import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { differenceInDays, addDays, isWithinInterval, isSameDay } from "date-fns"
import { Label } from "@/components/ui/label"
import { Clock } from "lucide-react"
import AppLayout from "@/layouts/app-layout"
import { Head, useForm, usePage } from "@inertiajs/react"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { useFormatDate } from "@/hooks/use-format-date"
import GuestInfo from "@/components/reservations-management/guest-info"
import Heading from "@/components/reservations-management/heading"
import RoomSelection from "@/components/reservations-management/room-selection"
import DatePicker from "@/components/reservations-management/date-picker"
import DateTracker from "@/components/reservations-management/date-tracker"
import GuestSelect from "@/components/reservations-management/guest-select"
import ReservationStatusSelect from "@/components/reservations-management/reservation-status-select"
import PricingSummary from "@/components/reservations-management/pricing-summary"
import UserSelection from "@/components/reservations-management/user-selection"

const breadcrumbs= [
    {
      title: 'Reservations Management',
      href: '/admin/reservations-management',
    },
    {
      title: 'Create Reservation',
      href: '/admin/reservations-management/create',
    },
];

const CreateReservation = ({ rooms: availableRooms , users}) => {
  const getFormatDate = useFormatDate();

  const [selectedRoom, setSelectedRoom] = useState(availableRooms[0]);
  const [guestCount, setGuestCount] = useState(selectedRoom.guests)
  const [unavailableDates, setUnavailableDates] = useState(selectedRoom.unavailable_dates);
  // Parse unavailable dates excluding current reservation
  const parsedUnavailableDates = unavailableDates.map((range) => ({
    checkIn: range.check_in instanceof Date ? range.checkIn : new Date(range.check_in),
    checkOut: range.check_out instanceof Date ? range.checkOut : new Date(range.check_out),
  }))

  // Parse CheckIn and CheckOut dates for formatting and validating
  const [checkInDate, setCheckInDate] = useState(null)
  const [checkOutDate, setCheckOutDate] = useState(null)
  // Guest Mode
  const [mode, setMode] = useState("existing")

  const { data, setData, post, processing, errors } = useForm({
    user_type: mode,
    room_id: selectedRoom.id,
    check_in: null,
    check_out: null,
    status: 'pending',
    user_id: null,
    name: null,
    email: null,
  })
  
  const [selectedGuest, setSelectedGuest] = useState(null)
  const [newGuestData, setNewGuestData] = useState({ name: "", email: "" })
  const handleGuestSelect = (guestId) => {  
    const guest = users.find((g) => g.id === Number.parseInt(guestId))
    setSelectedGuest(guest)
    setData('user_id',guest.id)
  }

  const handleRemoveGuestSelect = () => {
    setSelectedGuest(null)
    setData('user_id', null)
  }

  const handleNewGuestChange = (field, value) => {
    const updatedData = {
      ...newGuestData,
      [field]: value,
    }
    setNewGuestData(updatedData)
  }

  const [nights, setNights] = useState(0)
  const [pricing, setPricing] = useState({
    roomPrice: selectedRoom.price || 0,
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
    setCheckInDate(null)
    setCheckOutDate(null)
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
    if (checkInDate && checkOutDate) {
      const nightsCount = differenceInDays(checkOutDate, checkInDate)
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
  }, [checkInDate, checkOutDate, selectedRoom.price, pricing.cleaningFee, pricing.serviceFee])

  // Date validation functions
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

    data.user_type = mode === "existing" ? "existing" : "new"
    if (mode === "existing" && selectedGuest) {
      data.user_id = selectedGuest.id
      data.name = null
      data.email = null
    } else if (mode === "new") {
      data.user_id = null
      data.name = newGuestData.name
      data.email = newGuestData.email
    }

    post(route("admin.reservations_management.store"))
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs} >
      <Head title="Create Reservation"/>
      <div className="p-6 space-y-6">

        <Heading status={data.status} />

        <UserSelection
          mode={mode}
          setMode={setMode}
          existingUsers={users}
          selectedGuest={selectedGuest}
          onGuestChange={handleGuestSelect}
          onRemoveSelectedGuest={handleRemoveGuestSelect}
          newGuestData={newGuestData}
          onNewGuestChange={handleNewGuestChange}
          errors={errors}
        />
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <Card className="lg:col-span-2 ">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">
                Reservation Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">

              <RoomSelection 
                availableRooms={availableRooms}
                selectedRoom={selectedRoom}
                handleSelectedRoom={handleSelectedRoom}
                roomError={errors.room_id}
              />

              <div className="space-y-4">
                <Label className="text-base font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Stay Duration
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Date Picker for Check In */}
                  <DatePicker 
                    label="Check-in Date"
                    selectedDate={checkInDate}
                    setSelectedDate={handleCheckIn}
                    isDateUnavailable={isDateUnavailable}
                    otherDate={checkOutDate}
                    compareType="max"
                    error={errors.check_in}
                  />
                  {/* Date Picker for Check Out */}
                  <DatePicker 
                    label="Check-out Date"
                    selectedDate={checkOutDate}
                    setSelectedDate={handleCheckOut}
                    isDateUnavailable={isDateUnavailable}
                    otherDate={checkInDate}
                    isDateInvalid={isCheckoutDateInvalid}
                    error={errors.check_out}
                  />
                </div>

                {checkInDate && checkOutDate && nights > 0 && (
                  <DateTracker 
                    checkInDate={checkInDate} 
                    checkOutDate={checkOutDate} 
                    nights={nights} 
                  />
                )}

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GuestSelect 
                  guestCount={guestCount}
                  setGuestCount={setGuestCount}
                  selectedRoom={selectedRoom}
                />

                <ReservationStatusSelect 
                  status={data.status}
                  setData={setData}
                  error={errors.status}
                />
              </div>
            </CardContent>
          </Card>

          <PricingSummary 
            selectedRoom={selectedRoom}
            nights={nights}
            pricing={pricing}
            status={data.status}
            processing={processing}
          />
        </form>
      </div>
      <Toaster/>
    </AppLayout>
  )
}

export default CreateReservation
