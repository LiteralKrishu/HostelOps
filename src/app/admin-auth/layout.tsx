/**
 * =============================================================================
 * ADMIN AUTH LAYOUT
 * =============================================================================
 * Layout for admin authentication pages.
 * Redirects already-logged-in users to appropriate portal.
 * =============================================================================
 */
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminAuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    // If supabase is not configured, just render children
    if (!supabase) {
        return <>{children}</>;
    }

    // Check if user is already logged in
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        // Get user profile to check role
        const { data: profile } = await supabase
            .from('profiles')
            .select('role, is_approved')
            .eq('id', user.id)
            .single();

        if (profile) {
            // If admin/management/staff and approved, redirect to admin portal
            if (['admin', 'management', 'staff'].includes(profile.role) && profile.is_approved) {
                redirect('/admin');
            }

            // If student, they shouldn't be here - redirect to student portal
            if (profile.role === 'student') {
                redirect('/student');
            }
        }
    }

    // Not logged in or not approved - show auth pages
    return <>{children}</>;
}
