import Can from '@/components/can';
import CouponsDataTable from '@/components/coupons-management/coupons-data-table';
import { Button } from '@/components/ui/button';
import IconToolTip from '@/components/ui/icon-tooltip';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { Plus} from "lucide-react"
import CouponsStats from '@/components/coupons-management/coupons-stats';
import RecentRedemptions from '@/components/coupons-management/recent-redemptions';

const breadcrumbs= [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Coupons Management',
        href: '/admin/coupons-management',
    },
];

const handleEditCoupon = (coupon) => {
    router.visit(`/admin/coupons-management/edit/${coupon.id}`)
}

const DELETING_ALERT = {
    title: "Delete Coupon",
    description: "Are you sure you want to delete this coupon? This action cannot be undone.",
    action: (couponId) => {
        router.post(`/admin/coupons-management/destroy/${couponId}`,{id: couponId},{
            preserveState: false,
        })
    }
}

export default function Index({coupons, stats, recent_redemptions: recentRedemptions}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Coupons Management" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto ">
                <div className="flex items-center justify-between">
                    <p className="text-muted-foreground">Manage discount codes and promotional offers</p>
                    <Can permission="createCoupons">
                        <IconToolTip label="Add Coupon" className="rounded-full p-1 flex justify-between items-center">
                        <Button 
                            size="sm"
                            onClick={() => router.visit('/admin/coupons-management/create')}
                        >
                            <Plus className="h-6 w-6" />
                        </Button>
                        </IconToolTip>
                    </Can>
                </div>
                <CouponsStats stats={stats} />
                <RecentRedemptions recentRedemptions={recentRedemptions} />
                <CouponsDataTable 
                    data={coupons} 
                    onEdit={handleEditCoupon} 
                    onDelete={DELETING_ALERT}
                />
            </div>
        </AppLayout>
    );
}
