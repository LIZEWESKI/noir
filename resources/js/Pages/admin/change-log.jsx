import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Bug,
  Zap,
  Calendar,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Shield,
  Users,
  Database,
  Bell,
  Settings,
} from "lucide-react"
import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"

const changelogData = [
  {
    version: "v2.1.0",
    date: "2024-01-15",
    type: "major",
    changes: [
      {
        type: "feature",
        title: "Advanced Guest Analytics Dashboard",
        description:
          "New comprehensive analytics with guest behavior insights, revenue tracking, and predictive booking patterns.",
        icon: <Sparkles className="w-4 h-4" />,
        details:
          "Includes heat maps, conversion funnels, and AI-powered recommendations for improving guest satisfaction.",
      },
      {
        type: "feature",
        title: "Real-time Notification System",
        description: "Instant notifications for bookings, cancellations, and guest requests across all devices.",
        icon: <Bell className="w-4 h-4" />,
        details: "Push notifications, email alerts, and in-app notifications with customizable preferences.",
      },
      {
        type: "improvement",
        title: "Enhanced Security Protocols",
        description: "Upgraded authentication system with two-factor authentication and role-based permissions.",
        icon: <Shield className="w-4 h-4" />,
        details: "Added biometric login support and advanced audit logging for compliance.",
      },
    ],
  },
  {
    version: "v2.0.5",
    date: "2024-01-08",
    type: "patch",
    changes: [
      {
        type: "fix",
        title: "Reservation Calendar Sync Issues",
        description: "Fixed synchronization problems between the booking calendar and external calendar systems.",
        icon: <Calendar className="w-4 h-4" />,
        details: "Resolved conflicts with Google Calendar and Outlook integration.",
      },
      {
        type: "fix",
        title: "Payment Processing Timeout",
        description: "Resolved timeout issues during peak booking hours that caused payment failures.",
        icon: <Bug className="w-4 h-4" />,
        details: "Optimized payment gateway connections and added retry mechanisms.",
      },
      {
        type: "improvement",
        title: "Database Performance Optimization",
        description: "Improved query performance for large datasets, reducing load times by 40%.",
        icon: <Database className="w-4 h-4" />,
        details: "Added database indexing and optimized complex queries for better performance.",
      },
    ],
  },
  {
    version: "v2.0.0",
    date: "2023-12-20",
    type: "major",
    changes: [
      {
        type: "feature",
        title: "Complete UI/UX Redesign",
        description: "Brand new dark theme interface with improved navigation and modern design patterns.",
        icon: <Sparkles className="w-4 h-4" />,
        details: "Redesigned all components with accessibility improvements and mobile-first approach.",
      },
      {
        type: "feature",
        title: "Multi-user Collaboration",
        description: "Added support for multiple staff members with different permission levels.",
        icon: <Users className="w-4 h-4" />,
        details: "Role-based access control with manager, receptionist, and housekeeping roles.",
      },
      {
        type: "feature",
        title: "Advanced Reporting Suite",
        description: "Comprehensive reporting tools with customizable dashboards and export capabilities.",
        icon: <Settings className="w-4 h-4" />,
        details: "PDF exports, scheduled reports, and interactive charts with drill-down capabilities.",
      },
    ],
  },
  {
    version: "v1.9.2",
    date: "2023-12-10",
    type: "patch",
    changes: [
      {
        type: "fix",
        title: "Guest Check-in Process",
        description: "Fixed issues with guest check-in workflow that caused delays during busy periods.",
        icon: <Bug className="w-4 h-4" />,
        details: "Streamlined the check-in process and fixed validation errors.",
      },
      {
        type: "improvement",
        title: "Mobile Responsiveness",
        description: "Enhanced mobile experience with better touch interactions and responsive layouts.",
        icon: <Zap className="w-4 h-4" />,
        details: "Optimized for tablets and smartphones with gesture support.",
      },
    ],
  },
]

