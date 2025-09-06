import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, Clock, MapPin } from "lucide-react"
import { useInitials } from "@/hooks/use-initials"

const ReservationTimeline = ({timelineData}) => {
  console.log(timelineData)
  const getInitials = useInitials();

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <CalendarDays className="w-5 h-5 text-primary" />
          Reservation Timeline
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {timelineData.map((day, dayIndex) => (
          <div key={dayIndex} className="space-y-4">
            <h3 className="font-semibold text-foreground border-b border-border pb-2">{day.date}</h3>

            {/* Check-outs */}
            {day.checkOuts.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Check-outs
                </div>
                {day.checkOuts.map((checkout) => (
                  <div key={checkout.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={checkout.profile_pic_url} alt={checkout.user_name} />
                      <AvatarFallback>
                        {getInitials(checkout.user_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{checkout.user_name}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          Room {checkout.room_number}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {/* darn it, I don't have data for time x) Imma leave it static for now */}
                          11:00 AM
                        </span>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-orange-500 text-orange-500">
                      Check-out
                    </Badge>
                  </div>
                ))}
              </div>
            )}

            {/* Check-ins */}
            {day.checkIns.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Check-ins
                </div>
                {day.checkIns.map((checkin) => (
                  <div key={checkin.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={checkin.profile_picture_url} alt={checkin.user_name} />
                      <AvatarFallback>
                        {getInitials(checkin.user_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{checkin.user_name}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          Room {checkin.room_number}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {/* same as checkout :D */}
                          3:30 PM
                        </span>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-primary text-primary">
                      Check-in
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default ReservationTimeline
