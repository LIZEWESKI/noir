import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { getStatusColor } from "@/components/reservations-management/get-reservation-status"
import { useCapitalize } from "@/hooks/use-capitalize"
import ShowGuestInfo from "@/components/reservations-management/show-guest-info"
import ShowRoomInfo from "@/components/reservations-management/show-room-info"
import ShowStayInfo from "@/components/reservations-management/show-stay-info"
import ShowTimeLine from "@/components/reservations-management/show-timeline"
import ShowPricingSummary from "@/components/reservations-management/show-pricing-summary"

const breadcrumbs= [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
  },
  {
    title: 'Reservations Management',
    href: '/admin/reservations-management',
  },
  {
    title: 'Reservation Details',
    href: '/admin/reservations-management/{:id}',
  },
];

export default function ShowReservationPage({ reservation }) {
    console.log(reservation)
    const getCapitalized = useCapitalize();

    const checkInDate = new Date(reservation.check_in)
    const checkOutDate = new Date(reservation.check_out)
    const createdDate = new Date(reservation.created_at)
    const updatedDate = new Date(reservation.updated_at)

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reservation" />
            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                    <p className="text-muted-foreground">
                        Reservation ID: <span className="font-mono font-medium">RSV-{reservation.id}</span>
                    </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(reservation.status)} variant="outline">
                            {getCapitalized(reservation.status)}
                        </Badge>
                        <div className="text-xs text-muted-foreground">Last updated: {format(updatedDate, "MMM dd, yyyy")}</div>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <ShowGuestInfo reservation={reservation}/>
                        <ShowRoomInfo reservation={reservation} />
                        <ShowStayInfo 
                            reservation={reservation} 
                            checkInDate={checkInDate} 
                            checkOutDate={checkOutDate} 
                        />
                    </div>
                    <div className="space-y-6">
                        <ShowPricingSummary reservation={reservation} />
                        <ShowTimeLine 
                            createdDate={createdDate}
                            updatedDate={updatedDate}
                            checkInDate={checkInDate}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
