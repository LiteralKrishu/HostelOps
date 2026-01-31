/**
 * =============================================================================
 * REGISTER FORM COMPONENT (Client)
 * =============================================================================
 * Interactive registration form with client-side validation feedback.
 * Collects: email, password, name, hostel, block, room.
 * =============================================================================
 */
'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { registerAction } from '../actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Mail, Lock, User, Building2, Hash, AlertCircle, Check } from 'lucide-react';

// Password strength indicator
function PasswordStrength({ password }: { password: string }) {
    const checks = [
        { regex: /.{8,}/, label: '8+ characters' },
        { regex: /[A-Z]/, label: 'Uppercase' },
        { regex: /[a-z]/, label: 'Lowercase' },
        { regex: /[0-9]/, label: 'Number' },
        { regex: /[^A-Za-z0-9]/, label: 'Special char' },
    ];

    const passedChecks = checks.filter((check) => check.regex.test(password));
    const strength = passedChecks.length;

    if (!password) return null;

    return (
        <div className="mt-2 space-y-2">
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                    <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-colors ${strength >= level
                            ? strength >= 4
                                ? 'bg-green-500'
                                : strength >= 3
                                    ? 'bg-yellow-500'
                                    : 'bg-red-500'
                            : 'bg-white/20'
                            }`}
                    />
                ))}
            </div>
            <div className="flex flex-wrap gap-2">
                {checks.map((check) => (
                    <span
                        key={check.label}
                        className={`text-xs flex items-center gap-1 ${check.regex.test(password) ? 'text-green-400' : 'text-slate-500'
                            }`}
                    >
                        {check.regex.test(password) ? (
                            <Check className="h-3 w-3" />
                        ) : null}
                        {check.label}
                    </span>
                ))}
            </div>
        </div>
    );
}

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
                    Creating account...
                </>
            ) : (
                'Create Account'
            )}
        </Button>
    );
}

export function RegisterForm() {
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
    const [password, setPassword] = useState('');

    async function handleSubmit(formData: FormData) {
        setError(null);
        setFieldErrors({});

        const result = await registerAction(formData);

        if (!result.success) {
            setError(result.error || 'Registration failed');
            if (result.fieldErrors) {
                setFieldErrors(result.fieldErrors);
            }
        }
    }

    // Input class for consistency
    const inputClass =
        'pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-slate-400 rounded-xl focus:border-violet-400 focus:ring-violet-400/20';

    return (
        <form action={handleSubmit} className="space-y-4">
            {/* Global Error */}
            {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                </div>
            )}

            {/* Full Name */}
            <div className="space-y-2">
                <Label htmlFor="fullName" className="text-slate-200">
                    Full Name
                </Label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="John Doe"
                        autoComplete="name"
                        required
                        className={inputClass}
                    />
                </div>
                {fieldErrors.fullName && (
                    <p className="text-sm text-red-400">{fieldErrors.fullName[0]}</p>
                )}
            </div>

            {/* Email */}
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
                        className={inputClass}
                    />
                </div>
                {fieldErrors.email && (
                    <p className="text-sm text-red-400">{fieldErrors.email[0]}</p>
                )}
            </div>

            {/* Password */}
            <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200">
                    Password
                </Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        autoComplete="new-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={inputClass}
                    />
                </div>
                <PasswordStrength password={password} />
                {fieldErrors.password && (
                    <p className="text-sm text-red-400">{fieldErrors.password[0]}</p>
                )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-200">
                    Confirm Password
                </Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        autoComplete="new-password"
                        required
                        className={inputClass}
                    />
                </div>
                {fieldErrors.confirmPassword && (
                    <p className="text-sm text-red-400">{fieldErrors.confirmPassword[0]}</p>
                )}
            </div>

            {/* Hostel Info Section */}
            <div className="pt-2 border-t border-white/10">
                <p className="text-sm text-slate-400 mb-3">Hostel Information</p>

                {/* Hostel Name */}
                <div className="space-y-2 mb-3">
                    <Label htmlFor="hostel" className="text-slate-200">
                        Hostel Name
                    </Label>
                    <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <Input
                            id="hostel"
                            name="hostel"
                            type="text"
                            placeholder="e.g., Hostel A"
                            required
                            className={inputClass}
                        />
                    </div>
                    {fieldErrors.hostel && (
                        <p className="text-sm text-red-400">{fieldErrors.hostel[0]}</p>
                    )}
                </div>

                {/* Block & Room (side by side) */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                        <Label htmlFor="block" className="text-slate-200">
                            Block <span className="text-slate-500">(optional)</span>
                        </Label>
                        <div className="relative">
                            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <Input
                                id="block"
                                name="block"
                                type="text"
                                placeholder="B1"
                                className={inputClass}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="room" className="text-slate-200">
                            Room <span className="text-slate-500">(optional)</span>
                        </Label>
                        <div className="relative">
                            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <Input
                                id="room"
                                name="room"
                                type="text"
                                placeholder="101"
                                className={inputClass}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
                <SubmitButton />
            </div>
        </form>
    );
}
