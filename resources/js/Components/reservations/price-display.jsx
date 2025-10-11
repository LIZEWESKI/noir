import { useCurrencyFormatter } from "@/hooks/use-currency-formatter";
import { cn } from "@/lib/utils"

export default function PriceDisplay({ original, discounted,model = "reservation", className }) {
    
    const { formatCurrency } = useCurrencyFormatter()

    // this component is the most confusing one I've created so far (its 3AM)

    // the reservation and payment discount pricing logic are reveresed 
    // this is how I came up with, maybe it is an idiotic logic but as long as it works I don't mind it

    // reservation :
    // I should display amount_due 
    // line-through total_price
    // so in reservation we only want to display the total_price if amount_due is null
    // if amount_due isn't null we then want to display it and line-throught the total_price 
    if (model === "reservation") {
        if (discounted == null || discounted === original) {
            return <span className={cn("font-medium",className)}>{formatCurrency(original)}</span>;
        }
        return (
            <div className={cn("",className)}>
                <div className="font-medium">{formatCurrency(discounted)}</div>
                <div className="text-xs text-destructive line-through">{formatCurrency(original)}</div>
            </div>
        );
    }

    // payment :
    // I should display total_amount
    // line-through original_price
    // however in payment we only want to display the total_amount if original_price is null
    // if original_price isn't null we then want to display total_amount and line-through the original_price 
    if (model === "payment") {
        if (discounted == null || discounted === original) {
            return <span className={cn("font-medium",className)}>{formatCurrency(original)}</span>;
        }

        return (
            <div className={cn("",className)}>
                <div className="font-medium">{formatCurrency(original)}</div>
                <div className="text-xs text-destructive line-through">{formatCurrency(discounted)}</div>
            </div>
        );
    }

}
