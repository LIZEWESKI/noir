import Layout from '@/layouts/layout';
import { Head, usePage } from '@inertiajs/react';
import HeroSection from '@/components/home/hero-section';
import AccommodationsSection from '@/components/home/accomodations-section';
import React, { useEffect } from 'react';
import WhyChooseSection from '@/components/home/why-choose-section';
import TestimonialsSection from '@/components/home/testimonials-sections';
import ContactBarSection from '@/components/home/contact-section';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
const Home = ({ auth, rooms, bg_hero}) => {
    const { flash } = usePage().props;
      useEffect(() => {
        flash.error && toast.error(flash.error, {
          descriptionClassName: "text-white/90", 
          duration: 3000,
          position: "top-center",
          style: {
            backgroundColor: "var(--danger)",
            color: "#fff",
          }
        })
      }, [flash]);
    return (
        <>
            <Head title="Home"/>
            <HeroSection backGroundImage={bg_hero} />
            <AccommodationsSection rooms={rooms}/>
            <WhyChooseSection/>
            <TestimonialsSection/>
            <ContactBarSection/>
            <Toaster />
        </>
    );
}
Home.layout = (page) => <Layout children={page} />;
export default Home;
