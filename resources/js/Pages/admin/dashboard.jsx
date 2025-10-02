import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { SectionCards } from '@/components/dashboard/section-card';
import { DataTable } from '@/components/dashboard/data-table';
import { ChartAreaInteractive } from '@/components/dashboard/chart-area-interactive';
const breadcrumbs= [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
];

export default function Dashboard({metrics,reservations,charts_data}) {
    const {auth} = usePage().props;
    console.log(auth)
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto ">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {metrics.map(metric => 
                        (<SectionCards metric={metric} key={metric.name}/>)
                    )}
                </div>
                <DataTable data={reservations}/>
                <ChartAreaInteractive chartData={charts_data} />
            </div>
        </AppLayout>
    );
}
