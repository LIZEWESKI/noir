import { useEffect } from "react"
import AppLayout from "@/layouts/app-layout"
import { Head, router, usePage } from "@inertiajs/react"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Plus,
} from "lucide-react"
import IconToolTip from "@/components/ui/icon-tooltip"
import RecentReservations from "@/components/reservations-management/recent-reservations"
import ReservationsDataTable from "@/components/reservations-management/reservations-data-table"
import ReservationTimeline from "@/components/reservations-management/reservations-timeline"
import ReservationStats from "@/components/reservations-management/Reservations-stats"

const breadcrumbs= [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
  },
  {
    title: 'Reservations Management',
    href: '/admin/reservations-management',
  },
];

export default function Index({
  reservations_management,
  stats,
  timeline,
  recent_reservations
}) {
  const {flash} = usePage().props;
  useEffect(() => {
    flash.success && toast.success(flash.success, {
      descriptionClassName: "text-white/90", 
      duration: 3000,
      position: "top-center",
      style: {
        backgroundColor: "hsl(var(--primary))",
        color: "#fff",
      }
    })
  }, [flash]);
  
  const handleEditReservation = (reservation) => {
    router.visit(`/admin/reservations-management/edit/${reservation.id}`)
  }

  const viewRoom = (room) => {
    router.visit(`/rooms/${room.id}`)
  }

  const viewGuest = (user) => {
    router.visit(`/admin/guests-management/${user.id}`)
  }

  const handleDeleteReservation = {
    title: "Cancel Reservation",
    description: "Are you sure you want to cancel this reservation? This action cannot be undone.",
    action: (reservationId) => {
      router.post(`/admin/reservations-management/cancel/${reservationId}`,{id: reservationId},{
        preserveState: false,
      })
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Reservation Management"/>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between gap-4">
              <p className="text-muted-foreground mt-1">Manage and track all hotel reservations</p>
              <IconToolTip label="Add Reservation" className="rounded-full p-1 flex justify-between items-center">
                <Button 
                  size="sm"
                  onClick={() => router.visit('/admin/reservations-management/create')}
                >
                  <Plus className="h-6 w-6" />
                </Button>
              </IconToolTip>
            </div>
            <ReservationStats stats={stats}/>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ReservationTimeline timelineData={timeline}/>
              <RecentReservations recentReservations={recent_reservations} />
            </div>
            <ReservationsDataTable 
              data={reservations_management}
              onEdit={handleEditReservation} 
              onDelete={handleDeleteReservation}
              viewGuest={viewGuest}
              viewRoom={viewRoom}
            />
          </div>
        <Toaster/>
    </AppLayout>
  )
}
