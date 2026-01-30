/**
 * =============================================================================
 * DATA FETCHING UTILITIES
 * =============================================================================
 * Server-side data fetching functions for common database queries.
 * Uses Supabase server client with RLS for secure data access.
 * =============================================================================
 */
import { createClient } from '@/lib/supabase/server';
import type {
    Issue,
    IssueWithRelations,
    Profile,
    Announcement,
    LostFoundItem,
    CommentWithProfile,
} from '@/lib/types/database';

// -----------------------------------------------------------------------------
// PROFILE QUERIES
// -----------------------------------------------------------------------------

/**
 * Get the current user's profile
 */
export async function getCurrentUserProfile(): Promise<Profile | null> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    return profile;
}

/**
 * Get a profile by ID
 */
export async function getProfileById(id: string): Promise<Profile | null> {
    const supabase = await createClient();
    const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

    return data;
}

/**
 * Get all staff members
 */
export async function getStaffMembers(): Promise<Profile[]> {
    const supabase = await createClient();
    const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'staff')
        .order('full_name');

    return data || [];
}

// -----------------------------------------------------------------------------
// ISSUE QUERIES
// -----------------------------------------------------------------------------

/**
 * Get issues created by the current user
 */
export async function getUserIssues(): Promise<Issue[]> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    const { data } = await supabase
        .from('issues')
        .select('*')
        .eq('created_by', user.id)
        .order('created_at', { ascending: false });

    return data || [];
}

/**
 * Get all issues (for admin)
 */
export async function getAllIssues(filters?: {
    status?: string;
    priority?: string;
    hostel?: string;
}): Promise<IssueWithRelations[]> {
    const supabase = await createClient();

    let query = supabase
        .from('issues')
        .select(`
      *,
      created_by_profile:profiles!issues_created_by_fkey(*),
      assigned_to_profile:profiles!issues_assigned_to_fkey(*)
    `)
        .order('created_at', { ascending: false });

    if (filters?.status) {
        query = query.eq('status', filters.status);
    }
    if (filters?.priority) {
        query = query.eq('priority', filters.priority);
    }
    if (filters?.hostel) {
        query = query.eq('hostel', filters.hostel);
    }

    const { data } = await query;
    return (data as IssueWithRelations[]) || [];
}

/**
 * Get a single issue by ID with relations
 */
export async function getIssueById(id: string): Promise<IssueWithRelations | null> {
    const supabase = await createClient();

    const { data } = await supabase
        .from('issues')
        .select(`
      *,
      created_by_profile:profiles!issues_created_by_fkey(*),
      assigned_to_profile:profiles!issues_assigned_to_fkey(*)
    `)
        .eq('id', id)
        .single();

    return data as IssueWithRelations | null;
}

/**
 * Get issue comments
 */
export async function getIssueComments(issueId: string): Promise<CommentWithProfile[]> {
    const supabase = await createClient();

    const { data } = await supabase
        .from('comments')
        .select(`
      *,
      user:profiles(*)
    `)
        .eq('issue_id', issueId)
        .order('created_at', { ascending: true });

    return (data as CommentWithProfile[]) || [];
}

/**
 * Get issue stats for dashboard
 */
export async function getIssueStats() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { total: 0, pending: 0, resolved: 0, emergency: 0 };
    }

    // Get user profile to check role
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    // Base query - students see their own, admins see all
    let baseQuery = supabase.from('issues').select('status, priority', { count: 'exact' });

    if (profile?.role === 'student') {
        baseQuery = baseQuery.eq('created_by', user.id);
    }

    const { data: issues } = await baseQuery;

    if (!issues) {
        return { total: 0, pending: 0, resolved: 0, emergency: 0 };
    }

    return {
        total: issues.length,
        pending: issues.filter(i => ['reported', 'assigned', 'in_progress'].includes(i.status)).length,
        resolved: issues.filter(i => ['resolved', 'closed'].includes(i.status)).length,
        emergency: issues.filter(i => i.priority === 'emergency').length,
    };
}

// -----------------------------------------------------------------------------
// ANNOUNCEMENT QUERIES
// -----------------------------------------------------------------------------

/**
 * Get visible announcements for current user
 */
export async function getAnnouncements(limit?: number): Promise<Announcement[]> {
    const supabase = await createClient();

    const profile = await getCurrentUserProfile();

    let query = supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false });

    // Filter by user's hostel if student
    if (profile?.role === 'student') {
        query = query.or(`hostel.is.null,hostel.eq.${profile.hostel}`);
    }

    if (limit) {
        query = query.limit(limit);
    }

    const { data } = await query;
    return data || [];
}

// -----------------------------------------------------------------------------
// LOST & FOUND QUERIES
// -----------------------------------------------------------------------------

/**
 * Get lost and found items
 */
export async function getLostFoundItems(type?: 'lost' | 'found'): Promise<LostFoundItem[]> {
    const supabase = await createClient();

    let query = supabase
        .from('lost_found_items')
        .select('*')
        .order('created_at', { ascending: false });

    if (type) {
        query = query.eq('type', type);
    }

    const { data } = await query;
    return data || [];
}
