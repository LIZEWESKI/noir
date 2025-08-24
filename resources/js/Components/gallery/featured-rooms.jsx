import React from "react"
import { Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"

export default function FeaturedRooms({rooms}) {
  return (
        <div className="flex flex-col md:flex-row items-center gap-10 mb-8">
          <div className="w-full md:w-2/5 space-y-4 ">
            <div className="space-y-2 mb-4 ">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-roboto">Our Rooms</h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl ">
                Choose from a variety of room types designed for your comfort.
              </p>
            </div>
            <Link href="/rooms">
              <Button variant="outline" size="lg" className="rounded-full px-8 border-[2px] border-success hidden md:block">
                View All Rooms
              </Button>
            </Link>
          </div>

          <div className="w-full md:w-3/5 grid grid-cols-8 grid-rows-8 gap-4 h-[600px] md:order-1">
            <div className="col-span-4 row-span-5 relative rounded-2xl overflow-hidden">
              <img
                src={rooms[0].image_path_url}
                alt="Luxury Room"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="col-span-4 row-span-3 col-start-5 relative rounded-2xl overflow-hidden">
              <img
                src={rooms[1].image_path_url}
                alt="Room Detail"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="col-span-4 row-span-3 row-start-6 relative rounded-2xl overflow-hidden">
              <img
                src={rooms[2].image_path_url}
                alt="Room Detail"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="col-span-4 row-span-5 col-start-5 row-start-4 relative rounded-2xl overflow-hidden">
              <img
                src={rooms[3].image_path_url}
                alt="Room Detail"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
          
          <Link href="/rooms">
              <Button variant="outline" size="lg" className="rounded-full px-8 border-[2px] border-success md:hidden">
                View All Rooms
              </Button>
            </Link>
        </div>
  )
}

