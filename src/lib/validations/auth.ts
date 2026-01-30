/**
 * =============================================================================
 * AUTHENTICATION VALIDATION SCHEMAS (ZOD)
 * =============================================================================
 * Strict input validation for all authentication-related forms.
 * 
 * SECURITY NOTES (OWASP - Input Validation):
 * - Schema-based validation ensures type safety.
 * - Length limits prevent buffer overflow/DoS attacks.
 * - Password strength requirements enforced.
 * - Rejects unexpected/malformed inputs.
 * =============================================================================
 */
import { z } from 'zod';

// -----------------------------------------------------------------------------
// PASSWORD REQUIREMENTS (OWASP Guidelines)
// - Minimum 8 characters
// - At least one uppercase letter
// - At least one lowercase letter
// - At least one digit
// - At least one special character
// -----------------------------------------------------------------------------
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 128; // Prevent DoS with excessively long passwords

const passwordSchema = z
    .string()
    .min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters`)
    .max(PASSWORD_MAX_LENGTH, `Password must not exceed ${PASSWORD_MAX_LENGTH} characters`)
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one digit')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

// -----------------------------------------------------------------------------
// EMAIL VALIDATION
// - Standard email format
// - Maximum length to prevent abuse
// -----------------------------------------------------------------------------
const EMAIL_MAX_LENGTH = 254; // RFC 5321 maximum

const emailSchema = z
    .string()
    .email('Please enter a valid email address')
    .max(EMAIL_MAX_LENGTH, `Email must not exceed ${EMAIL_MAX_LENGTH} characters`)
    .toLowerCase() // Normalize email to lowercase
    .trim(); // Remove leading/trailing whitespace

// -----------------------------------------------------------------------------
// NAME VALIDATION
// - Reasonable length limits
// - Basic sanitization
// -----------------------------------------------------------------------------
const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 100;

const nameSchema = z
    .string()
    .min(NAME_MIN_LENGTH, `Name must be at least ${NAME_MIN_LENGTH} characters`)
    .max(NAME_MAX_LENGTH, `Name must not exceed ${NAME_MAX_LENGTH} characters`)
    .trim()
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes');

// -----------------------------------------------------------------------------
// HOSTEL/BLOCK/ROOM VALIDATION
// -----------------------------------------------------------------------------
const hostelSchema = z
    .string()
    .min(1, 'Hostel is required')
    .max(50, 'Hostel name too long')
    .trim();

const blockSchema = z
    .string()
    .max(20, 'Block name too long')
    .trim()
    .optional();

const roomSchema = z
    .string()
    .max(20, 'Room number too long')
    .trim()
    .optional();

// -----------------------------------------------------------------------------
// LOGIN SCHEMA
// - Email + Password only
// - No additional fields accepted (strict mode)
// -----------------------------------------------------------------------------
export const loginSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, 'Password is required').max(PASSWORD_MAX_LENGTH),
}).strict(); // Reject any additional fields

export type LoginInput = z.infer<typeof loginSchema>;

// -----------------------------------------------------------------------------
// REGISTRATION SCHEMA
// - Full user details
// - Password confirmation
// - Role is always 'student' on self-registration (enforced server-side)
// -----------------------------------------------------------------------------
export const registerSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    fullName: nameSchema,
    hostel: hostelSchema,
    block: blockSchema,
    room: roomSchema,
}).strict().refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

export type RegisterInput = z.infer<typeof registerSchema>;

// -----------------------------------------------------------------------------
// VALIDATION HELPER
// Safely validates input and returns structured errors
// -----------------------------------------------------------------------------
export function validateInput<T>(
    schema: z.ZodSchema<T>,
    data: unknown
): { success: true; data: T } | { success: false; errors: Record<string, string[]> } {
    const result = schema.safeParse(data);

    if (result.success) {
        return { success: true, data: result.data };
    }

    // Transform Zod errors into a more usable format
    const errors: Record<string, string[]> = {};
    result.error.issues.forEach((issue) => {
        const path = issue.path.join('.');
        if (!errors[path]) {
            errors[path] = [];
        }
        errors[path].push(issue.message);
    });

    return { success: false, errors };
}
