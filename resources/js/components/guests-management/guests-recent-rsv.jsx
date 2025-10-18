import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight, Calendar } from "lucide-react"
import { useInitials } from "@/hooks/use-initials"
import { getStatusColor } from "@/components/reservations-management/get-reservation-status"
import PriceDisplay from "@/components/reservations/price-display"

export default function GuestsRecentRsv({ users }) {
  const getInitials = useInitials()
  console.log(users[0].reservations);
  return (
    <Card className="border-border h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Users With Reservations This Week</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-4 rounded-lg border border-border bg-background/20 hover:bg-card/80 transition-colors"
          >
            {/* User Info */}
            <div className="flex items-center gap-4 mb-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.profile_picture_url} alt={user.name} />
                <AvatarFallback>
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>

              <div>
                <h4 className="font-medium text-sm">{user.name}</h4>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>

            {/* User Reservations */}
            <div className="space-y-2">
              {user.reservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className="flex items-center justify-between p-2 rounded-md border border-border bg-card/40"
                >
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {reservation.check_in} <ArrowRight className="w-4 h-4" /> {reservation.check_out}
                  </div>

                  <div className="flex items-center gap-4">
                    <PriceDisplay 
                      original={reservation.total_price}
                      discounted={reservation.amount_due}
                      model="reservation"
                      className="text-sm"
                    />
                    <Badge className={`text-xs px-2 py-0 ${getStatusColor(reservation.status)}`}>
                      {reservation.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
