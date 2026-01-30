/**
 * =============================================================================
 * ISSUE VALIDATION SCHEMAS
 * =============================================================================
 * Zod schemas for issue reporting and management.
 * 
 * SECURITY NOTES (OWASP):
 * - Strict enum validation for category, priority, visibility
 * - Length limits on all text fields
 * - File type/size validation for media uploads
 * =============================================================================
 */
import { z } from 'zod';

// -----------------------------------------------------------------------------
// ISSUE CATEGORIES
// Match the categories defined in the PRD
// -----------------------------------------------------------------------------
export const ISSUE_CATEGORIES = [
    'Plumbing',
    'Electrical',
    'Furniture',
    'Cleaning',
    'Security',
    'Internet',
    'Appliances',
    'Other',
] as const;

export type IssueCategory = typeof ISSUE_CATEGORIES[number];

// -----------------------------------------------------------------------------
// PRIORITY LEVELS
// -----------------------------------------------------------------------------
export const PRIORITY_LEVELS = ['low', 'medium', 'high', 'emergency'] as const;
export type PriorityLevel = typeof PRIORITY_LEVELS[number];

// -----------------------------------------------------------------------------
// ISSUE STATUS
// -----------------------------------------------------------------------------
export const ISSUE_STATUSES = [
    'reported',
    'assigned',
    'in_progress',
    'resolved',
    'closed',
] as const;
export type IssueStatus = typeof ISSUE_STATUSES[number];

// -----------------------------------------------------------------------------
// VISIBILITY OPTIONS
// -----------------------------------------------------------------------------
export const VISIBILITY_OPTIONS = ['public', 'private'] as const;
export type Visibility = typeof VISIBILITY_OPTIONS[number];

// -----------------------------------------------------------------------------
// CREATE ISSUE SCHEMA
// Used when students submit new issues
// -----------------------------------------------------------------------------
export const createIssueSchema = z.object({
    title: z
        .string()
        .min(5, 'Title must be at least 5 characters')
        .max(100, 'Title must not exceed 100 characters')
        .trim(),

    description: z
        .string()
        .min(10, 'Description must be at least 10 characters')
        .max(2000, 'Description must not exceed 2000 characters')
        .trim(),

    category: z.enum(ISSUE_CATEGORIES, 'Please select a valid category'),

    priority: z.enum(PRIORITY_LEVELS, 'Please select a valid priority level'),

    visibility: z.enum(VISIBILITY_OPTIONS).default('public'),

    // Location is auto-filled from user profile, but can be overridden
    hostel: z.string().min(1, 'Hostel is required').max(50),
    block: z.string().max(20).optional(),
    room: z.string().max(20).optional(),
}).strict();

export type CreateIssueInput = z.infer<typeof createIssueSchema>;

// -----------------------------------------------------------------------------
// UPDATE ISSUE SCHEMA (for staff/admin)
// -----------------------------------------------------------------------------
export const updateIssueSchema = z.object({
    status: z.enum(ISSUE_STATUSES).optional(),
    priority: z.enum(PRIORITY_LEVELS).optional(),
    assigned_to: z.string().uuid().optional().nullable(),
}).strict();

export type UpdateIssueInput = z.infer<typeof updateIssueSchema>;

// -----------------------------------------------------------------------------
// COMMENT SCHEMA
// -----------------------------------------------------------------------------
export const commentSchema = z.object({
    content: z
        .string()
        .min(1, 'Comment cannot be empty')
        .max(500, 'Comment must not exceed 500 characters')
        .trim(),
}).strict();

export type CommentInput = z.infer<typeof commentSchema>;
