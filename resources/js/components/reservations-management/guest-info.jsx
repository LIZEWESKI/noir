import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useInitials } from '@/hooks/use-initials';

const GuestInfo = ({user}) => {

    const getInitials = useInitials();
  return (
        <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">
                Guest Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 p-6 bg-background rounded-xl border border-border">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user.profile_picture_url} />
                  <AvatarFallback className="font-semibold text-lg">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg">{user.name}</h3>
                    <p className="text-muted-foreground text-sm">Primary Guest</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-medium">{user.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
        </Card>
  )
}

export default GuestInfo