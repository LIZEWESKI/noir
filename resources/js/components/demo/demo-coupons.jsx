import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Ticket, ChevronDown, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function DemoCoupons({ onSelectCoupon, coupons}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const handleCouponClick = (coupon) => {
    onSelectCoupon(coupon.code)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center gap-2 mb-2">
        <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-500 border-purple-500/20 ">
          Demo Coupons
        </Badge>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 bg-purple-500/10 rounded-full text-purple-500 border-purple-500/20 " />
            </TooltipTrigger>
            <TooltipContent >
              <div className="space-y-2 w-60">
                <p className="text-sm font-medium">
                  Demo coupon codes below are randomized. If you happen to get all invalid ones, take it as a sign to stop gambling.
                </p>
                <code className="text-xs font-medium">(Tip: refresh the page)</code>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between"
      >
        <span className="flex items-center gap-2">
          <Ticket className="h-4 w-4" />
          Try Demo Coupons
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {isOpen && (
        <div className="mt-2 bg-background border rounded-lg shadow-lg max-h-[300px] overflow-y-auto">
          {coupons.map((coupon) => (
            <button
              key={coupon.code}
              type="button"
              onClick={() => handleCouponClick(coupon)}
              className="w-full p-1 hover:bg-accent transition-colors text-left border-b last:border-b-0 flex items-start gap-3"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Ticket className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono font-semibold text-sm">{coupon.code}</span>
                  <Badge variant="ghost" className="text-xs">
                    {coupon.type === "percentage" ? `${coupon.value}%` : `$${coupon.value}`}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{coupon.status}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
