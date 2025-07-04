"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import {
  Calendar,
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronRight,
  Download,
  Eye,
} from "lucide-react"
import { Link } from "@inertiajs/react"
import Layout from "@/Layouts/Layout"
import Edit from "./Edit"

// Status badge component with appropriate colors
const StatusBadge = ({ status }) => {
  const statusConfig = {
    pending: {
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500",
      icon: <Clock className="h-3 w-3 mr-1" />,
    },
    active: {
      color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500",
      icon: <CheckCircle className="h-3 w-3 mr-1" />,
    },
    completed: {
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500",
      icon: <CheckCircle className="h-3 w-3 mr-1" />,
    },
    cancelled: {
      color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500",
      icon: <XCircle className="h-3 w-3 mr-1" />,
    },
    paid: {
      color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500",
      icon: <CheckCircle className="h-3 w-3 mr-1" />,
    },
    failed: {
      color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500",
      icon: <AlertCircle className="h-3 w-3 mr-1" />,
    },
    pending_payment: {
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500",
      icon: <Clock className="h-3 w-3 mr-1" />,
    },
  }

  const config = statusConfig[status.toLowerCase()] || statusConfig.pending

  return (
    <Badge variant="outline" className={`flex items-center ${config.color} border-0`}>
      {config.icon}
      <span className="capitalize">{status.replace("_", " ")}</span>
    </Badge>
  )
}

const  ReservationsHistory = ({ reservations, payments}) => {
  const [activeTab, setActiveTab] = useState("all")
    console.log(reservations)
  // Filter reservations based on active tab
  const filteredReservations =
    activeTab === "all" ? reservations : reservations.filter((res) => res.status.toLowerCase() === activeTab)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reservations & Payments</h1>
        <p className="text-muted-foreground">View and manage your booking history and payment information.</p>
      </div>

      <Tabs defaultValue="reservations" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reservations">Reservations</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        {/* Reservations Tab */}
        <TabsContent value="reservations" className="space-y-4">
          {filteredReservations.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <Calendar className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No reservations found</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-4 max-w-md">
                  {activeTab === "all"
                    ? "You haven't made any reservations yet."
                    : `You don't have any ${activeTab} reservations.`}
                </p>
                <Link href="/rooms">
                  <Button>Browse Rooms</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredReservations.map((reservation) => (
                <Card key={reservation.id} className="overflow-hidden">
                  <div className="md:flex">
                    {/* Room Image */}
                    <div className="md:w-1/4 h-32 md:h-auto relative">
                      <img
                        src={reservation.room.image_path_url || "/placeholder.svg?height=200&width=200"}
                        alt={reservation.room.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Reservation Details */}
                    <div className="p-4 md:p-6 flex-1">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{reservation.room.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {format(new Date(reservation.check_in), "MMM dd, yyyy")} -{" "}
                              {format(new Date(reservation.check_out), "MMM dd, yyyy")}
                            </span>
                            <span>•</span>
                            <span>
                              {reservation.nights} {reservation.nights === 1 ? "night" : "nights"}
                            </span>
                          </div>
                        </div>
                        <StatusBadge status={reservation.status} />
                      </div>

                      <Separator className="my-4" />

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-baseline gap-1">
                          <span className="font-semibold text-lg">${Number(reservation.total_price).toFixed(2)}</span>
                          <span className="text-sm text-muted-foreground">total</span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {reservation.status.toLowerCase() === "pending" && (
                            <Link href={`/payment?reservation=${reservation.id}`}>
                              <Button size="sm" variant="default">
                                Pay Now
                              </Button>
                            </Link>
                          )}
                          <Link href={`/reservations/${reservation.id}`}>
                            <Button size="sm" variant="outline">
                              View Details
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-4">
          {payments.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <CreditCard className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No payment history</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-4 max-w-md">You haven't made any payments yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {payments.map((payment) => (
                <Card key={payment.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">Transaction #{payment.transaction_id || payment.id}</span>
                          <StatusBadge status={payment.payment_status} />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {format(new Date(payment.created_at), "MMMM dd, yyyy 'at' h:mm a")}
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-sm">
                          <div className="flex items-center gap-1">
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                            <span className="capitalize">{payment.payment_method}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col md:items-end gap-2">
                        <div className="font-semibold text-lg">${Number(payment.total_amount).toFixed(2)}</div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-1" />
                            Receipt
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

ReservationsHistory.layout = (page) => (
    <Layout>
      <Edit children={page}/>
    </Layout>
  );
export default ReservationsHistory;