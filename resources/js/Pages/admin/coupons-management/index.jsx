import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';


const breadcrumbs= [
    {
        title: 'Coupons Management',
        href: '/admin/coupons-management',
    },
];

export default function index() {
    const {auth} = usePage().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Coupons Management" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto ">
                Nothing to see here.
            </div>
        </AppLayout>
    );
}
