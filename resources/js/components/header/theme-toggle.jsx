import * as React from "react"
import { Monitor, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAppearance } from "@/hooks/use-appearance"

export function ThemeToggle() {
    const { appearance, updateAppearance } = useAppearance();
  return (
    <div className="inline-flex items-center p-1 gap-1">
      <Button
        variant="ghost"
        size="icon"
        className={cn("h-8 w-8 hover:bg-background hover:text-foreground" , appearance === "system" && "bg-muted text-foreground")}
        onClick={() => updateAppearance("system")}
      >
        <Monitor className="h-4 w-4" />
        <span className="sr-only">System theme</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={cn("h-8 w-8 hover:bg-background hover:text-foreground", appearance === "light" && "bg-muted text-foreground")}
        onClick={() => updateAppearance("light")}
      >
        <Sun className="h-4 w-4" />
        <span className="sr-only">Light theme</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={cn("h-8 w-8 hover:bg-background hover:text-foreground" , appearance === "dark" && "bg-muted text-foreground")}
        onClick={() => updateAppearance("dark")}
      >
        <Moon className="h-4 w-4" />
        <span className="sr-only">Dark theme</span>
      </Button>
    </div>
  )
}

