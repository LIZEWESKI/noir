import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';
import { ScrollText, LayoutGrid,House,Calendar,Users, BadgeDollarSign } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
    {
        title: "Rooms Management",
        href: "/admin/rooms-management",
        icon: House,
    },
    {
        title: "Reservations",
        href: "/admin/reservations",
        icon: Calendar,
    },
    {
        title: "Guests",
        href: "/admin/guests",
        icon: Users,
    },
    {
        title: "Payments",
        href: "/admin/payments",
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
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin/dashboard" prefetch>
                            <div className="flex aspect-square size-8 items-center justify-center rounded-md">
                                <AppLogo />
                            </div>
                            </Link>
                        </SidebarMenuButton>
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
