/**
 * =============================================================================
 * STUDENT LAYOUT - DARK GRADIENT THEME
 * =============================================================================
 * Main layout for student portal with sidebar navigation.
 * Features dark gradient background matching landing page.
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
        };

        return (
            <div className="min-h-screen bg-slate-950 relative">
                {/* Background Gradient */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-0 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-violet-600/20 to-fuchsia-600/10 rounded-full blur-[120px]" />
                    <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/15 to-blue-600/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-1/3 w-[700px] h-[400px] bg-gradient-to-br from-emerald-500/10 to-teal-600/5 rounded-full blur-[120px]" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]" />
                </div>

                <SidebarProvider>
                    <StudentSidebar user={demoStudent} />
                    <SidebarInset>
                        <main className="flex-1 min-h-screen relative z-10">
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
        hostel: 'Demo Hostel',
        block: 'A',
        room: '101',
    };

    return (
        <div className="min-h-screen bg-slate-950 relative">
            {/* Background Gradient */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-violet-600/20 to-fuchsia-600/10 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/15 to-blue-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-1/3 w-[700px] h-[400px] bg-gradient-to-br from-emerald-500/10 to-teal-600/5 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            <SidebarProvider>
                <StudentSidebar user={userProfile} />
                <SidebarInset>
                    <main className="flex-1 min-h-screen relative z-10">
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
}
