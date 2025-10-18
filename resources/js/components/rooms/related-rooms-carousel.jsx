import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, ArrowRight } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Link } from "@inertiajs/react"

export default function RelatedRoomsCarousel({ relatedRooms }) {
  return (
    <div className="mt-16 pt-8 border-t">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">You Might Also Like</h2>
        <Link href="/rooms">
          <Button variant="link" className="group">
            View All Rooms
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {relatedRooms.map((relatedRoom) => (
            <CarouselItem key={relatedRoom.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <Card className="overflow-hidden group h-full">
                <Link href={`/rooms/${relatedRoom.id}`} prefetch>
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={relatedRoom.image_path_url || "/placeholder.svg"}
                      alt={relatedRoom.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{relatedRoom.name}</h3>
                      <span>${Number.parseFloat(relatedRoom.price).toFixed(2)}/night</span>
                    </div>
                    <div className="mt-4">
                      <Link href={`/rooms/${relatedRoom.id}`}>
                        <Button variant="link" className="p-0 h-auto font-semibold group/btn">
                          Discover More
                          <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="sm:block">
          <CarouselPrevious className="left-2 sm:-left-4" />
          <CarouselNext className="right-2 sm:-right-4" />
        </div>
      </Carousel>
    </div>
  )
}

