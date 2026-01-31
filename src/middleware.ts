/**
 * =============================================================================
 * NEXT.JS MIDDLEWARE
 * =============================================================================
 * Handles authentication session refresh and protected route access.
 * 
 * SECURITY NOTES (OWASP):
 * - Session tokens refreshed automatically to prevent session fixation.
 * - Protected routes require valid session.
 * - Centralized authentication logic.
 * =============================================================================
 */
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// -----------------------------------------------------------------------------
// ROUTE CONFIGURATION
// -----------------------------------------------------------------------------
const PUBLIC_ROUTES = ['/login', '/register', '/', '/admin/login', '/admin/register'];
const STUDENT_ROUTES = ['/student'];
const ADMIN_ROUTES = ['/admin'];
const STAFF_ROUTES = ['/staff'];

/**
 * Middleware function to handle auth session refresh and route protection.
 */
export async function middleware(request: NextRequest) {
    // Create a response that we can modify
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Skip middleware if Supabase is not configured
    if (!supabaseUrl || !supabaseAnonKey) {
        console.warn('[Middleware] Supabase not configured. Skipping auth checks.');
        return response;
    }

    // Create Supabase client with cookie handling
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
            get(name: string) {
                return request.cookies.get(name)?.value;
            },
            set(name: string, value: string, options: CookieOptions) {
                // Set cookie on the request for Server Components
                request.cookies.set({ name, value, ...options });
                // Set cookie on the response for the browser
                response = NextResponse.next({
                    request: { headers: request.headers },
                });
                response.cookies.set({ name, value, ...options });
            },
            remove(name: string, options: CookieOptions) {
                request.cookies.set({ name, value: '', ...options });
                response = NextResponse.next({
                    request: { headers: request.headers },
                });
                response.cookies.set({ name, value: '', ...options });
            },
        },
    });

    // Refresh session if expired (important for token rotation)
    const { data: { user }, error } = await supabase.auth.getUser();

    const pathname = request.nextUrl.pathname;

    // Check if it's a public route
    const isPublicRoute = PUBLIC_ROUTES.some(route => pathname === route);

    // If user is not logged in and trying to access a protected route
    if (!user && !isPublicRoute) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // If user is logged in and trying to access login/register, redirect to dashboard
    if (user && (pathname === '/login' || pathname === '/register')) {
        // Redirect based on role (we'll need to fetch profile for this)
        // For now, redirect to a generic dashboard
        return NextResponse.redirect(new URL('/student', request.url));
    }

    // Add security headers
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains'
    );

    return response;
}

// Configure which routes the middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder files
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
