import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Emily R.",
      avatar: "https://i.pravatar.cc/100?img=21",
      quote: "Absolutely loved our stay at Noir! The service was impeccable.",
      rating: 4,
      role: "Business Traveler",
    },
    {
      name: "Michael B.",
      avatar: "https://i.pravatar.cc/100?img=52",
      quote: "Perfect location and smooth booking experience.",
      rating: 5,
      role: "Family Vacation",
    },
    {
      name: "Sophie T.",
      avatar: "https://i.pravatar.cc/100?img=38",
      quote: "Best hotel I've stayed at! Everything was just perfect.",
      rating: 4,
      role: "Leisure Stay",
    },
  ]

  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
            What Our Guests Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">Real experiences from our valued guests</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="relative group overflow-hidden border-0 bg-muted/30 backdrop-blur-sm hover:bg-background hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6">
                
                {/* Quote Icon */}
                <Quote className="absolute top-6 right-6 h-12 w-12 text-muted-foreground/20" />

                {/* Rating */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#d2a70b] stroke-primary stroke-[0.7px] " />
                  ))}
                  {testimonial.rating < 5 && 
                    [...Array(5 - testimonial.rating)].map((_,i) => (
                      <Star key={i} className="h-5 w-5 fill-transparent stroke-primary stroke-[0.7px] " />
                    ))
                  }
                </div>

                {/* Quote */}
                <blockquote className="mb-6 text-lg font-medium leading-relaxed">"{testimonial.quote}"</blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-muted">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-primary/10">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

