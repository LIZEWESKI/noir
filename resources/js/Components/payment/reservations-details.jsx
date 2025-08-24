import { Calendar, Users, Bed, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import PaypalButton from "./paypal-button"

const ReservationsDetails = ({ reservations }) => {
  const subtotal = reservations.reduce((sum, item) => {
    const roomTotal = Number.parseFloat(item.room.price) * Number(item.nights)
    return sum + roomTotal
  }, 0)

  const cleaningFees = reservations.reduce((sum, item) => sum + Number(item.cleaning_fee), 0)
  const serviceFees = reservations.reduce((sum, item) => sum + Number(item.service_fee), 0)
  const finalTotal = subtotal + cleaningFees + serviceFees

  return (
    <>
      <Card className="overflow-hidden border border-border/60">
        <CardHeader className="bg-primary/5 pb-4">
          <CardTitle>Your Reservation</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {reservations.map((reservation, index) => (
            <div key={reservation.id} className={`${index !== reservations.length - 1 ? "border-b" : ""}`}>
              <div className="flex flex-col md:flex-row">
                {/* Room Image */}
                <div className="md:w-1/3 h-48 md:h-auto aspect-video md:aspect-square relative">
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
                <div className="p-6 flex-1">
                  <h3 className="font-semibold text-lg line-clamp-1">{reservation.room.name}</h3>
                  <p className="text-muted-foreground text-sm mt-1 mb-4 line-clamp-2">
                    {reservation.room.description || "Enjoy your stay in our comfortable and well-appointed room."}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Check-in</p>
                        <p>{format(new Date(reservation.check_in), "EEE, MMM dd, yyyy")}</p>
                        <p className="text-xs text-muted-foreground">After 2:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Check-out</p>
                        <p>{format(new Date(reservation.check_out), "EEE, MMM dd, yyyy")}</p>
                        <p className="text-xs text-muted-foreground">Before 11:00 AM</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Guests</p>
                        <p>
                          {reservation.room.guests || 2} {(reservation.room.guests || 2) === 1 ? "Guest" : "Guests"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bed className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Bed</p>
                        <p>{reservation.room.bed || "1 King Bed"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t flex justify-between items-end">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        ${Number.parseFloat(reservation.room.price).toFixed(2)} × {reservation.nights} nights
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        ${(Number.parseFloat(reservation.room.price) * reservation.nights).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="overflow-hidden border border-border/60">
        <CardHeader className="pb-3">
          <CardTitle>Important Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium text-sm mb-2">Hotel Policies</h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
              <li>Check-in time starts at 2 PM</li>
              <li>Check-out time is 11 AM</li>
              <li>Front desk staff will greet guests on arrival</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-2">Special Instructions</h3>
            <p className="text-sm text-muted-foreground">
              The credit card used to book the reservation must be presented by the cardholder at check-in along with
              matching photo identification.
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default ReservationsDetails

