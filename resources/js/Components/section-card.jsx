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
import { TrendingUp, TrendingDown } from "lucide-react";

export function SectionCards({metric}) {
    const { formatCurrency } = useCurrencyFormatter();
  return (
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{metric.description}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {metric.type === "currency" ? `${formatCurrency(metric.value,"USD","en-US")}` :  metric.value}
          
          </CardTitle>
          <CardAction>
            {metric.name !== "rooms" && (
              <Badge variant="outline">
                {metric.trend >= 0 ? (<TrendingUp color="green"/>) : (<TrendingDown color="red"/>) }
                {metric.trend}%
              </Badge>
            )}
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Trending up this month <TrendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Engagement exceed targets
              </div>
        </CardFooter>
      </Card>
  )
}
