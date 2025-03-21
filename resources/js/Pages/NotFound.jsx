import { Button } from "@/components/ui/button"
import Layout from "@/Layouts/Layout"
import { Compass, Home, ArrowLeft, Bed, MapPin } from "lucide-react"
import { Link } from "@inertiajs/react"

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Icon */}
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 bg-primary/10 rounded-full flex items-center justify-center">
            <Compass className="h-12 w-12 text-success" strokeWidth={1.5} />
          </div>
        </div>

        {/* Error code with elegant styling */}
        <h1 className="text-8xl font-light tracking-tighter">
          4<span className="text-primary">0</span>4
        </h1>

        {/* Message */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Page Not Found</h2>
          <p className="text-muted-foreground">
            It seems you've ventured off the map. The page you're looking for has been moved or doesn't exist.
          </p>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-3 gap-4 pt-4">
          <Link href="/" className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors">
            <Home className="h-5 w-5 text-primary" />
            <span className="text-sm">Home</span>
          </Link>
          <Link
            href="/rooms"
            className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors"
          >
            <Bed className="h-5 w-5 text-primary" />
            <span className="text-sm">Rooms</span>
          </Link>
          <Link
            href="/contact"
            className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors"
          >
            <MapPin className="h-5 w-5 text-primary" />
            <span className="text-sm">Contact</span>
          </Link>
        </div>

        {/* Back button */}
        <div className="pt-4">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}

NotFound.layout = (page) => <Layout children={page} />
export default NotFound