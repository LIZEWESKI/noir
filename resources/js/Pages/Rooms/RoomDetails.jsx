import React from 'react'
import {
    Bed,
    Users,
    Bath,
    Maximize2,
    Check,
    Wifi,
    Coffee,
    Wind,
    Tv,
    Utensils,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
const RoomDetails = ({room}) => {
    // This Should be actually coming from the back-end but we're hardcoding it for now
    const additionalData = {
        longDescription:
            "Experience comfort and convenience in our Standard Single Room. This thoughtfully designed space offers everything a solo traveler needs for a pleasant stay. The room features a comfortable single bed with premium linens, a modern bathroom with shower, and a work desk. Enjoy amenities including free WiFi, flat-screen TV, and climate control. The large windows provide natural light and beautiful views, creating a bright and welcoming atmosphere. Perfect for business travelers or those exploring the city on their own.",
        amenities: [
            { name: "Free WiFi", icon: <Wifi className="h-5 w-5" /> },
            { name: "Breakfast Available", icon: <Coffee className="h-5 w-5" /> },
            { name: "Air Conditioning", icon: <Wind className="h-5 w-5" /> },
            { name: "Flat-screen TV", icon: <Tv className="h-5 w-5" /> },
            { name: "Work Desk", icon: <Utensils className="h-5 w-5" /> },
            { name: "Daily Housekeeping", icon: <Utensils className="h-5 w-5" /> },
        ],
        policies: [
            "Check-in: 3:00 PM",
            "Check-out: 11:00 AM",
            "No smoking",
            "No pets allowed",
            "Cancellation: 24 hours before arrival for full refund",
        ]
    }
  return (
    <>
        <div className="lg:col-span-2 space-y-8">
          {/* Room Header */}
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {room.features.map((feature) => (
                <Badge key={feature.id} variant="secondary" className="rounded-full">
                  {feature.name}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{room.name}</h1>
            <div className="flex flex-wrap gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Maximize2 className="h-5 w-5" />
                <span>{room.size}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>
                  {room.guests} {room.guests === 1 ? "Guest" : "Guests"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Bed className="h-5 w-5" />
                <span>{room.bed}</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-5 w-5" />
                <span>
                  {room.bathrooms} {room.bathrooms === 1 ? "Bathroom" : "Bathrooms"}
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Room Description */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">About This Room</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{room.description}</p>
            <p className="text-muted-foreground leading-relaxed">{additionalData.longDescription}</p>
          </div>

          {/* Tabs for Details */}
          <Tabs defaultValue="amenities" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="policies">Policies</TabsTrigger>
            </TabsList>
            <TabsContent value="amenities" className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {additionalData.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="text-primary">{amenity.icon}</div>
                    <span>{amenity.name}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="policies" className="pt-6">
              <ul className="space-y-2">
                {additionalData.policies.map((policy, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5" />
                    <span>{policy}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </div>
    </>
  )
}

export default RoomDetails