import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from '@/components/ui/label'
import { AlertCircle } from 'lucide-react'

const ReservationStatusSelect = ({
    status,
    setData,
    error
}) => {
  return (

    <div className="space-y-3">
        <Label className="text-base font-medium flex items-center gap-2">
        <AlertCircle className="h-4 w-4" />
        Reservation Status
        </Label>
        <Select value={status} onValueChange={(value) => setData("status", value)}>
        <SelectTrigger className="h-12">
            <SelectValue />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="pending">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                Pending
            </div>
            </SelectItem>
            <SelectItem value="completed">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Completed
            </div>
            </SelectItem>
            <SelectItem value="cancelled">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                Cancelled
            </div>
            </SelectItem>
        </SelectContent>
        </Select>
        {error && <p className="text-sm text-destructive font-medium ">{error}</p>}
    </div>
  )
}

export default ReservationStatusSelect