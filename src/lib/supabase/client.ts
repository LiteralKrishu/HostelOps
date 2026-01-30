/**
 * =============================================================================
 * SUPABASE BROWSER CLIENT
 * =============================================================================
 * Creates a Supabase client for use in browser/client components.
 * 
 * SECURITY NOTES (OWASP):
 * - Only NEXT_PUBLIC_ prefixed env vars are exposed to the client.
 * - The anon key is designed for client-side use with RLS.
 * - Never expose service_role key to the client.
 * =============================================================================
 */
import { createBrowserClient } from '@supabase/ssr';

/**
 * Creates a Supabase client instance for browser-side operations.
 * Uses the public ANON key which is safe for client exposure when RLS is enabled.
 * 
 * @returns Supabase client instance
 * @throws Error if environment variables are not configured
 */
export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Runtime check for required environment variables
    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error(
            'Missing Supabase environment variables. Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env.local'
        );
    }

    return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
