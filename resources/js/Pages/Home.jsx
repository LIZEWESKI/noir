import Layout from '@/Layouts/Layout';
import { Head, Link } from '@inertiajs/react';

const Home = ({ auth }) => {
    return (
        <>
            <Head title="Home" />
            <h1 >TEST</h1>
        </>
    );
}
Home.layout = (page) => <Layout children={page} />;
export default Home;
