import React from 'react'
import { Separator } from "@/components/ui/separator"
import Layout from '@/Layouts/Layout'
import FeaturedRooms from '@/Pages/Gallery/FeaturedRooms'
import Amenities from './Amenities'

const Index = ({rooms, amenities}) => {
  return (
    <section className="w-full min-h-screen bg-background space-y-6">
      <Amenities amenities={amenities}/>
      <Separator className="my-4"/>
      <FeaturedRooms rooms={rooms}/>
    </section>
  )
}
Index.layout = page => <Layout children={page}/>
export default Index