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
import GuestsDataTable from "@/components/guests-management/guests-data-table"
import GuestsStats from "@/components/guests-management/guests-stats"
import RecentUsers from "@/components/guests-management/recent-users"
import GuestsRecentRsv from "@/components/guests-management/guests-recent-rsv"

const breadcrumbs= [
    {
      title: 'Guests Management',
      href: '/admin/guests-management',
    },
];

export default function Index({users,stats,new_users,guests_with_reservations}) {
  const {flash} = usePage().props;
  console.log(new_users)
  console.log(guests_with_reservations)
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
  
  const handleEditGuest = (user) => {
    router.visit(`/admin/guests-management/edit/${user.id}`)
  }

  const viewGuest = (user) => {
    router.visit(`/admin/guests-management/${user.id}`)
  }

  const DELETING_ALERT = {
    title: "Delete User",
    description: "Are you sure you want to delete this user? This action cannot be undone.",
    action: (userId) => {
      router.post(`/admin/users-management/destroy/${userId}`,{id: userId},{
        preserveState: false,
      })
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Users Management"/>
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center gap-4">
            <p className="text-muted-foreground mt-1">Manage and track all hotel guests</p>
            <div className="flex items-center gap-2">
              <IconToolTip label="Add Guest" className="rounded-full p-1 flex justify-between items-center">
                <Button 
                  size="sm"
                  onClick={() => router.visit('/admin/guest-management/create')}
                >
                  <Plus className="h-6 w-6" />
                </Button>
              </IconToolTip>
            </div>
          </div>
        <div>
        </div>
        <GuestsStats stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GuestsRecentRsv users={guests_with_reservations}/>
          <RecentUsers newUsers={new_users}/>
        </div>
        <GuestsDataTable 
          data={users} 
          onEdit={handleEditGuest} 
          onDelete={DELETING_ALERT} 
          viewGuest={viewGuest}
        />
        </div>
        <Toaster/>
    </AppLayout>
  )
}
