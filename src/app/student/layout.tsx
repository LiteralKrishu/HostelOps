/**
 * =============================================================================
 * STUDENT LAYOUT - LIGHT PURPLE THEME
 * =============================================================================
 * Main layout for student portal with sidebar navigation.
 * Features light purple/lavender theme matching admin design.
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

    if (!supabase) {
        const demoStudent = {
            id: 'demo-student',
            full_name: 'Demo Student',
            role: 'student' as const,
            hostel: 'Demo Hostel',
            block: 'A',
            room: '101',
            email: 'demo@example.com',
            phone: '+123 456 7890',
        };

        return (
            <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
                <SidebarProvider>
                    <StudentSidebar user={demoStudent} />
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
        hostel: 'Not assigned',
        block: '-',
        room: '-',
        email: user.email,
        phone: '-',
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
            <SidebarProvider>
                <StudentSidebar user={userProfile} />
                <SidebarInset>
                    <main className="flex-1 min-h-screen">
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
}
