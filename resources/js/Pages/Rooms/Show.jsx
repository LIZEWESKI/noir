import React, {useEffect} from "react"
import Layout from "@/Layouts/Layout"
import RelatedRoomsCarousel from "./RelatedRoomsCarousel"
import RoomDetails from "./RoomDetails"
import RoomForm from "./RoomForm"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { usePage } from "@inertiajs/react"
const Show = ({room, related_rooms,unavailable_dates}) => {
  const {errors} = usePage().props;
  useEffect(() => {
    errors.date && toast.error(errors.date, {
      descriptionClassName: "text-white/90", 
      duration: 5000,
      position: "top-center",
      style: {
        backgroundColor: "var(--danger)",
        color: "#fff",
      }
    })
  }, [errors]);
  return (
    <div className=" py-3">
      <div className="mb-12">
        <div className="aspect-[16/9] overflow-hidden rounded-lg max-w-4xl mx-auto">
          <img
            src={room.image_path_url}
            alt={room.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <RoomDetails room={room} />
        <RoomForm room={room} unavailableDates={unavailable_dates}/>
      </div>
      <RelatedRoomsCarousel relatedRooms={related_rooms}/>
      <Toaster/>
    </div>
  )
}
Show.layout = (page) => <Layout children={page} />;
export default Show;

