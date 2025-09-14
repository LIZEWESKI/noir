import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, ChevronDown, ChevronRight, Calendar, User, Globe, Activity, UserCheck, Logs, House } from "lucide-react"
import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useInitials } from "@/hooks/use-initials"

// const admins = [
//   { id: 1, name: "Sarah Johnson", email: "sarah@noirhotel.com", avatar: "/diverse-woman-portrait.png" },
//   { id: 2, name: "Michael Chen", email: "michael@noirhotel.com", avatar: "/thoughtful-man.png" },
//   { id: 3, name: "Emma Rodriguez", email: "emma@noirhotel.com", avatar: "/professional-woman-diverse.png" },
// ]

const mockAuditLogs = [
  {
    id: 1,
    user_id: 1,
    action: "USER_CREATED",
    details: { user_name: "John Doe", user_email: "john@example.com", role: "guest" },
    ip_address: "192.168.1.100",
    created_at: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    user_id: 1,
    action: "RESERVATION_UPDATED",
    details: { reservation_id: "RES-001", room_number: "101", status_changed: "pending -> confirmed" },
    ip_address: "192.168.1.100",
    created_at: "2024-01-15T09:15:00Z",
  },
  {
    id: 3,
    user_id: 2,
    action: "ROOM_DELETED",
    details: { room_id: 25, room_number: "205", room_type: "Deluxe Suite" },
    ip_address: "192.168.1.102",
    created_at: "2024-01-15T08:45:00Z",
  },
  {
    id: 4,
    user_id: 2,
    action: "LOGIN_ATTEMPT",
    details: { success: true, user_agent: "Mozilla/5.0 Chrome/120.0.0.0" },
    ip_address: "192.168.1.102",
    created_at: "2024-01-15T08:00:00Z",
  },
  {
    id: 5,
    user_id: 3,
    action: "PAYMENT_PROCESSED",
    details: { payment_id: "PAY-123", amount: 299.99, method: "credit_card", status: "completed" },
    ip_address: "192.168.1.103",
    created_at: "2024-01-14T16:20:00Z",
  },
  {
    id: 6,
    user_id: 1,
    action: "GUEST_PROFILE_UPDATED",
    details: { guest_id: 42, fields_changed: ["phone", "address"], previous_phone: "+1234567890" },
    ip_address: "192.168.1.100",
    created_at: "2024-01-14T14:10:00Z",
  },
  {
    id: 7,
    user_id: 3,
    action: "ROOM_CREATED",
    details: { room_number: "301", room_type: "Presidential Suite", price: 599.99 },
    ip_address: "192.168.1.103",
    created_at: "2024-01-14T12:30:00Z",
  },
  {
    id: 8,
    user_id: 2,
    action: "USER_DELETED",
    details: { user_id: 15, user_name: "Jane Smith", reason: "Account closure request" },
    ip_address: "192.168.1.102",
    created_at: "2024-01-14T11:15:00Z",
  },
]

const getActionBadgeVariant = (action) => {
  if (action.includes("CREATED") || action.includes("LOGIN")) return "default"
  if (action.includes("UPDATED")) return "secondary"
  if (action.includes("DELETED")) return "destructive"
  if (action.includes("CANCELED")) return "destructive"
  return "outline"
}

const getActionIcon = (action) => {
  if (action.includes("USER") || action.includes("GUEST")) return <User className="h-4 w-4" />
  if (action.includes("LOGIN")) return <Globe className="h-4 w-4" />
  if (action.includes("ROOM")) return <House className="h-4 w-4" />
  return <Calendar className="h-4 w-4" />
}
const breadcrumbs= [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
  },
  {
    title: 'Audit Log',
    href: '/admin/audit-log',
  },
];

