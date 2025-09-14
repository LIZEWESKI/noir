import { useEffect } from "react"
import AppLayout from "@/layouts/app-layout"
import { Head, usePage } from "@inertiajs/react"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import PaymentsStats from "@/components/payments-management/payments-stats"
import PaymentsDataTable from "@/components/payments-management/payments-data-table"

const breadcrumbs= [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
  },
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
        <div className="space-y-6">
          <PaymentsStats stats={summary} />
          <PaymentsDataTable data={payments} />
        </div>
        </div>
        <Toaster/>
    </AppLayout>
  )
}
