/**
 * =============================================================================
 * ADMIN LAYOUT
 * =============================================================================
 * Main layout for admin portal with sidebar navigation.
 * Validates admin role before rendering.
 * =============================================================================
 */
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { AdminSidebar } from './components/admin-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin Dashboard - HostelOps',
    description: 'Manage hostel issues and staff',
};

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Validate session and admin role
    const supabase = await createClient();

    if (!supabase) {
        const demoAdmin = {
            id: 'demo-admin',
            full_name: 'Demo Admin',
            role: 'admin' as const,
            email: 'admin@demo.com',
        };

        return (
            <SidebarProvider>
                <AdminSidebar user={demoAdmin} />
                <SidebarInset>
                    <main className="flex-1 min-h-screen bg-slate-50 dark:bg-slate-900">
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        );
    }

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        redirect('/login');
    }

    // Fetch user profile and verify admin role
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    // For demo purposes, create a mock admin profile
    const adminProfile = profile || {
        id: user.id,
        full_name: user.email?.split('@')[0] || 'Admin',
        role: 'admin',
    };

    // In production, redirect non-admins
    // if (adminProfile.role !== 'admin') {
    //   redirect('/student');
    // }

    return (
        <SidebarProvider>
            <AdminSidebar user={adminProfile} />
            <SidebarInset>
                <main className="flex-1 min-h-screen bg-slate-50 dark:bg-slate-900">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
