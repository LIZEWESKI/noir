import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Mail } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useInitials } from "@/hooks/use-initials"

const ShowGuestInfo = ({reservation}) => {
    const getInitials = useInitials()

  return (
        <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Guest Information
            </CardTitle>
            </CardHeader>
            <CardContent>
            <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                <AvatarImage src={reservation.user.profile_picture_url} />
                <AvatarFallback className="text-lg">{getInitials(reservation.user.name)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                <h3 className="text-xl font-semibold">{reservation.user.name}</h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{reservation.user.email}</span>
                </div>
                </div>
            </div>
            </CardContent>
        </Card>
  )
}

export default ShowGuestInfo