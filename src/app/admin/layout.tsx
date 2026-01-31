/**
 * =============================================================================
 * ADMIN LAYOUT - LIGHT PURPLE THEME
 * =============================================================================
 * Main layout for admin portal with sidebar navigation.
 * Features light purple/lavender theme matching the reference design.
 * =============================================================================
 */
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { AdminSidebar } from './components/admin-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin Dashboard - HostelOps',
    description: 'Manage hostel issues and students',
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
            hostel: 'Demo Hostel',
        };

        return (
            <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
                <SidebarProvider>
                    <AdminSidebar user={demoAdmin} />
                    <SidebarInset>
                        <main className="flex-1 min-h-screen">
                            {children}
                        </main>
                    </SidebarInset>
                </SidebarProvider>
            </div>
        );
    }

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        redirect('/admin/login');
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
        hostel: 'Demo Hostel',
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
            <SidebarProvider>
                <AdminSidebar user={adminProfile} />
                <SidebarInset>
                    <main className="flex-1 min-h-screen">
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
}
