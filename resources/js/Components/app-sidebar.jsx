import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { ScrollText, LayoutGrid, House, Calendar, Users, BadgeDollarSign, Ticket  } from 'lucide-react';
import IconAppLogo from '@/components/icon-app-logo';

const mainNavItems = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
    {
        title: "Rooms",
        href: "/admin/rooms-management",
        icon: House,
        permissionKey: "viewAnyRooms",
    },
    {
        title: "Guests",
        href: "/admin/guests-management",
        icon: Users,
        permissionKey: "viewAnyGuests",
    },
    {
        title: "Reservations",
        href: "/admin/reservations-management",
        icon: Calendar,
        permissionKey: "viewAnyReservations",
    },
    {
        title: "Payments",
        href: "/admin/payments-management",
        icon: BadgeDollarSign,
        permissionKey: "viewAnyPayments",
    },
    {
        title: "Coupons",
        href: "/admin/coupons-management",
        icon: Ticket ,
        permissionKey: "viewAnyCoupons",
    },
];

const footerNavItems = [
    {
        title: 'Audit Log',
        href: '/admin/audit-log',
        icon: ScrollText,
    },
];

export function AppSidebar() {
    const { permissions } = usePage().props.auth;
    const filteredNavItems = mainNavItems.filter(item => {
        if (!item.permissionKey) return true;
        return permissions[item.permissionKey] === true;
    });
    
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu className="flex justify-center items-start">
                    <SidebarMenuItem >
                        <Link href="/admin/dashboard" prefetch> 
                            <IconAppLogo/>
                        </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={filteredNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
