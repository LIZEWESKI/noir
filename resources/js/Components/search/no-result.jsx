import React from 'react'
import { router } from '@inertiajs/react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronRight} from "lucide-react"


const NoResult = () => {
  return (
    <Card className="mb-8 border-dashed border-border bg-background">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <div className="rounded-full bg-muted p-3 mb-4">
                <Calendar className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No rooms available</h3>
            <p className="text-muted-foreground max-w-md mb-6">
                We couldn't find any rooms matching your search criteria. Try adjusting your dates, reducing the number of
                guests, or checking our availability calendar.
            </p>
            <Button className="mt-4 group" onClick={() => router.visit("/")}>
                Modify Search
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
        </CardContent>
    </Card>
  )
}

export default NoResult