/**
 * =============================================================================
 * ADMIN REGISTER PAGE - MODERN PURPLE THEME
 * =============================================================================
 * Professional registration page for admin, management, and staff.
 * Features role selection and hostel assignment.
 * =============================================================================
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Users, Wrench, ArrowLeft, Loader2, Mail, Lock, User, Building2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { registerAdminAction } from './actions';

type AdminRole = 'admin' | 'management' | 'staff';

const roleInfo = [
    {
        value: 'admin' as const,
        label: 'Admin',
        icon: Shield,
        description: 'Full access to all features',
    },
    {
        value: 'management' as const,
        label: 'Management',
        icon: Users,
        description: 'Manage staff & students',
    },
    {
        value: 'staff' as const,
        label: 'Staff',
        icon: Wrench,
        description: 'Handle maintenance issues',
    },
];

export default function AdminRegisterPage() {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [selectedRole, setSelectedRole] = useState<AdminRole>('admin');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setPending(true);
        setError('');

        const form = e.currentTarget;
        const formData = new FormData(form);
        formData.set('role', selectedRole);

        const result = await registerAdminAction(formData);

        setPending(false);

        if (result.success) {
            setSuccess(true);
        } else {
            setError(result.error || 'Registration failed');
        }
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
                <div className="max-w-md w-full text-center">
                    <div className="bg-white rounded-3xl p-10 shadow-xl shadow-purple-100/50 border border-purple-100">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-200">
                            <CheckCircle2 className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-3">Registration Submitted!</h2>
                        <p className="text-slate-500 mb-6">
                            Your account has been created and is pending approval. An administrator will review your request shortly.
                        </p>
                        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl mb-6">
                            <p className="text-sm text-amber-700">
                                <strong>Note:</strong> You won&apos;t be able to login until your account is approved.
                            </p>
                        </div>
                        <Link
                            href="/admin/login"
                            className="inline-flex items-center justify-center w-full h-12 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all shadow-lg shadow-purple-200"
                        >
                            Go to Login
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Decorative */}
            <div className="hidden lg:flex lg:w-2/5 relative bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-fuchsia-500/20 rounded-full blur-3xl" />

                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
                    <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-8 shadow-2xl">
                        <Building2 className="w-10 h-10" />
                    </div>
                    <h1 className="text-3xl font-bold mb-4 text-center">Join HostelOps</h1>
                    <p className="text-lg text-white/80 text-center max-w-sm">
                        Register as an administrator or staff member to manage hostel operations.
                    </p>

                    {/* Note */}
                    <div className="mt-10 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                        <p className="text-sm text-white/90 text-center">
                            All staff accounts require approval before you can login.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Register Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 overflow-y-auto">
                <div className="w-full max-w-lg py-8">
                    {/* Back Link */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    {/* Register Card */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl shadow-purple-100/50 border border-purple-100">
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-200">
                                <Shield className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
                                <p className="text-slate-500 text-sm">Admin, Management & Staff</p>
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 mb-3">Select Your Role</label>
                            <div className="grid grid-cols-3 gap-3">
                                {roleInfo.map(({ value, label, icon: Icon, description }) => (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => setSelectedRole(value)}
                                        className={`p-4 rounded-xl border-2 text-center transition-all ${selectedRole === value
                                                ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-500/20'
                                                : 'bg-slate-50 border-slate-200 hover:border-purple-300 hover:bg-purple-50/50'
                                            }`}
                                    >
                                        <Icon className={`w-6 h-6 mx-auto mb-2 ${selectedRole === value ? 'text-purple-600' : 'text-slate-500'
                                            }`} />
                                        <span className={`text-sm font-semibold ${selectedRole === value ? 'text-purple-700' : 'text-slate-700'
                                            }`}>{label}</span>
                                        <p className="text-xs text-slate-400 mt-1 hidden sm:block">{description}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Error */}
                            {error && (
                                <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 border border-red-100 text-red-700">
                                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                                    <span className="text-sm">{error}</span>
                                </div>
                            )}

                            {/* Full Name */}
                            <div className="space-y-2">
                                <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        required
                                        className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-purple-100 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all"
                                        placeholder="Your full name"
                                    />
                                </div>
                            </div>

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
                                        className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-purple-100 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all"
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
                                        minLength={8}
                                        className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-purple-100 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all"
                                        placeholder="Min. 8 characters"
                                    />
                                </div>
                            </div>

                            {/* Hostel Name */}
                            <div className="space-y-2">
                                <label htmlFor="hostel" className="block text-sm font-medium text-slate-700">
                                    Hostel Name
                                </label>
                                <div className="relative">
                                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                    <input
                                        id="hostel"
                                        name="hostel"
                                        type="text"
                                        required
                                        className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-purple-100 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all"
                                        placeholder="e.g., Hostel A"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={pending}
                                className="w-full h-12 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-purple-200 mt-6"
                            >
                                {pending ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Creating account...
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </button>
                        </form>

                        {/* Footer */}
                        <div className="mt-6 pt-6 border-t border-purple-100">
                            <p className="text-center text-slate-500 text-sm">
                                Already have an account?{' '}
                                <Link href="/admin/login" className="text-purple-600 hover:text-purple-700 font-medium transition-colors">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Student Registration Link */}
                    <p className="text-center text-slate-500 text-sm mt-6">
                        Are you a student?{' '}
                        <Link href="/register" className="text-purple-600 hover:text-purple-700 font-medium transition-colors">
                            Student Registration
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
