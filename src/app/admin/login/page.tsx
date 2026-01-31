/**
 * =============================================================================
 * ADMIN LOGIN PAGE
 * =============================================================================
 * Login for Admin, Management, and Staff accounts.
 * Checks for manual approval before allowing access.
 * =============================================================================
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, ArrowLeft, Clock, Loader2 } from 'lucide-react';
import { loginAdminAction } from '../register/actions';

export default function AdminLoginPage() {
    const router = useRouter();
    const [pending, setPending] = useState(false);
    const [error, setError] = useState('');
    const [pendingApproval, setPendingApproval] = useState(false);

    async function handleSubmit(formData: FormData) {
        setPending(true);
        setError('');
        setPendingApproval(false);

        const result = await loginAdminAction(formData);

        setPending(false);

        if (result.success) {
            router.push('/admin');
        } else {
            setError(result.error || 'Login failed');
            if (result.pendingApproval) {
                setPendingApproval(true);
            }
        }
    }

    return (
        <div className="min-h-screen relative overflow-hidden bg-slate-950 flex items-center justify-center px-4">
            {/* Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-amber-600/30 to-orange-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/25 to-yellow-600/15 rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Back Link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>

                {/* Login Card */}
                <div className="p-8 rounded-3xl bg-slate-900/80 border border-amber-500/20 backdrop-blur-xl">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Staff Sign In</h1>
                            <p className="text-slate-400 text-sm">Admin, Management & Staff</p>
                        </div>
                    </div>

                    {/* Pending Approval Notice */}
                    {pendingApproval && (
                        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-6">
                            <div className="flex items-start gap-3">
                                <Clock className="w-5 h-5 text-amber-400 mt-0.5" />
                                <div>
                                    <p className="text-amber-200 font-medium">Awaiting Approval</p>
                                    <p className="text-amber-200/70 text-sm">
                                        Your account is pending manual approval. Please contact the system administrator to approve your account via the Supabase dashboard.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <form action={handleSubmit} className="space-y-4">
                        {error && !pendingApproval && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                                placeholder="you@hostel.edu"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                                placeholder="Enter your password"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={pending}
                            className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {pending ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Signing In...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-slate-400 text-sm mt-6">
                        Need an account?{' '}
                        <Link href="/admin/register" className="text-amber-400 hover:text-amber-300 transition-colors">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
