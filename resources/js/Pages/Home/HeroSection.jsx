import { Button } from "@/components/ui/button"
import { DateRangePicker } from "./DateRangePicker"
import { GuestSelector } from "./GuestSelector"
import { Search } from "lucide-react"
import { Link } from "@inertiajs/react"

const HeroSection = ({backGroundImage}) =>  {
  console.log(backGroundImage)
  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log("Search form submitted")
  }

  return (
    <section className="relative -mx-4 md:-mx-20">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backGroundImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
      </div>
      <div className="relative z-10 px-4 md:px-20 py-10 md:py-16 lg:py-24">
        <div className="max-w-[85rem] mx-auto space-y-10 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
              Welcome to Noir
              <span className="block">Find Your Perfect Stay</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-lg sm:text-xl md:text-2xl text-gray-200">
              Book a luxurious stay with just a few clicks. Comfort, convenience, and world-class hospitality await you!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 backdrop-blur-sm rounded-md shadow-lg">
              <div className="md:col-span-6">
                <DateRangePicker className="w-full" />
                <p className="text-[0.8rem] text-muted dark:text-muted-foreground mt-1 text-start">Check-in: 3pm - Check-out: 11am</p>
              </div>

              <div className="md:col-span-4">
                <GuestSelector />
                <p className="text-[0.8rem] text-muted dark:text-muted-foreground mt-1 text-start">Minimum Check-in Age: 18</p>
              </div>

              <div className="md:col-span-2">
                <div>
                  <Button type="submit" className="w-full h-full min-h-[40px] border-[1px] border-success">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </form>

          <Link href="/rooms">
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg rounded-full bourder-[1px] border-success mt-6">
              Book Now with Noir
            </Button>
          </Link>
        </div>
      </div>
  </section>
  )
}
export default HeroSection;

