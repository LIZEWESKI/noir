import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Calendar, CreditCard, MapPin } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const mockRecentReservations = [
  {
    id: 1,
    guest: {
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      avatar: "/diverse-woman-portrait.png",
      initials: "SJ",
    },
    room: {
      number: "301",
      name: "Ocean View Suite",
    },
    checkIn: "2025-01-15",
    checkOut: "2025-01-18",
    nights: 3,
    totalPrice: 850.0,
    status: "confirmed",
    paymentStatus: "paid",
  },
  {
    id: 2,
    guest: {
      name: "Marcus Chen",
      email: "m.chen@email.com",
      avatar: "/thoughtful-man.png",
      initials: "MC",
    },
    room: {
      number: "205",
      name: "Standard Double",
    },
    checkIn: "2025-01-20",
    checkOut: "2025-01-23",
    nights: 3,
    totalPrice: 420.0,
    status: "pending",
    paymentStatus: "pending",
  },
  {
    id: 3,
    guest: {
      name: "Elena Rodriguez",
      email: "elena.r@email.com",
      avatar: null,
      initials: "ER",
    },
    room: {
      number: "102",
      name: "Garden View Room",
    },
    checkIn: "2025-01-25",
    checkOut: "2025-01-27",
    nights: 2,
    totalPrice: 320.0,
    status: "confirmed",
    paymentStatus: "paid",
  },
  {
    id: 4,
    guest: {
      name: "David Kim",
      email: "d.kim@email.com",
      avatar: null,
      initials: "DK",
    },
    room: {
      number: "404",
      name: "Penthouse Suite",
    },
    checkIn: "2025-02-01",
    checkOut: "2025-02-05",
    nights: 4,
    totalPrice: 1200.0,
    status: "cancelled",
    paymentStatus: "refunded",
  },
]

const getStatusColor = (status) => {
  switch (status) {
    case "confirmed":
      return "bg-primary/10 text-primary border-primary/20"
    case "pending":
      return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
    case "cancelled":
      return "bg-red-500/10 text-red-600 border-red-500/20"
    default:
      return "bg-gray-500/10 text-gray-600 border-gray-500/20"
  }
}

const getPaymentStatusColor = (status) => {
  switch (status) {
    case "paid":
      return "bg-primary/10 text-primary border-primary/20"
    case "pending":
      return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
    case "refunded":
      return "bg-blue-500/10 text-blue-600 border-blue-500/20"
    default:
      return "bg-gray-500/10 text-gray-600 border-gray-500/20"
  }
}

export default function RecentReservations() {
  return (
    <Card className="border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Recent Reservations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockRecentReservations.map((reservation) => (
          <div
            key={reservation.id}
            className="flex items-center justify-between p-4 rounded-lg border border-border bg-background/20 hover:bg-card/80 transition-colors"
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={reservation.guest.avatar || "/placeholder.svg"} alt={reservation.guest.name} />
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {reservation.guest.initials}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-sm">{reservation.guest.name}</h4>
                  <Badge variant="outline" className="text-xs px-2 py-0">
                    Room {reservation.room.number}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {reservation.checkIn} - {reservation.checkOut}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {reservation.room.name}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right space-y-1">
                <div className="font-semibold text-sm">${reservation.totalPrice.toFixed(2)}</div>
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs px-2 py-0 ${getStatusColor(reservation.status)}`}>
                    {reservation.status}
                  </Badge>
                  <Badge className={`text-xs px-2 py-0 ${getPaymentStatusColor(reservation.paymentStatus)}`}>
                    <CreditCard className="h-3 w-3 mr-1" />
                    {reservation.paymentStatus}
                  </Badge>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Edit Reservation</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Send Confirmation</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Cancel Reservation</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
