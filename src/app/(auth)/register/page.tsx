/**
 * =============================================================================
 * REGISTER PAGE - VIBRANT DESIGN
 * =============================================================================
 * Modern registration page matching the landing page aesthetic.
 * Features animated gradient background with violet/fuchsia theme.
 * =============================================================================
 */
import Link from 'next/link';
import { RegisterForm } from './register-form';
import { ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 py-12 relative overflow-hidden bg-slate-950">
            {/* Animated gradient background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-violet-600/30 to-fuchsia-600/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-gradient-to-br from-pink-500/25 to-rose-600/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-0 left-1/3 w-[700px] h-[400px] bg-gradient-to-br from-emerald-500/20 to-teal-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            {/* Register Card */}
            <div className="relative z-10 w-full max-w-lg">
                {/* Back to home */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>

                {/* Glassmorphism card */}
                <div className="p-8 rounded-3xl bg-slate-900/80 border border-violet-500/20 backdrop-blur-xl">
                    {/* Logo & Header */}
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 mb-4 shadow-lg shadow-violet-500/30">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-8 h-8 text-white"
                            >
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
                        <p className="text-slate-400">Join HostelOps as a student</p>
                    </div>

                    {/* Register Form */}
                    <RegisterForm />

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-slate-400">
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                className="text-violet-400 hover:text-violet-300 font-medium transition-colors"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
