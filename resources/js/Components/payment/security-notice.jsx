import { Shield } from 'lucide-react'
import React from 'react'

const SecurityNotice = () => {
  return (
    <div className="bg-muted/50 rounded-lg p-4 border ">
      <div className="flex items-start gap-3">
        <Shield className="h-5 w-5 text-success mt-0.5" />
        <div>
          <h3 className="font-medium text-sm">Secure Booking</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Your payment information is encrypted and securely processed. We never store your full card details.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SecurityNotice