/**
 * =============================================================================
 * DATABASE TYPES
 * =============================================================================
 * TypeScript types matching the Supabase PostgreSQL schema.
 * These types provide full type-safety for database operations.
 * =============================================================================
 */

// -----------------------------------------------------------------------------
// ENUMS (matching PostgreSQL check constraints)
// -----------------------------------------------------------------------------
export type UserRole = 'student' | 'management' | 'staff';
export type IssuePriority = 'low' | 'medium' | 'high' | 'emergency';
export type IssueStatus = 'reported' | 'assigned' | 'in_progress' | 'resolved' | 'closed';
export type IssueVisibility = 'public' | 'private';
export type MediaType = 'image' | 'video';
export type LostFoundType = 'lost' | 'found';
export type LostFoundStatus = 'open' | 'claimed' | 'closed';

// -----------------------------------------------------------------------------
// PROFILES TABLE
// -----------------------------------------------------------------------------
export interface Profile {
    id: string;
    full_name: string;
    role: UserRole;
    hostel: string;
    block: string | null;
    room: string | null;
    created_at: string;
}

export interface ProfileInsert {
    id: string;
    full_name: string;
    role: UserRole;
    hostel: string;
    block?: string | null;
    room?: string | null;
}

export interface ProfileUpdate {
    full_name?: string;
    hostel?: string;
    block?: string | null;
    room?: string | null;
}

// -----------------------------------------------------------------------------
// ISSUES TABLE
// -----------------------------------------------------------------------------
export interface Issue {
    id: string;
    title: string;
    description: string;
    category: string;
    priority: IssuePriority;
    status: IssueStatus;
    visibility: IssueVisibility;
    hostel: string;
    block: string | null;
    room: string | null;
    created_by: string | null;
    assigned_to: string | null;
    merged_into: string | null;
    created_at: string;
    updated_at: string;
}

// Issue with related data (for queries with joins)
export interface IssueWithRelations extends Issue {
    created_by_profile?: Profile | null;
    assigned_to_profile?: Profile | null;
}

export interface IssueInsert {
    title: string;
    description: string;
    category: string;
    priority: IssuePriority;
    visibility?: IssueVisibility;
    hostel: string;
    block?: string | null;
    room?: string | null;
    created_by: string;
}

export interface IssueUpdate {
    title?: string;
    description?: string;
    category?: string;
    priority?: IssuePriority;
    status?: IssueStatus;
    visibility?: IssueVisibility;
    assigned_to?: string | null;
    merged_into?: string | null;
}

// -----------------------------------------------------------------------------
// ISSUE MEDIA TABLE
// -----------------------------------------------------------------------------
export interface IssueMedia {
    id: string;
    issue_id: string | null;
    media_url: string;
    media_type: MediaType | null;
    created_at: string;
}

export interface IssueMediaInsert {
    issue_id: string;
    media_url: string;
    media_type?: MediaType;
}

// -----------------------------------------------------------------------------
// COMMENTS TABLE
// -----------------------------------------------------------------------------
export interface Comment {
    id: string;
    issue_id: string | null;
    user_id: string | null;
    content: string;
    created_at: string;
}

export interface CommentWithProfile extends Comment {
    user?: Profile | null;
}

export interface CommentInsert {
    issue_id: string;
    user_id: string;
    content: string;
}

// -----------------------------------------------------------------------------
// ANNOUNCEMENTS TABLE
// -----------------------------------------------------------------------------
export interface Announcement {
    id: string;
    title: string;
    content: string;
    hostel: string | null;
    block: string | null;
    target_role: string | null;
    created_by: string | null;
    created_at: string;
}

export interface AnnouncementWithProfile extends Announcement {
    created_by_profile?: Profile | null;
}

export interface AnnouncementInsert {
    title: string;
    content: string;
    hostel?: string | null;
    block?: string | null;
    target_role?: string | null;
    created_by: string;
}

export interface AnnouncementUpdate {
    title?: string;
    content?: string;
    hostel?: string | null;
    block?: string | null;
    target_role?: string | null;
}

// -----------------------------------------------------------------------------
// LOST & FOUND TABLE
// -----------------------------------------------------------------------------
export interface LostFoundItem {
    id: string;
    type: LostFoundType;
    description: string;
    image_url: string | null;
    location: string | null;
    status: LostFoundStatus;
    reported_by: string | null;
    created_at: string;
}

export interface LostFoundItemWithProfile extends LostFoundItem {
    reported_by_profile?: Profile | null;
}

export interface LostFoundItemInsert {
    type: LostFoundType;
    description: string;
    image_url?: string | null;
    location?: string | null;
    reported_by: string;
}

export interface LostFoundItemUpdate {
    description?: string;
    image_url?: string | null;
    location?: string | null;
    status?: LostFoundStatus;
}

// -----------------------------------------------------------------------------
// SUPABASE DATABASE SCHEMA TYPE
// For use with supabase.from<TableName>()
// -----------------------------------------------------------------------------
export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: Profile;
                Insert: ProfileInsert;
                Update: ProfileUpdate;
            };
            issues: {
                Row: Issue;
                Insert: IssueInsert;
                Update: IssueUpdate;
            };
            issue_media: {
                Row: IssueMedia;
                Insert: IssueMediaInsert;
                Update: Partial<IssueMediaInsert>;
            };
            comments: {
                Row: Comment;
                Insert: CommentInsert;
                Update: Partial<CommentInsert>;
            };
            announcements: {
                Row: Announcement;
                Insert: AnnouncementInsert;
                Update: AnnouncementUpdate;
            };
            lost_found_items: {
                Row: LostFoundItem;
                Insert: LostFoundItemInsert;
                Update: LostFoundItemUpdate;
            };
        };
    };
}
