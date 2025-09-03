import { useEffect, useState } from "react"
import AppLayout from "@/layouts/app-layout"
import { Head, router, usePage } from "@inertiajs/react"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Filter,
  Calendar,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Plus,
} from "lucide-react"
import IconToolTip from "@/components/ui/icon-tooltip"
import RecentReservations from "@/components/reservations-management/recent-reservations"
import ReservationsDataTable from "@/components/reservations-management/reservations-data-table"

const breadcrumbs= [
    {
      title: 'Reservations Management',
      href: '/admin/reservations-management',
    },
];

export default function Index() {
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

  const handleDeleteReservation = {
    title: "Cancel Reservation",
    description: "Are you sure you want to cancel this reservation? This action cannot be undone.",
    action: (reservationId) => {
      console.log("[v0] Cancel reservation:", reservationId)
      // Handle cancellation logic here
    },
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Reservation Management"/>
            <div className="p-6 space-y-6">

            <div className="flex flex-col items-end justify-end gap-4">
              <IconToolTip label="Add Reservation" className="rounded-full p-1 flex justify-between items-center">
                <Button 
                  size="sm"
                  onClick={() => router.visit('/admin/reservation-management/create')}
                >
                  <Plus className="h-6 w-6" />
                </Button>
              </IconToolTip>
            </div>

            {/* Reservations Table */}
            <RecentReservations />
            <ReservationsDataTable onEdit={handleEditReservation} onDelete={handleDeleteReservation} />
            </div>
        <Toaster/>
    </AppLayout>
  )
}
