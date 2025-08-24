import Layout from "@/layouts/Layout"
import Summary from "@/components/search/summary"
import NoResult from "@/components/search/no-result"
import RoomsResults from "@/components/search/rooms-results"

const Search = ({ rooms }) => {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 bg-background text-primary min-h-screen">
      <Summary/>
      <div className="mb-6">
        <p className="text-muted-foreground text-lg">
          {rooms.length > 0
            ? "Select a room to continue with your booking"
            : "No rooms available for your search criteria"}
        </p>
      </div>
      {rooms.length === 0 ? <NoResult/> : <RoomsResults rooms={rooms} />}
    </div>
  )
}

Search.layout = (page) => <Layout children={page} />
export default Search

