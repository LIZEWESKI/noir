import React from 'react'
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCurrencyFormatter } from '@/hooks/use-currency-formatter'
const RoomSelection = ({
    availableRooms,
    handleSelectedRoom,
    selectedRoom,
    roomError
}) => {
    const {formatCurrency} = useCurrencyFormatter();
  return (
    <div className="space-y-2">
        <Label>Room Assignment</Label>
        <Select
        value={selectedRoom.id.toString()}
        onValueChange={(value) => handleSelectedRoom(Number.parseInt(value))}
        >
        <SelectTrigger>
            <SelectValue />
        </SelectTrigger>
        <SelectContent>
            {availableRooms.map((room) => (
            <SelectItem key={room.id} value={room.id.toString()}>
                <div className="flex items-center justify-between w-full">
                <span>
                    Room {room.room_number} - {room.name}
                </span>
                <span className="text-muted-foreground ml-2">{formatCurrency(room.price)}/night</span>
                </div>
            </SelectItem>
            ))}
        </SelectContent>
        </Select>
        {roomError && <p className="text-sm text-destructive font-medium ">{roomError}</p>}
    </div>
  )
}

export default RoomSelection