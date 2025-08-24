import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Calendar, Home, Download, Share2, ArrowLeft } from "lucide-react"
import { Link } from "@inertiajs/react"
import Layout from "@/layouts/Layout"

const Success = ({reservations, totalAmount, orderId}) =>  {
  return (
    <div className="min-h-screen flex justify-center py-12 ">
      <div className="container px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          <h1 className="text-3xl font-bold">Payment Successful!</h1>
          <p className="text-muted-foreground mt-2">Your booking has been confirmed and you're all set for your stay</p>
        </div>

        <Card className="mb-8">
          <CardHeader className="bg-primary/5 pb-4">
            <CardTitle>Booking Confirmation</CardTitle>
            <CardDescription>Booking ID: {orderId}</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
              {reservations.map(reservation => (
                <div key={reservation.id}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm">Check-in</h3>
                      <p>{reservation.check_in}</p>
                      <p className="text-xs text-muted-foreground">From 3:00 PM</p>
                    </div>
                  </div>

                <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium text-sm">Check-out</h3>
                      <p>{reservation.check_out}</p>
                      <p className="text-xs text-muted-foreground">Until 11:00 AM</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Home className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium text-sm">Accommodation</h3>
                    <p>{reservation.room.name}</p>
                    <p className="text-xs text-muted-foreground">{reservation.room.bed} • {`${reservation.room.guests} ${reservation.room.guest === 1 ? "Guest" : "Guests"}`} • {reservation.room.size}</p>
                  </div>
                </div>
                </div>
              ))}

            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Amount Paid</span>
                <span className="font-bold text-lg">${totalAmount}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">What's Next?</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium mb-2">Booking Details Sent</h3>
                <p className="text-sm text-muted-foreground">
                  We've sent your booking confirmation to your email. Please check your inbox.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium mb-2">Need Assistance?</h3>
                <p className="text-sm text-muted-foreground">
                  Our customer support team is available 24/7 to help with any questions.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <Link href="/" className="mt-12">
              <Button variant="ghost" size="sm" className="mb-4 -ml-3">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
Success.layout = (page) => <Layout children={page} />
export default Success