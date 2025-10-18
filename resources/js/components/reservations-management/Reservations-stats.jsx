import { Card, CardContent } from "@/components/ui/card"
import { CalendarCheck, CalendarX, Users, Clock } from "lucide-react"

const ReservationStats = ({stats}) => {
  const statMeta = {
    "checkins": {
      icon: CalendarCheck,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    "checkouts": {
      icon: CalendarX,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    "occupancy": {
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    "pending": {
      icon: Clock,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const meta = statMeta[stat.key]
        if (!meta) return null

        const { icon: Icon, color, bgColor } = meta
        return (
          <Card key={index} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </div>
                <div className={`p-3 rounded-full ${bgColor}`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default ReservationStats
