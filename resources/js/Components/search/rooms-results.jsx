import React from 'react'
import { Users, Bath, Bed } from "lucide-react"
import { router } from "@inertiajs/react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
const RoomsResults = ({rooms}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rooms.map((room) => (
          <Card key={room.id} className="bg-background border-border overflow-hidden flex flex-col">
            <div className="relative h-[300px]">
              <img
                src={room.image_path_url || "/placeholder.svg"}
                alt={room.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">
                    Room {room.room_number} • {room.type}
                  </h3>
                  <p className="text-muted-foreground mt-1">{room.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">${room.price}</p>
                  <p className="text-xs text-muted-foreground">per night</p>
                </div>
              </div>
              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground">{room.guests}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground">{room.bathrooms}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground">{room.bed}</span>
                </div>
                <div className="text-muted-foreground">{room.size}</div>
              </div>

              <p className="text-muted-foreground mt-4 flex-grow">{room.description}</p>

              <div className="mt-6">
                <Button
                  className="w-full bg-primary disabled:bg-zinc-700 disabled:text-zinc-300"
                  onClick={()=> router.visit(`/rooms/${room.id}`)}
                >
                  Book Now
                </Button>
              </div>
            </div>
          </Card>
        ))}
    </div>
  )
}

export default RoomsResults