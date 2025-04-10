import React, { useEffect } from "react"
import { Head, usePage } from "@inertiajs/react"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import Layout from "@/Layouts/Layout"
import NoReservations from "./NoReservations"
import Reservations from "./Reservations"


const Index = ({reservations}) => {
  const { flash } = usePage().props;
  useEffect(() => {
    flash.success && toast.success(flash.success, {
      descriptionClassName: "text-white/90", 
      duration: 3000,
      position: "top-center",
      style: {
        backgroundColor: "var(--success)",
        color: "#fff",
      }
    })
  }, [flash]);
  return (
    <>
      <Head title="Reservation"/>
      {reservations.length === 0 ? 
      <NoReservations /> : 
      <Reservations reservations={reservations} />}
      <Toaster />
    </>
  )
}
Index.layout = (page) => <Layout children={page}/>;
export default Index