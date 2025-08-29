import { useEffect, useState } from "react"
import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"

const breadcrumbs= [
    {
      title: 'Rooms Management',
      href: '/admin/rooms-management',
    },
    {
      title: 'Create Room',
      href: '/admin/rooms-management/create',
    },
];

export default function Create() {


  const handleAddRoom = () => {
    return null
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Create Room"/>
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
          This is a fancy create room page hahaha :D 
        </div>
    </AppLayout>
  )
}