const getTypeColor = (type) => {
  switch (type) {
    case "feature":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
    case "fix":
      return "bg-red-500/20 text-red-400 border-red-500/30"
    case "improvement":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }
}

const getVersionColor = (type) => {
  switch (type) {
    case "major":
      return "bg-emerald-500/10 border-emerald-500/30"
    case "minor":
      return "bg-blue-500/10 border-blue-500/30"
    case "patch":
      return "bg-gray-500/10 border-gray-500/30"
    default:
      return "bg-gray-500/10 border-gray-500/30"
  }
}

const breadcrumbs= [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
  },
  {
    title: 'Change Log',
    href: '/admin/change-log',
  },
];

export default function ChangelogPage() {
  const [expandedItems, setExpandedItems] = useState({})

  const toggleExpanded = (versionIndex, changeIndex) => {
    const key = `${versionIndex}-${changeIndex}`
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Change Log" />
        <div className="min-h-screen bg-background p-2">
        <div className="">
            {/* Header */}
            <div className="text-left mb-12">
            <p className="text-muted-foreground text-lg">
                Stay updated with the latest features, improvements, and fixes
            </p>
            </div>

            {/* Timeline */}
            <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

            {changelogData.map((version, versionIndex) => (
                <div key={version.version} className="relative mb-12">
                {/* Version marker */}
                <div className="absolute left-6 w-4 h-4 bg-emerald-500 rounded-full border-4 border-background"></div>

                {/* Version card */}
                <div className="ml-16">
                    <Card className={`${getVersionColor(version.type)} border-2`}>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-bold text-foreground">{version.version}</h2>
                            <Badge variant="outline" className="capitalize">
                            {version.type} Release
                            </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(version.date).toLocaleDateString()}</span>
                        </div>
                        </div>

                        {/* Changes */}
                        <div className="space-y-4">
                        {version.changes.map((change, changeIndex) => {
                            const isExpanded = expandedItems[`${versionIndex}-${changeIndex}`]

                            return (
                            <Card key={changeIndex} className="bg-card/50 border-border/50">
                                <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                    <div className={`p-2 rounded-lg ${getTypeColor(change.type)}`}>{change.icon}</div>
                                    <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Badge variant="outline" className={`text-xs ${getTypeColor(change.type)}`}>
                                        {change.type}
                                        </Badge>
                                        <h3 className="font-semibold text-foreground">{change.title}</h3>
                                    </div>
                                    <p className="text-muted-foreground mb-3">{change.description}</p>

                                    {change.details && (
                                        <>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => toggleExpanded(versionIndex, changeIndex)}
                                            className="text-emerald-400 hover:text-emerald-300 p-0 h-auto"
                                        >
                                            {isExpanded ? (
                                            <>
                                                <ChevronUp className="w-4 h-4 mr-1" />
                                                Show less
                                            </>
                                            ) : (
                                            <>
                                                <ChevronDown className="w-4 h-4 mr-1" />
                                                Show more
                                            </>
                                            )}
                                        </Button>

                                        {isExpanded && (
                                            <div className="mt-3 p-3 bg-muted/20 rounded-lg border border-border/30">
                                            <p className="text-sm text-muted-foreground">{change.details}</p>
                                            </div>
                                        )}
                                        </>
                                    )}
                                    </div>
                                </div>
                                </CardContent>
                            </Card>
                            )
                        })}
                        </div>
                    </CardContent>
                    </Card>
                </div>
                </div>
            ))}
            </div>

            {/* Footer */}
            <div className="text-center mt-16 p-8 border-t border-border">
            <p className="text-muted-foreground">
                Have suggestions or found a bug?
                <Button variant="link" className="text-emerald-400 hover:text-emerald-300 p-0 ml-1">
                Let us know
                </Button>
            </p>
            </div>
        </div>
        </div>
    </AppLayout>
  )
}
