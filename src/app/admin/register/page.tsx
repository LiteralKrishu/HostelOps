/**
 * =============================================================================
 * ADMIN REGISTRATION PAGE
 * =============================================================================
 * Registration for Admin, Management, and Staff accounts.
 * All require manual approval before gaining access.
 * =============================================================================
 */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, ArrowLeft, Clock, CheckCircle2, Loader2, Users, Wrench } from 'lucide-react';
import { registerAdminAction } from './actions';

export default function AdminRegisterPage() {
    const [pending, setPending] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [selectedRole, setSelectedRole] = useState<'admin' | 'management' | 'staff'>('admin');

    async function handleSubmit(formData: FormData) {
        setPending(true);
        setError('');

        formData.set('role', selectedRole);
        const result = await registerAdminAction(formData);

        setPending(false);

        if (result.success) {
            setSuccess(true);
        } else {
            setError(result.error || 'Registration failed');
        }
    }

    const roleLabels = {
        admin: 'Administrator',
        management: 'Management',
        staff: 'Staff',
    };

    if (success) {
        return (
            <div className="min-h-screen relative overflow-hidden bg-slate-950 flex items-center justify-center px-4">
                {/* Background */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-amber-600/30 to-orange-600/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/25 to-yellow-600/15 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10 w-full max-w-md">
                    <div className="text-center p-8 rounded-3xl bg-slate-900/80 border border-amber-500/20 backdrop-blur-xl">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-4">
                            Registration Submitted!
                        </h1>
                        <p className="text-slate-300 mb-2">
                            Your <span className="text-amber-400 font-medium">{roleLabels[selectedRole]}</span> account has been created.
                        </p>
                        <p className="text-slate-400 text-sm mb-6">
                            Account is pending approval.
                        </p>

                        {/* Pending Approval Notice */}
                        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-6 text-left">
                            <div className="flex items-start gap-3">
                                <Clock className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-amber-200 font-medium">Awaiting Manual Approval</p>
                                    <p className="text-amber-200/70 text-sm mt-1">
                                        A system administrator will review and approve your account via the Supabase dashboard. You will be able to log in once approved.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Link
                                href="/admin/login"
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all"
                            >
                                Try Logging In
                            </Link>
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center gap-2 text-slate-400 hover:text-white transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden bg-slate-950 flex items-center justify-center px-4 py-12">
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

                {/* Registration Card */}
                <div className="p-8 rounded-3xl bg-slate-900/80 border border-amber-500/20 backdrop-blur-xl">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Staff Registration</h1>
                            <p className="text-slate-400 text-sm">Admin, Management & Staff</p>
                        </div>
                    </div>

                    {/* Notice */}
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-6">
                        <p className="text-amber-200 text-sm">
                            ⚠️ All staff accounts require <strong>manual approval</strong> by a system administrator.
                        </p>
                    </div>

                    {/* Role Selection */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-slate-300 mb-3">Select Your Role</label>
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                { value: 'admin', label: 'Admin', icon: Shield },
                                { value: 'management', label: 'Mgmt', icon: Users },
                                { value: 'staff', label: 'Staff', icon: Wrench },
                            ].map(({ value, label, icon: Icon }) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setSelectedRole(value as 'admin' | 'management' | 'staff')}
                                    className={`p-3 rounded-xl border text-center transition-all ${selectedRole === value
                                            ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                                            : 'bg-slate-800/50 border-white/10 text-slate-400 hover:border-white/20'
                                        }`}
                                >
                                    <Icon className="w-5 h-5 mx-auto mb-1" />
                                    <span className="text-xs font-medium">{label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Form */}
                    <form action={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                                placeholder="Enter your full name"
                            />
                        </div>

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
                                minLength={8}
                                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                                placeholder="Min 8 characters"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Hostel Name</label>
                            <input
                                type="text"
                                name="hostel"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
                                placeholder="Enter hostel name"
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
                                    Registering...
                                </>
                            ) : (
                                `Register as ${roleLabels[selectedRole]}`
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-slate-400 text-sm mt-6">
                        Already approved?{' '}
                        <Link href="/admin/login" className="text-amber-400 hover:text-amber-300 transition-colors">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
