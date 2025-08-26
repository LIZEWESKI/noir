import { SectionCards } from '@/components/section-card';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { DataTable } from '@/components/data-table';
import { ChartAreaInteractive } from '@/components/chart-area-interactive';
const breadcrumbs= [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
];

export default function Dashboard({metrics,reservations,charts_data}) {
    console.log(metrics)
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
                <div className="px-4 lg:px-6">
                    <ChartAreaInteractive chartData={charts_data} />
                </div>
            </div>
        </AppLayout>
    );
}
