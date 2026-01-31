/**
 * =============================================================================
 * LOGIN FORM COMPONENT (Client)
 * =============================================================================
 * Interactive login form with client-side validation feedback.
 * Uses server actions for actual authentication.
 * =============================================================================
 */
'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { loginAction } from '../actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Mail, Lock, AlertCircle } from 'lucide-react';

// Submit button with loading state
function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            disabled={pending}
            className="w-full h-12 bg-gradient-to-r from-violet-500 to-fuchsia-600 hover:from-violet-600 hover:to-fuchsia-700 text-white font-medium rounded-xl shadow-lg shadow-violet-500/25 transition-all duration-300"
        >
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                </>
            ) : (
                'Sign In'
            )}
        </Button>
    );
}

export function LoginForm() {
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

    async function handleSubmit(formData: FormData) {
        setError(null);
        setFieldErrors({});

        const result = await loginAction(formData);

        if (!result.success) {
            setError(result.error || 'Login failed');
            if (result.fieldErrors) {
                setFieldErrors(result.fieldErrors);
            }
        }
    }

    return (
        <form action={handleSubmit} className="space-y-5">
            {/* Global Error */}
            {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">
                    Email
                </Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                        className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-slate-400 rounded-xl focus:border-violet-400 focus:ring-violet-400/20"
                    />
                </div>
                {fieldErrors.email && (
                    <p className="text-sm text-red-400">{fieldErrors.email[0]}</p>
                )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-slate-200">
                        Password
                    </Label>
                    <a
                        href="#"
                        className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
                    >
                        Forgot password?
                    </a>
                </div>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        required
                        className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-slate-400 rounded-xl focus:border-violet-400 focus:ring-violet-400/20"
                    />
                </div>
                {fieldErrors.password && (
                    <p className="text-sm text-red-400">{fieldErrors.password[0]}</p>
                )}
            </div>

            {/* Submit Button */}
            <SubmitButton />
        </form>
    );
}
