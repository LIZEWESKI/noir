import { useState } from "react"
import { Copy, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const DemoPayPalCredentials = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [copiedField, setCopiedField] = useState(null)

  const credentials = {
    email: "jerry@noir.com",
    password: "12345678**",
  }

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <div className="space-y-3 p-4 bg-muted/30 rounded-lg border border-muted">
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-500 border-purple-500/20">
          Demo Credentials
        </Badge>
        <p className="text-xs text-muted-foreground">PayPal Sandbox Account</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground mb-1">Email</p>
            <p className="text-sm font-mono break-all">{credentials.email}</p>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => copyToClipboard(credentials.email, "email")}
            className="flex-shrink-0"
          >
            <Copy className={`h-4 w-4 ${copiedField === "email" ? "text-success" : ""}`} />
          </Button>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground mb-1">Password</p>
            <p className="text-sm font-mono">
              {showPassword ? credentials.password : "•".repeat(credentials.password.length)}
            </p>
          </div>
          <div className="flex gap-1 flex-shrink-0">
            <Button size="sm" variant="ghost" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => copyToClipboard(credentials.password, "password")}>
              <Copy className={`h-4 w-4 ${copiedField === "password" ? "text-success" : ""}`} />
            </Button>
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground italic">
        These are sandbox credentials for demo only. Do not try to use them elsewhere. (I trust you big boy)
      </p>
    </div>
  )
}

export default DemoPayPalCredentials
