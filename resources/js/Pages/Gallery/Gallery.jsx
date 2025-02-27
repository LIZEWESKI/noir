import React from 'react'
import { Separator } from "@/components/ui/separator"
import Layout from '@/Layouts/Layout'
import FeaturedRooms from '@/Pages/Gallery/FeaturedRooms'
import Amenities from './Amenities'

const Gallery = ({rooms, amenities}) => {
  console.log(rooms);
  return (
    <section className="w-full min-h-screen bg-background space-y-6">
      <Amenities amenities={amenities}/>
      <Separator className="my-4"/>
      <FeaturedRooms rooms={rooms}/>
    </section>
  )
}
Gallery.layout = page => <Layout children={page}/>

export default Gallery