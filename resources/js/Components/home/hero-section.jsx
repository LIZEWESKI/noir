import SearchForm from "@/components/home/search-form"
import { Link } from "@inertiajs/react"
import { Button } from "../ui/button"

const HeroSection = ({ rooms }) => {
  return (
    <section className="relative -mx-4 md:-mx-20 bg-background">
      <div className="relative z-10 px-4 md:px-20 py-10 md:py-16 lg:py-10">
        <div className="max-w-[85rem] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight">
                  Your Stay, Your Way.
                  <br />
                  Noir's <span className="text-primary">Personalized</span>
                  <br />
                  Hospitality
                </h1>
                <p className="max-w-[500px] text-lg text-muted-foreground leading-relaxed">
                  Experience personalized hospitality tailored to your preferences, ensuring that your stay is nothing
                  short of exceptional.
                </p>
              </div>

              <div className="max-w-2xl">
                <SearchForm />
              </div>
              <Link href="/rooms">
                <Button size="lg" variant="outline" className="px-8 py-6 text-lg rounded-full bourder-[1px] mt-6">
                  Book Now with Noir
                </Button>
              </Link>
            </div>

            {/* Right Column - Image Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4 h-[600px]">
                <div className="space-y-4">
                  <div className="bg-muted rounded-2xl overflow-hidden h-[180px]">
                    <img
                      src={rooms[0].image_path_url}
                      alt={rooms[0].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-muted rounded-2xl overflow-hidden h-[260px]">
                    <img src={rooms[1].image_path_url} alt={rooms[1].name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-muted rounded-2xl overflow-hidden h-[280px]">
                    <img
                      src={rooms[2].image_path_url}
                      alt={rooms[2].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-card border rounded-2xl p-6 flex-1 flex flex-col justify-center">
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-4 h-4 text-yellow-400 fill-current">
                          ⭐
                        </div>
                      ))}
                    </div>
                    <blockquote className="text-sm font-medium text-foreground mb-3">
                      "What, So Everyone’s Supposed To Sleep Every Single Night Now?"
                    </blockquote>
                    <div className="text-xs text-muted-foreground">
                      <div className="font-medium">Rick Sanchez</div>
                      <div>Dimension C-137</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