export default function AuditLog({audit_logs, admins}) {
  console.log(audit_logs)
  console.log(admins)
  const [searchTerm, setSearchTerm] = useState("")
  const [actionFilter, setActionFilter] = useState("all")
  const [expandedRows, setExpandedRows] = useState(new Set())
  const [selectedAdmin, setSelectedAdmin] = useState("all")

  const toggleRowExpansion = (id) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedRows(newExpanded)
  }

  const filteredLogs = audit_logs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      JSON.stringify(log.details).toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = actionFilter === "all" || log.action.toLowerCase().includes(actionFilter.toLowerCase())
    const matchesAdmin = selectedAdmin === "all" || log.user_id.toString() === selectedAdmin
    return matchesSearch && matchesFilter && matchesAdmin
  })

  const getAdminById = (adminId) => {
    return admins.find((admin) => admin.id === adminId)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }
  const getInitials = useInitials();
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Audit Log" />
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground mt-1">Track all administrative actions and system events</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="px-3 py-1">
                <Activity className="h-4 w-4 mr-1" />
                {filteredLogs.length} Events
              </Badge>
            </div>
          </div>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Admin:</span>
                </div>
                <Select value={selectedAdmin} onValueChange={setSelectedAdmin}>
                  <SelectTrigger className="w-64 h-10" >
                    <SelectValue placeholder="Select admin" />
                  </SelectTrigger>
                  <SelectContent >
                    <SelectItem value="all">All Admins</SelectItem>
                    {admins.map((admin) => (
                      <SelectItem key={admin.id} value={admin.id.toString()}>
                        <div className="flex items-center gap-2 ">
                          <span>{admin.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedAdmin !== "all" && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Showing logs for:</span>
                    <Badge variant="secondary">{getAdminById(Number.parseInt(selectedAdmin))?.name}</Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <User className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">User Actions</p>
                    <p className="text-2xl font-bold">
                      {filteredLogs.filter((log) => log.action.includes("USER") || log.action.includes("GUEST")).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <Calendar className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Reservations</p>
                    <p className="text-2xl font-bold">
                      {filteredLogs.filter((log) => log.action.includes("RESERVATION")).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <House className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rooms</p>
                    <p className="text-2xl font-bold">
                      {filteredLogs.filter((log) => log.action.includes("ROOM")).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-500/10 rounded-lg">
                    <Globe className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Login Events</p>
                    <p className="text-2xl font-bold">
                      {filteredLogs.filter((log) => log.action.includes("LOGIN")).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search actions or details..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={actionFilter} onValueChange={setActionFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Actions</SelectItem>
                    <SelectItem value="user">User Actions</SelectItem>
                    <SelectItem value="reservation">Reservations</SelectItem>
                    <SelectItem value="room">Rooms</SelectItem>
                    <SelectItem value="login">Login Events</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Audit Log Table */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {filteredLogs.map((log, index) => {
                  const admin = getAdminById(log.user_id)
                  return (
                    <div
                      key={log.id}
                      className={`border-b border-border last:border-b-0 ${index % 2 === 0 ? "bg-muted/20" : ""}`}
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleRowExpansion(log.id)}
                              className="p-1 h-auto"
                            >
                              {expandedRows.has(log.id) ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </Button>

                            <div className="flex items-center gap-3">
                              {getActionIcon(log.action)}
                              <div>
                                <div className="flex items-center gap-2">
                                  <Badge variant={getActionBadgeVariant(log.action)} className="text-xs">
                                    {log.action.replace(/_/g, " ")}
                                  </Badge>
                                  {admin && (
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                      <span>by</span>
                                      <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                                          <AvatarImage src={admin.profile_picture_url} alt={admin.name} />
                                          <AvatarFallback >
                                            {getInitials(admin.name)}
                                          </AvatarFallback>
                                      </Avatar>
                                      <span>{admin.name}</span>
                                    </div>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{formatDate(log.created_at)}</p>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-sm font-mono text-muted-foreground">{log.ip_address}</p>
                          </div>
                        </div>

                        {expandedRows.has(log.id) && (
                          <div className="mt-4 ml-12 p-4 bg-muted/30 rounded-lg">
                            <h4 className="font-medium mb-2">Action Details</h4>
                            <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono">
                              {JSON.stringify(log.details, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
