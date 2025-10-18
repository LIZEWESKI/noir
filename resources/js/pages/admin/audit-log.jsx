import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, ChevronDown, ChevronRight, Calendar, User, Globe, Activity, UserCheck, Logs, House, Ticket } from "lucide-react"
import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useInitials } from "@/hooks/use-initials"

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
  if (action.includes("COUPON")) return <Ticket className="h-4 w-4" />
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

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <User className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Users</p>
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
                  <div className="p-2 bg-yellow-500/10 rounded-lg">
                    <Ticket className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Coupons</p>
                    <p className="text-2xl font-bold">
                      {filteredLogs.filter((log) => log.action.includes("COUPON")).length}
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
                    <SelectItem value="user">Users</SelectItem>
                    <SelectItem value="reservation">Reservations</SelectItem>
                    <SelectItem value="room">Rooms</SelectItem>
                    <SelectItem value="coupon">Coupons</SelectItem>
                    <SelectItem value="login">Login Events</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

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
