import React, {useState} from 'react'
import { DateRangePicker } from "./DateRangePicker"
import { GuestSelector } from "./GuestSelector"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useForm } from '@inertiajs/react'
import { addDays, format } from 'date-fns'

const SearchForm = () => {
    const [date, setDate] = useState({
        from: new Date(),
        to: addDays(new Date(), 1),
    })
    const { data, setData, get, processing, errors } = useForm({
        guests: 1,
        check_in: date?.from && format(date?.from, "MM-dd-yyyy") || "",
        check_out: date?.to && format(date?.to, "MM-dd-yyyy") || "",
    })
    const handleDateChange = (newDate) => {
        if (newDate?.from && newDate?.to && newDate.from.getTime() === newDate.to.getTime()) setDate({ ...newDate, to: null }) 
        else setDate(newDate)
        setData({
            ...data,
            check_in: newDate?.from && format(newDate?.from, "MM-dd-yyyy") || "",
            check_out: newDate?.to && format(newDate?.to, "MM-dd-yyyy") || "",
        })
    }
    function handleSearch(e) {
        e.preventDefault()
        get('/search')
    }
  return (
    <form onSubmit={handleSearch} className="w-full max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 backdrop-blur-sm rounded-md shadow-lg">
            <div className="md:col-span-6">
                <DateRangePicker className="w-full" date={date} setDate={handleDateChange} />
                <p className="text-[0.8rem] text-muted dark:text-muted-foreground mt-1 text-start">Check-in: 3pm - Check-out: 11am</p>
                {errors.check_in && <p className="text-sm text-danger text-start font-extrabold">{errors.check_in}</p>}
                {errors.check_out && <p className="text-sm text-danger text-start font-extrabold">{errors.check_out}</p>}
            </div>
            <div className="md:col-span-4">
                <GuestSelector guests={data.guests} setGuests={setData} />
                <p className="text-[0.8rem] text-muted dark:text-muted-foreground mt-1 text-start">Minimum Check-in Age: 18</p>
                {errors.guests && <p className="text-sm text-danger text-start font-extrabold">{errors.guests}</p>}
            </div>
            <div className="md:col-span-2">
                <div>
                    <Button type="submit" className="w-full h-full min-h-[40px] border-[1px] border-success" disabled={processing}>
                        <Search className="h-4 w-4 mr-2" />
                        Search
                    </Button>
                </div>
            </div>
        </div>
    </form>
  )
}

export default SearchForm