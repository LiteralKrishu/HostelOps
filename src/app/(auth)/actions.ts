/**
 * =============================================================================
 * AUTH SERVER ACTIONS
 * =============================================================================
 * Server-side actions for authentication (login, register, logout).
 * 
 * SECURITY NOTES (OWASP):
 * - All inputs validated with Zod before processing.
 * - Rate limiting applied at the API layer.
 * - Credentials never logged or exposed.
 * - Role assignment happens server-side only (students by default).
 * =============================================================================
 */
'use server';

import { createClient } from '@/lib/supabase/server';
import { loginSchema, registerSchema, validateInput } from '@/lib/validations/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { checkRateLimit, getClientIP, createRateLimitResponse } from '@/lib/security/rate-limit';

// -----------------------------------------------------------------------------
// RESPONSE TYPES
// -----------------------------------------------------------------------------
export interface AuthResult {
    success: boolean;
    error?: string;
    fieldErrors?: Record<string, string[]>;
}

// -----------------------------------------------------------------------------
// LOGIN ACTION
// Validates credentials and creates a session.
// -----------------------------------------------------------------------------
export async function loginAction(formData: FormData): Promise<AuthResult> {
    // Rate limiting check
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    const rateLimit = checkRateLimit(ip, 'login');

    if (!rateLimit.allowed) {
        return {
            success: false,
            error: `Too many login attempts. Please try again in ${rateLimit.retryAfterSeconds} seconds.`,
        };
    }

    // Extract and validate input
    const rawInput = {
        email: formData.get('email'),
        password: formData.get('password'),
    };

    const validation = validateInput(loginSchema, rawInput);

    if (!validation.success) {
        return {
            success: false,
            error: 'Invalid input',
            fieldErrors: validation.errors,
        };
    }

    const { email, password } = validation.data;

    // Attempt authentication
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        // Generic error message to prevent user enumeration
        return {
            success: false,
            error: 'Invalid email or password. Please try again.',
        };
    }

    // Redirect to dashboard on success
    redirect('/student');
}

// -----------------------------------------------------------------------------
// REGISTER ACTION
// Creates a new user and their profile (students only).
// -----------------------------------------------------------------------------
export async function registerAction(formData: FormData): Promise<AuthResult> {
    // Rate limiting check
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    const rateLimit = checkRateLimit(ip, 'register');

    if (!rateLimit.allowed) {
        return {
            success: false,
            error: `Too many registration attempts. Please try again in ${rateLimit.retryAfterSeconds} seconds.`,
        };
    }

    // Extract and validate input
    const rawInput = {
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
        fullName: formData.get('fullName'),
        hostel: formData.get('hostel'),
        block: formData.get('block') || undefined,
        room: formData.get('room') || undefined,
    };

    const validation = validateInput(registerSchema, rawInput);

    if (!validation.success) {
        return {
            success: false,
            error: 'Please fix the errors below',
            fieldErrors: validation.errors,
        };
    }

    const { email, password, fullName, hostel, block, room } = validation.data;

    const supabase = await createClient();

    // Create the auth user
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
            },
        },
    });

    if (signUpError) {
        // Check for specific error types
        if (signUpError.message.includes('already registered')) {
            return {
                success: false,
                error: 'An account with this email already exists.',
            };
        }
        return {
            success: false,
            error: 'Registration failed. Please try again.',
        };
    }

    // Create the profile (role is always 'student' for self-registration)
    if (authData.user) {
        const { error: profileError } = await supabase.from('profiles').insert({
            id: authData.user.id,
            full_name: fullName,
            role: 'student', // SECURITY: Role is enforced server-side
            hostel,
            block: block || null,
            room: room || null,
        });

        if (profileError) {
            console.error('[Register] Profile creation failed:', profileError.message);
            // User was created but profile failed - this is a problem
            // In production, you might want to delete the auth user or retry
        }
    }

    // Redirect to dashboard
    redirect('/student');
}

// -----------------------------------------------------------------------------
// LOGOUT ACTION
// Clears the session and redirects to login.
// -----------------------------------------------------------------------------
export async function logoutAction(): Promise<void> {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect('/login');
}
