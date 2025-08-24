import {  MapPin, Phone, Mail, Github } from "lucide-react"

export default function ContactBarSection() {
  return (
    <div className="w-full bg-background text-primary py-6">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Address */}
          <div className="space-y-2">
            <div className="flex items-start gap-4 mb-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-sm tracking-widest text-muted-foreground uppercase">Address</h3>
            </div>
              <p className="text-sm">73120 Courchevel 1850, France</p>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <div className="flex items-center gap-4 mb-2">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-sm tracking-widest text-muted-foreground uppercase">Phone</h3>
            </div>
            <a href="tel:+41223456788" className="text-sm hover:text-primary transition-colors">
              +41 22 345 67 88
            </a>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <div className="flex items-center gap-4 mb-2">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-sm tracking-widest text-muted-foreground uppercase">Email</h3>
            </div>
            <a href="mailto:reservation@noir.com" className="text-sm hover:text-primary transition-colors">
              reservation@noir.com
            </a>
          </div>

          {/* Social */}
          <div className="space-y-2">
            <h3 className="text-sm tracking-widest text-muted-foreground uppercase">Social</h3>
            <div className="flex items-center gap-4">
              <a href="https://github.com/lizeweski" target="blank" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

