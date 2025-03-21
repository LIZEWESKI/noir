import React, {useEffect} from 'react'
import Layout from "@/Layouts/Layout"
import ReservationsDetails from "./ReservationsDetails"
import PaymentForm from "./PaymentForm"
import PayPalButton from "./PaypalButton"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { usePage } from "@inertiajs/react"
import NoReservations from './NoReservations'

const Index = ({reservations}) => {
  const {errors, flash} = usePage().props;
  console.log(flash);
  useEffect(() => {
    flash.error && toast.error(flash.error, {
      descriptionClassName: "text-white/90", 
      duration: 9000,
      position: "top-center",
      style: {
        backgroundColor: "var(--danger)",
        color: "#fff",
      }
    })
    flash.success && toast.success(flash.success, {
      descriptionClassName: "text-white/90", 
      duration: 9000,
      position: "top-center",
      style: {
        backgroundColor: "var(--success)",
        color: "#fff",
      }
    })
  }, [flash]);
  return (
    <div className="min-h-screen py-2 flex justify-center">
      <div className="container px-4 md:px-6 max-w-7xl">
        {reservations.length === 0 ? <NoReservations/> : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold font-roboto">Complete Your Booking</h1>
              <p className="text-muted-foreground mt-2">You're just one step away from your perfect stay</p>
            </div>
            <div className="grid gap-8 lg:grid-cols-12">
                <ReservationsDetails reservations={reservations} />
                <PayPalButton />
            </div>
          </>
          )}
          {/* <PaymentForm reservations={reservations} totalAmount={total_amount}/> */}
      </div>
      <Toaster/>
    </div>
  )
}
Index.layout = (page) => <Layout children={page} />
export default Index;