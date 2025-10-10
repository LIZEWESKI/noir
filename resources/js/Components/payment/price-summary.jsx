import React, { useEffect, useState } from 'react'
import PaypalButton from "@/components/payment/paypal-button"
import { Input } from "@/components/ui/input"
import { Check, Loader } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useForm } from '@inertiajs/react'


const PriceSummary = ({ reservations, coupon }) => {
  const { data, setData, post, processing, errors } = useForm({coupon: ''})
  const couponDefault = {
    code : "",
    type : "percentage",
    value : 0,
    status : "idle",
  }
  const [couponData, setCouponData] = useState(coupon || couponDefault)

  useEffect(()=> {
    if(coupon) setCouponData(coupon);
  },[coupon])

  let subtotal = reservations.reduce((sum, item) => {
    const roomTotal = Number.parseFloat(item.room.price) * Number(item.nights)
    return sum + roomTotal
  }, 0)

  const cleaningFees = reservations.reduce((sum, item) => sum + Number(item.cleaning_fee), 0)
  const serviceFees = reservations.reduce((sum, item) => sum + Number(item.service_fee), 0)

  subtotal = subtotal + cleaningFees + serviceFees;
  const discountAmount = couponData.type === "percentage" ? (subtotal * couponData.value) / 100 : couponData.value
  const finalTotal = subtotal - discountAmount

  const applyCoupon = (e) => {
    setCouponData(couponDefault)
    e.preventDefault()
    post('/coupons/apply')
  }

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

        <div className="pt-4 border-t space-y-3">
          <form className="flex gap-2" onSubmit={applyCoupon}>
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Enter coupon code"
                value={data.coupon}
                onChange={e => setData('coupon', e.target.value)}
                disabled={processing}
                className={`pr-10 ${
                  couponData.status === "valid"
                    ? "border-success focus-visible:ring-success"
                    : errors.coupon && "border-destructive focus-visible:ring-destructive"
                }`}
              />
              {processing && (
                <Loader className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-pulse text-muted-foreground" />
              )}
              {couponData.status === "valid" && (
                <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-success" />
              )}
            </div>
            <Button
              disabled={processing || data.coupon.length === 0}
              variant="outline"
            >
              Apply
            </Button>
          </form>

          {couponData.status === "valid" && (
            <p className="text-xs text-success flex items-center gap-1">
              Coupon "{couponData.code.toUpperCase()}" applied successfully
            </p>
          )}
          {errors.coupon && (
            <p className="text-xs text-destructive flex items-center gap-1">
              {errors.coupon}
            </p>
          )}
        </div>

        {couponData.status === "valid" && discountAmount > 0 && (
          <div className="flex justify-between text-sm text-success">
            <span>Discount ({couponData.type === "percentage" ? `${couponData.value}%` : "Coupon"})</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="pt-4 border-t">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${Math.ceil(finalTotal).toFixed(2)}</span>
          </div>
        </div>
        <PaypalButton coupon={coupon} reservations={reservations}/>
      </div>
    </div>
  )
}

export default PriceSummary