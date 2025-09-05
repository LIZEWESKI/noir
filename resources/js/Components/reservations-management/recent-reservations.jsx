import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, MapPin } from "lucide-react"
import { useInitials } from "@/hooks/use-initials"
import { getStatusColor } from "@/components/reservations-management/get-reservation-status"

export default function RecentReservations({recentReservations}) {
  
  const getInitials = useInitials()

  return (
    <Card className="border-border h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Recent Reservations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentReservations.map((reservation) => (
          <div
            key={reservation.id}
            className="flex items-center justify-between p-4 rounded-lg border border-border bg-background/20 hover:bg-card/80 transition-colors"
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={reservation.user.profile_picture_url} alt={reservation.user.name} />
                <AvatarFallback className="">
                  {getInitials(reservation.user.name)}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-sm">{reservation.user.name}</h4>
                  <Badge variant="outline" className="text-xs px-2 py-0">
                    Room {reservation.room.room_number}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {reservation.check_in} - {reservation.check_out}
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
                <div className="font-semibold text-sm">${Number(reservation.total_price).toFixed(2)}</div>
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs px-2 py-0 ${getStatusColor(reservation.status)}`}>
                    {reservation.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
