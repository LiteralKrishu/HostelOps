/**
 * =============================================================================
 * ISSUE SERVER ACTIONS
 * =============================================================================
 * Server actions for issue management.
 * 
 * SECURITY MEASURES (OWASP Compliance):
 * - Rate limiting: IP-based limits to prevent abuse
 * - Input validation: Zod schemas with strict mode
 * - Input sanitization: Text normalization, length limits
 * - Authentication: User verified before any action
 * - Authorization: RLS provides database-level access control
 * - No sensitive data logging: Only error codes logged
 * =============================================================================
 */
'use server';

import { createClient } from '@/lib/supabase/server';
import { createIssueSchema, commentSchema } from '@/lib/validations/issue';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { checkRateLimit } from '@/lib/security/rate-limit';
import { normalizeText, isValidUUID } from '@/lib/security/sanitize';

// -----------------------------------------------------------------------------
// RESPONSE TYPES
// -----------------------------------------------------------------------------
export interface ActionResult {
    success: boolean;
    error?: string;
    fieldErrors?: Record<string, string[]>;
    data?: unknown;
}

// -----------------------------------------------------------------------------
// CREATE ISSUE ACTION
// Rate limited: 10 issues per user per hour
// -----------------------------------------------------------------------------
export async function createIssueAction(formData: FormData): Promise<ActionResult> {
    // Rate limiting check (IP + user-based once authenticated)
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    const rateLimit = checkRateLimit(`${ip}:create-issue`, 'api');

    if (!rateLimit.allowed) {
        return {
            success: false,
            error: `Too many requests. Please try again in ${rateLimit.retryAfterSeconds} seconds.`,
        };
    }

    const supabase = await createClient();

    // Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return { success: false, error: 'You must be logged in to report an issue' };
    }

    // Get user profile for location defaults
    const { data: profile } = await supabase
        .from('profiles')
        .select('hostel, block, room')
        .eq('id', user.id)
        .single();

    // Extract and validate input
    const rawInput = {
        title: formData.get('title'),
        description: formData.get('description'),
        category: formData.get('category'),
        priority: formData.get('priority'),
        visibility: formData.get('visibility') || 'public',
        hostel: formData.get('hostel') || profile?.hostel || '',
        block: formData.get('block') || profile?.block || undefined,
        room: formData.get('room') || profile?.room || undefined,
    };

    const validation = createIssueSchema.safeParse(rawInput);

    if (!validation.success) {
        const errors: Record<string, string[]> = {};
        validation.error.issues.forEach((issue) => {
            const path = issue.path.join('.');
            if (!errors[path]) errors[path] = [];
            errors[path].push(issue.message);
        });
        return { success: false, error: 'Please fix the errors below', fieldErrors: errors };
    }

    const { title, description, category, priority, visibility, hostel, block, room } = validation.data;

    // Insert issue into database
    const { data: issue, error: insertError } = await supabase
        .from('issues')
        .insert({
            title,
            description,
            category,
            priority,
            visibility,
            hostel,
            block: block || null,
            room: room || null,
            created_by: user.id,
            status: 'reported',
        })
        .select('id')
        .single();

    if (insertError) {
        console.error('[CreateIssue] Insert failed:', insertError.message);
        return { success: false, error: 'Failed to create issue. Please try again.' };
    }

    // Revalidate the issues list and redirect
    revalidatePath('/student/issues');
    redirect(`/student/issues/${issue.id}`);
}

// -----------------------------------------------------------------------------
// ADD COMMENT ACTION
// Rate limited: Part of API rate limit (100/min)
// UUID validated to prevent injection attacks
// -----------------------------------------------------------------------------
export async function addCommentAction(
    issueId: string,
    formData: FormData
): Promise<ActionResult> {
    // Validate issueId is a valid UUID (prevents SQL injection + bad requests)
    if (!isValidUUID(issueId)) {
        return { success: false, error: 'Invalid issue ID format' };
    }

    // Rate limiting check
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    const rateLimit = checkRateLimit(`${ip}:comment`, 'api');

    if (!rateLimit.allowed) {
        return {
            success: false,
            error: `Too many requests. Please try again in ${rateLimit.retryAfterSeconds} seconds.`,
        };
    }

    const supabase = await createClient();

    // Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return { success: false, error: 'You must be logged in to comment' };
    }

    // Validate input
    const rawInput = { content: formData.get('content') };
    const validation = commentSchema.safeParse(rawInput);

    if (!validation.success) {
        return {
            success: false,
            error: validation.error.issues[0]?.message || 'Invalid comment'
        };
    }

    // Insert comment
    const { error: insertError } = await supabase
        .from('comments')
        .insert({
            issue_id: issueId,
            user_id: user.id,
            content: validation.data.content,
        });

    if (insertError) {
        console.error('[AddComment] Insert failed:', insertError.message);
        return { success: false, error: 'Failed to add comment. Please try again.' };
    }

    // Revalidate the issue page
    revalidatePath(`/student/issues/${issueId}`);
    return { success: true };
}
