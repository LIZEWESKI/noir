import React ,{ useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CreditCard} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { format } from "date-fns"
import { Link, router } from '@inertiajs/react'
const OrderSummary = ({reservations}) => {
    const [totalAmount, setTotalAmount] = useState(0)
    // Calculate total amount
    useEffect(() => {
      const total = reservations.reduce((sum, item) => {
        const roomTotal = Number.parseFloat(item.room.price) * Number(item.nights) + Number(item.cleaning_fee) + Number(item.service_fee)
        return sum + roomTotal
      }, 0)
      setTotalAmount(total)
    }, [reservations])
  
    // Handle checkout
    const handleCheckout = () => {
        router.visit('/payment')
    }
  return (
    <div className="w-full md:w-1/3">
        <Card className="sticky top-8">
            <CardContent className="p-6 space-y-6">
                <h2 className="text-xl font-semibold">Order Summary</h2>
                <ScrollArea className="h-[200px] pr-4">
                <div className="space-y-4">
                    {reservations.map((reservation) => (
                    <div key={reservation.id} className="flex justify-between text-sm">
                        <div className="flex-1 pr-4">
                            <p className="font-medium">{reservation.room.name}</p>
                            <p className="text-muted-foreground">
                                {format(reservation.check_in, "MMM dd")} - {format(reservation.check_out, "MMM dd")}
                            </p>
                        </div>
                        <p>${Number.parseFloat(reservation.total_price).toFixed(2)}</p>
                    </div>
                    ))}
                </div>
                </ScrollArea>
                <Separator />
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${Number.parseFloat(totalAmount).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Taxes</span>
                        <span>${Number.parseFloat(0 * 0.1).toFixed(2)}</span>
                    </div>
                    <small className='text-muted-foreground'>We also hate paying taxes.</small>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${Number.parseFloat(totalAmount).toFixed(2)}</span>
                </div>

                <Alert className="bg-muted/50 border-muted">
                    <AlertDescription className="text-xs text-muted-foreground">
                        By proceeding, you agree to our terms and conditions, cancellation policy, and payment terms.
                    </AlertDescription>
                </Alert>

                <Button size="lg" className="w-full" onClick={handleCheckout}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Proceed to Payment
                </Button>

                <div className="text-center">
                <Link href="/rooms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Continue Browsing
                </Link>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default OrderSummary