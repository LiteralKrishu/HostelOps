/**
 * =============================================================================
 * STUDENT SIDEBAR COMPONENT - DARK THEME
 * =============================================================================
 * Navigation sidebar for student portal with violet/fuchsia theme.
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
        <Sidebar variant="inset" collapsible="icon" className="border-r-0">
            {/* Header with Logo */}
            <SidebarHeader className="border-b border-white/5">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/student">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white shadow-lg shadow-violet-500/30">
                                    <Building2 className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold text-white">HostelOps</span>
                                    <span className="text-xs text-slate-400">Student Portal</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Main Navigation */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-slate-500">Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.url}
                                        tooltip={item.title}
                                        className="text-slate-300 hover:text-white hover:bg-white/5 data-[active=true]:bg-violet-500/20 data-[active=true]:text-violet-300"
                                    >
                                        <Link href={item.url}>
                                            <item.icon className="text-slate-400" />
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
                    <SidebarGroupLabel className="text-slate-500">Your Location</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <div className="px-2 py-3 text-sm">
                            <div className="flex items-center gap-2 text-slate-300">
                                <Building2 className="h-4 w-4 text-violet-400" />
                                <span>{user.hostel}</span>
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
            <SidebarFooter className="border-t border-white/5">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="text-slate-300 hover:text-white hover:bg-white/5 data-[state=open]:bg-white/5"
                                >
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarFallback className="rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white text-sm">
                                            {initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold text-white">{user.full_name}</span>
                                        <span className="truncate text-xs text-slate-400 capitalize">
                                            {user.role}
                                        </span>
                                    </div>
                                    <ChevronUp className="ml-auto size-4 text-slate-400" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl bg-slate-900 border-white/10"
                                side="bottom"
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuItem asChild className="text-slate-300 hover:text-white focus:text-white focus:bg-white/5">
                                    <Link href="/student/profile">
                                        <User className="mr-2 h-4 w-4" />
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-white/10" />
                                <DropdownMenuItem
                                    onClick={() => logoutAction()}
                                    className="text-red-400 focus:text-red-400 focus:bg-red-500/10"
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
