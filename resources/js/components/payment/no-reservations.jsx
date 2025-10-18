import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Layout from "@/layouts/layout"
import { ShoppingCart, Bed, Calendar, ArrowRight, Clock, Info } from "lucide-react"
import { Link } from "@inertiajs/react"

const  NoReservations = () => {
  return (
    <div className="min-h-screen py-2">
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="h-10 w-10 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-bold mb-3">No reservations to pay for</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            It looks like you don't have any pending reservations that require payment at this time.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader className="bg-primary/5 pb-4">
            <CardTitle>What would you like to do?</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Link href="/rooms" className="block">
                <div className="border rounded-lg p-6 h-full hover:border-primary hover:bg-primary/5 transition-colors group">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <Bed className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold">Browse Rooms</h3>
                      <p className="text-muted-foreground mt-2">
                        Explore our selection of rooms and suites to find your perfect stay.
                      </p>
                    </div>
                    <div className="mt-auto pt-4 flex items-center text-primary font-medium">
                      View Rooms
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/reservations" className="block">
                <div className="border rounded-lg p-6 h-full hover:border-primary hover:bg-primary/5 transition-colors group">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold">Check Reservations</h3>
                      <p className="text-muted-foreground mt-2">View your existing reservations or booking history.</p>
                    </div>
                    <div className="mt-auto pt-4 flex items-center text-primary font-medium">
                      View Reservations
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Helpful Information</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Reservation Process</h3>
                    <p className="text-sm text-muted-foreground">
                      After selecting a room, you'll be guided through our booking process where you can review and
                      confirm your reservation before payment.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Info className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Need Assistance?</h3>
                    <p className="text-sm text-muted-foreground">
                      If you believe you should have a reservation pending payment, please contact our support team for
                      assistance.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mt-8">
            <Link href="/">
              <Button className="group">
                Return to Homepage
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
NoReservations.layout = (page) => <Layout children={page} />
export default NoReservations