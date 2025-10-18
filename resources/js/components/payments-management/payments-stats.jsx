import { Card, CardContent } from "@/components/ui/card"
import { useCurrencyFormatter } from "@/hooks/use-currency-formatter";
import { DollarSign, CheckCircle, Clock, XCircle } from "lucide-react"

const PaymentsStats = ({ stats }) => {
  const statMeta = {
    total_revenue: {
        title: "Total Revenue",
        icon: DollarSign,
        color: "text-yellow-500",
        bgColor: "bg-yellow-500/10",
    },
    total_payments: {
        title: "Total Payment",
        icon: CheckCircle,
        color: "text-primary",
        bgColor: "bg-primary/10",
    },
    completed_payments: {
        title: "Completed Payments",
        icon: CheckCircle,
        color: "text-green-500",
        bgColor: "bg-green-500/10",
    },
    pending_payments: {
        title: "Pending Payments",
        icon: Clock,
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
    },
    cancelled_payments: {
        title: "Cancelled Payments",
        icon: XCircle,
        color: "text-red-500",
        bgColor: "bg-red-500/10",
    },
  }
  const { formatCurrency } = useCurrencyFormatter();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map((stat, index) => {
        const meta = statMeta[stat.key]
        if (!meta) return null

        const { icon: Icon, color, bgColor } = meta
        return (
          <Card key={index} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {meta.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.isCurrency ? formatCurrency(stat.value) : stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
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

export default PaymentsStats
