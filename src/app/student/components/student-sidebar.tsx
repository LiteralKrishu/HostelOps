/**
 * =============================================================================
 * STUDENT SIDEBAR COMPONENT - LIGHT PURPLE THEME
 * =============================================================================
 * Navigation sidebar for student portal with purple theme.
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
    email?: string;
    phone?: string;
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
        <Sidebar variant="inset" collapsible="icon" className="border-r border-purple-100">
            {/* Header with Logo */}
            <SidebarHeader className="border-b border-purple-100">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/student">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 text-white shadow-lg shadow-purple-200">
                                    <Building2 className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold text-slate-900">HostelOps</span>
                                    <span className="text-xs text-purple-600">Student Portal</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Main Navigation */}
            <SidebarContent className="bg-white/50">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-purple-600">Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.url || pathname.startsWith(item.url + '/')}
                                        tooltip={item.title}
                                        className="text-slate-600 hover:text-purple-700 hover:bg-purple-50 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-700"
                                    >
                                        <Link href={item.url}>
                                            <item.icon className="text-purple-500" />
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
                    <SidebarGroupLabel className="text-purple-600">Your Location</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <div className="px-2 py-3 text-sm">
                            <div className="flex items-center gap-2 text-slate-700">
                                <Building2 className="h-4 w-4 text-purple-500" />
                                <span className="font-medium">{user.hostel}</span>
                            </div>
                            {(user.block || user.room) && (
                                <div className="mt-1 text-xs text-slate-500">
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
            <SidebarFooter className="border-t border-purple-100 bg-white/50">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-purple-50"
                                >
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarFallback className="rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 text-white text-sm">
                                            {initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold text-slate-900">{user.full_name}</span>
                                        <span className="truncate text-xs text-purple-600 capitalize">
                                            {user.role}
                                        </span>
                                    </div>
                                    <ChevronUp className="ml-auto size-4 text-purple-500" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl border-purple-100"
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
