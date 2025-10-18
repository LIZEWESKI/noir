import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from '@inertiajs/react'
import { Calendar } from 'lucide-react'
import { getStatusColor } from "@/components/reservations-management/get-reservation-status"
import PriceDisplay from '@/components/reservations/price-display'

const ReservationsHistory = ({reservations}) => {
  return (
    <Card>
        <CardHeader>
        <CardTitle className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-primary" />
        Reservation History
        </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-3">
            {reservations.map((reservation) => (
            <div
            key={reservation.id}
            className="rounded-lg p-4 border hover:border-primary cursor-pointer transition-all hover:bg-muted/20"
            >
                <Link
                    className="mb-4"
                    href={`/admin/reservations-management/edit/${reservation.id}`} 
                    prefetch
                >
                <div className="flex items-start justify-between mb-2">
                    <div>
                    <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">RSV-{reservation.id}</span>
                        <Badge variant="outline" className={getStatusColor(reservation.status)}>
                        {reservation.status}
                        </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {reservation.room.name} - Room {reservation.room.roon_number}
                    </p>
                    </div>
                    <PriceDisplay 
                        original={reservation.total_price}
                        discounted={reservation.amount_due}
                    />
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Check-in: {new Date(reservation.check_in).toLocaleDateString()}</span>
                    <span>Check-out: {new Date(reservation.check_out).toLocaleDateString()}</span>
                </div>
                </Link>
            </div>
            ))}
            </div>
        </CardContent>
    </Card>
  )
}

export default ReservationsHistory