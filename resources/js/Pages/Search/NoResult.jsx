import React from 'react'
import { router } from '@inertiajs/react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar} from "lucide-react"


const NoResult = () => {
  return (
    <Card className="mb-8 border-dashed border-border bg-background text-primary">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <div className="rounded-full bg-muted p-3 mb-4">
                <Calendar className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2 text-destructive">No rooms available</h3>
            <p className="text-muted-foreground max-w-md mb-6">
                We couldn't find any rooms matching your search criteria. Try adjusting your dates, reducing the number of
                guests, or checking our availability calendar.
            </p>
            <Button variant="link" className="border-muted-foreground text-primary" onClick={() => router.visit("/")}>
                Modify Search
            </Button>
        </CardContent>
    </Card>
  )
}

export default NoResult