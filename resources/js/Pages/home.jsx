import Layout from '@/layouts/Layout';
import { Head } from '@inertiajs/react';
import HeroSection from '@/components/home/hero-section';
import AccommodationsSection from '@/components/home/accomodations-section';
import React from 'react';
import WhyChooseSection from '@/components/home/why-choose-section';
import TestimonialsSection from '@/components/home/testimonials-sections';
import ContactBarSection from '@/components/home/contact-section';
const Home = ({ auth, rooms, bg_hero}) => {
    return (
        <>
            <Head title="Home"/>
            <HeroSection backGroundImage={bg_hero} />
            <AccommodationsSection rooms={rooms}/>
            <WhyChooseSection/>
            <TestimonialsSection/>
            <ContactBarSection/>
        </>
    );
}
Home.layout = (page) => <Layout children={page} />;
export default Home;
