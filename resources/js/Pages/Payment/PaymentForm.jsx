import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  CreditCard,
  AlertCircle,
  CheckCircle2,
  User,
  Mail,
  Calendar,
  Lock,
  Shield,
} from "lucide-react"
import { Paypal } from "@/components/icons/paypal"
import PaypalIcon from "@/Components/icons/PaypalIcon"
import VisaIcon from "@/Components/icons/visa"
import MasterCardIcon from "@/Components/icons/mastercard"
import PayPalCheckout from "./PaypalButton"

const PaymentForm = ({reservations, totalAmount}) => {
    const finalTotal = totalAmount
    const [paymentMethod, setPaymentMethod] = useState("card")
    const [isProcessing, setIsProcessing] = useState(false)
    const [formData, setFormData] = useState({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      name: reservations[0].user.name,
      email: reservations[0].user.email,
    })
    const [error, setError] = useState("")
  
    // Calculate total amount
    const handleInputChange = (e) => {
      const { name, value} = e.target
  
      // Format card number with spaces
      if (name === "cardNumber") {
        const formatted =
          value
            .replace(/\s/g, "")
            .match(/.{1,4}/g)
            ?.join(" ") || value
        setFormData((prev) => ({
          ...prev,
          [name]: formatted.slice(0, 19), // Limit to 16 digits + 3 spaces
        }))
        return
      }
  
      // Format expiry date
      if (name === "expiryDate") {
        const formatted = value
          .replace(/\D/g, "")
          .match(/(\d{0,2})(\d{0,2})/)
          ?.slice(1)
          .filter(Boolean)
          .join("/")
        setFormData((prev) => ({
          ...prev,
          [name]: formatted,
        }))
        return
      }
  
      // Format CVV
      if (name === "cvv") {
        setFormData((prev) => ({
          ...prev,
          [name]: value.slice(0, 3),
        }))
        return
      }
  
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      setError("")
      setIsProcessing(true)
  
      try {
        // Validate form
        if (paymentMethod === "card") {
          if (!formData.cardNumber || !formData.expiryDate || !formData.cvv) {
            throw new Error("Please fill in all card details")
          }
  
          if (formData.cardNumber.replace(/\s/g, "").length !== 16) {
            throw new Error("Invalid card number")
          }
  
          if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
            throw new Error("Invalid expiry date")
          }
  
          if (formData.cvv.length !== 3) {
            throw new Error("Invalid CVV")
          }
        }
  
        // Simulate payment processing
        await new Promise((resolve) => setTimeout(resolve, 2000))
  
        // Show success message and redirect
      //   router.push("/payment/success")
      } catch (err) {
        setError(err.message)
      } finally {
        setIsProcessing(false)
      }
    }

  return (
    <div className="lg:col-span-7">
        <Card className="overflow-hidden">
            <CardHeader className="bg-primary/5 pb-4">
            <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div className="space-y-4">
                <h3 className="font-semibold text-lg">Contact Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                    <div className="flex gap-4">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm font-medium leading-none text-muted-foreground">{formData.name}</p>
                    </div>
                    <div className="flex gap-4">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm font-medium leading-none text-muted-foreground">{formData.email}</p>
                    </div>
                    </div>
                </div>
                </div>

                <Separator />

                {/* Payment Method Selection */}
                <div className="space-y-4">
                <h3 className="font-semibold text-lg">Payment Method</h3>

                <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
                    <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="card" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Credit/Debit Card
                    </TabsTrigger>
                    <TabsTrigger value="paypal" className="flex items-center gap-2">
                        <Paypal className="h-4 w-4" />
                        PayPal
                    </TabsTrigger>
                    </TabsList>

                    {/* Card Payment Form */}
                    <TabsContent value="card" className="space-y-4 mt-4">
                    {/* Card Icons */}
                    <div className="flex gap-2">
                        <MasterCardIcon/>
                        <VisaIcon />
                    </div>

                    {/* Card Number */}
                    <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <div className="relative">
                        <Input
                            id="cardNumber"
                            name="cardNumber"
                            placeholder="5399 0000 0000 0000"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            className="pl-10"
                        />
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        {formData.cardNumber && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            {formData.cardNumber.startsWith("4") ? (
                                <div className="text-[#1A1F71] font-bold tracking-widest text-sm">VISA</div>
                            ) : formData.cardNumber.startsWith("5") ? (
                                <div className="flex">
                                <div className="w-3 h-3 rounded-full bg-[#EB001B]" />
                                <div className="w-3 h-3 rounded-full bg-[#F79E1B] -ml-1.5" />
                                </div>
                            ) : null}
                            </div>
                        )}
                        </div>
                    </div>

                    {/* Expiry and CVV */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiration Date</Label>
                        <div className="relative">
                            <Input
                            id="expiryDate"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            className="pl-10"
                            />
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <div className="relative">
                            <Input
                            id="cvv"
                            name="cvv"
                            type="password"
                            placeholder="•••"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            maxLength={3}
                            className="pl-10"
                            />
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                        </div>
                    </div>
                    </TabsContent>

                    {/* PayPal Section */}
                    <TabsContent value="paypal" className="mt-4">
                    <div className="bg-muted/50 rounded-lg p-6 text-center space-y-4 border">
                        <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center">
                        <PaypalIcon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                        <h3 className="font-semibold text-lg mb-2">Pay with PayPal</h3>
                        <p className="text-muted-foreground text-sm">
                            You'll be redirected to PayPal to complete your payment securely.
                        </p>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Shield className="h-4 w-4" />
                        <span>PayPal keeps your payment information secure</span>
                        </div>
                    </div>
                    </TabsContent>
                </Tabs>
                </div>

                {/* Error Message */}
                {error && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
                )}

                {/* Submit Button */}
                <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                {isProcessing ? (
                    <span className="flex items-center">
                    <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        ></circle>
                        <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    Processing Payment...
                    </span>
                ) : (
                    <>
                    Pay ${finalTotal.toFixed(2)}
                    <CheckCircle2 className="ml-2 h-4 w-4" />
                    </>
                )}
                </Button>
                

                {/* Terms */}
                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <Lock className="h-4 w-4 mt-0.5 flex-shrink-0 text-success" />
                <p>
                    Your payment information is encrypted and securely processed. By completing this booking, you
                    agree to our terms and conditions, cancellation policy, and privacy policy.
                </p>
                </div>
                
            </form>
            </CardContent>
        </Card>
    </div>
  )
}

export default PaymentForm