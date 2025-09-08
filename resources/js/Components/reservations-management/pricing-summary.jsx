import React from 'react'
import { router } from '@inertiajs/react'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, LoaderCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const PricingSummary = ({
    selectedRoom,
    nights,
    pricing,
    rsvTotalPrice,
    status,
    processing
}) => {
  return (
    <Card className="lg:row-span-2">
        <CardHeader className="pb-4">
            <CardTitle className="text-lg">
            Pricing Summary
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="p-4 bg-muted/30 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Selected Room</span>
                <Badge variant="outline" className="text-xs">
                Room {selectedRoom.room_number}
                </Badge>
            </div>
            <div className="font-medium">{selectedRoom.name}</div>
            </div>

            {nights > 0 && (
            <div className="space-y-4">
                <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-sm">Room rate</span>
                    <span className="font-medium">${Number(pricing.roomPrice).toFixed(2)} / night</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm">
                    {nights} {nights === 1 ? "night" : "nights"}
                    </span>
                    <span className="font-medium">${pricing.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm">Cleaning fee</span>
                    <span className="font-medium">${pricing.cleaningFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm">Service fee</span>
                    <span className="font-medium">${pricing.serviceFee.toFixed(2)}</span>
                </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                <span className="font-bold text-lg">Total Amount</span>
                <span className="font-bold text-xl text-primary">${pricing.total.toFixed(2)}</span>
                </div>

                {rsvTotalPrice && Number(pricing.total) !== Number(rsvTotalPrice) && (
                <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium text-sm">Price Change Detected</span>
                    </div>
                    <div className="space-y-1 text-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Original Total:</span>
                        <span>${Number(rsvTotalPrice).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between font-medium">
                        <span>Difference:</span>
                        <span className={pricing.total > rsvTotalPrice ? "text-red-600" : "text-green-600"}>
                        {pricing.total > rsvTotalPrice ? "+" : ""}$
                        {(pricing.total - rsvTotalPrice).toFixed(2)}
                        </span>
                    </div>
                    </div>
                </div>
                )}
            </div>
            )}

            <Separator />
            {status === "completed" && (
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Payment Status</span>
                <Badge
                    className="flex items-center gap-1"
                >
                    <CheckCircle className="h-3 w-3" />
                    Paid
                </Badge>
                </div>
                <small className="text-muted-foreground">Payment method will be set to cash</small>
            </div>
            )}

            <div className="space-y-3 pt-4">
            <Button 
                type="submit" 
                className="w-full h-12 text-base font-medium" 
                size="lg"
                disabled={processing}
            >
                {processing && <LoaderCircle className="animate-spin"/>} Update Reservation
            </Button>
            <Button
                type="button"
                variant="outline"
                className="w-full h-12 bg-transparent border-primary/20 hover:border-primary/40"
                onClick={() => router.visit(route('admin.reservations_management.index'))}
            >
                Cancel Changes
            </Button>
            </div>
        </CardContent>
    </Card>
  )
}

export default PricingSummary