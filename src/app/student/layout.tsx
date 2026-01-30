/**
 * =============================================================================
 * STUDENT LAYOUT
 * =============================================================================
 * Main layout for student portal with sidebar navigation.
 * Includes session validation and user data fetching.
 * =============================================================================
 */
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { StudentSidebar } from './components/student-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Student Dashboard - HostelOps',
    description: 'Report and track hostel issues',
};

export default async function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Validate session
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        redirect('/login');
    }

    // Fetch user profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    // For demo purposes, create a mock profile if not exists
    const userProfile = profile || {
        id: user.id,
        full_name: user.email?.split('@')[0] || 'Student',
        role: 'student',
        hostel: 'Demo Hostel',
        block: 'A',
        room: '101',
    };

    return (
        <SidebarProvider>
            <StudentSidebar user={userProfile} />
            <SidebarInset>
                <main className="flex-1 min-h-screen bg-slate-50 dark:bg-slate-900">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
