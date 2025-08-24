import Layout from "@/layouts/Layout"
import { SimplePagination } from "@/components/pagination/simple-pagination"
import RoomCard from "@/components/rooms/room-card"
import { Head } from "@inertiajs/react";
const Index = ({rooms}) => {
  const data = rooms.data;
  return (
    <>
      <Head title="Rooms"/>
      <section className="py-2 md:py-6">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-8 md:mb-12">
          <p className="text-sm tracking-widest text-muted-foreground uppercase">START YOUR COMFORTABLE STAY</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight max-w-3xl mx-auto font-roboto">
            Explore our refined accommodation options and find the perfect space for your stay.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The resort offers a total of 139 suites and villas and a wide range of facilities, services and activities to
            its guests. In an effort to provide a peaceful and tranquil environment.
          </p>
        </div>

        {/* Room Listings */}
        <div className="space-y-12">
          {data.map((room, index) => (
            <RoomCard room={room} index={index} key={room.id}/>
          ))}
        </div>
        <SimplePagination currentPage={rooms.current_page} totalPages={rooms.last_page} nextPage={rooms.next_page_url} prevPage={rooms.prev_page_url} />
      </section>
    </>
  )
}
Index.layout = page => <Layout children={page} />;
export default Index;

