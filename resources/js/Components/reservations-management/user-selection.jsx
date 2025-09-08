import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, UserPlus, Search, Mail, User } from "lucide-react"
import { useInitials } from "@/hooks/use-initials"

export default function UserSelection({ selectedGuest, onGuestChange, newGuestData, onNewGuestChange , existingUsers }) {
  const [mode, setMode] = useState("existing")
  const [searchTerm, setSearchTerm] = useState("")
  const [internalSelectedGuest, setInternalSelectedGuest] = useState(null)
  const [internalNewGuestData, setInternalNewGuestData] = useState({ name: "", email: "" })
  const getInitials = useInitials()
  const currentSelectedGuest = selectedGuest || internalSelectedGuest
  const currentNewGuestData = newGuestData || internalNewGuestData

  const filteredGuests = existingUsers.filter(
    (guest) =>
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleGuestSelect = (guestId) => {
    const guest = existingUsers.find((g) => g.id === Number.parseInt(guestId))
    if (onGuestChange) {
      onGuestChange(guest)
    } else {
      setInternalSelectedGuest(guest)
    }
  }

  const handleNewGuestChange = (field, value) => {
    const updatedData = {
      ...currentNewGuestData,
      [field]: value,
    }
    if (onNewGuestChange) {
      onNewGuestChange(updatedData)
    } else {
      setInternalNewGuestData(updatedData)
    }
  }

  return (
    <div className="space-y-4">
      {mode === "existing" && currentSelectedGuest && (
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={currentSelectedGuest.profile_picture_url} />
                <AvatarFallback className="bg-primary/20 text-primary font-medium">
                  {getInitials(currentSelectedGuest.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-primary">Selected Guest</p>
                  <Badge variant="default" className="text-xs">
                    {currentSelectedGuest.stays} stays
                  </Badge>
                </div>
                <p className="font-medium">{currentSelectedGuest.name}</p>
                <p className="text-sm text-muted-foreground">{currentSelectedGuest.email}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (onGuestChange) {
                    onGuestChange(null)
                  } else {
                    setInternalSelectedGuest(null)
                  }
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                Change
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {mode === "new" && (currentNewGuestData.name || currentNewGuestData.email) && (
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <UserPlus className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-primary">New Guest</p>
                <p className="font-medium">{currentNewGuestData.name || "Unnamed Guest"}</p>
                <p className="text-sm text-muted-foreground">{currentNewGuestData.email || "No email provided"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card >
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-primary" />
              Guest Information
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant={mode === "existing" ? "default" : "outline"}
                size="sm"
                onClick={() => setMode("existing")}
                className="text-xs"
              >
                <Users className="h-3 w-3 mr-1" />
                Select Existing
              </Button>
              <Button
                variant={mode === "new" ? "default" : "outline"}
                size="sm"
                onClick={() => setMode("new")}
                className="text-xs"
              >
                <UserPlus className="h-3 w-3 mr-1" />
                Create New
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {mode === "existing" ? (
            <div className="space-y-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search guests by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Guest Selection */}
              <div className="space-y-2 max-h-64 overflow-y-auto p-2">
                {filteredGuests.map((guest) => (
                  <div
                    key={guest.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all hover:border-primary/50 ${
                      currentSelectedGuest?.id === guest.id
                        ? "border-primary bg-primary/5"
                        : " hover:bg-muted/30"
                    }`}
                    onClick={() => handleGuestSelect(guest.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={guest.profile_picture_url} />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {getInitials(guest.name)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm truncate">{guest.name}</p>
                          <Badge variant="secondary" className="text-xs">
                            {guest.stays} stays
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{guest.email}</p>
                        <p className="text-xs text-muted-foreground">
                          Last stay: { guest.last_stay ? new Date(guest.last_stay).toLocaleDateString() : "No previous stay" }
                        </p>
                      </div>

                      {currentSelectedGuest?.id === guest.id && (
                        <div className="flex items-center gap-1">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <span className="text-xs font-medium text-primary">Selected</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {filteredGuests.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No guests found matching your search</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="guest-name" className="flex items-center gap-2 text-sm font-medium">
                    <User className="h-4 w-4 text-primary" />
                    Guest Name
                  </Label>
                  <Input
                    id="guest-name"
                    placeholder="Enter guest full name"
                    value={currentNewGuestData?.name || ""}
                    onChange={(e) => handleNewGuestChange("name", e.target.value)}
                    className="transition-all focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guest-email" className="flex items-center gap-2 text-sm font-medium">
                    <Mail className="h-4 w-4 text-primary" />
                    Email Address
                  </Label>
                  <Input
                    id="guest-email"
                    type="email"
                    placeholder="Enter guest email"
                    value={currentNewGuestData?.email || ""}
                    onChange={(e) => handleNewGuestChange("email", e.target.value)}
                    className="transition-all focus:border-primary"
                  />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-muted/30 border">
                <p className="text-xs text-muted-foreground">
                  <strong>Note:</strong> Additional guest details (phone, address, preferences) can be added later
                  through the guest management system.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
