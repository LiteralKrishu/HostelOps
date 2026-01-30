/**
 * =============================================================================
 * REGISTER PAGE
 * =============================================================================
 * Modern registration page matching the login page aesthetic.
 * Collects user details for student account creation.
 * =============================================================================
 */
import Link from 'next/link';
import { RegisterForm } from './register-form';

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                {/* Animated orbs */}
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            {/* Register Card */}
            <div className="relative w-full max-w-lg">
                {/* Glassmorphism card */}
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
                    {/* Logo & Header */}
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-4 shadow-lg">
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
                        <p className="text-slate-300">Join HostelOps as a student</p>
                    </div>

                    {/* Register Form */}
                    <RegisterForm />

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-slate-400">
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl blur-2xl opacity-50" />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl blur-2xl opacity-40" />
            </div>
        </div>
    );
}
