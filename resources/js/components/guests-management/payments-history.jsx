import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard } from 'lucide-react'
import { getStatusColor } from "@/components/reservations-management/get-reservation-status"
import { useCapitalize } from '@/hooks/use-capitalize'
import PriceDisplay from '@/components/reservations/price-display'

const PaymentsHistory = ({payments,onModalClick}) => {

    const getCapitalize = useCapitalize()
  return (
    <Card >
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Payment History
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-3">
            {payments.map((payment) => (
                <div
                key={payment.id}
                onClick={() => onModalClick(payment.id)}
                className="p-4 rounded-lg border hover:border-primary cursor-pointer transition-all hover:bg-muted/20"
                >
                    <div className="flex items-start justify-between mb-2">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground">PYM-{payment.id}</span>
                                <Badge variant="outline" className={getStatusColor(payment.payment_status)}>
                                {payment.payment_status}
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{getCapitalize(payment.payment_method)}</p>
                        </div>
                        <PriceDisplay 
                            original={payment.total_amount}
                            discounted={payment.original_price}
                            model='payment'
                        />
                    </div>
                    <div className="text-xs text-muted-foreground">{new Date(payment.created_at).toLocaleDateString()}</div>
                </div>
            ))}
            </div>
        </CardContent>
    </Card>
  )
}

export default PaymentsHistory