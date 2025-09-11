import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Mail,
  Calendar,
  Edit,
  Trash2,
  Phone,
  CreditCard,
  Bed,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"


const breadcrumbs= [
    {
      title: 'Guest Details',
      href: '/admin/guest-management/{:id}',
    },
];

// Mock guest data
const guestData = {
  id: 1,
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  phone: "+1 (555) 123-4567",
  role: "Premium Guest",
  avatar: "/diverse-woman-portrait.png",
  isActive: true,
  createdAt: "2023-03-15",
  totalStays: 12,
  lastStayDate: "2024-12-15",
  totalNights: 38,
  totalSpent: 3240,
}

// Mock reservations data
const reservationsHistory = [
  {
    id: "RES-001",
    roomName: "Ocean View Suite",
    roomNumber: "301",
    checkIn: "2024-12-15",
    checkOut: "2024-12-18",
    status: "completed",
    totalPrice: 450,
  },
  {
    id: "RES-002",
    roomName: "Standard Room",
    roomNumber: "205",
    checkIn: "2024-11-20",
    checkOut: "2024-11-23",
    status: "completed",
    totalPrice: 320,
  },
  {
    id: "RES-003",
    roomName: "Deluxe Suite",
    roomNumber: "401",
    checkIn: "2025-01-10",
    checkOut: "2025-01-14",
    status: "confirmed",
    totalPrice: 680,
  },
  {
    id: "RES-004",
    roomName: "Standard Room",
    roomNumber: "102",
    checkIn: "2024-10-05",
    checkOut: "2024-10-07",
    status: "cancelled",
    totalPrice: 240,
  },
]

// Mock payments data
const paymentsHistory = [
  {
    id: "PAY-001",
    date: "2024-12-15",
    amount: 450,
    method: "Credit Card",
    status: "completed",
  },
  {
    id: "PAY-002",
    date: "2024-11-20",
    amount: 320,
    method: "PayPal",
    status: "completed",
  },
  {
    id: "PAY-003",
    date: "2025-01-10",
    amount: 680,
    method: "Credit Card",
    status: "pending",
  },
  {
    id: "PAY-004",
    date: "2024-10-05",
    amount: 240,
    method: "Credit Card",
    status: "refunded",
  },
]

const GuestProfilePage = () => {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "confirmed":
        return <Clock className="h-4 w-4 text-blue-400" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-400" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-400" />
      case "refunded":
        return <XCircle className="h-4 w-4 text-orange-400" />
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status) => {
    const baseClasses = "text-xs font-medium"
    switch (status) {
      case "completed":
        return `${baseClasses} bg-green-500/20 text-green-300 border-green-500/30`
      case "confirmed":
        return `${baseClasses} bg-blue-500/20 text-blue-300 border-blue-500/30`
      case "cancelled":
        return `${baseClasses} bg-red-500/20 text-red-300 border-red-500/30`
      case "pending":
        return `${baseClasses} bg-yellow-500/20 text-yellow-300 border-yellow-500/30`
      case "refunded":
        return `${baseClasses} bg-orange-500/20 text-orange-300 border-orange-500/30`
      default:
        return `${baseClasses} bg-muted/20 text-muted-foreground border-muted/30`
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="User Details"/>
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        {/* Header with Actions */}
        <div className="flex items-center justify-between">
            <div>
            <h1 className="text-2xl font-bold text-foreground">Guest Profile</h1>
            <p className="text-muted-foreground">Detailed guest information and history</p>
            </div>
            <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Guest
            </Button>
            <Button
                variant="outline"
                size="sm"
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 bg-transparent"
            >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Guest
            </Button>
            </div>
        </div>

        {/* Guest Profile Section */}
        <Card className="border-border/50">
            <CardContent className="p-6">
            <div className="flex items-start gap-6">
                <Avatar className="h-20 w-20 ring-2 ring-primary/20">
                <AvatarImage src={guestData.avatar || "/placeholder.svg"} alt={guestData.name} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                    {getInitials(guestData.name)}
                </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                    <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xl font-semibold text-foreground">{guestData.name}</h2>
                        <Badge
                        variant="outline"
                        className={
                            guestData.isActive
                            ? "bg-green-500/20 text-green-300 border-green-500/30"
                            : "bg-red-500/20 text-red-300 border-red-500/30"
                        }
                        >
                        {guestData.isActive ? "Active" : "Inactive"}
                        </Badge>
                    </div>
                    <p className="text-muted-foreground font-medium">{guestData.role}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Email:</span>
                    <span className="text-foreground">{guestData.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="text-foreground">{guestData.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Member since:</span>
                    <span className="text-foreground">{new Date(guestData.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
                </div>
            </div>
            </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="flex flex-wrap gap-3">
            <Badge variant="outline" className="px-3 py-2 bg-primary/10 text-primary border-primary/30">
            <Bed className="h-4 w-4 mr-2" />
            {guestData.totalStays} Stays
            </Badge>
            <Badge variant="outline" className="px-3 py-2 bg-blue-500/10 text-blue-300 border-blue-500/30">
            <Calendar className="h-4 w-4 mr-2" />
            Last: {new Date(guestData.lastStayDate).toLocaleDateString()}
            </Badge>
            <Badge variant="outline" className="px-3 py-2 bg-green-500/10 text-green-300 border-green-500/30">
            <Clock className="h-4 w-4 mr-2" />
            {guestData.totalNights} Total Nights
            </Badge>
            <Badge variant="outline" className="px-3 py-2 bg-yellow-500/10 text-yellow-300 border-yellow-500/30">
            <DollarSign className="h-4 w-4 mr-2" />${guestData.totalSpent.toLocaleString()} Spent
            </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Reservation History */}
            <Card className="border-border/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                <Bed className="h-5 w-5 text-primary" />
                Reservation History
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                {reservationsHistory.map((reservation) => (
                    <div
                    key={reservation.id}
                    className="p-4 rounded-lg border border-border/50 hover:border-primary/30 cursor-pointer transition-all hover:bg-muted/20"
                    >
                    <div className="flex items-start justify-between mb-2">
                        <div>
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">{reservation.id}</span>
                            <Badge variant="outline" className={getStatusBadge(reservation.status)}>
                            {reservation.status}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {reservation.roomName} - Room {reservation.roomNumber}
                        </p>
                        </div>
                        <span className="font-semibold text-foreground">${reservation.totalPrice}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Check-in: {new Date(reservation.checkIn).toLocaleDateString()}</span>
                        <span>Check-out: {new Date(reservation.checkOut).toLocaleDateString()}</span>
                    </div>
                    </div>
                ))}
                </div>
            </CardContent>
            </Card>

            {/* Payments History */}
            <Card className="border-border/50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Payment History
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                {paymentsHistory.map((payment) => (
                    <div
                    key={payment.id}
                    className="p-4 rounded-lg border border-border/50 hover:border-primary/30 cursor-pointer transition-all hover:bg-muted/20"
                    >
                    <div className="flex items-start justify-between mb-2">
                        <div>
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">{payment.id}</span>
                            <Badge variant="outline" className={getStatusBadge(payment.status)}>
                            {payment.status}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{payment.method}</p>
                        </div>
                        <span className="font-semibold text-foreground">${payment.amount}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{new Date(payment.date).toLocaleDateString()}</div>
                    </div>
                ))}
                </div>
            </CardContent>
            </Card>
        </div>
        </div>
    </AppLayout>
  )
}

export default GuestProfilePage
