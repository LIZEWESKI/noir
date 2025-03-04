import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Trash2, Calendar, Users, CreditCard, ShoppingCart, Bed, ChevronRight } from "lucide-react"
import { Link } from "@inertiajs/react"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Layout from "@/Layouts/Layout"

const Index = () => {
  // Sample cart data - in a real app, this would come from your cart state/API
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Standard Single Room",
      room_number: "101",
      type: "Single",
      price: "80.00",
      image_path_url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      size: "20 m²",
      guests: 1,
      bed: "1 Single Bed",
      checkIn: new Date(2025, 3, 15),
      checkOut: new Date(2025, 3, 18),
      guestCount: 1,
      nights: 3,
      cleaningFee: 25,
      serviceFee: 15,
    },
    {
      id: 2,
      name: "Deluxe Double Room",
      room_number: "205",
      type: "Double",
      price: "120.00",
      image_path_url: "https://images.unsplash.com/photo-1588796460666-590f1d712a2e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      size: "32 m²",
      guests: 2,
      bed: "1 King Bed",
      checkIn: new Date(2025, 3, 20),
      checkOut: new Date(2025, 3, 25),
      guestCount: 2,
      nights: 5,
      cleaningFee: 35,
      serviceFee: 25,
    },
  ])

  const [isLoading, setIsLoading] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0)

  // Calculate total amount
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => {
      const roomTotal = Number.parseFloat(item.price) * item.nights + item.cleaningFee + item.serviceFee
      return sum + roomTotal
    }, 0)
    setTotalAmount(total)
  }, [cartItems])

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId))
  }

  // Handle checkout
  const handleCheckout = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert("Proceeding to payment gateway...")
      // Here you would redirect to payment page or process payment
    }, 1500)
  }

  // Calculate item total
  const calculateItemTotal = (item) => {
    return Number.parseFloat(item.price) * item.nights + item.cleaningFee + item.serviceFee
  }

  // Empty cart view
  if (cartItems.length === 0) {
    return (
      <div className="py-12 md:py-24">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
          <div className="text-center space-y-6 py-12">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-muted">
              <ShoppingCart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Your Cart is Empty</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              You haven't added any rooms to your cart yet. Browse our selection of rooms and find your perfect stay.
            </p>
            <Link href="/rooms">
              <Button className="mt-4 group">
                Browse Rooms
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12 md:py-24">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Left Column - Cart Items */}
          <div className="w-full md:w-2/3 space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold tracking-tight">Your Cart</h1>
              <Badge variant="outline" className="text-sm px-3 py-1">
                {cartItems.length} {cartItems.length === 1 ? "Room" : "Rooms"}
              </Badge>
            </div>

            {/* Cart Items */}
            <div className="space-y-6">
              {cartItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      {/* Room Image */}
                      <div className="sm:w-1/3 aspect-video sm:aspect-square relative">
                        <img
                          src={item.image_path_url || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Room Details */}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <p className="text-muted-foreground text-sm">
                              {item.bed} • {item.size}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                            aria-label="Remove from cart"
                          >
                            <Trash2 className="h-5 w-5 text-destructive" />
                          </Button>
                        </div>

                        <Separator className="my-4" />

                        {/* Booking Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Check-in</p>
                              <p>{format(item.checkIn, "MMM dd, yyyy")}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Check-out</p>
                              <p>{format(item.checkOut, "MMM dd, yyyy")}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Guests</p>
                              <p>
                                {item.guestCount} {item.guestCount === 1 ? "Guest" : "Guests"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Bed className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Stay</p>
                              <p>
                                {item.nights} {item.nights === 1 ? "Night" : "Nights"}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-auto pt-4 flex justify-between items-end">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              ${Number.parseFloat(item.price).toFixed(2)} × {item.nights} nights
                            </p>
                            <p className="text-sm text-muted-foreground">
                              + ${item.cleaningFee.toFixed(2)} cleaning fee
                            </p>
                            <p className="text-sm text-muted-foreground">+ ${item.serviceFee.toFixed(2)} service fee</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">${calculateItemTotal(item).toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full md:w-1/3">
            <Card className="sticky top-8">
              <CardContent className="p-6 space-y-6">
                <h2 className="text-xl font-semibold">Order Summary</h2>

                <ScrollArea className="h-[200px] pr-4">
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <div className="flex-1 pr-4">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-muted-foreground">
                            {format(item.checkIn, "MMM dd")} - {format(item.checkOut, "MMM dd")}
                          </p>
                        </div>
                        <p>${calculateItemTotal(item).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span>${(totalAmount * 0.1).toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${(totalAmount * 1.1).toFixed(2)}</span>
                </div>

                <Alert className="bg-muted/50 border-muted">
                  <AlertDescription className="text-xs text-muted-foreground">
                    By proceeding, you agree to our terms and conditions, cancellation policy, and payment terms.
                  </AlertDescription>
                </Alert>

                <Button size="lg" className="w-full" onClick={handleCheckout} disabled={isLoading}>
                  {isLoading ? (
                    "Processing..."
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Proceed to Payment
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <Link href="/rooms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Continue Shopping
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
Index.layout = (page) => <Layout children={page}/>;
export default Index