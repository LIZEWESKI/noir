import React from 'react'
import { ShoppingCart, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { router } from '@inertiajs/react'

const NoReservations = () => {
  return (
    <div className="py-12 md:py-24">
        <div className="container px-4 md:px-6 max-w-5xl mx-auto">
            <div className="text-center space-y-6 py-12">
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-muted">
                    <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                </div>
                <h1 className="text-3xl font-bold  ">You don't have any reservations.</h1>
                <p className="text-muted-foreground max-w-md mx-auto">
                You haven't added any rooms to your reservations yet. Browse our selection of rooms and find your perfect stay.
                </p>
                <Button className="mt-4 group" onClick={() => router.visit("/rooms")}>
                    Browse Rooms
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </div>
        </div>
    </div>
  )
}

export default NoReservations