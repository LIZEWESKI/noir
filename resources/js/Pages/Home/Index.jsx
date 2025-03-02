import Layout from '@/Layouts/Layout';
import { Head } from '@inertiajs/react';
import HeroSection from './HeroSection';
import AccommodationsSection from './AccommodationsSection';
import React from 'react';
import WhyChooseSection from './WhyChooseSection';
import TestimonialsSection from './TestimonialsSection';
import ContactBarSection from './ContactBarSection';
const Index = ({ auth, rooms}) => {
    return (
        <>
            <Head title="Home" />
            <HeroSection />
            <AccommodationsSection rooms={rooms}/>
            <WhyChooseSection/>
            <TestimonialsSection/>
            <ContactBarSection/>
        </>
    );
}
Index.layout = (page) => <Layout children={page} />;
export default Index;
