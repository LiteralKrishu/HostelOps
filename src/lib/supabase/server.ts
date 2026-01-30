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
 * @returns Supabase server client instance, or null if not configured
 */
export async function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Gracefully handle missing environment variables
    // This allows pages to render with demo data if Supabase is not configured
    if (!supabaseUrl || !supabaseAnonKey) {
        console.warn('[Supabase] Environment variables not configured. Using demo mode.');
        return null;
    }

    const cookieStore = await cookies();

    return createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
            /**
             * Retrieves a cookie by name from the request.
             */
            get(name: string) {
                return cookieStore.get(name)?.value;
            },

            /**
             * Sets a cookie with secure options.
             */
            set(name: string, value: string, options: CookieOptions) {
                try {
                    cookieStore.set({ name, value, ...options });
                } catch {
                    // Ignored in Server Components - middleware handles this
                }
            },

            /**
             * Removes a cookie.
             */
            remove(name: string, options: CookieOptions) {
                try {
                    cookieStore.set({ name, value: '', ...options });
                } catch {
                    // Ignored in Server Components - middleware handles this
                }
            },
        },
    });
}
