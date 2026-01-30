/**
 * =============================================================================
 * RATE LIMITING UTILITY
 * =============================================================================
 * In-memory rate limiting for public endpoints (login, register).
 * 
 * SECURITY NOTES (OWASP - Brute Force Protection):
 * - IP-based limiting to prevent credential stuffing.
 * - Configurable limits per endpoint type.
 * - Graceful 429 responses with retry-after header.
 * 
 * PRODUCTION NOTE:
 * For production, consider using a distributed store like Redis/Upstash.
 * This in-memory implementation resets on server restart.
 * =============================================================================
 */

interface RateLimitEntry {
    count: number;
    resetTime: number;
}

// In-memory store for rate limiting (per-process)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Default rate limit configurations
export const RATE_LIMIT_CONFIG = {
    // Login attempts: 5 per IP per minute
    login: { maxRequests: 5, windowMs: 60 * 1000 },
    // Registration: 3 per IP per 5 minutes
    register: { maxRequests: 3, windowMs: 5 * 60 * 1000 },
    // General API: 100 requests per minute
    api: { maxRequests: 100, windowMs: 60 * 1000 },
} as const;

export type RateLimitType = keyof typeof RATE_LIMIT_CONFIG;

/**
 * Rate limit result object
 */
export interface RateLimitResult {
    allowed: boolean;
    remaining: number;
    resetTime: number;
    retryAfterSeconds?: number;
}

/**
 * Checks if a request should be rate limited.
 * 
 * @param identifier - Unique identifier (usually IP address + endpoint)
 * @param type - Type of rate limit to apply
 * @returns RateLimitResult with allowed status and metadata
 * 
 * @example
 * const result = checkRateLimit(`${ip}:login`, 'login');
 * if (!result.allowed) {
 *   return new Response('Too many requests', { status: 429 });
 * }
 */
export function checkRateLimit(
    identifier: string,
    type: RateLimitType
): RateLimitResult {
    const config = RATE_LIMIT_CONFIG[type];
    const now = Date.now();
    const key = `${type}:${identifier}`;

    // Get or create entry
    let entry = rateLimitStore.get(key);

    // If no entry or window has expired, create new entry
    if (!entry || now > entry.resetTime) {
        entry = {
            count: 0,
            resetTime: now + config.windowMs,
        };
    }

    // Increment count
    entry.count++;
    rateLimitStore.set(key, entry);

    // Check if over limit
    const allowed = entry.count <= config.maxRequests;
    const remaining = Math.max(0, config.maxRequests - entry.count);
    const retryAfterSeconds = allowed
        ? undefined
        : Math.ceil((entry.resetTime - now) / 1000);

    return {
        allowed,
        remaining,
        resetTime: entry.resetTime,
        retryAfterSeconds,
    };
}

/**
 * Gets the client IP address from request headers.
 * Handles various proxy configurations.
 * 
 * @param request - The incoming request
 * @returns Client IP address or 'unknown'
 */
export function getClientIP(request: Request): string {
    // Check common proxy headers (order matters)
    const forwardedFor = request.headers.get('x-forwarded-for');
    if (forwardedFor) {
        // x-forwarded-for can contain multiple IPs; the first is the client
        return forwardedFor.split(',')[0].trim();
    }

    const realIP = request.headers.get('x-real-ip');
    if (realIP) {
        return realIP.trim();
    }

    // Fallback (may not work in all environments)
    return 'unknown';
}

/**
 * Creates a 429 Too Many Requests response with proper headers.
 * 
 * @param retryAfterSeconds - Seconds until the client can retry
 * @returns Response object with 429 status
 */
export function createRateLimitResponse(retryAfterSeconds: number): Response {
    return new Response(
        JSON.stringify({
            error: 'Too many requests',
            message: 'Please slow down and try again later.',
            retryAfter: retryAfterSeconds,
        }),
        {
            status: 429,
            headers: {
                'Content-Type': 'application/json',
                'Retry-After': String(retryAfterSeconds),
                'X-RateLimit-Reset': String(Math.ceil(Date.now() / 1000 + retryAfterSeconds)),
            },
        }
    );
}

/**
 * Cleanup function to remove expired entries (call periodically)
 * Prevents memory leaks in long-running processes.
 */
export function cleanupExpiredEntries(): void {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
        if (now > entry.resetTime) {
            rateLimitStore.delete(key);
        }
    }
}

// Cleanup every 5 minutes
if (typeof setInterval !== 'undefined') {
    setInterval(cleanupExpiredEntries, 5 * 60 * 1000);
}
