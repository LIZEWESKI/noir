import { useEffect, useState } from "react"
import Layout from "@/layouts/layout"
import ReservationsDetails from "@/components/payment/reservations-details"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { usePage } from "@inertiajs/react"
import NoReservations from "@/components/payment/no-reservations"

import SecurityNotice from "@/components/payment/security-notice"
import PriceSummary from "@/components/payment/price-summary"

const Index = ({ reservations, coupons }) => {
  const { flash } = usePage().props
  const {coupon} = flash;
  console.log(reservations)
  useEffect(() => {
    flash.error &&
      toast.error(flash.error, {
        descriptionClassName: "text-white/90",
        duration: 9000,
        position: "top-center",
        style: {
          backgroundColor: "hsl(var(--destructive))",
          color: "#fff",
        },
      })

    flash.success &&
      toast.success(flash.success, {
        descriptionClassName: "text-white/90",
        duration: 9000,
        position: "top-center",
        style: {
          backgroundColor: "hsl(var(--primary))",
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
              <h1 className="text-3xl md:text-4xl font-bold font-outfit  ">Complete Your Booking</h1>
              <p className="text-muted-foreground mt-2 md:text-lg">You're just one step away from your perfect stay</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7 space-y-6">
                <ReservationsDetails reservations={reservations} />
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="sticky top-8">
                  <div className="space-y-6">
                    <PriceSummary reservations={reservations} coupon={coupon} coupons={coupons} />
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

Index.layout = (page) => <Layout children={page} />
export default Index

