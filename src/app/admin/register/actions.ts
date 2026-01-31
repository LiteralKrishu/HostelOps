/**
 * =============================================================================
 * ADMIN AUTH ACTIONS
 * =============================================================================
 * Server actions for admin/management/staff authentication with MANUAL approval.
 * These roles must be approved via Supabase dashboard before gaining access.
 * =============================================================================
 */
'use server';

import { createClient } from '@/lib/supabase/server';

export interface AdminAuthResult {
    success: boolean;
    error?: string;
    pendingApproval?: boolean;
}

type AdminRole = 'admin' | 'management' | 'staff';

/**
 * Register a new admin/management/staff account (requires manual approval)
 * Profile is created with is_approved = false
 * Super admin must manually approve via Supabase dashboard
 */
export async function registerAdminAction(formData: FormData): Promise<AdminAuthResult> {
    const supabase = await createClient();

    if (!supabase) {
        return {
            success: false,
            error: 'Database not configured.',
        };
    }

    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const hostel = formData.get('hostel') as string;
    const role = formData.get('role') as AdminRole || 'admin';

    if (!fullName || !email || !password || !hostel) {
        return {
            success: false,
            error: 'All fields are required.',
        };
    }

    // Validate role
    if (!['admin', 'management', 'staff'].includes(role)) {
        return {
            success: false,
            error: 'Invalid role selected.',
        };
    }

    // Create user
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
            },
        },
    });

    if (signUpError) {
        if (signUpError.message.includes('already registered')) {
            return {
                success: false,
                error: 'An account with this email already exists.',
            };
        }
        return {
            success: false,
            error: signUpError.message || 'Registration failed.',
        };
    }

    // Create profile with is_approved = false (pending approval)
    if (authData.user) {
        const { error: profileError } = await supabase.from('profiles').insert({
            id: authData.user.id,
            full_name: fullName,
            role: role, // admin, management, or staff
            hostel,
            is_approved: false, // Requires manual approval for all admin roles
        });

        if (profileError) {
            console.error('[Admin Register] Profile creation failed:', profileError.message);
        }
    }

    return {
        success: true,
        pendingApproval: true,
    };
}

/**
 * Admin/Management/Staff login action - checks for manual approval
 */
export async function loginAdminAction(formData: FormData): Promise<AdminAuthResult> {
    const supabase = await createClient();

    if (!supabase) {
        return {
            success: false,
            error: 'Database not configured.',
        };
    }

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        return {
            success: false,
            error: 'Email and password are required.',
        };
    }

    // Attempt login
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return {
            success: false,
            error: 'Invalid email or password.',
        };
    }

    // Verify the user is an admin/management/staff
    if (data.user) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('role, is_approved')
            .eq('id', data.user.id)
            .single();

        if (!profile || !['admin', 'management', 'staff'].includes(profile.role)) {
            // Sign out non-admin users
            await supabase.auth.signOut();
            return {
                success: false,
                error: 'Access denied. This login is for administrators, management, and staff only.',
            };
        }

        // Check if approved
        if (!profile.is_approved) {
            // Sign out unapproved users
            await supabase.auth.signOut();
            return {
                success: false,
                error: 'Your account is pending approval. Please contact the system administrator.',
                pendingApproval: true,
            };
        }
    }

    return { success: true };
}
