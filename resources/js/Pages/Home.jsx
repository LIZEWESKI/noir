import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';

const Home = ({ auth }) => {
    return (
        <>
            <Head title="Home" />
            <h1 >TEST</h1>
        </>
    );
}
Home.layout = (page) => <GuestLayout children={page} />;
export default Home;
