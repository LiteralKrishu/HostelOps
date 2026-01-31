/**
 * =============================================================================
 * UPDATE PROFILE ACTION
 * =============================================================================
 * Server action to update student profile (hostel, block, room, phone).
 * =============================================================================
 */
'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const updateProfileSchema = z.object({
    fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
    hostel: z.string().min(1, 'Hostel is required').max(50),
    block: z.string().max(20).optional(),
    room: z.string().max(20).optional(),
    phone: z.string().max(20).optional(),
});

export interface UpdateProfileResult {
    success: boolean;
    error?: string;
    fieldErrors?: Record<string, string[]>;
}

export async function updateProfileAction(formData: FormData): Promise<UpdateProfileResult> {
    const supabase = await createClient();

    if (!supabase) {
        return {
            success: false,
            error: 'Database not configured.',
        };
    }

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        redirect('/login');
    }

    // Validate input
    const rawInput = {
        fullName: formData.get('fullName') as string,
        hostel: formData.get('hostel') as string,
        block: formData.get('block') as string || undefined,
        room: formData.get('room') as string || undefined,
        phone: formData.get('phone') as string || undefined,
    };

    const result = updateProfileSchema.safeParse(rawInput);

    if (!result.success) {
        const errors: Record<string, string[]> = {};
        result.error.issues.forEach((issue) => {
            const path = issue.path.join('.');
            if (!errors[path]) errors[path] = [];
            errors[path].push(issue.message);
        });
        return { success: false, error: 'Please fix the errors below', fieldErrors: errors };
    }

    const { fullName, hostel, block, room, phone } = result.data;

    // Update profile
    const { error: updateError } = await supabase
        .from('profiles')
        .update({
            full_name: fullName,
            hostel,
            block: block || null,
            room: room || null,
            phone: phone || null,
        })
        .eq('id', user.id);

    if (updateError) {
        console.error('[UpdateProfile] Error:', updateError.message);
        return {
            success: false,
            error: 'Failed to update profile. Please try again.',
        };
    }

    // Redirect back to profile
    redirect('/student/profile');
}
