import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { User, Calendar, MapPin, Bed } from "lucide-react"
import { format } from "date-fns"
import { useInitials } from "@/hooks/use-initials"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useCapitalize } from "@/hooks/use-capitalize"
import PriceDisplay from "@/components/reservations/price-display"

export default function PaymentDetailsModal({isOpen, onClose,payment}) {

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "completed":
        return "default"
      case "pending":
        return "secondary"
      case "cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getRoleBadgeVariant = (role) => {
    return role === "admin" ? "default" : "secondary"
  }
  const getInitials = useInitials();
  const getCapitalize  = useCapitalize()
  return (
    <>
      {payment && (
          <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">Payment Details</DialogTitle>
              </DialogHeader>
      
              <div className="space-y-6">
                {/* User Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      User Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={payment.user.profile_picture_url} alt={payment.user.name} />
                        <AvatarFallback>{getInitials(payment.user.name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-medium">{payment.user.name}</h3>
                          <Badge variant={getRoleBadgeVariant(payment.user.role)}>{payment.user.role}</Badge>
                        </div>
                        <p className="text-muted-foreground">{payment.user.email}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
      
                {/* Payment Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Amount</p>
                        <PriceDisplay 
                          original={payment.total_amount} 
                          discounted={payment.original_price} 
                          model="payment" 
                        />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Payment Status</p>
                        <Badge variant={getStatusBadgeVariant(payment.payment_status)} className="mt-1">
                          {payment.payment_status}
                        </Badge>
                      </div>
                    </div>
      
                    <Separator />
      
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Payment Method</p>
                        <p className="font-medium">{getCapitalize(payment.payment_method)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Payment Date</p>
                        <p className="font-medium">{format(payment.created_at,"EEEE, MMMM do, yyyy")}</p>
                      </div>
                    </div>
      
                    <div>
                      <p className="text-sm text-muted-foreground">Transaction ID</p>
                      <p className="font-mono text-sm">TXN-{payment.transaction_id}</p>
                    </div>
                  </CardContent>
                </Card>
      
                {/* Reservations Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Reservations ({payment.reservations.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {payment.reservations.map((reservation, index) => (
                      <div key={reservation.id}>
                        <div className="flex items-start justify-between p-4 border rounded-lg">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                <span className="font-medium">
                                  {reservation.check_in} → {reservation.check_out}
                                </span>
                              </div>
                              <Badge variant="outline">
                                {reservation.nights} {reservation.nights === 1 ? "night" : "nights"}
                              </Badge>
                            </div>
      
                            <div className="flex items-center gap-6">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm">Room {reservation.room.room_number}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Bed className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm">{reservation.room.name}</span>
                              </div>
                              <Badge variant="secondary">{reservation.room.type}</Badge>
                            </div>
                          </div>
                        </div>
                        {index < payment.reservations.length - 1 && <Separator className="my-4" />}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </DialogContent>
          </Dialog>
      )}
    </>
  )
}
