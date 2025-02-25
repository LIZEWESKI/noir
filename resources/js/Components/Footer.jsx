import { Twitter, Facebook, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container p-4 px-4 md:px-20">
        {/* Main Footer Content */}
        <div className="flex justify-between items-center p-2">
          <div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Noir.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
                <Button variant="ghost" className="justify-start space-x-2" asChild>
                    <a href="https://github.com/lizeweski" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    </a>
                </Button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}

