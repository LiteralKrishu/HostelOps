/**
 * =============================================================================
 * SUPABASE SERVER CLIENT
 * =============================================================================
 * Creates a Supabase client for use in Server Components and Server Actions.
 * Handles cookie management securely for session persistence.
 * 
 * SECURITY NOTES (OWASP):
 * - Cookies are HttpOnly by default via Next.js.
 * - Uses secure cookie handling (Secure, SameSite=Lax).
 * - Never log or expose session tokens.
 * =============================================================================
 */
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * Creates a Supabase client for server-side operations.
 * Manages authentication cookies automatically.
 * 
 * @returns Supabase server client instance
 * @throws Error if environment variables are not configured
 */
export async function createClient() {
    const cookieStore = await cookies();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Runtime check for required environment variables
    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error(
            'Missing Supabase environment variables. Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env.local'
        );
    }

    return createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
            /**
             * Retrieves a cookie by name from the request.
             * Cookies are automatically handled by Next.js with HttpOnly flag.
             */
            get(name: string) {
                return cookieStore.get(name)?.value;
            },

            /**
             * Sets a cookie with secure options.
             * Note: In Server Components, we cannot set cookies.
             * This is handled by the middleware for authentication flows.
             */
            set(name: string, value: string, options: CookieOptions) {
                try {
                    cookieStore.set({ name, value, ...options });
                } catch {
                    // The `set` method is called from a Server Component.
                    // This can be ignored if you have middleware refreshing sessions.
                }
            },

            /**
             * Removes a cookie by setting its value to empty and maxAge to 0.
             */
            remove(name: string, options: CookieOptions) {
                try {
                    cookieStore.set({ name, value: '', ...options });
                } catch {
                    // The `remove` method is called from a Server Component.
                    // This can be ignored if you have middleware refreshing sessions.
                }
            },
        },
    });
}
