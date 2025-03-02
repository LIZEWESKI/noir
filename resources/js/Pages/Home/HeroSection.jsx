import { Button } from "@/components/ui/button"
import { DateRangePicker } from "./DateRangePicker"
import { GuestSelector } from "./GuestSelector"
import { Search } from "lucide-react"
import { Link } from "@inertiajs/react"

const HeroSection = () =>  {
  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log("Search form submitted")
  }

  return (
    <section className="flex flex-col items-center justify-center space-y-10 py-12 text-center">

      <div className="space-y-4 pointer-events-none">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 font-roboto">
          Welcome to Noir
          <span className="block font-roboto">Find Your Perfect Stay</span>
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground text-lg sm:text-xl md:text-2xl">
          Book a luxurious stay with just a few clicks. Comfort, convenience, and world-class hospitality await you!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-background/50 backdrop-blur-sm rounded-md border shadow-lg">
          <div className="md:col-span-6">
            <DateRangePicker className="w-full" />
            <p className="text-[0.8rem] text-muted-foreground mt-1 text-start">Check-in: 3pm - Check-out: 11am</p>
          </div>

          <div className="md:col-span-4">
            <GuestSelector />
            <p className="text-[0.8rem] text-muted-foreground mt-1 text-start">Minimum Check-in Age: 18</p>
          </div>

          <div className="md:col-span-2">
            <div>
              <Button type="submit" className="w-full h-full min-h-[40px]">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </form>
      <Link href="/rooms">
        <Button size="lg" variant="outline" className="px-8 py-6 text-lg rounded-full bourder-[1px] border-success">
          Book Now with Noir
        </Button>
      </Link>
    </section>
  )
}
export default HeroSection;

