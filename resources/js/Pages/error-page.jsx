import { Button } from "@/components/ui/button"
import Layout from "@/layouts/layout"
import { Home, ArrowLeft, Lock, AlertTriangle, Wrench, FileQuestion } from "lucide-react"
import { Link } from "@inertiajs/react"

const ErrorPage = ({ status = 404 }) => {
  const errorConfig = {
    403: {
      icon: Lock,
      title: "Access Denied",
      code: "403",
      description: "You don't have permission to access this resource.",
    },
    404: {
      icon: FileQuestion,
      title: "Page Not Found",
      code: "404",
      description: "The page you're looking for doesn't exist or has been moved.",
    },
    500: {
      icon: AlertTriangle,
      title: "Server Error",
      code: "500",
      description: "Something went wrong on our end. We're working to fix it.",
    },
    503: {
      icon: Wrench,
      title: "Service Unavailable",
      code: "503",
      description: "We're currently performing maintenance. Please check back soon.",
    },
  }

  const config = errorConfig[status] || errorConfig[404]
  const IconComponent = config.icon

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full text-center space-y-8 animate-in fade-in duration-500">
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/50">
            <IconComponent className="h-10 w-10 text-muted-foreground" strokeWidth={1.5} />
          </div>

          <h1 className="text-9xl font-light tracking-tight text-foreground/90">{config.code}</h1>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-medium text-foreground">{config.title}</h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-md mx-auto">{config.description}</p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-4">
          <Button variant="default" asChild className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </Button>

          <Button variant="outline" onClick={() => window.history.back()} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}

ErrorPage.layout = (page) => <Layout children={page} />
export default ErrorPage
