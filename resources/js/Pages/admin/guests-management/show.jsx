import { Button } from "@/components/ui/button"
import {
  Edit,
  Trash2,
} from "lucide-react"
import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"
import GuestProfile from "@/components/guests-management/guest-profile"
import ReservationsHistory from "@/components/guests-management/reservations-history"
import PaymentsHistory from "@/components/guests-management/payments-history"
import DeleteUserDialog from "@/components/ui/delete-user-dialog"
import { useState } from "react"

const breadcrumbs= [
    {
      title: 'Guests Management',
      href: '/admin/guests-management',
    },
    {
      title: 'Guest Details',
      href: '/admin/guest-management/{:id}',
    },
];


const Show = ({guest,stats,reservations,payments}) => {

  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Guest Details"/>
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Detailed guest information and history</p>
            <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Guest
            </Button>
            <Button
                variant="destructive"
                size="sm"
                onClick={() => setIsDeleteOpen(true)}
            >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Guest
            </Button>
            </div>
        </div>

        <GuestProfile guest={guest} stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Reservation History */}
            <ReservationsHistory reservations={reservations} />
            {/* Payments History */}
            <PaymentsHistory payments={payments}/>
        </div>
        </div>
        <DeleteUserDialog 
          open={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
          guestId={guest.id}
        />
    </AppLayout>
  )
}

export default Show
