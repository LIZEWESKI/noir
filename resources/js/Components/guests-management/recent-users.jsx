import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "lucide-react"
import { useInitials } from "@/hooks/use-initials"

export default function RecentUsers({ newUsers }) {
  const getInitials = useInitials()

  return (
    <Card className="border-border h-fit">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">New Sign-ups This Week</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {newUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-4 rounded-lg border border-border bg-background/20 hover:bg-card/80 transition-colors"
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.profile_picture_url} alt={user.name} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-sm">{user.name}</h4>
                  <Badge variant="outline" className="text-xs px-2 py-0">
                    {user.role}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  Joined {new Date(user.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="text-right space-y-1">
              <div className="text-xs text-muted-foreground">
                {user.email}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
