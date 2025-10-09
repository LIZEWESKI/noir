import React from 'react'
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calendar } from 'lucide-react'
import { format } from "date-fns"

const DatePicker = ({
    label,
    selectedDate,
    setSelectedDate,
    isDateUnavailable,
    otherDate,
    compareType, // for Check In comparison operator
    isDateInvalid = () => false, // for Check out validation date
    error,
    description,
}) => {
  return (
    <div className="space-y-3">
        <Label className="text-sm font-medium text-muted-foreground">{label}</Label>
        <Popover>
            <PopoverTrigger asChild>
            <Button
                variant="outline"
                className={`w-full justify-start h-12 bg-background hover:bg-background ${error && "border-destructive"}`}
            >
                <Calendar className="mr-3 h-4 w-4" />
                <div className="text-left">
                <div className="font-medium">
                    {selectedDate ? format(selectedDate, "MMM dd, yyyy") : "Select date"}
                </div>
                {selectedDate && (
                    <div className="text-xs text-muted-foreground">{format(selectedDate, "EEEE")}</div>
                )}
                </div>
            </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => {
                    let compareInvalidOne = false;
                    let compareInvalidTwo = false;
                    // needs to be <= for check_out and < for check_in 
                    compareInvalidOne = compareType === "max" ? date < new Date() : date <= new Date()
                    // needs to be <= for check_out and >= for check_in 
                    if (otherDate) compareInvalidTwo = compareType === "max" ? date >= otherDate : date <= otherDate
                    return (
                        // fixed it but still not sure yet
                        compareInvalidOne ||
                        (otherDate && compareInvalidTwo) ||
                        isDateInvalid?.(date) ||
                        isDateUnavailable?.(date)
                    )
                }}
                modifiers={isDateUnavailable && { unavailable: (date) => isDateUnavailable(date) }}
                modifiersClassNames={{
                unavailable:
                    "bg-[rgba(239,68,68,0.2)] text-red-800 line-through cursor-not-allowed hover:bg-[rgba(239,68,68,0.3)]",
                }}
                initialFocus
            />
            </PopoverContent>
        </Popover>
        {error ? <p className="text-xs text-destructive">{error}</p> : 
        description && <p className="text-xs text-muted-foreground">{description}</p>}
    </div>
  )
}

export default DatePicker