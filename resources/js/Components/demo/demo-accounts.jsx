import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "react-responsive"
import { useCapitalize } from "@/hooks/use-capitalize"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { router, usePage } from "@inertiajs/react"
import { toast } from "sonner"

const descriptions = [
  {
    role: "user",
    description: "Regular hotel guest with booking access",
  },
  {
    role: "admin",
    description: "Full system access and control",
  },
  {
    role: "manager",
    description: "Oversees operations and staff",
  },
  {
    role: "receptionist",
    description: "Handles check-ins and reservations",
  },
  {
    role: "accountant",
    description: "Manages finances and payments",
  },
  {
    role: "housekeeping",
    description: "Maintains room cleanliness",
  },
]

export function DemoAccounts({ demoAccounts }) {
  
  const isMobile = useMediaQuery({query:'(max-width: 1034px)'});
  const getCapitalize = useCapitalize()
  const getInitials = useInitials();
  const [isOpen, setIsOpen] = useState(false)
  const getDescription = (role) => descriptions.find(d => d.role === role)

  const handleSelectAccount = (account) => {
    router.post('login/demo',{id: account.id},{
      onSuccess: () => setIsOpen(false),
      onError: (errors) => {
        if (errors.id) {
          toast.error(errors.id, {
            descriptionClassName: "text-white/90", 
            duration: 5000,
            position: "top-center",
            style: {
              backgroundColor: "hsl(var(--destructive))",
              color: "#fff",
            },
          })
        }
      }
    })
  }

  return (
    <div className={`w-[300px] max-w-sm absolute top-14 right-[-44px] ${isMobile && "hidden"}`}>
      <div className="relative">
        <div className="flex justify-center mb-3">
          <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/30">
            Demo Accounts
          </Badge>
        </div>

        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          className="w-full justify-between rounded-full h-12 px-6 bg-card/50 backdrop-blur-sm hover:bg-accent/50"
        >
          <span className="text-sm font-medium">Quick Login</span>
          <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")} />
        </Button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-card border rounded-lg shadow-lg overflow-hidden z-50 backdrop-blur-sm">
            <div className="max-h-[400px] overflow-y-auto">
              {demoAccounts.map((account, index) => (
                <button
                  key={account.id}
                  onClick={() => handleSelectAccount(account)}
                  className={cn(
                    "w-full text-left p-4 hover:bg-accent/50 transition-colors flex items-center gap-3",
                    index !== demoAccounts.length - 1 && "border-b",
                  )}
                >
                  <Avatar className="h-10 w-10 overflow-hidden rounded-full">
                    <AvatarImage src={account.profile_picture_url} alt={account.name} />
                    <AvatarFallback >
                      {getInitials(account.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-medium text-sm text-foreground truncate">{getCapitalize(account.name)}</p>
                      <Badge variant="secondary" className="text-xs shrink-0">
                        {getCapitalize(account.role)}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{getDescription(account.role)?.description || "Imagine this is a role short description" }</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
      </div>
    </div>
  )
}
