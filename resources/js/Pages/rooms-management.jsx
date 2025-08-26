import { useState } from "react"
import RoomModal from "@/components/rooms-management/room-modal"
import RoomCard from "@/components/rooms-management/room-card"
import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search} from "lucide-react"


const mockRooms = [
  {
    id: 1,
    name: "Deluxe Ocean View",
    room_number: "101",
    type: "Deluxe",
    price: 299.99,
    status: "available",
    image_path: "/luxury-hotel-ocean-view.png",
    size: "45 sqm",
    guests: 2,
    bathrooms: 1,
    bed: "King",
    description: "Spacious room with stunning ocean views and modern amenities.",
    features: [
      { id: 1, name: "Ocean View" },
      { id: 2, name: "Balcony" },
      { id: 3, name: "Mini Bar" },
    ],
  },
  {
    id: 2,
    name: "Executive Suite",
    room_number: "201",
    type: "Suite",
    price: 599.99,
    status: "occupied",
    image_path: "/executive-hotel-suite-luxury.png",
    size: "80 sqm",
    guests: 4,
    bathrooms: 2,
    bed: "King + Sofa Bed",
    description: "Luxurious suite with separate living area and premium amenities.",
    features: [
      { id: 1, name: "Ocean View" },
      { id: 4, name: "Living Area" },
      { id: 5, name: "Kitchenette" },
      { id: 6, name: "Work Desk" },
    ],
  },
  {
    id: 3,
    name: "Standard Room",
    room_number: "102",
    type: "Standard",
    price: 149.99,
    status: "maintenance",
    image_path: "/standard-hotel-room-modern.png",
    size: "25 sqm",
    guests: 2,
    bathrooms: 1,
    bed: "Queen",
    description: "Comfortable standard room with essential amenities.",
    features: [
      { id: 7, name: "Air Conditioning" },
      { id: 8, name: "WiFi" },
    ],
  },
]

const mockFeatures = [
  { id: 1, name: "Ocean View" },
  { id: 2, name: "Balcony" },
  { id: 3, name: "Mini Bar" },
  { id: 4, name: "Living Area" },
  { id: 5, name: "Kitchenette" },
  { id: 6, name: "Work Desk" },
  { id: 7, name: "Air Conditioning" },
  { id: 8, name: "WiFi" },
  { id: 9, name: "Room Service" },
  { id: 10, name: "Spa Access" },
]

const roomTypes = ["Standard", "Deluxe", "Suite", "Presidential"]
const roomStatuses = ["available", "occupied", "maintenance", "cleaning"]

const breadcrumbs= [
    {
        title: 'Rooms Management',
        href: '/admin/rooms-management',
    },
];

export default function RoomManagement({rooms_m}) {
  const [rooms, setRooms] = useState(rooms_m)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRoom, setEditingRoom] = useState(null)

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
        <div className="flex flex-col sm:flex-row justify-end items-center sm:items-center gap-4">
            <Button onClick={handleAddRoom}>
            <Plus className="" />
                Add Room
            </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                type="text"
                placeholder="Search rooms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
            />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {roomStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
                ))}
            </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {roomTypes.map((type) => (
                <SelectItem key={type} value={type}>
                    {type}
                </SelectItem>
                ))}
            </SelectContent>
            </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} onEdit={handleEditRoom} onDelete={handleDeleteRoom} />
            ))}
        </div>

        {filteredRooms.length === 0 && (
            <div className="text-center py-12">
            <p className="text-muted-foreground">No rooms found matching your criteria.</p>
            </div>
        )}

        <RoomModal
            room={editingRoom}
            roomTypes={roomTypes}
            roomStatuses={roomStatuses}
            isOpen={isModalOpen}
            onClose={() => {
            setIsModalOpen(false)
            setEditingRoom(null)
            }}
            onSave={handleSaveRoom}
            features={mockFeatures}
        />
        </div>
    </AppLayout>
  )
}
