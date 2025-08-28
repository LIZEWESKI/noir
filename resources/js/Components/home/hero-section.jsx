import { Button } from "@/components/ui/button"
import { Link } from "@inertiajs/react"
import SearchForm from "@/components/home/search-form"

const HeroSection = ({backGroundImage}) =>  {
  return (
    <section className="relative -mx-4 md:-mx-20">
      <div
        className="absolute inset-0 z-0"
        style={{
          // backgroundImage: `url(${backGroundImage})`,
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold   text-white">
              Welcome to Noir. 
              <span className="block"></span>
              Find Your Perfect Stay
            </h1>
            <p className="mx-auto max-w-[700px] text-lg sm:text-xl md:text-2xl text-gray-200">
              Book a luxurious stay with just a few clicks. Comfort, convenience, and world-class hospitality await you!
            </p>
          </div>
          <SearchForm />

          <Link href="/rooms">
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg rounded-full bourder-[1px] mt-6">
              Book Now with Noir
            </Button>
          </Link>
        </div>
      </div>
  </section>
  )
}
export default HeroSection;

