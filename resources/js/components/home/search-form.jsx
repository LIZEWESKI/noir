import { useState } from "react"
import { DateRangePicker } from "./date-range-picker"
import { GuestSelector } from "./guest-selector"
import { Button } from "@/components/ui/button"
import { useForm } from "@inertiajs/react"
import { addDays } from "date-fns"

const SearchForm = () => {
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 1),
  })
  const { data, setData, get, processing, errors } = useForm({
    guests: 1,
    check_in: date?.from || "",
    check_out: date?.to || "",
  })
  const handleDateChange = (newDate) => {
    if (newDate?.from && newDate?.to && newDate.from.getTime() === newDate.to.getTime())
      setDate({ ...newDate, to: null })
    else setDate(newDate)
    setData({
      ...data,
      check_in: newDate?.from?.toISOString().split("T")[0] || "",
      check_out: newDate?.to?.toISOString().split("T")[0] || "",
    })
  }
  function handleSearch(e) {
    e.preventDefault()
    get("/search")
  }
  return (
    <form onSubmit={handleSearch} className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-card/50 backdrop-blur-sm rounded-2xl shadow-lg border">
        <div className="md:col-span-6">
          <DateRangePicker className="w-full" date={date} setDate={handleDateChange} />
          <p className="text-[0.8rem] text-muted-foreground mt-1 text-start">Check-in: 3pm - Check-out: 11am</p>
          {errors.check_in && <p className="text-sm text-destructive text-start font-extrabold">{errors.check_in}</p>}
          {errors.check_out && <p className="text-sm text-destructive text-start font-extrabold">{errors.check_out}</p>}
        </div>
        <div className="md:col-span-4">
          <GuestSelector guests={data.guests} setGuests={setData} />
          <p className="text-[0.8rem] text-muted-foreground mt-1 text-start">Minimum Check-in Age: 18</p>
          {errors.guests && <p className="text-sm text-destructive text-start font-extrabold">{errors.guests}</p>}
        </div>
        <div className="md:col-span-2">
          <div>
            <Button
              type="submit"
              className="w-full h-full min-h-[40px] bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              disabled={processing}
            >
              Search 
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default SearchForm
