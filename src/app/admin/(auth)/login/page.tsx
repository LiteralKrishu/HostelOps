/**
 * =============================================================================
 * ADMIN LOGIN PAGE - AMBER/GOLD THEME
 * =============================================================================
 * Professional login page for admin, management, and staff.
 * Features an amber/gold premium design with glassmorphism.
 * =============================================================================
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, ArrowLeft, Loader2, Mail, Lock, Building2, AlertCircle, Crown } from 'lucide-react';
import { loginAdminAction } from '../register/actions';

export default function AdminLoginPage() {
    const router = useRouter();
    const [pending, setPending] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setPending(true);
        setError('');

        const form = e.currentTarget;
        const formData = new FormData(form);
        const result = await loginAdminAction(formData);

        setPending(false);

        if (result.success) {
            router.push('/admin');
        } else {
            setError(result.error || 'Login failed');
        }
    }

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Decorative Amber Gradient */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-300/20 rounded-full blur-2xl" />

                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
                    <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-8 shadow-2xl border border-white/20">
                        <Crown className="w-12 h-12" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4 text-center">Admin Portal</h1>
                    <p className="text-xl text-white/90 text-center max-w-md">
                        Powerful tools to manage your hostel operations efficiently.
                    </p>

                    {/* Feature list */}
                    <div className="mt-12 space-y-4">
                        {[
                            'Manage student issues & complaints',
                            'Track maintenance requests',
                            'Send announcements to students',
                            'View detailed analytics',
                        ].map((feature, i) => (
                            <div key={i} className="flex items-center gap-3 text-white/95">
                                <div className="w-2.5 h-2.5 rounded-full bg-white/80" />
                                <span className="text-lg">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
                <div className="w-full max-w-md">
                    {/* Back Link */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    {/* Login Card */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl shadow-amber-100/50 border border-amber-100">
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-200">
                                <Shield className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
                                <p className="text-slate-500 text-sm">Admin, Management & Staff Login</p>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Error */}
                            {error && (
                                <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 border border-red-100 text-red-700">
                                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                                    <span className="text-sm">{error}</span>
                                </div>
                            )}

                            {/* Email */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-amber-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all"
                                        placeholder="you@hostel.edu"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-amber-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all"
                                        placeholder="Enter your password"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={pending}
                                className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-amber-200"
                            >
                                {pending ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </form>

                        {/* Footer */}
                        <div className="mt-8 pt-6 border-t border-amber-100">
                            <p className="text-center text-slate-500 text-sm">
                                Need an account?{' '}
                                <Link href="/admin/register" className="text-amber-600 hover:text-amber-700 font-medium transition-colors">
                                    Register here
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Student Login Link */}
                    <p className="text-center text-slate-500 text-sm mt-6">
                        Are you a student?{' '}
                        <Link href="/login" className="text-amber-600 hover:text-amber-700 font-medium transition-colors">
                            Student Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
