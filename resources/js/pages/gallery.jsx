import React from 'react'
import { Separator } from "@/components/ui/separator"
import Layout from '@/layouts/layout'
import FeaturedRooms from '@/components/gallery/featured-rooms'
import Amenities from '@/components/gallery/amenities'
import { Head } from '@inertiajs/react'

const Gallery = ({rooms, amenities}) => {
  return (
    <>
      <Head title="Gallery"/>
      <section className="w-full min-h-screen bg-background space-y-6">
        <Amenities amenities={amenities}/>
        <Separator className="my-4"/>
        <FeaturedRooms rooms={rooms}/>
      </section>
    </>
  )
}
Gallery.layout = page => <Layout children={page}/>
export default Gallery