/**
 * =============================================================================
 * INPUT SANITIZATION UTILITIES
 * =============================================================================
 * Sanitization functions to complement Zod validation.
 * 
 * SECURITY PHILOSOPHY (OWASP):
 * 1. Validation (Zod) - Rejects invalid input
 * 2. Sanitization (this file) - Cleans allowed input
 * 
 * This two-layer approach provides defense in depth.
 * =============================================================================
 */

// -----------------------------------------------------------------------------
// HTML ENTITY ENCODING
// Prevents XSS by encoding dangerous HTML characters
// -----------------------------------------------------------------------------
const HTML_ENTITIES: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
};

/**
 * Encodes HTML special characters to prevent XSS attacks.
 * Use this when displaying user input in HTML contexts.
 * 
 * @param input - Raw user input string
 * @returns Sanitized string with HTML entities encoded
 * 
 * @example
 * encodeHTML('<script>alert("xss")</script>')
 * // Returns: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
 */
export function encodeHTML(input: string): string {
    return input.replace(/[&<>"'`=/]/g, (char) => HTML_ENTITIES[char] || char);
}

// -----------------------------------------------------------------------------
// URL SANITIZATION
// Prevents javascript: and data: URL attacks
// -----------------------------------------------------------------------------
const ALLOWED_URL_PROTOCOLS = ['http:', 'https:', 'mailto:'];

/**
 * Validates and sanitizes URLs to prevent javascript: and data: attacks.
 * Returns null for invalid/dangerous URLs.
 * 
 * @param input - User-provided URL string
 * @returns Sanitized URL or null if invalid
 * 
 * @example
 * sanitizeURL('javascript:alert(1)') // Returns: null
 * sanitizeURL('https://example.com') // Returns: 'https://example.com'
 */
export function sanitizeURL(input: string): string | null {
    try {
        const url = new URL(input);
        if (!ALLOWED_URL_PROTOCOLS.includes(url.protocol)) {
            return null;
        }
        return url.href;
    } catch {
        return null;
    }
}

// -----------------------------------------------------------------------------
// TEXT NORMALIZATION
// Standardizes text input for consistency
// -----------------------------------------------------------------------------

/**
 * Normalizes text input by:
 * - Trimming whitespace
 * - Collapsing multiple spaces
 * - Removing control characters (except newlines)
 * 
 * @param input - Raw text input
 * @returns Normalized text
 */
export function normalizeText(input: string): string {
    return input
        .trim()
        // Remove control characters except newlines and tabs
        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
        // Collapse multiple spaces to single space
        .replace(/[^\S\n]+/g, ' ')
        // Collapse multiple newlines to max 2
        .replace(/\n{3,}/g, '\n\n');
}

// -----------------------------------------------------------------------------
// FILE VALIDATION
// Validates uploaded files by type and size
// -----------------------------------------------------------------------------

/** Allowed MIME types for issue media uploads */
export const ALLOWED_IMAGE_TYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
] as const;

export const ALLOWED_VIDEO_TYPES = [
    'video/mp4',
    'video/webm',
] as const;

/** Maximum file sizes in bytes */
export const FILE_SIZE_LIMITS = {
    image: 5 * 1024 * 1024,  // 5MB
    video: 50 * 1024 * 1024, // 50MB
} as const;

/**
 * Result of file validation
 */
export interface FileValidationResult {
    valid: boolean;
    error?: string;
    type?: 'image' | 'video';
}

/**
 * Validates an uploaded file for type and size.
 * 
 * @param file - The uploaded File object
 * @returns Validation result with type or error
 * 
 * @example
 * const result = validateFile(uploadedFile);
 * if (!result.valid) {
 *   console.error(result.error);
 * }
 */
export function validateFile(file: File): FileValidationResult {
    // Check if it's an allowed image type
    if (ALLOWED_IMAGE_TYPES.includes(file.type as typeof ALLOWED_IMAGE_TYPES[number])) {
        if (file.size > FILE_SIZE_LIMITS.image) {
            return { valid: false, error: 'Image must be less than 5MB' };
        }
        return { valid: true, type: 'image' };
    }

    // Check if it's an allowed video type
    if (ALLOWED_VIDEO_TYPES.includes(file.type as typeof ALLOWED_VIDEO_TYPES[number])) {
        if (file.size > FILE_SIZE_LIMITS.video) {
            return { valid: false, error: 'Video must be less than 50MB' };
        }
        return { valid: true, type: 'video' };
    }

    // File type not allowed
    return {
        valid: false,
        error: 'File type not allowed. Please upload JPEG, PNG, GIF, WebP, MP4, or WebM files.',
    };
}

// -----------------------------------------------------------------------------
// SQL INJECTION PREVENTION
// Note: When using Supabase with parameterized queries, SQL injection is
// already prevented. These utilities are for edge cases.
// -----------------------------------------------------------------------------

/** Characters that should never appear in certain contexts */
const SQL_DANGEROUS_PATTERNS = [
    /--/g,           // SQL comment
    /;/g,            // Statement terminator
    /\/\*/g,         // Block comment start
    /\*\//g,         // Block comment end
    /xp_/gi,         // Extended stored procedures
    /exec\s/gi,      // Execute statement
];

/**
 * Checks if a string contains potential SQL injection patterns.
 * Use as an additional layer of defense (Supabase already parameterizes queries).
 * 
 * @param input - String to check
 * @returns true if suspicious patterns found
 */
export function hasSQLInjectionPatterns(input: string): boolean {
    return SQL_DANGEROUS_PATTERNS.some(pattern => pattern.test(input));
}

// -----------------------------------------------------------------------------
// UUID VALIDATION
// Validates UUID format for route parameters
// -----------------------------------------------------------------------------

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Validates that a string is a valid UUID v4 format.
 * Use for validating route parameters before database queries.
 * 
 * @param input - String to validate
 * @returns true if valid UUID format
 */
export function isValidUUID(input: string): boolean {
    return UUID_REGEX.test(input);
}
