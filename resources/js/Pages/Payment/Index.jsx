import { useEffect } from "react"
import Layout from "@/Layouts/Layout"
import ReservationsDetails from "./ReservationsDetails"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { usePage } from "@inertiajs/react"
import NoReservations from "./NoReservations"
import PaypalButton from "./PaypalButton"

const Index = ({ reservations }) => {
  const { flash } = usePage().props

  useEffect(() => {
    flash.error &&
      toast.error(flash.error, {
        descriptionClassName: "text-white/90",
        duration: 9000,
        position: "top-center",
        style: {
          backgroundColor: "var(--danger)",
          color: "#fff",
        },
      })

    flash.success &&
      toast.success(flash.success, {
        descriptionClassName: "text-white/90",
        duration: 9000,
        position: "top-center",
        style: {
          backgroundColor: "var(--success)",
          color: "#fff",
        },
      })
  }, [flash])

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        {reservations.length === 0 ? (
          <NoReservations />
        ) : (
          <>
            <div className="mb-8 md:mb-10">
              <h1 className="text-3xl md:text-4xl font-bold font-roboto tracking-tight">Complete Your Booking</h1>
              <p className="text-muted-foreground mt-2 md:text-lg">You're just one step away from your perfect stay</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7 space-y-6">
                <ReservationsDetails reservations={reservations} />
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="sticky top-8">
                  <div className="space-y-6">
                    <PriceSummary reservations={reservations} />
                    <SecurityNotice />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Toaster />
    </div>
  )
}

const PriceSummary = ({ reservations }) => {
  const subtotal = reservations.reduce((sum, item) => {
    const roomTotal = Number.parseFloat(item.room.price) * Number(item.nights)
    return sum + roomTotal
  }, 0)

  const cleaningFees = reservations.reduce((sum, item) => sum + Number(item.cleaning_fee), 0)
  const serviceFees = reservations.reduce((sum, item) => sum + Number(item.service_fee), 0)
  const finalTotal = subtotal + cleaningFees + serviceFees

  return (
    <div className="bg-background rounded-lg border shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Price Summary</h2>

      <div className="space-y-4">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {reservation.room.name} ({reservation.nights} {reservation.nights === 1 ? "night" : "nights"})
            </span>
            <span>${(Number.parseFloat(reservation.room.price) * reservation.nights).toFixed(2)}</span>
          </div>
        ))}

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Cleaning fee</span>
          <span>${cleaningFees.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Service fee</span>
          <span>${serviceFees.toFixed(2)}</span>
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
        </div>
        <PaypalButton/>
      </div>
    </div>
  )
}

const SecurityNotice = () => {
  return (
    <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
      <div className="flex items-start gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-success mt-0.5"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <div>
          <h3 className="font-medium text-sm">Secure Booking</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Your payment information is encrypted and securely processed. We never store your full card details.
          </p>
        </div>
      </div>
    </div>
  )
}

Index.layout = (page) => <Layout children={page} />
export default Index

