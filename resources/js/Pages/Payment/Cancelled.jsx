import Layout from '@/Layouts/Layout'
import React from 'react'

import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { usePage } from "@inertiajs/react"
const Cancelled = () => {
    const {flash} = usePage().props;
    useEffect(() => {
      flash.success && toast.success(flash.success, {
        descriptionClassName: "text-white/90", 
        duration: 9000,
        position: "top-center",
        style: {
          backgroundColor: "var(--danger)",
          color: "#fff",
        }
      })
    }, [flash]);
  return (
    <div>
        <p>This is canceled Page!</p>
        <Toaster />
    </div>
  )
}
Cancelled.layout = (page) => <Layout children={page} />
export default Cancelled