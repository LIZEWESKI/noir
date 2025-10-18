import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bed, Users, Maximize2, Wifi, Wind, Tv, Coffee, Bath, Utensils, ChevronRight } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Link } from "@inertiajs/react"

export default function AccommodationsSection({rooms}) {
  const amenities = [
    [
      { name: "Free WiFi", icon: <Wifi key="wifi" /> },
      { name: "Air Conditioning", icon: <Wind key="ac" /> },
      { name: "Smart TV", icon: <Tv key="tv" /> },
      { name: "Breakfast Included", icon: <Coffee key="breakfast" /> },
    ],
    [
      { name: "Jacuzzi", icon: <Bath key="jacuzzi" /> },
      { name: "Ocean View", icon: <Maximize2 key="view" /> },
      { name: "Private Bar", icon: <Utensils key="bar" /> },
      { name: "24/7 Room Service", icon: <Users key="service" /> },
    ],
    [
      { name: "Spacious", icon: <Maximize2 key="space" /> },
      { name: "2 Queen Beds", icon: <Bed key="beds" /> },
      { name: "Kids' Play Area", icon: <Users key="kids" /> },
      { name: "Kitchenette", icon: <Utensils key="kitchen" /> },
    ],
  ];

  return (
    <section className="py-6 md:py-12">
      <div className="container px-4 md:px-6">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold   font-outfit">The Accommodations</h2>
          <Link href="/rooms">
            <Button variant="outline" className="hidden md:flex">
              Discover All Suites
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room, index) => (
            <Card key={index} className="group relative overflow-hidden border-0 bg-background aspect-[4/5] md:aspect-[3/4]">
              <Link href={`rooms/${room.id}`} prefetch>
                {/* Background Image with Overlay */}
                <div
                  className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url(${room.image_path_url})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 " />
                </div>

                <CardContent className="relative h-full p-6 flex flex-col justify-between text-white">
                  {/* Price Tag */}
                  <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium">
                    FROM ${room.price}/Night
                  </div>

                  {/* Content */}
                  <div className="space-y-4 mt-auto">
                    <h3 className="text-2xl font-semibold truncate">{room.name}</h3>

                    {/* Amenities */}
                    <div className="flex gap-4 flex-wrap">
                      {amenities[index % amenities.length].map((amenity, i) => (
                        <div key={i} className="text-white/80 hover:text-white transition-colors">
                          <TooltipProvider delayDuration={100}>
                            <Tooltip>
                              <TooltipTrigger>{amenity.icon}</TooltipTrigger>
                              <TooltipContent>
                                <p>{amenity.name}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      ))}
                    </div>

                    {/* Details */}
                    <div className="flex items-center gap-4 text-sm text-white/80">
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        {room.bed}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {room.guests}
                      </div>
                    </div>

                    {/* CTA */}
                    <Link href={`rooms/${room.id}`}>
                      <Button variant="link" className="p-0 h-auto font-semibold group/btn text-white hover:text-white/90">
                        View Detail
                        <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/rooms">
            <Button variant="outline" className="w-full">
              Discover All Suites
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

