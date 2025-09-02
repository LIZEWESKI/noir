import React from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Users, Bath, Bed, Maximize } from "lucide-react"
import StatusBadge from './status-badge'
import DeleteAlertDialog from '../ui/delete-alert-dialog'
const RoomCard = ({ room, onEdit, onDelete }) => (
  <Card className="overflow-hidden hover:shadow-lg transition-shadow pt-0 dark:border-primary/20">
    <div className="relative">
      <img src={room.image_path_url} alt={room.name} className="w-full h-48 object-cover" />
      <div className="absolute top-2 right-2">
        <StatusBadge status={room.status} />
      </div>
    </div>

    <CardContent className="p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-foreground truncate">{room.name}</h3>
          <p className="text-sm text-muted-foreground">Room {room.room_number}</p>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => onEdit(room)}>
            <Edit className="h-4 w-4 text-primary" />
          </Button>
          <DeleteAlertDialog 
            title={onDelete.title}
            description={onDelete.description}
            action={() => onDelete.action(room.id)}
          >
            <Button variant="ghost" size="sm" className="hover:bg-destructive-foreground">
              <Trash2 className="h-5 w-5 text-destructive"  />
            </Button>
          </DeleteAlertDialog>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span>{room.guests}</span>
        </div>
        <div className="flex items-center gap-1">
          <Bath className="h-4 w-4" />
          <span>{room.bathrooms}</span>
        </div>
        <div className="flex items-center gap-1">
          <Bed className="h-4 w-4" />
          <span>{room.bed}</span>
        </div>
        <div className="flex items-center gap-1">
          <Maximize className="h-4 w-4" />
          <span>{room.size}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {room.features.slice(0, 3).map((feature) => (
          <Badge key={feature.id} variant="secondary">
            {feature.name}
          </Badge>
        ))}
        {room.features.length > 3 && <Badge variant="secondary">+{room.features.length - 3} more</Badge>}
      </div>

      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold text-foreground">${room.price}</span>
        <span className="text-sm text-muted-foreground">{room.type}</span>
      </div>
    </CardContent>
  </Card>
)

export default RoomCard