import { useState } from "react"
import RoomModal from "@/components/rooms-management/room-modal"
import RoomCard from "@/components/rooms-management/room-card"
import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Plus, Table, Grid } from "lucide-react"
import FilterSection from "@/components/rooms-management/filter-section"
import RoomsDataTable from "@/components/rooms-management/rooms-data-table"

const breadcrumbs= [
    {
        title: 'Rooms Management',
        href: '/admin/rooms-management',
    },
];

export default function RoomManagement({rooms_management, features}) {
  
  const [rooms, setRooms] = useState(rooms_management)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRoom, setEditingRoom] = useState(null)
  const [viewMode, setViewMode] = useState("table")

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) || room.room_number.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || room.status === statusFilter
    const matchesType = typeFilter === "all" || room.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const handleAddRoom = () => {
    setEditingRoom(null)
    setIsModalOpen(true)
  }

  const handleEditRoom = (room) => {
    setEditingRoom(room)
    setIsModalOpen(true)
  }

  const handleSaveRoom = (roomData) => {
    if (editingRoom) {
      setRooms(rooms.map((room) => (room.id === editingRoom.id ? { ...roomData, id: editingRoom.id } : room)))
    } else {
      setRooms([...rooms, { ...roomData, id: Date.now() }])
    }
    setIsModalOpen(false)
    setEditingRoom(null)
  }

  const handleDeleteRoom = (roomId) => {
    if (confirm("Are you sure you want to delete this room?")) {
      setRooms(rooms.filter((room) => room.id !== roomId))
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Room Management"/>
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
          <div className="flex flex-col sm:flex-row justify-end items-end sm:items-end gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center border rounded-lg p-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="h-8 px-3"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Grid</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={viewMode === "table" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("table")}
                      className="h-8 px-3"
                    >
                    <Table className="h-4 w-4" />
                  </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Table</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Button onClick={handleAddRoom}>
                <Plus className="h-4 w-4 mr-2" />
                Add Room
              </Button>
            </div>
          </div>
        <div>
        </div>
        {viewMode === "table" ? (
        <RoomsDataTable data={rooms_management} onEdit={handleEditRoom} onDelete={handleDeleteRoom} />) : 
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
                  onEdit={handleEditRoom} 
                  onDelete={handleDeleteRoom} />
                ))}
            </div>
          </>)}

          <RoomModal
            room={editingRoom}
            isOpen={isModalOpen}
            features={features}
            onClose={() => {
              setIsModalOpen(false)
              setEditingRoom(null)
            }}
            onSave={handleSaveRoom}
          />
        </div>
    </AppLayout>
  )
}
