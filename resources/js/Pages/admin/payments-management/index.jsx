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
import PaymentsStats from "@/components/payments-management/payments-stats"
import PaymentsDataTable from "@/components/payments-management/payments-data-table"

const breadcrumbs= [
  {
    title: 'Payments Management',
    href: '/admin/payments-management',
  },
];

export default function Index({payments, summary}) {
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
  
  console.log("summary", summary)
  console.log("payments", payments)

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Payments Management"/>
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center gap-4">
            <p className="text-muted-foreground mt-1">track all hotel payments</p>
          </div>
        <div>
        </div>
        {/* <GuestsStats stats={stats} /> */}
        <PaymentsStats stats={summary} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* <GuestsRecentRsv users={guests_with_reservations}/>
          <RecentUsers newUsers={new_users}/> */}
        </div>
        <PaymentsDataTable data={payments} />
        {/* <GuestsDataTable 
          data={users} 
          onEdit={handleEditGuest} 
          onDelete={DELETING_ALERT} 
          viewGuest={viewGuest}
        /> */}
        </div>
        <Toaster/>
    </AppLayout>
  )
}
