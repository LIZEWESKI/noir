import React from 'react'
import { Card } from "@/components/ui/card"
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel"
const Amenities = ({amenities}) => {
  return (
    <>
        <div className="max-w-[85rem] mx-auto space-y-2 mb-8 sm:mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold   font-outfit">
                Our Amenities
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl">
                From refreshing pools to fine dining, our hotel provides everything you need for a relaxing stay.
            </p>
        </div>

      <div className="w-full max-w-[85rem] mx-auto ">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 sm:-ml-4">
            {amenities.map((amenity, index) => (
              <CarouselItem key={index} className="pl-2 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <Card className="relative overflow-hidden aspect-[5/5] md:aspect-[4/5] group">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundImage: `url(${amenity.image_path_url})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
                  <div className="relative h-full p-4 sm:p-6 flex flex-col justify-between text-white">
                    <h3 className="text-xl sm:text-xl font-semibold">{amenity.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-200 mt-2">{amenity.description}</p>
                  </div>
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
    </>
  )
}

export default Amenities