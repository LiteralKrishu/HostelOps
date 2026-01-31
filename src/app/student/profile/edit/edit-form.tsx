/**
 * =============================================================================
 * EDIT PROFILE FORM
 * =============================================================================
 * Client component form for editing student profile.
 * =============================================================================
 */
'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { updateProfileAction } from './actions';
import { User, Building2, Hash, Phone, Loader2, AlertCircle } from 'lucide-react';

interface ProfileData {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    hostel: string;
    block: string;
    room: string;
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
            {pending ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                </>
            ) : (
                'Save Changes'
            )}
        </button>
    );
}

export function EditProfileForm({ profile }: { profile: ProfileData }) {
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

    async function handleSubmit(formData: FormData) {
        setError(null);
        setFieldErrors({});

        const result = await updateProfileAction(formData);

        if (!result.success) {
            setError(result.error || 'Failed to update profile');
            if (result.fieldErrors) {
                setFieldErrors(result.fieldErrors);
            }
        }
    }

    const inputClass =
        'w-full h-12 pl-10 pr-4 bg-slate-50 border border-purple-100 text-slate-900 placeholder:text-slate-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition-all';

    return (
        <form action={handleSubmit} className="space-y-5">
            {/* Error Display */}
            {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                </div>
            )}

            {/* Full Name */}
            <div className="space-y-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">
                    Full Name
                </label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        defaultValue={profile.full_name}
                        required
                        className={inputClass}
                        placeholder="Your full name"
                    />
                </div>
                {fieldErrors.fullName && (
                    <p className="text-sm text-red-600">{fieldErrors.fullName[0]}</p>
                )}
            </div>

            {/* Email (readonly) */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                    Email <span className="text-slate-400">(cannot be changed)</span>
                </label>
                <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="w-full h-12 px-4 bg-slate-100 border border-slate-200 text-slate-500 rounded-xl cursor-not-allowed"
                />
            </div>

            {/* Phone */}
            <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
                    Phone Number <span className="text-slate-400">(optional)</span>
                </label>
                <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        defaultValue={profile.phone}
                        className={inputClass}
                        placeholder="+123 456 7890"
                    />
                </div>
                {fieldErrors.phone && (
                    <p className="text-sm text-red-600">{fieldErrors.phone[0]}</p>
                )}
            </div>

            {/* Hostel Information Section */}
            <div className="pt-4 border-t border-purple-100">
                <p className="text-sm font-medium text-slate-700 mb-4">Hostel Information</p>

                {/* Hostel */}
                <div className="space-y-2 mb-4">
                    <label htmlFor="hostel" className="block text-sm font-medium text-slate-700">
                        Hostel Name
                    </label>
                    <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                            id="hostel"
                            name="hostel"
                            type="text"
                            defaultValue={profile.hostel}
                            required
                            className={inputClass}
                            placeholder="e.g., Hostel A"
                        />
                    </div>
                    {fieldErrors.hostel && (
                        <p className="text-sm text-red-600">{fieldErrors.hostel[0]}</p>
                    )}
                </div>

                {/* Block & Room */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="block" className="block text-sm font-medium text-slate-700">
                            Block <span className="text-slate-400">(optional)</span>
                        </label>
                        <div className="relative">
                            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <input
                                id="block"
                                name="block"
                                type="text"
                                defaultValue={profile.block}
                                className={inputClass}
                                placeholder="B1"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="room" className="block text-sm font-medium text-slate-700">
                            Room <span className="text-slate-400">(optional)</span>
                        </label>
                        <div className="relative">
                            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <input
                                id="room"
                                name="room"
                                type="text"
                                defaultValue={profile.room}
                                className={inputClass}
                                placeholder="101"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
                <SubmitButton />
            </div>
        </form>
    );
}
