import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useCurrencyFormatter } from "@/hooks/use-currency-formatter";
import { BadgeDollarSign, Calendar, Home } from "lucide-react";

export function SectionCards({metric}) {
    const { formatCurrency } = useCurrencyFormatter();
    const iconList = [
      {
        name: "booking",
        icon: <Calendar className="!size-5"/>
      },
      {
        name: "revenue",
        icon: <BadgeDollarSign className="!size-5"/>
      },
      {
        name: "rooms",
        icon: <Home className="!size-5"/>
      },
    ]
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{metric.description}</CardDescription>
        <CardTitle className="text-4xl py-4 font-semibold tabular-nums @[250px]/card:text-3xl">
          {metric.type === "currency" ? formatCurrency(metric.value,"USD","en-US"): metric.value}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            {iconList.map(icon => (
              <span key={icon.name}>
                {icon.name === metric.name && icon.icon}
              </span>
            ))}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="text-muted-foreground">
          Acquisition needs attention
        </div>
      </CardFooter>
    </Card>
  )
}
