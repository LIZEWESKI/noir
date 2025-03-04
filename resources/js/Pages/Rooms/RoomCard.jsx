import React from 'react'
import { Maximize2, Users, Bed, Bath, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from '@inertiajs/react'
const RoomCard = ({room, index}) => {
    
  return (
    <div
        className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
            index % 2 === 1 ? "md:[&>*:first-child]:order-last" : ""
        }`}
        >
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <div className="absolute top-4 left-4 bg-background px-4 py-1 rounded-full text-sm font-medium z-10">
            {room.priceType} ${room.price}/Night
            </div>
            <img src={room.image_path_url || "/placeholder.svg"} alt={room.name} className="object-cover w-full h-full" />
        </div>

        {/* Content Section */}
        <div className={`space-y-6 ${index % 2 === 1 ? "md:text-right md:[&>*]:justify-end" : ""}`}>
            {/* Features Tags */}
            <div className={`flex flex-wrap gap-2 ${index % 2 === 1 ? "md:justify-end" : ""}`}>
            {room.features.map((feature, i) => (
                <Badge key={i} variant="secondary" className="rounded-full pointer-events-none">
                {feature.name}
                </Badge>
            ))}
            </div>

            {/* Room Title */}
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{room.name}</h2>

            {/* Room Specs */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-1 ${index % 2 === 1 ? "md:[&>*]:justify-end" : ""}`}>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Maximize2 className="h-4 w-4" />
                <div className='line-clamp-1'>{room.size}</div>
                
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <div className='line-clamp-1'>{room.guests} {room.guests === 1 ? 'Guest' : 'Guests'}</div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Bed className="h-4 w-4" />
                <div className='line-clamp-1'>{room.bed}</div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Bath className="h-4 w-4" />
                <div className='line-clamp-1'>{room.bathrooms} {room.bathrooms === 1 ? "Bathroom" : "Bathrooms"}</div>
            </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground">{room.description}</p>

            {/* CTA */}
            <div className={`flex ${index % 2 === 1 ? "md:justify-end" : ""}`}>
            <Link href={`/rooms/${room.id}`} >
                <Button variant="link" className="p-0 h-auto font-semibold group">
                    Discover More
                    <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Button>
            </Link>
            </div>
        </div>
    </div>
  )
}

export default RoomCard