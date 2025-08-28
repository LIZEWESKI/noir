import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import {
  Calendar,
  Clock,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  Download,
  Printer,
  Share2,
  XCircle,
  CheckCircle,
  AlertCircle,
  Bed,
  Users,
  Bath,
} from "lucide-react"
import { Link } from "@inertiajs/react"

// Status badge component with appropriate colors
const StatusBadge = ({ status }) => {
  const statusConfig = {
    pending: {
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500",
      icon: <Clock className="h-3 w-3 mr-1" />,
    },
    active: {
      color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500",
      icon: <CheckCircle className="h-3 w-3 mr-1" />,
    },
    completed: {
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500",
      icon: <CheckCircle className="h-3 w-3 mr-1" />,
    },
    cancelled: {
      color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500",
      icon: <XCircle className="h-3 w-3 mr-1" />,
    },
  }

  const config = statusConfig[status.toLowerCase()] || statusConfig.pending

  return (
    <Badge variant="outline" className={`flex items-center ${config.color} border-0`}>
      {config.icon}
      <span className="capitalize">{status}</span>
    </Badge>
  )
}

export default function ReservationDetail({ reservation, payment = null }) {
  // If no reservation is provided, show a not found message
  if (!reservation) {
    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <Link href="/profile/reservations">
            <Button variant="ghost" size="sm" className="-ml-3">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Reservations
            </Button>
          </Link>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10 text-center">
            <div className="rounded-full bg-muted p-3 mb-4">
              <AlertCircle className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">Reservation Not Found</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              The reservation you're looking for doesn't exist or you don't have access to it.
            </p>
            <Link href="/profile/reservations">
              <Button>View All Reservations</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/profile/reservations">
          <Button variant="ghost" size="sm" className="-ml-3">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Reservations
          </Button>
        </Link>

        <StatusBadge status={reservation.status} />
      </div>

      <div>
        <h1 className="text-2xl font-bold  ">Reservation Details</h1>
        <p className="text-muted-foreground">
          Booking #{reservation.id} • Made on {format(new Date(reservation.created_at), "MMMM dd, yyyy")}
        </p>
      </div>

      {/* Room Details */}
      <Card className="overflow-hidden">
        <div className="md:flex">
          {/* Room Image */}
          <div className="md:w-1/3 h-48 md:h-auto relative">
            <img
              src={reservation.room.image_path_url || "/placeholder.svg?height=400&width=300"}
              alt={reservation.room.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Room Info */}
          <div className="p-6 flex-1">
            <h2 className="text-xl font-semibold mb-2">{reservation.room.name}</h2>
            <p className="text-muted-foreground mb-4">{reservation.room.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Bed className="h-4 w-4 text-muted-foreground" />
                <span>{reservation.room.bed}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{reservation.room.guests} Guests</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-4 w-4 text-muted-foreground" />
                <span>
                  {reservation.room.bathrooms} {reservation.room.bathrooms === 1 ? "Bathroom" : "Bathrooms"}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4">
              <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-md">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Check-in</div>
                  <div>{format(new Date(reservation.check_in), "EEE, MMM dd, yyyy")}</div>
                  <div className="text-xs text-muted-foreground">After 2:00 PM</div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-md">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">Check-out</div>
                  <div>{format(new Date(reservation.check_out), "EEE, MMM dd, yyyy")}</div>
                  <div className="text-xs text-muted-foreground">Before 11:00 AM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Price Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Price Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span>
              {reservation.room.name} ({reservation.nights} {reservation.nights === 1 ? "night" : "nights"} × $
              {Number.parseFloat(reservation.room.price).toFixed(2)})
            </span>
            <span>${(Number.parseFloat(reservation.room.price) * reservation.nights).toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Cleaning fee</span>
            <span>${Number(reservation.cleaning_fee).toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Service fee</span>
            <span>${Number(reservation.service_fee).toFixed(2)}</span>
          </div>

          <Separator />

          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${Number(reservation.total_price).toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
        </CardHeader>
        <CardContent>
          {payment ? (
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span className="capitalize">{payment.payment_method}</span>
                </span>
                <Badge variant={payment.payment_status.toLowerCase() === "completed" ? "success" : "destructive"}>
                  {payment.payment_status}
                </Badge>
              </div>

              <div className="flex justify-between">
                <span>Transaction ID</span>
                <span className="font-mono">{payment.transaction_id || "N/A"}</span>
              </div>

              <div className="flex justify-between">
                <span>Payment Date</span>
                <span>{format(new Date(payment.created_at), "MMMM dd, yyyy")}</span>
              </div>

              <Separator />

              <div className="flex justify-between font-bold">
                <span>Amount Paid</span>
                <span>${Number(payment.total_amount).toFixed(2)}</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {reservation.status.toLowerCase() === "pending" ? (
                <div className="flex flex-col items-center text-center py-4">
                  <AlertCircle className="h-8 w-8 text-yellow-500 mb-2" />
                  <h3 className="font-medium">Payment Required</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    This reservation requires payment to be confirmed.
                  </p>
                  <Link href={`/payment?reservation=${reservation.id}`}>
                    <Button>Pay Now</Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center py-4">
                  <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
                  <h3 className="font-medium">No Payment Information</h3>
                  <p className="text-sm text-muted-foreground">
                    Payment information is not available for this reservation.
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Hotel Information */}
      <Card>
        <CardHeader>
          <CardTitle>Hotel Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <h3 className="font-medium">Address</h3>
              <p className="text-muted-foreground">
                Noir Hotel
                <br />
                73120 Courchevel 1850, France
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <h3 className="font-medium">Phone</h3>
              <p className="text-muted-foreground">+41 22 345 67 88</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <h3 className="font-medium">Email</h3>
              <p className="text-muted-foreground">reservations@noirhotel.com</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        {reservation.status.toLowerCase() === "active" && (
          <Button variant="destructive">
            <XCircle className="mr-2 h-4 w-4" />
            Cancel Reservation
          </Button>
        )}

        <Button variant="outline">
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>

        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>

        <Button variant="outline">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>
    </div>
  )
}

