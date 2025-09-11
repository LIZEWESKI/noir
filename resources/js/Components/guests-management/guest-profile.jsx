import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent,CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Calendar
} from "lucide-react"
import { useInitials } from "@/hooks/use-initials"
import { useCapitalize } from "@/hooks/use-capitalize"
import GuestStats from "@/components/guests-management/guest-stats"
const GuestProfile = ({guest, stats}) => {

    const getInitials = useInitials();
    const getCapitalize = useCapitalize()

  return (
    <Card >
        <CardContent className="p-6">
        <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
            <AvatarImage src={guest.profile_picture_url} alt={guest.name} />
            <AvatarFallback className="text-3xl">
                {getInitials(guest.name)}
            </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between">
                <div>
                <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-semibold text-foreground">{guest.name}</h2>
                    <Badge
                    variant="outline"
                    className={
                        guest.is_active
                        ? "bg-primary/10 text-primary border-primary/20"
                        : "bg-destructive/10 text-destructive border-destructive/20"
                    }
                    >
                    {guest.is_active ? "Active" : "Inactive"}
                    </Badge>
                </div>
                <p className="text-muted-foreground font-medium">{getCapitalize(guest.role)}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Email:</span>
                <span className="text-foreground">{guest.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Member since:</span>
                <span className="text-foreground">{new Date(guest.created_at).toLocaleDateString()}</span>
                </div>
            </div>
            </div>
        </div>
        </CardContent>
        <CardFooter>
            <GuestStats stats={stats} />
        </CardFooter>
    </Card>
  )
}

export default GuestProfile