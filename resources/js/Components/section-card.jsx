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
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export function SectionCards({metric}) {
    const { formatCurrency } = useCurrencyFormatter();
    function getTrendsData(trend) {
      if (trend === null) {
        return {
          label: "No change",
          description: "No data compared to last month",
          icon: Minus,
          color: "text-gray-500",
          value: 0,
        };
      }

      if (trend > 0) {
        return {
          label: `Trending up this month`,
          description: trend > 20 
            ? "Strong growth compared to last month" 
            : "Slight improvement compared to last month",
          icon: TrendingUp,
          value: trend,
        };
      }

      if (trend < 0) {
        return {
          label: `Trending down this month`,
          description: trend < -20 
            ? "Significant drop compared to last month" 
            : "Slight decline compared to last month",
          icon: TrendingDown,
          value: trend,
        };
      }

      return {
        label: "0%",
        description: "Performance is stable",
        icon: Minus,
        value: 0,
      };
    }
    const trendsData = getTrendsData(metric.trend);
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
                {metric.trend >= 0 ? (<TrendingUp color="var(--success)"/>) : (<TrendingDown color="var(--danger)"/>) }
                {metric.trend}%
              </Badge>
            )}
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className={`line-clamp-1 flex gap-2 font-medium`}>
            {trendsData.label} <trendsData.icon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            {trendsData.description}
          </div>
        </CardFooter>
      </Card>
  )
}
