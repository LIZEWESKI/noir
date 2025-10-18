import { useEffect, useState } from "react"
import RoomCard from "@/components/rooms-management/room-card"
import AppLayout from "@/layouts/app-layout"
import { Head, router, usePage } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { Plus, Table, Grid } from "lucide-react"
import FilterSection from "@/components/rooms-management/filter-section"
import RoomsDataTable from "@/components/rooms-management/rooms-data-table"
import IconToolTip from "@/components/ui/icon-tooltip"
import Can from "@/components/can"

const breadcrumbs= [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
  },
  {
    title: 'Rooms Management',
    href: '/admin/rooms-management',
  },
];

export default function Index({rooms_management}) {
  const {flash} = usePage().props
  const [rooms, setRooms] = useState(rooms_management)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [viewMode, setViewMode] = useState("grid")

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) || room.room_number.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || room.status === statusFilter
    const matchesType = typeFilter === "all" || room.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const DELETING_ALERT = {
    title : "Delete Room",
    description : "Are you sure you want to delete this room? This action cannot be undone and will permanently remove all related reservations and data.",
    action(roomId) {
      router.delete(`/admin/rooms-management/${roomId}`, {
        preserveState: false,
      });
    },
  }

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

  const handleEditRoom = (room) => {
    router.visit(`/admin/rooms-management/edit/${room.id}`)
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Room Management"/>
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center gap-4">
            <p className="text-muted-foreground mt-1">Manage and track all hotel rooms</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center border rounded-lg p-1">
                <IconToolTip label="Grid">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="h-8 px-3"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                </IconToolTip>
                <IconToolTip label="Table">
                  <Button
                    variant={viewMode === "table" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("table")}
                    className="h-8 px-3"
                  >
                    <Table className="h-4 w-4" />
                  </Button>
                </IconToolTip>
              </div>
              <Can permission="createRooms">
                <IconToolTip label="Add Room" className="rounded-full p-1 flex justify-between items-center">
                  <Button 
                    size="sm"
                    onClick={() => router.visit('/admin/rooms-management/create')}
                    className=" "
                  >
                    <Plus className="h-6 w-6" />
                  </Button>
                </IconToolTip>
              </Can>
            </div>
          </div>
        <div>
        </div>
        {viewMode === "table" ? (
        <RoomsDataTable  data={rooms} onEdit={(handleEditRoom)} onDelete={DELETING_ALERT} />) : 
        (
          <>
            <div className="flex flex-col sm:flex-row gap-4">
              <FilterSection 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm} 
                statusFilter={statusFilter} 
                setStatusFilter={setStatusFilter}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRooms.map((room) => (
                <RoomCard 
                  key={room.id} 
                  room={room} 
                  onEdit={() => router.visit(`/admin/rooms-management/edit/${room.id}`)}
                  onView={() => router.visit(`/rooms/${room.id}`)}
                  onDelete={DELETING_ALERT} 
                />
                ))}
            </div>
          </>)}
        </div>
        <Toaster/>
    </AppLayout>
  )
}
