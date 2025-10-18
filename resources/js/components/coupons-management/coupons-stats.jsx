import { Card, CardContent } from "@/components/ui/card"
import { Ticket, TrendingUp, DollarSign, Users } from "lucide-react"

const CouponsStats = ({stats}) => {
  const statMeta = {
    "coupons": {
      icon: Ticket,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    "redemptions": {
      icon: TrendingUp,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    "savings": {
      icon: DollarSign,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    "average": {
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
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

export default CouponsStats
