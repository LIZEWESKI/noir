import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useCurrencyFormatter } from '@/hooks/use-currency-formatter'

const ShowPricingSummary = ({reservation}) => {
    const {formatCurrency} = useCurrencyFormatter()
    const hasDiscount = reservation.amount_due !== null

  return (
    <Card className="sticky top-6">
        <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Pricing Summary
        </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
        <div className="space-y-3">
            <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
                ${reservation.room.price} × {reservation.nights} nights
            </span>
            <span className="font-medium">{formatCurrency(reservation.room.price * reservation.nights)}</span>
            </div>

            <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Cleaning fee</span>
            <span className="font-medium">${reservation.cleaning_fee}</span>
            </div>

            <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Service fee</span>
            <span className="font-medium">${reservation.service_fee}</span>
            </div>

            {hasDiscount && (
            <>
                <Separator />
                <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${reservation.total_price}</span>
                </div>
                <div className="flex justify-between text-sm text-primary">
                <span className="flex items-center gap-1">
                    <span>Discount : {reservation.payments[0].coupon.code}
                    ({reservation.payments[0].coupon.type === "percentage" ? `${reservation.payments[0].coupon.value}%` : `${formatCurrency(reservation.payments[0].coupon.value)}`})
                    </span>
                </span>
                <span className="font-medium">-{formatCurrency(reservation.total_price - reservation.amount_due)}</span>
                </div>
            </>
            )}
        </div>

        <Separator />

        <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total</span>
            <div className="text-right">
            {hasDiscount && (
                <p className="text-sm text-destructive line-through">${reservation.total_price}</p>
            )}
            <p className="text-2xl font-bold">
                ${hasDiscount ? reservation.amount_due : reservation.total_price}
            </p>
            </div>
        </div>

        {hasDiscount && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
            <p className="text-sm text-primary font-medium text-center">
                You saved {formatCurrency(reservation.total_price - reservation.amount_due)}!
            </p>
            </div>
        )}
        </CardContent>
    </Card>
  )
}

export default ShowPricingSummary