import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';
import { ScrollText, LayoutGrid, House, Calendar, Users, BadgeDollarSign } from 'lucide-react';
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
    },
    {
        title: "Guests",
        href: "/admin/guests-management",
        icon: Users,
    },
    {
        title: "Reservations",
        href: "/admin/reservations-management",
        icon: Calendar,
    },
    {
        title: "Payments",
        href: "/admin/payments-management",
        icon: BadgeDollarSign,
    },
];

const footerNavItems = [
    {
        title: 'Change Log',
        href: '/admin/change-log',
        icon: ScrollText,
    },
];

export function AppSidebar() {
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
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
