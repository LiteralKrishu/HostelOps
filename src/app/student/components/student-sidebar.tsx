/**
 * =============================================================================
 * STUDENT SIDEBAR COMPONENT
 * =============================================================================
 * Navigation sidebar for student portal.
 * Includes quick links, user info, and logout action.
 * =============================================================================
 */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Home,
    AlertCircle,
    Plus,
    Bell,
    Search,
    LogOut,
    User,
    ChevronUp,
    Building2,
} from 'lucide-react';
import { logoutAction } from '@/app/(auth)/actions';

// User profile type
interface UserProfile {
    id: string;
    full_name: string;
    role: string;
    hostel: string;
    block?: string;
    room?: string;
}

// Navigation items
const navItems = [
    {
        title: 'Dashboard',
        url: '/student',
        icon: Home,
    },
    {
        title: 'Report Issue',
        url: '/student/issues/new',
        icon: Plus,
    },
    {
        title: 'My Issues',
        url: '/student/issues',
        icon: AlertCircle,
    },
    {
        title: 'Lost & Found',
        url: '/student/lost-found',
        icon: Search,
    },
    {
        title: 'Announcements',
        url: '/student/announcements',
        icon: Bell,
    },
];

export function StudentSidebar({ user }: { user: UserProfile }) {
    const pathname = usePathname();

    // Get user initials for avatar
    const initials = user.full_name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <Sidebar variant="inset" collapsible="icon">
            {/* Header with Logo */}
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/student">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                                    <Building2 className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">HostelOps</span>
                                    <span className="text-xs text-muted-foreground">Student Portal</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Main Navigation */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.url}
                                        tooltip={item.title}
                                    >
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Room Info */}
                <SidebarGroup>
                    <SidebarGroupLabel>Your Location</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <div className="px-2 py-3 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Building2 className="h-4 w-4" />
                                <span>{user.hostel}</span>
                            </div>
                            {(user.block || user.room) && (
                                <div className="mt-1 text-xs text-muted-foreground/70">
                                    {user.block && `Block ${user.block}`}
                                    {user.block && user.room && ' • '}
                                    {user.room && `Room ${user.room}`}
                                </div>
                            )}
                        </div>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer with User Menu */}
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarFallback className="rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-sm">
                                            {initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">{user.full_name}</span>
                                        <span className="truncate text-xs text-muted-foreground capitalize">
                                            {user.role}
                                        </span>
                                    </div>
                                    <ChevronUp className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                side="bottom"
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuItem asChild>
                                    <Link href="/student/profile">
                                        <User className="mr-2 h-4 w-4" />
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => logoutAction()}
                                    className="text-red-600 focus:text-red-600"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Sign out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
