import { Github } from "lucide-react"
import { Link } from "@inertiajs/react"
import AppLogo from "@/components/app-logo"

export function Footer() {
  const navigation = {
    main: [
      { name: "Rooms", href: "/rooms" },
      { name: "Reservations", href: "/reservations" },
      { name: "Gallery", href: "/gallery" },
    ],
    legal: [
      { name: "Legal Information", href: "/legal" },
      { name: "Terms of Service", href: "/terms-of-service" },
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
  }

  return (
    <footer className="max-w-full border-t bg-background md:px-20 py-4 px-4">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center space-x-2 hover:opacity-90">
            <AppLogo />
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            &copy; {new Date().getFullYear()} Noir Inc. All rights reserved.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-foreground mb-4">Navigate</h3>
          <ul className="space-y-3">
            {navigation.main.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium text-foreground mb-4">Legal</h3>
          <ul className="space-y-3">
            {navigation.legal.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium text-foreground mb-4">Connect</h3>
          <div className="flex gap-3">
            <a
              href="https://github.com/lizeweski"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
