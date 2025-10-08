import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Ticket } from 'lucide-react'

const RecentRedemptions = ({recentRedemptions}) => {
  return (
    <Card>
        <CardHeader>
        <CardTitle>Recent Redemptions</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="space-y-4">
            {recentRedemptions.map((redemption) => (
            <div key={redemption.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Ticket className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <p className="font-medium">{redemption.code}</p>
                    <p className="text-sm text-muted-foreground">{redemption.user}</p>
                </div>
                </div>
                <div className="text-right">
                <p className="font-medium text-emerald-500">-${redemption.amount}</p>
                <p className="text-sm text-muted-foreground">{redemption.date}</p>
                </div>
            </div>
            ))}
        </div>
        </CardContent>
    </Card>
  )
}

export default RecentRedemptions